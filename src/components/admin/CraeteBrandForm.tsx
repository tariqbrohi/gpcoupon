import React, { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import parseErrorMessage from '@/lib/parse-error-message';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';
import stringSimilarity from 'string-similarity';
import { countryOptions, Select, Spacer, Input } from '@growth-ui/react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  // Select,
  SelectChangeEvent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useGetCategoriesQuery } from '@/services';

export default function CreateBrandForm() {
  const { data, loading } = useGetCategoriesQuery();
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
  const [countries, setCountries] = useState([]);
  const [slug, setSlug] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<any>();
  const [descriptiveImage, setDescriptiveImage] = useState<any>();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    // setCounties([...countries, event.target.value as string]);
    console.log(event);
  };

  const customSearchFunction = (searchQuery: any, item: any) => {
    const string = item.text;

    const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

    if (similarity > 0.3) return true;

    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      submitting ||
      categories.length === 0 ||
      countries.length === 0 ||
      !name ||
      !description ||
      !slug ||
      !id
    )
      return;

    setSubmitting(true);

    const params: any = {
      name,
      description,
      countries,
      slug,
      id,
      categories,
    };

    try {
      let res = await axios.get(`/api/admin/get-signed-url`);

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

      params.thumbnailUrl = url || secure_url;

      res = await axios.get(`/api/admin/get-signed-url`);

      signedUrl = res.data.signedUrl;

      formData = new FormData();
      formData.append('file', descriptiveImage);
      formData.append('upload_preset', 'pgulp8vg');

      res = await axios.post(signedUrl, formData, {
        headers: {
          'Content-Type': descriptiveImage.type,
        },
      });

      params.backgroundUrl = res.data.url || res.data.secure_url;
    } catch (err) {
      setSubmitting(false);
      return alert('Opps something went wrong while uploading image.');
    }

    axios
      .post('/api/admin/brands', params, { withCredentials: true })
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
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Slug"
          name="slug"
          placeholder="starbuck, mc-donald, hana-beauty-salong, ... (all lower case with -)"
          onChange={(e) => setSlug(e.target.value)}
        />
        <TextField
          id="outlined-required"
          label="Description"
          name="description"
          placeholder="Introduce Brand"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Spacer size={30} />
        <Input
          fluid
          label="Business ID"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Spacer size={30} />
        <Select
          value={categories}
          label="categories"
          multiple
          onChange={(e: any, data) => {
            setCategories(data.newValues);
          }}
          options={data?.map(({ id, name, slug }) => ({
            key: id,
            text: name,
            value: id,
          }))}
        />
        <Spacer size={30} />
        <Select
          clearable
          value={countries}
          onChange={(e: any, data) => {
            setCountries(data.newValues);
          }}
          search={customSearchFunction}
          multiple
          label="Countries"
          options={countryOptions.map((option) => ({
            key: option.iso,
            text: `${option.flag} ${option.name}`,
            value: option.iso,
          }))}
        />
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">countries</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countries}
            label="countries"
            multiple
            onChange={handleChange}
          >
            {Countries.map(({ key, text }) => (
              <MenuItem value={key} key={key}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
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
          Create
        </LoadingButton>
      </div>
    </Box>
  );
}
