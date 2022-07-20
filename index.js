var QRCode = require('qrcode');

const a = btoa(
  JSON.stringify({
    pin: 'B3Ic3IE',
    code: '2156170315977',
    itemId: '62d5dec69e79c2240d31d19e',
    sub: 'cl5ralyt500026oulwi3h1sik',
  }),
);
console.log(a);
console.log(atob(a));
QRCode.toDataURL(a).then((text) => console.log(text));

// {
//     code: 'dadasdasda',
//     pin: 'B3Ic3IE',
//     itemId: '62d5dec69e79c2240d31d19e',
//     sub: 'cl5ralyt500026oulwi3h1sik',
//   }
