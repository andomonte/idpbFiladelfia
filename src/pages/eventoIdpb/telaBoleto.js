import React from 'react';
import CbBoleto from 'src/components/Eventos/Comprar/cbBoleto';
import { useRouter } from 'next/router';

function TelaBoleto() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...boleto } = router.query;
  let mudaDados = 'sai';
  if (boleto.id) mudaDados = 'entra';
  const [boletoF, setCodigoF] = React.useState();

  React.useEffect(() => {
    setCodigoF(boletoF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('boleto', JSON.stringify(boleto));
    } else {
      const result = JSON.parse(sessionStorage.getItem('boleto'));

      // resultado = result.id;
      setCodigoF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/telaBoleto');
  }

  return (
    <div>
      {boleto.id ? (
        <CbBoleto title="SISTEMA-IDPB " boleto={boleto} />
      ) : (
        <div>
          {boletoF && <CbBoleto title="SISTEMA-IDPB" boleto={boletoF} />}
        </div>
      )}
    </div>
  );
}

export default TelaBoleto;
