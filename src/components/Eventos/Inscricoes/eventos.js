import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { useRouter } from 'next/router';
import { Oval } from 'react-loading-icons';
import meuDataTime from 'src/utils/meuDataTime';
import meuDataTimeBr from 'src/utils/meuDataTimeBrasilia';
import dataSistema from 'src/utils/pegaDataAtual';
import TamanhoJanela from 'src/utils/screenSize';

import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    maxHeight: 700,
    padding: 0,
    margin: 0,
  },
  ajusteLargura1: {
    [theme.breakpoints.down('md')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '92vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '94vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '96vw',
    },
  },
}));

function Eventos({ eventoSelecionado, usuario }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));

  const classes = useStyles();
  const router = useRouter();

  const [carregar1, setCarregar1] = React.useState(false);
  const [carregar2, setCarregar2] = React.useState(false);
  const altura = TamanhoJanela().height;
  const [valorAdultos, setValorAdultos] = React.useState(0);
  const [valorCriancas, setValorCriancas] = React.useState(0);
  const handleInciarCompra = () => {
    setCarregar1(true);
    router.push({
      pathname: 'eventoIdpb/comprar',
      query: { eventoSelecionado: JSON.stringify(eventoSelecionado), usuario },
    });
    // setOpen(false);
    // window.location.reload();
  };
  const handleGerarTicket = () => {
    setCarregar2(true);
    router.push({
      pathname: 'eventoIdpb/verTicket',
      query: { eventoSelecionado: JSON.stringify(eventoSelecionado) },
    });
  };
  const handleAutorizarMembros = () => {
    // const perfilUser = JSON.parse(sessionStorage.getItem('perfilUserIdpb'));
    router.push({
      pathname: 'eventoIdpb/autorizarMembros',
      query: { eventoSelecionado: JSON.stringify(eventoSelecionado) },
    });
  };

  React.useEffect(async () => {
    const dataAtualSistema = await dataSistema();
    const dataAtual = meuDataTimeBr(dataAtualSistema);
    let valorAdultosF = eventoSelecionado.valorLote1;
    let valorCriancasF = eventoSelecionado.ValorLote1Crianca;

    if (
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote2).toISOString(),
        ).getTime() > // se a subtração da dt atual menus a dt do fechamento do lote for menor que zero significa que ainda não chegou a data desse lote
      0
    ) {
      valorAdultosF = eventoSelecionado.valorLote2;
      valorCriancasF = eventoSelecionado.ValorLote2Crianca;
    } else if (
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote3).toISOString(),
        ).getTime() >
      0
    ) {
      valorAdultosF = eventoSelecionado.valorLote3;
      valorCriancasF = eventoSelecionado.ValorLote3Crianca;
    }
    setValorAdultos(
      Number(valorAdultosF).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
    setValorCriancas(
      Number(valorCriancasF).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  }, []);

  return (
    <Box
      sx={{ height: 'calc(90vh)' }}
      width="100vw"
      minHeight={500}
      justifyContent="center"
      display="flex"
      alignItems="end"
    >
      <Box height="99%">
        <Box
          justifyContent="center"
          display="flex"
          alignItems="end"
          height="99%"
        >
          <Box
            bgcolor={corIgreja.principal}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            // borderRadius={16}
            height="98%"
            className={classes.ajusteLargura1}
            // maxWidth={450}
            minHeight={480}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <Box
              mt={2}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="auto"
              width="100%"
              minHeight={100}
              display="flex"
              justifyContent="center"
            >
              <Box
                height="100%"
                width="auto"
                maxWidth="300px"
                maxHeight="350px"
              >
                <img
                  src={eventoSelecionado.LogoEvento}
                  alt="img01"
                  width="100%"
                  height="100%"
                />
              </Box>{' '}
            </Box>
            <Box
              mt={2}
              width="100%"
              color="black"
              display="none"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="90%"
                maxWidth={300}
                textAlign="center"
                color="#fafafa"
              >
                {eventoSelecionado && eventoSelecionado.TemCrianca ? (
                  <Box
                    borderRadius={6}
                    height={40}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                    color="white"
                    width="100%"
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box display="flex" justifyContent="center">
                      <Box>ADULTO:</Box>
                      <Box ml={2} color="yellow">
                        {valorAdultos}
                      </Box>
                      <Box ml={5}>CRIANÇAS:</Box>
                      <Box ml={2} color="yellow">
                        {valorCriancas}
                      </Box>
                    </Box>{' '}
                  </Box>
                ) : (
                  <Box
                    borderRadius={6}
                    height={40}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                    color="white"
                    width="100%"
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box display="flex" justifyContent="center">
                      <Box>ADULTO:</Box>
                      <Box ml={2} color="yellow">
                        {valorAdultos}
                      </Box>
                    </Box>{' '}
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              mt={2}
              width="100%"
              color="black"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="90%"
                maxWidth={180}
                textAlign="center"
                color="#fafafa"
              >
                {eventoSelecionado && eventoSelecionado.AutorizacaoPastor ? (
                  <Box
                    borderRadius={6}
                    bgcolor="#9DA3D3"
                    height={40}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                    color="black"
                    width="100%"
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      onClick={() => {
                        handleAutorizarMembros();
                      }}
                    >
                      <Box> AUTORIZAR INSCRIÇÃO</Box>
                      <Box> DO MEMBRO</Box>
                    </Box>{' '}
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
            <Box
              mt={0}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="50%"
              width="100%"
              minHeight={200}
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Stack
                mt={altura > 650 ? -2 : -4}
                direction="row"
                alignItems="center"
                spacing={0}
              >
                <Box
                  display="flex"
                  mt="1vh"
                  justifyContent="center"
                  flexDirection="row"
                  alignItems="center"
                  height={altura > 590 ? '53%' : '46%'}
                  width="100%"
                >
                  <form>
                    <Box mt="2vh">
                      <Box
                        mb={2}
                        height={65}
                        justifyContent="center"
                        width="100%"
                        display="flex"
                      >
                        <Box mt={0}>
                          <Button
                            style={{ width: '200px' }}
                            className={classes.button1}
                            variant="contained"
                            onClick={handleInciarCompra}
                          >
                            {!carregar1 ? (
                              <Box
                                width="100%"
                                fontFamily="arial black"
                                fontSize="14px"
                                color="black"
                              >
                                FAZER INSCRIÇÃO{' '}
                              </Box>
                            ) : (
                              <Box
                                width="100%"
                                justifyContent="center"
                                display="flex"
                              >
                                <Oval stroke="blue" width={30} height={25} />{' '}
                              </Box>
                            )}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      height={90}
                      bgcolor="white"
                      width="90vw"
                      //   maxWidth={450}
                      //    maxWidth={400}
                      mt={2} // não mexer
                      ml={0}
                      sx={{ fontWeight: 'bold', fontSize: '10px' }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontSize: '12px',
                          fontFamily: 'arial black',
                          color: '#000',
                          marginTop: 10,
                        }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        CONFIRA SUA INSCRIÇÃO
                      </Typography>
                      <Box
                        height={65}
                        justifyContent="center"
                        width="100%"
                        display="flex"
                      >
                        <Box mt={0}>
                          <Button
                            style={{ background: '#0B1048', width: '200px' }}
                            variant="contained"
                            onClick={handleGerarTicket}
                          >
                            {!carregar2 ? (
                              <Box
                                width="100%"
                                color="white"
                                fontFamily="arial black"
                              >
                                MINHA INSCRIÇÃO{' '}
                              </Box>
                            ) : (
                              <Box
                                width="100%"
                                justifyContent="center"
                                display="flex"
                              >
                                <Oval stroke="white" width={30} height={25} />{' '}
                              </Box>
                            )}
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {/* <Box display="flex" justifyContent="center">
                      <Box mt={1} width="80%">
                        <Box mt={0}>
                          <Box
                            mt="6vh"
                            mb={-6}
                            display="flex"
                            width="100%"
                            justifyContent="center"
                          >
                            <Box>
                              <Button
                                style={{
                                  borderRadius: 6,
                                  fontFamily: 'arial black',
                                  color: 'white',
                                  background: '#000',
                                }}
                                variant="contained"
                                value="value"
                                onClick={handleEstatistico}
                              >
                                RELATÓRIO ESTATÍSTICO
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box> */}
                  </form>
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Eventos;
