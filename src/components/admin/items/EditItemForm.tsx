import axios from 'axios';
import Context, { Item } from './Context';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
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
  const { setItem } = useContext(Context);
  const [update, { loading }] = useUpdateItemMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');
  // console.log(item);

  useEffect(() => {
    if (data) {
      setItem({
        ...data,
        currency: (data.price as any)?.currency || 'GPT',
        price: (data.price as any)?.amount || 0,
        categories: data.categoryIDs,
        available: data.status === 'AVAILABLE',
        imageUrl: data.imageUrls.medium,
        brand: data.brandId!,
      } as any);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleUpdate = (item: any) => {
    setItem(item);
  }

  const handleSubmit = async (item: Item) => {
    const errMessage = validate(item, true);

    if (errMessage || loading) {
      alert(errMessage);

      return setError(errMessage);
    }

    // const promises: any = [];

    let imageUrl = item.imageUrl;
    let couponImageUrl = item.couponImageUrl;

    if (!item.imageUrl || typeof item.imageUrl !== 'string') {
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

    if (!item.couponImageUrl || typeof item.couponImageUrl !== 'string') {
      const { data } = await sign({
        data: {
          filename: (item.couponImageUrl as File).name,
          filetype: (item.couponImageUrl as File).type,
        },
      });

      couponImageUrl = data.url;

      await axios.put(data.signedUrl, item.couponImageUrl, {
        headers: { 'Content-Type': (item.couponImageUrl as File).type },
      });
    }

    // const { categories, brand, ...rest } = item;

    await update({
      data: {
        // ...rest,
        ...item,
        imageUrl: imageUrl as string,
        couponImageUrl: couponImageUrl as string,
        categoryIDs: item.categories,
        id: data?.id!,
      },
    })
      .then(() => {
        setSuccess(true);
        alert('Successfully Updated!')
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Heading>Modify Coupon</Heading>
      <ItemForm 
        mode="update" 
        onSubmit={handleSubmit}
        onUpdate={handleUpdate} 
      />

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
          onClose={() => Router.reload()}
        />
      )}
    </>
  );
}
