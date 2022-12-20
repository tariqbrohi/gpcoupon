import { isEmpty } from 'lodash';

const validate = (data: any) => {
  const {
    name,
    extendedName,
    originalPrice,
    price,
    currency,
    amount,
    expiresIn,
    slug,
    country,
    brandId,
    type,
    categoryIDs,
    imageUrl,
    couponImageUrl,
    locale
  } = data;

  if (!name) {
    return 'Name is required';
  }

  if (!extendedName) {
    return 'extendedName is required';
  }

  if (!originalPrice || originalPrice === 0) {
    return 'originalPrice is required';
  }

  if (!price || price === 0) {
    return 'categories is required';
  }

  if (!currency) {
    return 'currency is required';
  }

  if (!country) {
    return 'country is required';
  }

  if (isEmpty(categoryIDs)) {
    return 'categories is required';
  }

  if (!imageUrl) {
    return 'backgroundUrl is required';
  }

  if (!couponImageUrl) {
    return 'couponImageURl is required';
  }

  if (!amount || amount === 0) {
    return 'amount is required';
  }

  if (!slug) {
    return 'Slug is required';
  }

  if (!expiresIn || expiresIn === 0) {
    return 'expiresIn is required';
  }

  if (!brandId) {
    return 'brandId is required';
  }

  if (!type) {
    return 'type is required';
  }

  if (!locale) {
    return 'locale is required';
  }

  return null;
};

export default validate;
