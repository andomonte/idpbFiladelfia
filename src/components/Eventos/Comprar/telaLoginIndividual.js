import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import meuDataTime from 'src/utils/meuDataTime';
import meuDataTimeBr from 'src/utils/meuDataTimeBrasilia';
import dataSistema from 'src/utils/pegaDataAtual';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Oval } from 'react-loading-icons';
import { useRouter } from 'next/router';
import cpfMask from 'src/components/mascaras/cpf';
import { TextField } from '@mui/material';
import ValidaCPF from 'src/utils/validarCPF';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
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
    backgroundColor: '#FFFF',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #9e9e9e',
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
}));

function TelaLogin({ eventoSelecionado }) {
  // const [newData, setNewData] = React.useState('');

  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const cpfRef = React.useRef();
  const [posts, setPosts] = React.useState('');
  const router = useRouter();
  const [adulto, setAdulto] = React.useState(true);
  const [inscAdulto, setInscAdulto] = React.useState(0);
  const [inscC1, setInscC1] = React.useState(0);
  const [inscC2, setInscC2] = React.useState(0);
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
    valorAdultosF *= 1;
    valorCriancasF *= 1;
    setValorAdultos(Number(valorAdultosF));
    setValorCriancas(Number(valorCriancasF));
  }, [adulto]);
  // if (data) console.log(data);
  function entrarNoJogo() {
    let tipo = 'criança';
    if (adulto) tipo = 'Adulto';

    router.push({
      pathname: '/eventoIdpb/iniciaCompraIndividual',
      query: {
        cpf,
        tipo,
        eventoSelecionado: JSON.stringify(eventoSelecionado),
        qtyA: adulto ? 1 : 0,
        qtyC1: 0,
        qtyC2: 0,
        total: adulto ? valorAdultos : valorCriancas,
      },
    });
  }
  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscritosEventosTipo/${eventoSelecionado.nomeEvento}`;
      const res = await axios.get(url);
      if (res.data && res.data.length) {
        const newInscAdultos = res.data
          .map((item) => {
            if (item.qtyAdultos !== undefined) {
              return item.qtyAdultos;
            }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        const newInscC1 = res.data
          .map((item) => {
            if (item.qtyCriancas1 !== undefined) {
              return item.qtyCriancas1;
            }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        // setArray
        const newInscC2 = res.data
          .map((item) => {
            if (item.qtyCriancas2 !== undefined) {
              return item.qtyCriancas2;
            }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        setInscAdulto(newInscAdultos);
        setInscC1(newInscC1);
        setInscC2(newInscC2);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
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
  const handleValida = () => {
    let valCPF = false;
    const valorCPF = cpf.replace(/\D/g, '');
    if (cpf.length > 0) {
      valCPF = ValidaCPF(valorCPF);

      if (valCPF) handleVerificarInscrito();
      else {
        setLoading(false);
        toast.info('ESSE CPF NÃO EXISTE !', {
          position: toast.POSITION.TOP_CENTER,
        });
        cpfRef.current.focus();
      }
    } else {
      setLoading(false);
      toast.info('PREENCHA O CAMPO CPF !', {
        position: toast.POSITION.TOP_CENTER,
      });
      cpfRef.current.focus();
    }

    return valCPF;
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;
      if (formId === 'CPF') handleValida();
    }
  };
  React.useEffect(async () => {
    if (posts) {
      if (posts.length > 0) {
        const inscrito = posts.filter((val) => val.status === 'approved');
        const pixPendente = posts.filter(
          (val) => val.status === 'pending' && val.Fpagamento === 'pix',
        );
        console.log('insc', eventoSelecionado, adulto);
        if (inscrito.length && adulto) {
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
  //  const janela = TamanhoJanela();
  return (
    <Box
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
      width="100vw"
      minHeight={500}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box>
        <Box
          height="100%"
          justifyContent="center"
          display="flex"
          alignItems="center"
          bgcolor={corIgreja.principal}
        >
          <Box
            mt={0}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderRadius: 16 }}
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
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              height="20%"
            >
              <Box display="flex" justifyContent="center" height="100%">
                <Avatar
                  alt="Evento"
                  src={eventoSelecionado ? eventoSelecionado.LogoEvento : ''}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Box>
            <Box
              mt={0}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              height="80%"
              width="100%"
              minHeight={200}
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Box height="100%">
                  <Box
                    mt={0}
                    height="30%"
                    width="90vw"
                    //   maxWidth={450}
                    //    maxWidth={400}
                    // mt={-2} // não mexer
                    ml={0}
                    sx={{ fontWeight: 'bold', fontSize: '10px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Typography
                      style={{
                        fontSize: '16px',
                        fontFamily: 'Fugaz One',
                        color: '#fff',
                        marginTop: -0,
                      }}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      FAÇA SUA INSCRIÇÃO
                    </Typography>
                    <Box
                      color="#AAFFAA"
                      fontSize="12px"
                      fontFamily="Roboto"
                      justifyContent="center"
                      width="100%"
                      display="flex"
                    >
                      Quem Sou?
                    </Box>
                    <Box mt={0}>
                      <Box
                        mt="1vh"
                        mb={0}
                        display="flex"
                        width="100%"
                        justifyContent="center"
                      >
                        <Box>
                          <Box
                            height={35}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width={120}
                            onClick={() => {
                              setAdulto(true);
                            }}
                            bgcolor={adulto ? '#ffdd55' : '#f6f6f6'}
                            style={{
                              border: '2px solid #9e9e9e',
                              borderRadius: 6,
                              fontFamily: 'Fugaz One',
                              color: '#000',
                            }}
                          >
                            ADULTO
                          </Box>
                        </Box>
                        <Box
                          display={
                            eventoSelecionado && eventoSelecionado.TemCrianca
                              ? 'flex'
                              : 'none'
                          }
                          ml="6vw"
                        >
                          <Box
                            height={35}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width={120}
                            onClick={() => {
                              setAdulto(false);
                            }}
                            bgcolor={!adulto ? '#ffdd55' : '#f6f6f6'}
                            style={{
                              border: '2px solid #9e9e9e',
                              borderRadius: 6,
                              fontFamily: 'Fugaz One',
                              color: '#000',
                            }}
                          >
                            MENOR
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="70%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                  >
                    <Box height="100%" mt={0} width="100%">
                      <Box height="40%">
                        <Box
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
                            {!adulto ? 'CPF DO RESPONSÁVEL' : 'DIGITE SEU CPF'}
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
                              onFocus={(e) => setCPF(cpfMask(e.target.value))}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="25%"
                        width="90vw"
                        bgcolor="#fff6d5"
                      >
                        {adulto ? (
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            ml={0}
                          >
                            <Box m={1}>
                              <Box display="flex" justifyContent="center">
                                <Typography
                                  style={{
                                    fontSize: '14px',
                                    color: 'black',
                                    fontFamily: 'Fugaz One',
                                  }}
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  ATENÇÃO!!!
                                </Typography>
                              </Box>
                              {inscAdulto <
                              Number(eventoSelecionado.QtdVagaEvento) ? (
                                <Box
                                  fontSize="14px"
                                  fontFamily="Rubica"
                                  color="black"
                                  mt={0}
                                  textAlign="center"
                                >
                                  <Box>Sua inscrição é individual o CPF</Box>
                                  <Box>valerá apenas para essa inscrição</Box>
                                </Box>
                              ) : (
                                <Box
                                  fontSize="14px"
                                  fontFamily="Rubica"
                                  color="black"
                                  mt={0}
                                  textAlign="center"
                                >
                                  <Box>Infelizmente as inscrições </Box>
                                  <Box>para Adultos estam esgotadas.</Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="25%"
                            width="90vw"
                            bgcolor="#fff6d5"
                          >
                            <Box m={1}>
                              <Box display="flex" justifyContent="center">
                                <Typography
                                  style={{
                                    fontSize: '14px',
                                    color: 'black',
                                    fontFamily: 'Fugaz One',
                                  }}
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  ATENÇÃO!!!
                                </Typography>
                              </Box>
                              {console.log(
                                'oi',
                                eventoSelecionado,
                                inscC2,
                                inscC1,
                                inscAdulto,
                              )}
                              {inscC1 <
                                Number(eventoSelecionado.QtdCriancaPagante) &&
                              inscC2 <
                                Number(eventoSelecionado.QtdCriancaIsenta) ? (
                                <Box
                                  fontSize="14px"
                                  fontFamily="Rubica"
                                  color="black"
                                  mt={0}
                                  textAlign="center"
                                >
                                  <Box>O CPF do responsável vale para</Box>
                                  <Box>quantos menores for necessário</Box>
                                </Box>
                              ) : (
                                <Box
                                  fontSize="14px"
                                  fontFamily="Rubica"
                                  color="black"
                                  mt={0}
                                  textAlign="center"
                                >
                                  {inscC1 <
                                    Number(
                                      eventoSelecionado.QtdCriancaPagante,
                                    ) &&
                                  inscC2 >=
                                    Number(
                                      eventoSelecionado.QtdCriancaIsenta,
                                    ) ? (
                                    <Box>
                                      <Box>Temos vagas apenas para </Box>
                                      <Box>
                                        crianças entre{' '}
                                        {eventoSelecionado.IdadeCriancasIsenta +
                                          1}{' '}
                                        e 11 anos
                                      </Box>
                                    </Box>
                                  ) : null}
                                  {inscC1 >=
                                    Number(
                                      eventoSelecionado.QtdCriancaPagante,
                                    ) &&
                                  inscC2 <
                                    Number(
                                      eventoSelecionado.QtdCriancaIsenta,
                                    ) ? (
                                    <Box>
                                      <Box>Temos vagas apenas para </Box>
                                      <Box>
                                        crianças abaixo de{' '}
                                        {eventoSelecionado.IdadeCriancasIsenta +
                                          1}{' '}
                                        anos
                                      </Box>
                                    </Box>
                                  ) : null}
                                  {inscC1 >=
                                    Number(
                                      eventoSelecionado.QtdCriancaPagante,
                                    ) &&
                                  inscC2 >=
                                    Number(
                                      eventoSelecionado.QtdCriancaIsenta,
                                    ) ? (
                                    <Box>
                                      <Box>Infelizmente as vagas</Box>
                                      <Box>para Crianças estam esgotadas</Box>
                                    </Box>
                                  ) : null}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        )}
                      </Box>
                      <Box
                        height="38%"
                        display="flex"
                        alignItems="center"
                        width="100%"
                      >
                        <Box
                          mb={0}
                          display="flex"
                          width="100%"
                          justifyContent="center"
                        >
                          {loading ? (
                            <Box
                              display="flex"
                              width="80%"
                              height={40}
                              justifyContent="center"
                              alignItems="center"
                              style={{
                                borderRadius: 16,
                                background: '#ffdd55',
                                fontFamily: 'Fugaz One',
                              }}
                            >
                              <Oval stroke="black" width={25} height={25} />
                            </Box>
                          ) : (
                            <Button
                              style={{
                                borderRadius: 16,
                                background: '#ffdd55',
                                fontFamily: 'Fugaz One',
                                width: '80%',
                                height: 40,
                              }}
                              variant="contained"
                              value="value"
                              onClick={() => {
                                setLoading(true);
                                handleValida();
                              }}
                            >
                              FAZER INSCRIÇÃO
                            </Button>
                          )}
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
