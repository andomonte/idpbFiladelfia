import React, { useRef } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@material-ui/core/TextField';
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import FormControl from '@material-ui/core/FormControl';
import { Oval } from 'react-loading-icons';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ValidaCPF from 'src/utils/validarCPF';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import validator from 'validator';
import corIgreja from 'src/utils/coresIgreja';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();
let altura;
let largura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
// const validateDate = require('validate-date');
if (janela.width < 300) largura = 300;
else largura = janela.width;
if (janela.width > 410) largura = 410;
else largura = janela.width;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fafafa',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  imgBack: {
    //    width: '100%',
    height: altura,
    backgroundImage: "url('/images/global/fundo.png')",
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
    padding: 0,
    margin: 0,
  },
  img2: {
    maxWidth: '400px',
    maxHeight: '697px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
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
    color: '#780208',
    width: '90%',
    height: 0,
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
    background: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '18px',
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
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: largura - 50,
    height: '40px',
    fontSize: '14px',

    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
/* const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  // border: '2px solid #b91a30',
  width: janela.width,
  height: janela.height,
}; */

function Matricula() {
  const classes = useStyles();

  // const router = useRouter();
  const [nome, setNome] = React.useState('');

  const [cpf, setCPF] = React.useState('');

  const [email, setEmail] = React.useState('');

  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const [validacaoCPF, setValidacaoCPF] = React.useState('testar');
  const [validacaoEmail, setValidacaoEmail] = React.useState('testar');

  const [fPagamento, setFPagamento] = React.useState('inicio');
  const nomeRef = useRef();
  const cpfRef = useRef();
  const emailRef = useRef();
  const fpRef = useRef();
  const router = useRouter();
  const handleChangeFP = (event) => {
    setFPagamento(event.target.value);
  };
  /* const pagar = () => {
    if (email && cpf) {
      setOpen(true);
    }
  };

  const prefID = ''; */

  const comprar = () => {};
  React.useEffect(() => {
    if (!validacaoNome) {
      setOpenDrawer(true);
      setValorErro('Digite Nome e Sobrenome');
      nomeRef.current.focus();
    }
  }, [validacaoNome]);

  React.useEffect(() => {
    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar') {
      setOpenDrawer(true);
      setValorErro(validacaoCPF);
      cpfRef.current.focus();
    }
  }, [validacaoCPF]);
  React.useEffect(() => {
    if (!validacaoEmail) {
      setOpenDrawer(true);
      setValorErro('Não é um Email Válido');
      emailRef.current.focus();
    }
  }, [validacaoEmail]);
  //  setOpenDrawer(false);

  const handleDrawerClose = () => {
    if (!validacaoNome) {
      setValidacaoNome('testar');
      nomeRef.current.focus();
    }

    if (validacaoCPF !== 'testar' && validacaoCPF !== 'next') {
      setValidacaoCPF('testar');
      cpfRef.current.focus();
    }
    if (!validacaoEmail) {
      setValidacaoEmail('testar');
      emailRef.current.focus();
    }
    setOpenDrawer(false);
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;
      if (form === 'Nome') cpfRef.current.focus();
      if (form === 'CPF') emailRef.current.focus();
      if (form === 'Email') {
        const emailVal = event.target.value;
        if (validator.isEmail(emailVal)) {
          setValidacaoEmail(true);
          fpRef.current.focus();
        } else {
          setValidacaoEmail(false);
        }
      }
    }
  };
  //= ======================================================================
  // validação dos dados
  //= ======================================================================
  // Nome

  const options = [
    { value: 'CC', label: 'Cartão de Crédito' },
    { value: 'Pix', label: 'Pix' },
    { value: 'Boleto', label: 'Boleto' },
  ];

  const handleValidarNome = (e) => {
    const valorNome = e.target.value;
    comprar();
    if (!validacaoNome) nomeRef.current.focus();

    if (e.target.value !== '') {
      const regName =
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(valorNome);

      if (!vaiNome) {
        setValidacaoNome(false);
      } else {
        setValidacaoNome(true);
      }
    } else setValidacaoNome(false);
  };

  // CPF
  const handleValidarCPF = (e) => {
    const campoCPF = e.target.value;
    const valorCPF = e.target.value.replace(/\D/g, '');

    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar') {
      cpfRef.current.focus();
    }

    if (campoCPF !== '') {
      const vCPF = ValidaCPF(valorCPF);
      if (vCPF) {
        const dadosCPF = inscritos.filter(
          (val) => val.CPF === campoCPF && val.status !== 'cancelled',
        );

        if (dadosCPF.length === 0) {
          setValidacaoCPF('next');
        } else {
          setValidacaoCPF(
            `CPF já inscrito, com pagamento ${dadosCPF[0].status}`,
          );
        }
      } else setValidacaoCPF('número de CPF inválido');
      // setValidacaoCPF(vCPF);
    } else setValidacaoCPF('preencha o campo CPF');
  };

  // Email
  const handlevalidarEmail = (e) => {
    const emailVal = e.target.value;

    if (!validacaoEmail) emailRef.current.focus();
    if (validator.isEmail(emailVal)) {
      setValidacaoEmail(true);
    } else {
      setValidacaoEmail(false);
    }
  };

  const [loading, setLoading] = React.useState(false);
  const voltar = () => {
    setLoading(true);
    router.back();

    // setOpen(false);
    // window.location.reload();
  };
  //= ====================================================================
  return (
    <Box height={altura} style={{ backgroundColor: corIgreja.principal }}>
      <ClickAwayListener onClickAway={handleDrawerClose}>
        <Box>
          <Hidden smDown>
            <Box p={1} ml={1} mr={0} display="flex" alignItems="center">
              {loading ? (
                <Box>
                  <Oval stroke="white" width={25} height={25} />
                </Box>
              ) : (
                <ArrowBackIcon
                  sx={{
                    fontSize: 20,
                    color: '#fff',
                  }}
                  onClick={voltar}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="center">
              {fPagamento === 'inicio' && (
                <Box bgcolor="#" height={altura} width={largura} ml={0}>
                  <Box ml={0}>
                    <Box mt={0} ml={0}>
                      <Box>
                        <Grid item xs={2} md={3} />
                        <Grid item xs={1} md={3} />

                        <Grid item xs={9} md={3} />
                      </Box>

                      <Box display="flex" justifyContent="center">
                        <Box sx={{ color: '#fff' }} mt={5}>
                          <Box textAlign="center" sx={{ corlor: '#fff' }}>
                            <h4>DADOS DO COMPRADOR</h4>
                          </Box>
                          <Box mt={0} display="flex" flexDirection="row">
                            <Grid item xs={12} md={12}>
                              <Box mt={1} ml={3} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Nome
                                </Typography>
                              </Box>

                              <Box className={classes.novoBox} mt={-1.5}>
                                <TextField
                                  className={classes.tf_s}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                    },
                                  }}
                                  id="Nome"
                                  // label="Matricula"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={nome}
                                  variant="outlined"
                                  placeholder="Digite o Nome do Inscrito"
                                  size="small"
                                  onBlur={handleValidarNome}
                                  onChange={(e) => {
                                    setNome(e.target.value);
                                    handleDrawerClose();
                                  }}
                                  onFocus={(e) => setNome(e.target.value)}
                                  autoFocus
                                  onKeyDown={handleEnter}
                                  inputRef={nomeRef}
                                />
                              </Box>
                            </Grid>
                          </Box>
                          <Box mt={2} display="flex" flexDirection="row">
                            <Grid item xs={12} md={3}>
                              <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  CPF
                                </Typography>
                              </Box>

                              <Box className={classes.novoBox} mt={-1.5}>
                                <TextField
                                  className={classes.tf_s}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                    },
                                  }}
                                  id="CPF"
                                  inputRef={cpfRef}
                                  //                      ref={cpfRef}
                                  // // // label="CPF"
                                  type="tel"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={cpfMask(cpf)}
                                  variant="outlined"
                                  placeholder="digite o CPF do inscrito"
                                  size="small"
                                  onBlur={(e) => {
                                    if (validacaoNome) handleValidarCPF(e);
                                  }}
                                  onChange={(e) => {
                                    setCPF(e.target.value);
                                    handleDrawerClose();
                                  }}
                                  onFocus={(e) => setCPF(e.target.value)}
                                  onKeyDown={handleEnter}
                                />
                              </Box>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {fPagamento.value === 'CC' && <Box>check</Box>}

            {fPagamento.value === 'Pix' && (
              <Box mt={altura > 570 ? (altura < 630 ? 75 : 86.6) : 66}>pix</Box>
            )}

            {fPagamento.value === 'Boleto' && (
              <Box mt={altura > 570 ? (altura < 630 ? 75 : 86.6) : 66}>
                Boleto
              </Box>
            )}

            <Drawer
              variant="persistent"
              anchor="bottom"
              open={openDrawer}
              style={{ width: 400 }}
            >
              <Box
                display="flex"
                justifyContent="center"
                sx={{ background: '#ffebee' }}
              >
                <Box height={200} width={380}>
                  <Alert onClose={handleDrawerClose} severity="error">
                    <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                    <strong>{valorErro}</strong>
                  </Alert>
                </Box>
              </Box>
            </Drawer>
          </Hidden>
          <Hidden mdUp>
            <Box
              width={janela.width > 500 ? 500 : largura}
              bgcolor="#780208"
              height={altura}
            >
              {fPagamento === 'inicio' && (
                <Box width="100%" ml={0} display="flex" justifyContent="center">
                  <Box ml={0}>
                    <Box mt={0} ml={0}>
                      <Box>
                        <Grid item xs={2} md={3}>
                          <Box
                            height={10}
                            p={1}
                            ml={0}
                            mr={0}
                            mt={2}
                            display="flex"
                            alignItems="center"
                          >
                            <ArrowBackIcon
                              sx={{
                                fontSize: 20,
                                color: '#fff',
                              }}
                              onClick={voltar}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={1} md={3} />

                        <Grid item xs={9} md={3} />
                      </Box>

                      <Box display="flex" justifyContent="center">
                        <Box sx={{ color: '#fff' }} mt={5}>
                          <Box textAlign="center" sx={{ corlor: '#fff' }}>
                            <h4>DADOS DO COMPRADOR</h4>
                          </Box>
                          <Box mt={0} display="flex" flexDirection="row">
                            <Grid item xs={12} md={12}>
                              <Box mt={1} ml={3} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Nome
                                </Typography>
                              </Box>

                              <Box className={classes.novoBox} mt={-1.5}>
                                <TextField
                                  className={classes.tf_s}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                    },
                                  }}
                                  id="Nome"
                                  // label="Matricula"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={nome}
                                  variant="outlined"
                                  placeholder="Digite o Nome do Inscrito"
                                  size="small"
                                  onBlur={handleValidarNome}
                                  onChange={(e) => {
                                    setNome(e.target.value);
                                    handleDrawerClose();
                                  }}
                                  onFocus={(e) => setNome(e.target.value)}
                                  autoFocus
                                  onKeyDown={handleEnter}
                                  inputRef={nomeRef}
                                />
                              </Box>
                            </Grid>
                          </Box>
                          <Box mt={2} display="flex" flexDirection="row">
                            <Grid item xs={12} md={3}>
                              <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  CPF
                                </Typography>
                              </Box>

                              <Box className={classes.novoBox} mt={-1.5}>
                                <TextField
                                  className={classes.tf_s}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                    },
                                  }}
                                  id="CPF"
                                  inputRef={cpfRef}
                                  //                      ref={cpfRef}
                                  // // // label="CPF"
                                  type="tel"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={cpfMask(cpf)}
                                  variant="outlined"
                                  placeholder="digite o CPF do inscrito"
                                  size="small"
                                  onBlur={(e) => {
                                    if (validacaoNome) handleValidarCPF(e);
                                  }}
                                  onChange={(e) => {
                                    setCPF(e.target.value);
                                    handleDrawerClose();
                                  }}
                                  onFocus={(e) => setCPF(e.target.value)}
                                  onKeyDown={handleEnter}
                                />
                              </Box>
                            </Grid>
                          </Box>

                          <Box mt={2} display="flex" flexDirection="row">
                            <Grid item xs={12} md={6}>
                              <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Email
                                </Typography>
                              </Box>
                              <Box className={classes.novoBox} mt={-1.5}>
                                <TextField
                                  className={classes.tf_s}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                    },
                                  }}
                                  id="Email"
                                  type="text"
                                  InputLabelProps={{
                                    style: {
                                      textTransform: 'uppercase',
                                    },
                                    shrink: true,
                                  }}
                                  value={email}
                                  variant="outlined"
                                  placeholder="email para envio de comprovante"
                                  size="small"
                                  onBlur={(e) => {
                                    if (validacaoCPF === 'next') {
                                      handlevalidarEmail(e);
                                    }
                                  }}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleDrawerClose();
                                  }}
                                  onFocus={(e) => setEmail(e.target.value)}
                                  onKeyDown={handleEnter}
                                  inputRef={emailRef}
                                />
                              </Box>
                            </Grid>
                          </Box>
                          <Box
                            mt={1}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Box mt={1}>
                              <FormControl>
                                <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Forma de Pagamento
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  //                      height={300}
                                  style={{}}
                                >
                                  <NativeSelect
                                    //                        className={classes.tf_}
                                    style={{
                                      width: '100%',
                                      marginLeft: 0,
                                      marginRight: 0,
                                    }}
                                    inputRef={fpRef}
                                    id="fPagamento"
                                    value={fPagamento}
                                    onChange={handleChangeFP}
                                    input={<BootstrapInput />}
                                    disabled={
                                      !(
                                        validacaoEmail === true &&
                                        validacaoCPF === 'next' &&
                                        validacaoNome === true
                                      )
                                    }
                                  >
                                    <option value={0}>
                                      Escolha a Forma de pagamento
                                    </option>

                                    <option value="CC">
                                      Cartão de Crédito
                                    </option>
                                    <option value="Pix">Pix</option>
                                    <option value="Boleto">Boleto</option>
                                  </NativeSelect>
                                </Box>
                              </FormControl>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {fPagamento === 'CC' && <Box>Check</Box>}

            {fPagamento === 'Pix' && <Box>pix</Box>}
            {fPagamento === 'CC' && <Box>CC</Box>}
            {fPagamento === 'Boleto' && <Box>Bol</Box>}
            {/* {open && <PagCC email={email} cpf={cpf} />} */}
            <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
              <Box height={100} sx={{ background: '#ffebee' }}>
                <Alert onClose={handleDrawerClose} severity="error">
                  <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                  <strong>{valorErro}</strong>
                </Alert>
              </Box>
            </Drawer>
          </Hidden>
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default Matricula;
