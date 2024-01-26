import * as React from 'react';
import { Box } from '@material-ui/core';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
// import { Oval } from 'react-loading-icons';
import ConverteData from 'src/utils/convData2';
import TableContainer from '@mui/material/TableContainer';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [entradas, setEntradas] = React.useState([]);

  const rolMembros = perfilUser.RolMembro;
  const url = `/api/consultaContribuicoes/${Ano}/${Mes}/${rolMembros}`;
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
          width="30%"
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
          width="45%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          TIPO DE CONTRIBUIÇÃO
        </Box>
        <Box textAlign="center" width="25%">
          VALOR
        </Box>
      </Box>
      <TableContainer sx={{ minHeight: 320, height: '88%' }}>
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
                  width="30%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  {row.LANC_DATA ? ConverteData(row.LANC_DATA) : '-'}
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  width="45%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
            
                  <Box>
                    {row.CAT_NOME !== 'Recursos de Terceiros'
                      ? row.CAT_NOME
                      : row.LANC_DESCRICAO}
                  </Box>
                </Box>
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
                  <Box>
                    {row.LANC_VALOR ? (
                      <Box>
                        <Box>
                          {Number(row.LANC_VALOR).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Box>
                        <Box>{row.forma_pagamento}</Box>
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
