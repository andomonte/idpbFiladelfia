import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;

  const inicioAno = new Date(Ano, Mes, 0, 0, 0, 0, 0);
  const finalAno = new Date(Ano, Mes, 31, 23, 59, 59, 0);
  try {
    const posts = await prisma.tB_LANCAMENTO
      .findMany({
        where: {
          AND: [
            {
              LANC_DATA: { lte: finalAno, gte: inicioAno },
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
