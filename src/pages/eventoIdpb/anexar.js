import React from 'react';
import Anexar from 'src/components/Eventos/carta/anexar';
import { useRouter } from 'next/router';

function AnexarCarta() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { idPagamento } = router.query;

  let mudaDados = 'sai';
  if (idPagamento) mudaDados = 'entra';
  const [codigoF, setCodigoF] = React.useState();

  React.useEffect(() => {
    setCodigoF(codigoF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('codigo', JSON.stringify(idPagamento));
    } else {
      const result = JSON.parse(sessionStorage.getItem('codigo'));

      // resultado = result.id;
      setCodigoF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/anexar');
  }

  return (
    <div>
      {idPagamento ? (
        <Anexar title="SISTEMA-IDPB " idPagamento={idPagamento} />
      ) : (
        <Anexar title="SISTEMA-IDPB " idPagamento={codigoF} />
      )}
    </div>
  );
}

export default AnexarCarta;
