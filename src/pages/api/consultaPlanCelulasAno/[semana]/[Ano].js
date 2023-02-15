import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;
  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const inicioAno = `${Ano}-01-01`;
  const finalAno = `${Ano}-12-31`;
  try {
    const posts = await prisma.plancelula
      .findMany({
        where: {
          AND: {
            Semana: Number(semana),
            Data: { lte: new Date(finalAno), gte: new Date(inicioAno) },
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
    res.status(400).send('vou criar o banco');
  }
}
