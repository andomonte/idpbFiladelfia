export default function getWeek(date) {
  const monthStart = new Date(date);
  monthStart.setDate(0);
  const offset = ((monthStart.getDay() + 1) % 7) - 3; // -1 is for a week starting on Monday
  return Math.ceil((date.getDate() + offset) / 7);
}
