export const nameToSlug = (name: string) =>
  name.toLowerCase().replaceAll(' ', '-');

export const slugToNameAndAmount = (slug: string) => {
  const nameWithAmount = slug.split('-');
  const amount = nameWithAmount.pop();
  const name = nameWithAmount.join(' ');

  return { name, amount };
};
