import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { id },
  } = req;

  // const action = `${rel}.findMany`
  try {
    const posts = await prisma.membros
      .findMany({
        where: {
          id: Number(id),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const newMembros = JSON.stringify(
      posts,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    );

    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');

    res.json(newMembros);
  } catch (err) {
    console.log('errros', err);
    res.json(err);
  } // Get route's catch handler, if it exists
}
