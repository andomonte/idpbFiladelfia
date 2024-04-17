export default function CheckCodigo(codigoSecretaria) {
  let check = false;
  if (
    codigoSecretaria === 'AM2142' ||
    codigoSecretaria === 'AM2345' ||
    codigoSecretaria === 'AM1238' ||
    codigoSecretaria === 'NAC5916' ||
    codigoSecretaria === 'NAC1614' ||
    codigoSecretaria === 'NCOR652' ||
    codigoSecretaria === 'COR562'
  )
    check = true;
  return check;
}
