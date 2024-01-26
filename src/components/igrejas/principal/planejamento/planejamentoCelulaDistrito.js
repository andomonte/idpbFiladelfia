import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import Meses from 'src/utils/mesesAbrev';

import TabCelulaSuper from './abas/tabCelulaSuper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function PlanMembro({ perfilUser, lideranca }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [contNumeroCelula, setContNumeroCelula] = React.useState(0);
  const celulaSetor = lideranca.filter(
    (results) =>
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );
  const numberCelulas = celulaSetor.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];

  const [numeroCelulas] = React.useState(uniqueArr);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2022) contAnoAtual = 2022;
    setContAno(contAnoAtual);
  };
  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
  };
  const handleIncCelula = () => {
    let contCelulaAtual = contNumeroCelula + 1;

    if (contCelulaAtual > numeroCelulas.length - 1) contCelulaAtual = 0;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleDecCelula = () => {
    let contCelulaAtual = contNumeroCelula - 1;

    if (contCelulaAtual < 0) contCelulaAtual = numeroCelulas.length - 1;
    setContNumeroCelula(contCelulaAtual);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        height="97%"
        minHeight={550}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={16}
        bgcolor={corIgreja.principal} // cor principal tela inteira
      >
        <Box height="100%" width="100%" minWidth={300}>
          <Box height="100%">
            <Box
              height="20%"
              minHeight={100}
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" ml={1} minWidth={300}>
                <Grid container spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={7}>
                      <Box textAlign="center" color="white">
                        {' '}
                        Selecione o Mês{' '}
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box textAlign="center" color="white">
                        {' '}
                        Selecione a Célula{' '}
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={7}>
                      <Paper width="100%" className={classes.paper}>
                        <Box width="100%" height={40} display="flex">
                          <Box
                            width="20%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleDecMes();
                              }}
                            >
                              <BiCaretLeft
                                color={corIgreja.principal2}
                                size={35}
                              />
                            </IconButton>
                          </Box>
                          <Box
                            width="60%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="black"
                            sx={{ fontSize: '16px', fontFamily: 'Fugaz One' }}
                          >
                            {mes[contMes].descricao.toUpperCase()} / {contAno}
                          </Box>
                          <Box
                            width="20%"
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleIncMes();
                              }}
                            >
                              <BiCaretRight
                                color={corIgreja.principal2}
                                size={35}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper width="100%" className={classes.paper}>
                        <Box width="100%" display="flex" height={40}>
                          <Box
                            width="35%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <BiCaretLeft
                              color={corIgreja.principal2}
                              size={35}
                              onClick={() => {
                                handleDecCelula();
                              }}
                            />
                          </Box>
                          <Box
                            width="60%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontFamily="Fugaz One"
                            color="black"
                            fontSize="18px"
                          >
                            {numeroCelulas[contNumeroCelula]}
                          </Box>
                          <Box
                            width="35%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <BiCaretRight
                              color={corIgreja.principal2}
                              size={35}
                              onClick={() => {
                                handleIncCelula();
                              }}
                            />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              height="71vh"
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={390}
              width="100%"
              bgcolor={corIgreja.principal}
              borderTop="2px solid #fff"
            >
              <Box width="95%" height="100%">
                <Box
                  height="10%"
                  minHeight={50}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    bgcolor: corIgreja.principal,
                    color: '#ffff',
                    fontFamily: 'Fugaz One',
                    fontSize: '14px',
                  }}
                >
                  PLANEJAMENTO DAS CÉLULAS
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabCelulaSuper
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                    numeroCelulas={numeroCelulas[contNumeroCelula]}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PlanMembro;
