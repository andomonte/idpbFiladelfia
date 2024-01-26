import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // const action = `${rel}.findMany`
  const semana0 = semana;
  let ano0 = Ano;
  if (Number(semana0) === 52) ano0 = Number(Ano) - 1;
  const inicioAno0 = `${ano0}-01-01`;
  const finalAno0 = `${ano0}-12-31`;

  let semana1 = Number(semana0) + 1;
  const ano = Ano;
  if (semana1 > 52) {
    semana1 = 1;
  }
  const inicioAno1 = `${ano}-01-01`;
  const finalAno1 = `${ano}-12-31`;

  let semana2 = semana1 + 1;
  if (semana2 > 52) {
    semana2 = 1;
  }
  const inicioAno2 = `${ano}-01-01`;
  const finalAno2 = `${ano}-12-31`;

  let semana3 = semana2 + 1;
  if (semana3 > 52) {
    semana3 = 1;
  }
  const inicioAno3 = `${ano}-01-01`;
  const finalAno3 = `${ano}-12-31`;

  let semana4 = semana3 + 1;
  if (semana4 > 52) {
    semana4 = 1;
  }
  const inicioAno4 = `${ano}-01-01`;
  const finalAno4 = `${ano}-12-31`;

  let semana5 = semana4 + 1;
  if (semana5 > 52) {
    semana5 = 1;
  }
  const inicioAno5 = `${ano}-01-01`;
  const finalAno5 = `${ano}-12-31`;

  //  const inicioAno1 = `${AnoIncio}-${mesInicio}-01`;
  //  const finalAno1 = `${AnoIncio}-${mesInicio}-31`;

  const posts = await prisma.relatorioDiscipulado
    .findMany({
      where: {
        OR: [
          {
            Semana: Number(semana0),
            AND: {
              Data: { lte: new Date(finalAno0), gte: new Date(inicioAno0) },
            },
          },
          {
            Semana: Number(semana1),
            AND: {
              Data: { lte: new Date(finalAno1), gte: new Date(inicioAno1) },
            },
          },
          {
            Semana: Number(semana2),
            AND: {
              Data: { lte: new Date(finalAno2), gte: new Date(inicioAno2) },
            },
          },

          {
            Semana: Number(semana3),
            AND: {
              Data: { lte: new Date(finalAno3), gte: new Date(inicioAno3) },
            },
          },
          {
            Semana: Number(semana4),
            AND: {
              Data: { lte: new Date(finalAno4), gte: new Date(inicioAno4) },
            },
          },
          {
            Semana: Number(semana5),
            AND: {
              Data: { lte: new Date(finalAno5), gte: new Date(inicioAno5) },
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
