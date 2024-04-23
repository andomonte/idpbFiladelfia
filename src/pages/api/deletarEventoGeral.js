import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  // const action = `${rel}.findMany`

  if (dados) {
    try {
      const { id } = dados;

      const posts = await prisma.eventos.delete({
        where: {
          id,
        },
      });
      res.status(200).send(posts);
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
