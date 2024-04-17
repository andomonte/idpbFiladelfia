import React from 'react';
import { Box } from '@material-ui/core';
import { Line, Pie } from 'react-chartjs-2';
import TableContainer from '@mui/material/TableContainer';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const options2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
    },
  },
};
const labels2 = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default function App({ entradasT, listaCC }) {
  const newEntradas = entradasT.filter((val) => val.CC_ID === listaCC.CC_ID);

  const setPerson = new Set();
  const filterMeses = newEntradas?.filter((person) => {
    const duplicatedPerson = setPerson.has(person.mesReferencia);
    setPerson.add(person.mesReferencia);
    return !duplicatedPerson;
  });

  const labels = [];
  const lancMesR = [];
  const lancMesD = [];
  const somaMesR = [];
  const somaMesD = [];
  filterMeses.map((val, index) => {
    labels.push(labels2[Number(val.mesReferencia) - 1]);
    lancMesR[index] = newEntradas.filter(
      (val2) =>
        val2.mesReferencia === val.mesReferencia &&
        val2.LANC_TIPO === 'Receita',
    );
    somaMesR[index] = lancMesR[index]
      .reduce((prev, curr) => prev + Number(curr.LANC_VALOR), 0)
      .toFixed(2);

    lancMesD[index] = newEntradas.filter(
      (val2) =>
        val2.mesReferencia === val.mesReferencia &&
        val2.LANC_TIPO === 'Despesa',
    );
    somaMesD[index] = lancMesD[index]
      .reduce((prev, curr) => prev + Number(curr.LANC_VALOR), 0)
      .toFixed(2);
    return 0;
  });

  somaMesR.push(0);
  somaMesD.push(0);

  const setCat = new Set();
  const arrayCat1 = [];
  lancMesD.map((val) => {
    arrayCat1.push(val);
    return 0;
  });

  const filterCat = arrayCat1[0]?.filter((person) => {
    const duplicatedPerson = setCat.has(person.CAT_ID);
    setCat.add(person.CAT_ID);
    return !duplicatedPerson;
  });
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'RECEITAS',
        data: somaMesR,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        type: 'line',
        fill: true,
        label: 'DESPESAS',
        data: somaMesD,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  };
  const corFundo = [
    '#f205e6',
    '#4ca2f9',
    '#a4e43f',
    '#f2510e',
    '#651be6',
    '#ffdbe1',
    '#76fc1b',
  ];
  /// ===========================================================
  const corFinal = [];
  const dadosFinal = [];
  const itens = [];

  filterCat.sort((a, b) => {
    if (Number(b.LANC_VALOR) > Number(a.LANC_VALOR)) {
      return 1;
    }
    if (Number(b.LANC_VALOR) < Number(a.LANC_VALOR)) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  filterCat.map((val, index) => {
    if (index < 3) {
      corFinal.push(corFundo[index].toLocaleUpperCase());
      dadosFinal[index] = Number(val.LANC_VALOR).toFixed(2);
      itens[index] = val.CAT_NOME;
    }
    return 0;
  });

  const data2 = {
    labels: itens,
    type: 'pie',
    datasets: [
      {
        label: '# of Votes',
        data: dadosFinal,
        backgroundColor: corFinal,
        plugins: {
          legend: false,
          tooltip: false,
        },
      },
    ],
  };
  //= =============================================================

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <TableContainer sx={{ minHeight: 320, height: '100%' }}>
        <Box mt={3}>
          <Line options={options} data={data} />
        </Box>
        <Box mt={5} mb={5}>
          <Box fontFamily="Fugaz One" textAlign="center">
            3 MAIORES DESPESAS
          </Box>
          <Pie data={data2} options={options2} />
        </Box>
      </TableContainer>
    </Box>
  );
}
