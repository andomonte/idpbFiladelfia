import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.tB_CENTRO_CUSTO.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.send(
    JSON.stringify(posts, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
}
