import Context from './Context';
import stringSimilarity from 'string-similarity';
import { FileUploader } from 'react-drag-drop-files';
import { useGetBrandsQuery, useGetCategoriesQuery } from '@/services';
import {
  countryOptions,
  Form,
  Image,
  Paragraph,
  Spacer,
} from '@growth-ui/react';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';

export default function ItemForm({ mode, onSubmit }: Props) {
  const { item, setItem } = useContext(Context);
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    await onSubmit();
    setSubmitting(false);
  };

  const customSearchFunction = (searchQuery: any, item: any) => {
    const string = item.text;

    const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

    if (similarity > 0.3) return true;

    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  if (!item) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Checkbox
        radio
        checked={item.available}
        onChange={(_, { checked }) => {
          setItem({
            ...item,
            available: !!checked,
          });
        }}
      >
        Available
      </Form.Checkbox>
      <Form.Group>
        <Form.Input
          label="Name"
          name="name"
          disabled={mode === 'update'}
          value={item.name}
          onChange={handleChange}
        />
        <Form.Input
          label="Extended Name"
          name="extendedName"
          value={item.extendedName}
          onChange={handleChange}
        />
        <Form.Input
          label="Slug"
          name="slug"
          value={item.slug}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          label="Amount"
          name="amount"
          disabled={mode === 'update'}
          value={item.amount}
          onChange={handleChange}
        />
        <Form.Input
          label="Discount Rate"
          name="discountRate"
          value={item.discountRate}
          onChange={handleChange}
        />
        <Form.Input
          label="Expiry"
          name="expiresIn"
          value={item.expiresIn}
          onChange={handleChange}
        />
        <Form.Input
          label="Sort order (0 to 10)"
          name="sortOrder"
          value={item.sortOrder}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          fluid
          search={customSearchFunction}
          scrolling
          clearable
          label="Country"
          value={item?.country || 'US'}
          options={countryOptions.map(({ flag, iso, name }) => ({
            key: iso,
            value: iso,
            text: `${flag} ${name}`,
          }))}
          onChange={(_, data) => {
            setItem({ ...item, country: data.newValues });
          }}
        />
        <Form.Select
          fluid
          scrolling
          clearable
          label="Brand"
          value={item.brand}
          options={brands?.map(({ id, name }) => ({
            key: id,
            value: id,
            text: name,
          }))}
          onChange={(_, data) => {
            setItem({ ...item, brand: data.newValues });
          }}
        />
        <Form.Select
          fluid
          label="Type"
          value={item.type || 'GIFT_ICON'}
          options={[
            {
              key: 'GIFT_CARD',
              value: 'GIFT_CARD',
              text: 'GIFT_CARD',
            },
            {
              key: 'GIFT_ICON',
              value: 'GIFT_ICON',
              text: 'GIFT_ICON',
            },
          ]}
          onChange={(_, data) => {
            console.log(data.newValues);
            setItem({ ...item, type: data.newValues });
          }}
        />
        <Form.Select
          fluid
          multiple
          scrolling
          clearable
          label="Category"
          value={item.categories}
          options={categories?.map((cat) => ({
            key: cat.id,
            text: cat.name,
            value: cat.id,
          }))}
          onChange={(_, data) => {
            setItem({ ...item, categories: data.newValues });
          }}
        />
      </Form.Group>
      <Paragraph>Item Image</Paragraph>
      <FileUploader
        types={['JPG', 'PNG', 'JPEG']}
        name="file"
        handleChange={(file: any) => {
          setItem({
            ...item,
            imageUrl: file,
          });
        }}
      />
      {item.imageUrl && (
        <>
          <Spacer size={10} />
          <Image
            src={
              typeof item.imageUrl !== 'string'
                ? URL.createObjectURL(item.imageUrl)
                : item.imageUrl
            }
          />
        </>
      )}
      <Paragraph>Coupon Image</Paragraph>
      <FileUploader
        types={['JPG', 'PNG', 'JPEG']}
        name="file"
        handleChange={(file: any) => {
          setItem({
            ...item,
            couponImageUrl: file,
          });
        }}
      />
      {item.couponImageUrl && (
        <>
          <Spacer size={10} />
          <Image
            src={
              typeof item.couponImageUrl !== 'string'
                ? URL.createObjectURL(item.couponImageUrl)
                : item.couponImageUrl
            }
          />
        </>
      )}

      <Form.Button type="submit" loading={submitting}>
        {mode}
      </Form.Button>
    </Form>
  );
}

type Props = {
  mode: 'create' | 'update';
  onSubmit: () => Promise<void>;
};