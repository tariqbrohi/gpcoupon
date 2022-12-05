import axios from 'axios';
import BrandForm from './BrandForm';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useEffect, useState, ChangeEvent, } from 'react';
import { useRouter } from 'next/router';
import { Heading, Snackbar } from '@growth-ui/react';
import { isEmpty } from 'lodash';
import {
  useGetBrandByAffiliateQuery,
  useUpdateBrandByAffiliateMutation,
  useSignS3Mutation,
} from '@/services';
import AppContext from '@/modules/components/AppContext';
import validate from './validate';

export default function UpdateBrandForm() {
  const {
    query: { id },
  } = useRouter();

  const { data } = useGetBrandByAffiliateQuery({
    data: {
      id: id as string,
    },
  });

  const { user } = useContext(AppContext);
  const [ myBrand, setMyBrand ] = useState<any>({});
  const [update, { loading }] = useUpdateBrandByAffiliateMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const fetchData = async() => {
      setMyBrand({
        ...data,
        categories: data?.categoryIDs,
      });
    };

    fetchData();

  },[data]); 

  const handleUpdate = (brand: any) => {
    setMyBrand(brand);
  }

  const handleSubmit = async (brand: any) => {
    const errMessage = validate(brand);

    if (errMessage || loading) {
      alert(errMessage);
      return setError(errMessage);
    }

    const promises: any = [];

    let backgroundUrl = brand.backgroundUrl;
    let thumbnailUrl = brand.thumbnailUrl;

    if (!brand.backgroundUrl || typeof brand.backgroundUrl !== 'string') {
      const { data } = await sign({
        data: {
          filename: (brand.backgroundUrl as File).name,
          filetype: (brand.backgroundUrl as File).type,
        },
      });

      backgroundUrl = data.url;

      promises.push(
        axios.put(data.signedUrl, brand.backgroundUrl, {
          headers: { 'Content-Type': (brand.backgroundUrl as File).type },
        }),
      );
    }

    if (!brand.thumbnailUrl || typeof brand.thumbnailUrl !== 'string') {
      const { data } = await sign({
        data: {
          filename: (brand.thumbnailUrl as File).name,
          filetype: (brand.thumbnailUrl as File).type,
        },
      });

      thumbnailUrl = data.url;

      promises.push(
        axios.put(data.signedUrl, brand.thumbnailUrl, {
          headers: { 'Content-Type': (brand.thumbnailUrl as File).type },
        }),
      );
    }

    if (!isEmpty(promises)) {
      await Promise.all([promises]);
    }

    await update({
      data: {
        ...brand,
        id: data!.id,
        backgroundUrl: backgroundUrl as string,
        thumbnailUrl: thumbnailUrl as string,
      },
    })
      .then(() => {
        setSuccess(true);
        alert('Successfully Updated!');
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Heading>Edit Brand</Heading>
      <BrandForm 
        mode="update" 
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
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
