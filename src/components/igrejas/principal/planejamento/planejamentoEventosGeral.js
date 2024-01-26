import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { MdCreateNewFolder } from 'react-icons/md';

import Meses from 'src/utils/meses';

import NovoEventoGeral from './abas/novoEventoGeral';
import MostrarEvento from './abas/mostrarEventoGeral';
import TabEventoGeral from './abas/tabEventoGeral';

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
  fontResponsive: {
    fontSize: '3vw',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: { fontSize: '1.3vw' },
  },
  fontResponsive16: {
    fontSize: '4vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4vw',
    },
  },
}));

function PlanMembro({ perfilUser, lideranca, celulas }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [openNovoEventoGeral, setOpenNovoEventoGeral] = React.useState(false);
  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosEvento, setDadosEvento] = React.useState(false);

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
      {!openNovoEventoGeral ? (
        <Box
          width="94%"
          height="97%"
          minHeight={550}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={16}
          bgcolor={corIgreja.principal} // cor principal tela inteira
        >
          {!sendResumo ? (
            <Box height="100%" width="100%">
              <Box height="100%">
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  bgcolor={corIgreja.principal}
                  style={{
                    borderRadius: '16px',
                  }}
                >
                  <Box
                    height="20%"
                    width="100%"
                    minWidth={300}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box width="100%" ml={1}>
                      <Box ml={2} color="white">
                        Selecione o Mês
                      </Box>
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={8}>
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
                                sx={{
                                  fontSize: '14px',
                                  fontFamily: 'Fugaz One',
                                }}
                              >
                                {mes[contMes].descricao.toUpperCase()} /{' '}
                                {contAno}
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
                        <Grid item xs={4}>
                          <Button
                            style={{
                              background: '#f0f0f0',
                              width: '100%',
                              height: '100%',
                              fontSize: '12px',
                              fontFamily: 'arial black',
                            }}
                            onClick={() => setOpenNovoEventoGeral(true)}
                            variant="contained"
                            severity="success"
                            endIcon={
                              <MdCreateNewFolder size={30} color="blue" />
                            }
                          >
                            Novo
                          </Button>
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
                          fontSize: '16px',
                        }}
                      >
                        {perfilUser.Funcao === 'Supervisor' && (
                          <Box>EVENTO DO SETOR {perfilUser.Supervisao}</Box>
                        )}
                        {perfilUser.Funcao === 'Coordenador' && (
                          <Box>
                            EVENTO DA COORDENAÇÃO {perfilUser.Coordenacao}
                          </Box>
                        )}
                        {perfilUser.Funcao === 'PastorDistrito' && (
                          <Box>EVENTO DO DISTRITO {perfilUser.Distrito}</Box>
                        )}
                        {(perfilUser.Funcao === 'Presidente' ||
                          perfilUser.Funcao === 'Secretaria') && (
                          <Box>EVENTO DA IGREJA</Box>
                        )}
                      </Box>
                      <Box
                        height="85%"
                        minHeight={315}
                        bgcolor="#fafafa"
                        width="100%"
                        borderRadius={16}
                      >
                        <TabEventoGeral
                          perfilUser={perfilUser}
                          Mes={contMes}
                          Ano={contAno}
                          lideranca={lideranca}
                          setSendResumo={setSendResumo}
                          setDadosEvento={setDadosEvento}
                          celulas={celulas}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <MostrarEvento
                dadosEvento={dadosEvento}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
                celulas={celulas}
              />
            </Box>
          )}
        </Box>
      ) : (
        <NovoEventoGeral
          perfilUser={perfilUser}
          setOpenNovoEventoGeral={setOpenNovoEventoGeral}
          lideranca={lideranca}
          Mes={contMes}
          Ano={contAno}
        />
      )}
    </Box>
  );
}

export default PlanMembro;
