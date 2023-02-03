import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const { id } = req.body;
  try {
    const post = await prisma.visitantes
      .delete({
        where: {
          id: Number(id),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(200).send(post);
  } catch (errors) {
    console.log(errors);
    res.status(400).send(errors);
  }
}
