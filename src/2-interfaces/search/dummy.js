export const dummySearcher = {
  search: (term, size) => {
    const result = Array(size).fill('www.site.com');
    result[Math.min(10, size)] = 'company.com';

    return Promise.resolve(result);
  }
};
