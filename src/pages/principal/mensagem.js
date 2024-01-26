import React from 'react';
import Mensagem from 'src/components/igrejas/principal/mensagem';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function Mensagens({ dadosAvisos, rolMembros, distritos, mensagem }) {
  const router = useRouter();
  const { titulo } = router.query;

  // resultado = result.id;
  let result = 'nenhum';
  if (typeof window !== 'undefined') {
    if (titulo) {
      window.history.replaceState(null, '', '/principal/mensagem');
    }
    result = JSON.parse(sessionStorage.getItem('perfilUser'));
  }

  return (
    <div>
      <Mensagem
        dadosAvisos={dadosAvisos}
        titulo={titulo}
        mensagem={mensagem}
        rolMembros={rolMembros}
        distritos={distritos}
        perfilUser={result}
      />
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const distritos = await prisma.distrito.findMany().finally(async () => {
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
      distritos: JSON.parse(JSON.stringify(distritos)),
      dadosAvisos: JSON.parse(
        JSON.stringify(
          dadosAvisos,
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
      mensagem: JSON.parse(
        JSON.stringify(
          mensagem,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Mensagens;
