import axios from 'axios';
import BrandForm from './BrandForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Heading, Snackbar, Spacer } from '@growth-ui/react';
import { useCreateBrandByAffiliateMutation, useSignS3Mutation } from '@/services';
import AppContext from '@/modules/components/AppContext';
import validate from './helper/validate';
import userLocale from './helper/getLocale';

export default function CreateBrandForm() {
  const { user } = useContext(AppContext);
  const [create, { loading }] = useCreateBrandByAffiliateMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [myBrand, setMyBrand] = useState<any>({
    sub: user?.id,
    name: '',
    description: '',
    slug: '',
    disclaimer: '',
    backgroundUrl: '',
    thumbnailUrl: '',
    status: 'AVAILABLE',
    terms: '',
    categories: [],
    countries: [],
    locale: '',
  });

  const handleUpdate = (brand: any) => {
    setMyBrand(brand);
  }

  const handleSubmit = async (data: any) => {
    const errMessage = validate(data);

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
        locale: userLocale({languageCodeOnly: true})[0]
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
      <Heading style={{color: "#2D126D"}}>Create Brand</Heading>
      <Spacer size={20} />

      <BrandForm 
        mode="create" 
        brand={myBrand} 
        onSubmit={handleSubmit} 
        onUpdate={handleUpdate} 
        user={user}
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
