import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const dados = req.body;
  const AnoI1 = `${dados.anoI}-01-01`;
  const AnoI2 = `${dados.anoI}-12-31`;

  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.plancelula
      .findMany({
        where: {
          Celula: dados.Celula,
          Semana: Number(dados.semana),
          Distrito: dados.Distrito,
          Data: { lte: new Date(AnoI2), gte: new Date(AnoI1) },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(posts);
  } catch (errors) {
    console.log(errors);
    res.json('erro');
  }
}
