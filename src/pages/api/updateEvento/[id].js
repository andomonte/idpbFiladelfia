import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const postId = req.query.id;
  const result = await prisma.eventos.update({
    where: { id: Number(postId) },
    data: {
      ...req.body,
    },
  });

  res.json(result);
}