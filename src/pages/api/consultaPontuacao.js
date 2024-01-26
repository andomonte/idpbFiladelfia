import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const dados = req.body;

  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.pontuacao
      .findMany({
        where: {
          Semana: { gt: Number(dados.semanaI - 1) },
          AND: {
            Semana: { lt: Number(dados.semanaF + 1) },
            OR: [
              {
                Ano: Number(dados.anoI),
              },
              {
                Ano: Number(dados.anoF),
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
