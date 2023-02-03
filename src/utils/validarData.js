function FormataStringData(data) {
  const dia = Number(data.split('/')[0]);
  const mes = Number(data.split('/')[1]);
  const ano = Number(data.split('/')[2]);
  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;

  let validarAno = true;
  if (Number(ano) > Number(anoAtual) - 130 && Number(ano) <= Number(anoAtual))
    validarAno = true;
  else validarAno = false;
  if (Number(dia) > 31 && Number(dia) < 1) validarAno = false;
  if (Number(mesAtual) < 12 && Number(mesAtual) > 0) {
    if (Number(ano) % 4) {
      if (Number(mes) === 2 && Number(dia) > 28) validarAno = false;
    } else if (Number(mes) === 2 && Number(dia) > 29) validarAno = false;

    if (
      Number(dia) > 30 &&
      (Number(mes) === 4 ||
        Number(mes) === 6 ||
        Number(mes) === 9 ||
        Number(mes) === 9 ||
        Number(mes) === 11)
    )
      validarAno = false;
  } else validarAno = false;

  return validarAno;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
export default FormataStringData;
