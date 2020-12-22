import { axiosGet } from './axios';

describe.skip('axios fetch', () => {
  test('get data from the web considering params', async () => {
    const url = 'https://swapi.dev/api/films';
    const params = { search: 'new hope' };

    const data = await axiosGet(url, params);

    expect(data.count).toBe(1);
  });
});
