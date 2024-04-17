import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const dados = req.body;

  //  var imageData = fs.readFileSync('/path/to/file');
  const Ano = Number(dados.contAno);
  const Mes = Number(dados.contMes) + 1;
  const posts = await prisma.tB_LANCAMENTO
    .findMany({
      where: {
        AND: [
          {
            mesReferencia: Mes,
            anoReferencia: Ano,
          },
        ],
      },
      orderBy: [
        {
          mesReferencia: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.send(
    JSON.stringify(posts, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
}
