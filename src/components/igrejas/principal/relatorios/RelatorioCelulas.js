import { Box, Grid } from '@material-ui/core';
import React from 'react';

import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';

import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

/* import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import moment from 'moment'; */
import Meses from 'src/utils/meses';

import TabBuscaCelula from './abas/tabBuscaCelula';

function PlanMembro({
  perfilUser,
  rolMembros,
  visitantes,
  celulas,
  distritos,
  coordenacoes,
  supervisoes,
  parametros,
}) {
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
        <Box height="100%" width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="10%"
            width="100%"
          >
            <Box width="96%" mt={0}>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Box height={40} width="100%" display="flex">
                    <Box
                      height="100%"
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
                        <BiCaretLeft color="white" size={35} />
                      </IconButton>
                    </Box>
                    <Box
                      width="80%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="16px"
                      color="white"
                      sx={{ fontFamily: 'Fugaz One' }}
                    >
                      {mes[contMes].descricao.toLocaleUpperCase()} / {contAno}
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
                        <BiCaretRight color="white" size={35} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="90%"
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="10%"
              borderTop="2px solid #fff"
              width="100%"
              fontFamily="Fugaz One"
              fontSize="20px"
              color="white"
            >
              RELATÓRIOS DO LÍDER
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="90%"
              width="100%"
            >
              <Box width="95%" height="100%">
                <Box
                  height="96%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabBuscaCelula
                    visitantes={visitantes}
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                    rolMembros={rolMembros}
                    celulas={celulas}
                    distritos={distritos}
                    coordenacoes={coordenacoes}
                    supervisoes={supervisoes}
                    parametros={parametros}
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
