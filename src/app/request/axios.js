import axios from 'axios';

const instance = axios.create({
  validateStatus: null
});

export async function status (url) {
  try {
    const response = await instance.get(url);
    return response.status;
  } catch (error) {
    const badGatewayStatusCode = 502;
    return badGatewayStatusCode;
  }
};

export async function get (url, params) {
  const response = await instance.get(url, { params });
  return response.data;
};

export async function del (url) {
  const response = await instance.delete(url);
  const { status, statusText } = response;
  const data = { status, statusText };
  return data;
}
