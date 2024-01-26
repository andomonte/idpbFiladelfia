import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';

export default function Grafico({ dados }) {
  const data = {
    labels: [
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
        label: 'Presença na célula',
        data: [
          dados.percPresentes,
          dados.percCelebracaoIgreja,
          dados.percDiscipulado,
          dados.percLeituraBiblica,
          dados.VisitantesCelula,
          dados.VisitantesCelebracao,
          dados.Visitas,
          dados.Eventos,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          '#ccff90',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          '#4db6ac',
          '#ffff8d',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box width="100%">
      <Box textAlign="center">
        <h2>DESEMPENHO</h2>
      </Box>
      <Bar
        data={data}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </Box>
  );
}
