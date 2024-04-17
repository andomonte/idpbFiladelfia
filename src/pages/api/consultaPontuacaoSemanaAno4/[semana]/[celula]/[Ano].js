import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano, celula },
  } = req;

  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.pontuacao
      .findMany({
        where: {
          OR: [
            {
              Semana: {
                lt: Number(semana),
              },
              Celula: Number(celula),
            },
          ],
          AND: {
            OR: [
              {
                Ano: Number(Ano),
              },
            ],
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
