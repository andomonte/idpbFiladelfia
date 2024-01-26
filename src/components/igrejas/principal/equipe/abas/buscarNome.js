import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

/* import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import moment from 'moment'; */
import Meses from 'src/utils/mesesAbrev';

import ResumoParticipacao from './tabBuscar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function RelCelula({ perfilUser }) {
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

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (Number(contAnoAtual) <= 2021) {
      contAnoAtual = 2021;
    }
    setContAno(contAnoAtual);
  };

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;
    if (
      Number(contMesAtual) >= Number(mesAtual) &&
      Number(contAno) >= Number(anoAtual)
    )
      contMesAtual = mesAtual;

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
      <Box
        height="97%"
        width="96%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height="100%"
          width="100%"
          bgcolor={corIgreja.principal}
          style={{
            borderRadius: '16px',
          }}
        >
          <Box
            height="12%"
            minWidth={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box mt={0} width="100%" ml={1} minWidth={300}>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Paper width="100%" className={classes.paper}>
                    <Box height={30} width="100%" display="flex">
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
              </Grid>
            </Box>
          </Box>
          <Box height="80%">
            <Box
              height="100%"
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              bgcolor={corIgreja.principal}
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
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {perfilUser.Nome}
                </Box>
                <Box
                  height="70%"
                  minHeight={255}
                  bgcolor="#fafafa"
                  width="100%"
                  sx={{
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                  }}
                >
                  <ResumoParticipacao
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
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

export default RelCelula;
