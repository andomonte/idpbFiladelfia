import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button } from '@material-ui/core';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
import { MdScreenSearchDesktop } from 'react-icons/md';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
  fontSize: '14px',
  '@media (min-width:350px)': {
    fontSize: '15px',
  },
  '@media (min-width:400px)': {
    fontSize: '16px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
  },
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const fetcher = (url) => axios.get(url).then((res) => res.data);

function createListaEventos(Dia, Quem, Numero) {
  return {
    Dia,
    Quem,
    Numero,
  };
}
function createListaE(
  Ano,
  Data,
  Distrito,
  Evento,
  Funcao,
  Horario,
  Local,
  Mes,
  Numero,
  Objetivo,
  Publico,
  id,
  Responsavel,
  ordenar,
) {
  return {
    Ano,
    Data,
    Distrito,
    Evento,
    Funcao,
    Horario,
    Local,
    Mes,
    Numero,
    Objetivo,
    Publico,
    id,
    Responsavel,
    ordenar,
  };
}
function compare2(a) {
  const horarioA =
    Number(a.Horario.slice(0, 2)) + Number(a.Horario.slice(3, 5)) / 60;

  return horarioA;
}

export default function TabCelula({
  Mes,
  Ano,
  distritos,
  coordenacoes,
  supervisoes,
}) {
  // const dados = nomesCelulas?.map((row) => createData(row.Nome, true));

  const [openShowPlan, setOpenShowPlan] = React.useState(false);
  const [eventoPlanejado, setEventoPlanejado] = React.useState('inicio');
  const [eventoPlanejadoParcial, setEventoPlanejadoParcial] =
    React.useState('inicio');
  const [listaEventos, setListaEventos] = React.useState('inicio');

  const [mostrarEvento, setMostrarEvento] = React.useState(false);
  const [eventoOrdenado, setEventoOrdenado] = React.useState(false);

  const url1 = `/api/consultaEventos/${Mes}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    mutate(url1);
    setEventoPlanejado('inicio');
    setListaEventos('inicio');
  }, [Mes]);

  const handleShow = (index) => {
    const diaParcial = Number(eventoPlanejado[index].Dia);
    const diaMostrado = listaEventos?.filter(
      (val) => Number(val.Data.slice(8, 10)) === Number(diaParcial),
    );
    setOpenShowPlan(true);
    setMostrarEvento(diaMostrado);
  };

  React.useEffect(() => {
    if (mostrarEvento) {
      const newArray = [];
      mostrarEvento?.map((val) => {
        newArray.push(
          createListaE(
            val.Ano,
            val.Data,
            val.Distrito,
            val.Evento,
            val.Funcao,
            val.Horario,
            val.Local,
            val.Mes,
            val.Numero,
            val.Objetivo,
            val.Publico,
            val.id,
            val.Responsavel,
            compare2(val),
          ),
        );
        return 0;
      });

      setEventoOrdenado(
        newArray?.sort((a, b) => {
          if (Number(a.ordenar) > Number(b.ordenar)) return 1;
          if (Number(b.ordenar) > Number(a.ordenar)) return -1;
          return 0;
        }),
      );
    }
  }, [mostrarEvento]);

  //= ========================================================================

  const bodyShowPlan = (
    <Box
      height="100vh"
      width="100%"
      minWidth={300}
      minHeight={480}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={corIgreja.principal}
    >
      <Box
        mt={2}
        height="100%"
        width="94%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
        sx={{
          borderRadius: '10px',
        }}
      >
        {eventoOrdenado && (
          <Box
            height="90vh"
            width="96%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <TableContainer sx={{ height: '100%' }}>
              {eventoOrdenado?.map((row, index) => (
                <Box
                  mt={3}
                  //            bgcolor={Object.keys(respostas).length && respostas[index]}
                  display="flex"
                  alignItems="center"
                  key={index}
                  color="white"
                >
                  <Box ml={0} display="flex" alignItems="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius={16}
                      alt="User"
                      sx={{
                        width: '20vw',
                        maxWidth: 100,
                        height: '15vw',
                        maxHeight: 150,
                        background: '#f0f0f0',
                      }}
                    >
                      <Box>
                        <Box
                          textAlign="center"
                          color={corIgreja.principal}
                          fontFamily="arial"
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs2">Dia</Typography>
                          </ThemeProvider>
                        </Box>
                        <Box
                          textAlign="center"
                          color={corIgreja.principal}
                          fontFamily="arial black"
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs2">
                              {row.Data ? row.Data.substring(8, 10) : ''}
                            </Typography>
                          </ThemeProvider>
                        </Box>

                        <Box
                          textAlign="center"
                          color={corIgreja.principal}
                          fontFamily="arial"
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs3">Hora</Typography>
                          </ThemeProvider>
                        </Box>
                        <Box
                          mt={0}
                          fontFamily="arial black"
                          color={corIgreja.principal2}
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs3">
                              {row.Horario ? row.Horario : ''}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box ml={1} height="100%">
                    <Box mt={0} ml={0}>
                      <Box display="flex">
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">
                            <Box>
                              <Box display="flex">
                                <Box display="flex" color="#f0f0f0">
                                  <Box mt={0.2} fontFamily="Fugaz One">
                                    {row.Evento
                                      ? row.Evento.toLocaleUpperCase()
                                      : null}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box ml={0} display="flex">
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">
                            <Box>
                              <Box display="flex">
                                <Box
                                  mt={0.5}
                                  ml={0}
                                  fontSize={10}
                                  fontFamily="Fugaz One"
                                  color={corIgreja.texto2}
                                >
                                  LOCAL:
                                </Box>
                                <Box display="flex" color="#f0f0f0">
                                  <Box ml={1} mt={0.2} fontFamily="Fugaz One">
                                    {row.Local.toLocaleUpperCase()}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box ml={0} display="flex">
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">
                            <Box>
                              <Box display="flex">
                                <Box
                                  mt={0.5}
                                  ml={0}
                                  fontSize={10}
                                  fontFamily="Fugaz One"
                                  color={corIgreja.texto2}
                                >
                                  PÚBLICO:
                                </Box>
                                <Box
                                  display={
                                    row.Publico === 'Distrito' ? 'flex' : 'none'
                                  }
                                  color="#f0f0f0"
                                >
                                  <Box ml={1} mt={0.2} fontFamily="Fugaz One">
                                    {row.Publico !== 'Igreja' ? (
                                      <Box ml={0} fontFamily="Fugaz One">
                                        {distritos?.filter(
                                          (valD) =>
                                            valD.Distrito === row.Numero,
                                        ).length
                                          ? distritos
                                              .filter(
                                                (valD) =>
                                                  valD.Distrito === row.Numero,
                                              )[0]
                                              .Distrito_Nome.toLocaleUpperCase()
                                          : row.Publico.toLocaleUpperCase()}
                                      </Box>
                                    ) : (
                                      row.Publico.toLocaleUpperCase()
                                    )}
                                  </Box>
                                </Box>
                                <Box
                                  display={
                                    row.Publico === 'Coordenação'
                                      ? 'flex'
                                      : 'none'
                                  }
                                  color="#f0f0f0"
                                >
                                  <Box ml={1} mt={0.2} fontFamily="Fugaz One">
                                    {row.Publico !== 'Igreja' ? (
                                      <Box ml={0} fontFamily="Fugaz One">
                                        {coordenacoes?.filter(
                                          (valD) =>
                                            valD.Coordenacao === row.Numero,
                                        ).length
                                          ? coordenacoes
                                              ?.filter(
                                                (valD) =>
                                                  valD.Coordenacao ===
                                                  row.Numero,
                                              )[0]
                                              .Coordenacao_Nome.toLocaleUpperCase()
                                          : row.Publico.toLocaleUpperCase()}
                                      </Box>
                                    ) : (
                                      row.Publico.toLocaleUpperCase()
                                    )}
                                  </Box>
                                </Box>

                                <Box
                                  display={
                                    row.Publico === 'Supervisão'
                                      ? 'flex'
                                      : 'none'
                                  }
                                  color="#f0f0f0"
                                >
                                  <Box ml={1} mt={0.2} fontFamily="Fugaz One">
                                    {row.Publico !== 'Igreja' ? (
                                      <Box ml={0} fontFamily="Fugaz One">
                                        {supervisoes?.filter(
                                          (valD) =>
                                            valD.Supervisao === row.Numero,
                                        ).length
                                          ? supervisoes
                                              ?.filter(
                                                (valD) =>
                                                  valD.Supervisao ===
                                                  row.Numero,
                                              )[0]
                                              .Supervisao_Nome.toLocaleUpperCase()
                                          : row.Publico.toLocaleUpperCase()}
                                      </Box>
                                    ) : (
                                      row.Publico.toLocaleUpperCase()
                                    )}
                                  </Box>
                                </Box>

                                <Box
                                  ml={1}
                                  mt={0.2}
                                  display={
                                    row.Publico === 'Igreja' ? 'flex' : 'none'
                                  }
                                  color="#f0f0f0"
                                >
                                  {row.Publico.toLocaleUpperCase()}
                                </Box>
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>

                      <Box ml={0} display="flex">
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">
                            <Box>
                              <Box display="flex">
                                <Box
                                  mt={0.5}
                                  ml={0}
                                  fontSize={10}
                                  fontFamily="Fugaz One"
                                  color={corIgreja.texto2}
                                >
                                  RESP.:
                                </Box>

                                <Box display="flex" color="#f0f0f0">
                                  <Box ml={1} mt={0.2} fontFamily="Fugaz One">
                                    {row.Responsavel
                                      ? row.Responsavel.toLocaleUpperCase()
                                      : ''}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </TableContainer>
          </Box>
        )}
      </Box>
      <Button
        style={{
          background: corIgreja.button2,
          color: 'white',
          marginTop: 20,
          width: '80%',
          marginBottom: 20,
        }}
        onClick={() => setOpenShowPlan(false)}
        variant="contained"
        severity="success"
      >
        VOLTAR
      </Button>
    </Box>
  );

  const calendario = [];

  const primerioDia = new Date(Number(Ano), Number(Mes), 1).getDay();
  const ultimoDia = new Date(Number(Ano), Number(Mes) + 1, 0).getDate();
  //  const diaAnterior = new Date(Number(Ano), Number(Mes), 0).getDate();
  calendario[primerioDia] = 1;

  // preenche tudo até o primeiro dia
  for (let i = 0; i < primerioDia; i += 1) {
    calendario[primerioDia - i - 1] = '';
  }
  let contDias = primerioDia + 1;

  // preenche tudo apartir do primerio dia até o ultimo dia
  for (let i = 2; i <= ultimoDia; i += 1) {
    calendario[contDias] = i;
    contDias += 1;
  }
  // completa o calendário com dias do mes seguinte

  for (let i = contDias; i < 35; i += 1) {
    if (contDias >= ultimoDia) contDias = 1;
    calendario[i] = ''; // contDias;
    contDias += 1;
  }
  React.useEffect(() => {
    const eventoParcial = calendario?.map((row) =>
      createListaEventos(row.Dia, '-', '-'),
    );
    setEventoPlanejadoParcial(eventoParcial);
  }, [Mes]);
  React.useEffect(() => {
    if (sem1) {
      if (sem1.length) setListaEventos(sem1);
      else setListaEventos([]);
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);
  React.useEffect(() => {
    setEventoPlanejado('inicio');
    if (listaEventos !== 'inicio') {
      let diaP = 0;
      let dia = '-';
      const eventosParcial = eventoPlanejadoParcial;

      for (let i = 0; i < listaEventos.length; i += 1) {
        if (listaEventos && listaEventos[i]) {
          diaP = listaEventos[i].Data.slice(8, 10);
          dia = Number(diaP.slice(0, 2));
        } else dia = '-';

        for (let j = 0; j < calendario.length; j += 1) {
          if (Number(calendario[j]) === Number(dia)) {
            eventosParcial[j] = createListaEventos(dia, 'tem', 'tem');
          } else if (eventosParcial[j].Quem !== 'tem')
            eventosParcial[j] = createListaEventos(calendario[j], '-', '-');
        }
      }

      setEventoPlanejado(eventosParcial);
    }
  }, [listaEventos]);

  const handleNovo = () => {};

  return (
    <Box height="100%">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="15%"
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
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          DOM
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          SEG
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          TER
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          QUA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          QUI
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          SEX
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="14%"
        >
          SAB
        </Box>
      </Box>

      {listaEventos !== 'inicio' ? (
        <Box height="85%">
          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[0]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[0].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(0);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(0);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[1]}
              </Box>

              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[1].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(1);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(1);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[2]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[2].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(2);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(2);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[3]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[3].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(3);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(3);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[4]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[4].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(4);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(4);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[5]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[5].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(5);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(5);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[6]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[6].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(6);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(6);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[0 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[0 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(0 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(0 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[1 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[1 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(1 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(1 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[2 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[2 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(2 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(2 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[3 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[3 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(3 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(3 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[4 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[4 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(4 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(4 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[5 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[5 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(5 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(5 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[6 + 7]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[6 + 7].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(6 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(6 + 7);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[0 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[0 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(0 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(0 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[1 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[1 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(1 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(1 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[2 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[2 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(2 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(2 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[3 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[3 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(3 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(3 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[4 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[4 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(4 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(4 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[5 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[5 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(5 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(5 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[6 + 14]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[6 + 14].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(6 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(6 + 14);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[0 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[0 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(0 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(0 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[1 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[1 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(1 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(1 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[2 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[2 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(2 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(2 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[3 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[3 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(3 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(3 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[4 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[4 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(4 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(4 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[5 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[5 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(5 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(5 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[6 + 21]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[6 + 21].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(6 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(6 + 21);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              fontFamily: 'arial black',

              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[0 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[0 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(0 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(0 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[1 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[1 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(1 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(1 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[2 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[2 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(2 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(2 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[3 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[3 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(3 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(3 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[4 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[4 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(4 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(4 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[5 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[5 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(5 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(5 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              textAlign="center"
              width="14%"
            >
              <Box mt={1} ml={0} width="100%" fontSize="12px">
                {calendario[6 + 28]}
              </Box>
              <Box mt={-1} width="100%">
                {eventoPlanejado !== 'inicio' &&
                eventoPlanejado[6 + 28].Quem !== '-' ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleShow(6 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="blue" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleNovo(6 + 28);
                    }}
                  >
                    <MdScreenSearchDesktop size={25} color="#e0e0e0" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          height="40vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Buscando os Eventos...
        </Box>
      )}

      <Dialog fullScreen open={openShowPlan} TransitionComponent={Transition}>
        {bodyShowPlan}
      </Dialog>
    </Box>
  );
}
