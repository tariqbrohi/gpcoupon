import { Brand } from '../Context';

const validate = (data: Brand) => {
  const {
    name,
    slug,
    countries,
    categories,
    description,
    backgroundUrl,
    terms,
    disclaimer,
    thumbnailUrl,
  } = data;

  if (!backgroundUrl) {
    return 'backgroundUrl is required';
  }

  if (!thumbnailUrl) {
    return 'thumbnailUrl is required';
  }

  if (!name) {
    return 'Name is required';
  }

  if (!slug) {
    return 'Slug is required';
  }

  if (!description) {
    return 'description is required';
  }

  if (!countries) {
    return 'countries is required';
  }

  if (!categories) {
    return 'categories is required';
  }

  if (!terms) {
    return 'categories is required';
  }

  if (!disclaimer) {
    return 'disclaimer is required';
  }

  return null;
};

export default validate;
