import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';

export default function GraficoFinal({
  dados,
  qtdMembros,
  parametros,
  pontosCelulas,
}) {
  const pontosCelula = pontosCelulas?.filter(
    (val) => val.Celula === dados.Celula,
  );

  const detalhesPontos = [];
  const pontosTotal = [];
  const semanas = [];
  if (pontosCelula.length) {
    pontosCelula?.map((val, index) => {
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

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart',
      },
    },
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box width="100%">
        <Box width="100%" textAlign="center">
          <Box mt={1} fontFamily="Fugaz One" fontSize="14px">
            DESEMPENHO DE {dados.semanas}{' '}
            {dados.semanas > 1 ? 'SEMANAS' : 'SEMANA'}
          </Box>
          <Bar data={data} options={options2} />
        </Box>
      </Box>
    </Box>
  );
}
