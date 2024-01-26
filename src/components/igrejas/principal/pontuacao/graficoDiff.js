import React from 'react';
import { Chart } from 'react-google-charts';

export default function App({ dados, qtdMembros, parametros }) {
  const options = {
    legend: { position: 'top' },
    diff: {
      oldData: {
        opacity: 1,
        color: 'red',
        backgroundColor: 'red',
      },
      newData: { opacity: 1, color: 'green' },
    },
    hAxis: {
      title: `Dados da Célula ${dados.Celula}`,
    },
    vAxis: {
      title: `Pontos de ${dados.semanas} ${
        dados.semana > 1 ? 'Semanas' : 'Semana'
      }`,
    },
  };
  const presCelulaDesejado =
    dados.semanas * ((parametros[0].PresCelulas * 10) / 100).toFixed(2);
  const visCelulaDesejado =
    dados.semanas * ((parametros[0].VisCelula * qtdMembros) / 100).toFixed(0);
  const presCelebracaoDesejado =
    dados.semanas * ((parametros[0].PresCelebracao * 10) / 100).toFixed(2);
  const visCelebracaoDesejado =
    dados.semanas *
    ((parametros[0].VisCelebracao * qtdMembros) / 100).toFixed(0);
  const dataOld = [
    ['Pontos Desejados', 'Pontos Feitos'],
    ['PresCelula', presCelulaDesejado],
    ['VisCelula.', visCelulaDesejado],
    ['PresCeleb.', presCelebracaoDesejado],
    ['VisCelebr.', visCelebracaoDesejado],
  ];

  const dataNew = [
    ['Pontos Desejados', 'Pontos Feitos'],
    ['PresCelula', Number(dados.percPresentes)],
    ['VisCelula', Number(dados.VisitantesCelula)],
    ['PresCelebr.', Number(dados.percCelebracaoIgreja)],
    ['VisCeleb.', Number(dados.VisitantesCelebracao)],
  ];

  const diffdata = {
    old: dataOld,
    new: dataNew,
  };
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
      options={options}
    />
  );
}
