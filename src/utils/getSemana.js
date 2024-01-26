import { weekNumber } from 'weeknumber';

export default function PegarSemana(mes, ano) {
  const valor = weekNumber(new Date(ano, mes, 5, 12)); // o 6 é quarta

  return valor;
}
