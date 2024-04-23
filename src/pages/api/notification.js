import prisma from 'src/lib/prisma';

import SendEmail from 'src/utils/sendEmail';

const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

const Notificacao = async (req, res) => {
  //  let respPagamento;

  let id;
  let topic;

  if (req.body.data) id = req.body.data.id;
  else id = req.query.id;
  if (req.body.type) topic = req.body.type;
  else topic = req.query.topic;
  let mercadoPago;

  if (id === '123456') id = '1245195651'; // teste
  if (topic === 'payment') {
    try {
      mercadoPago = await mercadopago.payment.findById(id);

      //      res.send(mercadoPago);
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.status(500).send('ERRO AO CESSAR MERCADO PAGO');
    }
  }

  if (mercadoPago && mercadoPago.response.status) {
    try {
      const inscrito = await prisma.inscritosEventosIgreja
        .findMany({
          where: { idPagamento: id },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
      if (inscrito) {
        const mensagem = `Compra realizada no valor de ${inscrito[0].Total},00 Reais. Pago no ${inscrito[0].Fpagamento} com status de ${mercadoPago.response.status}. Ticket gerado no nome de ${inscrito[0].Nome} e codigo de compra de: ${inscrito[0].idPagamento}.Acesse o link e click em MINHA INSCRIÇÃO e Digite seu CPF e pressione Gerar Credencial para verificar sua inscrição. Obrigado por participar conosco desse grande Evento. `;

        const dadosEmail = {
          enviadoPor: 'cafinpi@gmail.com',
          mensagem,
          para: inscrito[0].Email,
          assunto: mercadoPago.response.description,
        };

        await prisma.inscritosEventosIgreja
          .update({
            where: { idPagamento: id },
            data: {
              status: mercadoPago.response.status,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });

        if (
          mercadoPago.response.status === 'approved' &&
          inscrito[0].status !== 'approved'
        ) {
          SendEmail(dadosEmail);
        }
      }

      res.status(200).send('OK');
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.status(400).send('vou criar o banco');
    }
  }

  if (
    mercadoPago &&
    mercadoPago.response.status &&
    mercadoPago.response.description === 'OFERTAS IDPB-NACIONAL'
  ) {
    try {
      const inscrito = await prisma.ofertas
        .findMany({
          where: { idPagamento: id },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
      if (inscrito) {
        await prisma.ofertas
          .update({
            where: { idPagamento: id },
            data: {
              status: mercadoPago.response.status,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      }

      res.status(200).send('OK');
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.status(400).send('vou criar o banco');
    }
  }
};

export default Notificacao;
