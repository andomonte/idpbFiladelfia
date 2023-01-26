import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;
  try {
    const result = await prisma.membros
      .update({
        where: { RolMembro: Number(dados.RolMembro) },
        data: {
          ...dados,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const newMembros = JSON.stringify(
      result,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    );

    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');

    res.json(newMembros);
  } catch (err) {
    // console.log(err);
    console.log('errros', err);
    res.json(err);
  } // Get route's catch handler, if it exists
};
//= =========================================================================

export default handler;
