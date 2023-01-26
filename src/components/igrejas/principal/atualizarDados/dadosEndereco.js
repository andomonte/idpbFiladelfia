import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { Oval } from 'react-loading-icons';
import { Box } from '@mui/material';
import React from 'react';
// import Image from 'next/image';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';
import axios from 'axios';
import 'react-image-crop/dist/ReactCrop.css';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import useSWR, { mutate } from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
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
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
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
    backgroundColor: '#ffff',

    width: '100%',
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

function DadosEndereco({ rolMembros, perfilUser }) {
  const classes = useStyles();
  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );

  const [logradouro, setLogradouro] = React.useState(dadosUser[0].Logradouro);
  const [numero, setNumero] = React.useState(dadosUser[0].Numero);
  const [complemento, setComplemento] = React.useState(
    dadosUser[0].Complemento,
  );
  const [bairro, setBairro] = React.useState(dadosUser[0].Bairro);
  const [nomeNucleo, setNomeNucleo] = React.useState(dadosUser[0].nomeNucleo);
  const [cidade, setCidade] = React.useState(dadosUser[0].nomeNucleo);
  const [cep, setCEP] = React.useState(dadosUser[0].CEP);
  const [uf, setUF] = React.useState(dadosUser[0].UF);

  const [validarLogradouro, setValidarLogradouro] = React.useState('sim');
  const [validarNumero, setValidarNumero] = React.useState('sim');
  const [validarComplemento, setValidarComplemento] = React.useState('sim');
  const [validarBairro, setValidarBairro] = React.useState('sim');
  const [validarLocalizador, setValidarLocalizador] = React.useState('sim');
  const [validarCidade, setValidarCidade] = React.useState('sim');
  const [validarCEP] = React.useState('sim');
  const [validarUF, setValidarUF] = React.useState('sim');
  const [loading, setLoading] = React.useState(false);

  const cepRef = React.useRef();
  const logradouroRef = React.useRef();
  const localidadeRef = React.useRef();
  const ufRef = React.useRef();
  const complementoRef = React.useRef();
  const numeroRef = React.useRef();
  const bairroRef = React.useRef();
  const localizadorRef = React.useRef();

  //--------------------------------------------------------------------------
  // salvar dados pessoais
  //--------------------------------------------------------------------------
  const url = `/api/consultaRolMembros/${dadosUser[0].id}`;
  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data && data[0]) {
      setCEP(data[0].CEP);
      setLogradouro(data[0].Logradouro);
      setNumero(data[0].Numero);
      setBairro(data[0].Bairro);
      setUF(data[0].UF);
      setCidade(data[0].Localidade);
      setComplemento(data[0].Complemento);
      setNomeNucleo(data[0].nomeNucleo);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  const handleSalvar = () => {
    setLoading(true);

    api
      .post('/api/atualizarRolMembros', {
        RolMembro: dadosUser[0].RolMembro,
        Logradouro: logradouro,
        Numero: Number(numero),
        Bairro: bairro,
        CEP: cep,
        nomeNucleo,
        Complemento: complemento,
        Localidade: cidade,
        UF: uf,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          toast.info('Dados Atualizados !', {
            position: toast.POSITION.TOP_CENTER,
          });
          mutate(url);
        }
      })
      .catch(() => {
        toast.error('Erro ao atualizar Dados !', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };
  //--------------------------------------------------------------------------

  const getInformacoes = () => {
    api
      .post('/api/pegaCep', {
        cep,
      })
      .then((response) => {
        if (response) {
          setLogradouro(response.data.street);
          setBairro(response.data.neighborhood);
          setCidade(response.data.city);
          setUF(response.data.state);
        }
      })
      .catch(() => {
        toast.error('CEP INVÁLIDO !', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'CEP') logradouroRef.current.focus();
      if (formId === 'Logradouro') numeroRef.current.focus();
      if (formId === 'Numero') bairroRef.current.focus();
      if (formId === 'Bairro') ufRef.current.focus();
      if (formId === 'UF') localidadeRef.current.focus();
      if (formId === 'Cidade') complementoRef.current.focus();
      if (formId === 'Complemento') localizadorRef.current.focus();
    }
  };

  //= ===================================================================

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        height="97%"
        width="100%"
        bgcolor={corIgreja.principal}
        ml={1.2}
        mr={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={6}
      >
        <Box width="96%">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  CEP
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="CEP"
                  inputRef={cepRef}
                  // label="CEP"
                  type="tel"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={cep || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={getInformacoes} /* {
                                cep === ''
                                  ? () => setValidarCEP('nao')
                                  : () => setValidarCEP('sim')
                              } */
                  onChange={(e) => setCEP(e.target.value)}
                  error={validarCEP === 'nao'}
                  onFocus={(e) => setCEP(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Logradouro
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Logradouro"
                  inputRef={logradouroRef}
                  // label="Logradouro"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={logradouro || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    logradouro === ''
                      ? () => setValidarLogradouro('nao')
                      : () => setValidarLogradouro('sim')
                  }
                  onChange={(e) => setLogradouro(e.target.value)}
                  error={validarLogradouro === 'nao'}
                  onFocus={(e) => setLogradouro(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  NÚMERO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Numero"
                  inputRef={numeroRef}
                  // label="Número"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={numero || null}
                  variant="outlined"
                  placeholder="xxx"
                  size="small"
                  onBlur={
                    numero === ''
                      ? () => setValidarNumero('nao')
                      : () => setValidarNumero('sim')
                  }
                  onChange={(e) => setNumero(e.target.value)}
                  error={validarNumero === 'nao'}
                  onFocus={(e) => setNumero(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={8} md={8}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Bairro
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Bairro"
                  inputRef={bairroRef}
                  // label="Bairro"
                  type="text"
                  InputLabelProps={{
                    style: { textTransform: 'uppercase' },
                    shrink: true,
                  }}
                  value={bairro || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    bairro === ''
                      ? () => setValidarBairro('nao')
                      : () => setValidarBairro('sim')
                  }
                  onChange={(e) => setBairro(e.target.value)}
                  error={validarBairro === 'nao'}
                  onFocus={(e) => setBairro(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>

            <Grid item xs={4} md={4}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  UF
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="UF"
                  inputRef={ufRef}
                  // label="Cidade"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={uf || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    uf === ''
                      ? () => setValidarUF('nao')
                      : () => setValidarUF('sim')
                  }
                  onChange={(e) => setUF(e.target.value)}
                  error={validarUF === 'nao'}
                  onFocus={(e) => setUF(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={8} md={8}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  CIDADE
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Cidade"
                  // label="Cidade"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={localidadeRef}
                  value={cidade || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    cidade === ''
                      ? () => setValidarCidade('nao')
                      : () => setValidarCidade('sim')
                  }
                  onChange={(e) => setCidade(e.target.value)}
                  error={validarCidade === 'nao'}
                  onFocus={(e) => setCidade(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  COMPLEMENTO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Complemento"
                  // label="Cidade"
                  type="text"
                  inputRef={complementoRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={complemento || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    complemento === ''
                      ? () => setValidarComplemento('nao')
                      : () => setValidarComplemento('sim')
                  }
                  onChange={(e) => setComplemento(e.target.value)}
                  error={validarComplemento === 'nao'}
                  onFocus={(e) => setComplemento(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  NÚCLEO (IGREJA)
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="nomeNucleo"
                  // label="Cidade"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={localizadorRef}
                  value={nomeNucleo || ''}
                  variant="outlined"
                  placeholder="Núcleo que Frequenta"
                  size="small"
                  onBlur={
                    nomeNucleo === ''
                      ? () => setValidarLocalizador('nao')
                      : () => setValidarLocalizador('sim')
                  }
                  onChange={(e) => setNomeNucleo(e.target.value)}
                  error={validarLocalizador === 'nao'}
                  onFocus={(e) => setNomeNucleo(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.novoBox} mb="2vh" mt={0}>
                {!loading ? (
                  <Box
                    width="90%"
                    height={40}
                    borderRadius={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml={3}
                    color="white"
                    bgcolor="green"
                    onClick={handleSalvar}
                  >
                    SALVAR DADOS{' '}
                    <Box ml={4}>
                      <TouchAppIcon />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    width="90%"
                    height={40}
                    borderRadius={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml={3}
                    color="white"
                    bgcolor="green"
                  >
                    SALVANDO...
                    <Box ml={4} mt={0.4}>
                      <Oval stroke="white" width={20} height={20} />
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
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
  );
}

export default DadosEndereco;
