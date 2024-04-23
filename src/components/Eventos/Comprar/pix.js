import React from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Oval } from 'react-loading-icons';
import { TiArrowBack } from 'react-icons/ti';
import Avatar from '@mui/material/Avatar';
import TamanhoJanela from 'src/utils/getSize';
import ValidaCPF from 'src/utils/validarCPF';
import ValidaCNPJ from 'src/utils/validarCNPJ';
import Drawer from '@material-ui/core/Drawer';
import corIgreja from 'src/utils/coresIgreja';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from 'src/components/services/api';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';

const janela2 = TamanhoJanela();
let largura2 = janela2.width;
if (largura2 > 400) largura2 = 400;
let altura2;
if (janela2.height < 500) altura2 = 500;
else altura2 = janela2.height;
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  QrCode: {
    //    maxWidth: '1410px',
    //    maxHeight: '600px',
    width: '70%',
    height: '70%',
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
    background: '#790208',
    '&:hover': {
      backgroundColor: '#990208',
    },
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#e0711a',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
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
    color: 'green',
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
    border: '2px solid #1a237e',
  },
  paper: {
    // backgroundColor: '#1a237e', // theme.palette.background.paper,
    backgroundImage: `url('/images/evento/fundo.png')`,
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
    border: '2px solid #1a237e',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: altura2,

    //  overflow: 'hidden',
    width: largura2,
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
}));

// email, cpf, nome, qtyA, qtyC, total, setFPagamento
function Pix({ dadosPix }) {
  const classes = useStyles();

  const { estadia } = dadosPix;
  const { genero } = dadosPix;
  const { grau } = dadosPix;
  const { horario } = dadosPix;
  const { igrejas } = dadosPix;
  const { jEstadual } = dadosPix;
  const { nascimento } = dadosPix;
  const { dataChegada } = dadosPix;
  const { Responsavel } = dadosPix;
  const { email } = dadosPix;
  const { cpf } = dadosPix;
  const { nome } = dadosPix;
  const { Secretaria } = dadosPix;
  const { total } = dadosPix;
  const { qtyA } = dadosPix;
  const { qtyC1 } = dadosPix;
  const { qtyC2 } = dadosPix;
  const { fpag } = dadosPix;
  const { fone } = dadosPix;
  const { transporte } = dadosPix;
  const { Evento } = dadosPix;
  const { Jurisdicao } = dadosPix;
  const { Distrito } = dadosPix;
  const { logoEvento } = dadosPix;

  const [docNumber, setDocNumber] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [tipoDoc, setTipoDoc] = React.useState('');
  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // const [open, setOpen] = React.useState(true);

  const [messageErro, setMessageErro] = React.useState(0);

  // const [fPagamento, setFPagamento] = React.useState('');

  const [openDrawerErro, setOpenDrawerErro] = React.useState(false);

  const [carregar, setCarregar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const eventName = e.target.name;
    const eventValue = e.target.value;
    if (eventName === 'identificationNumber') {
      const onlyNumber = eventValue.replace(/([^0-9])/g, '');
      setDocNumber(onlyNumber);
      if (onlyNumber.length > 11) setTipoDoc('CNPJ');
      else setTipoDoc('CPF');
    }
  };
  const handleFocus = () => {
    setOpenDrawer(false);
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const { form } = event.target;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  /* const handleRouter = () => {
    router.push({
      pathname: '/eventoIdpb/chavePix',
      query: { idCompra, qrCode, qrCodeCopy },
    });
  }; */
  const voltar = () => {
    setLoading(true);
    router.push({
      pathname: './comprar',
    });
  };
  const FecharCompra = () => {
    router.push({
      pathname: '/eventoIdpb',
      query: { Evento },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const comprar = () => {
    let url = '';

    url = '/api/mercadoPagoPix';

    api
      .post(url, {
        nome,
        cpf,
        qtyA: Number(qtyA),
        qtyC1: Number(qtyC1),
        qtyC2: Number(qtyC2),
        total,
        email,
        fone,
        tipoDoc,
        docNumber,
        transactionAmount: Number(total),
        paymentMethodId: 'pix',
        description: Evento,
        docType: tipoDoc,
        estadia,
        genero,
        grau,
        horario,
        igrejas,
        jEstadual,
        nascimento,
        dataChegada,
        Responsavel,
        Secretaria,
        fpag,
        transporte,
        Evento,
        Jurisdicao,
        Distrito,
      })

      .then((response) => {
        //        const prefID = response.data.body.point_of_interaction.transaction_data;
        if (!response.data.message) {
          const dados = { id: '', qrCode: '', qrCodeCopy: '' };

          if (response.data.body.id) {
            dados.id = response.data.body.id;
          }
          if (
            response.data.body.point_of_interaction.transaction_data.qr_code &&
            response.data.body.point_of_interaction.transaction_data
              .qr_code_base64
          ) {
            dados.qrCode =
              response.data.body.point_of_interaction.transaction_data.qr_code_base64;
            dados.qrCodeCopy =
              response.data.body.point_of_interaction.transaction_data.qr_code;
            const { id } = dados;
            const { qrCode } = dados;
            const { qrCodeCopy } = dados;

            router.push({
              pathname: './chavePix',
              query: { id, qrCodeCopy, qrCode, Evento, logoEvento },
            });
            //            setOpenDrawerOK(true);
          }
        } else {
          setValorErro(
            `Não conseguimos fazer seu pagamento. Será necessário refazer sua compra.`,
          );
          setOpenDrawerErro(true);
          setMessageErro(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  const atualizar = () => {
    let send = false;

    if (docNumber.length > 10) {
      if (tipoDoc === 'CPF') {
        const vCPF = ValidaCPF(docNumber);
        if (vCPF) {
          send = true;
        } else {
          setValorErro('número de CPF inválido');
          setOpenDrawer(true);
          setCarregar(false);
        }
        // setValidacaoCPF(vCPF);
      } else {
        const vCPF = ValidaCNPJ(docNumber);
        if (vCPF) {
          send = true;
        } else {
          setValorErro('número de CNPJ inválido');
          setOpenDrawer(true);
          setCarregar(false);
        }
      }
    } else {
      setValorErro('Digite o CPF ou CNPJ do Pagante');
      setOpenDrawer(true);
    }
    if (send) {
      setCarregar(true);

      comprar();
    }
    //    setOpenDrawerOK(true);
  };

  // console.log(janela2.height);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [altura, setAltura] = React.useState(altura2);
  React.useEffect(() => {
    const handleResize = () => {
      const tela = TamanhoJanela();
      let alturas;

      if (tela.height < 500) alturas = 500;
      else alturas = tela.height;
      // const validateDate = require('validate-date');

      setAltura(alturas);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="row"
      alignItems="center"
      height={altura - 50}
    >
      <Box height="100%">
        <Box>
          <form id="form-checkout">
            <Box height="100%">
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Box width="100%" height="100%">
                  <Box width="100%" height="100%">
                    <Box width="100%" height="100%">
                      <Box
                        height="56px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box width="10%">
                          <Box mt={0} ml={0} height="100%" width="100%">
                            <Box display="flex" alignItems="center">
                              {loading ? (
                                <Box>
                                  <Oval stroke="white" width={25} height={25} />
                                </Box>
                              ) : (
                                <TiArrowBack
                                  size={30}
                                  color="white"
                                  onClick={voltar}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          color="white"
                          textAlign="center"
                          mt={0}
                          ml={0}
                          width="90%"
                          fontFamily="Fugaz One"
                          fontSize="14px"
                        >
                          {Evento.toUpperCase()}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="row"
                      alignItems="center"
                      width="94vw"
                      height={altura - 85}
                      minHeight={350}
                      mt={-0}
                      bgcolor={corIgreja.principal}
                    >
                      <Box>
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
                              src={logoEvento || ''}
                              sx={{
                                width: 200,
                                height: 200,
                              }}
                            />
                          </Box>
                        </Box>
                        <Box width="100%">
                          <Box display="flex" justifyContent="center">
                            <Box>
                              <Box>
                                <Box
                                  style={{
                                    fontSize: '16px',
                                    fontFamily: 'arial Black',
                                  }}
                                  color="white"
                                  textAlign="center"
                                >
                                  PAGAR - R$ {dadosPix.total},00 COM PIX
                                </Box>
                                <Box width="100%" mt={5} ml={0}>
                                  <Grid item xs={12} md={12}>
                                    <Box
                                      textAlign="center"
                                      color="white"
                                      ml={0}
                                    >
                                      Digite o CPF ou CNPJ do Pagante
                                    </Box>
                                  </Grid>
                                </Box>
                              </Box>
                              <Box display="flex" m={0}>
                                <Grid item xs={12} md={12}>
                                  <Box mt={0.4}>
                                    <input
                                      autoComplete="off"
                                      style={{ background: '#fafafa' }}
                                      type="tel"
                                      name="identificationNumber"
                                      id="form-checkout__identificationNumber"
                                      className={classes.tf_input}
                                      value={docNumber && docNumber}
                                      onKeyDown={handleEnter}
                                      onFocus={handleFocus}
                                      onChange={handleInputChange}
                                      placeholder="Somente Números"
                                      onBlur={(e) => {
                                        setDocNumber(e.target.value);
                                      }}
                                    />
                                  </Box>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            mt={2}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              mt={3}
                              sx={{
                                height: 70,
                                width: '100vw',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Box mt={1}>
                                <Box>
                                  <Button
                                    style={{
                                      borderRadius: 16,
                                      background: '#ffdd55',
                                      fontFamily: 'Fugaz One',
                                    }}
                                    variant="contained"
                                    value="value"
                                    onClick={atualizar}
                                  >
                                    {!carregar ? (
                                      'Gerar chave Pix'
                                    ) : (
                                      <Box
                                        width="100%"
                                        height="100%"
                                        alignItems="center"
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Box>Gerar chave Pix</Box>

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
                          <Box
                            width="100vw"
                            display="flex"
                            justifyContent="center"
                          >
                            <Box
                              width="94%"
                              mt={1}
                              ml={0}
                              height={100}
                              bgcolor="#eadafa"
                            >
                              <Grid item xs={12} md={12}>
                                <Box m={1}>
                                  <Box
                                    mt={-0.5}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    <Typography
                                      style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        fontFamily: 'Arial Black',
                                        fontWeight: 'bold',
                                      }}
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      ATENÇÃO!!!
                                    </Typography>
                                  </Box>
                                  <Box
                                    mt={0}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    <Typography
                                      className={classes.texto}
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Sua chave Pix durará 30 minutos
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box
                                  mt={-1.5}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Typography
                                    className={classes.texto}
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Após esse tempo sua solicitação
                                  </Typography>
                                </Box>
                                <Box
                                  mt={-0.5}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Typography
                                    className={classes.texto}
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    será desconsiderada, obrigado
                                  </Typography>
                                </Box>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>

          <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
            <Box height={260} sx={{ background: '#ffebee' }}>
              <Alert onClose={handleDrawerClose} severity="error">
                <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                <strong>{valorErro}</strong>
              </Alert>
            </Box>
          </Drawer>
          <Drawer variant="persistent" anchor="bottom" open={openDrawerErro}>
            <Box height={janela2.height} sx={{ background: '#ffebee' }}>
              <Box mt={25}>
                {messageErro ? (
                  <Box>
                    <Box display="flex" justifyContent="center">
                      <h2>DADOS ERRADOS !</h2>
                    </Box>
                    <Box m={2} textAlign="center">
                      <strong>{valorErro}</strong>
                    </Box>

                    <Box mt={4} textAlign="center">
                      <strong>A operadora Informou:</strong>
                    </Box>
                    <Box m={0} textAlign="center">
                      <strong>{messageErro}</strong>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box display="flex" justifyContent="center">
                      <h2>ERRO NO PAGAMENTO !</h2>
                    </Box>
                    <Box m={2} textAlign="center">
                      <strong>{valorErro}</strong>
                    </Box>
                  </Box>
                )}
                <Box
                  mt={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    className={classes.button2}
                    variant="contained"
                    id="reload"
                    onClick={FecharCompra}
                  >
                    Fechar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}
export default Pix;
