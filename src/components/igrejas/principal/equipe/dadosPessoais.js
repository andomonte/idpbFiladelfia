import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { Oval } from 'react-loading-icons';
import { Box, capitalize } from '@mui/material';
import React from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import foneMask from 'src/components/mascaras/fone';
import celularMask from 'src/components/mascaras/celular';
import 'react-image-crop/dist/ReactCrop.css';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import ConverteData from 'src/utils/convData2';
import ValidaData from 'src/utils/validarData';
import validator from 'validator';
import FormatarData from 'src/utils/formatoData';
import moment from 'moment';

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

const currencies = [
  {
    value: 'SOLTEIRO (A)',
    label: 'SOLTEIRO (A)',
  },
  {
    value: 'CASADO (A)',
    label: 'CASADO (A)',
  },
  {
    value: 'VIÚVO (A)',
    label: 'VIÚVO (A)',
  },
  {
    value: 'DIVORCIADO (A)',
    label: 'DIVORCIADO (A)',
  },
];
const sexos = [
  {
    value: 'MASCULINO',
    label: 'MASCULINO',
  },
  {
    value: 'FEMININO',
    label: 'FEMININO',
  },
];
function DadosPessoais({ rolMembros, perfilUser }) {
  const classes = useStyles();
  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );
  const valorInicialSexo = {
    label: dadosUser[0].Sexo,
    value: dadosUser[0].Sexo,
  };
  const valorInicialECivil = {
    label: dadosUser[0].EstadoCivil,
    value: dadosUser[0].EstadoCivil,
  };
  const [nome, setNome] = React.useState(dadosUser[0].Nome);
  const [validarNome, setValidarNome] = React.useState('sim');
  const [cpf, setCPF] = React.useState(dadosUser[0].CPF);
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [rg, setRG] = React.useState(dadosUser[0].RG);
  const [validarRG, setValidarRG] = React.useState('sim');
  const [sexo, setSexo] = React.useState(valorInicialSexo);
  const [fone, setFone] = React.useState(dadosUser[0].TelFixo);
  const [validarFone, setValidarFone] = React.useState('sim');
  const [celular, setCelular] = React.useState(dadosUser[0].TelCelular);
  const [validarCelular, setValidarCelular] = React.useState('sim');
  const [estadoCivil, setEstadoCivil] = React.useState(valorInicialECivil);
  const [dataNascimento, setDataNascimento] = React.useState(
    dadosUser[0].Nascimento ? ConverteData(dadosUser[0].Nascimento) : '',
  );

  const [email, setEmail] = React.useState(dadosUser[0].Email);
  const [validarEmail, setValidarEmail] = React.useState('sim');
  const emailRef = React.useRef();

  const [validarDataNascimento, setValidarDataNascimento] =
    React.useState('sim');
  const [naturalidade, setNaturalidade] = React.useState(
    dadosUser[0].Naturalidade,
  );
  const [validarNaturalidade, setValidarNaturalidade] = React.useState('sim');
  const [loading, setLoading] = React.useState(false);

  const nomeRef = React.useRef();
  const celularRef = React.useRef();
  const foneRef = React.useRef();
  const cpfRef = React.useRef();
  const rgRef = React.useRef();
  const sexoRef = React.useRef();
  const nascimentoRef = React.useRef();
  const naturalidadeRef = React.useRef();
  const estadoCivilRef = React.useRef();

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

  const cepRef = React.useRef();
  const logradouroRef = React.useRef();
  const localidadeRef = React.useRef();
  const ufRef = React.useRef();
  const complementoRef = React.useRef();
  const numeroRef = React.useRef();
  const bairroRef = React.useRef();
  const localizadorRef = React.useRef();
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
  const nomePaiRef = React.useRef();
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
      const valorInicialSexo2 = {
        label: data[0].Sexo ? data[0].Sexo : '',
        value: data[0].Sexo ? data[0].Sexo : '',
      };
      const valorInicialECivil2 = {
        label: data[0].EstadoCivil ? data[0].EstadoCivil : '',
        value: data[0].EstadoCivil ? data[0].EstadoCivil : '',
      };

      console.log('data', data);

      setNome(data[0].Nome);
      setCelular(data[0].TelCelular);
      setFone(data[0].TelFixo);
      setCPF(data[0].CPF);
      setRG(data[0].RG);
      setSexo(valorInicialSexo2);
      setEstadoCivil(valorInicialECivil2);
      setEmail(data[0].Email);
      setDataNascimento(
        data[0].Nascimento ? ConverteData(data[0].Nascimento) : '',
      );
      setNaturalidade(data[0].Naturalidade);
      setCEP(data[0].CEP);
      setLogradouro(data[0].Logradouro);
      setNumero(data[0].Numero);
      setBairro(data[0].Bairro);
      setUF(data[0].UF);
      setCidade(data[0].Localidade);
      setComplemento(data[0].Complemento);
      setNomeNucleo(data[0].nomeNucleo);

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
    let send = true;
    const novaConver = FormatarData(conversao);
    const novoBatismo = FormatarData(batismo);
    const novaData = FormatarData(dataNascimento);
    const vData = ValidaData(dataNascimento);

    if (!vData) {
      setValidarDataNascimento('nao');

      toast.error('Informe a Data de Nascimento!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      nascimentoRef.current.focus();
    } else {
      setValidarDataNascimento('sim');
    }

    if (!validator.isEmail(email)) {
      setValidarEmail('nao');
      emailRef.current.focus();
      toast.error('Informe o Email!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      emailRef.current.focus();
    } else {
      setValidarEmail('sim');
    }

    if (send) {
      setLoading(true);
      api
        .post('/api/atualizarRolMembros', {
          RolMembro: dadosUser[0].RolMembro,
          Nome: nome,
          Email: email,
          TelCelular: celular,
          TelFixo: fone,
          CPF: cpf,
          RG: rg,
          Sexo: sexo ? sexo.label : '',
          Nascimento: novaData,
          Naturalidade: naturalidade,
          EstadoCivil: estadoCivil.label,
          Logradouro: logradouro,
          Numero: Number(numero),
          Bairro: bairro,
          CEP: cep,
          nomeNucleo,
          Complemento: complemento,
          Localidade: cidade,
          UF: uf,

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
          toast.error('Erro ao Atualizar Dados!', {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        });
    }
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

      if (formId === 'Nome') celularRef.current.focus();
      if (formId === 'TelefoneCelular') foneRef.current.focus();
      if (formId === 'TelefoneResidencial') cpfRef.current.focus();
      if (formId === 'CPF') rgRef.current.focus();
      if (formId === 'RG') sexoRef.current.focus();
      if (formId === 'Sexo') nascimentoRef.current.focus();
      if (formId === 'DataNascimento') naturalidadeRef.current.focus();
      if (formId === 'Naturalidade') estadoCivilRef.current.focus();
      if (formId === 'estadoCivil') cepRef.current.focus();
      if (formId === 'CEP') logradouroRef.current.focus();
      if (formId === 'Logradouro') numeroRef.current.focus();
      if (formId === 'Numero') bairroRef.current.focus();
      if (formId === 'Bairro') ufRef.current.focus();
      if (formId === 'UF') localidadeRef.current.focus();
      if (formId === 'Cidade') complementoRef.current.focus();
      if (formId === 'Complemento') localizadorRef.current.focus();
      if (formId === 'Localizador') nomePaiRef.current.focus();

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
      height="calc(100% - 56px)"
    >
      <Box
        mt={2}
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
            <Grid item xs={12} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Nome
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  inputRef={nomeRef}
                  className={classes.tf_m}
                  id="Nome"
                  type="text"
                  InputLabelProps={{
                    style: { textTransform: 'uppercase' },
                    shrink: true,
                  }}
                  value={nome}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    nome === ''
                      ? () => setValidarNome('nao')
                      : () => setValidarNome('sim')
                  }
                  onChange={(e) => setNome(capitalize(e.target.value))}
                  error={validarNome === 'nao'}
                  onFocus={(e) => setNome(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Celular
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="TelefoneCelular"
                  type="tel"
                  inputRef={celularRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    celular ? celularMask(celular).replace(/[\][)]/g, ') ') : ''
                  }
                  variant="outlined"
                  placeholder="(99) 9999-9999"
                  size="small"
                  onBlur={
                    celular === ''
                      ? () => setValidarCelular('nao')
                      : () => setValidarCelular('sim')
                  }
                  onChange={(e) => setCelular(e.target.value)}
                  error={validarCelular === 'nao'}
                  onFocus={(e) => setCelular(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Residencial
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="TelefoneResidencial"
                  type="tel"
                  inputRef={foneRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fone ? foneMask(fone).replace(/[\][)]/g, ') ') : ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    fone === ''
                      ? () => setValidarFone('nao')
                      : () => setValidarFone('sim')
                  }
                  onChange={(e) => setFone(e.target.value)}
                  error={validarFone === 'nao'}
                  onFocus={(e) => setFone(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  CPF
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="CPF"
                  // // // label="CPF"
                  type="tel"
                  inputRef={cpfRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={cpf ? cpfMask(cpf) : ''}
                  variant="outlined"
                  placeholder="999.999.999-99"
                  size="small"
                  onBlur={
                    cpf === ''
                      ? () => setValidarCPF('nao')
                      : () => setValidarCPF('sim')
                  }
                  onChange={(e) => setCPF(e.target.value)}
                  error={validarCPF === 'nao'}
                  onFocus={(e) => setCPF(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  IDENTIDADE (RG)
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="RG"
                  inputRef={rgRef}
                  // label="RG"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={rg || ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    rg === ''
                      ? () => setValidarRG('nao')
                      : () => setValidarRG('sim')
                  }
                  onChange={(e) => setRG(e.target.value)}
                  error={validarRG === 'nao'}
                  onFocus={(e) => setRG(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  SEXO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <Select
                  ref={sexoRef}
                  defaultValue={sexo || ''}
                  onChange={(e) => {
                    setSexo(e);
                  }}
                  options={sexos}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  DATA NASCIMENTO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="DataNascimento"
                  // label="Data de Nascimento"
                  type="tel"
                  inputRef={nascimentoRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dataNascimento ? dataMask(dataNascimento) : ''}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    dataNascimento === ''
                      ? () => setValidarDataNascimento('nao')
                      : () => setValidarDataNascimento('sim')
                  }
                  onChange={(e) => setDataNascimento(e.target.value)}
                  error={validarDataNascimento === 'nao'}
                  onFocus={(e) => setDataNascimento(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  NATURAL DE
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Naturalidade"
                  inputRef={naturalidadeRef}
                  // label="Naturalidade"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={naturalidade}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    naturalidade === ''
                      ? () => setValidarNaturalidade('nao')
                      : () => setValidarNaturalidade('sim')
                  }
                  onChange={(e) => setNaturalidade(e.target.value)}
                  error={validarNaturalidade === 'nao'}
                  onFocus={(e) => setNaturalidade(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  ESTADO CIVIL
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <Select
                  defaultValue={estadoCivil}
                  onChange={(e) => {
                    setEstadoCivil(e);
                  }}
                  options={currencies}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                mt={0}
                ml={2}
                color="white"
                sx={{
                  fontSize: 'bold',
                  color: validarEmail === 'nao' ? '#ff8a80' : 'white',
                }}
              >
                <Typography variant="caption" display="block" gutterBottom>
                  Email
                </Typography>
              </Box>

              <Box mb="2vh" className={classes.novoBox} mt={-2}>
                <TextField
                  autoComplete="off"
                  className={classes.tf_m}
                  inputProps={{
                    style: {
                      color: validarEmail === 'nao' ? '#ff8a80' : 'black',
                      //                            textAlign: 'center',
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
                  value={email || ''}
                  variant="outlined"
                  placeholder="qual o seu email?"
                  size="small"
                  onChange={(e) => {
                    setValidarEmail('sim');
                    const novoEmail = e.target.value;
                    const emailSemEspaco = novoEmail.replace(/ /g, '');
                    setEmail(emailSemEspaco.toLowerCase());
                  }}
                  onFocus={(e) => {
                    const novoEmail = e.target.value;
                    const emailSemEspaco = novoEmail.replace(/ /g, '');
                    setEmail(emailSemEspaco.toLowerCase());
                  }}
                  onKeyDown={handleEnter}
                  inputRef={emailRef}
                />
              </Box>
            </Grid>
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
                    inputRef={nomePaiRef}
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
            </Grid>

            <Grid item xs={12}>
              <Box
                mt="1vh"
                mb="2vh"
                display="flex"
                justifyContent="center"
                width="90%"
                borderRadius={5}
                height={40}
              >
                {!loading ? (
                  <Box
                    width="90%"
                    height={40}
                    borderRadius={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml={4}
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
                    ml={4}
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

export default DadosPessoais;
