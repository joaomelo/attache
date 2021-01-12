import axios from 'axios';

export async function get (url, params) {
  const response = await axios.get(url, { params });
  return response.data;
};

export async function del (url) {
  const response = await axios.delete(url);
  return response.data;
}
