import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const dados = req.body;

  //  var imageData = fs.readFileSync('/path/to/file');
  const foto = dados.fileImage;
  // const Image = fs.readFileSync(dados.fileImage);

  try {
    await prisma.membros
      .update({
        where: { RolMembro: Number(dados.RolMembro) },
        data: {
          foto,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.send('ok');
  } catch (errors) {
    console.log('erros', errors);
    res.status(400).send('vou criar o banco');
  }
}
