import React from 'react';
import QuemSomos from 'src/components/igrejas/normal/quemSomos';
import prisma from 'src/lib/prisma';

function Sec({ userIgrejas }) {
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');

  return <QuemSomos userIgrejas={dadosUser} title="IDPB-CELULAS" />;
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Sec;
