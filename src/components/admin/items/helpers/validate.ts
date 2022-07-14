import { isInteger, isNil } from 'lodash';
import { Item } from '../Context';

const validate = (data: Item) => {
  const {
    name,
    slug,
    categories,
    brand,
    imageUrl,
    type,
    expiresIn,
    extendedName,
    country,
    currency,
    amount,
    sortOrder,
  } = data;

  if (!imageUrl) {
    return 'imageUrl is required';
  }

  if (!isInteger(+sortOrder) || +sortOrder < 0 || +sortOrder > 10) {
    return 'sortOrder (0 to 10) is required';
  }

  if (!brand) {
    return 'brand is required';
  }

  if (!name) {
    return 'Name is required';
  }

  if (!slug) {
    return 'Slug is required';
  }

  if (!extendedName) {
    return 'extendedName is required';
  }

  if (!country) {
    return 'country is required';
  }

  if (!categories) {
    return 'categories is required';
  }

  if (!currency) {
    return 'currency is required';
  }

  if (!amount) {
    return 'amount is required';
  }

  if (!type) {
    return 'type is required';
  }

  if (!expiresIn) {
    return 'expiresIn is required';
  }

  return null;
};

export default validate;
