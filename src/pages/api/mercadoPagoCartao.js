// import { payment } from 'mercadopago';import prisma from 'src/lib/prisma';
import SendEmail from 'src/utils/sendEmail';
import cpfMask from 'src/components/mascaras/cpf';
import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

//= =========================================================================
async function sendMercadoPago(paymentData) {
  const mercadoPago = mercadopago.payment
    .save(paymentData)
    .then(
      (response) => response,
      //      res.send(JSON.stringify(response.status));
      // JSON.stringify(response.body),
      /*  res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      });
      */ // res.send(JSON.stringify(response.body)),
      //      console.log('valor=', JSON.stringify(response.body));
      /* */
    )
    .catch(
      (error) => console.log(error),
      //      console.log('errr=', respPagamento);
      //  res.send(error);
    );
  return mercadoPago;
}
//= =========================================================================
const handler = async (req, res) => {
  //  let respPagamento;
  const nome = req.body.nome.split(' ');
  const name = nome[0];
  const surname = nome[nome.length - 1];

  const paymentData = {
    transaction_amount: Number(req.body.transactionAmount),
    notification_url: 'https://www.idpbcastelo.com.br/api/notification',
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      first_name: name,
      last_name: surname,
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber,
      },
    },
  };

  /*  const dataTime = (separator = '') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }; */
  const respPagamento = await sendMercadoPago(paymentData);
  // const respPagamento1 = JSON.stringify(respPagamento);

  const { Adultos } = req.body;
  const { Criancas } = req.body;

  const ErroIDPB = {
    body: {
      status: 'erro no banco idpb',
    },
    cause: {
      code: '5050',
      message: 'Erro no acesso ao BD-IDPB',
      idPagamento: respPagamento.body.id,
    },
  };
  if (!respPagamento.cause) {
    if (
      respPagamento.response.status === 'approved' ||
      respPagamento.response.status === 'in_process'
    ) {
      // const urlCreate = `/api/criarEvento`;
      const { status } = respPagamento.response;
      const idPagamento = String(respPagamento.response.id);
      const CreatedAt = new Date();

      const { total } = req.body;
      const fpagamento = req.body.fpag;
      const CPF = cpfMask(req.body.cpf);
      const Nome = req.body.nome;
      const Email = req.body.email;
      const Nascimento = req.body.nascimento;
      const Estadia = req.body.estadia;
      const GrauMinisterial = req.body.grau;
      const Sexo = req.body.genero;
      const HoraChegada = req.body.horario;
      const Igreja = req.body.igrejas;
      const Cidade = req.body.jEstadual;
      const DataChegada = req.body.dataChegada;
      const Celular = req.body.fone;
      const { Responsavel } = req.body;
      const { Secretaria } = req.body;
      const Evento = req.body.description;
      const qtyAdultos = req.body.qtyA;
      const qtyCriancas1 = req.body.qtyC1;
      const qtyCriancas2 = req.body.qtyC2;
      const { transporte } = req.body;
      const { Jurisdicao } = req.body;
      const { Distrito } = req.body;

      const mensagem = `Compra realizada no valor de ${req.body.total}, sendo ${Adultos} e ${Criancas}. Pago no ${fpagamento} com status de ${status}. Ticket no nome de ${Nome} e codigo de compra de ${idPagamento}`;
      const dadosEmail = {
        enviadoPor: 'escritorioestadualidpbam@gmail.com',
        mensagem,
        para: 'escritorioestadualidpbam@gmail.com',
        assunto: Evento,
      };
      SendEmail(dadosEmail);

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
              Secretaria,
              Evento,
              CreatedAt,
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

        return res.send(respPagamento);
      } catch (errors) {
        //        const erroIDPB = JSON.stringify(ErroIDPB);
        console.log(errors);
        res.send(ErroIDPB);
      }
    } else {
      res.send(respPagamento);
    }
  } else {
    //    console.log('sem bd-idpb - erro ao enviar ao mp', respPagamento);
    res.send(respPagamento);
  }
  // res.send(response);
  return 0;
};

export default handler;
