export function calcPosition (page, searchResult) {
  const index = searchResult.reduce((acc, result, index) => {
    return result.includes(page) ? index : acc;
  }, -1);

  return index;
}
