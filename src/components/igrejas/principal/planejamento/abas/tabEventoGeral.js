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
import { MdEdit, MdDeleteForever, MdScreenSearchDesktop } from 'react-icons/md';
// import ConvData2 from 'src/utils/convData2';
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
  tipo,
  editar,
  setOpenNovoEventoGeral,
  celulas,
  // distritos,
  // coordenacoes,
  // supervisoes,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const listaCelulasC = celulas.filter(
    (val) =>
      val.Distrito === Number(perfilUser.Distrito) &&
      val.Coordenacao === Number(perfilUser.Coordenacao),
  );
  const listaCelulasS = celulas.filter(
    (val) =>
      val.Distrito === Number(perfilUser.Distrito) &&
      val.Coordenacao === Number(perfilUser.Coordenacao) &&
      val.Supervisao === Number(perfilUser.Supervisao),
  );

  const [eventoEncontrado, setEventoEncontrado] = React.useState([]);
  const [rel, setRel] = React.useState('nada');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [idDeletar, setIdDeletar] = React.useState('');

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas

  const url1 = `/api/consultaEventos/${Mes}/${Ano}`;
  const url2 = `/api/consultaPlanejamentoEventos/${Mes}/${Ano}`;
  const { data: sem1, errorSem1, mutate } = useSWR(url1, fetcher);
  const { data: sem2 } = useSWR(url2, fetcher);
  React.useEffect(() => {
    setRel('nada');
    setEventoEncontrado([]);
    let listaEveSuper = 0;

    if (sem1) {
      setRel(sem1);
      if (sem1 && sem1.length && sem1[0].Data) {
        if (tipo === 'Supervisao') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === 'Supervisor' &&
              Number(val.Numero) === Number(perfilUser.Supervisao),
          );
        }
        if (tipo === 'Coordenacao') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === 'Coordenador' &&
              Number(val.Numero) === Number(perfilUser.Coordenacao),
          );
        }
        if (tipo === 'Distrito') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === 'PastorDistrito' &&
              Number(val.Numero) === Number(perfilUser.Distrito),
          );
        }
        if (tipo === 'Igreja') {
          listaEveSuper = sem1.filter((val) => Number(val.Numero) === 0);
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
  }, [sem1, Mes, setSendResumo, tipo]);

  React.useEffect(() => {
    if (tipo === 'Célula') {
      setRel('nada');
      if (sem2) {
        setRel(sem2);
        setEventoEncontrado([]);
        let listaEveSuper = 0;

        if (sem2 && sem2.length && sem2[0].Data) {
          if (
            perfilUser.Funcao === 'Presidente' ||
            perfilUser.Funcao === 'Presidente'
          )
            listaEveSuper = sem2.filter((val) => val);
          if (perfilUser.Funcao === 'PastorDistrito')
            listaEveSuper = sem2.filter(
              (val) => Number(perfilUser.Distrito) === val.Distrito,
            );

          if (perfilUser.Funcao === 'Coordenador') {
            const newArray = [];
            listaCelulasC.map((valCelula) => {
              sem2.map((val) => {
                if (
                  Number(perfilUser.Distrito) === val.Distrito &&
                  val.Celula === valCelula.Celula
                ) {
                  newArray.push(val);
                }
                return 0;
              });

              return 0;
            });

            listaEveSuper = newArray;
          }

          if (perfilUser.Funcao === 'Supervisor') {
            const newArray = [];
            listaCelulasS.map((valCelula) => {
              sem2.map((val) => {
                if (
                  Number(perfilUser.Distrito) === val.Distrito &&
                  val.Celula === valCelula.Celula
                ) {
                  newArray.push(val);
                }
                return 0;
              });

              return 0;
            });
            listaEveSuper = newArray;
          }
          if (
            perfilUser.Funcao === 'Membro' ||
            perfilUser.Funcao === 'Professor'
          ) {
            listaEveSuper = sem2.filter(
              (val) =>
                Number(perfilUser.Distrito) === val.Distrito &&
                Number(perfilUser.Celula) === val.Celula,
            );
          }

          if (listaEveSuper && listaEveSuper.length) {
            const listaEventosSetor = listaEveSuper.sort((a, b) => {
              if (new Date(a.Data) > new Date(b.Data)) return 1;
              if (new Date(b.Data) > new Date(a.Data)) return -1;
              return 0;
            });

            if (listaEventosSetor.length)
              setEventoEncontrado(listaEventosSetor);
          }
        }
      }
    }
    return 0;
  }, [sem2, Mes, setSendResumo, tipo]);
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
          if (editar) setOpenNovoEventoGeral(true);
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
      {rel !== 'nada' ? (
        <TableContainer sx={{ height: '100%' }}>
          {eventoEncontrado && Object.keys(eventoEncontrado).length > 0 ? (
            <Box height="100%">
              {eventoEncontrado.map((row, index) => (
                <Box
                  height="20%"
                  display="flex"
                  alignItems="center"
                  key={index}
                >
                  <Box height="20%" />
                  <Box
                    display="flex"
                    height="80%"
                    width="100%"
                    alignItems="center"
                    fontFamily="Fugaz One"
                  >
                    <Box
                      fontSize="20px"
                      maxWidth={80}
                      sx={{
                        width: '20%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        bgcolor={corIgreja.secundaria}
                        color={corIgreja.principal}
                        borderRadius={100}
                        width="20vw"
                        height="19vw"
                        minHeight={60}
                        minWidth={60}
                        maxHeight={80}
                        maxWidth={80}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box>
                          <Box fontSize="16px" textAlign="center">
                            {eventoEncontrado[0] ? (
                              <Box>
                                {new Date(row.Data).getDate() < 10
                                  ? `0${new Date(row.Data).getDate()}`
                                  : new Date(row.Data).getDate()}
                              </Box>
                            ) : (
                              ''
                            )}
                          </Box>
                          <Box mt={-1}>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                setDadosEvento(eventoEncontrado[index]);
                                setSendResumo(true);
                                if (editar) setOpenNovoEventoGeral(true);
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                {!editar ? (
                                  <MdScreenSearchDesktop
                                    size={25}
                                    color="green"
                                  />
                                ) : (
                                  <MdEdit size={25} color="green" />
                                )}
                              </SvgIcon>
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box width="5%" />
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="white"
                      width={editar ? '60%' : '72%'}
                      height="100%"
                    >
                      <Box width="100%">
                        <Box fontFamily="Fugaz One">
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs3">
                              {row.Evento ? row.Evento : ''}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box mt={0.2} fontFamily="Rubik">
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              <Box display="flex">
                                <Box color={corIgreja.textoP}>Local:</Box>
                                <Box ml={1}>{row.Local ? row.Local : ''}</Box>
                              </Box>
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box fontFamily="Rubik">
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              <Box display="flex">
                                <Box color={corIgreja.textoP}>Horário:</Box>
                                <Box ml={1}>
                                  {row.Horario ? row.Horario : ''}
                                </Box>
                              </Box>
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box fontFamily="Rubik">
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              <Box display="flex">
                                <Box color={corIgreja.textoP}>
                                  {tipo !== 'Célula' ? 'Respon.' : 'Célula'}:
                                </Box>
                                {tipo !== 'Célula' ? (
                                  <Box ml={1}>
                                    {row.Responsavel ? row.Responsavel : ''}
                                  </Box>
                                ) : (
                                  <Box ml={1}>
                                    {row.Celula ? row.Celula : ''}
                                  </Box>
                                )}
                              </Box>
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box display={editar ? 'flex' : 'none'} width="2%" />
                    <Box
                      color="white"
                      display={editar ? 'flex' : 'none'}
                      justifyContent="end"
                      alignItems="center"
                      width="10%"
                      height="100%"
                      onClick={() => handleDelete(row)}
                    >
                      <MdDeleteForever color="white" size={30} />
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
              color="white"
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
              color="white"
            >
              Buscando Dados
            </Box>
            <Oval stroke="white" width={50} height={50} />
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
