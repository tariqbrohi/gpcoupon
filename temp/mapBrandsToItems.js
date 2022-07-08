const brands = require('./brands.json');
const items = require('./items-us.json');
const { writeFile } = require('fs');
const bbb = require('../brands-seed.json');

const dict = {};
const a = brands.map((b) => {
  const arr = [];
  items.forEach((item) => {
    if (item.name.includes(b)) {
      arr.push(item);
    }
  });

  return {
    name: b,
    slug: b.toLowerCase().replaceAll(' ', '-').replaceAll('.', ''),
    description: '',
    disclaimer: '',
    backgroundUrl: '',
    thumbnailUrl: '',
    status: 'AVAILABLE',
    terms: '',
    createdAt: +(new Date().valueOf() / 1000).toFixed(0),
    updatedAt: +(new Date().valueOf() / 1000).toFixed(0),
    countries: ['US'],
  };
});

writeFile('./brands-seed.json', JSON.stringify(a), 'utf-8', (err, data) => {
  console.log(err, data);
});
