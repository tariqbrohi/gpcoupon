import axios from 'axios';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import validate from './helpers/validate';
import { Heading, Snackbar } from '@growth-ui/react';
import {
  useModifyCouponRequestMutation,
  useSignS3Mutation,
  useGetItemQuery,
} from '@/services';
import userLocale from '../brand/helper/getLocale';

export default function EditItemForm() {
  const {
    query: { id },
  } = useRouter();

  const { data } = useGetItemQuery({
    data: {
      id: id as string,
    },
  });
  const [ myItem, setMyItem ] = useState<any>({});
  const [update, { loading }] = useModifyCouponRequestMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    if (data) {
      setMyItem({
        ...data,
        currency: (data.price as any)?.currency || 'GPT',
        price: (data.price as any)?.amount || 0,
        categoryIDs: data.categoryIDs,
        imageUrl: data.imageUrls.medium,
        brandId: data.brandId!,
        locale: userLocale({languageCodeOnly: true})[0],
      } as any);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleUpdate = (item: any) => {
    setMyItem(item);
  }

  const handleSubmit = async (item: any) => {
    const errMessage = validate(item);

    if (errMessage || loading) {
      alert(errMessage);
      return setError(errMessage);
    }

    let imageUrl = item.imageUrl;
    let couponImageUrl = item.couponImageUrl;

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

    await update({
      data: {
        ...item,
        imageUrl,
        couponImageUrl,
        locale: userLocale({languageCodeOnly: true})[0],
        id: data?.id!,
      },
    })
      .then(() => {
        setSuccess(true);
        alert('Modify Request Submitted!');
      })
      .catch((err) => {
        alert('Something went wrong please try again');
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
        item={myItem}
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
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
