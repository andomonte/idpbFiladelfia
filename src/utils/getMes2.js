export default function getDateOfISOWeek(w, y) {
  const simple = new Date(y, 0, 4 + (w - 1) * 7);

  const ISOweekStart = simple;
  return ISOweekStart.getMonth();
}
