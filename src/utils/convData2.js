export default function FormartaData(data) {
  if (data) {
    const ano = data.substring(0, 4);
    const mes = data.substring(5, 7);
    const dia = data.substring(8, 10);
    const DDMMAAAA = `${dia}/${mes}/${ano}`;
    const novaData = DDMMAAAA;
    return novaData;
  }
  return '';
}
