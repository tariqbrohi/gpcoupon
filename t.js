const a = JSON.stringify({
  a: '하이',
});

console.log(a);

const b = Buffer.from(a).toString('base64');

console.log(b);

const c = Buffer.from(b, 'base64').toString('utf8');

console.log(c);
