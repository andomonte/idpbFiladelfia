import React from 'react';
import Avisos from 'src/components/igrejas/principal/avisos';

import prisma from 'src/lib/prisma';

function Aviso({ dadosAvisos, rolMembros, mensagem, distritos }) {
  let result = 'nenhum';
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/aviso');
    result = JSON.parse(sessionStorage.getItem('perfilUser'));
  }

  return (
    <div>
      <Avisos
        mensagem={mensagem}
        rolMembros={rolMembros}
        distritos={distritos}
        dadosAvisos={dadosAvisos}
        perfilUser={result}
      />
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const dadosAvisos = await prisma.avisos
    .findMany({
      orderBy: [
        {
          Data: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const mensagem = await prisma.mensagem
    .findMany({
      orderBy: [
        {
          Data: 'asc',
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
  const distritos = await prisma.distrito.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      distritos: JSON.parse(JSON.stringify(distritos)),

      mensagem: JSON.parse(
        JSON.stringify(
          mensagem,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      dadosAvisos: JSON.parse(
        JSON.stringify(
          dadosAvisos,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Aviso;
