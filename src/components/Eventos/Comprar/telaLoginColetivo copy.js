import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/screenSize';
import axios from 'axios';
import { BsFillPlusSquareFill, BsDashSquareFill } from 'react-icons/bs';
import { Oval } from 'react-loading-icons';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import meuDataTime from 'src/utils/meuDataTime';
import meuDataTimeBr from 'src/utils/meuDataTimeBrasilia';
import dataSistema from 'src/utils/pegaDataAtual';
import { TextField } from '@mui/material';
import cpfMask from 'src/components/mascaras/cpf';
import ValidaCPF from 'src/utils/validarCPF';

import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/rubik';
import '@fontsource/fugaz-one';
import corIgreja from 'src/utils/coresIgreja';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100vh',

    overflow: 'hidden',
    width: '100vw',
    justifyContent: 'center',
  },
  root2: {
    backgroundColor: '#424242',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
}));

function TelaLogin({ eventoSelecionado }) {
  const classes = useStyles();
  const altura = TamanhoJanela().height;
  const router = useRouter();
  const [cpf, setCPF] = React.useState('');
  const [adulto, setAdulto] = React.useState(0);
  const [criancas1, setCriancas1] = React.useState(0);
  const [criancas2, setCriancas2] = React.useState(0);
  const [posts, setPosts] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const cpfRef = React.useRef();
  const [valorAdultos, setValorAdultos] = React.useState(0);
  const [valorCriancas, setValorCriancas] = React.useState(0);

  React.useEffect(async () => {
    const dataAtualSistema = await dataSistema();
    const dataAtual = meuDataTimeBr(dataAtualSistema);
    let valorAdultosF = eventoSelecionado.valorLote1;
    let valorCriancasF = eventoSelecionado.ValorLote1Crianca;

    if (
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote1).toISOString(),
        ).getTime() > // se a subtração da dt atual menus a dt do fechamento do lote for menor que zero significa que ainda não chegou a data desse lote
        0 &&
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote2).toISOString(),
        ).getTime() < // se a subtração da dt atual menus a dt do fechamento do lote for menor que zero significa que ainda não chegou a data desse lote
        0
    ) {
      valorAdultosF = eventoSelecionado.valorLote2;
      valorCriancasF = eventoSelecionado.ValorLote2Crianca;
    }
    if (
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote1).toISOString(),
        ).getTime() > // se a subtração da dt atual menus a dt do fechamento do lote for menor que zero significa que ainda não chegou a data desse lote
        0 &&
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote2).toISOString(),
        ).getTime() > // se a subtração da dt atual menus a dt do fechamento do lote for menor que zero significa que ainda não chegou a data desse lote
        0 &&
      dataAtual.getTime() -
        meuDataTime(
          new Date(eventoSelecionado.DataFechamentoLote3).toISOString(),
        ).getTime() <
        0
    ) {
      valorAdultosF = eventoSelecionado.valorLote3;
      valorCriancasF = eventoSelecionado.ValorLote3Crianca;
    }
    valorAdultosF *= adulto;
    valorCriancasF *= criancas1;
    setValorAdultos(Number(valorAdultosF));
    setValorCriancas(Number(valorCriancasF));
  }, [adulto, criancas1]);

  const entrarNoJogo = async () => {
    const qtyA = adulto;
    const qtyC1 = criancas1;
    const qtyC2 = criancas2;

    const total = valorAdultos + valorCriancas;

    router.push({
      pathname: './dadosComprador',
      query: {
        cpf,
        eventoSelecionado: JSON.stringify(eventoSelecionado),
        qtyA,
        qtyC1,
        qtyC2,
        total,
      },
    });
  };
  const handleIncAdulto = () => {
    let contAdulto = adulto + 1;
    if (contAdulto > 99) contAdulto = 99;
    setAdulto(contAdulto);
  };
  const handleDecAdulto = () => {
    let contAdulto = adulto - 1;
    if (contAdulto < 0) contAdulto = 0;
    setAdulto(contAdulto);
  };
  // crianças que pagam
  const handleIncCriancas1 = () => {
    let contCriancas1 = criancas1 + 1;
    if (contCriancas1 > 99) contCriancas1 = 99;
    setCriancas1(contCriancas1);
  };
  const handleDecCriancas1 = () => {
    let contCriancas1 = criancas1 - 1;
    if (contCriancas1 < 0) contCriancas1 = 0;
    setCriancas1(contCriancas1);
  };
  //= ================================================
  // crianças que pagam
  const handleIncCriancas2 = () => {
    let contCriancas2 = criancas2 + 1;
    if (contCriancas2 > 99) contCriancas2 = 99;
    setCriancas2(contCriancas2);
  };
  const handleDecCriancas2 = () => {
    let contCriancas2 = criancas2 - 1;
    if (contCriancas2 < 0) contCriancas2 = 0;
    setCriancas2(contCriancas2);
  };
  const handleVerificarInscrito = async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscEventosAMCPF/${eventoSelecionado.nomeEvento}/${cpf}`;
      const res = await axios.get(url);
      if (res.data && res.data.length) {
        setPosts(() => [...res.data]);
        // setArray
      } else entrarNoJogo();
    } catch (err) {
      console.log(err);
      toast.error(
        'ERRO AO ACESSAR O BANCO DE DADOS DA IDPB.  TENTE NOVAMENTE MAIS TARDE !',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      setLoading(false);
    }
  };

  React.useEffect(async () => {
    if (posts) {
      if (posts.length > 0) {
        const inscrito = posts.filter((val) => val.status === 'approved');
        const pixPendente = posts.filter(
          (val) => val.status === 'pending' && val.Fpagamento === 'pix',
        );
        if (inscrito.length) {
          setLoading(false);
          toast.info('JÁ EXISTE UMA COMPRA NESSE CPF !', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (pixPendente.length) {
          setLoading(false);
          toast.info(
            'EXISTE UMA CHAVE PIX GERADA PARA ESSE CPF, CASO NÃO TENHA CONSIGUIDO FAZER O PAGAMENTO AGUARDE 30 MINUTOS E TENTE NOVAMENTE !',
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );
        } else entrarNoJogo();
      } else entrarNoJogo(); // setOpenDrawerInval(true);
    }
  }, [posts]);
  //= ================================================
  const handleValida = () => {
    let valCPF = false;
    const totalInscritos = adulto + criancas1 + criancas2;

    if (totalInscritos) {
      setLoading(true);
      const valorCPF = cpf.replace(/\D/g, '');
      if (cpf.length > 0) {
        valCPF = ValidaCPF(valorCPF);

        if (valCPF) handleVerificarInscrito();
        else {
          setLoading(false);
          toast.error('ESSE CPF NÃO EXISTE !', {
            position: toast.POSITION.TOP_CENTER,
          });
          cpfRef.current.focus();
        }
      } else {
        setLoading(false);
        toast.error('PREENCHA O CAMPO CPF !', {
          position: toast.POSITION.TOP_CENTER,
        });
        cpfRef.current.focus();
      }
    } else
      toast.error('QUANTIDADE NÃO DEFINIDA !', {
        position: toast.POSITION.TOP_CENTER,
      });
    return valCPF;
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formid = event.target.id;
      if (formid === 'CPF') handleValida();
    }
  };
  return (
    <Box
      bgcolor={corIgreja.principal2}
      height="100vh"
      width="100vw"
      minHeight={600}
    >
      <Box
        height="100%"
        width="100%"
        justifyContent="center"
        display="flex"
        minHeight={600}
        alignItems="center"
      >
        <Box
          width="94vw"
          minHeight={510}
          height="96%"
          bgcolor={corIgreja.principal}
        >
          <Box
            mt={0}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height="100%"
            width="100%"
            minHeight={500}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <Box
              mb={2}
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
                    width: '22vh',
                    height: '22vh',
                  }}
                />
              </Box>
            </Box>
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
                    {valorAdultos.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Box>
                  <Box ml={3}>CRIANÇAS:</Box>
                  <Box ml={2} color="yellow">
                    {valorCriancas.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
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
                    {valorAdultos.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Box>
                </Box>{' '}
              </Box>
            )}
            <Box
              mt={0}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="43%"
              width="100%"
              minHeight={300}
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Stack
                mt={0}
                direction="row"
                alignItems="center"
                spacing={0}
                width="100%"
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
                    <Box
                      width="90vw"
                      ml={1}
                      mr={1}
                      minWidth={280}
                      maxWidth={600}
                      sx={{ fontSize: '10px' }}
                      textAlign="center"
                    >
                      <Box
                        height={30}
                        width="100%"
                        mt={2} // não mexer
                        ml={0}
                        sx={{ fontWeight: 'bold', fontSize: '10px' }}
                        textAlign="center"
                      >
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontFamily: 'Fugaz One',
                            color: '#fff',
                            marginTop: -0,
                          }}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          ADULTOS (+ 12 ANOS)
                        </Typography>
                      </Box>
                      <Box width="98%" display="flex" justifyContent="center">
                        <Box width="100%">
                          <Box
                            height={40}
                            style={{
                              // fontWeight: 'bold',
                              border: '2px solid #9e9e9e',
                              borderRadius: 6,
                              fontSize: '18px',
                              fontFamily: 'Fugaz One',
                              color: '#fff',
                              marginTop: -0,
                            }}
                            display="flex"
                            width="100%"
                            alignItems="center"
                            justifyContent="start"
                            ml={0}
                          >
                            <Box
                              display="flex"
                              width="30%"
                              height="100%"
                              alignItems="center"
                              justifyContent="start"
                              onClick={() => {
                                handleIncAdulto();
                              }}
                            >
                              <BsFillPlusSquareFill size={35} />
                            </Box>
                            <Box
                              display="flex"
                              width="40%"
                              height="100%"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {adulto}
                            </Box>
                            <Box
                              display="flex"
                              width="30%"
                              height="100%"
                              alignItems="center"
                              justifyContent="end"
                              onClick={() => {
                                handleDecAdulto();
                              }}
                            >
                              <BsDashSquareFill size={35} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      width="90vw"
                      minWidth={280}
                      maxWidth={600}
                      mt={0}
                      sx={{ fontSize: '10px' }}
                      display={eventoSelecionado.TemCrianca ? 'flex' : 'none'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box width="100%">
                        <Box
                          height={30}
                          width="100%"
                          // não mexer
                          ml={0}
                          sx={{ fontWeight: 'bold', fontSize: '10px' }}
                          textAlign="center"
                        >
                          <Typography
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Fugaz One',
                              color: '#fff',
                              marginTop: -0,
                            }}
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            QUANTIDADE DE CRIANÇAS
                          </Typography>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <Box width="48%">
                            <Box
                              style={{
                                fontSize: '12px',
                                fontFamily: 'Fugaz One',
                                color: '#fff',
                                marginTop: -0,
                              }}
                              widt="100%"
                              display="flex"
                              justifyContent="center"
                              ml={2}
                            >
                              ZERO - {eventoSelecionado.IdadeCriancasIsenta}{' '}
                              ANOS
                            </Box>
                            <Box
                              height={40}
                              style={{
                                // fontWeight: 'bold',
                                border: '2px solid #9e9e9e',
                                borderRadius: 6,
                                fontSize: '18px',
                                fontFamily: 'Fugaz One',
                                color: '#fff',
                                marginTop: -0,
                              }}
                              display="flex"
                              width="100%"
                              alignItems="center"
                              justifyContent="start"
                              ml={1}
                            >
                              <Box
                                display="flex"
                                width="30%"
                                height="100%"
                                alignItems="center"
                                justifyContent="start"
                                onClick={() => {
                                  handleIncCriancas2();
                                }}
                              >
                                <BsFillPlusSquareFill size={35} />
                              </Box>
                              <Box
                                display="flex"
                                width="40%"
                                height="100%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {criancas2}
                              </Box>
                              <Box
                                display="flex"
                                width="30%"
                                height="100%"
                                alignItems="center"
                                justifyContent="end"
                                onClick={() => {
                                  handleDecCriancas2();
                                }}
                              >
                                <BsDashSquareFill size={35} />
                              </Box>
                            </Box>
                          </Box>

                          <Box ml={2} mr={2} width="48%">
                            <Box
                              style={{
                                // fontWeight: 'bold',
                                fontSize: '12px',
                                fontFamily: 'Fugaz One',
                                color: '#fff',
                                marginTop: -0,
                              }}
                              widt="100%"
                              display="flex"
                              justifyContent="center"
                              ml={2}
                            >
                              DE {eventoSelecionado.IdadeCriancasIsenta + 1} -
                              11 ANOS
                            </Box>
                            <Box
                              height={40}
                              style={{
                                // fontWeight: 'bold',
                                border: '2px solid #9e9e9e',
                                borderRadius: 6,
                                fontSize: '18px',
                                fontFamily: 'Fugaz One',
                                color: '#fff',
                                marginTop: -0,
                              }}
                              display="flex"
                              width="100%"
                              alignItems="center"
                              justifyContent="start"
                              ml={1}
                            >
                              <Box
                                display="flex"
                                width="30%"
                                height="100%"
                                alignItems="center"
                                justifyContent="start"
                                onClick={() => {
                                  handleIncCriancas1();
                                }}
                              >
                                <BsFillPlusSquareFill size={35} />
                              </Box>
                              <Box
                                display="flex"
                                width="40%"
                                height="100%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {criancas1}
                              </Box>
                              <Box
                                display="flex"
                                width="30%"
                                height="100%"
                                alignItems="center"
                                justifyContent="end"
                                onClick={() => {
                                  handleDecCriancas1();
                                }}
                              >
                                <BsDashSquareFill size={35} />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box width="100%" display="flex" justifyContent="center">
                      <Box mt={3} width="100%">
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
                              DIGITE SEU CPF
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

                        <Box width="100%" mt="5vh">
                          <Box
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
                                  width: 210,
                                }}
                                variant="contained"
                                value="value"
                                onClick={() => {
                                  if (!loading) {
                                    handleValida();
                                  }
                                }}
                              >
                                {!loading ? (
                                  'FAZER INSCRIÇÃO'
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
              autoClose={4000}
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
