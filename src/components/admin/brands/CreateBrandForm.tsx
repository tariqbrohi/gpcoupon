import axios from 'axios';
import BrandForm from './BrandForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useState } from 'react';
import Router from 'next/router';
import { Brand } from './Context';
import { Heading, Snackbar, Spacer } from '@growth-ui/react';
import { useCreateBrandMutation, useSignS3Mutation } from '@/services';
import validate from './helpers/validate';

export default function CreateBrandForm() {
  const [create, { loading }] = useCreateBrandMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  const handleSubmit = async (data: Brand) => {
    const errMessage = validate(data);
    // console.log('@Admin - CreateBrandForm_handleSubmit - Brand data: ', data);
    // console.log(
    //   '@Admin - CreateBrandForm_handleSubmit - errMessage: ',
    //   errMessage,
    // );

    if (errMessage || loading) {
      alert(errMessage);
      return setError(errMessage);
    }

    const { data: backgroundUrl } = await sign({
      data: {
        filename: (data.backgroundUrl as File).name,
        filetype: (data.backgroundUrl as File).type,
      },
    });

    const { data: thumbnailUrl } = await sign({
      data: {
        filename: (data.thumbnailUrl as File).name,
        filetype: (data.thumbnailUrl as File).type,
      },
    });

    await Promise.all([
      axios.put(backgroundUrl.signedUrl, data.backgroundUrl, {
        headers: { 'Content-Type': (data.backgroundUrl as File).type },
      }),
      axios.put(thumbnailUrl.signedUrl, data.thumbnailUrl, {
        headers: { 'Content-Type': (data.thumbnailUrl as File).type },
      }),
    ]);

    await create({
      data: {
        ...data,
        backgroundUrl: backgroundUrl.url,
        thumbnailUrl: thumbnailUrl.url,
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
      <Heading style={{ color: '#2D126D' }}>Create Brand</Heading>
      <Spacer size={20} />

      <BrandForm mode="create" onSubmit={handleSubmit} />
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
