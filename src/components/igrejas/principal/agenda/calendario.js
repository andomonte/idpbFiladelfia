import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';

import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import Meses from 'src/utils/meses';
import TabCalendario from './abas/tabCalendario';

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

function PlanMembro({ perfilUser, rolMembros }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual + 1) contAnoAtual = anoAtual + 1;
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
      if (anoAtual + 1 !== contAno) {
        contMesAtual = 0;
      } else contMesAtual = 11;
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
                    <Grid item xs={12}>
                      <Paper width="100%" className={classes.paper}>
                        <Box width="100%" display="flex">
                          <Box
                            width="10%"
                            display="flex"
                            justifyContent="flex-start"
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
                            width="80%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontFamily="Fugaz One"
                            fontSize="18px"
                            color="black"
                          >
                            {mes[contMes].descricao.toLocaleUpperCase()} /{' '}
                            {contAno}
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
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              height="80%"
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
              width="100%"
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
                    color: '#ffff',
                    fontFamily: 'Fugaz One',
                    fontSize: '16px',
                  }}
                >
                  CALENDÁRIO DE EVENTOS
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabCalendario
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                    rolMembros={rolMembros}
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
