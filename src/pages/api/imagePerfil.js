import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const dados = req.body;
  console.log('dados', dados);
  //  var imageData = fs.readFileSync('/path/to/file');
  const foto = dados.fileImage;
  // const Image = fs.readFileSync(dados.fileImage);

  try {
    const posts = await prisma.membros
      .update({
        where: { RolMembro: Number(dados.RolMembro) },
        data: {
          foto,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.json(
      JSON.stringify(posts, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v,
      ),
    );
  } catch (errors) {
    console.log('erros', errors);
    res.status(400).send('vou criar o banco');
  }
}
