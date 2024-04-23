import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/screenSize';
import { TiArrowBack } from 'react-icons/ti';
import axios from 'axios';
import { useRouter } from 'next/router';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material';
import cpfMask from 'src/components/mascaras/cpf';
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
    backgroundColor: '#1a237e',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    // backgroundColor: '#1a237e', // theme.palette.background.paper,
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
    border: '2px solid #1a237e',
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
    color: '#1a237e',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#1a237e',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#df5c00',
    },
  },
}));

function TelaLogin() {
  // const [newData, setNewData] = React.useState('');

  const altura = TamanhoJanela().height;

  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [check, setCheck] = React.useState('');
  const [grau, setGrau] = React.useState('');
  const cpfRef = React.useRef();

  const router = useRouter();

  // if (data) console.log(data);

  const voltar = () => {
    router.push({
      pathname: './',
    });
  };
  const entrarNoJogo = async () => {
    setCheck('Verificando Inscrição...');
    if (cpf) {
      try {
        const newCPF = cpfMask(cpf);
        const url = `${window.location.origin}/api/consultaInscritosEventosGeral`;
        const res = await axios.post(url, { newCPF });
        if (res.data && res.data.length) {
          const inscrito = res.data.filter(
            (val) =>
              val.CPF.replace(/([^0-9])/g, '') === cpf.replace(/([^0-9])/g, ''),
          );
          if (
            inscrito[0].GrauMinisterial === 'DELEGADO' ||
            inscrito[0].GrauMinisterial === 'MEMBRO AUTORIZADO'
          )
            router.push({
              pathname: './anexar',
              query: {
                cpf,
              },
            });
          else {
            setGrau(inscrito[0].GrauMinisterial);
            setCheck('GrauErrado');
          }
          // setArray
        } else {
          setCheck('naoInscrito');
        }
      } catch (err) {
        console.log(err);
      }
    } else
      router.push({
        pathname: './verTicket',
      });
  };
  const handleValida = () => {
    let valCPF = false;
    const valorCPF = cpf.replace(/\D/g, '');
    if (cpf.length > 0) {
      valCPF = ValidaCPF(valorCPF);

      if (valCPF) entrarNoJogo();
      else {
        toast.info('ESSE CPF NÃO EXISTE !', {
          position: toast.POSITION.TOP_CENTER,
        });
        cpfRef.current.focus();
      }
    } else {
      toast.info('PREENCHA O CAMPO CPF !', {
        position: toast.POSITION.TOP_CENTER,
      });
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
      mt="2vh"
      bgcolor="#D2691E"
      height="98vh"
      width="100vw"
      minHeight={500}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box>
        <Box>
          <Box
            mt={0}
            bgcolor="#803300"
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height="88vh"
            width="90vw"
            // maxWidth={450}
            minHeight={470}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <AppBar className={classes.root2}>
              <Box
                width="90%"
                // maxWidth={450}
                bgcolor="#803300"
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
                  justifyContent="flex-start"
                  ml={2}
                  width="10%"
                >
                  <TiArrowBack size={30} onClick={voltar} />
                </Box>
                <Box
                  mb={2}
                  mt={2}
                  width="80%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                >
                  <img
                    src="/images/idpb.png"
                    alt="Castelo"
                    width={40}
                    height={45}
                  />
                  <Box
                    ml={1}
                    color="white"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    fontSize="15px"
                    fontFamily="Fugaz One"
                  >
                    <Box width="100%" textAlign="left" mt={0.5}>
                      CONVENÇÃO NACIONAL
                    </Box>
                    <Box width="100%" textAlign="left" mt={-0.5}>
                      2022 ANO DA UNIDADE
                    </Box>
                  </Box>
                </Box>
                <Box width="10%" />
              </Box>
            </AppBar>
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
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
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
                        ANEXAR A CARTA
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
                              DIGITE O CPF DO DELEGADO
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
                                id="CPF"
                                type="tel"
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
                                placeholder="999.999.999-99"
                                size="small"
                                onKeyDown={handleEnter}
                                onChange={(e) => {
                                  setCPF(cpfMask(e.target.value));
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box textAlign="center" mt="10vh">
                          {check === 'GrauErrado' && (
                            <Box>
                              <Box>CPF INSCRITO COMO: </Box>

                              <Box>{grau}</Box>
                            </Box>
                          )}
                          {check === 'naoInscrito' && (
                            <Box>
                              <Box>CPF NÃO ENCONTRADO </Box>

                              <Box>EM NOSSO BANCO DE DADOS</Box>
                            </Box>
                          )}
                        </Box>

                        <Box mt="2vh">
                          <Box
                            mt="2vh"
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
                                Checar Inscrição
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
