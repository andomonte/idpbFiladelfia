import React from 'react';
import { Perfil } from 'src/components/igrejas/principal/perfil';
import Cadastro from 'src/components/igrejas/cadastro';
import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';
// import Modal from '@material-ui/core/Modal';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

function userPerfil({ celulas, rolMembros, lideranca }) {
  const [session] = useSession();

  //  const [open, setOpen] = React.useState(false);
  // const [perfilUser, setPerfilUser] = React.useState('');
  let secao = [{ email: '' }];

  const router = useRouter();
  const perfilUser = router.query;

  if (session) {
    secao = lideranca.filter((val) => val.Email === session.user.email);

    if (secao.length === 0) {
      return (
        <Cadastro
          title="IDPB-FILADELFIA"
          rolMembros={rolMembros}
          lideranca={lideranca}
        />
      );
    }
    return (
      <Perfil
        celulas={celulas}
        title="IDPB-FILADELFIA"
        rolMembros={rolMembros}
        lideranca={lideranca}
        perfilUser={perfilUser}
      />
    );
  }
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/images/filadelfia/filadelfia.png" alt="" width="125" />
    </Box>
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
export default userPerfil;
