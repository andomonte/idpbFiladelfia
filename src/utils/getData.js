export default function PegarData(Semana, Ano) {
  const sunday = new Date(Ano, 0, 1 + Semana * 7);
  while (sunday.getDay() !== 1) {
    // para segunda é sunday.getDay() !==1 para domingo é sunday.getDay() !==0
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}
