import React from 'react';
import { Line, Bar, Pie } from '@reactchartjs/react-chart.js';
import { signOut } from 'next-auth/client';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);
function Graficos({ item, secao, Data, tipo }) {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  if (dadosUser.length === 0) {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }
  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  //  const [session] = useSession();

  const adultos = [];
  const adolecentes = [];
  const crianças = [];
  const visitantes = [];
  const conversoes = [];
  const url = `${window.location.origin}/api/consultaDados/${dadosUser[0].codigoIgreja}/${mes}/${ano}`;
  const { data } = useSWR(url, fetcher);

  if (data) {
    //    console.log('data', data);
    for (let i = 0; i < data.length; i += 1) {
      adultos[data[i].semana - 1] = data[i].adultos;
      adolecentes[data[i].semana - 1] = data[i].adolecentes;
      crianças[data[i].semana - 1] = data[i].criancas;
      visitantes[data[i].semana - 1] = data[i].visitantes;
      conversoes[data[i].semana - 1] = data[i].conversoes;
      // console.log(adultos[data[i].semana]);
    }
  }
  let tAdultos = 0;
  if (adultos[0]) tAdultos += Number(adultos[0]);
  if (adultos[1]) tAdultos += Number(adultos[1]);
  if (adultos[2]) tAdultos += Number(adultos[2]);
  if (adultos[3]) tAdultos += Number(adultos[3]);
  if (adultos[4]) tAdultos += Number(adultos[4]);
  // console.log(tAdultos);

  let tAdolecentes = 0;
  if (adolecentes[0]) tAdolecentes += Number(adolecentes[0]);
  if (adolecentes[1]) tAdolecentes += Number(adolecentes[1]);
  if (adolecentes[2]) tAdolecentes += Number(adolecentes[2]);
  if (adolecentes[3]) tAdolecentes += Number(adolecentes[3]);
  if (adolecentes[4]) tAdolecentes += Number(adolecentes[4]);

  let tCrianças = 0;
  if (crianças[0]) tCrianças += Number(crianças[0]);
  if (crianças[1]) tCrianças += Number(crianças[1]);
  if (crianças[2]) tCrianças += Number(crianças[2]);
  if (crianças[3]) tCrianças += Number(crianças[3]);
  if (crianças[4]) tCrianças += Number(crianças[4]);
  let tVisitantes = 0;
  if (visitantes[0]) tVisitantes += Number(visitantes[0]);
  if (visitantes[1]) tVisitantes += Number(visitantes[1]);
  if (visitantes[2]) tVisitantes += Number(visitantes[2]);
  if (visitantes[3]) tVisitantes += Number(visitantes[3]);
  if (visitantes[4]) tVisitantes += Number(visitantes[4]);
  let tConversoes = 0;
  if (conversoes[0]) tConversoes += Number(conversoes[0]);
  if (conversoes[1]) tConversoes += Number(conversoes[1]);
  if (conversoes[2]) tConversoes += Number(conversoes[2]);
  if (conversoes[3]) tConversoes += Number(conversoes[3]);
  if (conversoes[4]) tConversoes += Number(conversoes[4]);
  const dataGrafic = {
    labels: ['sem-1', 'sem-2', 'sem-3', 'sem-4', 'sem-5'],
    datasets: [
      {
        label: '+ 18',
        data: adultos,
        fill: false,
        backgroundColor: '#283593',
        borderColor: '#1a237e',
        yAxisID: 'y-axis-1',
      },
      {
        label: '+ 12',
        data: adolecentes,
        fill: false,
        backgroundColor: '#e040fb',
        borderColor: '#e040fb',
        yAxisID: 'y-axis-1',
      },

      {
        label: 'Crianças',
        data: crianças,
        fill: false,
        backgroundColor: '#388e3c',
        borderColor: '#43a047',
        yAxisID: 'y-axis-1',
      },
    ],
  };
  const dataGrafic2 = {
    title: {
      display: true,
      text: 'Total de Presentes do Mês',
    },
    legend: {
      position: 'left',
      display: true,
    },
    labels: ['Adultos', 'Adolecentes', 'Crianças', 'Visitantes', 'Conversões'],
    datasets: [
      {
        label: 'Ofertas do Mês',
        data: [tAdultos, tAdolecentes, tCrianças, tVisitantes, tConversoes],
        backgroundColor: [
          '#283593',
          '#e040fb',
          '#388e3c',
          '#ff9800',
          '#ffff00',
        ],
        borderColor: ['#1a237e', '#e040fb', '#43a047', '#ffa726', '#c0ca33'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
      ],
    },
  };
  return (
    <>
      {tipo === 'linhas' ? <Line data={dataGrafic} options={options} /> : null}
      {tipo === 'barras' ? <Bar data={dataGrafic} options={options} /> : null}
      {tipo === 'acumulados' ? (
        <Pie data={dataGrafic2} options={dataGrafic2} />
      ) : null}
    </>
  );
}

export default Graficos;