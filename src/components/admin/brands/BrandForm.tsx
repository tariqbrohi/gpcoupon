import Context, { Brand } from './Context';
import stringSimilarity from 'string-similarity';
import { countryOptions, Form, Image, Spacer } from '@growth-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { useGetCategoriesQuery } from '@/services';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';

export default function BrandForm({ mode, onSubmit }: Props) {
  const { brand, setBrand } = useContext(Context);
  const { data: categories } = useGetCategoriesQuery();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    await onSubmit(brand);
    setSubmitting(false);
  };

  const customSearchFunction = (searchQuery: any, item: any) => {
    const string = item.text;

    const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

    if (similarity > 0.3) return true;

    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Checkbox
        radio
        checked={brand.available}
        onChange={(_, { checked }) => {
          setBrand({
            ...brand,
            available: !!checked,
          });
        }}
      >
        Available
      </Form.Checkbox>
      <Form.Input
        label="Business Account ID"
        name="sub"
        value={brand.sub}
        onChange={handleChange}
        disabled={mode === 'update'}
      />
      <Form.Group>
        <Form.Input
          label="Name"
          name="name"
          value={brand.name}
          onChange={handleChange}
        />
        <Form.Input
          label="Description"
          name="description"
          value={brand.description}
          onChange={handleChange}
        />
        <Form.Input
          label="Slug"
          name="slug"
          value={brand.slug}
          disabled={mode === 'update'}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Input
        label="Disclaimer"
        name="disclaimer"
        value={brand.disclaimer}
        onChange={handleChange}
      />
      <Form.Input
        label="Terms"
        name="terms"
        value={brand.terms}
        onChange={handleChange}
      />
      <Form.Group>
        <Form.Select
          fluid
          search={customSearchFunction}
          scrolling
          multiple
          clearable
          label="Countries"
          value={brand.countries}
          options={countryOptions.map(({ flag, iso, name }) => ({
            key: iso,
            value: iso,
            text: `${flag} ${name}`,
          }))}
          onChange={(_, data) => {
            setBrand({ ...brand, countries: data.newValues });
          }}
        />
        <Form.Select
          fluid
          multiple
          scrolling
          clearable
          label="Categories"
          value={brand.categories}
          options={categories?.map((cat) => ({
            key: cat.id,
            text: cat.name,
            value: cat.id,
          }))}
          onChange={(_, data) => {
            setBrand({ ...brand, categories: data.newValues });
          }}
        />
      </Form.Group>

      <span>Brand background image</span>
      <FileUploader
        types={['JPG', 'PNG', 'JPEG']}
        name="file"
        handleChange={(file: File) =>
          setBrand({ ...brand, backgroundUrl: file })
        }
      />
      <Spacer size={30} />
      {brand.backgroundUrl && (
        <>
          <br />
          <Image
            src={
              typeof brand.backgroundUrl !== 'string'
                ? URL.createObjectURL(brand.backgroundUrl)
                : brand.backgroundUrl
            }
          />
          <br />
        </>
      )}
      <span>Brand logo</span>
      <FileUploader
        types={['JPG', 'PNG', 'JPEG']}
        name="file"
        handleChange={(file: File) =>
          setBrand({ ...brand, thumbnailUrl: file })
        }
      />
      <Spacer size={30} />
      {brand.thumbnailUrl && (
        <>
          <br />
          <Image
            src={
              typeof brand.thumbnailUrl !== 'string'
                ? URL.createObjectURL(brand.thumbnailUrl)
                : brand.thumbnailUrl
            }
          />
          <br />
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
  onSubmit: (data: Brand) => Promise<void>;
};
