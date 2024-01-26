import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import TabMeusCursos from './abas/tabMeusCursos';

function RelCelula({ perfilUser }) {
  //= ================================================================
  const d = new Date();
  const anoAtual = Number(d.getFullYear());
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
        borderRadius={16}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
      >
        <Box
          height="100%"
          width="100%"
          minWidth={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
                    <Box ml={2} color="white">
                      Selecione o Ano
                    </Box>

                    <Grid item xs={12}>
                      <Paper width="100%" height={30}>
                        <Box
                          width="100%"
                          justifyContent="center"
                          display="flex"
                        >
                          <Box
                            width="10%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleDecAno();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                              <BiCaretLeft size={30} />
                            </IconButton>
                          </Box>
                          <Box
                            width="80%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {contAno}
                          </Box>
                          <Box
                            width="12%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleIncAno();
                              }}
                            >
                              <SvgIcon
                                sx={{
                                  marginRight: -9,
                                  color: corIgreja.iconeOn,
                                }}
                              />
                              <BiCaretRight size={30} />
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
              height="80%"
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
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
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  MEUS CURSOS
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabMeusCursos perfilUser={perfilUser} Ano={contAno} />
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
