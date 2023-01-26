import axios from 'axios';

const convert = (currency: string, onSuccess: (rate: number) => void) => {
  axios
    .post('/api/forex', {
      currency: `USD${currency}`,
    })
    .then(({ data }) => onSuccess(data))
    .catch((err) => {
      console.log(err);
    });
};
//
export default convert;
