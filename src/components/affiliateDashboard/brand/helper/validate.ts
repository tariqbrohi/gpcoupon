import { isEmpty } from 'lodash';

const validate = (data: any) => {
  const {
    name,
    slug,
    countries,
    categories,
    description,
    backgroundUrl,
    terms,
    disclaimer,
    sub,
    thumbnailUrl,
    status,
    locale,
  } = data;

  if (!status) {
    return 'status is required';
  }

  if (!name) {
    return 'Name is required';
  }

  if (!description) {
    return 'description is required';
  }

  if (!disclaimer) {
    return 'disclaimer is required';
  }

  if (!terms) {
    return 'categories is required';
  }

  if (!countries) {
    return 'countries is required';
  }

  if (isEmpty(categories)) {
    return 'categories is required';
  }

  if (!backgroundUrl) {
    return 'backgroundUrl is required';
  }

  if (!thumbnailUrl) {
    return 'thumbnailUrl is required';
  }

  if (!sub) {
    return 'Business account id is required';
  }

  if (!slug) {
    return 'Slug is required';
  }

  if (!locale) {
    return 'locale is required';
  }

  return null;
};

export default validate;
