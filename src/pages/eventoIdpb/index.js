import React from 'react';
import Inscrições from 'src/components/Eventos/Inscricoes';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';
import prisma from 'src/lib/prisma';

function Home({ eventosIDPB }) {
  const router = useRouter();
  const { Evento, usuario } = router.query;

  const [EventoF, setEventoF] = React.useState('');
  const [eventoSelecionadoF, setEventoSelecionadoF] = React.useState('');

  const [usuarioF, setUsuarioF] = React.useState('');

  React.useEffect(() => {
    if (Evento) {
      setEventoF(Evento);

      sessionStorage.setItem('EventoIdpb', JSON.stringify(Evento));
    } else {
      setEventoF(JSON.parse(sessionStorage.getItem('EventoIdpb')));
    }
  }, [Evento]);
  React.useEffect(() => {
    if (usuario) {
      setUsuarioF(usuario);
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      const neValor = sessionStorage.getItem('usuario')
        ? JSON.parse(sessionStorage.getItem('usuario'))
        : '';
      if (neValor) setUsuarioF(JSON.parse(sessionStorage.getItem('usuario')));
      sessionStorage.setItem('usuario', '');
    }
  }, [usuario]);

  React.useEffect(() => {
    if (EventoF && eventosIDPB.length) {
      const eventoFinal = eventosIDPB.filter(
        (val) => val.nomeEvento === EventoF,
      );

      setEventoSelecionadoF(eventoFinal);
    }
  }, [EventoF, eventosIDPB]);

  return (
    <div>
      {eventoSelecionadoF.length ? (
        <Inscrições
          eventoSelecionado={eventoSelecionadoF[0]}
          title="EVENTOS-IDPB "
          usuario={usuarioF}
        />
      ) : (
        <Espera descricao="Atualizando os dados" />
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.eventosGeral.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      eventosIDPB: JSON.parse(
        JSON.stringify(
          posts,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
