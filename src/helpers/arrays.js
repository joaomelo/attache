export function sortByField (array, field, asc = true) {
  const copy = [...array];
  copy.sort((a, b) => {
    if (a[field] > b[field]) return asc ? 1 : -1;
    if (a[field] < b[field]) return asc ? -1 : 1;
    return 0;
  });
  return copy;
};
