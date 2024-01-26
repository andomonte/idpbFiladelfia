import * as React from 'react';
import { Box } from '@material-ui/core';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import { Oval } from 'react-loading-icons';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function createDizimoSem1(Valor, Data, semana) {
  return {
    Valor,
    Data,
    semana,
  };
}

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [dizimo, setDizimo] = React.useState([]);
  const [oferta, setOferta] = React.useState([]);

  const semana = PegaSemana(Mes, Ano);
  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;
  const arraySemana = [semana1, semana2, semana3, semana4, semana5];
  // para usar semanas

  const rolMembros = perfilUser.RolMembro;
  const url = `/api/consultaContribuicoes/${Mes}/${rolMembros}`;
  const { data: contribuicoes, errorContribuicoes } = useSWR(url, fetcher);

  React.useEffect(() => {
    //  mutate(url);
  }, [semana]);

  React.useEffect(() => {
    setDizimo([]);
    setOferta([]);
    if (contribuicoes && contribuicoes.length) {
      const ofertaP = contribuicoes.filter(
        (val) => val.Tipo === 'OFERTA' && String(val.Ano) === String(Ano),
      );
      const dizimoP = contribuicoes.filter(
        (val) => val.Tipo === 'DIZIMO' && String(val.Ano) === String(Ano),
      );

      if (ofertaP.length) {
        for (let j = 0; j < ofertaP.length; j += 1) {
          for (let i = 0; i < 5; i += 1) {
            if (
              ofertaP[j] &&
              Number(ofertaP[j].Semana) === Number(arraySemana[i])
            ) {
              const diz1 = createDizimoSem1(
                ofertaP[j].Valor,
                ofertaP[j].Data,
                arraySemana[i],
              );
              setOferta((state) => [...state, diz1]);
            } else {
              const diz1 = createDizimoSem1('-', '-', arraySemana[j]);
              setOferta((state) => [...state, diz1]);
            }
          }
        }
      }

      if (dizimoP.length) {
        for (let j = 0; j < dizimoP.length; j += 1) {
          for (let i = 0; i < 5; i += 1) {
            if (
              dizimoP[j] &&
              Number(dizimoP[j].Semana) === Number(arraySemana[i])
            ) {
              const diz1 = createDizimoSem1(
                dizimoP[j].Valor,
                dizimoP[j].Data,
                arraySemana[i],
              );
              setDizimo((state) => [...state, diz1]);
            } else {
              const diz1 = createDizimoSem1('-', '-', arraySemana[j]);
              setDizimo((state) => [...state, diz1]);
            }
          }
        }
      }
    }
    if (errorContribuicoes) return <div>An error occured.</div>;
    if (!contribuicoes) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [contribuicoes]);

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="15%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="18%"
        >
          SEM
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="32%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          DIZIMO
        </Box>
        <Box textAlign="center" width="25%">
          OFERTA
        </Box>
      </Box>
      {oferta.length || dizimo.length ? (
        <Box width="100%" height="100%">
          {dizimo.map((row, index) => (
            <Box
              key={index}
              borderBottom={
                index + 1 < dizimo.length ? '1px solid #000' : '0px solid #000'
              }
              sx={{
                fontFamily: 'arial black',
              }}
              height="17%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="18%"
              >
                {arraySemana[index]}
              </Box>
              {dizimo.length ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="32%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  {row.Data ? row.Data : '-'}
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="32%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  <Oval stroke="blue" width={20} height={20} />
                </Box>
              )}
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                width="25%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Box>{row.Valor ? row.Valor : '-'}</Box>
              </Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                width="25%"
              >
                <Box mt={1}>
                  {oferta.length && oferta[index].Valor
                    ? oferta[index].Valor
                    : '-'}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          height="40vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Sem Registro da Secretaria
        </Box>
      )}
    </Box>
  );
}
