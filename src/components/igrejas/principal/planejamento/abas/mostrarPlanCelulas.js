import { Box, Grid, Paper, TextField, Button } from '@material-ui/core';
import React from 'react';
import Stack from '@mui/material/Stack';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';

import PegaData from 'src/utils/getDataQuarta';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Erros from 'src/utils/erros';
import { IoArrowUndoSharp } from 'react-icons/io5';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import 'react-image-crop/dist/ReactCrop.css';

// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  textField: {
    textAlign: 'center',
    fontSize: '12px',
  },
  alignBox: {
    padding: theme.spacing(0),
    // display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // height: '330px',
    marginTop: 20,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: 'auto',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  logo: {
    height: '100%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  caption: {
    marginTop: -5,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 1000,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '40px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  typography: {
    color: 'black',
    fontWeight: 1000,
    marginTop: -10,
    marginLeft: 5,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  rotulo: {
    color: 'blue',
    textTransform: 'capitalize',
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '16px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',
    backgroundColor: '#ffff',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#f5f5f5',

    width: '96%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    backgroundColor: '#f0f4c3',

    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    backgroundColor: '#f0f4c3',
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  tf_s2: {
    textAlign: 'center',
    display: 'flex',
    marginLeft: 28,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  root: {
    // position: 'absolute',
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

function RelatorioCelebracao({
  dadosSem,
  semanaEnviada,
  AnoPesquisado,
  setOpenPlan,
}) {
  //  const classes = useStyles();
  // const router = useRouter();
  const classes = useStyles();

  const nomesCel = [];
  nomesCel[0] = dadosSem;

  const dadosUser = [];
  dadosUser[0] = dadosSem;
  //--------------------------------------------------------------------------

  const [values] = React.useState(dadosSem.Encontro);
  const [values2] = React.useState(dadosSem.Exaltacao);
  const [values3] = React.useState(dadosSem.Edificacao);
  const [values4] = React.useState(dadosSem.Evangelismo);
  const [values5] = React.useState(dadosSem.Lanche);
  const [valueAnfitriao] = React.useState(dadosSem.Anfitriao);

  const [multiplicacao, setMultiplicacao] = React.useState(
    dadosSem.Multiplicacao ? dadosSem.Multiplicacao : '',
  );

  const [objetivo] = React.useState(dadosSem.Fase);

  const [horario] = React.useState(dadosSem.Horario);

  const multiplicacaoRef = React.useRef();
  const anfitriaoRef = React.useRef();

  const [openErro, setOpenErro] = React.useState(false);

  const [inputValue] = React.useState(
    moment(PegaData(semanaEnviada, AnoPesquisado)).format('DD/MM/YYYY'),
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={300}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="100vh"
    >
      <Box
        width="96%"
        height="97%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={16}
        bgcolor={corIgreja.principal} // cor principal tela inteira
      >
        <Box
          height="100%"
          minWidth={300}
          width="100%"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box minWidth={300} height="100%" width="100%" maxWidth="1410px">
            <Box height="100%">
              <Box
                height="91%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  height="100%"
                  width="100%"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    width="100%"
                    height="100%"
                  >
                    <Box height="100%" width="100%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                        height="100%"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt={2}
                          ml={0}
                          width="100%"
                          height="100%"
                        >
                          <Box width="100%">
                            <Box
                              color={corIgreja.iconeOn}
                              fontFamily="arial black"
                              fontSize="20px"
                              mb={2}
                              mt={-2}
                              textAlign="center"
                            >
                              PLANEJAMENTO DA CÉLULA
                            </Box>
                            <TableContainer
                              sx={{
                                border: '1px solid ',
                                borderColor: corIgreja.principal2,
                                height: '78vh',
                                width: '100%',
                                minHeight: 280,
                              }}
                            >
                              <Grid container>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      DATA DA REUNIÃO
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.6}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                                height: 20,
                                              },
                                            }}
                                            value={inputValue}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      OBJETIVO CENTRAL DA REUNIÃO
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={objetivo}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      MULTIPLICAÇÃO
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Box>
                                      <TextField
                                        inputProps={{
                                          style: {
                                            textAlign: 'center',
                                          },
                                        }}
                                        className={classes.tf_m}
                                        id="Multiplicacao"
                                        type="tel"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={multiplicacao}
                                        variant="standard"
                                        placeholder="dd/mm/aaaa"
                                        onChange={(e) => {
                                          setMultiplicacao(e.target.value);
                                        }}
                                        onFocus={(e) => {
                                          setMultiplicacao(e.target.value);
                                        }}
                                        inputRef={multiplicacaoRef}
                                      />
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      HORÁRIO DA CÉLULA
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={horario}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      ANFITRIÃO DA CÉLULA
                                    </Typography>
                                  </Box>

                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={valueAnfitriao}
                                            className={classes.textField}
                                            inputRef={anfitriaoRef}
                                            placeholder="Na casa de quem será a Célula"
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Quebra Gelo
                                    </Typography>
                                  </Box>

                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={values}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Louvor
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={values2}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Edificação
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={values3}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Compartilhando a Visão
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={values4}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      LANCHE
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-1.8}>
                                    <Paper
                                      style={{
                                        marginBottom: 15,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        <Stack spacing={2} sx={{ width: 300 }}>
                                          <TextField
                                            inputProps={{
                                              style: {
                                                textAlign: 'center',
                                              },
                                            }}
                                            value={values5}
                                            className={classes.textField}
                                            placeholder=""
                                          />
                                        </Stack>
                                      </Box>
                                    </Paper>
                                  </Box>
                                </Grid>
                              </Grid>
                            </TableContainer>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                height="5%"
                minHeight={45}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  height="100%"
                  width="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                >
                  <Box width="100%" ml={1}>
                    <Box mb={0}>
                      <Grid container spacing={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Paper
                              style={{
                                borderRadius: 16,
                                textAlign: 'center',
                                background: '#ffffaa',
                                height: 40,
                              }}
                            >
                              <Button
                                onClick={() => {
                                  setOpenPlan(false);
                                }}
                                startIcon={<IoArrowUndoSharp color="blue" />}
                              >
                                <Box
                                  mr={2}
                                  ml={2}
                                  mt={0.3}
                                  sx={{ fontFamily: 'arial black' }}
                                >
                                  VOLTAR
                                </Box>
                              </Button>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
    </Box>
  );
}

export default RelatorioCelebracao;
