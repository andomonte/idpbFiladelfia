import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana },
  } = req;

  const Semana = Number(semana);
  const posts = await prisma.pontuacao
    .findMany({
      where: {
        AND: {
          Semana: Number(Semana),
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
}
