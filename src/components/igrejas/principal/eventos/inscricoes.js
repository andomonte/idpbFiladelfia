import { Box, Button, Grid, capitalize } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';

import dataMask from 'src/components/mascaras/datas';
import celularMask from 'src/components/mascaras/celular';
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles } from '@material-ui/core/styles';
import { Oval } from 'react-loading-icons';
import { useSession } from 'next-auth/client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvData1 from 'src/utils/convData2';
import ValidaCPF from 'src/utils/validarCPF';
import validator from 'validator';
import ValidaData from 'src/utils/validarData';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
  tf_mm: {
    backgroundColor: '#ffff',
    height: 40,
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
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: state.data.color,
    fontSize: '14px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '14px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '14px',
    height: 30,
    display: 'flex',
    alignItems: 'center',
  }),
};
const customStyles2 = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: state.data.color,
    fontSize: '14px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#ff9494',
    fontSize: '14px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '14px',
    height: 30,
    display: 'flex',
    alignItems: 'center',
  }),
};

const tipos = [
  {
    value: 'Participante',
    label: 'Ouvinte do Evento',
  },
  {
    value: 'Apoio',
    label: 'Equipe de apoio do Evento',
  },
];
const quem = [
  {
    value: 'eu',
    label: 'Eu mesmo',
  },
  {
    value: 'membro',
    label: 'Membro da igreja',
  },
  {
    value: 'outro',
    label: 'Um Convidado',
  },
];
const quemLogOut = [
  {
    value: 'outro',
    label: 'Um Convidado',
  },
];
function createListaNome(value, label) {
  return {
    value,
    label,
  };
}

export default function Todos({
  perfilUser,
  eventoEscolhido,
  setOpenPlan,
  rolMembros,
}) {
  const classes = useStyles();
  const [session] = useSession();
  const dadosUser = perfilUser
    ? rolMembros.filter((val) => val.RolMembro === Number(perfilUser.RolMembro))
    : '';

  const valorInicialTipo = {
    label: 'O que irá fazer no Evento?',
    value: 'Informar',
  };
  const valorInicialInscrito = {
    label: 'Para quem é a Inscrição?',
    value: 'Informar',
  };
  const valorInicialMembro = {
    label: 'Qual o seu Nome?',
    value: 'Informar',
  };
  const listaNomes = rolMembros.map((rol) =>
    createListaNome(rol.RolMembro, rol.Nome),
  );
  const [info, setInfo] = React.useState('');
  const [inscrito, setInscrito] = React.useState(
    session !== null ? valorInicialInscrito : quemLogOut[0],
  );
  const [openInfo, setOpenInfo] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [nomeMembros, setNomeMembros] = React.useState(valorInicialMembro);

  const [email, setEmail] = React.useState('');

  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [igreja, setIgreja] = React.useState('');
  const [validarIgreja, setValidarIgreja] = React.useState('sim');
  const [tipo, setTipo] = React.useState(valorInicialTipo);
  const [celular, setCelular] = React.useState('');
  const [validarCelular, setValidarCelular] = React.useState('sim');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [validarDataNascimento, setValidarDataNascimento] =
    React.useState('sim');
  const [loading, setLoading] = React.useState(false);

  const nomeRef = React.useRef();
  const nome2Ref = React.useRef();
  const celularRef = React.useRef();
  const cpfRef = React.useRef();
  const igrejaRef = React.useRef();
  const tipoRef = React.useRef();
  const emailRef = React.useRef();
  const nascimentoRef = React.useRef();
  const estadoCivilRef = React.useRef();

  const handleSalvar = () => {
    let send = true;

    if (nome.length < 6) {
      toast.error('Preencha o Nome e Sobrenome!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      if (inscrito.value === 'membro') nome2Ref.current.focus();
      else nomeRef.current.focus();
    }
    if (inscrito.value === 'Informar') {
      toast.error('Informe para quem é a Inscrição!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      tipoRef.current.focus();
    }
    if (tipo.value === 'Informar') {
      toast.error('Preencha o campo Tipo de Inscrição!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      tipoRef.current.focus();
    }
    if (celular === '') {
      toast.error('Informe seu Telefone!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      celularRef.current.focus();
    }

    if (inscrito.value === 'outro')
      if (cpf === '') {
        toast.error('Informe seu CPF!', {
          position: toast.POSITION.TOP_CENTER,
        });
        send = false;
        cpfRef.current.focus();
      } else if (!ValidaCPF(cpf) && !perfilUser) {
        toast.error('CPF inválido', {
          position: toast.POSITION.TOP_CENTER,
        });
        send = false;
        cpfRef.current.focus();
      }

    if (dataNascimento === '') {
      toast.error('Informe a data de Nascimento!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      nascimentoRef.current.focus();
    } else if (!ValidaData(dataNascimento)) {
      toast.error('data digitada é inválida!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      nascimentoRef.current.focus();
    }

    if (email === '') {
      toast.error('Informe o Email!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      emailRef.current.focus();
    } else if (!validator.isEmail(email)) {
      toast.error('email inválido!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      emailRef.current.focus();
    }
    if (igreja === '') {
      toast.error('Informe a Igreja!', {
        position: toast.POSITION.TOP_CENTER,
      });
      send = false;
      igrejaRef.current.focus();
    }
    if (send) {
      setLoading(true);

      const dataInscicao = new Date();

      const dia = dataNascimento.substring(0, 2);
      const mes = dataNascimento.substring(3, 5);
      const ano = dataNascimento.substring(6, 10);
      const AAAAMMDD = `${ano}-${mes}-${dia} 00:00:00`;
      //     const dateObject = moment(dataNascimento).format('YYYY-DD-MM 00:00:00');

      const newDateNacimento = new Date(AAAAMMDD);
      const newValorParticipante =
        inscrito.value === 'eu' || inscrito.value === 'membro'
          ? 'Membro'
          : 'Outros';

      const newValorDocumento =
        inscrito.value === 'eu' || inscrito.value === 'membro'
          ? '0'
          : cpf.replace(/([^0-9])/g, '');

      let newValorRolMembro = 0;

      if (inscrito.value === 'eu' || inscrito.value === 'membro')
        newValorRolMembro = Number(cpf); // na verdade é o rol do membro inscrito
      const DadosInscritos = {
        idEvento: Number(eventoEscolhido[0].id),
        Evento: eventoEscolhido[0].nomeEvento,
        Identificador: tipo.value,
        Nome: inscrito.value === 'membro' ? nome.label : nome,
        Nascimento: newDateNacimento,
        Contato: celular,
        Email: email,
        Igreja: igreja,
        Status: 'preInscrito',
        participante: newValorParticipante,
        RolMembro: newValorRolMembro,
        Documento: newValorDocumento,
        Distrito: perfilUser ? Number(perfilUser.Distrito) : 0,
        CreatedAt: dataInscicao,
      };

      api
        .post('/api/inserirInscritos', {
          dados: DadosInscritos,
        })
        .then((response) => {
          if (response) {
            setLoading(false);
            setOpenInfo(true);

            if (response.data === 'atualizado')
              setInfo('Inscrição atualizada com Sucesso');
            else setInfo('Inscrição realizada com Sucesso');
          } else console.log('deu erro no banco');
        })
        .catch(() => {
          setLoading(false);
          setOpenInfo(true);
          setInfo(
            'Não foi possível fazer sua Inscrição, tente novamente mais tarde',
          );
        });
    }
    // const nomesMembros = JSON.parse(RelCelulaFinal.NomesMembros);
  };
  React.useEffect(() => {
    const dadosUser2 = rolMembros.filter(
      (val) => Number(val.RolMembro) === Number(nomeMembros.value),
    );

    // if (tipo.value === 'Informar') setTipo(valorInicialTipo);
    // if (nomeMembros.value === 'Informar') setNomeMembros(valorInicialMembro);
    if (inscrito.value === 'eu' && dadosUser) {
      setNome(dadosUser[0].Nome);
      setCelular(dadosUser[0].TelCelular);
      setCPF(perfilUser.RolMembro);

      setDataNascimento(ConvData1(dadosUser[0].Nascimento));
      setEmail(dadosUser[0].Email);
      setIgreja(dadosUser[0].Igreja);
    } else if (inscrito.value === 'membro' && dadosUser2.length) {
      setCelular(dadosUser2[0].TelCelular ? dadosUser2[0].TelCelular : '');
      setCPF(dadosUser2[0].RolMembro);
      setDataNascimento(
        ConvData1(dadosUser2[0].Nascimento)
          ? ConvData1(dadosUser2[0].Nascimento)
          : '',
      );
      setEmail(dadosUser2[0].Email ? dadosUser2[0].Email : '');
      setIgreja(dadosUser2[0].Igreja ? dadosUser2[0].Igreja : '');
    } else {
      setNome('');
      setCelular('');
      setCPF('');
      setDataNascimento('');
      setIgreja('');
      setEmail('');
    }
  }, [inscrito, nomeMembros]);

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'Nome') tipoRef.current.focus();
      if (formId === 'Nome2') tipoRef.current.focus();
      if (formId === 'Tipo') celularRef.current.focus();
      if (formId === 'TelefoneCelular') cpfRef.current.focus();
      if (formId === 'CPF') nascimentoRef.current.focus();
      if (formId === 'Email') igrejaRef.current.focus();
      if (formId === 'Tipo') nascimentoRef.current.focus();
      if (formId === 'DataNascimento') emailRef.current.focus();
      if (formId === 'Naturalidade') estadoCivilRef.current.focus();
    }
  };
  const handleMembros = () => {};

  const handleClose = () => {
    setOpenPlan(false);
    setOpenInfo(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="100vh"
    >
      <Box
        bgcolor={corIgreja.principal}
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <form
          style={{
            height: '85%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box width="100%" mt={10}>
            <Box width="100%" display="flex" justifyContent="center">
              <Box width="88%">
                <Grid item xs={12} md={12}>
                  <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Quem será inscrito?
                    </Typography>
                  </Box>
                  <Box mt={0} mb="2vh">
                    <Select
                      id="Inscrito" // não precisa pois uso o onChange
                      value={inscrito}
                      isSearchable={false}
                      onChange={(e) => {
                        setNomeMembros(valorInicialMembro);
                        setNome(valorInicialMembro);
                        setTipo(valorInicialTipo);
                        setInscrito(e);
                        if (e.value === 'membro') {
                          nome2Ref.current.focus();
                        } else nomeRef.current.focus();
                      }}
                      options={session != null ? quem : quemLogOut}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box
              width="100%"
              display={inscrito.value === 'Informar' ? 'none' : 'flex'}
              justifyContent="center"
            >
              <Box width="90%">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box mt={-0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Função no Evento
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2} mb="2vh">
                      <Select
                        id="Tipo" // não precisa pois uso o onChange
                        ref={tipoRef}
                        value={tipo}
                        styles={
                          tipo.value === 'Informar'
                            ? customStyles2
                            : customStyles
                        }
                        isSearchable={false}
                        onChange={(e) => {
                          setTipo(e);
                          // celularRef.current.focus();
                        }}
                        options={tipos}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Box
                      display={inscrito.value !== 'membro' ? '' : 'none'}
                      mt={-2}
                      ml={2}
                      color="white"
                      sx={{ fontSize: 'bold' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Nome
                      </Typography>
                    </Box>
                    <Box
                      display={inscrito.value !== 'membro' ? '' : 'none'}
                      className={classes.novoBox}
                      mt={-2}
                      mb="0vh"
                    >
                      <TextField
                        autoComplete="off"
                        inputRef={nomeRef}
                        className={classes.tf_m}
                        id="Nome"
                        type="text"
                        inputProps={{
                          style: {
                            color: nome === '' ? 'red' : 'black',
                            //                            textAlign: 'center',
                          },
                        }}
                        InputLabelProps={{
                          style: { textTransform: 'uppercase' },
                          shrink: true,
                        }}
                        disabled={!!(inscrito.value === 'eu' && dadosUser)}
                        value={nome}
                        variant="outlined"
                        placeholder="Qual o seu Nome?"
                        size="small"
                        onChange={(e) => setNome(capitalize(e.target.value))}
                        // error={nome === ''}
                        onFocus={(e) => setNome(e.target.value)}
                        onKeyDown={handleEnter}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      display={inscrito.value === 'membro' ? 'flex' : 'none'}
                      mt={-4}
                      ml={2}
                      color="white"
                      sx={{ fontSize: 'bold' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Nome
                      </Typography>
                    </Box>
                    <Box
                      display={inscrito.value === 'membro' ? '' : 'none'}
                      className={classes.novoBox}
                      mt={-2}
                      ref={nome2Ref}
                      mb="2vh"
                    >
                      <Select
                        id="nome2" // não precisa pois uso o onChange
                        value={nomeMembros}
                        styles={
                          nomeMembros.value === 'Informar'
                            ? customStyles2
                            : customStyles
                        }
                        onChange={(e) => {
                          setNomeMembros(e);
                          setNome(e);
                          handleMembros();
                          // celularRef.current.focus();
                        }}
                        options={listaNomes}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Email
                      </Typography>
                    </Box>

                    <Box mb="2vh" className={classes.novoBox} mt={-2}>
                      <TextField
                        autoComplete="off"
                        className={classes.tf_m}
                        inputProps={{
                          style: {
                            color:
                              email === '' || email === null ? 'red' : 'black',
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
                  <Grid item xs={6} md={3}>
                    <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Celular
                      </Typography>
                    </Box>
                    <Box mb="2vh" className={classes.novoBox} mt={-2}>
                      <TextField
                        autoComplete="off"
                        className={classes.tf_m}
                        id="TelefoneCelular"
                        type="tel"
                        inputRef={celularRef}
                        inputProps={{
                          style: {
                            color: celular === '' ? 'red' : 'black',
                            //                            textAlign: 'center',
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={celularMask(celular).replace(/[\][)]/g, ') ')}
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
                    <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {inscrito.value === 'outro' ? 'CPF' : 'RolMembro'}
                      </Typography>
                    </Box>
                    <Box mb="2vh" className={classes.novoBox} mt={-2}>
                      <TextField
                        autoComplete="off"
                        className={classes.tf_m}
                        id="CPF"
                        // // // label="CPF"
                        type="tel"
                        inputRef={cpfRef}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            color: cpf === '' ? 'red' : 'black',
                            //                            textAlign: 'center',
                          },
                        }}
                        disabled={!(inscrito.value === 'outro')}
                        value={cpf}
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

                  <Grid item xs={12} md={3}>
                    <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data de Nascimento
                      </Typography>
                    </Box>
                    <Box mb="2vh" className={classes.novoBox} mt={-2}>
                      <TextField
                        autoComplete="off"
                        className={classes.tf_m}
                        id="DataNascimento"
                        // label="Data de Nascimento"
                        type="tel"
                        inputRef={nascimentoRef}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            color: dataNascimento === '' ? 'red' : 'black',
                            //                            textAlign: 'center',
                          },
                        }}
                        disabled={!!(inscrito.value === 'eu' && dadosUser)}
                        value={dataMask(dataNascimento)}
                        variant="outlined"
                        placeholder="dd/mm/aaaa"
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

                  <Grid item xs={12} md={12}>
                    <Box mt={-2} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Igreja
                      </Typography>
                    </Box>
                    <Box mb="6vh" className={classes.novoBox} mt={-1.8}>
                      <TextField
                        autoComplete="off"
                        className={classes.tf_m}
                        id="igreja"
                        // label="Data de Nascimento"
                        type="text"
                        inputRef={igrejaRef}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            color: igreja === '' ? 'red' : 'black',
                            //                            textAlign: 'center',
                          },
                        }}
                        disabled={!!(inscrito.value === 'eu' && dadosUser)}
                        value={igreja}
                        variant="outlined"
                        placeholder="qual a sua sua Igreja?"
                        size="small"
                        onBlur={
                          igreja === ''
                            ? () => setValidarIgreja('nao')
                            : () => setValidarIgreja('sim')
                        }
                        onChange={(e) => setIgreja(e.target.value)}
                        error={validarIgreja === 'nao'}
                        onFocus={(e) => setIgreja(e.target.value)}
                        onKeyDown={handleEnter}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </form>
        <Box
          mt={5}
          height="15%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="43%" mr={1} mt={0}>
            <Button
              style={{
                background: '#ff9e80',
                color: '#780810',
                fontFamily: 'arial black',
                borderRadius: 15,
                width: '100%',
              }}
              component="a"
              variant="contained"
              onClick={() => {
                setOpenPlan(false);
              }}
            >
              CANCELAR
            </Button>
          </Box>
          <Box ml={1} width="43%">
            {!loading ? (
              <Button
                style={{
                  color: 'white',
                  background: 'green',
                  fontFamily: 'arial black',
                  borderRadius: '10px',
                  width: '100%',
                }}
                onClick={handleSalvar}
                variant="contained"
                severity="success"
              >
                SALVAR
              </Button>
            ) : (
              <Button
                style={{
                  background: 'green',
                  color: 'white',
                  fontFamily: 'arial black',
                  borderRadius: 15,
                  width: '100%',
                }}
                variant="contained"
                severity="success"
                endIcon={<Oval stroke="white" width={20} height={25} />}
              />
            )}
          </Box>
        </Box>
      </Box>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openInfo}
        >
          <Box
            height={50}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Fugaz One"
            fontSize="18px"
          >
            ATENÇÃO
          </Box>

          <DialogContent dividers>
            <Typography gutterBottom>{info}.</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              <Box
                height={20}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontFamily="Fugaz One"
                fontSize="18px"
              >
                {' '}
                FECHAR
              </Box>
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
