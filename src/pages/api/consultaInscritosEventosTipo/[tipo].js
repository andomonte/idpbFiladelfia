import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { tipo },
  } = req;

  try {
    const posts = await prisma.inscritosEventosIgreja
      .findMany({
        where: {
          AND: {
            Evento: tipo,
            status: 'approved',
          },
        },
        orderBy: [
          {
            Nome: 'asc',
          },
        ],
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    //  res.end(JSON.stringify({ posts }));

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
}
