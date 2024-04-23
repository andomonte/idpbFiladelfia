import React from 'react';
import MeuTicket from 'src/components/Eventos/iniciaCompra/ticket';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';
import prisma from 'src/lib/prisma';

function MeuTickt({ rolMembros }) {
  const router = useRouter();
  const { ...dadosInscrito } = router.query;

  let mudaDados = 'sai';
  if (dadosInscrito && dadosInscrito.cpf) mudaDados = 'entra';

  const [dadosInscritosF, setDadosInscritoF] = React.useState();
  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setDadosInscritoF(dadosInscrito);

      sessionStorage.setItem(
        'dadosInscritoIDPB',
        JSON.stringify(dadosInscrito),
      );
    } else {
      const result = JSON.parse(sessionStorage.getItem('dadosInscritoIDPB'));

      // resultado = result.id;

      setDadosInscritoF(result);
    }
  }, [mudaDados]);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/meuTicket');
  }

  return (
    <div>
      {dadosInscritosF && dadosInscritosF.cpf ? (
        <MeuTicket
          membros={rolMembros}
          title="SISTEMA-IDPB"
          dadosInscrito={dadosInscritosF}
        />
      ) : (
        <Espera descricao="Atualizando os dados" />
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const rolMembros = await prisma.membros
    .findMany({
      orderBy: [
        {
          Nome: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    props: {
      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default MeuTickt;
