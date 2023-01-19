import axios from 'axios';
import Context, { Item } from './Context';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useState } from 'react';
import Router from 'next/router';
import validate from './helpers/validate';
import { Heading, Snackbar, Spacer } from '@growth-ui/react';
import { useCreateItemMutation, useSignS3Mutation } from '@/services';
import { ApproveStatus } from '@prisma/client';

export default function CreateBrandFrom() {
  const { setItem } = useContext(Context);
  const [create, { loading }] = useCreateItemMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  const handleUpdate = (i: any) => {
    setItem(i);
  };

  const handleSubmit = async (data: Item) => {
    const errMessage = validate(data);

    if (errMessage || loading) {
      alert(errMessage);

      return setError(errMessage);
    }

    const { data: imageUrl } = await sign({
      data: {
        filename: (data.imageUrl as File).name,
        filetype: (data.imageUrl as File).type,
      },
    });

    await axios.put(imageUrl.signedUrl, data.imageUrl, {
      headers: { 'Content-Type': (data.imageUrl as File).type },
    });

    const { data: couponImageUrl } = await sign({
      data: {
        filename: (data.couponImageUrl as File).name,
        filetype: (data.couponImageUrl as File).type,
      },
    });

    await axios.put(couponImageUrl.signedUrl, data.couponImageUrl, {
      headers: { 'Content-Type': (data.couponImageUrl as File).type },
    });

    // const { categories, brand, ...rest } = item;

    await create({
      data: {
        // ...rest,
        ...data,
        imageUrl: imageUrl.url,
        couponImageUrl: couponImageUrl.url,
        categoryIDs: data.categories,
        brandId: data.brand,
        approvalStatus: {
          status: ApproveStatus.approved,
        },
      },
    })
      .then(() => {
        setSuccess(true);
        alert('Successfully Created!');
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Heading style={{ color: '#2D126D' }}>Create Coupon</Heading>
      <Spacer size={20} />

      <ItemForm mode="create" onSubmit={handleSubmit} onUpdate={handleUpdate} />

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
