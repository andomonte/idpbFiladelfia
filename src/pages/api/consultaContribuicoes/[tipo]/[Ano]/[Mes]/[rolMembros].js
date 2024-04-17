import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { tipo, Mes, Ano, rolMembros },
  } = req;
  let inicioAno = `${Ano}-${Number(Mes) + 1}-01`;
  let finalAno = `${Ano}-${Number(Mes) + 1}-31`;

  if (tipo === 2) {
    inicioAno = `${Ano}-01-01`;
    finalAno = `${Ano}-12-31`;
    try {
      const posts = await prisma.tB_LANCAMENTO
        .findMany({
          where: {
            AND: [
              {
                id_membro: Number(rolMembros),
                LANC_DATA: {
                  lte: new Date(finalAno),
                  gte: new Date(inicioAno),
                  mesReferencia: String(Mes),
                },
              },
            ],
          },
          orderBy: [
            {
              LANC_DATA: 'asc',
            },
          ],
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      const newPosts = JSON.parse(
        JSON.stringify(
          posts,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      );
      res.statuCode = 200;
      res.setHeader('Content-Type', 'aplication/json');
      res.json(newPosts);
    } catch (err) {
      // console.log(err);
      console.log('errros', err);
      res.json(err);
    } // Get route's catch handler, if it exists
  }

  try {
    const posts = await prisma.tB_LANCAMENTO
      .findMany({
        where: {
          AND: [
            {
              id_membro: Number(rolMembros),
              LANC_DATA: { lte: new Date(finalAno), gte: new Date(inicioAno) },
            },
          ],
        },
        orderBy: [
          {
            LANC_DATA: 'asc',
          },
        ],
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const newPosts = JSON.parse(
      JSON.stringify(
        posts,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    );
    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(newPosts);
  } catch (err) {
    // console.log(err);
    console.log('errros', err);
    res.json(err);
  } // Get route's catch handler, if it exists
}
