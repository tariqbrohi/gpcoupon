import AdminLayout from '@/layouts/AdminLayout';
import CreateItemForm from '@/components/admin/items/CreateItemForm';
import Provider from '@/components/admin/items/Provider';
import React, { useState } from 'react';
import { Form, Heading, Image, Spacer } from '@growth-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { useCreateGPointMutation, useSignS3Mutation } from '@/services';
import Router from 'next/router';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function CreateItem() {
  const [state, setState] = useState<any>({});
  const [sign] = useSignS3Mutation();
  const [create, { loading }] = useCreateGPointMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: imageUrl } = await sign({
      data: {
        filename: (state.imageUrl as File).name,
        filetype: (state.imageUrl as File).type,
      },
    });

    await axios.put(imageUrl.signedUrl, state.imageUrl, {
      headers: { 'Content-Type': (state.imageUrl as File).type },
    });

    create({
      data: {
        ...state,
        amount: +state.amount,
        imageUrl: imageUrl.url,
      },
    })
      .then(() => {
        Router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const val = e.target.value;

    setState({
      ...state,
      [name]: val,
    });
  };

  return (
    <>
      <AdminLayout>
        <Provider>
          <Heading as="h2">Create GPoint</Heading>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                label="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <Form.Input
                label="amount"
                name="amount"
                value={state.amount}
                onChange={handleChange}
              />
              <Form.Input
                label="Slug"
                name="slug"
                value={state.slug}
                onChange={handleChange}
              />
            </Form.Group>

            <span>Image</span>
            <FileUploader
              types={['JPG', 'PNG', 'JPEG']}
              name="file"
              handleChange={(file: File) =>
                setState({ ...state, imageUrl: file })
              }
            />
            <Spacer size={30} />
            {state.imageUrl && (
              <>
                <br />
                <Image
                  src={
                    typeof state.imageUrl !== 'string'
                      ? URL.createObjectURL(state.imageUrl)
                      : state.imageUrl
                  }
                />
                <br />
              </>
            )}

            <Form.Button type="submit" loading={loading}>
              Create
            </Form.Button>
          </Form>
        </Provider>
      </AdminLayout>
    </>
  );
});
