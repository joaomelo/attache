export function sortByField (array, field, asc = true) {
  const copy = [...array];
  copy.sort((a, b) => {
    if (a[field] > b[field]) return asc ? 1 : -1;
    if (a[field] < b[field]) return asc ? -1 : 1;
    return 0;
  });
  return copy;
}

export function accIfResults (array, callback, ...params) {
  return array.reduce((acc, item) => {
    const result = callback(item, ...params);
    if (result) acc.push(result);
    return acc;
  }, []);
}

export function joinMap (array, callback, joinString = '') {
  return array
    .map(i => callback(i))
    .join(joinString);
}
