import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.pontuacao
      .findMany({
        where: {
          OR: [
            {
              Semana: Number(semana),
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
