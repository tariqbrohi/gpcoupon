import axios from 'axios';
import BrandForm from './BrandForm';
import Context, { Brand } from './Context';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading, Snackbar } from '@growth-ui/react';
import { isEmpty } from 'lodash';
import {
  useUpdateBrandMutation,
  useGetBrandQuery,
  useSignS3Mutation,
} from '@/services';
import validate from './helpers/validate';

export default function UpdateBrandFrom() {
  const {
    query: { id },
  } = useRouter();
  const { data } = useGetBrandQuery({
    data: {
      id: id as string,
    },
  });

  const { setBrand } = useContext(Context);
  const [update, { loading }] = useUpdateBrandMutation();
  const [sign] = useSignS3Mutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    console.log('@components/admin/brands/EditBrandForm - data: ', data);
    if (data) {
      setBrand({
        sub: data.sub || '',
        name: data.name || '',
        slug: data.slug || '',
        description: data.description,
        disclaimer: data.disclaimer,
        backgroundUrl: data.backgroundUrl,
        thumbnailUrl: data.thumbnailUrl,
        available: data.status === 'AVAILABLE',
        terms: data.terms,
        categories: data.categoryIDs,
        countries: data.countries,
        metadata: data.metadata?.toString() || '{}',
      });
    }
  }, [data]);

  const handleSubmit = async (brand: Brand) => {
    const errMessage = validate(brand);

    if (errMessage || loading) {
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
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Heading>Edit Brand</Heading>
      <BrandForm mode="update" onSubmit={handleSubmit} />
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
