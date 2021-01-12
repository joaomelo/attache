export function sortByField (array, field, asc = true) {
  const copy = [...array];
  copy.sort((a, b) => {
    if (a[field] > b[field]) return asc ? 1 : -1;
    if (a[field] < b[field]) return asc ? -1 : 1;
    return 0;
  });
  return copy;
}

export function convertFieldName (originals, from, to) {
  const converteds = originals.map(original => {
    const converted = { ...original };
    delete converted[from];
    converted[to] = original[from];
    return converted;
  });
  return converteds;
};
