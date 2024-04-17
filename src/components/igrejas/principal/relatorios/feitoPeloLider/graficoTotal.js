import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Box } from '@material-ui/core';

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
  pontosMes,
}) {
  const pontosCelula = pontosCelulas?.filter(
    (val) => val.Celula === dados.Celula,
  );
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

  const presCelulaDesejado =
    dados.semanas * ((parametros[0].PresCelulas * 10) / 100).toFixed(2);

  const presCelebracaoDesejado =
    dados.semanas * ((parametros[0].PresCelebracao * 10) / 100).toFixed(2);

  const discipulado =
    dados.semanas * ((parametros[0].Discipulado * 10) / 100).toFixed(2);

  const leitura =
    dados.semanas * ((parametros[0].Leitura * 10) / 100).toFixed(2);

  const visCelulaDesejado =
    dados.semanas * ((parametros[0].VisCelula * qtdMembros) / 100).toFixed(0);

  const visCelebracaoDesejado =
    dados.semanas *
    ((parametros[0].VisCelebracao * qtdMembros) / 100).toFixed(0);
  const visitasLider =
    dados.semanas * ((parametros[0].Visitas * qtdMembros) / 100).toFixed(0);
  const eventos =
    dados.semanas * ((parametros[0].Eventos * qtdMembros) / 100).toFixed(0);
  const relatorios =
    dados.Relatorio +
    dados.Pontualidade +
    dados.RelCelebracao +
    dados.RelCelulaFeito +
    dados.RelDiscipulado;

  const RelatorioDesejado =
    dados.semanas * ((parametros[0].Relatorios * 5) / 100).toFixed(0);
  const PlanejamentoDesejado =
    dados.semanas * ((parametros[0].Planejamento * 10) / 100).toFixed(0);

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

  const labelData2 = [];
  pontosMes.map((val, i) => {
    if (val.Semana) {
      labelData2[i] = createLabelData2(`Sem - ${val.Semana}`, val.Semana);
    }

    return 0;
  });
  const labelData2Final = labelData2?.map((val) => val.label);
  const valorData2 = pontosMes.map((val) => val.TotalRank);
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

  pontosMes?.map((val, i) => {
    if (val.Semana) {
      labelData2[i] = createLabelData2(`Sem - ${val.Semana}`, val.Semana);
    }

    return 0;
  });

  const valorData2Parametros = pontosMes?.map(
    () => Number(vDesejadoParametros) / qytSemanas,
  );

  const data2 = {
    labels: labelData2Final,
    datasets: [
      {
        label: 'Ultimas 4 semanas',
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

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'PONTUAÇÃO  CÉLULAS',
      },
    },
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="90vw">
        <Box textAlign="center">
          <Box mt={1} fontFamily="Fugaz One" fontSize="14px">
            DESEMPENHO DE {dados.semanas}{' '}
            {dados.semanas > 1 ? 'SEMANAS' : 'SEMANA'}
          </Box>
          <Bar data={data} options={options2} />
        </Box>

        <Box mb={5} mt={5} textAlign="center">
          <Box fontFamily="Fugaz One" fontSize="14px">
            PONTUAÇÃO TOTAL DE {pontosMes.length}{' '}
            {pontosMes.length > 1 ? 'SEMANAS' : 'SEMANA'}
          </Box>

          <Line data={data2} options={options2} />
        </Box>
      </Box>
    </Box>
  );
}
