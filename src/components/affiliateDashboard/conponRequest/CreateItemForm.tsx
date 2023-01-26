import axios from 'axios';
import ItemForm from './ItemForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useState } from 'react';
import Router from 'next/router';
import { Heading, Snackbar, Spacer } from '@growth-ui/react';
import { useCouponRequestMutation, useSignS3Mutation } from '@/services';
import validate from './helpers/validate';

export default function CreateItemForm() {
  const [myItem, setMyItem] = useState<any>({
    name: '',
    extendedName: '',
    originalPrice: 0,
    price: 0, //retailPrice
    currency: 'GPT',
    amount: 0, //profit
    expiresIn: 90,
    slug: '',
    sortOrder: 0,
    country: 'US',
    brandId: '',
    type: 'GIFT_ICON',
    categoryIDs: [],
    imageUrl: '',
    couponImageURl: '',
  });
  const [create, { loading }] = useCouponRequestMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  const handleUpdate = (item: any) => {
    setMyItem(item);
  };

  const handleSubmit = async (data: any) => {
    // console.log('@CreateItemForm - data: ', data);
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

    await create({
      data: {
        ...data,
        imageUrl: imageUrl.url,
        couponImageUrl: couponImageUrl.url,
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
      <Heading style={{ color: '#2D126D' }}>New Coupon Request</Heading>
      <Spacer size={20} />
      <ItemForm
        mode="create"
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
          onClose={() => Router.reload()}
        />
      )}
    </>
  );
}
