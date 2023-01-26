import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { Oval } from 'react-loading-icons';
import { Box, capitalize } from '@mui/material';
import React from 'react';
// import Image from 'next/image';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';
import axios from 'axios';
import dataMask from 'src/components/mascaras/datas';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import useSWR, { mutate } from 'swr';
import moment from 'moment';
import FormatarData from 'src/utils/formatoData';

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

function DadosGerais({ rolMembros, perfilUser }) {
  const classes = useStyles();
  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );

  const [nomePai, setNomePai] = React.useState(dadosUser[0].Pai);
  const [validarNomePai, setValidarNomePai] = React.useState('sim');
  const [nomeMae, setNomeMae] = React.useState(dadosUser[0].Mae);
  const [validarNomeMae, setValidarNomeMae] = React.useState('sim');
  const [conversao, setConversao] = React.useState('');
  const [validarConversao, setValidarConversao] = React.useState('sim');
  const [discipulador, setDiscipulador] = React.useState(
    dadosUser[0].Discipulador,
  );
  const [validarDiscipulador, setValidarDiscipulador] = React.useState('sim');
  const [batismo, setBatismo] = React.useState('');
  const [validarBatismo, setValidarBatismo] = React.useState('sim');
  const [profissao, setProfissao] = React.useState(dadosUser[0].Profissao);
  const [validarProfissao, setValidarProfissao] = React.useState('sim');
  const [formacaoAcademica, setFormacaoAcademica] = React.useState(
    dadosUser[0].FormacaoAcademica,
  );
  const [validarFormacaoAcademica, setValidarFormacaoAcademica] =
    React.useState('sim');
  const [loading, setLoading] = React.useState(false);

  const nomeMaeRef = React.useRef();
  const profissaoRef = React.useRef();
  const formacaoAcademicaRef = React.useRef();
  const discipuladorRef = React.useRef();
  const conversaoRef = React.useRef();
  const batismoRef = React.useRef();

  const url = `/api/consultaRolMembros/${dadosUser[0].id}`;
  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data && data[0]) {
      setNomePai(data[0].Pai);
      setNomeMae(data[0].Mae);
      setFormacaoAcademica(data[0].FormacaoAcademica);
      setProfissao(data[0].Profissao);

      setConversao(
        data[0].Conversao
          ? moment(data[0].Conversao.substring(0, 10)).format('DD/MM/YYYY')
          : '',
      );
      setBatismo(
        data[0].Batismo
          ? moment(data[0].Batismo.substring(0, 10)).format('DD/MM/YYYY')
          : '',
      );
      setDiscipulador(data[0].Discipulador);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  //--------------------------------------------------------------------------
  // salvar dados pessoais
  //--------------------------------------------------------------------------
  const handleSalvar = () => {
    setLoading(true);
    const novaConver = FormatarData(conversao);
    const novoBatismo = FormatarData(batismo);
    api
      .post('/api/atualizarRolMembros', {
        RolMembro: dadosUser[0].RolMembro,
        Pai: nomePai,
        Mae: nomeMae,
        Conversao: novaConver,
        Batismo: novoBatismo,
        Discipulador: discipulador,
        Profissao: profissao,
        FormacaoAcademica: formacaoAcademica,
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

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'NomePai') nomeMaeRef.current.focus();
      if (formId === 'NomeMae') conversaoRef.current.focus();
      if (formId === 'Conversao') batismoRef.current.focus();
      if (formId === 'Batismo') formacaoAcademicaRef.current.focus();
      if (formId === 'FormacaoAcademica') profissaoRef.current.focus();
      if (formId === 'Profissao') discipuladorRef.current.focus();
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
            <Grid item xs={12} md={12}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Nome do Pai
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="NomePai"
                  type="text"
                  InputLabelProps={{
                    style: { textTransform: 'uppercase' },
                    shrink: true,
                  }}
                  value={nomePai || ''}
                  variant="outlined"
                  placeholder="Principalmente se for Criança"
                  size="small"
                  onBlur={
                    nomePai === ''
                      ? () => setValidarNomePai('nao')
                      : () => setValidarNomePai('sim')
                  }
                  onChange={(e) => setNomePai(capitalize(e.target.value))}
                  error={validarNomePai === 'nao'}
                  onFocus={(e) => setNomePai(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Nome da Mãe
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="NomeMae"
                  inputRef={nomeMaeRef}
                  // label="NomeMae"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={nomeMae || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    nomeMae === ''
                      ? () => setValidarNomeMae('nao')
                      : () => setValidarNomeMae('sim')
                  }
                  onChange={(e) => setNomeMae(e.target.value)}
                  error={validarNomeMae === 'nao'}
                  onFocus={(e) => setNomeMae(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Data da Conversão
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Conversao"
                  inputRef={conversaoRef}
                  // label="Número"
                  type="tel"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={conversao ? dataMask(conversao) : ''}
                  variant="outlined"
                  placeholder="dd/mm/aaaa"
                  size="small"
                  onBlur={
                    conversao === ''
                      ? () => setValidarConversao('nao')
                      : () => setValidarConversao('sim')
                  }
                  onChange={(e) => setConversao(e.target.value)}
                  error={validarConversao === 'nao'}
                  onFocus={(e) => setConversao(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Data Batismo
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Batismo"
                  inputRef={batismoRef}
                  // label="Batismo"
                  type="tel"
                  InputLabelProps={{
                    style: { textTransform: 'uppercase' },
                    shrink: true,
                  }}
                  value={batismo ? dataMask(batismo) : ''}
                  variant="outlined"
                  placeholder="dd/mm/aaaa"
                  size="small"
                  onBlur={
                    batismo === ''
                      ? () => setValidarBatismo('nao')
                      : () => setValidarBatismo('sim')
                  }
                  onChange={(e) => setBatismo(e.target.value)}
                  error={validarBatismo === 'nao'}
                  onFocus={(e) => setBatismo(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Formação Acadêmica
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="FormacaoAcademica"
                  inputRef={formacaoAcademicaRef}
                  // label="Profissao"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formacaoAcademica || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    formacaoAcademica === ''
                      ? () => setValidarFormacaoAcademica('nao')
                      : () => setValidarFormacaoAcademica('sim')
                  }
                  onChange={(e) => setFormacaoAcademica(e.target.value)}
                  error={validarFormacaoAcademica === 'nao'}
                  onFocus={(e) => setFormacaoAcademica(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Profissão
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Profissao"
                  // label="Profissao"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={profissaoRef}
                  value={profissao || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    profissao === ''
                      ? () => setValidarProfissao('nao')
                      : () => setValidarProfissao('sim')
                  }
                  onChange={(e) => setProfissao(e.target.value)}
                  error={validarProfissao === 'nao'}
                  onFocus={(e) => setProfissao(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Discipulador
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Discipulador"
                  // label="Profissao"
                  type="text"
                  inputRef={discipuladorRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={discipulador || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    discipulador === ''
                      ? () => setValidarDiscipulador('nao')
                      : () => setValidarDiscipulador('sim')
                  }
                  onChange={(e) => setDiscipulador(e.target.value)}
                  error={validarDiscipulador === 'nao'}
                  onFocus={(e) => setDiscipulador(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box className={classes.novoBox} mt={-0} mb="2vh">
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

export default DadosGerais;
