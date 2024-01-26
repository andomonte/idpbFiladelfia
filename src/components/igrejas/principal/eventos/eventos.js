import { Box, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useRouter } from 'next/router';
import TableContainer from '@mui/material/TableContainer';
import Inscricoes from './inscricoes';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Eventos({ perfilUser, rolMembros }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));
  const router = useRouter();
  const [todos, setTodos] = React.useState('');
  const [openPlan, setOpenPlan] = React.useState(false);
  const [eventoEscolhido, setEventoEscolhido] = React.useState('');
  const url = `/api/consultaEventosGerais`;
  const { data, error } = useSWR(url, fetcher);

  //  dateStart.getTime() < dateIndex.getTime() &&
  //    dateEnd.getTime() > dateIndex.getTime();
  React.useEffect(() => {
    if (data) {
      const dataStart = new Date();
      const dataAtual = dataStart.getTime();
      const eventoAtivo = data.filter(
        (results) =>
          results.DataIni &&
          results.DataFim &&
          Number(dataAtual) >= Number(new Date(results.DataIni).getTime()) &&
          Number(dataAtual) <= Number(new Date(results.DataFim).getTime()),
      );
      let evento;
      if (perfilUser)
        evento = eventoAtivo.filter(
          (val) =>
            Number(val.Distrito) === Number(perfilUser.Distrito) ||
            Number(val.Distrito) === 0,
        );
      else
        evento = eventoAtivo.filter(
          (val) => Number(val.Distrito) === 0 || Number(val.Distrito) === 1,
        );
      setTodos(evento);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
  const handleIncricao = (index) => {
    setOpenPlan(true);
    const evento = todos.filter((val) => Number(val.id) === Number(index));
    setEventoEscolhido(evento);
  };
  const handlePagar = (eventoSelecionado) => {
    router.push({
      pathname: '/comprar',
      query: { eventoSelecionado: JSON.stringify(eventoSelecionado) },
    });
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
      color={corIgreja.texto1}
    >
      <Box
        height="97%"
        width="100%"
        bgcolor={corIgreja.principal}
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
                  <Box key={row.id} height="90vh" width="100%" mt={0}>
                    <TableContainer
                      style={{
                        height: '88%',
                        minHeight: 200,
                        marginTop: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box height="96%" width="100%" maxWidth={500}>
                        <Box height="100%" width="100%">
                          {row.LogoEvento && (
                            <img
                              style={{
                                borderRadius: '16px',
                                width: '100%',
                                height: 'auto',
                                maxHeight: row.Evento ? '44vh' : 'auto',
                              }}
                              src={row.LogoEvento}
                              alt="imagem"
                            />
                          )}
                          <Box
                            display={row.Evento ? 'flex' : 'none'}
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            width="100%"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="100%"
                              height="50%"
                              fontSize="20px"
                            >
                              <Box ml={2}>
                                <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{
                                    __html: row.Evento,
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </TableContainer>
                    <Box display="flex" width="100%" height="100%">
                      <Box
                        display={row.inscricao ? 'display' : 'none'}
                        width="100%"
                        height="9%"
                      >
                        <Button
                          style={{
                            background: corIgreja.tercenaria,
                            color: corIgreja.texto2,
                            fontFamily: 'Fugaz One',
                            fontSize: '14px',
                            width: '90%',
                            maxWidth: 300,
                            height: '70%',
                            borderRadius: 16,
                          }}
                          component="a"
                          variant="contained"
                          onClick={() => {
                            handleIncricao(row.id);
                          }}
                        >
                          FAZER INSCRIÇÃO
                        </Button>
                      </Box>

                      <Box
                        display={row.pagarOnline ? 'display' : 'none'}
                        width="100%"
                        height="9%"
                      >
                        <Button
                          style={{
                            background: corIgreja.secundaria,
                            color: 'black',
                            fontFamily: 'Fugaz One',
                            fontSize: '14px',
                            width: '90%',
                            maxWidth: 300,
                            height: '70%',
                            borderRadius: 16,
                          }}
                          component="a"
                          variant="contained"
                          onClick={() => {
                            handlePagar(row);
                          }}
                        >
                          PAGAR INSCRIÇÃO
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      display={row.inscricao ? 'display' : 'none'}
                      width="100%"
                      height="3%"
                    />
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
              textAlign="center"
              color={corIgreja.texto1}
            >
              NENHUM EVENTO PREVISTO NESSE PERÍODO
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
        />
      </Dialog>
    </Box>
  );
}

export default Eventos;
