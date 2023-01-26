import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body.relatorio;

  if (dados) {
    try {
      const relCelula = await prisma.relatorioDiscipulado
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

      let id = 0;
      if (relCelula.length) id = relCelula[0].id;
      await prisma.relatorioDiscipulado.upsert({
        where: {
          id,
        },
        update: {
          ...dados,
        },
        create: {
          ...dados,
        },
      });

      res.status(200).send('OK');
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
