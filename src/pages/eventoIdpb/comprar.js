import React from 'react';
import Comprar from 'src/components/Eventos/Comprar';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';

function Compra() {
  const router = useRouter();
  const { eventoSelecionado, usuario } = router.query;

  const [eventoSelecionadoF, setEventoSelecionadoF] = React.useState('');
  const [usuarioF, setUsuarioF] = React.useState('');

  React.useEffect(() => {
    if (eventoSelecionado) {
      setEventoSelecionadoF(JSON.parse(eventoSelecionado));
      sessionStorage.setItem('eventoSelecionadoIdpb', eventoSelecionado);
    } else {
      setEventoSelecionadoF(
        JSON.parse(sessionStorage.getItem('eventoSelecionadoIdpb')),
      );
    }
  }, [eventoSelecionado]);

  React.useEffect(() => {
    if (usuario) {
      setUsuarioF(usuario);

      sessionStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      const neValor = sessionStorage.getItem('usuario')
        ? JSON.parse(sessionStorage.getItem('usuario'))
        : '';
      if (neValor) setUsuarioF(JSON.parse(sessionStorage.getItem('usuario')));
    }
  }, [usuario]);
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/comprar');
  }
  return (
    <div>
      {eventoSelecionadoF ? (
        <Comprar
          usuario={usuarioF}
          eventoSelecionado={eventoSelecionadoF}
          title="SISTEMA-IDPB"
        />
      ) : (
        <Espera descricao="Atualizando os dados" />
      )}
    </div>
  );
}

export default Compra;
