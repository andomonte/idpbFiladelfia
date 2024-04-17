import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const { dados } = req.body;

  let id = 0;

  if (dados) {
    try {
      const inscricao = await prisma.inscritosEventosGeral
        .findMany({
          where: {
            AND: {
              RolMembro: dados.RolMembro,
              Documento: dados.Documento,
              idEvento: Number(dados.idEvento),
            },
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      if (inscricao.length) {
        id = Number(inscricao[0].id);
      }
    } catch (errors) {
      console.log(errors);
      //      res.status(400).send('vou criar o banco');
    }

    if (id !== 0) {
      try {
        await prisma.inscritosEventosGeral
          .update({
            where: {
              id,
            },
            data: {
              ...dados,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
        res.status(200).send('atualizado');
      } catch (errors) {
        console.log(errors);
        res.status(400).send('vou criar o banco');
      }
    } else {
      try {
        await prisma.inscritosEventosGeral
          .create({
            data: {
              ...dados,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
        res.status(200).send('criado');
      } catch (errors) {
        console.log(errors);
        res.status(400).send('erro ao criar banco');
      }
    }
  }
};
//= =========================================================================

export default handler;
