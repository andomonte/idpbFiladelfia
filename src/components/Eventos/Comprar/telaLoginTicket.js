import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/screenSize';
import { TiArrowBack } from 'react-icons/ti';
import corIgreja from 'src/utils/coresIgreja';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import { Oval } from 'react-loading-icons';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material';
import ValidaCPF from 'src/utils/validarCPF';
import AppBar from '@material-ui/core/AppBar';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/rubik';
import '@fontsource/fugaz-one';

// Padrões para peso 400.
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  root2: {
    backgroundColor: corIgreja.principal,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    // backgroundColor: '#424242', // theme.palette.background.paper,
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
    backgroundColor: '#FFFF',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #424242',
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
    color: '#2196f3',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#2196f3',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#424242',
    },
  },
}));

function TelaLogin({ eventoSelecionado }) {
  // const [newData, setNewData] = React.useState('');

  const altura = TamanhoJanela().height;

  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const cpfRef = React.useRef();

  const router = useRouter();

  const voltar = () => {
    setLoading2(true);
    router.push({
      pathname: '/eventoIdpb',
      query: { Evento: eventoSelecionado.nomeEvento },
    });
  };
  const entrarNoJogo = () => {
    if (cpf.length > 5)
      router.push({
        pathname: './meuTicket',
        query: {
          cpf,
          Evento: eventoSelecionado.nomeEvento,
        },
      });
  };
  const handleValida = () => {
    setLoading(true);
    let valCPF = false;
    const valorCPF = cpf.replace(/\D/g, '');
    if (cpf.length > 0) {
      valCPF = ValidaCPF(valorCPF);

      if (valCPF) entrarNoJogo();
      else {
        toast.info('ESSE CPF NÃO EXISTE !', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        cpfRef.current.focus();
      }
    } else {
      toast.info('PREENCHA O CAMPO CPF !', {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      cpfRef.current.focus();
    }

    return valCPF;
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formid = event.target.id;
      if (formid === 'CPF') handleValida();
    }
  };

  //  const janela = TamanhoJanela();
  return (
    <Box
      bgcolor={corIgreja.principal2}
      height="100vh"
      width="100vw"
      minHeight={570}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <AppBar className={classes.root2}>
        <Box
          width="100%"
          // maxWidth={450}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          ml={0}
        >
          <Box ml={2} display="flex" justifyContent="center" width="15%">
            {loading2 ? (
              <Box>
                <Oval stroke="white" width={25} height={25} />
              </Box>
            ) : (
              <TiArrowBack size={30} onClick={voltar} />
            )}
          </Box>
          <Box
            width="85%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={50}
            mr={2}
          >
            <Box textAlign="center" fontFamily="Fugaz One">
              {eventoSelecionado && eventoSelecionado.nomeEvento
                ? eventoSelecionado.nomeEvento.toUpperCase()
                : 'EVENTOS IDPB'}
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box
        height="90.5vh"
        width="94vw"
        minHeight={570}
        justifyContent="center"
        display="flex"
        alignItems="center"
        mt="8vh"
      >
        <Box height="96%" bgcolor={corIgreja.principal}>
          <Box
            mt={0}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height="100%"
            width="90vw"
            // maxWidth={450}
            minHeight={540}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
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
                  src={eventoSelecionado ? eventoSelecionado.LogoEvento : ''}
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                />
              </Box>
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
                  <Box>
                    <Box mt="2vh" />
                    <Box
                      height={120}
                      // bgcolor="#fff6d5"
                      width="90vw"
                      //   maxWidth={450}
                      //    maxWidth={400}
                      mt={-2} // não mexer
                      ml={0}
                      sx={{ fontWeight: 'bold', fontSize: '10px' }}
                      textAlign="center"
                    >
                      <Typography
                        style={{
                          // fontWeight: 'bold',
                          fontSize: '18px',
                          fontFamily: 'Fugaz One',
                          color: '#fff',
                          marginTop: -0,
                        }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        GERE SUA CREDENCIAL DIGITAL
                      </Typography>
                    </Box>
                    <Box width="100%" display="flex" justifyContent="center">
                      <Box mt={0} width="100%">
                        <Box mt={0}>
                          <Box
                            mt={2}
                            ml={0}
                            sx={{ fontWeight: 'bold', fontSize: '10px' }}
                            display="flex"
                            justifyContent="center"
                          >
                            <Typography
                              style={{
                                fontFamily: 'Fugaz One',

                                fontSize: '14px',
                                color: 'white',
                              }}
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              DIGITE O DOCUMENTO
                            </Typography>
                          </Box>
                          <Box
                            mt={0}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                          >
                            <Box width="100$">
                              <TextField
                                autoComplete="off"
                                id="CPF"
                                type="text"
                                inputRef={cpfRef}
                                style={{ width: '100%' }}
                                className={classes.tf_s}
                                inputProps={{
                                  style: {
                                    textAlign: 'center',
                                  },
                                }}
                                value={cpf}
                                variant="outlined"
                                placeholder="utilizado na inscrição"
                                size="small"
                                onKeyDown={handleEnter}
                                onChange={(e) => {
                                  setCPF(e.target.value);
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box mt="10vh">
                          <Box
                            mt="5vh"
                            mb={0}
                            display="flex"
                            width="100%"
                            justifyContent="center"
                          >
                            <Box>
                              <Button
                                style={{
                                  borderRadius: 16,
                                  background: '#ffdd55',
                                  fontFamily: 'Fugaz One',
                                }}
                                variant="contained"
                                value="value"
                                onClick={handleValida}
                              >
                                {!loading ? (
                                  'GERAR CREDENCIAL'
                                ) : (
                                  <Box
                                    width="100%"
                                    height="100%"
                                    alignItems="center"
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    <Box>VERIFICANDO CPF</Box>

                                    <Box
                                      height="100%"
                                      alignItems="center"
                                      display="flex"
                                      ml={2}
                                    >
                                      <Oval
                                        stroke="black"
                                        width={20}
                                        height={20}
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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
                </Box>
              </Stack>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default TelaLogin;
