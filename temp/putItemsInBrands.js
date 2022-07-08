const brands = require('../seed/brands.json');
const { uniq } = require('lodash');
const items = require('./items-us.json');
const { writeFile } = require('fs');

const dict = {};

const arr = [];

brands.forEach((brand) => {
  const item = items.find((item) => item.name.includes(brand.name));

  if (item) arr.push({ brandName: brand.name, item });
  else {
    console.log(brand.name);
  }
});

writeFile('./wow.json', JSON.stringify(arr), 'utf-8', (err, data) => {
  console.log(err, data);
});
// writeFile('./meme.json', JSON.stringify(dict), 'utf-8', (err, data) => {
//   console.log(err, data);
// });
