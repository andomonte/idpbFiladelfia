import React from 'react';
import { Pagina } from 'src/components/igrejas/normal';
import prisma from 'src/lib/prisma';

function Home({ userIgrejas, celulas }) {
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');

  return (
    <Pagina celulas={celulas} userIgrejas={dadosUser} title="IDPB-CELULAS" />
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

  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      celulas: JSON.parse(JSON.stringify(celulas)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
