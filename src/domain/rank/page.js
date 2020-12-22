export function rankPage ({ page, result }) {
  const index = result.reduce((acc, link, index) => {
    return link.includes(page) ? index : acc;
  }, -1);

  return index;
}
