function FormataStringData(data) {
  const dia = data.split('/')[0];
  const mes = data.split('/')[1];
  const ano = data.split('/')[2];
  // 07/06/2021 10:05:00 // mm/dd/yyyy hh:mm:ss
  return `${`0${mes}`.slice(-2)}/${`0${dia}`.slice(-2)}/${ano} 19:30:00`;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
export default FormataStringData;
