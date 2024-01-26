import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.avisos
    .findMany({
      orderBy: {
        Data: 'asc',
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(
    JSON.stringify(posts, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
}
