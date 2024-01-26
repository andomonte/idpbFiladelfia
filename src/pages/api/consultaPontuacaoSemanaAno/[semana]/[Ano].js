import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // const action = `${rel}.findMany`
  const semana0 = semana;

  let semana1 = Number(semana0) + 1;
  let ano = Ano;
  const AnoInicio = Ano;
  if (semana1 > 52) {
    semana1 = 1;
    ano = Number(Ano) + 1;
  }

  let semana2 = semana1 + 1;
  if (semana2 > 52) {
    semana2 = 1;
    ano = Number(Ano) + 1;
  }

  let semana3 = semana2 + 1;
  if (semana3 > 52) {
    semana3 = 1;
    ano = Number(Ano) + 1;
  }

  let semana4 = semana3 + 1;
  if (semana4 > 52) {
    semana4 = 1;
    ano = Number(Ano) + 1;
  }

  let semana5 = semana4 + 1;
  if (semana5 > 52) {
    semana5 = 1;
    ano = Number(Ano) + 1;
  }

  try {
    const posts = await prisma.pontuacao
      .findMany({
        where: {
          OR: [
            {
              Semana: Number(semana0),
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
            {
              Semana: Number(semana5),
            },
          ],
          AND: {
            OR: [
              {
                Ano: Number(AnoInicio),
              },

              {
                Ano: Number(ano),
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
