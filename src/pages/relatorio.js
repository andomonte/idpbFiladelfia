import React from 'react';
import Relatorio from 'src/components/igrejas/principal/relatorios';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function relatorios({
  celulas,
  rolMembros,
  lideranca,
  distritos,
  coordenacoes,
  supervisoes,
  userIgrejas,
  parametros,
}) {
  const router = useRouter();
  const [session] = useSession();
  const perfilUser = router.query;

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
    window.history.replaceState(null, '', '/relatorio');
  }

  return (
    <div>
      {perfilUser.id ? (
        <Relatorio
          celulas={celulas}
          title="IDPB-CELULAS"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUser}
          distritos={distritos}
          coordenacoes={coordenacoes}
          supervisoes={supervisoes}
          userIgrejas={userIgrejas}
        />
      ) : (
        <div>
          {perfilUserF && (
            <Relatorio
              title="IDPB-CELULAS"
              celulas={celulas}
              rolMembros={rolMembros}
              lideranca={lideranca}
              perfilUser={perfilUserF}
              distritos={distritos}
              coordenacoes={coordenacoes}
              supervisoes={supervisoes}
              igreja={userIgrejas}
              parametros={parametros}
            />
          )}
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
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
  const supervisoes = await prisma.supervisao
    .findMany({
      where: {
        Status: true,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const coordenacoes = await prisma.cordenacao
    .findMany({
      where: {
        Status: true,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const distritos = await prisma.distrito
    .findMany({
      where: {
        Status: true,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const parametros = await prisma.desempenho.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      parametros: JSON.parse(JSON.stringify(parametros)),
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

      supervisoes: JSON.parse(JSON.stringify(supervisoes)),
      coordenacoes: JSON.parse(JSON.stringify(coordenacoes)),
      distritos: JSON.parse(
        JSON.stringify(
          distritos,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default relatorios;
