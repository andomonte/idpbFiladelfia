import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;
  const mes =
    Number(Mes) + 1 > 9 ? `${Number(Mes) + 1}` : `0${Number(Mes) + 1}`;
  const Mes2 = Number(mes);
  let dia = 30;
  if (
    Mes2 === 1 ||
    Mes2 === 3 ||
    Mes2 === 5 ||
    Mes2 === 7 ||
    Mes2 === 8 ||
    Mes2 === 10 ||
    Mes2 === 12
  )
    dia = 31;
  if (Mes2 === 2) {
    dia = 28;
    if (Ano % 4 === 0 && (Ano % 100 !== 0 || Ano % 400 === 0)) dia = 28;
  }
  console.log('dia', dia);
  const inicioAno = `${Ano}-${mes}-01`;
  const finalAno = `${Ano}-${mes}-${dia}`;
  // const action = `${rel}.findMany`

  const posts = await prisma.eventos
    .findMany({
      where: {
        AND: [
          {
            Data: { lte: new Date(finalAno), gte: new Date(inicioAno) },
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
