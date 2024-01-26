import React from 'react';
import Comprar from 'src/components/igrejas/principal/eventos/pagar';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';

function Compra() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { eventoSelecionado } = router.query;
  const [eventoSelecionadoF, setEventoSelecionadoF] = React.useState('');
  React.useEffect(() => {
    if (eventoSelecionado) {
      setEventoSelecionadoF(JSON.parse(eventoSelecionado));
      sessionStorage.setItem('eventoSelecionadoIdpbL', eventoSelecionado);
    } else {
      setEventoSelecionadoF(
        JSON.parse(sessionStorage.getItem('eventoSelecionadoIdpbL')),
      );
    }
  }, []);
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/comprar');
  }
  return (
    <div>
      {eventoSelecionadoF ? (
        <Comprar eventoSelecionado={eventoSelecionadoF} title="CÉLULAS-IDPB" />
      ) : (
        <Espera descricao="Atualizando os dados" />
      )}
    </div>
  );
}

export default Compra;
