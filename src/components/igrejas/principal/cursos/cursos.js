import { Box, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ConverterData from 'src/utils/convData2';
import TableContainer from '@mui/material/TableContainer';
import Inscricoes from './inscricoes';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Eventos({ perfilUser, rolMembros }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));

  const [todos, setTodos] = React.useState('');
  const [cursosCadastrados, setCursosCadastrados] = React.useState('');
  const [openPlan, setOpenPlan] = React.useState(false);
  const [eventoEscolhido, setEventoEscolhido] = React.useState('');
  const url = `/api/consultaTurmas`;
  const { data, error } = useSWR(url, fetcher);
  const url2 = `/api/consultaCursos`;
  const { data: data2, error: error2 } = useSWR(url2, fetcher);
  //  dateStart.getTime() < dateIndex.getTime() &&
  //    dateEnd.getTime() > dateIndex.getTime();
  React.useEffect(() => {
    if (data) {
      const dataStart = new Date();
      const dataAtual = dataStart.getTime();
      const eventoAtivo = data.filter(
        (results) =>
          results.Status === 'emAberto' &&
          results.inicioDivulgacao &&
          results.inicioDivulgacao &&
          Number(dataAtual) >=
            Number(new Date(results.inicioDivulgacao).getTime()) &&
          Number(dataAtual) <=
            Number(new Date(results.fimDivulgacao).getTime()),
      );

      const evento = eventoAtivo.filter(
        (val) =>
          Number(val.Distrito) === Number(perfilUser.Distrito) ||
          Number(val.Distrito) === 0,
      );

      setTodos(evento);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  React.useEffect(() => {
    if (data2) {
      setCursosCadastrados(data2);
    }
    if (error2) return <div>An error occured.</div>;
    if (!data2) return <div>Loading ...</div>;

    return 0;
  }, [data2]);

  const handleIncricao = (index) => {
    setOpenPlan(true);
    const evento = todos.filter(
      (val) => Number(val.codigoCurso) === Number(index),
    );
    setEventoEscolhido(evento);
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
        bgcolor="white"
        ml={1.2}
        mr={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
      >
        <Box height="100%" width="96%">
          {todos.length ? (
            <Box height="100%" width="100%">
              <Carousel showThumbs={false} showStatus={false}>
                {todos.map((row) => (
                  <Box key={row.idTurma} height="90vh" width="100%" mt={0}>
                    <TableContainer
                      style={{
                        height: '100%',
                        minHeight: 200,
                        marginTop: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box height="96%" width="100%">
                        <Box
                          height="100%"
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexDirection="column"
                        >
                          {row.imagemCurso && (
                            <img
                              style={{ borderRadius: '16px' }}
                              src={row.imagemCurso}
                              width="auto"
                              alt="imagem"
                            />
                          )}

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            width="100%"
                            bgcolor="black"
                            mt={5}
                            borderRadius={16}
                          >
                            <Box
                              mt={3}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="100%"
                              height="50%"
                              fontSize="20px"
                              color="black"
                            >
                              <Box
                                width="30%"
                                height="100%"
                                fontSize="14px"
                                color="yellow"
                                textAlign="end"
                              >
                                Curso:
                              </Box>
                              <Box
                                textAlign="start"
                                width="70%"
                                height="100%"
                                fontSize="14px"
                                color="white"
                                ml={1}
                              >
                                {' '}
                                {row.Curso}
                              </Box>
                            </Box>
                            <Box
                              mt={3}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="100%"
                              height="50%"
                              fontSize="20px"
                            >
                              <Box
                                width="30%"
                                height="100%"
                                fontSize="14px"
                                color="yellow"
                                textAlign="end"
                              >
                                Início:
                              </Box>
                              <Box
                                textAlign="start"
                                width="30%"
                                height="100%"
                                fontSize="14px"
                                color="white"
                                ml={1}
                              >
                                {ConverterData(row.DataCurso)}
                              </Box>
                              <Box
                                width="20%"
                                height="100%"
                                fontSize="14px"
                                color="yellow"
                                textAlign="end"
                              >
                                Turma:
                              </Box>
                              <Box
                                textAlign="start"
                                width="20%"
                                height="100%"
                                fontSize="14px"
                                color="white"
                                ml={1}
                              >
                                {row.idTurma}
                              </Box>
                            </Box>
                            <Box
                              mt={3}
                              mb={3}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="100%"
                              height="50%"
                              fontSize="20px"
                              color="black"
                            >
                              <Box
                                width="30%"
                                height="100%"
                                fontSize="14px"
                                color="yellow"
                                textAlign="end"
                              >
                                Prof.:
                              </Box>
                              <Box
                                textAlign="start"
                                width="70%"
                                height="100%"
                                fontSize="14px"
                                color="white"
                                ml={1}
                              >
                                {row.Professor.length > 20
                                  ? `${row.Professor.substring(
                                      0,
                                      row.Professor.lastIndexOf(' '),
                                    )}...`
                                  : row.Professor}
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            display="display"
                            mt="2vh"
                            width="100%"
                            height="13%"
                          >
                            <Button
                              style={{
                                background: 'blue',
                                color: 'white',
                                fontFamily: 'Fugaz One',
                                fontSize: '18px',
                                width: '90%',
                                maxWidth: 300,
                                height: '70%',
                                borderRadius: 16,
                              }}
                              component="a"
                              variant="contained"
                              onClick={() => {
                                handleIncricao(row.codigoCurso);
                              }}
                            >
                              FAZER INSCRIÇÃO
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </TableContainer>
                  </Box>
                ))}
              </Carousel>
            </Box>
          ) : (
            <Box
              width="100%"
              height="80%"
              fontFamily="Fugaz One"
              fontSize="18px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="black"
            >
              NENHUM CURSO NESSE PERÍODO
            </Box>
          )}
        </Box>
      </Box>

      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <Inscricoes
          eventoEscolhido={eventoEscolhido}
          setOpenPlan={setOpenPlan}
          rolMembros={rolMembros}
          perfilUser={perfilUser}
          cursosCadastrados={cursosCadastrados}
        />
      </Dialog>
    </Box>
  );
}

export default Eventos;
