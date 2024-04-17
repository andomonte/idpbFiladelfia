import React from 'react';
import { Box } from '@material-ui/core';

import moment from 'moment';
import api from 'src/components/services/api';
import Grafico from './grafico';
import GraficoTotal from './graficoTotal';

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
  parametros,
  supervisao,
  coordenacao,
  distrito,
  dataEnviada,
  celulaEnviada,
  pontos,
  pontosMes,
}) {
  let CelulasCoord;
  if (coordenacao.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES') {
    CelulasCoord = supervisao?.filter(
      (val) => Number(val.Distrito) === Number(distrito.Distrito),
    );
  } else
    CelulasCoord = supervisao?.filter(
      (val) =>
        Number(val.Coordenacao) === Number(coordenacao.Coordenacao) &&
        Number(val.Distrito) === Number(distrito.Distrito),
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
      if (listaCelulas)
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
    if (pontosCelulas && pontosCelulas.length)
      handleCheckCelula(celulaEnviada, 0);
  }, [pontosCelulas]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {pontosCelulas ? (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="start"
          ml={0}
        >
          {pontosMes.length > 1 ? (
            <GraficoTotal
              parametros={parametros}
              dados={PontosCelulaSelecionada}
              qtdMembros={qtdMembros}
              semana={semana}
              pontosCelulas={pontosCelulas}
              pontosMes={pontosMes}
            />
          ) : (
            <Grafico
              parametros={parametros}
              dados={PontosCelulaSelecionada}
              qtdMembros={qtdMembros}
              semana={semana}
              pontosCelulas={pontosCelulas}
            />
          )}
        </Box>
      ) : (
        'Garregando os dados'
      )}
    </Box>
  );
}
