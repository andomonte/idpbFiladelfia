import React from 'react';
import Secretaria from 'src/components/igrejas/principal/pontuacao';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function Sec({
  parametros,
  supervisao,
  userIgrejas,
  celulas,
  rolMembros,
  lideranca,
}) {
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');
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

  return (
    <div>
      {perfilUserF && (
        <Secretaria
          celulas={celulas}
          lideranca={lideranca}
          userIgrejas={dadosUser}
          title="IDPB-CELULAS"
          perfilUser={perfilUserF}
          rolMembros={rolMembros}
          parametros={parametros}
          supervisao={supervisao}
        />
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const celulas = await prisma.celulas.findMany().finally(async () => {
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
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const supervisao = await prisma.supervisao.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const parametros = await prisma.desempenho.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      celulas: JSON.parse(JSON.stringify(celulas)),
      parametros: JSON.parse(JSON.stringify(parametros)),
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
      supervisao: JSON.parse(
        JSON.stringify(
          supervisao,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Sec;
