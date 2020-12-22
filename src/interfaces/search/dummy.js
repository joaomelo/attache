export function createDummySearch (config = {}) {
  const { site, pos } = config;
  const size = 100;
  const syntheticSite = site || 'company.com';
  const syntheticPos = pos ? Math.min(pos, size) : 10;

  const search = term => {
    const result = Array(size).fill('www.site.com');
    result[syntheticPos] = syntheticSite;

    return Promise.resolve({
      result,
      size
    });
  };

  return search;
};
