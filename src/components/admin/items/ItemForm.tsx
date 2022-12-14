/* eslint-disable jsx-a11y/alt-text */
import Context from './Context';
import stringSimilarity from 'string-similarity';
import { FileUploader } from 'react-drag-drop-files';
import {
  // useGetAffiliatesQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from '@/services';
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
import styled from 'styled-components';
import { currency } from '@/lib/currency-format';

const FormSection = styled.section`
  box-shadow: 0px 4px 4px 1px #00000040;
  padding: 10px 30px;
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
  background-color: #622AF3;
  color: #fff;
  border-radius: 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #2D126D;
  }
`;

export default function ItemForm({ mode, onSubmit }: Props) {
  const { item, setItem } = useContext(Context);
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery({
    data: {
      affiliate: true,
    },
  });

  const currencyList = [
    {
      key: 'GPT',
      value: 'GPT',
      text: 'GPT',
    },
    {
      key: 'USD',
      value: 'USD',
      text: 'USD',
    },
    {
      key: 'KRW',
      value: 'KRW',
      text: 'KRW',
    },
    {
      key: 'CAD',
      value: 'CAD',
      text: 'CAD',
    },
    {
      key: 'EUR',
      value: 'EUR',
      text: 'EUR',
    },
    {
      key: 'AED',
      value: 'AED',
      text: 'AED',
    },
    {
      key: 'AFN',
      value: 'AFN',
      text: 'AFN',
    },
    {
      key: 'ALL',
      value: 'ALL',
      text: 'ALL',
    },
    {
      key: 'AMD',
      value: 'AMD',
      text: 'AMD',
    },

  ];
  
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    await onSubmit();
    setSubmitting(false);
  };

  if (item.originalPrice > 0 && item.price > 0) {
    const totDiscountRate = parseFloat(((item.originalPrice - item.price) / item.originalPrice * 100).toFixed(2));

    item.totDiscountRate = totDiscountRate;
  }

  if (item.price > 0) {
    const merchantProfitRate = item.price - (item.price * 0.2);

    item.amount = merchantProfitRate;
  }

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

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === '' || regex.test(e.target.value)) {
      setItem({
        ...item,
        [e.target.name]: e.target.value,
      });
    }
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

      <FormSection>
        <Spacer size={30} />
        <Form.Group>
          <Form.Input
            label="Coupon Name"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
          <Form.Input
            label="Extended Name"
            name="extendedName"
            value={item.extendedName}
            onChange={handleChange}
          />
          {/* <Form.Input
            label="InfluencerId"
            name="influencerId"
            value={item.influencerId}
            onChange={handleChange}
          /> */}
        </Form.Group>

        <Form.Group>
          <Form.Input
            adornment="$"
            label="Original Price"
            name="originalPrice"
            value={item.originalPrice === 0 ? '' : item.originalPrice}
            onChange={handleChangePrice}
            disabled={mode === 'update'}
            filled
          />
          <Form.Input
            adornment="$"
            label="Retail Price"
            name="price"
            value={item.price === 0 ? '' : item.price}
            onChange={handleChangePrice}
            disabled={mode === 'update'}
            filled
          />
          {/* <Form.Input
            label="Currency"
            name="currency"
            disabled={mode === 'update'}
            placeholder="GPT, KRW, etc... "
            value={item.currency}
            onChange={handleChange}
          /> */}

          <Form.Select
            search
            scrolling
            clearable
            label="Currency"
            value={item?.currency || 'GPT'}
            options={currencyList}
            // options={currencyOption.map(({ code }: any) => ({
            //   key: code,
            //   value: code,
            //   text: code,
            // }))}
            onChange={(_, data) => {
              setItem({ ...item, currency: data.newValues });
            }}
          />

          {/* <Form.Input
            label="Influencer Discount Rate"
            name="influencerDiscountRate"
            value={item.influencerDiscountRate}
            onChange={handleChange}
          /> */}
        </Form.Group>

        <Form.Group>
          {/* <Form.Input
            adornment="%"
            adornmentPosition='right'
            // label="Total Discount Rate" 이름변경 기록용.. 추후 지워둘 예정
            label="Total Cashback Rate"
            name="discountRate"
            value={item.discountRate}
            onChange={handleChange}
            disabled={mode === 'create' || mode === 'update'}
          /> */}
          {/* <Form.Input
            adornment="%"
            adornmentPosition='right'
            // label="Customer Discount Rate" 이름변경 기록용.. 추후 지워둘 예정
            label="Reward Cashback Rate"
            name="customerDiscountRate"
            value={item.customerDiscountRate}
            onChange={handleChange}
          /> */}
          <Form.Input
            adornment="%"
            adornmentPosition='right'
            label="Discount Rate"
            name="totDiscountRate"
            value={item.totDiscountRate === 0 ? '' : item.totDiscountRate}
            onChange={handleChangePrice}
            disabled={mode === 'create' || mode === 'update'}
            filled
          />
          <Form.Input
            adornment="$"
            // label="Discount Price" 이름변경 기록용.. 추후 지워둘 예정
            label="Merchant Profit"
            name="amount"
            value={item.amount === 0 ? '' : item.amount}
            onChange={handleChangePrice}
            disabled={mode === 'create' || mode === 'update'}
            filled
          />
          <Form.Input
            label="Expiry"
            name="expiresIn"
            value={item.expiresIn}
            onChange={handleChangePrice}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Slug"
            name="slug"
            value={item.slug}
            onChange={handleChange}
          />
          <Form.Input
            label="Sort Order (0 to 10)"
            name="sortOrder"
            value={item.sortOrder === 0 ? '' : item.sortOrder}
            // value={item.sortOrder}
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
            disabled={mode === 'update'}
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
            disabled={mode === 'update'}
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
              // console.log(data.newValues);
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
        <Spacer size={30} />
      </FormSection>

      <div>
        <Spacer size={50} />
      </div>

      <FormSection style={{display: "flex", justifyContent: "space-evenly"}}>
        <ImgAndLogoContainer>
          <Paragraph>Item Image</Paragraph>
          <Spacer size={10} />
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
          <Spacer size={30} />
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
        </ImgAndLogoContainer>
        <Spacer size={40} />

        <ImgAndLogoContainer>
          <Paragraph>Coupon Image</Paragraph>
          <Spacer size={10} />
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
          <Spacer size={30} />
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
  onSubmit: () => Promise<void>;
};
