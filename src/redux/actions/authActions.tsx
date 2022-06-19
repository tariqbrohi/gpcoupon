import { NotifyMethodEnum } from '@/annotations/enums/notify-method.enum';
import NotifyComponent from '@/components/shared/notify';
import { Alert } from '@mui/material';
import { request, base_url } from '../../utils/Request';

export const postLogin = async (payload: any) => {
  try {
    const res: any = await fetch(`${base_url}/user/login`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(payload),
    });

    const response = await res.json();
    if (response) {
      typeof window === `object` &&
        localStorage.setItem(`token`, response?.token);
      // typeof window === `object` &&
      //   localStorage.setItem(`userId`, response?.user?.userId);
      typeof window === `object` &&
        localStorage.setItem(`userName`, response?.user?.username);
      return response;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getVouchers = async (
  code: string,
  country: string,
  limit: any,
) => {
  try {
    const res: any = await fetch(`${base_url}/vouchers/get`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        country,
        code,
        limit,
      }),
    });

    const response = await res.json();
    if (response) {
      if (response?.message) {
        console.log(response);
        NotifyComponent(NotifyMethodEnum.failure, response?.message?.errorInfo);
        return [];
      } else {
        return response?.data?.getVouchers?.data;
      }
    }
  } catch (err: any) {
    console.log(`getVouchers error`, err.response.data.error);
    throw err;
  }
};

export const getCategories = async (filterGroup: string) => {
  try {
    const res: any = await fetch(`${base_url}/categories/get`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },

      body: JSON.stringify({
        filterGroup,
      }),
    });

    const response = await res.json();
    if (response) {
      return response.data?.getFilters?.data?.[0]?.filters;
      // console.log('response', response.data.getVouchers.data);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postCharge = async (payload: any) => {
  try {
    const res: any = await fetch(`${base_url}/user/charge`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },

      body: JSON.stringify(payload),
    });

    const response = await res.json();
    if (response?.status === 500) {
      NotifyComponent(NotifyMethodEnum.failure, response?.message);
      return response;
    } else {
      NotifyComponent(NotifyMethodEnum.success, response?.message);
      return response;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getGiftOrders = async (userId: any) => {
  try {
    const res: any = await fetch(`${base_url}/order/get?userId=${userId}`, {
      method: `Get`,
      headers: {
        'Content-Type': `application/json`,
      },
    });

    const response = await res.json();
    if (response) {
      console.log(`response`, response);
      return response;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getSearchedProducts = async (name: any, country: any) => {
  try {
    const res: any = await fetch(`${base_url}/vouchers/search`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        name, country
      })
    });

    const response = await res.json();
    if (response) {
      if (response?.message) {
        NotifyComponent(NotifyMethodEnum.failure, response?.message?.error);
      } else {
        console.log(`response`, response);
        return response?.data?.getVouchers?.data;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
