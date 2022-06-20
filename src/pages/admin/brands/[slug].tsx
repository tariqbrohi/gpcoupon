import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import useAxios from 'axios-hooks';
import useTranslation from 'next-translate/useTranslation';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import Router, { useRouter } from 'next/router';
import { ROUTES } from '@/ROUTES';
import { Countries } from '@/constants';
import axios from 'axios';
import parseErrorMessage from '@/lib/parse-error-message';

export default withPageAuthRequired(function Brand() {
  const { query } = useRouter();
  const { lang } = useTranslation();
  const [name, setName] = React.useState('');
  const [country, setCountry] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<any>();
  const [descriptiveImage, setDescriptiveImage] = useState<any>();
  const [submitting, setSubmitting] = useState(false);
  const [{ data, loading, error }] = useAxios({
    method: 'get',
    url: `/api/brands/${query.slug}`,
  });

  useEffect(() => {
    if (data) {
      const { name, slug, description, country, descriptiveImage, logo } = data;
      setName(name);
      setSlug(slug);
      setCountry(country);
      setDescription(description);
      setLogo(logo);
      setDescriptiveImage(descriptiveImage);
    }
  }, [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (submitting || !country || !name || !description || !slug) return;

    setSubmitting(true);

    const params: any = {
      name,
      description,
      country,
      slug,
    };

    try {
      let res: any;

      if (logo !== data?.logo) {
        res = await axios.get(`/api/admin/get-signed-url`);

        let { signedUrl } = res.data;

        let formData = new FormData();
        formData.append('file', logo);
        formData.append('upload_preset', 'pgulp8vg');

        const {
          data: { url, secure_url },
        } = await axios.post(signedUrl, formData, {
          headers: {
            'Content-Type': logo.type,
          },
        });

        params.logo = url || secure_url;
      }

      if (data?.descriptiveImage !== descriptiveImage) {
        res = await axios.get(`/api/admin/get-signed-url`);

        const signedUrl = res.data.signedUrl;

        const formData = new FormData();
        formData.append('file', descriptiveImage);
        formData.append('upload_preset', 'pgulp8vg');

        res = await axios.post(signedUrl, formData, {
          headers: {
            'Content-Type': descriptiveImage.type,
          },
        });

        params.descriptiveImage = res.data.url || res.data.secure_url;
      }
    } catch (err) {
      setSubmitting(false);
      return alert('Opps something went wrong while uploading image.');
    }

    axios
      .put(`/api/admin/brands/${data?.id}`, params, { withCredentials: true })
      .then(() => {
        alert('Success');

        Router.push(ROUTES.admin.dashboard);
      })
      .catch((err) => {
        setSubmitting(false);
        alert(parseErrorMessage(err));
      });
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: `25ch` },
          '& .MuiFormControl-root': { m: 1, width: `25ch` },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            name="name"
            placeholder="GPoint"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Slug"
            name="slug"
            value={slug}
            placeholder="starbuck, mc-donald, hana-beauty-salong, ... (all lower case with -)"
            onChange={(e) => setSlug(e.target.value)}
          />
          <TextField
            id="outlined-required"
            label="Description"
            name="description"
            placeholder="Introduce Brand"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleChange}
            >
              {Countries.map(({ key, text }) => (
                <MenuItem value={key} key={key}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <label>Brand logo: </label>
          <input type="file" onChange={(e) => setLogo(e.target.files?.[0])} />
          <br />
          <br />
        </div>
        <div>
          <label>Brand description image: </label>
          <input
            type="file"
            onChange={(e) => setDescriptiveImage(e.target.files?.[0])}
          />
          <br />
          <br />
        </div>
        <div style={{ margin: '8px' }}>
          <LoadingButton
            variant="contained"
            loading={submitting}
            onClick={handleSubmit}
          >
            Update
          </LoadingButton>
        </div>
      </Box>
    </Layout>
  );
});
