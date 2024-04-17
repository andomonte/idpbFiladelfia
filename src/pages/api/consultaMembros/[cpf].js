import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { cpf },
  } = req;
  const novoCPF = cpf.replace(/([^0-9])/g, '');
  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.membros
      .findMany({
        where: {
          OR: [
            {
              CPF: novoCPF,
            },
            {
              CPF: cpf,
            },
          ],
        },
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
