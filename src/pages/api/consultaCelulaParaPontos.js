import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const dados = req.body;
  const AnoI1 = `${dados.anoI}-01-01`;
  const AnoI2 = `${dados.anoI}-12-31`;
  const AnoF1 = `${dados.anoF}-01-01`;
  const AnoF2 = `${dados.anoF}-12-31`;
  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.relatorioCelulas
      .findMany({
        where: {
          Celula: dados.Celula,
          Semana: { gt: Number(dados.semanaI - 1) },
          AND: {
            Semana: { lt: Number(dados.semanaF + 1) },
            AND: {
              OR: [
                {
                  Data: { lte: new Date(AnoI2), gte: new Date(AnoI1) },
                },

                {
                  Data: { lte: new Date(AnoF2), gte: new Date(AnoF1) },
                },
              ],
            },
          },
        },
        orderBy: {
          Semana: 'asc',
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
