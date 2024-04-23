import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  if (dados) {
    try {
      const relvisSuper = await prisma.relSupervisao
        .findMany({
          where: {
            AND: {
              Data: dados.Data,
              Mes: dados.Mes,
              Ano: dados.Ano,
              Supervisao: Number(dados.Supervisao),
              Coordenacao: Number(dados.Coordenacao),
              Funcao: dados.Funcao,
              Distrito: Number(dados.Distrito),
            },
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      let id = 0;
      if (relvisSuper.length) id = relvisSuper[0].id;
      await prisma.relSupervisao.upsert({
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
      res.status(400).send(errors);
    }
  }
};
//= =========================================================================

export default handler;
