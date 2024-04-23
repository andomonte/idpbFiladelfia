import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Box } from '@material-ui/core';

import Avatar from '@mui/material/Avatar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import MostrarInscritos from './mostrarInscritos';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
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
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
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
  eventos,
  nomesIgrejas,

  perfilUser,
}) {
  const [openInscritos, setOpenInscritos] = React.useState(false);
  const [eventoFinal, setEventoFinal] = React.useState('');

  return (
    <Paper
      sx={{
        background: '#f0f0f0',
        width: '100%',
        height: 'calc(100%)',
        marginTop: 0,
        overflow: 'hidden',
        borderRadius: 5,
      }}
    >
      <TableContainer sx={{ height: '100%' }}>
        {eventos.map((row, index) => (
          <Box
            mt={3}
            //            bgcolor={Object.keys(respostas).length && respostas[index]}
            display="flex"
            alignItems="center"
            key={index}
          >
            <Box
              mt={index === 0 ? 0.8 : 1.8}
              ml={0.5}
              display="flex"
              alignItems="center"
            >
              <Avatar
                alt="User"
                src={row.LogoEvento}
                sx={{
                  width: '20vw',
                  maxWidth: 100,
                  height: '20vw',
                  maxHeight: 100,
                }}
              />
            </Box>
            <Box mt={index === 0 ? 2 : 2} ml={-2} mb={index === 0 ? 1 : 0}>
              <Box mt={0} ml={2}>
                <Box fontFamily="Fugaz One" mt={0} ml={2} display="flex">
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      {row.nomeEvento
                        ? row.nomeEvento.toLocaleUpperCase()
                        : null}
                    </Typography>
                  </ThemeProvider>
                </Box>
                {row.AutorizacaoPastor ? (
                  <Box ml={2} display="flex">
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs2">
                        <Box display="flex">
                          <Box>
                            <Box display="flex">
                              <Box
                                color="#781008"
                                ml={0}
                                fontFamily="Fugaz One"
                              >
                                {'se for membro Precisa de Autorização do '.toLocaleUpperCase()}
                              </Box>
                            </Box>
                            <Box display="flex">
                              <Box
                                color="#781008"
                                ml={0}
                                fontFamily="Fugaz One"
                              >
                                {'Pastor da igreja Local'.toLocaleUpperCase()}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    </ThemeProvider>
                  </Box>
                ) : null}

                <Box
                  width="100%"
                  mt={1}
                  mb={0}
                  display="flex"
                  justifyContent="flex-start"
                  ml={0}
                >
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      <Box
                        ml={2}
                        mt={0}
                        onClick={() => {
                          setEventoFinal(row);
                          setOpenInscritos(true);
                        }}
                        style={{
                          width: '100%',
                          color: 'blue',
                          fontFamily: 'Fugaz One',
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        VER INSCRITOS
                      </Box>
                    </Typography>
                  </ThemeProvider>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </TableContainer>
      <Dialog fullScreen open={openInscritos} TransitionComponent={Transition}>
        <MostrarInscritos
          perfilUser={perfilUser}
          setOpenInscritos={setOpenInscritos}
          evento={eventoFinal}
          nomesIgrejas={nomesIgrejas}
        />
      </Dialog>
    </Paper>
  );
}
