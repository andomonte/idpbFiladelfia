import * as React from 'react';
import { Box } from '@material-ui/core';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
// import { Oval } from 'react-loading-icons';
import ConverteData from 'src/utils/convData2';
import TableContainer from '@mui/material/TableContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const theme = createTheme();
theme.typography.hs4 = {
  fontSize: '8px',
  '@media (min-width:360px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '11px',
  },
  '@media (min-width:500px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};
theme.typography.hs3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [entradas, setEntradas] = React.useState([]);

  const rolMembros = perfilUser.RolMembro;
  const url = `/api/consultaContribuicoes/1/${Ano}/${Mes}/${rolMembros}`;
  const { data: contribuicoes, errorContribuicoes } = useSWR(url, fetcher);

  React.useEffect(() => {
    setEntradas(contribuicoes);

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
          width="20%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs2">DATA</Typography>
          </ThemeProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="50%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          {' '}
          <ThemeProvider theme={theme}>
            <Typography variant="hs2">Descrição</Typography>
          </ThemeProvider>
        </Box>

        <Box textAlign="center" width="30%">
          <ThemeProvider theme={theme}>
            <Typography variant="hs2">VALOR</Typography>
          </ThemeProvider>
        </Box>
      </Box>

      <TableContainer sx={{ minHeight: 320, height: '85%' }}>
        {entradas && entradas.length ? (
          <Box width="100%" height="100%" fontSize="12px">
            {entradas.map((row, index) => (
              <Box
                key={index}
                borderBottom={
                  index < entradas.length ? '1px solid #000' : '0px solid #000'
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
                  width="20%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  {' '}
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs4">
                      {row.LANC_DATA ? ConverteData(row.LANC_DATA) : '-'}
                    </Typography>
                  </ThemeProvider>
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  width="50%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  <Box color={row.LANC_TIPO === 'Receita' ? 'black' : 'green'}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs4">
                        {row.CAT_NOME !== 'Recursos de Terceiros'
                          ? row.CAT_NOME
                          : row.LANC_DESCRICAO}
                      </Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  width="30%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  <Box>
                    {row.LANC_VALOR ? (
                      <Box>
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            <Box>
                              {Number(row.LANC_VALOR).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </Box>
                            <Box>{row.forma_pagamento}</Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>
                    ) : (
                      '-'
                    )}
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
      </TableContainer>
    </Box>
  );
}
