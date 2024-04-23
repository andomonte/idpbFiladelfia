import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/getSize';
import useSWR from 'swr';
import copy from 'copy-to-clipboard';
import { Oval } from 'react-loading-icons';
import { TiArrowBack } from 'react-icons/ti';
import AppBar from '@material-ui/core/AppBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import corIgreja from 'src/utils/coresIgreja';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';

const janela = TamanhoJanela();
let altura;

if (janela.height < 500) altura = 500;
else altura = janela.height;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '500px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '100vh',
  },
  root2: {
    backgroundColor: corIgreja.principal2,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  QrCode: {
    maxWidth: 230,
    maxHeight: 230,
    minWidth: 170,
    minHeight: 170,

    width: altura / 3,
    height: altura / 3,
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
  },
  input1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    background: '#ffdd55',
    '&:hover': {
      backgroundColor: '#f1dd55',
    },
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'black',
    width: 125,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: 'blue',
    '&:hover': {
      backgroundColor: 'blue',
    },
    fontSize: '14px',
    fontWeight: 'bold',
    width: 125,
    minWidth: 125,
    color: '#fff',
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  texto: {
    color: '#780208',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid white',
  },
  paper: {
    // backgroundColor: 'white', // theme.palette.background.paper,
    backgroundImage: `url('/images/evento/cabecalho1.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
  tf_input: {
    backgroundColor: '#ffff',
    borderRadius: '8px',
    border: '2px solid white',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    padding: 0,
    margin: 0,
  },
}));

function MyTimer({ expiryTimestamp, setCancelar }) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setCancelar(true);
      console.warn('onExpire called');
    },
  });
  let minutos = minutes;
  let segundos = seconds;

  // mutate(url);
  if (minutes < 10) minutos = `0${minutes}`;
  if (seconds < 10) segundos = `0${seconds}`;
  return (
    <div>
      <div style={{ fontSize: '16px' }}>
        <span>{minutos}</span>:<span>{segundos}</span>
      </div>
    </div>
  );
}

function QrPix({ codigo }) {
  const classes = useStyles();
  //  const valCodigo = codigo;
  const [dadosCompra, setDadosCompra] = React.useState('');
  const [cancelamento, setCancelamento] = React.useState(false);
  const [url, setUrl] = React.useState();
  const [relogio, setRelogio] = React.useState();
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);

  const [cancelar, setCancelar] = React.useState(false);
  // const [carregar, setCarregar] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (codigo) {
      const urls = `${window.location.origin}/api/consultaInscEventosAM/${codigo.id}`;
      setUrl(urls);
    }
  }, [codigo]);

  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });
  React.useEffect(() => {
    if (data) {
      //      const dadosMesa = data.filter((val) => val.codigo === Number(codigo));
      setDadosCompra(...data);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
  // mutate([url]);
  //  React.useEffect(() => {});
  const handleVerTicket = () => {
    router.push({
      pathname: './meuTicket',
      query: {
        cpf: dadosCompra.CPF,
        Evento: codigo.Evento,
      },
    });
  };
  React.useEffect(() => {
    if (dadosCompra && dadosCompra.CreatedAt) {
      const dataAtual = new Date();
      const date1 = moment(dataAtual).format();
      const date2 = moment(dadosCompra.CreatedAt);
      const diff = date2.diff(date1, 'seconds') + 1800;
      // soma 30 minutes ou seja 1800segundos

      const time = new Date();
      time.setSeconds(time.getSeconds() + diff);

      setRelogio(time);
      if (dadosCompra.status === 'approved') handleVerTicket();
    }
  }, [dadosCompra]);

  const CancelarCompra = async () => {
    try {
      const urlcheck = `/api/consultaInscEventosAM/${codigo.id}`;

      const response = await axios.get(urlcheck);

      if (response) {
        if (response.data[0].status !== 'approved')
          router.push({
            pathname: '/eventoIdpb',
            query: { Evento: codigo.Evento },
          });
        else {
          handleVerTicket();
        }
      }
    } catch (errors) {
      router.push({
        pathname: '/eventoIdpb',
        query: { Evento: codigo.Evento },
      });
    }
  };

  React.useEffect(() => {
    if (cancelar) {
      setLoading2(true);
      //      const dadosMesa = data.filter((val) => val.codigo === Number(codigo));
      CancelarCompra();
    }
  }, [cancelar]);
  const FecharCompra = () => {
    setCancelamento(true);
  };

  const copyToClipboard = () => {
    // toast('copiado!');
    copy(codigo.qrCodeCopy);

    toast.info('copiado !', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  /* return (
    <Box>
      
    </Box>
  ); */
  const voltar = () => {
    router.push({
      pathname: '/eventoIdpb',
      query: { Evento: codigo.Evento },
    });
  };

  return (
    <Box
      bgcolor={corIgreja.principal2}
      height="100vh"
      width="100vw"
      minHeight={700}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box
        mt={0}
        bgcolor={corIgreja.principal}
        color="white"
        fontFamily="Fugaz One"
        fontSize="16px"
        style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
        // borderRadius={16}

        height="88vh"
        width="90vw"
        // maxWidth={450}
        minHeight={680}
        //  maxWidth={400}
        justifyContent="center"
        display="flex"
        flexDirection="column"
        //            alignItems="center"
      >
        <AppBar className={classes.root2}>
          <Box
            width="90%"
            bgcolor={corIgreja.principal}
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="4vh"
            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            ml={0}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                setLoading1(true);
                voltar();
              }}
              width="10%"
            >
              {loading1 ? (
                <Box>
                  <Oval stroke="white" width={25} height={25} />
                </Box>
              ) : (
                <TiArrowBack size={25} color="white" />
              )}
            </Box>
            <Box
              mb={2}
              mt={2}
              width="80%"
              display="flex"
              justifyContent="center"
              textAlign="center"
            >
              <Box
                justifyContent="center"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                fontFamily="Fugaz One"
                fontSize="14px"
              >
                {codigo.Evento.toUpperCase()}
              </Box>
            </Box>
            <Box width="10%" />
          </Box>
        </AppBar>

        <Box height="calc(100% - 56px)" width="100%">
          {!cancelamento ? (
            <Box width="100%" height="100%">
              {(dadosCompra && dadosCompra.status) === 'approved' ? (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Oval stroke="white" width={25} height={25} />
                  </Box>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt={0}
                  height="100%"
                  width="100%"
                >
                  <Box
                    mb={2}
                    mt={5}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <Box justifyContent="center" height="100%">
                      <Avatar
                        alt="Evento"
                        src={codigo.logoEvento || ''}
                        sx={{
                          width: 200,
                          height: 200,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    width="100%"
                    mt={0}
                    justifyContent="center"
                    display="flex"
                  >
                    <Box width="90%" maxWidth={460}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="row"
                        alignItems="center"
                        mt={0}
                        width="100%"
                        height="100%"
                      >
                        <Box ml={0}>
                          <Box
                            width="100%"
                            mt={1}
                            textAlign="center"
                            sx={{ fontSize: 'bold', color: 'white' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              CHAVE PIX PARA PAGAMENTO
                            </Typography>
                          </Box>

                          <Box mt={0} textAlign="center">
                            {codigo && (
                              <img
                                src={`data:image/jpeg;base64,${codigo.qrCode}`}
                                alt="qrCode"
                                width="200vh"
                                height="200vh"
                              />
                            )}
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold', color: 'white' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '12px',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              <Box display="flex" justifyContent="center">
                                CHAVE EXPIRA EM:{' '}
                                <Box mt={-0.5} ml={1}>
                                  {relogio && (
                                    <MyTimer
                                      setCancelar={setCancelar}
                                      expiryTimestamp={relogio}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Typography>
                          </Box>

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

                          <Box mt="5vh" display="flex" justifyContent="center">
                            <Box
                              mr={2}
                              mt={0}
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Button
                                className={classes.button2}
                                variant="contained"
                                id="reload"
                                onClick={copyToClipboard}
                              >
                                <small>COPIE E COLE NO SEU BANCO </small>{' '}
                              </Button>
                            </Box>

                            <Box width="100%">
                              {loading2 ? (
                                <Box
                                  mt="0"
                                  mb={0}
                                  display="flex"
                                  width="100%"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Box className={classes.button1}>
                                    <Oval
                                      stroke="black"
                                      width={25}
                                      height={25}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  mb={0}
                                  display="flex"
                                  height="100%"
                                  width="100%"
                                  justifyContent="center"
                                >
                                  <Button
                                    className={classes.button1}
                                    variant="contained"
                                    id="reload"
                                    onClick={FecharCompra}
                                  >
                                    SAIR
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box width="100%" height="100%">
              {(dadosCompra && dadosCompra.length && dadosCompra[0].status) ===
              'approved' ? (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Oval stroke="white" width={25} height={25} />
                  </Box>
                </Box>
              ) : (
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
                        mt={3}
                        height="100%"
                      >
                        <Box color="white">
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
                              AINDA NÃO DETECTAMOS SEU PIX
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
                              CASO CONFIRME SUA SAÍDA
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
                              SUA INSCRIÇÃO SERÁ CANCELADA
                            </Typography>
                          </Box>

                          <Box mt={5} display="flex" justifyContent="center">
                            <Box
                              mr={5}
                              mt={0}
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Button
                                className={classes.button2}
                                variant="contained"
                                id="reload"
                                onClick={() => {
                                  setCancelamento(false);
                                  setLoading2(false);
                                }}
                              >
                                VOLTAR
                              </Button>
                            </Box>

                            <Box width="100%">
                              {loading3 ? (
                                <Box
                                  mt="0"
                                  mb={0}
                                  display="flex"
                                  width="100%"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Box className={classes.button1}>
                                    <Oval
                                      stroke="black"
                                      width={25}
                                      height={25}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  mb={0}
                                  display="flex"
                                  height="100%"
                                  width="100%"
                                  justifyContent="center"
                                >
                                  <Button
                                    className={classes.button1}
                                    variant="contained"
                                    id="reload"
                                    onClick={() => {
                                      setLoading3(true);
                                      CancelarCompra();
                                    }}
                                  >
                                    SAIR
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default QrPix;
