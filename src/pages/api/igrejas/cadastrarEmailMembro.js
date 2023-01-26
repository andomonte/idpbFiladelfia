import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const { RolMembro } = req.body;
  const { Email } = req.body;

  const result = await prisma.membros
    .update({
      where: {
        RolMembro,
      },
      data: {
        Email,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const newPosts = JSON.parse(
    JSON.stringify(
      result,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(newPosts);
}
