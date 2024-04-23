import React, { useRef } from 'react';
import { Box, Typography, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@mui/material/TableContainer';
import Select from 'react-select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import CalculaIdade from 'src/utils/getIdade';
import { useRouter } from 'next/router';
import { TiArrowBack } from 'react-icons/ti';
import { Oval } from 'react-loading-icons';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import converteData from 'src/utils/convData2';

import '@fontsource/fugaz-one'; // Padrões para peso 400.
import AppBar from '@material-ui/core/AppBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dataMask from 'src/components/mascaras/datas';
import celularMask from 'src/components/mascaras/celular';
import * as moment from 'moment';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import TamanhoJanela from 'src/utils/getSize';

const janela2 = TamanhoJanela();
let altura2;
let largura2;
if (janela2.height < 500) altura2 = 500;
else altura2 = janela2.height;
// const validateDate = require('validate-date');
if (janela2.width < 300) largura2 = 300;
else largura2 = janela2.width;
if (janela2.width > 410) largura2 = 410;
else largura2 = janela2.width;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  root2: {
    backgroundColor: corIgreja.principal2,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 54,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgBack: {
    //    width: '100%',
    height: altura2,
    backgroundImage: "url('/images/global/fundo.png')",
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  desktopDrawer: {
    width: largura2,
    left: janela2.width / 2 - largura2 / 2,
    borderRight: 'none',
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
    color: '#424242',
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
    fontSize: '12px',
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
    color: '#424242',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#424242',
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
    marginLeft: '1px',
    marginRight: '1px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',
    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: largura2 - 50,
    height: '40px',
    fontSize: '12px',
    '& .MuiFilledInput-root': {
      background: 'rgb(232, 241, 250)',
    },
    //  borderRadius: '10px',
    //   border: '0px solid #424242',
  },
}));

function createListaIgrejas(value, label, jurisdicao) {
  return {
    value,
    label,
    jurisdicao,
  };
}

function Home({ dados, nomesIgrejas }) {
  const classes = useStyles();
  const usuario = sessionStorage.getItem('usuario')
    ? JSON.parse(sessionStorage.getItem('usuario'))
    : '';
  // const router = useRouter();

  const [nome, setNome] = React.useState('');
  const [desabilitaGM, setDesabilitaGM] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [GM, setGM] = React.useState({ label: 'Selecione...', value: 0 });
  const [cpf] = React.useState(dados.cpf);
  const [igrejaEscolhida, setIgrejaEscolhida] = React.useState('');
  const [select, setSelect] = React.useState(false);
  //  const [ocultar, setOcultar] = React.useState(false);
  const [ocultarFp, setOcultarFp] = React.useState(false);
  const [fone, setFone] = React.useState('');
  const horarioAtual = moment(new Date()).format('MM/DD/YYYY');
  const [horario, setHorario] = React.useState(
    dayjs(new Date(`${horarioAtual} 19:30:00`)),
  );
  const [cidade, setCidade] = React.useState('');
  const [nascimento, setNascimento] = React.useState('');
  const [dataChegada, setDataChegada] = React.useState('');

  const [fPagamento, setFPagamento] = React.useState({
    label: 'Qual a forma de pagamento',
    value: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const nomeRef = useRef();
  const nascimentoRef = useRef();
  const dataChegadaRef = useRef();
  const emailRef = useRef();
  const GMRef = useRef();
  const foneRef = useRef();
  const fpRef = useRef();
  const sexoRef = useRef();
  const horarioRef = useRef();
  const hospedagemRef = useRef();
  const igrejaRef = React.useRef();
  const cidadeRef = React.useRef();
  const testeCidadeRef = React.useRef();
  const botaoRef = React.useRef();
  const transporteRef = React.useRef();
  const router = useRouter();
  const valorInicial = { label: 'Qual sua Igreja', value: 0 };
  const [sexo, setSexo] = React.useState({ label: 'Selecione...', value: 0 });
  const [hospedagem, setHospedagem] = React.useState({
    label: 'Escolha SIM ou NÃO',
    value: 0,
  });
  const [testeCidade, setTesteCidade] = React.useState({
    label: 'Escolha SIM ou NÃO',
    value: 0,
  });
  const [transporte, setTransporte] = React.useState({
    label: 'Como irá chegar na cidade',
    value: 0,
  });

  const eventoSelecionado = JSON.parse(dados.eventoSelecionado);
  const temHospedagem = eventoSelecionado.Hospedagem;

  const arrayFP = [];
  if (eventoSelecionado.CartaoCredito)
    arrayFP.push({ label: 'Cartão de Crédito', value: 0 });
  if (eventoSelecionado.Pix) arrayFP.push({ label: 'Pix', value: 1 });

  if (eventoSelecionado.Boleto) arrayFP.push({ label: 'Boleto', value: 2 });

  if (eventoSelecionado.Dinheiro && usuario)
    arrayFP.push({ label: 'Dinheiro (apenas secretaria)', value: 3 });

  const opcoesFPagamento = arrayFP;

  const { total } = dados;
  const { qtyA } = dados;
  const { qtyC1 } = dados;
  const { qtyC2 } = dados;

  const [igreja, setIgreja] = React.useState(valorInicial);

  const [validarNome, setValidarNome] = React.useState(true);
  const [validarEmail, setValidarEmail] = React.useState(true);

  const listaIgrejas2 = nomesIgrejas.map((rol, index) =>
    createListaIgrejas(index, rol.nomeNucleo, 0),
  );
  const listaIgrejas = listaIgrejas2.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.label === thing.label),
  );
  const listaSexo = [
    { label: 'Masculino', value: 0 },
    { label: 'Feminino', value: 1 },
  ];
  const listaTransporte = [
    { label: 'Avião', value: 0 },
    { label: 'Barco', value: 1 },
    { label: 'Ônibus', value: 1 },
    { label: 'Carro', value: 1 },
  ];
  const listaHospedagem = [
    { label: 'NÃO', value: 0 },
    { label: 'SIM', value: 1 },
  ];
  const listaGM = [
    { label: 'MEMBRO IDPB', value: 5 },
    { label: 'VISITANTE', value: 6 },
  ];

  const customStylesSexo = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor: sexo.label === 'Selecione...' ? '#f0f4c3' : '#d0f4c3',
    }),
  };

  const customStylesIgreja = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor:
        igreja.label === 'Qual sua Igreja' ? '#f0f4c3' : '#d0f4c3',
    }),
  };
  const customStylesGM = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor: GM.label === 'Selecione...' ? '#f0f4c3' : '#d0f4c3',
    }),
  };
  const customStylesFP = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor:
        fPagamento.label === 'Qual a forma de pagamento'
          ? '#f0f4c3'
          : '#d0f4c3',
    }),
  };

  const customStylesHospedagem = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor:
        hospedagem.label === 'Escolha SIM ou NÃO' ? '#f0f4c3' : '#d0f4c3',
    }),
  };
  const customStylesTesteCidade = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor:
        testeCidade.label === 'Escolha SIM ou NÃO' ? '#f0f4c3' : '#d0f4c3',
    }),
  };
  const customStylesTransporte = {
    backgroundColor: 'blue',
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor:
        transporte.label === 'Como irá chegar na cidade'
          ? '#f0f4c3'
          : '#d0f4c3',
    }),
  };
  React.useEffect(async () => {
    if (nomesIgrejas) {
      const igrejaEscolhidaF = nomesIgrejas.filter(
        (val) => val.Nome === igreja.label,
      );
      if (igrejaEscolhidaF.length) setIgrejaEscolhida(igrejaEscolhidaF[0]);
      if (GM.label === 'Selecione...') setGM({ label: 'MEMBRO', value: 0 });
    }
  }, [igreja]);
  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaMembros/${dados.cpf}`;
      const res = await axios.get(url);

      if (res.data && res.data.length) {
        setNome(res.data[0].Nome);
        setGM({ label: res.data[0].GrauMinisterial, value: 0 });
        setDesabilitaGM(true);
        setNascimento(converteData(res.data[0].Nascimento));
        if (res.data[0].Sexo === 'MASCULINO')
          setSexo({ label: 'Masculino', value: 0 });
        if (res.data[0].Sexo === 'FEMININO')
          setSexo({ label: 'Feminino', value: 1 });
        setFone(celularMask(res.data[0].TelCelular));
        emailRef.current.focus();

        if (res.data[0].Email && res.data[0].Email.length > 5) {
          setEmail(res.data[0].Email);
          igrejaRef.current.focus();
        }
        // setPosts(() => [...res.data]);
        // setArray
      } else {
        nomeRef.current.focus();
        //        handleComprar();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  //= ======================================================================
  // validação dos dados
  //= ======================================================================
  // Nome

  const handleValidarNome = () => {
    const valorNome = nome;
    let valNome = false;
    //  if (!validacaoNome) nomeRef.current.focus();

    if (valorNome !== '') {
      const regName =
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(valorNome);

      if (!vaiNome) {
        valNome = false;
      } else {
        valNome = true;
      }
    } else {
      valNome = false;
    }

    if (!valNome) {
      setValidarNome(valNome);
      nomeRef.current.focus();
    }
    return valNome;
  };

  // Email
  const handlevalidarEmail = () => {
    const valEmail = validator.isEmail(email);
    if (!valEmail) {
      toast.error('Email Invalido!', {
        position: toast.POSITION.TOP_CENTER,
      });
      setValidarEmail(valEmail);
      emailRef.current.focus();
    }
    return valEmail;
  };
  const handleVoltar = () => {
    setLoading(true);
    router.push({
      pathname: './comprar',
      //   query: { dadosMesa2, numeroGame },
    });
  };

  const handleValidarFone = () => {
    const valorfone = fone;
    let valfone = false;
    //  if (!validacaofone) foneRef.current.focus();

    if (valorfone !== '' && fone) {
      if (fone && fone.length < 14) {
        valfone = false;
      } else {
        valfone = true;
      }
    } else {
      valfone = false;
    }
    if (!valfone) {
      toast.error('Numero do Celular Incompleto!', {
        position: toast.POSITION.TOP_CENTER,
      });
      foneRef.current.focus();
    }
    return valfone;
  };

  const handleChecarNascimento = () => {
    const result = moment(nascimento, 'DD/MM/YYYY', true).isValid();
    if (!result) {
      toast.error('Data Inválida !', {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelect(false);
      nascimentoRef.current.focus();
    } else setSelect(true);
    const idade = CalculaIdade(nascimento);

    if (idade < 18 && eventoSelecionado.TipoEvento === 'Individual') {
      toast.error(`${idade} anos é Menor, volte e escolha a opção Menor  !`, {
        position: toast.POSITION.TOP_CENTER,
      });
      nascimentoRef.current.focus();
    }
  };
  React.useEffect(async () => {
    if (nascimento.length === 10) handleChecarNascimento();
  }, [nascimento]);

  const handleFPDinhero = async () => {
    let liberar = true;
    liberar = handleValidarNome();
    liberar = handlevalidarEmail();
    /* if (GM.label === 'Selecione...') {
      toast.error('Selecione seu Grau Ministerial!', {
        position: toast.POSITION.TOP_CENTER,
      });
      GMRef.current.focus();
      liberar = false;
    } */
    if (liberar)
      if (igreja.label === 'Qual sua Igreja') {
        toast.error('Identifique sua Igreja!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        igrejaRef.current.focus();
      }
    if (liberar)
      if (temHospedagem && testeCidade.label === 'Escolha SIM ou NÃO') {
        toast.error(
          'Falta dizer se mora ou não na mesma cidade onde acontecerá o evento!',
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
        liberar = false;
        testeCidadeRef.current.focus();
      }
    if (liberar)
      if (temHospedagem && testeCidade.label === 'SIM')
        if (cidade === '') {
          toast.error('Identifique sua Cidade Atual!', {
            position: toast.POSITION.TOP_CENTER,
          });
          liberar = false;
          cidadeRef.current.focus();
        }
    if (liberar)
      if (
        temHospedagem &&
        testeCidade.label === 'NÃO' &&
        hospedagem.label === 'Escolha SIM ou NÃO'
      ) {
        toast.error('Faltou dizer se precisa de Hospedagem!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        hospedagemRef.current.focus();
      }
    if (liberar)
      if (
        hospedagem.label === 'SIM' &&
        transporte.label === 'Como irá chegar na cidade'
      ) {
        toast.error('Faltou dizer se precisa de Hospedagem!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        transporteRef.current.focus();
      }

    if (liberar) handleChecarNascimento();
    if (liberar)
      if (!moment(nascimento, 'DD/MM/YYYY', true).isValid) liberar = false;

    if (liberar)
      if (sexo.label === 'Selecione...') {
        toast.error('Idique seu Sexo!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        sexoRef.current.focus();
      }
    if (liberar) liberar = handleValidarFone();
    if (liberar)
      if (fPagamento.label === 'Qual a forma de pagamento') {
        toast.error('Escolha a forma de pagamento!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        fpRef.current.focus();
      }
    if (liberar)
      if (!usuario) {
        toast.error(
          'Código inválido, somente a secretaria pode escolher a opção Dinheiro, caso não seja, esolha outra forma de pagamento.',
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
        liberar = false;
        fpRef.current.focus();
      }
    //  const novaData = new Date(ConverteData2(nascimento));
    if (liberar) {
      // valor Primeiro Lote
      const fpag = fPagamento.label;
      const grau = GM.label;
      const igrejas = igreja.label;
      const jEstadual = cidade;
      const genero = sexo.label;
      let estadia = '';
      if (temHospedagem) estadia = hospedagem.label;
      setLoading2(true);
      router.push({
        pathname: './pagamento',
        query: {
          jurisdicaoEvento: eventoSelecionado.Jurisdicao,
          logoEvento: eventoSelecionado.LogoEvento,
          nome,
          cpf,
          email,
          total,
          qtyA,
          qtyC1,
          qtyC2,
          fpag,
          fone,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada,
          horario: `${horario.$H}:${horario.$m}`,
          estadia,
          transporte: transporte.label,
          Responsavel: 'Adulto',
          Secretaria: usuario || '',
          Evento: eventoSelecionado.nomeEvento,
          Jurisdicao: igrejaEscolhida.NomeJurisdicao
            ? igrejaEscolhida.NomeJurisdicao
            : 'sem Jurisdicao',
          Distrito: igrejaEscolhida.NomeDistrito
            ? igrejaEscolhida.NomeDistrito
            : 'sem Distrito',
        },
      });
    }
  };
  const handleFazerPagamento = async () => {
    let liberar = true;
    liberar = handleValidarNome();
    liberar = handlevalidarEmail();
    /* if (GM.label === 'Selecione...') {
      toast.error('Selecione seu Grau Ministerial!', {
        position: toast.POSITION.TOP_CENTER,
      });
      GMRef.current.focus();
      liberar = false;
    } */
    if (liberar)
      if (igreja.label === 'Qual sua Igreja') {
        toast.error('Identifique sua Igreja!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        igrejaRef.current.focus();
      }
    if (liberar)
      if (temHospedagem && testeCidade.label === 'Escolha SIM ou NÃO') {
        toast.error(
          'Falta dizer se mora ou não na mesma cidade onde acontecerá o evento!',
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
        liberar = false;
        testeCidadeRef.current.focus();
      }
    if (liberar)
      if (temHospedagem && testeCidade.label === 'SIM')
        if (cidade === '') {
          toast.error('Identifique sua Cidade Atual!', {
            position: toast.POSITION.TOP_CENTER,
          });
          liberar = false;
          cidadeRef.current.focus();
        }
    if (liberar)
      if (
        temHospedagem &&
        testeCidade.label === 'NÃO' &&
        hospedagem.label === 'Escolha SIM ou NÃO'
      ) {
        toast.error('Faltou dizer se precisa de Hospedagem!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        hospedagemRef.current.focus();
      }
    if (liberar)
      if (
        hospedagem.label === 'SIM' &&
        transporte.label === 'Como irá chegar na cidade'
      ) {
        toast.error('Faltou dizer se precisa de Hospedagem!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        transporteRef.current.focus();
      }

    if (liberar) handleChecarNascimento();
    if (liberar)
      if (!moment(nascimento, 'DD/MM/YYYY', true).isValid) liberar = false;
    if (liberar)
      if (sexo.label === 'Selecione...') {
        toast.error('Idique seu Sexo!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        sexoRef.current.focus();
      }
    if (liberar) liberar = handleValidarFone();
    if (liberar)
      if (fPagamento.label === 'Qual a forma de pagamento') {
        toast.error('Escolha a forma de pagamento!', {
          position: toast.POSITION.TOP_CENTER,
        });
        liberar = false;
        fpRef.current.focus();
      }

    //  const novaData = new Date(ConverteData2(nascimento));
    if (liberar) {
      const fpag = fPagamento.label;
      const grau = GM.label;
      const jEstadual = cidade;
      const igrejas = igreja.label;
      const genero = sexo.label;
      let estadia = '';
      if (temHospedagem) estadia = hospedagem.label;
      setLoading2(true);
      router.push({
        pathname: './pagamento',
        query: {
          jurisdicaoEvento: eventoSelecionado.Jurisdicao,
          logoEvento: eventoSelecionado.LogoEvento,
          nome,
          cpf,
          email,
          total,
          qtyA,
          qtyC1,
          qtyC2,
          fpag,
          fone,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada,
          horario,
          estadia,
          Responsavel: 'Adulto',
          transporte,
          Evento: eventoSelecionado.nomeEvento,
          Jurisdicao: igrejaEscolhida.NomeJurisdicao
            ? igrejaEscolhida.NomeJurisdicao
            : 'sem Jurisdicao',
          Distrito: igrejaEscolhida.NomeDistrito
            ? igrejaEscolhida.NomeDistrito
            : 'sem Distrito',
        },
      });
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;
      if (form === 'Nome') emailRef.current.focus();
      if (form === 'Email') igrejaRef.current.focus();
      if (form === 'Igreja') cidadeRef.current.focus();
      if (form === 'Cidade') nascimentoRef.current.focus();
      if (form === 'Nascimento') sexoRef.current.focus();
      if (form === 'Sexo') foneRef.current.focus();
      if (form === 'Fone')
        if (eventoSelecionado.Hospedagem) hospedagemRef.current.focus();
        else fpRef.current.focus();
      if (form === 'Hospedagem') dataChegadaRef.current.focus();
      if (form === 'DataChegada') horarioRef.current.focus();
      if (form === 'Horario') transporteRef.current.focus();
      if (form === 'Transporte') fpRef.current.focus();
      if (form === 'CodigoSec') botaoRef.current.focus();
      if (form === 'FPagamento') botaoRef.current.focus();
    }
  };
  /* 
  React.useEffect(async () => {
    if (hospedagem.label === 'Escola Bíblica') setOcultar(true);
    else setOcultar(false);
  }, [hospedagem]); */

  React.useEffect(async () => {
    if (fPagamento.label === 'Dinheiro (apenas secretaria)') {
      setOcultarFp(true);
      botaoRef.current.focus();
    } else {
      setOcultarFp(false);
      botaoRef.current.focus();
    }
  }, [fPagamento]);

  //= ====================================================================
  return (
    <Box
      height="100vh"
      width="100vw"
      minHeight={570}
      style={{ backgroundColor: corIgreja.principal2 }}
    >
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        height="100%"
      >
        <Box height="100%">
          <Box
            width="100vw"
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            height="100%"
          >
            <AppBar className={classes.root2}>
              <Box
                width="90%"
                // maxWidth={450}
                bgcolor={corIgreja.principal}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="4vh"
                style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                ml={0}
              >
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  ml={2}
                  width="10%"
                >
                  {loading ? (
                    <Box>
                      <Oval stroke="white" width={25} height={25} />
                    </Box>
                  ) : (
                    <TiArrowBack
                      size={25}
                      color="white"
                      onClick={() => {
                        setLoading(true);
                        handleVoltar();
                      }}
                    />
                  )}
                </Box>
                <Box
                  width="80%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Box fontFamily="Fugaz One" width="100%" textAlign="center">
                    DADOS DO COMPRADOR
                  </Box>
                </Box>

                <Box width="10%" />
              </Box>
            </AppBar>
            <Box width="90%" height="calc(100% - 80px)" mb={0}>
              <Box
                mt={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                bgcolor={corIgreja.principal}
                style={{
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <TableContainer
                  sx={{
                    height: '100%',
                  }}
                >
                  <List sx={{ width: '100%', height: '100%' }}>
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 64,
                        width: '100%',

                        alignItems: 'center',
                      }}
                    >
                      <ListItemText color="white" width="100%">
                        <Box mb={2}>
                          <Grid item xs={12} md={12}>
                            <Box
                              ml={2}
                              color={validarNome ? 'white' : '#ffcdd2'}
                              sx={{ fontSize: '12px' }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Nome
                              </Typography>
                            </Box>
                            <Box className={classes.novoBox} mt={-2}>
                              <TextField
                                autoComplete="off"
                                className={classes.tf_m}
                                disabled={desabilitaGM}
                                id="Nome"
                                inputRef={nomeRef}
                                placeholder="Nome de quem está se Inscrevendo"
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  style: {
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    background:
                                      nome.length < 3 ? '#f0f4c3' : '#d0f4c3',
                                  },
                                }}
                                value={nome || ''}
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                  setNome(e.target.value.toUpperCase());
                                  setValidarNome(true);
                                }}
                                onFocus={(e) => {
                                  setNome(e.target.value);
                                }}
                                onBlur={(e) => {
                                  setNome(e.target.value);
                                  handleValidarNome();
                                }}
                                onKeyDown={handleEnter}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Box
                              mt={1}
                              ml={2}
                              color={validarEmail ? 'white' : '#ffcdd2'}
                              sx={{ fontSize: '12px' }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Email
                              </Typography>
                            </Box>
                            <Box className={classes.novoBox} mt={-2}>
                              <TextField
                                autoComplete="off"
                                className={classes.tf_m}
                                inputProps={{
                                  style: {
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    background: !validator.isEmail(email)
                                      ? '#f0f4c3'
                                      : '#d0f4c3',
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
                                placeholder="Email para envio de comprovante"
                                size="small"
                                onChange={(e) => {
                                  const novoEmail = e.target.value;
                                  setValidarEmail(true);
                                  const emailSemEspaco = novoEmail.replace(
                                    / /g,
                                    '',
                                  );
                                  setEmail(emailSemEspaco.toLowerCase());
                                }}
                                onBlur={handlevalidarEmail}
                                onFocus={(e) => setEmail(e.target.value)}
                                onKeyDown={handleEnter}
                                inputRef={emailRef}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Box
                              mt={1}
                              ml={2}
                              color="white"
                              sx={{ fontSize: '12px' }}
                              display="none"
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Função na IDPB
                              </Typography>
                            </Box>
                            <Box
                              display="none"
                              className={classes.novoBox}
                              mt={-2}
                            >
                              <Select
                                isSearchable={false}
                                isDisabled={desabilitaGM}
                                styles={customStylesGM}
                                id="GM"
                                ref={GMRef}
                                value={GM || ''}
                                onChange={(e) => {
                                  // setValues2(e);
                                  setGM(e);
                                  igrejaRef.current.focus();
                                  //                          observacoesRef.current.focus();
                                }}
                                options={listaGM}
                              />
                            </Box>
                          </Grid>
                          <Grid item container xs={12}>
                            <Grid item xs={12} md={12}>
                              <Box
                                mt={1}
                                ml={2}
                                color="white"
                                sx={{ fontSize: '12px' }}
                              >
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Nome da Igreja
                                </Typography>
                              </Box>

                              <Box className={classes.novoBox} mt={-2}>
                                <Select
                                  menuPlacement="top"
                                  styles={customStylesIgreja}
                                  id="Igreja"
                                  ref={igrejaRef}
                                  value={igreja || ''}
                                  onChange={(e) => {
                                    // setValues2(e);
                                    setIgreja(e);

                                    //    igrejaRef.current.focus();
                                    nascimentoRef.current.focus();

                                    //                          observacoesRef.current.focus();
                                  }}
                                  options={listaIgrejas}
                                />
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid item container xs={12}>
                            <Grid item xs={6} md={6}>
                              <Box
                                mt={1}
                                ml={2}
                                color="white"
                                sx={{ fontSize: '12px' }}
                              >
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Data Nascimento
                                </Typography>
                              </Box>
                              <Box className={classes.novoBox} mt={-2}>
                                <TextField
                                  autoComplete="off"
                                  className={classes.tf_m}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                      fontSize: '12px',
                                      background: !moment(
                                        nascimento,
                                        'DD/MM/YYYY',
                                        true,
                                      ).isValid()
                                        ? '#f0f4c3'
                                        : '#d0f4c3',
                                    },
                                  }}
                                  id="Nascimento"
                                  type="tel"
                                  InputLabelProps={{
                                    style: {
                                      textTransform: 'uppercase',
                                    },
                                    shrink: true,
                                  }}
                                  value={nascimento ? dataMask(nascimento) : ''}
                                  variant="outlined"
                                  placeholder="dd/mm/aaaa"
                                  size="small"
                                  onChange={(e) => {
                                    const novoNascimento = e.target.value;
                                    setNascimento(novoNascimento);
                                  }}
                                  onBlur={handleChecarNascimento}
                                  onFocus={(e) => setNascimento(e.target.value)}
                                  onKeyDown={handleEnter}
                                  inputRef={nascimentoRef}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Box
                                mt={1}
                                ml={2}
                                color="white"
                                sx={{ fontSize: '12px' }}
                              >
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Sexo
                                </Typography>
                              </Box>
                              <Box className={classes.novoBox} mt={-2}>
                                <Select
                                  menuPlacement="top"
                                  styles={customStylesSexo}
                                  isSearchable={false}
                                  id="Sexo"
                                  ref={sexoRef}
                                  value={sexo || ''}
                                  onChange={(e) => {
                                    setSexo(e);
                                    foneRef.current.focus();
                                  }}
                                  options={listaSexo}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid item container xs={12}>
                            <Grid item xs={12} md={12}>
                              <Box
                                mt={1}
                                ml={2}
                                color="white"
                                sx={{ fontSize: '12px' }}
                              >
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Celular
                                </Typography>
                              </Box>
                              <Box className={classes.novoBox} mt={-2}>
                                <TextField
                                  autoComplete="off"
                                  className={classes.tf_m}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                      fontSize: '12px',
                                      background:
                                        fone && celularMask(fone).length < 14
                                          ? '#f0f4c3'
                                          : '#d0f4c3',
                                    },
                                  }}
                                  id="Fone"
                                  inputRef={foneRef}
                                  //                      ref={cpfRef}
                                  // // // label="CPF"
                                  type="tel"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onBlur={handleValidarFone}
                                  value={fone ? celularMask(fone) : ''}
                                  variant="outlined"
                                  placeholder="(99) 9999-9999"
                                  size="small"
                                  onChange={(e) => {
                                    setFone(e.target.value);
                                  }}
                                  onFocus={(e) => setFone(e.target.value)}
                                  onKeyDown={handleEnter}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid item container xs={12}>
                            {eventoSelecionado.Hospedagem ? (
                              <Grid item xs={12} md={12}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Reside na Cidade onde será o evento?
                                  </Typography>
                                </Box>

                                <Box className={classes.novoBox} mt={-2}>
                                  <Select
                                    menuPlacement="top"
                                    styles={customStylesTesteCidade}
                                    isSearchable={false}
                                    id="TesteCidade"
                                    ref={testeCidadeRef}
                                    value={testeCidade || ''}
                                    onChange={(e) => {
                                      // setValues2(e);
                                      if (
                                        e.label.toLocaleUpperCase() === 'SIM'
                                      ) {
                                        setCidade('local do evento');
                                        setHospedagem({
                                          label: 'NÃO',
                                          value: 0,
                                        });
                                        fpRef.current.focus();
                                      } else {
                                        setCidade('');
                                        setHospedagem({
                                          label: 'Escolha SIM ou NÃO',
                                          value: 0,
                                        });
                                        setCidade('');

                                        // cidadeRef.current.focus();
                                      }
                                      setTesteCidade(e);
                                    }}
                                    options={listaHospedagem}
                                  />
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>
                          <Grid item container xs={12}>
                            {testeCidade.label === 'NÃO' ? (
                              <Grid item xs={12} md={12}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Cidade onde Mora - Estado
                                  </Typography>
                                </Box>

                                <Box className={classes.novoBox} mt={-2}>
                                  <TextField
                                    autoComplete="off"
                                    className={classes.tf_m}
                                    inputProps={{
                                      style: {
                                        textAlign: 'center',
                                        fontSize: '12px',
                                        background:
                                          cidade.length < 4
                                            ? '#f0f4c3'
                                            : '#d0f4c3',
                                      },
                                    }}
                                    id="Cidade"
                                    type="text"
                                    InputLabelProps={{
                                      style: {
                                        textTransform: 'uppercase',
                                      },
                                      shrink: true,
                                    }}
                                    value={cidade || ''}
                                    variant="outlined"
                                    placeholder="ex.: Manaus - AM"
                                    size="small"
                                    onChange={(e) => {
                                      setCidade(e.target.value.toUpperCase());
                                    }}
                                    onFocus={(e) => setCidade(e.target.value)}
                                    onKeyDown={handleEnter}
                                    inputRef={nascimentoRef}
                                  />
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>
                          <Grid item container xs={12}>
                            {testeCidade.label === 'NÃO' ? (
                              <Grid item xs={12} md={12}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  width="80%"
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Precisa de Hospedagem?
                                  </Typography>
                                </Box>
                                <Box className={classes.novoBox} mt={-2}>
                                  <Select
                                    menuPlacement="top"
                                    styles={customStylesHospedagem}
                                    isSearchable={false}
                                    id="Hospedagem"
                                    ref={hospedagemRef}
                                    value={hospedagem || ''}
                                    onChange={(e) => {
                                      // setValues2(e);
                                      setHospedagem(e);
                                      dataChegadaRef.current.focus();
                                    }}
                                    options={listaHospedagem}
                                  />
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>
                          <Box
                            display={
                              hospedagem.label.toLocaleUpperCase() === 'SIM'
                                ? 'flex'
                                : 'none'
                            }
                          >
                            <Grid item container xs={12}>
                              <Grid item xs={6} md={6}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Data da Chegada
                                  </Typography>
                                </Box>
                                <Box className={classes.novoBox} mt={-2}>
                                  <TextField
                                    autoComplete="off"
                                    className={classes.tf_m}
                                    inputProps={{
                                      style: {
                                        textAlign: 'center',
                                        background:
                                          dataChegada.length < 9
                                            ? '#f0f4c3'
                                            : '#d0f4c3',
                                      },
                                    }}
                                    id="DataChegada"
                                    type="tel"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={
                                      dataChegada ? dataMask(dataChegada) : ''
                                    }
                                    variant="outlined"
                                    placeholder="dd/mm/aaaa"
                                    size="small"
                                    onChange={(e) => {
                                      setDataChegada(e.target.value);
                                    }}
                                    onFocus={(e) =>
                                      setDataChegada(e.target.value)
                                    }
                                    onKeyDown={handleEnter}
                                    inputRef={dataChegadaRef}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={6} md={6}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Horario da Chegada
                                  </Typography>
                                </Box>
                                <Box className={classes.novoBox} mt={-2}>
                                  <Paper
                                    style={{
                                      background: '#fafafa',
                                      height: 40,
                                    }}
                                  >
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DesktopTimePicker
                                        ampm={false}
                                        inputRef={horarioRef}
                                        value={horario || ''}
                                        variant="inline"
                                        onChange={(newValue) => {
                                          setHorario(newValue);
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            style={{
                                              marginLeft: 10,
                                              marginRight: 10,
                                              marginTop: 5,
                                              height: 30,
                                              background: '#fafafa',
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </Paper>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          <Grid item container xs={12}>
                            {hospedagem.label.toLocaleUpperCase() === 'SIM' ? (
                              <Grid item xs={12} md={12}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  width="80%"
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Chegará na Cidade de?
                                  </Typography>
                                </Box>
                                <Box className={classes.novoBox} mt={-2}>
                                  <Select
                                    menuPlacement="top"
                                    styles={customStylesTransporte}
                                    isSearchable={false}
                                    id="Transporte"
                                    ref={transporteRef}
                                    value={transporte || ''}
                                    onChange={(e) => {
                                      // setValues2(e);
                                      setTransporte(e);
                                      fpRef.current.focus();
                                    }}
                                    options={listaTransporte}
                                  />
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Box
                              mt={1}
                              ml={2}
                              color="white"
                              sx={{ fontSize: '12px' }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Forma de Pagamento
                              </Typography>
                            </Box>
                            <Box className={classes.novoBox} mt={-2}>
                              <Select
                                isSearchable={false}
                                isDisabled={!select}
                                menuPlacement="top"
                                styles={customStylesFP}
                                id="FormaPagamento"
                                ref={fpRef}
                                value={fPagamento || ''}
                                onChange={(e) => {
                                  // setValues2(e);
                                  setFPagamento(e);

                                  botaoRef.current.focus();
                                }}
                                options={opcoesFPagamento}
                              />
                            </Box>
                          </Grid>
                          {/* <Box display={ocultarFp ? '' : 'none'}>
                            <Grid item container xs={12}>
                              <Grid item xs={12} md={12}>
                                <Box
                                  mt={1}
                                  ml={2}
                                  color="white"
                                  sx={{ fontSize: '12px' }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Código da Secretaria
                                  </Typography>
                                </Box>
                                <Box className={classes.novoBox} mt={-2}>
                                  <TextField
                                    autoComplete="off"
                                    className={classes.tf_m}
                                    inputProps={{
                                      style: {
                                        textAlign: 'center',
                                        background:
                                          codigoSecretaria.length < 4
                                            ? '#f0f4c3'
                                            : '#d0f4c3',
                                      },
                                    }}
                                    id="CodigoSec"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={codigoSecretaria || ''}
                                    variant="outlined"
                                    placeholder="no mínimo 4 dígitos"
                                    size="small"
                                    onChange={(e) => {
                                      setcodigoSecretaria(e.target.value);
                                    }}
                                    onFocus={(e) =>
                                      setcodigoSecretaria(e.target.value)
                                    }
                                    onKeyDown={handleEnter}
                                    inputRef={codigoSecretariaRef}
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                          </Box> */}
                          <Grid item xs={12} md={12}>
                            <Box className={classes.novoBox} mt={2} mb={0}>
                              {loading2 ? (
                                <Box
                                  display="flex"
                                  width="100%"
                                  height={40}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Box
                                    width="80%"
                                    display="flex"
                                    height={40}
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{
                                      borderRadius: 16,
                                      background: '#ffdd55',
                                      fontFamily: 'Fugaz One',
                                    }}
                                    ref={botaoRef}
                                  >
                                    <Oval
                                      stroke="black"
                                      width={25}
                                      height={25}
                                    />
                                  </Box>
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
                                    if (ocultarFp) handleFPDinhero();
                                    else handleFazerPagamento();
                                  }}
                                  ref={botaoRef}
                                >
                                  FAZER PAGAMENTO
                                </Button>
                              )}
                            </Box>
                          </Grid>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  </List>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
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

export default Home;
