import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body.relatorio;

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
