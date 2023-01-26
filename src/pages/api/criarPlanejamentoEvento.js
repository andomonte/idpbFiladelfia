import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  // const action = `${rel}.findMany`

  if (dados) {
    try {
      console.log('dadossss', dados);
      const eventosCelulas = await prisma.eventosCelulas
        .findMany({
          where: {
            AND: {
              // Evento: dados.Evento,
              Data: { lte: dados.Data, gte: dados.Data },
              Celula: Number(dados.Celula),
              Distrito: Number(dados.Distrito),
            },
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      let id = 0;
      console.log('dataSSSSSSSS', eventosCelulas);
      if (eventosCelulas.length) id = eventosCelulas[0].id;
      await prisma.eventosCelulas.upsert({
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
