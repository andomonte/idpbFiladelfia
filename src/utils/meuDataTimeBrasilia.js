function FormataStringData(data) {
  const ano = data.split('-')[0];
  const mes = Number(data.split('-')[1]) - 1;
  const dados2 = data.split('-')[2];
  const dia = dados2.split('T')[0];
  const horario = dados2.split('T')[1];
  let hora = horario.split(':')[0] - 3; // -3 é para o horario de brasilia
  if (hora < 0) hora = 24 + hora;
  const minuto = horario.split(':')[1];
  const segundos = horario.split(':')[2];
  const segundo = segundos.split('.')[0];

  const dataFinal = new Date(ano, mes, dia, hora, minuto, segundo, 0);

  return dataFinal;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
export default FormataStringData;
