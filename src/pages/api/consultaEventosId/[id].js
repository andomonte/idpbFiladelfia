import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { id },
  } = req;

  const posts = await prisma.inscritosEventosGeral
    .findMany({
      where: {
        idEvento: Number(id),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.send(posts);
}
