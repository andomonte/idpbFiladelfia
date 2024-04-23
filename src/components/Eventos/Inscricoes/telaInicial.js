import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
// import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/screenSize';
// import TamanhoJanela from 'src/utils/getSize';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Oval } from 'react-loading-icons';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';
import '@fontsource/rubik';
import '@fontsource/fugaz-one';
// Padrões para peso 400.
const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  paper: {
    // backgroundColor: '#DA691D', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  tf_s: {
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #DA691D',
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
  button1: {
    display: 'flex',
    background: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#dd2c00',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#dd2c00',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#df5c00',
    },
  },
}));

function TelaInicial() {
  // const [newData, setNewData] = React.useState('');
  const classes = useStyles();
  const altura = TamanhoJanela().height;

  const router = useRouter();
  const [carregar, setCarregar] = React.useState(false);
  // if (data) console.log(data);
  const [action, setAction] = React.useState('');

  const voltar = () => {
    router.push({
      pathname: '/idpbAM',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const handleInciarCompra = () => {
    setCarregar(true);
    router.push({
      pathname: './comprar',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  React.useEffect(async () => {
    if (action !== '') {
      if (action === 1) {
        saveAs(
          '/files/RelEstatisticoCongregacoes.pdf',
          'relatoriodaCongregação.pdf',
        );
      }
      if (action === 2) {
        saveAs(
          '/files/cartaDelegado1.pdf',
          'carta_de_autorização_do_delegado.pdf',
        );
      }

      if (action === 3) voltar();

      setAction('');
    }
  }, [action]);

  /* const handleEstatistico = () => {
    router.push({
      pathname: '/eventoIdpb/relEstatistico',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  }; */

  const handleGerarTicket = () => {
    router.push({
      pathname: './verTicket',
      //   query: { dadosMesa2, numeroGame },
    });
  };

  //  const janela = TamanhoJanela();
  return (
    <Box
      mt="10vh"
      bgcolor="#D2691E"
      height="90vh"
      width="100vw"
      minHeight={500}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box>
        <Box>
          <Box
            bgcolor="#803300"
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height={altura > 650 ? '84vh' : '80vh'}
            width="90vw"
            // maxWidth={450}
            minHeight={480}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <Box
              mt={altura > 650 ? '5vh' : 10}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="20%"
              width="100%"
              minHeight={100}
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Stack
                mt={altura > 650 ? -2 : -4}
                direction="column"
                alignItems="center"
                spacing={0}
              >
                {/* <Box
                  // mb={height > 650 ? 3 : 0}
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    bgcolor="#fff6d5"
                    alignItems="center"
                    borderRadius={100}
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                    width="100vw"
                    display="flex"
                    justifyContent="center"
                  >
                    <Box fontSize="14px" color="black" textAlign="center">
                      <Box color="blue"> 3º Lote</Box>
                      <Box color="black"> R$ 300,00</Box>
                      <Box fontFamily="Rubik"> até 30/10</Box>
                    </Box>
                  </Box>
                </Box> */}
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-end"
                  style={{
                    // "url('/images/global/fundo.png')"
                    backgroundImage: "url('/images/missoes/sim1.webp')", // `url(${row.imgPath})`,
                    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover', // imagem cobre toda área do div
                  }}
                >
                  <Box color="black" width="100%" height="100%">
                    <Box
                      mt="2vw"
                      ml="12vw"
                      color="white"
                      fontSize="4vw"
                      fontFamily="Russo One"
                    >
                      {' '}
                      Seminário
                    </Box>
                    <Box
                      mt="-0.5vh"
                      ml="12vw"
                      color="white"
                      fontSize="4vw"
                      fontFamily="Russo One"
                    >
                      {' '}
                      Intensivo de
                    </Box>
                    <Box
                      mt="-0.5vh"
                      ml="12vw"
                      color="white"
                      fontSize="4vw"
                      fontFamily="Russo One"
                    >
                      {' '}
                      Missões
                    </Box>
                  </Box>
                </Box>
                <Box mt="3vh" width="100%" color="black" textAlign="center">
                  <Box color="#fafafa">de 23 a 26 de Novembro</Box>
                  <Box color="#fafafa">
                    na Escola Bíblica - Lagoa Santa - MG
                  </Box>
                </Box>
              </Stack>
            </Box>
            <Box
              mt={0}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="63%"
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
                  height={altura > 590 ? '53vh' : '46vh'}
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
                            className={classes.button1}
                            variant="contained"
                            onClick={handleInciarCompra}
                          >
                            {!carregar ? (
                              <Box
                                width="100%"
                                fontFamily="arial black"
                                fontSize="14px"
                                color="black"
                              >
                                COMPRAR{' '}
                              </Box>
                            ) : (
                              <Box
                                width={100}
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
                      bgcolor="#fff6d5"
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
                            style={{ background: '#803300' }}
                            variant="contained"
                            onClick={handleGerarTicket}
                          >
                            {!carregar ? (
                              <Box
                                width="100%"
                                color="white"
                                fontFamily="arial black"
                              >
                                MINHA INSCRIÇÃO{' '}
                              </Box>
                            ) : (
                              <Box
                                width={120}
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

export default TelaInicial;
