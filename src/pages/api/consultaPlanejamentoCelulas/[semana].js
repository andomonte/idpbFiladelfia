import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana },
  } = req;
  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  console.log('ola aqui');
  try {
    const posts = await prisma.plancelula
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
  } catch (errors) {
    console.log(errors);
    res.status(400).send('vou criar o banco');
  }
}
