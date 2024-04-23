import * as React from 'react';
import { Box, Button } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';
import useSWR from 'swr';
import axios from 'axios';
import Emojis from 'src/components/icones/emojis';
import ConverteData2 from 'src/utils/convData2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Pontuacao from './pontuacao';
import Graficos from './graficos';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  '@media (min-width:400px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};
export default function TabCelula({
  pontos,
  celula,
  setOpenPontuacao,
  perfilUser,
  parametros,
  supervisoes,
  coordenacoes,
  distritos,
  dataEnviada,
  celulaEnviada,
  semanaEnviada,
  ano,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  let semanaAnterior = pontos.Semana;

  for (let i = 1; i < 4; i += 1) {
    semanaAnterior -= 1;
    if (semanaAnterior < 0) {
      semanaAnterior = 52;
    }
  }
  const [qytCelulas, setQytCelulas] = React.useState([]);
  const [percentualPontos, setPercentualPontos] = React.useState([]);
  const [pontosMes, setPontosMes] = React.useState([]);
  const url2 = `/api/consultaPontuacaoSemanaAno4/${semanaEnviada + 1}/${
    celula.Celula
  }/${ano}`;
  const { data: pontosAnt, error: errorPontosAnt } = useSWR(url2, fetcher);

  const url1 = `/api/consultaPontuacaoSemanaAno1/${pontos.Semana}/${pontos.Ano}`;
  const { data: pontosAtual, error: errorPontosAtual } = useSWR(url1, fetcher);

  React.useEffect(() => {
    if (errorPontosAnt) return <div>An error occured.</div>;
    if (!pontosAnt) return <div>Loading ...</div>;
    if (pontosAnt) {
      const pontosCelula = pontosAnt?.filter(
        (val) =>
          Number(val.Celula) === Number(celula.Celula) &&
          Number(val.Distrito) === Number(celula.Distrito),
      );

      setPontosMes(pontosCelula);
      //  const pontosTotal = pontosCelula.reduce((prev) => prev.TotalRank);
      const total = Number(
        pontosCelula.reduce((a, b) => Number(a) + Number(b.Total), 0) /
          pontosCelula.length,
      ).toFixed(2);

      const mediaCrescimento = parseFloat(
        (100 * (pontos.Total - total)) / total,
      ).toFixed(2);
      setPercentualPontos(mediaCrescimento);
    }
    return 0;
  }, [pontosAnt]);

  React.useEffect(() => {
    if (errorPontosAtual) return <div>An error occured.</div>;
    if (!pontosAtual) return <div>Loading ...</div>;
    if (pontosAtual) {
      /* const pontosCelula = pontosAtual?.filter(
        (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
      ); */

      setQytCelulas(pontosAtual.length);
      //  const pontosTotal = pontosCelula.reduce((prev) => prev.TotalRank);
    }
    return 0;
  }, [pontosAtual]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal}
      height="calc(100vh)"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        width="94%"
        height="96%"
        bgcolor="white"
      >
        <Box height="100%">
          <Box
            height="50%"
            fontFamily="Fugaz One"
            color="green"
            fontSize="16px"
            width="90vw"
            textAlign="center"
          >
            {' '}
            <ThemeProvider theme={theme}>
              <Typography variant="hs4">
                <Box
                  mt={1}
                  height="7%"
                  display="flex"
                  justifyContent="center"
                  alignItems="end"
                  fontFamily="Fugaz One"
                  color="green"
                  width="100%"
                >
                  <Box> PONTUAÇÃO DA</Box>{' '}
                  <Box ml={1}>CÉLULA - {celula.Celula}</Box>
                  <Box color="blue" ml={2}>
                    {ConverteData2(celula.Data)}
                  </Box>
                </Box>
              </Typography>
            </ThemeProvider>
            <Box height="93%" width="100%" fontSize="13px" color="black">
              <TableContainer sx={{ width: '100%', height: '42vh' }}>
                <Pontuacao
                  supervisao={supervisoes}
                  parametros={parametros}
                  perfilUser={perfilUser}
                  dataEnviada={dataEnviada}
                  celulaEnviada={celulaEnviada}
                  pontos={pontos}
                />
              </TableContainer>
            </Box>
          </Box>
          <Box mt={0} height="40%" width="100%">
            <TableContainer
              sx={{ background: 'white', width: '100%', height: '90%' }}
            >
              {pontosMes.length ? (
                <Graficos
                  supervisao={supervisoes}
                  parametros={parametros}
                  perfilUser={perfilUser}
                  coordenacao={coordenacoes}
                  distrito={distritos}
                  dataEnviada={dataEnviada}
                  celulaEnviada={celulaEnviada}
                  pontos={pontos}
                  pontosMes={pontosMes}
                />
              ) : null}
              <Box height="100%" mt={0} fontFamily="Fugaz One">
                <Box height="100%" width="100%">
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    color={corIgreja.iconeOn}
                    fontFamily="arial black"
                    fontSize="20px"
                  >
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      fontFamily="arial black"
                      fontSize="14px"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <Box width="100%" textAlign="center">
                          <Box mt={2} color={corIgreja.principal}>
                            RANKING ENTRE {qytCelulas} CÉLULAS
                          </Box>

                          <Box
                            mt={0}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            color={corIgreja.principal}
                            fontFamily="arial black"
                            fontSize="12px"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="90%"
                              bgcolor="#e5e6b8"
                              height="10vh"
                              border="1px solid"
                              borderColor="text.primary"
                            >
                              <Box
                                sx={{ fontSize: '12px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                  borderBottom="1px solid"
                                  borderColor="text.primary"
                                >
                                  PONTOS
                                </Box>
                                <Box
                                  fontSize="16px"
                                  fontFamily="arial black"
                                  color="#000"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                >
                                  {pontos.TotalRank && pontos.TotalRank} pts
                                </Box>
                              </Box>
                              <Box
                                sx={{ fontSize: '12px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                borderLeft="1px solid"
                                borderColor="text.primary"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  borderBottom="1px solid"
                                  borderColor="text.primary"
                                  justifyContent="center"
                                  width="100%"
                                  fontFamily="arial black"
                                  height="100%"
                                >
                                  POSIÇÃO
                                </Box>
                                <Box
                                  fontFamily="arial black"
                                  color="#000"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                  fontSize="16px"
                                >
                                  {pontos.Posicao}º
                                </Box>
                              </Box>
                            </Box>
                          </Box>

                          <Box mt={2} color={corIgreja.principal}>
                            MEU CRESCIMENTO
                          </Box>

                          <Box
                            mt={0}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            height="10vh"
                            color={corIgreja.principal}
                            fontFamily="arial black"
                            fontSize="14px"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="90%"
                              bgcolor="#e5e6b8"
                              height="100%"
                              border="1px solid"
                              borderColor="text.primary"
                            >
                              <Box
                                sx={{ fontSize: '12px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                  borderBottom="1px solid"
                                  borderColor="text.primary"
                                >
                                  PERCENTUAL
                                </Box>
                                <Box
                                  fontFamily="arial black"
                                  color="#000"
                                  display="flex"
                                  fontSize="16px"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                >
                                  {percentualPontos && percentualPontos} %
                                </Box>
                              </Box>
                              <Box
                                sx={{ fontSize: '12px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                borderLeft="1px solid"
                                borderColor="text.primary"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  borderBottom="1px solid"
                                  borderColor="text.primary"
                                  justifyContent="center"
                                  width="100%"
                                  fontFamily="arial black"
                                  height="100%"
                                >
                                  STATUS
                                </Box>
                                <Box
                                  fontFamily="arial black"
                                  color="#000"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                >
                                  <Box
                                    fontFamily="arial black"
                                    color="#000"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="100%"
                                    height="100%"
                                  >
                                    {percentualPontos &&
                                    percentualPontos > 0 ? (
                                      <Emojis tipo="alegre" />
                                    ) : (
                                      <Box>
                                        {!percentualPontos ? (
                                          <Emojis tipo="igual" />
                                        ) : (
                                          <Emojis tipo="triste" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TableContainer>
          </Box>
          <Box
            height="5%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                style={{
                  width: '80%',
                  fontFamily: 'Fugaz One',
                  borderRadius: 10,
                  background: 'blue',
                  color: 'white',
                }}
                onClick={() => {
                  setOpenPontuacao(false);
                }}
              >
                FECHAR
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
