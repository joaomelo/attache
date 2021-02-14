export function calcToday () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function fromToday (delta) {
  const someday = calcToday();
  someday.setDate(someday.getDate() + delta);
  return someday;
}
