import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Box } from '@material-ui/core';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function createLabelData2(label, valor) {
  return {
    label,
    valor,
  };
}

export default function Grafico({
  dados,
  qtdMembros,
  parametros,
  pontosCelulas,
  semana,
  ano,
  dadosCelula,
  distritos,
}) {
  const pontosCelula = pontosCelulas.filter(
    (val) => val.Celula === dados.Celula && val.Distrito === dados.Distrito,
  );
  const [pontosGeral, setPontosGeral] = React.useState([]);
  const pontosMes = pontosCelula.length < 2 ? pontosGeral : pontosCelula;
  const qytSemanas =
    pontosCelula.length < 2 ? pontosCelula.length : pontosCelula.length;

  const detalhesPontos = [];
  const pontosTotal = [];
  const semanas = [];
  if (pontosCelula.length) {
    pontosCelula.map((val, index) => {
      detalhesPontos[index] = JSON.parse(val.Pontuacao);
      pontosTotal[index] = val.Pontos;
      semanas[index] = `Sem ${val.Semana}`;
      return 0;
    });
  }
  const url1 = `/api/consultaPontuacaoSemanaAno4/${semana + 1}/${
    dados.Celula
  }/${ano}`;
  const { data: pontosAnt, error: errorPontosAnt } = useSWR(url1, fetcher);
  React.useEffect(() => {
    if (errorPontosAnt) return <div>An error occured.</div>;
    if (!pontosAnt) return <div>Loading ...</div>;
    if (pontosAnt) {
      const pontosCelulaTemp = pontosAnt?.filter(
        (val) =>
          Number(val.Celula) === Number(dados.Celula) &&
          Number(val.Distrito) === Number(dados.Distrito),
      );

      setPontosGeral(pontosCelulaTemp);
      //  const pontosTotal = pontosCelula.reduce((prev) => prev.TotalRank);
    }
    return 0;
  }, [pontosAnt]);

  const presCelulaDesejado =
    qytSemanas * ((parametros[0].PresCelulas * 10) / 100).toFixed(2);

  const presCelebracaoDesejado =
    qytSemanas * ((parametros[0].PresCelebracao * 10) / 100).toFixed(2);

  const discipulado =
    qytSemanas * ((parametros[0].Discipulado * 10) / 100).toFixed(2);

  const leitura = qytSemanas * ((parametros[0].Leitura * 10) / 100).toFixed(2);

  const visCelulaDesejado =
    qytSemanas * ((parametros[0].VisCelula * qtdMembros) / 100).toFixed(0);

  const visCelebracaoDesejado =
    qytSemanas * ((parametros[0].VisCelebracao * qtdMembros) / 100).toFixed(0);
  const visitasLider =
    qytSemanas * ((parametros[0].Visitas * qtdMembros) / 100).toFixed(0);
  const eventos =
    qytSemanas * ((parametros[0].Eventos * qtdMembros) / 100).toFixed(0);
  const relatorios =
    dados.Relatorio +
    dados.Pontualidade +
    dados.RelCelebracao +
    dados.RelCelulaFeito +
    dados.RelDiscipulado;

  const RelatorioDesejado =
    qytSemanas * ((parametros[0].Relatorios * 5) / 100).toFixed(0);
  const PlanejamentoDesejado =
    qytSemanas * ((parametros[0].Planejamento * 10) / 100).toFixed(0);

  const data = {
    labels: [
      'Relatórios',
      'Planejamento',
      'Pres-Célula',
      'Pres-Culto',
      'Discipulado',
      'Leitura',
      'Vis-Célula',
      'Vis-Culto',
      'Visitas',
      'Eventos',
    ],

    datasets: [
      {
        type: 'bar',
        label: 'Pontos Feitos',
        data: [
          relatorios,
          dados.planejamento,
          dados.percPresentes,
          dados.percCelebracaoIgreja,
          dados.percDiscipulado,
          dados.percLeituraBiblica,
          dados.VisitantesCelula,
          dados.VisitantesCelebracao,
          dados.Visitas,
          dados.Eventos,
        ],
        borderColor: 'rgb(59, 44, 181)',
        backgroundColor: 'rgba(99, 147, 255, 0.6)',
      },
      {
        type: 'line',
        label: 'Pontos Desejado',
        data: [
          RelatorioDesejado,
          PlanejamentoDesejado,
          presCelulaDesejado,
          presCelebracaoDesejado,
          discipulado,
          leitura,
          visCelulaDesejado,
          visCelebracaoDesejado,
          visitasLider,
          eventos,
        ],
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };

  //-----------------------------------------------------
  const vDesejadoParametros =
    RelatorioDesejado +
    PlanejamentoDesejado +
    presCelulaDesejado +
    presCelebracaoDesejado +
    discipulado +
    leitura +
    visCelulaDesejado +
    visCelebracaoDesejado +
    visitasLider +
    eventos;

  const labelData2 = [];
  pontosMes?.map((val, i) => {
    if (val.Semana) {
      labelData2[i] = createLabelData2(`Sem - ${val.Semana}`, val.Semana);
    }

    return 0;
  });
  const labelData2Final = labelData2?.map((val) => val.label);
  const valorData2 = pontosMes?.map((val) => val.TotalRank);
  const valorData2Parametros = pontosMes?.map(
    () => Number(vDesejadoParametros) / qytSemanas,
  );

  const data2 = {
    labels: labelData2Final,
    datasets: [
      {
        label: 'Total de Pontos',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(47,153,76,0.4)',
        borderColor: 'rgba(47,153,76,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(47,153,76,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(47,153,76,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: valorData2,
      },
      {
        type: 'line',
        label: 'Pontos Desejado',
        data: valorData2Parametros,
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };

  //-----------------------------------------------------

  const options = {
    legend: {
      display: true,
      position: 'bottom',
    },
    maintainAspectRatio: false,
  };
  const options2 = {
    maintainAspectRatio: false,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Box width="100%">
        <Box width="100%" textAlign="center">
          <Box mt={3} fontFamily="Fugaz One" fontSize="14px">
            {dadosCelula.Nome ? dadosCelula.Nome.toUpperCase() : 'SEM'}
          </Box>
          <Box mt={1} fontFamily="Fugaz One" fontSize="14px">
            {distritos.length && dadosCelula.distrito
              ? distritos[dadosCelula.distrito].Distrito_Nome
              : 'SEM'}
          </Box>
        </Box>

        <Box width="100%" textAlign="center">
          <Box mt={3} mb={1} fontFamily="Fugaz One" fontSize="14px">
            DESEMPENHO DE{' '}
            <strong
              style={{
                fontFamily: 'Rubik',
                color: 'red',
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {qytSemanas}
            </strong>{' '}
            {qytSemanas > 1 ? 'SEMANAS' : 'SEMANA'}
          </Box>
          <Bar data={data} options={options2} />
        </Box>

        <Box mt={2} />
        <Box textAlign="center">
          <Box fontFamily="Fugaz One" fontSize="14px">
            DESEMPENHO POR TOTAL DE{' '}
            <strong
              style={{
                fontFamily: 'Rubik',
                color: 'red',
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {pontosMes.length}
            </strong>
            {qytSemanas > 1 ? 'SEMANAS' : 'SEMANA'}
          </Box>

          <Line data={data2} options={options} />
        </Box>
      </Box>
    </Box>
  );
}
