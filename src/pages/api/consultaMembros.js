import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.membros
    .findMany({
      where: {
        OR: [
          {
            Situacao: 'ATIVO',
          },
          {
            Situacao: 'NOVO',
          },
        ],
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

  const newMembros = JSON.stringify(
    posts,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');

  res.json(newMembros);
}
