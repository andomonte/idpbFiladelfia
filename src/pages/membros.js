import React from 'react';
import { Perfil } from 'src/components/igrejas/principal/equipe';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';
import { useSession } from 'next-auth/client';

function meuPerfil({
  distritos,
  coordenacoes,
  supervisoes,
  celulas,
  rolMembros,
  userIgrejas,
  lideranca,
}) {
  const router = useRouter();
  const perfilUser = router.query;
  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState('');
  const [session] = useSession();
  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));

      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, [mudaDados]);
  React.useEffect(() => {
    setPerfilUserF(perfilUserF);
    if (mudaDados === 'entra') {
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
    window.history.replaceState(null, '', '/membros');
  }

  if (perfilUserF === null) {
    router.push(
      {
        pathname: '/selectPerfil',
      },
      '/selectPerfil',
    );
  }

  return (
    <div>
      {perfilUserF ? (
        <Perfil
          celulas={celulas}
          distritos={distritos}
          coordenacoes={coordenacoes}
          supervisoes={supervisoes}
          title="APP-IDPB"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUserF}
          igreja={userIgrejas}
        />
      ) : (
        <div>
          <Espera descricao="Buscando Perfil" />
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const celulas = await prisma.celulas
    .findMany({
      where: {
        Status: true,
      },
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
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });

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
      celulas: JSON.parse(JSON.stringify(celulas)),
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
export default meuPerfil;
