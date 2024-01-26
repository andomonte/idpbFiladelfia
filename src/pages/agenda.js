import React from 'react';
import Planejamento from 'src/components/igrejas/principal/agenda';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function Planejar({ rolMembros, lideranca, celulas }) {
  const router = useRouter();
  const perfilUser = router.query;
  const [session] = useSession();
  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      if (session === null || !result) {
        router.push({
          pathname: '/',
        });
      }
      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/planejamento');
  }

  return (
    <div>
      {perfilUserF && (
        <Planejamento
          title="IDPB-CELULAS"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUserF}
          celulas={celulas}
        />
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const lideranca = await prisma.lideranca
    .findMany({
      orderBy: [
        {
          Celula: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const rolMembros = await prisma.membros
    .findMany({
      where: {
        OR: [
          {
            Situacao: 'ATIVO',
          },
          {
            Situacao: 'NOVO',
          },
        ],
      },
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
      celulas: JSON.parse(JSON.stringify(celulas)),

      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      lideranca: JSON.parse(
        JSON.stringify(
          lideranca,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Planejar;
