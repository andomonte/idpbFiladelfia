import React from 'react';
import Cursos from 'src/components/igrejas/principal/cursos';
import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function FazerInscricoes({ rolMembros }) {
  const [session] = useSession();
  const router = useRouter();
  const [perfilUser, setPerfilUser] = React.useState('');
  React.useEffect(() => {
    const result = JSON.parse(sessionStorage.getItem('perfilUser'));

    if (session === null || !result) {
      router.push({
        pathname: '/',
      });
    }

    setPerfilUser(result);
  }, []);
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/cursos');
  }

  return (
    <div>
      <Cursos
        rolMembros={rolMembros}
        perfilUser={perfilUser}
        title="IDPB-CÉLULAS"
      />
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

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
export default FazerInscricoes;
