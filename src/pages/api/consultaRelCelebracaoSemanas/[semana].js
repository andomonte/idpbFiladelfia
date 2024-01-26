import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana },
  } = req;
  // const action = `${rel}.findMany`
  const posts = await prisma.relatorioCelebracao
    .findMany({
      where: {
        OR: [
          {
            Semana: Number(semana),
          },
          {
            Semana: Number(semana) + 1,
          },
          {
            Semana: Number(semana) + 2,
          },

          {
            Semana: Number(semana) + 3,
          },
          {
            Semana: Number(semana) + 4,
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
