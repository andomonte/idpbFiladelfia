import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import Meses from 'src/utils/mesesAbrev';

import TabCelulaSuper from './abas/tabBuscaCelulaSuper';
import TabEventosCelulaSuper from './abas/tabBuscaEventosCelulaSuper';

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

function Label({ lab1, lab2 }) {
  return (
    <>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab1}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab2}
        </Box>
      </Grid>
    </>
  );
}
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
      Number(results.Supervisao) === Number(perfilUser.Supervisao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );
  const numberCelulas = celulaSetor.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];
  const tipo = ['Planejamento das Células', 'Eventos das Células'];
  const [contTipo, setContTipo] = React.useState(0);
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

  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
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
        height="97%"
        width="100%"
        ml={1.2}
        mr={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
        bgcolor={corIgreja.principal}
      >
        <Box height="100%" width="100%" minWidth={300}>
          <Box height="100%" width="100%">
            <Box
              height="20%"
              minHeight={100}
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box width="100%" ml={1} minWidth={300}>
                <Grid container spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Label lab1="Selecione o Mês" lab2="Selecione a Celula" />
                    <Grid item xs={6}>
                      <Paper width="100%" className={classes.paper}>
                        <Box width="100%" display="flex">
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
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                              <BiCaretLeft />
                            </IconButton>
                          </Box>
                          <Box
                            width="60%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {mes[contMes].descricao} / {contAno}
                          </Box>
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
                                handleIncMes();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                              <BiCaretRight />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper width="100%" className={classes.paper}>
                        <Box width="100%" display="flex">
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
                                handleDecCelula();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                              <BiCaretLeft />
                            </IconButton>
                          </Box>
                          <Box
                            width="60%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontFamily="arial black"
                            fontSize="16px"
                          >
                            {numeroCelulas[contNumeroCelula]}
                          </Box>
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
                                handleIncCelula();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                              <BiCaretRight />
                            </IconButton>
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
                <Box mt={1} mb={2} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        height={40}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
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
                              handleDecTipo();
                            }}
                          >
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                        >
                          {tipo[contTipo]}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncTipo();
                            }}
                          >
                            <BiCaretRight
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  {contTipo === 0 ? (
                    <TabCelulaSuper
                      perfilUser={perfilUser}
                      Mes={contMes}
                      Ano={contAno}
                      numeroCelulas={numeroCelulas[contNumeroCelula]}
                    />
                  ) : (
                    <TabEventosCelulaSuper
                      perfilUser={perfilUser}
                      Mes={contMes}
                      Ano={contAno}
                      numeroCelulas={numeroCelulas[contNumeroCelula]}
                    />
                  )}
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
