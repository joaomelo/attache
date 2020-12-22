export function createScaleSerpSearch ({ get, key }) {
  const url = 'https://api.scaleserp.com/search';
  const size = 100;

  const search = async term => {
    const responseData = await get(url, {
      q: term,
      api_key: key,
      num: size
    });

    const results = responseData
      .organic_results
      .map(result => result.link);

    return {
      size,
      results,
      when: new Date()
    };
  };

  return search;
};
