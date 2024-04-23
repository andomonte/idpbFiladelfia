import prisma from 'src/lib/prisma';
import cpfMask from 'src/components/mascaras/cpf';

const mercadopago = require('mercadopago');

const createdAt = new Date();
const newCreatedAt = createdAt.getTime() + 30 * 60000;
const expirationDate = new Date(newCreatedAt);
// const expirationDate = new Date(createdAt.getTime() + 30 * 60000);

const accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

//= =========================================================================
async function sendMercadoPago(paymentData) {
  const mercadoPago = mercadopago.payment
    .save(paymentData)
    .then((response) => response)
    .catch((error) => error);
  return mercadoPago;
}

//= =========================================================================
const handler = async (req, res) => {
  //  let respPagamento;

  const paymentData = {
    transaction_amount: Number(req.body.transactionAmount),
    notification_url: 'https://www.idpbcastelo.com.br/api/notification',
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    date_of_expiration: expirationDate,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.tipoDoc,
        number: req.body.docNumber,
      },
    },
  };

  const respPagamento = await sendMercadoPago(paymentData);
  // const respPagamento1 = JSON.stringify(respPagamento);
  const cpf = cpfMask(req.body.cpf);
  const { total } = req.body;
  const fpagamento = 'pix';
  const CPF = cpf;
  const Nome = req.body.nome;
  const Email = req.body.email;
  const Nascimento = req.body.nascimento;
  const Estadia = req.body.estadia;
  const GrauMinisterial = req.body.grau;
  const Sexo = req.body.genero;
  const Evento = req.body.description;
  const HoraChegada = req.body.horario;
  const Igreja = req.body.igrejas;
  const Cidade = req.body.jEstadual;
  const DataChegada = req.body.dataChegada;
  const Celular = req.body.fone;
  const { Responsavel } = req.body;
  const qtyAdultos = req.body.qtyA;
  const qtyCriancas1 = req.body.qtyC1;
  const qtyCriancas2 = req.body.qtyC2;
  const { transporte } = req.body;
  const { Jurisdicao } = req.body;
  const { Distrito } = req.body;

  const ErroIDPB = { code: '5050', message: 'Erro no acesso ao BD-IDPB' };
  if (!respPagamento.cause) {
    if (
      respPagamento.response.status === 'pending' &&
      respPagamento.response.id
    ) {
      // const urlCreate = `/api/criarEvento`;
      const { status } = respPagamento.response;
      const idPagamento = String(respPagamento.response.id);

      try {
        await prisma.inscritosEventosIgreja
          .create({
            data: {
              Email,
              Nome,
              CPF,
              Celular,
              Fpagamento: fpagamento,
              status,
              idPagamento,
              Estadia,
              Total: total,
              Nascimento,
              GrauMinisterial,
              Sexo,
              HoraChegada,
              Igreja,
              Cidade,
              DataChegada,
              Responsavel,
              Evento,
              CreatedAt: createdAt,
              qtyAdultos,
              qtyCriancas1,
              qtyCriancas2,
              transporte,
              Jurisdicao,
              Distrito,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });

        /*  res.status(respPagamento.status).json({
          status: respPagamento.body.status,
          status_detail: respPagamento.body.status_detail,
          id: respPagamento.body.id,
        }); */
        // res.send(JSON.stringify(respPagamento.status));
        res.send(respPagamento);
      } catch (errors) {
        console.log(errors);
        //        const erroIDPB = JSON.stringify(ErroIDPB);

        res.send(ErroIDPB);
      }
    } else {
      //  console.log('sem bd-idpb - repost de erro do mp ', respPagamento);
      res.send(respPagamento);
    }
  } else {
    //  console.log('sem bd-idpb - erro ao enviar ao mp', respPagamento.cause);
    res.send(respPagamento);
  }

  // res.send(response);
};

export default handler;
