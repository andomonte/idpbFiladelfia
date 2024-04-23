import React from 'react';
import Comprove from 'src/components/Eventos/Comprar/comprovante';
import { useRouter } from 'next/router';

function Comprovante() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...comprovante } = router.query;
  let mudaDados = 'sai';
  if (comprovante.nome) mudaDados = 'entra';
  const [comprovanteF, setcomprovanteF] = React.useState();

  React.useEffect(() => {
    setcomprovanteF(comprovanteF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('comprovante', JSON.stringify(comprovante));
    } else {
      const result = JSON.parse(sessionStorage.getItem('comprovante'));

      // resultado = result.id;
      setcomprovanteF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/comprovante');
  }

  return (
    <div>
      {comprovante.nome ? (
        <Comprove title="SISTEMA-IDPB" comprovante={comprovante} />
      ) : (
        <Comprove title="SISTEMA-IDPB" comprovante={comprovanteF} />
      )}
    </div>
  );
}

export default Comprovante;
