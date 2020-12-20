export function createScaleSerpSearcher ({ get, key }) {
  const url = 'https://api.scaleserp.com/search';
  const perPage = 100;

  return {
    search: async term => {
      const responseData = await get(url, {
        api_key: key,
        q: term,
        num: perPage
      });

      const results = responseData
        .organic_results
        .map(result => result.link);

      return results;
    }
  };
};
