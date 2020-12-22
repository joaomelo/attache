export function createDummySearch (config = {}) {
  const { site, pos } = config;
  const size = 100;
  const syntheticSite = site || 'company.com';
  const syntheticPos = pos ? Math.min(pos, size) : 10;

  const search = term => {
    const results = Array(size).fill('www.site.com');
    results[syntheticPos] = syntheticSite;

    return Promise.resolve({
      results,
      size
    });
  };

  return search;
};
