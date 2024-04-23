import React from 'react';
import { Box } from '@material-ui/core';

import moment from 'moment';

import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';

import api from 'src/components/services/api';

function createListaNome(Celula, Lider, Pontos, semanas) {
  return {
    Celula,
    Lider,
    Pontos,
    semanas,
  };
}
function createCelulaSelecionada(
  Celula,
  semanas,
  CelebracaoIgreja,
  CelebracaoLive,
  Discipulados,
  Eventos,
  LeituraBiblica,
  NovoMembro,
  Pontualidade,
  PresentesCelula,
  RelCelebracao,
  RelCelulaFeito,
  RelDiscipulado,
  Relatorio,
  VisitantesCelebracao,
  VisitantesCelula,
  Visitas,
  percCelebracaoIgreja,
  percCelebracaoLive,
  percDiscipulado,
  percLeituraBiblica,
  percPresentes,
  planejamento,
) {
  return {
    Celula,
    semanas,
    CelebracaoIgreja,
    CelebracaoLive,
    Discipulados,
    Eventos,
    LeituraBiblica,
    NovoMembro,
    Pontualidade,
    PresentesCelula,
    RelCelebracao,
    RelCelulaFeito,
    RelDiscipulado,
    Relatorio,
    VisitantesCelebracao,
    VisitantesCelula,
    Visitas,
    percCelebracaoIgreja,
    percCelebracaoLive,
    percDiscipulado,
    percLeituraBiblica,
    percPresentes,
    planejamento,
  };
}
function getPreviousMonday(date) {
  const previousMonday = date;

  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}
export default function Pontuacao({
  perfilUser,
  parametros,
  supervisao,
  dataEnviada,
  celulaEnviada,
  pontos,
}) {
  const CelulasCoord = supervisao?.filter(
    (val) =>
      val.Coordenacao === Number(perfilUser.Coordenacao) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const dia = dataEnviada.substring(0, 2);
  const mes = dataEnviada.substring(3, 5);
  const ano = dataEnviada.substring(6, 10);
  const semanaExata = (dataEnviada2) => {
    const Ano = dataEnviada2.getFullYear();
    const Mes = dataEnviada2.getMonth();
    const Dia = dataEnviada2.getDate();
    const firstSun = new Date(2021, 0, 1);
    const lastSun = new Date(Ano, Mes, Dia);

    while (firstSun.getDay() !== 2) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 2) {
      lastSun.setDate(lastSun.getDate() + 1);
    }

    let result = 0;
    for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
      lastSun.setDate(lastSun.getDate() - 7);
      if (i > 52) i = 1;
      result = i;
    }

    return result;
  };

  //= =================================================================

  const [semana, setSemana] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);
  const [pontosCelulas, setPontosCelulas] = React.useState(0);

  const timeElapsed2 = `${ano}/${mes}/${dia}`;
  const dataAtual2 = new Date(timeElapsed2);
  moment(getPreviousMonday(dataAtual2)).format('DD/MM/YYYY');
  const [selectedDate] = React.useState(dataAtual2);
  const [anoI] = React.useState(ano);

  const [qtdMembros, setQtdMembros] = React.useState(0);
  const [selectedDate2] = React.useState(dataAtual2);
  const [anoF] = React.useState(ano);

  const verPontos = () => {
    if (pontos) {
      const pontuacao = [];
      const members = [];
      members[0] = pontos;

      let distritoF;
      CelulasCoord?.filter(() => {
        if (CelulasCoord.length) distritoF = members?.filter((val2) => val2);

        return 0;
      });

      setPontosCelulas(distritoF);
      const setPerson = new Set();
      const listaCelulas = distritoF?.filter((person) => {
        const duplicatedPerson = setPerson.has(person.Celula);
        setPerson.add(person.Celula);
        return !duplicatedPerson;
      });

      for (let i = 0; i < listaCelulas.length; i += 1) {
        let pontosAgora = 0;
        let liderAgora = 'Sem';
        let celulaAgora = 0;
        distritoF.map((val) => {
          if (val.Celula === listaCelulas[i].Celula) {
            pontosAgora = Number(
              Number(pontosAgora) + Number(val.TotalRank),
            ).toFixed(2);
            celulaAgora = val.Celula;
            liderAgora = val.CriadoPor ? val.CriadoPor : 'Sem';
          }

          return 0;
        });

        pontuacao[i] = createListaNome(
          celulaAgora,
          liderAgora,
          pontosAgora,
          semanaF - semana + 1,
        );
      }
    }
  };

  React.useEffect(() => {
    if (selectedDate) {
      setSemana(semanaExata(selectedDate));
    }
    if (selectedDate2) {
      setSemanaF(semanaExata(selectedDate2));
    }
  }, [selectedDate2, selectedDate]);
  React.useEffect(() => {
    if (semana !== 0 && semanaF !== 0) {
      verPontos();
    }

    verPontos();
  }, [semana, semanaF]);

  const [PontosCelulaSelecionada, setPontosCelulaSelecionada] =
    React.useState('');

  const handleCheckCelula = async (celulaSelecionada) => {
    const celulaFiltrada = pontosCelulas?.filter(
      (val) => val.Celula === celulaSelecionada.Celula,
    );

    const detalhesPontos = [];
    const pontosTotal = [];

    if (celulaFiltrada.length) {
      celulaFiltrada.map((val, index) => {
        detalhesPontos[index] = JSON.parse(val.Pontuacao);
        pontosTotal[index] = val.TotalRank;
        return 0;
      });
    }

    const parametrosPontuacao = [
      'CelebracaoIgreja',
      'CelebracaoLive',
      'Discipulados',
      'Eventos',
      'LeituraBiblica',
      'NovoMembro',
      'Pontualidade',
      'PresentesCelula',
      'RelCelebracao',
      'RelCelulaFeito',
      'RelDiscipulado',
      'Relatorio',
      'VisitantesCelebracao',
      'VisitantesCelula',
      'Visitas',
      'percCelebracaoIgreja',
      'percCelebracaoLive',
      'percDiscipulado',
      'percLeituraBiblica',
      'percPresentes',
      'planejamento',
    ];
    if (detalhesPontos.length) {
      const arrayTeste = [];

      for (let i = 0; i < parametrosPontuacao.length; i += 1) {
        arrayTeste[i] = detalhesPontos.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue[parametrosPontuacao[i]],
          0,
          {},
        );
      }
      let qytMembros = 0;

      const nan = String(arrayTeste[15]);
      if (nan === 'NaN') {
        qytMembros = await api
          .post('/api/consultaCelulaParaPontos', {
            semanaI: semana,
            semanaF,
            anoI,
            anoF,
            Celula: celulaSelecionada.Celula,
          })
          .then((response) => {
            if (response) {
              if (response.data.length) {
                const qytMembrosF = JSON.parse(
                  response.data[0].NomesMembros,
                ).length;

                return qytMembrosF;
              }
              return 0;
            }
            return 0;
          })
          .catch((erro) => {
            console.log(erro); //  updateFile(uploadedFile.id, { error: true });
            return 0;
          });
        setQtdMembros(qytMembros);
      } else {
        const qytMembrosTemp = Number(
          (arrayTeste[7] * 10) / arrayTeste[19],
        ).toFixed(0);
        setQtdMembros(qytMembrosTemp);
      }

      setPontosCelulaSelecionada(
        createCelulaSelecionada(
          celulaSelecionada.Celula,
          1,
          arrayTeste[0],
          arrayTeste[1],
          arrayTeste[2],
          arrayTeste[3],
          arrayTeste[4],
          arrayTeste[5],
          arrayTeste[6],
          arrayTeste[7],
          arrayTeste[8],
          arrayTeste[9],
          arrayTeste[10],
          arrayTeste[11],
          arrayTeste[12],
          arrayTeste[13],
          arrayTeste[14],
          String(arrayTeste[15]) !== 'NaN'
            ? arrayTeste[15]
            : parseFloat(
                parseFloat((arrayTeste[0] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[16]) !== 'NaN'
            ? arrayTeste[16]
            : parseFloat(
                parseFloat((arrayTeste[1] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[17]) !== 'NaN'
            ? arrayTeste[17]
            : parseFloat(
                parseFloat((arrayTeste[2] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[18]) !== 'NaN'
            ? arrayTeste[18]
            : parseFloat(
                parseFloat((arrayTeste[4] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[19]) !== 'NaN'
            ? arrayTeste[19]
            : parseFloat(
                parseFloat((arrayTeste[7] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[20]) !== 'NaN' ? arrayTeste[20] : 0,
        ),
      );
    }
  };
  React.useEffect(() => {
    if (pontosCelulas.length) handleCheckCelula(celulaEnviada, 0);
  }, [pontosCelulas]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight={570}
      minWidth={300}
      height="100%"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        ml={0}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          minHeight={570}
          minWidth={300}
          height="100%"
        >
          <Box
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            ml={0}
          >
            <TableContainer sx={{ width: '100%', height: '100%' }}>
              <List
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {PontosCelulaSelecionada && (
                  <Box width="100%">
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#c5e1a5',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              FEZ TODOS OS RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Relatorio}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CÉLULA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelulaFeito >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelCelulaFeito}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CELEBRAÇÃO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelebracao >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelCelebracao}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DE DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelDiscipulado >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelDiscipulado}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUALIDADE NA ENTREGA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO DOS RELATÓRIOS
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas *
                                  5 *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Relatorio +
                                PontosCelulaSelecionada.RelCelulaFeito +
                                PontosCelulaSelecionada.RelCelebracao +
                                PontosCelulaSelecionada.RelDiscipulado +
                                PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                5 *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#4fc3f7',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÕES
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percPresentes &&
                                PontosCelulaSelecionada.percPresentes >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percPresentes
                                ? Number(
                                    PontosCelulaSelecionada.percPresentes,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                10 *
                                (parametros[0].PresCelulas / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO IGREJA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percCelebracaoIgreja &&
                                PontosCelulaSelecionada.percCelebracaoIgreja >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percCelebracaoIgreja
                                ? Number(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                10 *
                                (parametros[0].PresCelebracao / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO ON-LINE
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color="black"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percCelebracaoLive
                                ? Number(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RECEBEU DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percDiscipulado &&
                                PontosCelulaSelecionada.percDiscipulado >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percDiscipulado
                                ? Number(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (
                                  (parametros[0].Discipulado * 10) /
                                  100
                                ).toFixed(2)}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              LEITURA BÍBLICA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percLeituraBiblica &&
                                PontosCelulaSelecionada.percLeituraBiblica >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percLeituraBiblica
                                ? Number(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                ((parametros[0].Leitura * 10) / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ),
                                ).toFixed(2) >=
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelebracao * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Discipulado * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Leitura * 10) /
                                        100
                                      ).toFixed(2),
                                  )
                                  ? // pontos 80% celula, celebração e leitura - online + 50% do discipulado
                                    'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.percCelebracaoIgreja,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ),
                              ).toFixed(2)}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {parseFloat(
                                PontosCelulaSelecionada.semanas *
                                  (
                                    (parametros[0].PresCelulas * 10) /
                                    100
                                  ).toFixed(2),
                              ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2),
                                )}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#ff8a65',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula &&
                                PontosCelulaSelecionada.VisitantesCelula >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].VisCelula * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelula || '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].VisCelula * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CELEBRAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelebracao &&
                                PontosCelulaSelecionada.VisitantesCelebracao >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].VisCelebracao *
                                        qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelebracao
                                ? PontosCelulaSelecionada.VisitantesCelebracao
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].VisCelebracao * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITA DO LIDER AOS MEMBROS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Visitas &&
                                PontosCelulaSelecionada.Visitas >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Visitas * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Visitas
                                ? PontosCelulaSelecionada.Visitas
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Visitas * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              EVENTO EVANGELISTICO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Eventos &&
                                PontosCelulaSelecionada.Eventos >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Eventos * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Eventos
                                ? PontosCelulaSelecionada.Eventos
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Eventos * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              NOVO MEMBRO NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.NovoMembro &&
                                PontosCelulaSelecionada.NovoMembro >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].NovoMembro * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.NovoMembro
                                ? PontosCelulaSelecionada.NovoMembro
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].NovoMembro * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PLANEJAMENTO DA CÉLULA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.planejamento &&
                                PontosCelulaSelecionada.planejamento >=
                                  Number(
                                    (parametros[0].Planejamento *
                                      PontosCelulaSelecionada.semanas *
                                      10) /
                                      100,
                                  ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.planejamento
                                ? PontosCelulaSelecionada.planejamento
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Planejamento *
                                  PontosCelulaSelecionada.semanas *
                                  10) /
                                100
                              ).toFixed(0)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula +
                                  PontosCelulaSelecionada.VisitantesCelebracao +
                                  PontosCelulaSelecionada.Visitas +
                                  PontosCelulaSelecionada.Eventos +
                                  PontosCelulaSelecionada.NovoMembro +
                                  PontosCelulaSelecionada.planejamento >=
                                PontosCelulaSelecionada.semanas *
                                  Number(
                                    Number(
                                      (
                                        (parametros[0].VisCelula * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                      Number(
                                        (
                                          (parametros[0].VisCelebracao *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Visitas * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Eventos * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].NovoMembro *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Planejamento * 10) /
                                          100
                                        ).toFixed(0),
                                      ),
                                  )
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelula +
                                PontosCelulaSelecionada.VisitantesCelebracao +
                                PontosCelulaSelecionada.Visitas +
                                PontosCelulaSelecionada.Eventos +
                                PontosCelulaSelecionada.NovoMembro +
                                PontosCelulaSelecionada.planejamento}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                Number(
                                  Number(
                                    (
                                      (parametros[0].VisCelula * qtdMembros) /
                                      100
                                    ).toFixed(0),
                                  ) +
                                    Number(
                                      (
                                        (parametros[0].VisCelebracao *
                                          qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Visitas * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Eventos * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].NovoMembro *
                                          qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Planejamento * 10) /
                                        100
                                      ).toFixed(0),
                                    ),
                                )}
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#ffeb3b',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              TOTAL GERAL
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelula,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.VisitantesCelebracao,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoIgreja,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Visitas,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Eventos,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.NovoMembro,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.planejamento,
                                    ) +
                                    PontosCelulaSelecionada.Relatorio +
                                    PontosCelulaSelecionada.RelCelulaFeito +
                                    PontosCelulaSelecionada.RelCelebracao +
                                    PontosCelulaSelecionada.RelDiscipulado +
                                    PontosCelulaSelecionada.Pontualidade,
                                ).toFixed(2) >=
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    5 *
                                    (parametros[0].Relatorios / 100).toFixed(2),
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelulas * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelebracao * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Discipulado * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Leitura * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  PontosCelulaSelecionada.semanas *
                                    Number(
                                      Number(
                                        (
                                          (parametros[0].VisCelula *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                        Number(
                                          (
                                            (parametros[0].VisCelebracao *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Visitas *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Eventos *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].NovoMembro *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Planejamento * 10) /
                                            100
                                          ).toFixed(0),
                                        ),
                                    )
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.VisitantesCelula,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelebracao,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ) +
                                  parseFloat(PontosCelulaSelecionada.Visitas) +
                                  parseFloat(PontosCelulaSelecionada.Eventos) +
                                  parseFloat(
                                    PontosCelulaSelecionada.NovoMembro,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.planejamento,
                                  ) +
                                  PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade,
                              ).toFixed(2)}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {parseFloat(
                                PontosCelulaSelecionada.semanas *
                                  5 *
                                  (parametros[0].Relatorios / 100).toFixed(2),
                              ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                PontosCelulaSelecionada.semanas *
                                  Number(
                                    Number(
                                      (
                                        (parametros[0].VisCelula * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                      Number(
                                        (
                                          (parametros[0].VisCelebracao *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Visitas * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Eventos * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].NovoMembro *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Planejamento * 10) /
                                          100
                                        ).toFixed(0),
                                      ),
                                  )}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                  </Box>
                )}
              </List>
            </TableContainer>
          </Box>{' '}
        </Box>
      </Box>
    </Box>
  );
}
