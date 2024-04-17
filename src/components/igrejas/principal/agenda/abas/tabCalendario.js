import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button } from '@material-ui/core';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

import { MdScreenSearchDesktop } from 'react-icons/md';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ConvData2 from 'src/utils/convData2';

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
export default function TabCelula({ Mes, Ano }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [openShowPlan, setOpenShowPlan] = React.useState(false);
  const [eventoPlanejado, setEventoPlanejado] = React.useState('inicio');
  const [eventoPlanejadoParcial, setEventoPlanejadoParcial] =
    React.useState('inicio');
  const [listaEventos, setListaEventos] = React.useState('inicio');

  const [mostrarEvento, setMostrarEvento] = React.useState(false);

  const url1 = `/api/consultaEventos/${Mes}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    mutate(url1);
    setEventoPlanejado('inicio');
    setListaEventos('inicio');
  }, [Mes]);

  const handleShow = (index) => {
    const diaParcial = Number(eventoPlanejado[index].Dia);
    const diaMostrado = listaEventos.filter(
      (val) => Number(val.Data.slice(8, 10)) === Number(diaParcial),
    );
    setOpenShowPlan(true);
    setMostrarEvento(diaMostrado);
  };

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
        width="100%"
        height={50}
        justifyContent="center"
        display="flex"
        alignItems="center"
        color="white"
        fontSize="16px"
        fontFamily="arial black"
      >
        <img src={corIgreja.logo} alt="logo" height={60} />
      </Box>
      <Box
        mt={2}
        height="70%"
        width="94%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
        sx={{
          borderRadius: '10px',
        }}
      >
        {mostrarEvento && (
          <Box
            height="90vh"
            width="96%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <TableContainer sx={{ maxHeight: 410 }}>
              {mostrarEvento.map((row, index) => (
                <Box
                  width="100%"
                  key={row.id}
                  height={250}
                  bgcolor={corIgreja.principal2}
                  borderRadius={16}
                  mt={2}
                >
                  <Box
                    color="white"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial black"
                    fontSize="14px"
                  >
                    <Box
                      justifyContent="center"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      mt={2}
                    >
                      <Box>EVENTO {index + 1}</Box>
                    </Box>
                  </Box>
                  <Box
                    mt={0}
                    color="white"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial "
                    fontSize="12px"
                  >
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      mt={2}
                      ml={5}
                    >
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        color="white"
                      >
                        Data do Evento:
                      </Box>
                    </Box>
                    <Box width="100%" mt={2} mr="4vw">
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        color="white"
                      >
                        Horaário do Evento:
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    color="white"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial "
                    fontSize="12px"
                  >
                    <Box width="100%" display="flex" alignItems="center" mt={2}>
                      <Box
                        display="flex"
                        ml={5}
                        mt={-1}
                        justifyContent="flex-start"
                        color="white"
                        fontSize="16px"
                      >
                        {ConvData2(mostrarEvento[index].Data)}
                      </Box>
                    </Box>
                    <Box width="100%" mt={2} mr="8vw">
                      <Box
                        display="flex"
                        mt={-1}
                        justifyContent="flex-end"
                        color="white"
                        fontSize="16px"
                      >
                        {mostrarEvento[index].Horario}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial "
                    fontSize="12px"
                  >
                    <Box
                      width="100%"
                      height={50}
                      bgcolor="white"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt={2}
                    >
                      <Box
                        display="flex"
                        mt={0}
                        justifyContent="center"
                        color="black"
                        fontSize="18px"
                        fontFamily="Fugaz One"
                      >
                        {mostrarEvento[index].Evento}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    mt={0}
                    color="white"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial "
                    fontSize="12px"
                  >
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      mt={2}
                      ml={5}
                    >
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        color="white"
                      >
                        Para Quem:
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    mt={2}
                    color="white"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    fontFamily="arial "
                    fontSize="16px"
                  >
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      mt={-1}
                      justifyContent="center"
                    >
                      <Box
                        fontFamily="arial black"
                        display="flex"
                        justifyContent="flex-start"
                        color="white"
                      >
                        {mostrarEvento[index].Publico}{' '}
                        {mostrarEvento[index].Numero !== 0
                          ? mostrarEvento[index].Numero
                          : ''}
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
          background: 'green',
          color: 'white',
          marginTop: 20,
          width: '80%',
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
    const eventoParcial = calendario.map((row) =>
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
                      console.log('oi nvo');
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
