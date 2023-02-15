import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  // const action = `${rel}.findMany`

  if (dados) {
    try {
      const { id } = dados;
      const idFinal = id || 0;
      await prisma.eventosCelulas.upsert({
        where: {
          id: idFinal,
        },
        update: {
          Data: dados.Data,
          Evento: dados.Evento,
          Local: dados.Local,
          Objetivo: dados.Objetivo,
          Descricao: dados.Descricao,
          Mes: dados.Mes,
          Ano: dados.Ano,
          Horario: dados.Horario,
          Celula: dados.Celula,
          Distrito: dados.Distrito,
          CriadoEm: dados.CriadoEm,
        },
        create: {
          Data: dados.Data,
          Evento: dados.Evento,
          Local: dados.Local,
          Objetivo: dados.Objetivo,
          Descricao: dados.Descricao,
          Mes: dados.Mes,
          Ano: dados.Ano,
          Horario: dados.Horario,
          Celula: dados.Celula,
          Distrito: dados.Distrito,
          CriadoEm: dados.CriadoEm,
        },
      });

      res.status(200).send('OK');
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
