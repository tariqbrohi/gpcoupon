/* eslint-disable jsx-a11y/alt-text */
import stringSimilarity from 'string-similarity';
import {
  countryOptions,
  Form,
  Image,
  Spacer,
  StyledContainer,
} from '@growth-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { useGetCategoriesQuery, useWalletAccountMutation } from '@/services';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
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
  max-width: 442px;

  & > label {
    height: 100px;
    flex-direction: column;
    padding-top: 20px;
  }
`;

const FormBtn = styled(Form.Button)`
  background-color: #622af3;
  color: #fff;
  border-radius: 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #2d126d;
  }
`;

const FormTextArea = styled(Form.TextArea)`
  ${StyledContainer} {
    & > span {
      display: contents;
    }

    & > textarea {
      padding-top: 10px;
    }
  }
`;

export default function BrandForm({
  mode,
  brand,
  onSubmit,
  onUpdate,
  user,
}: Props) {
  const [myBrand, setMyBrand] = useState<any>(brand);
  const { data: categories } = useGetCategoriesQuery();
  const [submitting, setSubmitting] = useState(false);

  const [walletAcct, { loading }] = useWalletAccountMutation();

  const fetchWalletAccountInfo = async () => {
    // console.log('@fetchWalletAccountInfo', user?.username);

    await walletAcct({
      data: {
        username: user?.username,
      },
    })
      .then(({ data }) => {
        // console.log('data', data);
        if (data.account !== null) {
          setMyBrand({
            ...myBrand,
            sub: data.account.username,
            metadata: {
              owner: data.account,
              businessName: `${data.account.profile.firstName} ${data.account.profile.lastName}`,
            },
          });
        } else {
          alert(
            'Your business account is not logged in. Please login to your business account and try again.',
          );
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (user !== null) {
      fetchWalletAccountInfo();
    }
  }, [user]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // console.log('@affiliateDashboard/brand/BrandForm - myBrand', myBrand);
    if (mode === 'create') {
      myBrand.slug = getSlug();
    }

    onUpdate(myBrand);

    setSubmitting(true);
    await onSubmit(myBrand);
    setSubmitting(false);
  };

  const customSearchFunction = (searchQuery: any, item: any) => {
    const string = item.text;

    const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

    if (similarity > 0.3) return true;

    return false;
  };

  const getSlug = () => {
    const time = new Date().toISOString();
    const ms = Date.parse(time);

    const slug = `${myBrand.name.toLowerCase().replaceAll(' ', '_')}_${ms}`;
    return slug;
  };

  const removeTags = (str: any) => {
    if (str === null || str === undefined) {
      return false;
    }
    return str.replace(/(<([^>]+)>)/gi, '');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === 'terms' || e.target.name === 'disclaimer') {
      setMyBrand({
        ...myBrand,
        [e.target.name]: `<p>${e.target.value}</p>`,
      });
    } else {
      setMyBrand({
        ...myBrand,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Checkbox
        radio
        checked={myBrand.status === 'AVAILABLE'}
        onChange={(_, { checked }) => {
          setMyBrand({
            ...myBrand,
            status: checked ? 'AVAILABLE' : 'UNAVAILABLE',
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
            name="username"
            placeholder={user?.username}
            disabled
          />

          <Form.Input
            label="Business Name"
            name="businessName"
            placeholder={`${user?.profile.firstName} ${user?.profile.lastName}`}
            disabled
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Brand Name"
            name="name"
            value={myBrand.name}
            onChange={handleChange}
          />
          {mode === 'update' && (
            <Form.Input
              label="Slug"
              name="slug"
              placeholder={myBrand.slug}
              disabled
            />
          )}
        </Form.Group>

        <FormTextArea
          label="Description"
          name="description"
          value={myBrand.description}
          onChange={handleChange}
        />

        <FormTextArea
          label="Disclaimer"
          name="disclaimer"
          value={removeTags(myBrand?.disclaimer)}
          onChange={handleChange}
        />

        <FormTextArea
          label="Terms"
          name="terms"
          value={removeTags(myBrand?.terms)}
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
            value={myBrand.countries}
            options={countryOptions.map(({ flag, iso, name }) => ({
              key: iso,
              value: iso,
              text: `${flag} ${name}`,
            }))}
            onChange={(_, data) => {
              setMyBrand({ ...myBrand, countries: data.newValues });
            }}
          />

          <Form.Select
            fluid
            multiple
            scrolling
            clearable
            label="Categories"
            value={myBrand.categories}
            options={categories?.map((cat) => ({
              key: cat.id,
              text: cat.name,
              value: cat.id,
            }))}
            onChange={(_, data) => {
              setMyBrand({ ...myBrand, categories: data.newValues });
            }}
          />
        </Form.Group>
        <Spacer size={30} />
      </FormSection>

      <div>
        <Spacer size={50} />
      </div>

      <FormSection style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <ImgAndLogoContainer>
          <span>Brand background image</span>
          <Spacer size={10} />
          <FileUploader
            types={['JPG', 'PNG', 'JPEG']}
            name="file"
            handleChange={(file: File) =>
              setMyBrand({ ...myBrand, backgroundUrl: file })
            }
          />
          <Spacer size={30} />
          {myBrand.backgroundUrl && (
            <>
              <br />
              <Image
                src={
                  typeof myBrand.backgroundUrl !== 'string'
                    ? URL.createObjectURL(myBrand.backgroundUrl)
                    : myBrand.backgroundUrl
                }
              />
              <br />
            </>
          )}
        </ImgAndLogoContainer>
        <Spacer size={40} />

        <ImgAndLogoContainer>
          <span>Brand logo</span>
          <Spacer size={10} />
          <FileUploader
            types={['JPG', 'PNG', 'JPEG']}
            name="file"
            handleChange={(file: File) =>
              setMyBrand({ ...myBrand, thumbnailUrl: file })
            }
          />
          <Spacer size={30} />
          {myBrand.thumbnailUrl && (
            <>
              <br />
              <Image
                src={
                  typeof myBrand.thumbnailUrl !== 'string'
                    ? URL.createObjectURL(myBrand.thumbnailUrl)
                    : myBrand.thumbnailUrl
                }
              />
              <br />
            </>
          )}
        </ImgAndLogoContainer>
      </FormSection>

      <div>
        <Spacer size={50} />
        <FormBtn type="submit" loading={submitting}>
          {mode}
        </FormBtn>
      </div>
    </Form>
  );
}

type Props = {
  mode: 'create' | 'update';
  brand: any;
  onSubmit: (data: any) => Promise<void>;
  onUpdate: (data: any) => void;
  user: any;
};
