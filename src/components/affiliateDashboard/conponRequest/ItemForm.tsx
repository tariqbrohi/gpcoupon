/* eslint-disable jsx-a11y/alt-text */
import stringSimilarity from 'string-similarity';
import { FileUploader } from 'react-drag-drop-files';
import {
  useGetBrandsByAffiliateQuery,
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
  useEffect,
  useState,
  useRef,
} from 'react';
import styled from 'styled-components';
import AppContext from '@/modules/components/AppContext';

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
  background-color: #622af3;
  color: #fff;
  border-radius: 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #2d126d;
  }
`;

export default function ItemForm({ mode, onSubmit, item, onUpdate }: Props) {
  const { user } = useContext(AppContext);
  const [myItem, setMyItem] = useState(item);
  const [submitting, setSubmitting] = useState(false);
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsByAffiliateQuery({
    data: {
      affiliate: true,
      sub: user?.username,
    },
  });

  useEffect(() => {
    console.log('item ==========', item);
    setMyItem(item);
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    if (mode === 'create' || myItem.name !== item.name) {
      myItem.slug = getSlug();
    }

    onUpdate(myItem);

    e.preventDefault();

    setSubmitting(true);
    await onSubmit(myItem);
    setSubmitting(false);
  };

  const getDiscountRate = () => {
    let discountRate = 0;
    if (myItem.originalPrice > 0 && myItem.price > 0) {
      discountRate = parseFloat(
        (
          ((myItem.originalPrice - myItem.price) / myItem.originalPrice) *
          100
        ).toFixed(2),
      );
    }
    return discountRate;
  };

  // my profit
  if (mode === 'create') {
    if (myItem.price > 0) {
      const myProfit = myItem.price - myItem.price * 0.2;
      myItem.amount = myProfit;
    }
  }

  const getSlug = () => {
    const time = new Date().toISOString();
    const ms = Date.parse(time);

    const slug = `${myItem.name.toLowerCase().replaceAll(' ', '_')}_${ms}`;
    return slug;
  };

  const customSearchFunction = (searchQuery: any, item: any) => {
    const string = item.text;

    const similarity = stringSimilarity.compareTwoStrings(string, searchQuery);

    if (similarity > 0.3) return true;

    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log('e.target.name ==========', e.target.value);
    setMyItem({
      ...myItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === '' || regex.test(e.target.value)) {
      setMyItem({
        ...myItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!myItem) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <FormSection>
        <Spacer size={30} />
        <Form.Group>
          <Form.Input
            label="Coupon Name"
            name="name"
            value={myItem.name}
            onChange={handleChange}
          />
          <Form.Input
            label="Extended Name"
            name="extendedName"
            value={myItem.extendedName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            adornment="$"
            label="Original Price"
            name="originalPrice"
            value={myItem.originalPrice === 0 ? '' : myItem.originalPrice}
            onChange={handleChangePrice}
            disabled={mode === 'update'}
            filled={mode === 'update'}
          />
          <Form.Input
            adornment="$"
            label="Retail Price"
            name="price"
            value={myItem.price === 0 ? '' : myItem.price}
            onChange={handleChangePrice}
            disabled={mode === 'update'}
            filled={mode === 'update'}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input // not related to discountRate in Item table in DB
            adornment="%"
            adornmentPosition="right"
            label="Discount Rate"
            name="discountRate"
            value={getDiscountRate()}
            disabled
            filled
          />
          <Form.Input
            adornment="$"
            label="My Profit"
            name="amount"
            value={myItem.amount}
            onChange={handleChangePrice}
            disabled
            filled
          />
          <Form.Input
            label="Expiry"
            name="expiresIn"
            value={myItem.expiresIn}
            onChange={handleChangePrice}
          />
          <Form.Select
            search
            scrolling
            clearable
            label="Currency"
            value={myItem?.currency || 'GPT'}
            options={currencyList}
            onChange={(_, data) => {
              setMyItem({ ...myItem, currency: data.newValues });
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Sort Order (0 to 10)"
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
            value={myItem?.country || 'US'}
            options={countryOptions.map(({ flag, iso, name }) => ({
              key: iso,
              value: iso,
              text: `${flag} ${name}`,
            }))}
            onChange={(_, data) => {
              setMyItem({ ...myItem, country: data.newValues });
            }}
          />
          <Form.Select
            fluid
            scrolling
            clearable
            label="Brand"
            disabled={mode === 'update'}
            value={myItem.brandId}
            options={brands?.brands?.map(({ id, name }) => ({
              key: id,
              value: id,
              text: name,
            }))}
            onChange={(_, data) => {
              setMyItem({ ...myItem, brandId: data.newValues });
            }}
          />
          <Form.Select
            fluid
            label="Type"
            disabled={mode === 'update'}
            value={myItem.type || 'GIFT_ICON'}
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
              setMyItem({ ...myItem, type: data.newValues });
            }}
          />
          <Form.Select
            fluid
            multiple
            scrolling
            clearable
            label="Category"
            value={myItem.categoryIDs}
            options={categories?.map((cat) => ({
              key: cat.id,
              text: cat.name,
              value: cat.id,
            }))}
            onChange={(_, data) => {
              setMyItem({ ...myItem, categoryIDs: data.newValues });
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
          <Paragraph>Item Image</Paragraph>
          <Spacer size={10} />
          <FileUploader
            types={['JPG', 'PNG', 'JPEG']}
            name="file"
            handleChange={(file: any) => {
              setMyItem({
                ...myItem,
                imageUrl: file,
              });
            }}
          />
          <Spacer size={30} />
          {myItem.imageUrl && (
            <>
              <Spacer size={10} />
              <Image
                src={
                  typeof myItem.imageUrl !== 'string'
                    ? URL.createObjectURL(myItem.imageUrl)
                    : myItem.imageUrl
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
              setMyItem({
                ...myItem,
                couponImageUrl: file,
              });
            }}
          />
          <Spacer size={30} />
          {myItem.couponImageUrl && (
            <>
              <Spacer size={10} />
              <Image
                src={
                  typeof myItem.couponImageUrl !== 'string'
                    ? URL.createObjectURL(myItem.couponImageUrl)
                    : myItem.couponImageUrl
                }
              />
            </>
          )}
        </ImgAndLogoContainer>
      </FormSection>

      <div>
        <Spacer size={50} />
        <FormBtn type="submit" loading={submitting}>
          submit
        </FormBtn>
      </div>
    </Form>
  );
}

type Props = {
  item: any;
  mode: 'create' | 'update';
  onSubmit: (data: any) => Promise<void>;
  onUpdate: (data: any) => void;
};

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
