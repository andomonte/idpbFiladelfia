import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body.relatorio;
  console.log('dados:', dados);
  if (dados) {
    try {
      const relCelula = await prisma.relatorioCelulas
        .findMany({
          where: {
            AND: {
              Semana: dados.Semana,
              Celula: Number(dados.Celula),
              Distrito: Number(dados.Distrito),
            },
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      if (relCelula.length) {
        console.log('relCelula:', relCelula);

        const { id } = relCelula[0];
        await prisma.relatorioCelulas
          .update({
            where: {
              id,
            },
            data: {
              ...dados,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      } else {
        console.log('criar:', dados);

        await prisma.relatorioCelulas
          .create({
            data: {
              ...dados,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      }

      res.status(200).send('OK');
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
