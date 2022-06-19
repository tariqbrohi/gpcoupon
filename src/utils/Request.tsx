export const base_url = `http://localhost:8080`;
// export const base_url = `http://192.168.100.252:8080`;
// export const attachToken = async () => {
//   const jwt = localStorage.getItem("token");
//   privateAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`;
//   //console.log("Token Attached");
// };

async function processResponse(response: any) {
  let jsonResponse, textResponse, parsedResponse;
  if (response.json)
    parsedResponse = await response
      .json()
      .catch(async () => response.statusText);

  if (typeof parsedResponse === `string`) textResponse = parsedResponse;
  else jsonResponse = parsedResponse;
  if (response.status >= 200 && response.status < 300) {
    return jsonResponse || textResponse;
  } else {
    if (
      jsonResponse &&
      jsonResponse.message &&
      Array.isArray(jsonResponse.message)
    ) {
      throw new Error(jsonResponse.message[0]);
    } else if (jsonResponse.responseMessage) {
      throw new Error(jsonResponse.responseMessage);
    } else if (jsonResponse.originalErrorMessage) {
      throw new Error(jsonResponse.originalErrorMessage);
    } else {
      throw new Error(jsonResponse.message);
    }
  }
}

function cleanBody(body: any) {
  return Object.entries(body).reduce((accumulator: any, [key, value]: any) => {
    if (value !== ``)
      return {
        ...accumulator,
        [key]: value,
      };
    else return accumulator;
  }, {});
}
const request = {
  get: async (url: string, heads = {}) => {
    const headers = {
      'Content-Type': `application/x-www-form-urlencoded`,
      ...heads,
    };
    const response = await fetch(url, {
      headers: { ...headers },
      credentials: `include`,
    });
    return processResponse(response);
  },
  post: async (url: string, body: any = {}, heads: any = {}) => {
    body = cleanBody(body);

    const response = await fetch(url, {
      method: `post`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
        ...heads,
      },
      body: JSON.stringify(body),
    });
    return processResponse(response);
  },
  put: async (url: string, body: any) => {
    body = cleanBody(body);

    const response = await fetch(url, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      credentials: `include`,
      body: JSON.stringify(body),
    });
    return processResponse(response);
  },
  putFormData: async (url: string, body: any) => {
    try {
      const response = await fetch(url, {
        method: `PUT`,
        headers: {},
        credentials: `include`,
        body: body,
      });
      return processResponse(response);
    } catch (error: any) {
      // console.log(error.message)
      if (error.message === `NetworkError when attempting to fetch resource.`)
        throw new Error(`Maximum file size is 1 MB`);
      else throw new Error(error.message);
    }
  },
  postFormData: async (url: string, body: any) => {
    const response = await fetch(url, {
      method: `POST`,
      headers: {},
      credentials: `include`,
      body: body,
    });
    return processResponse(response);
  },
  delete: async (url: string) => {
    const response = await fetch(url, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      credentials: `include`,
    });
    return processResponse(response);
  },
};
export { request };
