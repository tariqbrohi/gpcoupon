import axios from 'axios';
import Context from './Context';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useState } from 'react';
import Router from 'next/router';
import validate from './helpers/validate';
import { Heading, Snackbar, Spacer } from '@growth-ui/react';
import { useCreateItemMutation, useSignS3Mutation } from '@/services';

export default function CreateBrandFrom() {
  const { item } = useContext(Context);
  const [create, { loading }] = useCreateItemMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  const handleSubmit = async () => {
    const errMessage = validate(item);

    if (errMessage || loading) {
      return setError(errMessage);
    }

    const { data: imageUrl } = await sign({
      data: {
        filename: (item.imageUrl as File).name,
        filetype: (item.imageUrl as File).type,
      },
    });

    await axios.put(imageUrl.signedUrl, item.imageUrl, {
      headers: { 'Content-Type': (item.imageUrl as File).type },
    });

    const { data: couponImageUrl } = await sign({
      data: {
        filename: (item.couponImageUrl as File).name,
        filetype: (item.couponImageUrl as File).type,
      },
    });

    await axios.put(couponImageUrl.signedUrl, item.couponImageUrl, {
      headers: { 'Content-Type': (item.couponImageUrl as File).type },
    });

    const { categories, brand, ...rest } = item;

    await create({
      data: {
        ...rest,
        imageUrl: imageUrl.url,
        couponImageUrl: couponImageUrl.url,
        categoryIDs: categories,
        brandId: brand,
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
      <Heading style={{color: "#2D126D"}}>Create Coupon</Heading>
      <Spacer size={20} />

      <ItemForm mode="create" onSubmit={handleSubmit} />
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
