import React from 'react';
import Cadastro from 'src/components/igrejas/cadastro/indexCPF';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/client';

function meuCadastro({ rolMembros, lideranca }) {
  const router = useRouter();
  const { cpf } = router.query;
  let mudaDados = 'sai';
  if (cpf) mudaDados = 'entra';
  const [perfilCPF, setPerfilCPF] = React.useState('');

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilCPF(cpf);
      sessionStorage.setItem('perfilCPF', JSON.stringify(cpf));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilCPF'));

      // resultado = result.id;
      setPerfilCPF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/cadastro');
  }

  return (
    <div>
      <Cadastro
        title="IDPB-CELULAS"
        rolMembros={rolMembros}
        lideranca={lideranca}
        perfilCPF={perfilCPF}
      />
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

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
export default meuCadastro;
