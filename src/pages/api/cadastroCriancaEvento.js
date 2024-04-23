import prisma from 'src/lib/prisma';

import uniqid from 'uniqid';
import SendEmail from 'src/utils/sendEmail';

const createdAt = new Date();

//= =========================================================================

//= =========================================================================
const handler = async (req, res) => {
  //  let respPagamento;
  const celular = req.body.fone;
  const { cpf } = req.body;
  const { total } = req.body;
  const fpagamento = 'dinheiro';
  const CPF = cpf;
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
  const Celular = celular;
  const { Responsavel } = req.body;
  const { Secretaria } = req.body;
  const id = uniqid();
  const { Evento } = req.body;
  const qtyAdultos = req.body.qtyA;
  const qtyCriancas1 = req.body.qtyC1;
  const qtyCriancas2 = req.body.qtyC2;
  const { transporte } = req.body;
  const { Jurisdicao } = req.body;
  const { Distrito } = req.body;
  try {
    const posts = await prisma.inscritosEventosIgreja
      .create({
        data: {
          Email,
          Nome,
          CPF,
          Celular,
          Fpagamento: fpagamento,
          status: 'approved',
          idPagamento: id,
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
    const mensagem = `Compra realizada no valor de ${total},00 Reais. Pago no Local com status de aprovado. Ticket gerado no nome de ${Nome} e codigo de compra de: ${id}. Acesse o link e click em MINHA INSCRIÇÃO e Digite seu CPF e pressione Gerar Credencial para verificar sua inscrição. Obrigado por participar conosco desse grande Evento. `;
    const dadosEmail = {
      enviadoPor: 'cafinpi@gmail.com',
      mensagem,
      para: Email,
      assunto: 'Inscricao Eventos',
    };

    SendEmail(dadosEmail);

    res.send(posts);
  } catch (errors) {
    console.log(errors);
    res.send(errors);
  }
  // res.send(response);
};

export default handler;
