import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';
import TamanhoJanela from 'src/utils/getSize';
import ValidaCPF from 'src/utils/validarCPF';
import ValidaCNPJ from 'src/utils/validarCNPJ';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import api from 'src/components/services/api';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import GerarPdf from './pdfs/pdf';

const janela = TamanhoJanela();
let largura = janela.width;
if (largura > 400) largura = 400;
let altura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
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
    background: '#b91a30',
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
    border: '2px solid #b91a30',
  },
  paper: {
    // backgroundColor: '#b91a30', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
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
    border: '2px solid #b91a30',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: altura,

    //  overflow: 'hidden',
    width: largura,
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#b91a30'),
    backgroundColor: '#b91a30',
    '&:hover': {
      backgroundColor: '#b91a30',
    },
  },
}))(Button);
const Pix = ({ email, cpf, nome, qtyA, qtyC, total }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [docNumber, setDocNumber] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [tipoDoc, setTipoDoc] = React.useState('');
  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDrawerFim, setOpenDrawerFim] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [qrCode, setQrCode] = React.useState('');
  const [qrCodeCopy, setQrCodeCopy] = React.useState('');
  const [messageErro, setMessageErro] = React.useState(0);
  const [idCompra, setIdCompra] = React.useState('');
  // const [fPagamento, setFPagamento] = React.useState('');
  const [openDrawerOK, setOpenDrawerOK] = React.useState(false);
  const [openDrawerErro, setOpenDrawerErro] = React.useState(false);

  const [carregar, setCarregar] = React.useState(false);
  const router = useRouter();
  const handleInputChange = (e) => {
    const eventName = e.target.name;
    const eventValue = e.target.value;
    if (eventName === 'identificationNumber') {
      setDocNumber(e.target.value);
      if (eventValue.length > 11) setTipoDoc('CNPJ');
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
  const janela = TamanhoJanela();
  const handleRouter = () => {
    router.push({
      pathname: '/global/chavePix',
      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const voltar = () => {
    router.push({
      pathname: '/global/comprar',
      //   query: { dadosMesa2, numeroGame },
    });
    //  setOpen(false);
    // window.location.reload();
  };
  const FecharCompra = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };
  const comprar = () => {
    api
      .post('/api/mercadoPagoPix', {
        nome,
        cpf,
        qtyA,
        qtyC,
        total,
        email,
        tipoDoc,
        docNumber,
        transactionAmount: '50',
        description: 'Inscrição Conferência Global',
        paymentMethodId: 'pix',
      })

      .then((response) => {
        //        const prefID = response.data.body.point_of_interaction.transaction_data;
        if (!response.data.message) {
          const dados = { id: '', qrCode: '', qrCodeCopy: '' };

          if (response.data.body.id) {
            setIdCompra(response.data.body.id);
            dados.id = response.data.body.id;
          }
          if (
            response.data.body.point_of_interaction.transaction_data.qr_code &&
            response.data.body.point_of_interaction.transaction_data
              .qr_code_base64
          ) {
            setQrCodeCopy(
              response.data.body.point_of_interaction.transaction_data.qr_code,
            );
            setQrCode(
              response.data.body.point_of_interaction.transaction_data
                .qr_code_base64,
            );
            dados.qrCode =
              response.data.body.point_of_interaction.transaction_data.qr_code_base64;
            dados.qrCodeCopy =
              response.data.body.point_of_interaction.transaction_data.qr_code;
            const { id } = dados;
            const { qrCode } = dados;
            const qrCodeCopy = dados;
            router.push({
              pathname: '/global/chavePix',
              query: { id, qrCodeCopy, qrCode },
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
  const concluir = () => {
    const idCompra2 = '1244778917';

    api
      .post('/api/confirmPayment', { id: idCompra2 })

      .then((response) => {
        // console.log(response);
        if (response.data.body) {
          if (response.data.body.status === 'approved') setOpenDrawerFim(true);
          if (response.data.body.status === 'pending') setOpenDrawerErro(true);
        }
        if (response.data.message) {
          setValorErro(`Ainda não Detectamos o pagamento do seu Pix.`);
          setOpenDrawerErro(true);
          setMessageErro(response.data.message);
        }
        /* if (
          response.data.status === 'approved' ||
          response.data.status === 'in_process'
        ) {
          // const status = response.data.status_detail;

          if (response.data.status === 'in_process') {
            setValorErro(
              'Estamos processando o pagamento. Não se preocupe, em menos de 2 dias úteis informaremos por e-mail se foi creditado.',
            );
            setMessageErro(response.data.status_detail);
            setOpenDrawerOK(true);
          }

          if (response.data.status_detail === 'accredited') {
            setValorErro(
              'Pronto, seu pagamento foi aprovado! Para conferir seu Ticket é só FECHAR, clicar em MEU TICKET e digitar seu CPF.',
            );
            setMessageErro(response.data.status_detail);
            setOpenDrawerOK(true);
          }
        }
        if (response.data.status === 'rejected') {
          const dadosErro = erros.filter(
            (val) => val.erro === response.data.status_detail,
          );
          setValorErro(dadosErro[0].mensagem);
          setOpenDrawerFinal(true);
          setMessageErro(response.data.message);
        }
        if (response.data.message) {
          setValorErro(
            `Não conseguimos fazer seu pagamento, devido erro no preenchimento de dados. Será necessário refazer sua compra.`,
          );
          setOpenDrawerFinal(true);
          setMessageErro(response.data.message);
        }
        setCarregar(false); */
      })

      .catch(() => {
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

  // console.log(janela.height);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,

    border: '2px solid #b91a30',
    width: '95%',
  };

  const copyToClipboard = () => {
    // toast('copiado!');
    copy(qrCodeCopy);
    toast.info('copiado !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box height={altura} mt={0}>
          <Box className={classes.root}>
            <form id="form-checkout">
              <Box height={altura}>
                <Box display="flex" justifyContent="center">
                  <Box>
                    <Box>
                      <Box>
                        <Box display="flex" justifyContent="center">
                          <Box height={altura} width={largura} ml={0}>
                            <img
                              src="/images/global/fundo.png"
                              alt=""
                              width="100%"
                              height={altura}
                            />
                          </Box>
                        </Box>

                        <Box
                          mt={
                            altura > 570
                              ? altura < 630
                                ? (-12.4 * altura) / 100
                                : (-12.3 * altura) / 100
                              : (-12.5 * altura) / 100
                          }
                          ml={3}
                        >
                          <Grid item xs={2} md={12}>
                            <Box height={100} p={1} mt={1} ml={0}>
                              <ArrowBackIcon
                                sx={{
                                  fontSize: 20,
                                  color: '#fff',
                                }}
                                onClick={voltar}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={1} md={12} />

                          <Grid item xs={9} md={12} />
                        </Box>
                      </Box>
                      <Box mt={20} display="flex" justifyContent="center">
                        <Box>
                          <Box width="100%">
                            <Box display="flex" justifyContent="center">
                              <Box>
                                <Box>
                                  <Box
                                    width="100%"
                                    mt={
                                      altura > 570
                                        ? altura < 630
                                          ? (-2 * altura) / 100
                                          : (-1.2 * altura) / 100
                                        : (-2.5 * altura) / 100
                                    }
                                    ml={0}
                                  >
                                    <Grid item xs={12} md={12}>
                                      <Box ml={0}>
                                        <Typography
                                          className={classes.texto}
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                        >
                                          Digite o CPF ou CNPJ do Pagante
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Box>
                                </Box>
                                <Box display="flex" m={0}>
                                  <Grid item xs={12} md={12}>
                                    <Box mt={0.4}>
                                      <input
                                        style={{ background: '#fafafa' }}
                                        type="text"
                                        name="identificationNumber"
                                        id="form-checkout__identificationNumber"
                                        className={classes.tf_input}
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
                                  <Box
                                    mt={
                                      altura > 570
                                        ? altura < 630
                                          ? (-0.5 * altura) / 100
                                          : (0 * altura) / 100
                                        : (-0.5 * altura) / 100
                                    }
                                  >
                                    <Button
                                      className={classes.button2}
                                      variant="contained"
                                      id="pagPix"
                                      onClick={atualizar}
                                      style={{
                                        width: '100%',
                                        borderRadius: 15,
                                      }}
                                      // inputRef={fpRef}
                                    >
                                      Gerar chave Pix
                                    </Button>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              minWidth={350}
                              display="flex"
                              justifyContent="center"
                            >
                              <Box
                                minWidth={300}
                                mt={altura > 570 ? (altura < 630 ? 3 : 6) : 1}
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
                      {carregar && (
                        <Box className={classes.novoBox} mt={1}>
                          <LinearProgress />
                          <small>Carregando...</small>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>

            <Drawer variant="persistent" anchor="bottom" open={openDrawerOK}>
              <Box height={janela.height} sx={{ background: '#FFFF' }}>
                <Box mt={1} borderRadius={16} {...defaultProps}>
                  <Box mt={-1} ml={0}>
                    <img
                      src="/images/global/global1.png"
                      alt=""
                      width="100.8%"
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={0}
                    mb={0}
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '14px',
                        color: '#b91a30',
                        fontWeight: 'bold',
                      }}
                    >
                      NO APP DO SEU BANCO SCANEI O
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={0}
                    sx={{ fontSize: 'bold', color: '#b91a30' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '14px',
                        color: '#b91a30',
                        fontWeight: 'bold',
                      }}
                    >
                      QR CODE DO PIX
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={0}
                    sx={{ fontSize: 'bold', color: '#b91a30' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '14px',
                        color: '#3f51b5',
                        fontWeight: 'bold',
                      }}
                    >
                      OU
                    </Typography>
                  </Box>
                  <Box
                    mt={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ColorButton
                      variant="contained"
                      className={classes.button2}
                      id="reload"
                      onClick={copyToClipboard}
                    >
                      <small>
                        CLICK AQUI PARA COPIAR O CÓDIGO E COLAR NO APP DO SEU
                        BANCO
                      </small>
                    </ColorButton>
                  </Box>
                  <Box mt={1} textAlign="center">
                    {qrCode && (
                      <img
                        className={classes.QrCode}
                        src={`data:image/jpeg;base64,${qrCode}`}
                        alt="qrCode"
                      />
                    )}
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

                  <Box
                    mt={2}
                    mb={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      className={classes.button1}
                      variant="contained"
                      id="reload"
                      onClick={concluir}
                    >
                      CONCLUIR
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
            <Drawer variant="persistent" anchor="bottom" open={openDrawerFim}>
              {/* <Box height={janela.height} sx={{ background: '#FFFF' }}>
          <Box
            height={janela.height - 10}
            mt={1}
            borderRadius={16}
            {...defaultProps}
          >
            <Box mt={-1} ml={0}>
              <img src="/images/global/global1.png" alt="" width="100.8%" />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={10}
              mb={0}
              sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                Recebemos seu Pagamento, Obrigado!!!
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={0}
              mb={0}
              sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                Você pode acessar seu tickt na página inical
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={5}
              sx={{ fontSize: 'bold', color: '#b91a30' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                ANOTE SEU CÓDIGO DE PAGAMENTO
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={0}
              sx={{ fontSize: 'bold', color: '#b91a30' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '28px',
                  color: '#3f51b5',
                  fontWeight: 'bold',
                }}
              >
                {idCompra}
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

            <Box
              mt={8}
              mb={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                className={classes.button1}
                variant="contained"
                id="reload"
                onClick={handlefechar}
              >
                CONCLUIR
              </Button>
            </Box>
          </Box>
        </Box> */}
              <GerarPdf
                nome={nome}
                codigo={idCompra}
                adultos={qtyA}
                criancas={qtyC}
                valor={total}
                fp="Pix"
                status="PAGAMENTO CONFIRMADO"
                parcelas="PARCELA ÚNICA"
                cpf={cpf}
              />
            </Drawer>
            <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
              <Box height={260} sx={{ background: '#ffebee' }}>
                <Alert onClose={handleDrawerClose} severity="error">
                  <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                  <strong>{valorErro}</strong>
                </Alert>
              </Box>
            </Drawer>
            <Drawer variant="persistent" anchor="bottom" open={openDrawerErro}>
              <Box height={janela.height} sx={{ background: '#ffebee' }}>
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
    </>
  );
};
export default Pix;
