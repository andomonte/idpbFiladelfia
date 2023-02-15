export default function getDateOfISOWeek(w, y) {
  const simple = new Date(y, 0, 1 + (w - 1) * 7);
  console.log('simple', simple);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 2);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay() + 2);
  return ISOweekStart.getMonth();
}
