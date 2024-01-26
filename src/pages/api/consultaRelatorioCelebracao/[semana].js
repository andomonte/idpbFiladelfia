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
        Semana: Number(semana),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
