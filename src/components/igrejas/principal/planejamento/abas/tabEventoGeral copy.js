import * as React from 'react';
import { Box, Button } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import api from 'src/components/services/api';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { MdScreenSearchDesktop, MdDeleteForever } from 'react-icons/md';
import ConvData2 from 'src/utils/convData2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@material-ui/core/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '9px',
  '@media (min-width:350px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  perfilUser,
  setSendResumo,
  setDadosEvento,
  Mes,
  Ano,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [eventoEncontrado, setEventoEncontrado] = React.useState([]);
  const [rel, setRel] = React.useState('nada');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [idDeletar, setIdDeletar] = React.useState('');
  const nomeEvento = '';

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas

  const url1 = `/api/consultaEventos/${Mes}/${Ano}`;

  const { data: sem1, errorSem1, mutate } = useSWR(url1, fetcher);

  React.useEffect(() => {
    setRel('nada');
    setEventoEncontrado([]);
    let listaEveSuper = 0;

    if (sem1) {
      setRel(sem1);
      if (sem1 && sem1.length && sem1[0].Data) {
        if (perfilUser.Funcao === 'Supervisor') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Supervisao),
          );
        }
        if (perfilUser.Funcao === 'Coordenador') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Coordenacao),
          );
        }
        if (perfilUser.Funcao === 'PastorDistrito') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Distrito),
          );
        }
        if (
          perfilUser.Funcao === 'Presidente' ||
          perfilUser.Funcao === 'Secretaria'
        ) {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Igreja),
          );
        }

        if (listaEveSuper && listaEveSuper.length) {
          const listaEventosSetor = listaEveSuper.sort((a, b) => {
            if (new Date(a.Data) > new Date(b.Data)) return 1;
            if (new Date(b.Data) > new Date(a.Data)) return -1;
            return 0;
          });
          if (listaEventosSetor.length) setEventoEncontrado(listaEventosSetor);
        }
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, Mes, setSendResumo]);

  //= ==================================================================
  const handleDelete = (row) => {
    if (row.id) {
      setOpenDialog(true);
      setIdDeletar(row.id);
    }
  };
  const handleConfirmeDelete = () => {
    api
      .post('/api/deletarEventoGeral', {
        id: idDeletar,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          toast.info('Evento Deletado !', {
            position: toast.POSITION.TOP_CENTER,
          });
          mutate(url1);
          setSendResumo(false);
          setOpenDialog(false);
        }
      })
      .catch(() => {
        toast.error('Erro ao Atualizar Dados!,tente Novamente', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };
  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontSize: '12px',
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
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
          width="20%"
        >
          DATA
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="65%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          EVENTO
        </Box>
        <Box textAlign="center" width="15%">
          VER
        </Box>
      </Box>
      {rel !== 'nada' ? (
        <TableContainer sx={{ height: '80%' }}>
          {eventoEncontrado && Object.keys(eventoEncontrado).length > 0 ? (
            <Box>
              {eventoEncontrado.map((row, index) => (
                <Box
                  mt={0}
                  display="flex"
                  alignItems="center"
                  key={row.id}
                  height={58}
                >
                  <Box
                    sx={{
                      fontFamily: 'arial black',
                      fontSize: '14px',
                      borderBottom: '1px solid #000',
                    }}
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      fontSize="14px"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="20%"
                    >
                      <ThemeProvider theme={theme}>
                        <Typography variant="hs4">
                          {eventoEncontrado[index]
                            ? ConvData2(eventoEncontrado[index].Data)
                            : '-'}
                        </Typography>
                      </ThemeProvider>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      height="100%"
                      textAlign="center"
                      width="65%"
                      sx={{
                        borderRight: '1px solid #000',
                        borderLeft: '1px solid #000',
                      }}
                    >
                      {eventoEncontrado[index] ? (
                        <Box color="blue" display="flex">
                          <Box>
                            <ThemeProvider theme={theme}>
                              <Typography variant="hs4">
                                {nomeEvento !== '' ? (
                                  <Box> {nomeEvento}</Box>
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </ThemeProvider>
                          </Box>
                        </Box>
                      ) : (
                        ''
                      )}
                      {eventoEncontrado[index].Evento ? (
                        <Box display="flex">
                          <Box
                            display="flex"
                            justifyContent="start"
                            alignItems="center"
                            height="100%"
                            color="red"
                            width="10%"
                            ml={2}
                            mr={1}
                            onClick={() => handleDelete(row)}
                          >
                            <MdDeleteForever size={20} />
                          </Box>
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              {eventoEncontrado[index].Evento.toUpperCase()}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                      alignItems="center"
                      width="15%"
                    >
                      {eventoEncontrado[index].Data ? (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            setDadosEvento(eventoEncontrado[index]);
                            setSendResumo(true);
                          }}
                        >
                          <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                            <MdScreenSearchDesktop size={25} color="green" />
                          </SvgIcon>
                        </IconButton>
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
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Sem Eventos
            </Box>
          )}
        </TableContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80%"
          textAlign="center"
          width="100%"
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={-2}
              textAlign="center"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height={50} />
          </Box>
        </Box>
      )}
      <Dialog fullScreen open={openDialog}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={0}
          width="100%"
          height="100%"
        >
          <Box
            width="100%"
            height="100%"
            mt={0}
            justifyContent="center"
            display="flex"
          >
            <Box width="100%">
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                height="100%"
              >
                <Box color="black">
                  <Box display="flex" justifyContent="center">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '16px',

                        fontWeight: 'bold',
                        fontFamily: 'arial black',
                      }}
                    >
                      ATENÇÃO !!!
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={3}
                    sx={{ fontSize: 'bold' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '15px',

                        fontWeight: 'bold',
                      }}
                    >
                      DESEJA REALMENTE DELETAR
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={0}
                    sx={{ fontSize: 'bold' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '15px',

                        fontWeight: 'bold',
                      }}
                    >
                      ESSE EVENTO
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={0}
                    sx={{ fontSize: 'bold' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '15px',

                        fontWeight: 'bold',
                      }}
                    >
                      SE SIM, PRESSIONE DELETE
                    </Typography>
                  </Box>

                  <Box mt={5} display="flex" justifyContent="center">
                    <Box
                      mt={0}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        variant="contained"
                        id="reload"
                        onClick={() => {
                          setOpenDialog(false);
                        }}
                        style={{
                          fontFamily: 'Fugaz One',
                          background: 'blue',
                          color: 'white',
                          width: '120px',
                        }}
                      >
                        VOLTAR
                      </Button>
                    </Box>
                    <Box
                      ml={5}
                      mt={0}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        variant="contained"
                        id="reload"
                        onClick={() => {
                          setLoading(true);
                          handleConfirmeDelete();
                        }}
                        style={{
                          fontFamily: 'Fugaz One',
                          background: 'red',
                          color: 'white',
                          width: '120px',
                        }}
                      >
                        {loading ? (
                          <Box display="flex" alignItems="center">
                            <Oval stroke="white" width={30} height={30} />
                          </Box>
                        ) : (
                          'DELETAR'
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}
