/* eslint-disable jsx-a11y/alt-text */
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
import styled from 'styled-components';

const FormSection = styled.section`
  box-shadow: 0px 4px 4px 1px #00000040;
  padding: 10px 30px;
`;

const FormInputText = styled(Form.Input)`
  height: 100px;
`;

const ImgAndLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  const handleChange = (
    // e: ChangeEvent<HTMLInputElement>
    e: { target: { name: any; value: any; }; }
    ) => {
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

      <FormSection>
        <Spacer size={30} />

        <Form.Group>
          <Form.Input
            label="Business User Name"
            name="sub"
            value={brand.sub}
            onChange={handleChange}
            disabled={mode === 'update'}
          />
          
          <Form.Input
            label="Business Name"
            name="sub"
            value={brand.sub}
            onChange={handleChange}
            disabled={mode === 'create'}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Name"
            name="name"
            value={brand.name}
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

        {/* <FormInputText
          label="Description"
          name="description"
          value={brand.description}
          onChange={handleChange}
        />

        <FormInputText
          label="Disclaimer"
          name="disclaimer"
          value={brand.disclaimer}
          onChange={handleChange}
        />

        <FormInputText
          label="Terms"
          name="terms"
          value={brand.terms}
          onChange={handleChange}
        /> */}
        
        <Form.TextArea 
          label="Description"
          name="description"
          value={brand.description}
          onChange={handleChange}
        />
        
        <Form.TextArea
          label="Disclaimer"
          name="disclaimer"
          value={brand.disclaimer}
          onChange={handleChange}
        />

        <Form.TextArea
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
        <Spacer size={30} />
      </FormSection>

      <div>
        <Spacer size={50} />
      </div>

      <FormSection style={{display: "flex", justifyContent: "space-around"}}>
        <ImgAndLogoContainer>
          <span>Brand background image</span>
          <Spacer size={10} />
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
        </ImgAndLogoContainer>

        <ImgAndLogoContainer>
          <span>Brand logo</span>
          <Spacer size={10} />
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
        </ImgAndLogoContainer>
      </FormSection>

      <div>
        <Spacer size={50} />
        <Form.Button type="submit" loading={submitting}>
          {mode}
        </Form.Button>
      </div>
    </Form>
  );
}

type Props = {
  mode: 'create' | 'update';
  onSubmit: (data: Brand) => Promise<void>;
};
