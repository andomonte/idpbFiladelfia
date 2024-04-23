import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  if (dados) {
    try {
      const relvisSuper = await prisma.relatorioVisitaSupervisao
        .findMany({
          where: {
            AND: {
              Mes: dados.Mes,
              Ano: dados.Ano,
              Supervisao: Number(dados.Supervisao),
              Distrito: Number(dados.Distrito),
              Data: dados.Data,
              CelulaVisitada: dados.CelulaVisitada,
            },
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      let id = 0;
      if (relvisSuper.length) id = relvisSuper[0].id;
      await prisma.relatorioVisitaSupervisao.upsert({
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
      console.log('erros', errors);
      res.status(400).send(errors);
    }
  }
};
//= =========================================================================

export default handler;
