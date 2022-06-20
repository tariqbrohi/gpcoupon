import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from '@mui/material';
import { Categories, Countries } from '@/constants';
import { LoadingButton } from '@mui/lab';
import Spacer from '../Spacer';

type State = Partial<{
  description: string;
  name: string;
  extendedName: string;
  slug: string;
  amount: string;
  brand: string;
  category: string;
  expiresIn: string;
  discountRate: string;
  country: string;
  imageUrl: string;
}>;

type Props = {
  state: State;
  btnText: string;
  onSubmit: (state: State) => Promise<void>;
};

export default function CouponForm({
  state: _state,
  onSubmit,
  btnText,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<any>();
  const [state, setState] = useState<State>(_state);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/brands`)
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

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

        data.imageUrl = url || secure_url;
      }

      await onSubmit(data);
    } catch {}
    setSubmitting(false);
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
        <TextField
          id="outlined-required"
          name="discountRate"
          label="Discount Rate"
          value={state.discountRate}
          placeholder="5 (meaning 5%)"
          onChange={handleChange}
        />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="country"
            value={state.country}
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="category"
            value={state.category}
            label="Category"
            onChange={handleChange}
          >
            {Categories.map(({ key, text }) => (
              <MenuItem value={key} key={key}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextareaAutosize
          maxRows={50}
          required
          name="description"
          value={state.description}
          onChange={handleChange}
          aria-label="maximum height"
          style={{ width: 500 }}
        />
      </div>
      {data && (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="brand"
            value={state.brand}
            label="Brand"
            onChange={handleChange}
          >
            {data.map(({ id, name, slug }: any) => (
              <MenuItem value={slug} key={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
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
          variant="contained"
          loading={submitting}
          onClick={handleSubmit}
        >
          {btnText}
        </LoadingButton>
      </div>
    </Box>
  );
}
