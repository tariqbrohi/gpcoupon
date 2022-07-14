import axios from 'axios';
import Context from './Context';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import validate from './helpers/validate';
import { Heading, Snackbar } from '@growth-ui/react';
import {
  useUpdateItemMutation,
  useSignS3Mutation,
  useGetItemQuery,
} from '@/services';

export default function EditItemForm() {
  const {
    query: { id },
  } = useRouter();
  const { data } = useGetItemQuery({
    data: {
      id: id as string,
    },
  });
  const { item, setItem } = useContext(Context);
  const [update, { loading }] = useUpdateItemMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    if (data) {
      setItem({
        ...data,
        categories: data.categoryIDs,
        available: data.status === 'AVAILABLE',
        imageUrl: data.imageUrls.medium,
        brand: data.brandId!,
      } as any);
    }
  }, [data]);

  const handleSubmit = async () => {
    const errMessage = validate(item);

    if (errMessage || loading) {
      return setError(errMessage);
    }

    let imageUrl = item.imageUrl;

    if (!imageUrl || typeof imageUrl !== 'string') {
      const { data } = await sign({
        data: {
          filename: (item.imageUrl as File).name,
          filetype: (item.imageUrl as File).type,
        },
      });

      imageUrl = data.url;

      await axios.put(data.signedUrl, item.imageUrl, {
        headers: { 'Content-Type': (item.imageUrl as File).type },
      });
    }

    const { categories, brand, ...rest } = item;

    await update({
      data: {
        ...rest,
        imageUrl,
        categoryIDs: categories,
        brandId: brand,
        id: data?.id!,
      },
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Heading>Update Item</Heading>
      <ItemForm mode="update" onSubmit={handleSubmit} />
      {error && (
        <Snackbar
          autoHideDuration={3000}
          error
          position="top right"
          message={error}
          onClose={() => setError('')}
        />
      )}
      {success && (
        <Snackbar
          autoHideDuration={1500}
          success
          position="top right"
          message="Success"
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
