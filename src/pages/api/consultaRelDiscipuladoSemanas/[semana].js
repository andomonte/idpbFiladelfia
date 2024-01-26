import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana },
  } = req;

  // const action = `${rel}.findMany`
  const semana1 = Number(semana) + 1;
  const semana2 = Number(semana) + 2;
  const semana3 = Number(semana) + 3;
  const semana4 = Number(semana) + 4;
  const posts = await prisma.relatorioDiscipulado
    .findMany({
      where: {
        OR: [
          {
            Semana: Number(semana),
          },
          {
            Semana: Number(semana1),
          },
          {
            Semana: Number(semana2),
          },

          {
            Semana: Number(semana3),
          },
          {
            Semana: Number(semana4),
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
