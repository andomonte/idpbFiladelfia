import React from 'react';
import CadastrarPessoas from 'src/components/igrejas/principal/cadastrarPessoas';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function Atualizar({ rolMembros }) {
  const router = useRouter();
  const perfilUser = router.query;

  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();
  const [session] = useSession();
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
    window.history.replaceState(null, '', '/cadastrarPessoas');
  }

  return (
    <div>
      {perfilUserF && (
        <CadastrarPessoas
          perfilUser={perfilUserF}
          rolMembros={rolMembros}
          title="IDPB-CASTELO"
        />
      )}
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

export default Atualizar;
