import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;

  let dia = 30;
  if (
    Mes === 1 ||
    Mes === 3 ||
    Mes === 5 ||
    Mes === 7 ||
    Mes === 8 ||
    Mes === 10 ||
    Mes === 12
  )
    dia = 31;
  if (Mes === 2) {
    dia = 28;
    if (Ano % 4 === 0 && (Ano % 100 !== 0 || Ano % 400 === 0)) dia = 28;
  }
  const finalAno = new Date(Ano, Mes, dia, 23, 59, 59, 0);
  try {
    const posts = await prisma.tB_LANCAMENTO
      .findMany({
        where: {
          AND: [
            {
              LANC_DATA: { lte: finalAno },
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
