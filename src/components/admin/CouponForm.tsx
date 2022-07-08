import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  InputLabel,
  MenuItem,
  // Select,
  TextareaAutosize,
} from '@mui/material';
import stringSimilarity from 'string-similarity';
import { countryOptions, Select, Spacer, Input } from '@growth-ui/react';
import { LoadingButton } from '@mui/lab';
// import Spacer from '../Spacer';
import { isNil, omitBy } from 'lodash';
import {
  useCreateItemMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from '@/services';
import parseErrorMessage from '@/lib/parse-error-message';

type State = Partial<{
  name: string;
  discountRateType: string;
  extendedName: string;
  slug: string;
  categories: string[];
  amount: string;
  brandId: string;
  type: string;
  expiresIn: string;
  discountRate: string;
  country: string;
  imageUrls: any;
}>;

type Props = {
  state?: State;
  btnText: string;
  onSubmit: (state: State) => Promise<void>;
};

const customSearchFunction = (searchQuery: any, item: any) => {
  const string = item.text;

  const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

  if (similarity > 0.3) return true;

  return false;
};

const initState = {
  name: '',
  extendedName: '',
  slug: '',
  type: '',
  amount: '',
  brandId: '',
  categories: [],
  expiresIn: '',
  discountRate: '',
  country: '',
  imageUrls: {},
};

export default function CouponForm({
  state: _state = initState,
  onSubmit,
  btnText,
}: Props) {
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const [image, setImage] = useState<any>();
  const [state, setState] = useState<State>(_state);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data: any = {
      ...state,
      expiresIn: +(state.expiresIn || 0),
    };

    if (state.amount) {
      data.amount = +state.amount;
    }

    if (state.discountRate) {
      data.discountRate = +state.discountRate;
    }

    if (
      !state.country ||
      !state.type ||
      !state.brandId ||
      state.categories!.length === 0
    ) {
      return alert('Required field is missing');
    }

    setSubmitting(true);

    try {
      if (image) {
        const res = await axios.get(`/api/admin/get-signed-url`);

        const { signedUrl } = res.data;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'pgulp8vg');

        const {
          data: { url, secure_url },
        } = await axios.post(signedUrl, formData, {
          headers: {
            'Content-Type': image.type,
          },
        });
        console.log(url, secure_url, ' dasdasjdakjdka jka');
        data.imageUrls = {
          small: url || secure_url,
          medium: url || secure_url,
          large: url || secure_url,
        };
      }

      const ommitedData = omitBy(data, (v) => v === '' || isNil(v));
      console.log(data, ommitedData);
      await onSubmit(ommitedData);
    } catch (err) {
      alert(parseErrorMessage(err));
      setSubmitting(false);
    }
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
          value={state.name}
          placeholder="GPoint Wallet G100.00 Gift Coupon"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Extended Name"
          name="extendedName"
          value={state.extendedName}
          placeholder="GPoint Wallet G100.00 Gift Coupon"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Type"
          name="type"
          value={state.type}
          placeholder="GIFT_CARD or GIFT_ICON"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Slug"
          name="slug"
          value={state.slug}
          placeholder="jangtu-bossam"
          onChange={handleChange}
        />
        <TextField
          id="outlined-required"
          name="amount"
          value={state.amount}
          label="Amount"
          placeholder="100"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          name="expiresIn"
          label="Expires"
          value={state.expiresIn}
          placeholder="60 (60 days)"
          onChange={handleChange}
        />

        <Spacer size={30} />
        <Select
          scrolling
          multiple
          label="Category"
          value={state.categories}
          options={categories?.map(({ name, id }) => ({
            key: id,
            text: name,
            value: id,
          }))}
          onChange={(_, { newValues }) => {
            console.log(newValues);
            setState({
              ...state,
              categories: newValues,
            });
          }}
        />
        <Spacer size={30} />
        <Select
          value={state.country}
          onChange={(e: any, data) => {
            setState({
              ...state,
              country: data.newValues,
            });
          }}
          search={customSearchFunction}
          label="Country"
          options={countryOptions.map((option) => ({
            key: option.iso,
            text: `${option.flag} ${option.name}`,
            value: option.iso,
          }))}
        />
        <Spacer size={30} />
        <Select
          value={state.brandId}
          onChange={(e: any, data) => {
            setState({
              ...state,
              brandId: data.newValues,
            });
          }}
          search={customSearchFunction}
          label="Brand"
          options={brands?.map(({ id, name }) => ({
            key: id,
            text: name,
            value: id,
          }))}
        />

        <TextField
          id="outlined-required"
          name="discountRate"
          label="Discount Rate"
          value={state.discountRate}
          placeholder="5 (meaning 5%)"
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <TextareaAutosize
          maxRows={50}
          required
          name="description"
          value={state.description}
          onChange={handleChange}
          aria-label="maximum height"
          style={{ width: 500 }}
        /> */}
      </div>

      <Spacer size={30} />
      <div>
        <label>Image</label>
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];

            setImage(file);
          }}
        />
      </div>
      <div style={{ margin: '8px' }}>
        <LoadingButton
          loading={submitting}
          variant="contained"
          onClick={handleSubmit}
        >
          {btnText}
        </LoadingButton>
      </div>
    </Box>
  );
}
