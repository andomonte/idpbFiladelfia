import React from 'react';
// import TelaLogin from 'src/components/Eventos/Autorizacao/autorizarDelegado';
// import TelaAutorizar from 'src/components/Eventos/Autorizacao/autorizarDelegado';
import Espera from 'src/utils/espera';
import { useRouter } from 'next/router';

function ChavePix() {
  const router = useRouter();
  const evento = router.query;

  let mudaDados = 'sai';
  if (evento) mudaDados = 'entra';

  const [setEventoF] = React.useState();
  const [setPerfilUser] = React.useState();
  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setEventoF(evento);

      sessionStorage.setItem('eventoAgora', JSON.stringify(evento));
    } else {
      const result = JSON.parse(sessionStorage.getItem('eventoAgora'));

      // resultado = result.id;

      setEventoF(result);
    }
  }, [mudaDados]);

  React.useEffect(() => {
    const result = JSON.parse(sessionStorage.getItem('perfilUser'));
    setPerfilUser(result);
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/autorizarDelegado');
  }
  return (
    <div>
      <Espera descricao="Será Liberado em Setembro" />
    </div>
  );
}

export default ChavePix;
