import * as React from 'react';
import { Box, Button } from '@material-ui/core';
// import { Oval } from 'react-loading-icons';
import ConverteData from 'src/utils/convData2';
import TableContainer from '@mui/material/TableContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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

export default function TabCelula({ entradas, setOpen }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
        }}
        height="10%"
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
      <TableContainer sx={{ minHeight: 320, height: '80%' }}>
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
                      {row.data ? ConverteData(row.data) : '-'}
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
                  <Box>
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs4">
                        {row.Nome ? row.Nome : null}
                      </Typography>
                    </ThemeProvider>
                    <Box color="#ff7043">
                      <ThemeProvider theme={theme}>
                        <Typography variant="hs4">
                          {row.NomeCategoria
                            ? row.NomeCategoria.toUpperCase()
                            : null}
                        </Typography>
                      </ThemeProvider>
                    </Box>
                    <Box color="gray">
                      <ThemeProvider theme={theme}>
                        <Typography variant="hs4">
                          {row.Descricao ? row.Descricao : null}
                        </Typography>
                      </ThemeProvider>
                    </Box>
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
                    {row.valor ? (
                      <Box>
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            <Box>
                              {Number(row.valor).toLocaleString('pt-br', {
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
      <Box
        height="10%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          style={{ width: '60%', background: '#80cbc4', color: 'black' }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Box fontFamily="Fugaz One">FECHAR</Box>
        </Button>
      </Box>
    </Box>
  );
}
