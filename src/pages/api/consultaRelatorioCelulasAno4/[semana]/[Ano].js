import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // const action = `${rel}.findMany`
  const semana0 = Number(semana) + 1;
  let ano0 = Ano;
  if (Number(semana0) === 52) ano0 = Number(Ano) - 1;
  const inicioAno0 = `${ano0}-01-01`;
  const finalAno0 = `${ano0}-12-31`;

  //  const inicioAno1 = `${AnoIncio}-${mesInicio}-01`;
  //  const finalAno1 = `${AnoIncio}-${mesInicio}-31`;
  const posts = await prisma.relatorioCelulas
    .findMany({
      where: {
        OR: [
          {
            Semana: {
              lt: Number(semana0),
            },
            AND: {
              Data: { lte: new Date(finalAno0), gte: new Date(inicioAno0) },
            },
          },
        ],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');

  res.json(posts);
}
