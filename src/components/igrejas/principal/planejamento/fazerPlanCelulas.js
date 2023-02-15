import { Box, Grid, Paper, TextField, Button } from '@material-ui/core';
import React from 'react';
import Stack from '@mui/material/Stack';
import useSWR, { mutate } from 'swr';
// import { useRouter } from 'next/router';
import dataMask from 'src/components/mascaras/datas';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import ConverteData from 'src/utils/dataMMDDAAAA';
import PegaData from 'src/utils/getDataQuarta';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import { IoIosSave } from 'react-icons/io';
import api from 'src/components/services/api';
import axios from 'axios';
import Espera from 'src/utils/espera';
import Erros from 'src/utils/erros';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import 'react-image-crop/dist/ReactCrop.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);
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
function createListaMembros(value, label) {
  return {
    value,
    label,
  };
}

function RelatorioCelebracao({
  rolMembros,
  perfilUser,
  dadosSem,
  semanaEnviada,
  AnoPesquisado,
  setOpenPlan,
}) {
  //  const classes = useStyles();
  // const router = useRouter();
  const classes = useStyles();

  const nomesCel = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const nomesCelulaParcial = nomesCel.map((rol) =>
    createListaMembros(rol.id, rol.Nome),
  );

  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );
  const [Encontro, setEncontro] = React.useState(dadosUser[0].Encontro);
  const [Exaltacao, setExaltacao] = React.useState(dadosUser[0].Exaltacao);
  const [Evangelismo, setEvangelismo] = React.useState(
    dadosUser[0].Evangelismo,
  );
  const [Lanche, setLanche] = React.useState(dadosUser[0].Lanche);
  const [Edificacao, setEdificacao] = React.useState(dadosUser[0].Edificacao);

  //--------------------------------------------------------------------------

  const fases = [
    { label: 'Integrar na Visão', value: 1 },
    { label: 'Comunhão', value: 2 },
    { label: 'Edificação', value: 3 },
    { label: 'Evangelismo', value: 4 },
    { label: 'multiplicacao', value: 5 },
  ];
  const valorInicial = { label: 'Escolha um Responsável', value: 0 };

  const valorInicialOjetivo = {
    label: 'Qual a fase atual da Célula?',
    value: 0,
  };

  const [values, setValues] = React.useState(valorInicial);
  const [values2, setValues2] = React.useState(valorInicial);
  const [values3, setValues3] = React.useState(valorInicial);
  const [values4, setValues4] = React.useState(valorInicial);
  const [values5, setValues5] = React.useState(valorInicial);
  const [valueAnfitriao, setValueAnfitriao] = React.useState('');
  const [progress, setProgress] = React.useState(5);
  const [multiplicacao, setMultiplicacao] = React.useState('');

  const [objetivo, setObjetivo] = React.useState(valorInicialOjetivo);
  const horarioAtual = moment(new Date()).format('MM/DD/YYYY');
  const [horario, setHorario] = React.useState(
    dayjs(new Date(`${horarioAtual} 19:30:00`)),
  );

  const multiplicacaoRef = React.useRef();
  const anfitriaoRef = React.useRef();
  const horarioRef = React.useRef();

  const [openErro, setOpenErro] = React.useState(false);

  const dataAtual2 = PegaData(semanaEnviada, AnoPesquisado);
  const [checkRelatorio, setCheckRelatorio] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [tela, setTela] = React.useState(1);
  const [carregando, setCarregando] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(PegaData(semanaEnviada, AnoPesquisado)).format('DD/MM/YYYY'),
  );
  // zera as opções dos 5 Es
  const zerarValues = () => {
    setValues(valorInicial);
    setValues2(valorInicial);
    setValues3(valorInicial);
    setValues4(valorInicial);
    setValues5(valorInicial);
    setEncontro('');
    setExaltacao('');
    setEdificacao('');
    setEvangelismo('');
    setLanche('');
    setObjetivo(valorInicialOjetivo);
    setMultiplicacao('');
    setHorario(dayjs(new Date(`${horarioAtual} 19:30:00`)));
    setValueAnfitriao('');
  };

  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  //= ==================================================================

  const getData = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'Multiplicacao') horarioRef.current.focus();
      if (formId === 'Horario') {
        if (horario.length < 5)
          toast.error('Horário incompleto !', {
            position: toast.POSITION.TOP_CENTER,
          });
        else anfitriaoRef.current.focus();
      }

      if (formId === 'Anfitriao') {
        // bProximoRef.current.focus();

        event.target.blur();
        event.preventDefault();
      }
    }
  };
  //= ==========pegar semana apartir da data==============
  const semanaExata = (dataEnviada) => {
    const Ano = dataEnviada.getFullYear();
    const Mes = dataEnviada.getMonth();
    const Dia = dataEnviada.getDate();
    const firstSun = new Date(2021, 0, 1);
    const lastSun = new Date(Ano, Mes, Dia);
    while (firstSun.getDay() !== 2) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 2) {
      lastSun.setDate(lastSun.getDate() + 1);
    }

    let result = 0;
    for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
      lastSun.setDate(lastSun.getDate() - 7);
      if (i > 52) i = 1;
      result = i;
    }

    return result;
  };
  //= =================================================================

  const [semana, setSemana] = React.useState(semanaEnviada);
  const [existeRelatorio, setExisteRelatorio] = React.useState('inicio');
  const [podeEditar, setPodeEditar] = React.useState(true);
  const [etapas, setEtapas] = React.useState('incompleto');
  const [inputValor, setInputValor] = React.useState('');

  const url = `/api/consultaPlanejamentoCelulas/${semana}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);

  const carregaResponsaveis = (relatorio) => {
    if (relatorio) {
      const newValues = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Encontro,
      );
      setEncontro(relatorio[0].Encontro);
      setValues(newValues[0]);

      const newValues2 = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Exaltacao,
      );

      setExaltacao(relatorio[0].Exaltacao);
      setValues2(newValues2[0]);
      setMultiplicacao(relatorio[0].Multiplicacao);
      const horarioNovo = dayjs(
        new Date(`${horarioAtual} ${relatorio[0].Horario}:00`),
      );

      setHorario(horarioNovo);

      const newAnfitriao = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Anfitriao,
      );

      if (newAnfitriao.length) setValueAnfitriao(newAnfitriao[0].label);

      const newFase = fases.filter((val) => val.label === relatorio[0].Fase);

      if (newFase.length) {
        setObjetivo(newFase[0]);
      }
      const newValues3 = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Edificacao,
      );
      setEdificacao(relatorio[0].Edificacao);
      setValues3(newValues3[0]);

      const newValues4 = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Evangelismo,
      );
      setEvangelismo(relatorio[0].Evangelismo);
      setValues4(newValues4[0]);

      const newValues5 = nomesCelulaParcial.filter(
        (val) => val.label === relatorio[0].Lanche,
      );
      setLanche(relatorio[0].Lanche);
      setValues5(newValues5[0]);
    }
  };
  const ajusteRelatorio = () => {
    setTela(1);
    setCarregando(false);
    let relExiste = 'inicio';
    if (members) relExiste = 'sem'; // setExisteRelatorio('sem');

    setExisteRelatorio(relExiste);
    if (dadosSem && dadosSem.length > 0) {
      const relatorio = dadosSem.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (relatorio && relatorio.length) {
        relExiste = 'sim';
        const dataAgora = new Date();
        const semanaAgora = semanaExata(dataAgora);
        if (semanaAgora - semana < 3) setPodeEditar(true);
        else setPodeEditar(false);

        setExisteRelatorio(true); // avisa que tem relatório
        setTela(1);
        setCheckRelatorio(true);

        carregaResponsaveis(relatorio);
      } else {
        setExisteRelatorio('sem'); // avisa que tem relatório
        // setCheckRelatorio(false);
      }
    }

    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    return 0;
  };
  const ajusteRelatorioInicial = () => {
    setTela(1);
    setCarregando(false);
    let relExiste = 'inicio';
    if (dadosSem) relExiste = 'sem'; // setExisteRelatorio('sem');

    setExisteRelatorio(relExiste);
    if (dadosSem && dadosSem.id) {
      const relatorio = dadosSem;
      if (relatorio && relatorio.id) {
        relExiste = 'sim';
        const dataAgora = new Date();
        const semanaAgora = semanaExata(dataAgora);

        if (semanaAgora - semana < 3) setPodeEditar(true);
        else setPodeEditar(false);

        const date1 = moment(dataAgora);
        const date2 = moment(selectedDate);
        const diff = date2.diff(date1, 'seconds') + 3600;
        if (diff > -650637) setPodeEditar(true);
        else setPodeEditar(false);
        setExisteRelatorio(true); // avisa que tem relatório
        setTela(1);
        setCheckRelatorio(true);

        const novoRel = [];
        novoRel[0] = relatorio;

        carregaResponsaveis(novoRel);
      } else {
        setExisteRelatorio('sem'); // avisa que tem relatório
        // setCheckRelatorio(false);
      }
    }

    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    return 0;
  };

  // comparar datas
  /*   const dataAgora = new Date();
  const date1 = moment(dataAgora);
  const date2 = moment(selectedDate);
  const diff = date2.diff(date1, 'seconds') + 3600;
 */

  React.useEffect(() => {
    ajusteRelatorio();

    return 0;
  }, [checkRelatorio]);

  React.useEffect(() => {
    if (dadosSem) {
      const relatorio = [];
      relatorio[0] = dadosSem;

      ajusteRelatorioInicial();
    }

    return 0;
  }, [dadosSem]);

  //= ========================calcular adulto e crianca========================

  React.useEffect(() => {
    //  contEffect += 1;
    if (selectedDate) {
      const checkAno = selectedDate.getFullYear();
      setCheckRelatorio(true);
      // selectedDate.setTime(selectedDate.getTime() + 1000 * 60);
      if (checkAno > 2020) {
        const semanaNova = semanaExata(selectedDate);
        if (semanaNova !== semanaEnviada || checkAno !== AnoPesquisado) {
          zerarValues();
          setCheckRelatorio(false);
          setExisteRelatorio('inicio');
          setSemana(semanaExata(selectedDate));
        }
      }
    }
  }, [selectedDate]);
  React.useEffect(() => {
    if (Encontro && Exaltacao && Evangelismo && Edificacao && Lanche) {
      setEtapas('completo');
    }
  }, [
    Exaltacao,
    Encontro,
    Evangelismo,
    Edificacao,
    Lanche,
    objetivo,
    valueAnfitriao,
    multiplicacao,
  ]);
  const handleSalvar = () => {
    if (etapas === 'completo') {
      setCarregando(true);
      const horaSalva = `${horario.$H}:${horario.$m}`;
      // const nomesMembros = JSON.parse(RelDiscipuladoFinal.NomesMembros);
      const novaData = new Date(ConverteData(inputValue));
      api
        .post('/api/criarPlanejamentoCelula', {
          Encontro: String(Encontro),
          Exaltacao,
          Edificacao,
          Evangelismo,
          Lanche,
          Semana: semana,
          Data: novaData,
          Celula: Number(perfilUser.Celula),
          Supervisao: Number(perfilUser.Supervisao),
          Coordenacao: Number(perfilUser.Coordenacao),
          Distrito: Number(perfilUser.Distrito),
          Fase: objetivo.label,
          Anfitriao: valueAnfitriao,
          Multiplicacao: multiplicacao,
          Horario: horaSalva,
        })
        .then((response) => {
          if (response) {
            // enviarPontuacao();
            setOpenPlan(false);
            setCarregando(false);
            mutate(url);
          }
        })
        .catch(() => {
          setOpenErro(true);

          setCarregando(false);
        });
    } else {
      toast.error('PREENCHA TODOS OS DADOS !', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  React.useEffect(() => {
    let timer;

    if (progress === 4) setLoading(false);
    if (loading) {
      let prevProgress = 5;
      timer = setInterval(() => {
        prevProgress -= 1;

        if (prevProgress < 0) {
          prevProgress = 0;
          //   router.reload(window.location.pathname);
          /*  router.push({
          pathname: '/Perfil',
          //      query: { idCompra, qrCode, qrCodeCopy },
        }); */
        }

        if (prevProgress === 0) setLoading(false);
        setProgress(prevProgress);
      }, 800);
    }
    return () => {
      clearInterval(timer);
    };
  }, [selectedDate]);

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
        width="96%"
        height="97%"
        minHeight={550}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={16}
        bgcolor={corIgreja.principal} // cor principal tela inteira
      >
        {checkRelatorio ? (
          <Box
            height="100%"
            minWidth={300}
            width="100%"
            mt={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box minWidth={300} height="100%" width="100vw" maxWidth="1410px">
              <Box height="100%">
                <Box
                  height="10%"
                  minHeight={75}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={corIgreja.principal}
                  style={{}}
                >
                  <Box width="90%" ml={1}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mb={1}
                    >
                      <Grid item xs={7} md={7} lg={7} xl={7}>
                        <Paper style={{ background: '#fafafa', height: 40 }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justifyContent="center">
                              <KeyboardDatePicker
                                open={open}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                id="date-picker-inline"
                                value={selectedDate}
                                inputValue={inputValue}
                                onClick={handleDateClick}
                                onChange={handleDateChange}
                                onClose={getData()}
                                style={{
                                  marginLeft: 10,
                                  marginRight: 10,
                                  marginTop: 5,
                                  height: 30,
                                  background: '#fafafa',
                                }}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </Paper>
                      </Grid>
                    </Box>
                  </Box>
                </Box>

                <Box
                  height="73.9%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={343}
                  width="100%"
                  bgcolor={corIgreja.principal}
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
                      <Box
                        height="63.7%"
                        minHeight={330}
                        bgcolor={corIgreja.principal}
                        width="100%"
                      >
                        {tela === 1 && (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            width="100%"
                            height="100%"
                          >
                            <Box
                              height="10%"
                              width="100%"
                              minHeight={70}
                              mb={5}
                              mt={-2}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderBottom="2px solid #fff"
                              borderTop="2px solid #fff"
                              bgcolor={corIgreja.principal}
                              sx={{
                                color: '#fff',
                                fontFamily: 'Geneva',
                                fontWeight: 'bold',
                                fontSize: '20px',
                              }}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                              >
                                <Box
                                  sx={{ fontSize: '16px' }}
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  height="100%"
                                  borderRight="2px solid #fff"
                                  width="50%"
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    CÉLULA
                                  </Box>
                                  <Box
                                    fontFamily="arial black"
                                    color="white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    {perfilUser.Celula}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontSize: '16px' }}
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  height="100%"
                                  width="50%"
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    SEMANA
                                  </Box>
                                  <Box
                                    fontFamily="arial black"
                                    color="white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    {semana}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mt={0}
                              ml={0}
                              width="96%"
                              height="100%"
                              bgcolor={corIgreja.principal}
                            >
                              <Box width="96%">
                                <Box
                                  color={corIgreja.iconeOn}
                                  fontFamily="arial black"
                                  fontSize="20px"
                                  mb={5}
                                  mt={-2}
                                  textAlign="center"
                                >
                                  PLANEJAMENTO DA CÉLULA
                                </Box>
                                <Grid container spacing={2}>
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
                                    <Box className={classes.novoBox2} mt={-2}>
                                      <Select
                                        id="Objetivo"
                                        value={objetivo}
                                        onChange={(e) => {
                                          // setValues2(e);
                                          setObjetivo(e);
                                          multiplicacaoRef.current.focus();
                                        }}
                                        options={fases}
                                      />
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
                                    <Box ml={1.4} mt={0}>
                                      <Box>
                                        <TextField
                                          className={classes.tf_m}
                                          inputProps={{
                                            style: {
                                              width: '100%',
                                              textAlign: 'center',

                                              WebkitBoxShadow:
                                                '0 0 0 1000px #fafafa  inset',
                                            },
                                          }}
                                          id="Multiplicacao"
                                          // label="Matricula"
                                          type="tel"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          value={dataMask(multiplicacao)}
                                          variant="standard"
                                          placeholder="dd/mm/aaaa"
                                          onChange={(e) => {
                                            setMultiplicacao(e.target.value);
                                          }}
                                          onFocus={(e) => {
                                            setMultiplicacao(e.target.value);
                                          }}
                                          onKeyDown={handleEnter}
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
                                    <Box width="100%" ml={1.4} mt={0}>
                                      <Box width="90%">
                                        <Paper
                                          style={{
                                            background: '#fafafa',
                                            height: 32,
                                          }}
                                        >
                                          <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                          >
                                            <DesktopTimePicker
                                              ampm={false}
                                              inputRef={horarioRef}
                                              value={horario}
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
                                                    marginTop: 0,
                                                    height: 30,
                                                    background: '#fafafa',
                                                  }}
                                                />
                                              )}
                                            />
                                          </LocalizationProvider>
                                        </Paper>
                                      </Box>
                                    </Box>
                                  </Grid>
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
                                        ANFITRIÃO DA CÉLULA
                                      </Typography>
                                    </Box>

                                    <Box className={classes.novoBox} mt={-2}>
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
                                          <Stack
                                            spacing={2}
                                            sx={{ width: 300 }}
                                          >
                                            <Autocomplete
                                              style={{
                                                width: '99%',
                                                marginTop: 10,
                                                textAlign: 'center',
                                              }}
                                              id="Anfitriao"
                                              freeSolo
                                              value={valueAnfitriao}
                                              onChange={(_, newValue) => {
                                                if (inputValor && newValue)
                                                  setValueAnfitriao(newValue);
                                                else setValueAnfitriao('');
                                              }}
                                              onBlur={() => {
                                                if (inputValor.length > 0)
                                                  setValueAnfitriao(inputValor);
                                              }}
                                              selectOnFocus
                                              inputValue={inputValor}
                                              onInputChange={(
                                                _,
                                                newInputValue,
                                              ) => {
                                                if (newInputValue !== '')
                                                  setInputValor(
                                                    newInputValue.toUpperCase(),
                                                  );
                                                else setInputValor('');
                                              }}
                                              options={nomesCelulaParcial.map(
                                                (option) => option.label,
                                              )}
                                              renderInput={(params) => (
                                                <TextField
                                                  className={classes.textField}
                                                  {...params}
                                                  inputRef={anfitriaoRef}
                                                  onKeyDown={handleEnter}
                                                  placeholder="Na casa de quem será a Célula"
                                                />
                                              )}
                                            />
                                          </Stack>
                                        </Box>
                                      </Paper>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                        )}

                        {tela === 2 && (
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
                              mt={0}
                              ml={0}
                              width="96%"
                              height="100%"
                              bgcolor={corIgreja.principal}
                            >
                              <Box width="96%">
                                <Grid container spacing={2}>
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
                                        Quebra Gelo
                                      </Typography>
                                    </Box>

                                    <Box className={classes.novoBox} mt={-2}>
                                      <Select
                                        defaultValue={values}
                                        onChange={(e) => {
                                          setValues(e);
                                          setEncontro(e.label);
                                        }}
                                        options={nomesCelulaParcial}
                                      />
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
                                    <Box className={classes.novoBox} mt={-2}>
                                      <Select
                                        defaultValue={values2}
                                        onChange={(e) => {
                                          setValues2(e);
                                          setExaltacao(e.label);
                                        }}
                                        options={nomesCelulaParcial}
                                      />
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
                                    <Box className={classes.novoBox} mt={-2}>
                                      <Select
                                        defaultValue={values3}
                                        onChange={(e) => {
                                          setValues3(e);
                                          setEdificacao(e.label);
                                        }}
                                        options={nomesCelulaParcial}
                                      />
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
                                    <Box className={classes.novoBox} mt={-2}>
                                      <Select
                                        defaultValue={values4}
                                        onChange={(e) => {
                                          setValues4(e);
                                          setEvangelismo(e.label);
                                        }}
                                        options={nomesCelulaParcial}
                                      />
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
                                    <Box className={classes.novoBox} mt={-2}>
                                      <Select
                                        defaultValue={values5}
                                        onChange={(e) => {
                                          setValues5(e);
                                          setLanche(e.label);
                                        }}
                                        options={nomesCelulaParcial}
                                      />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  height="10%"
                  minHeight={75}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={corIgreja.principal}
                >
                  <Box
                    height="10%"
                    minHeight={75}
                    width="90%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={corIgreja.principal}
                    style={{
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                  >
                    <Box
                      height="10%"
                      minHeight={75}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor={corIgreja.principal}
                      width="100vw"
                    >
                      <Box
                        height="10%"
                        minHeight={75}
                        width="90%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        bgcolor={corIgreja.principal}
                        style={{
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                        }}
                      >
                        <Box width="100%" ml={1}>
                          <Box mb={1}>
                            <Grid container spacing={2}>
                              {tela === 1 && (
                                <Grid container spacing={2}>
                                  <Grid item xs={6} md={6} lg={6} xl={6}>
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
                                          ajusteRelatorio();
                                        }}
                                        startIcon={
                                          <IoArrowUndoSharp color="blue" />
                                        }
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
                                  <Grid item xs={6} md={6} lg={6} xl={6}>
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: '#feeffa',
                                        height: 40,
                                      }}
                                    >
                                      {multiplicacao.length > 9 &&
                                      horario &&
                                      String(horario.$H).length === 2 &&
                                      String(horario.$m).length === 2 &&
                                      valueAnfitriao.length > 2 &&
                                      objetivo.label !==
                                        'Qual a fase atual da Célula?' ? (
                                        <Button
                                          onClick={() => {
                                            setTela(2);
                                          }}
                                          endIcon={
                                            <IoArrowRedoSharp color="blue" />
                                          }
                                        >
                                          <Box
                                            mr={2}
                                            ml={2}
                                            mt={0.3}
                                            sx={{ fontFamily: 'arial black' }}
                                          >
                                            Próxima
                                          </Box>
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() => {
                                            toast.error(
                                              'ANTES DE IR PARA A PRÓXIMA TELA PREENCHA TODOS OS DADOS !',
                                              {
                                                position:
                                                  toast.POSITION.TOP_CENTER,
                                              },
                                            );
                                          }}
                                          endIcon={
                                            <IoArrowRedoSharp color="gray" />
                                          }
                                        >
                                          <Box
                                            mr={2}
                                            ml={2}
                                            mt={0.3}
                                            sx={{ fontFamily: 'arial black' }}
                                          >
                                            PRÓXIMA
                                          </Box>
                                        </Button>
                                      )}
                                    </Paper>
                                  </Grid>
                                </Grid>
                              )}
                              {tela === 2 && (
                                <Grid container spacing={2}>
                                  <Grid item xs={6} md={6} lg={6} xl={6}>
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: '#ffeeee',
                                        height: 40,
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          setTela(1);
                                        }}
                                        startIcon={
                                          <IoArrowUndoSharp color="blue" />
                                        }
                                      >
                                        <Box
                                          mt={0.3}
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          ANTERIOR
                                        </Box>
                                      </Button>
                                    </Paper>
                                  </Grid>

                                  <Grid item xs={6} md={6} lg={6} xl={6}>
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: podeEditar
                                          ? '#ffffaa'
                                          : 'gray',
                                        height: 40,
                                      }}
                                    >
                                      {existeRelatorio === true ? (
                                        <Box>
                                          {podeEditar ? (
                                            <Box>
                                              <Box>
                                                {!carregando ? (
                                                  <Button
                                                    onClick={handleSalvar}
                                                    startIcon={
                                                      <IoIosSave color="blue" />
                                                    }
                                                  >
                                                    <Box
                                                      mt={0.3}
                                                      sx={{
                                                        fontFamily:
                                                          'arial black',
                                                      }}
                                                    >
                                                      <Box>Atualizar</Box>
                                                    </Box>
                                                  </Button>
                                                ) : (
                                                  <Box>
                                                    <Espera descricao="Gerando o Relatório" />
                                                  </Box>
                                                )}
                                              </Box>
                                            </Box>
                                          ) : (
                                            <Button>
                                              <Box
                                                color="#fff"
                                                mt={0.3}
                                                sx={{
                                                  fontFamily: 'arial black',
                                                }}
                                              >
                                                Consolidado
                                              </Box>
                                            </Button>
                                          )}
                                        </Box>
                                      ) : (
                                        <Box>
                                          {!carregando ? (
                                            <Button
                                              onClick={handleSalvar}
                                              startIcon={
                                                <IoIosSave color="blue" />
                                              }
                                            >
                                              <Box
                                                mt={0.3}
                                                sx={{
                                                  fontFamily: 'arial black',
                                                }}
                                              >
                                                <Box>Salvar</Box>
                                              </Box>
                                            </Button>
                                          ) : (
                                            <Box>
                                              <Espera descricao="Criando o Planejamento" />
                                            </Box>
                                          )}
                                        </Box>
                                      )}
                                    </Paper>
                                  </Grid>
                                </Grid>
                              )}
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
        ) : (
          <Box
            height="100%"
            minWidth={300}
            width="100vw"
            mt={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box minWidth={300} height="100%" width="100vw" maxWidth={1200}>
              <Box height="100%">
                <Box
                  height="10%"
                  minHeight={75}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={corIgreja.principal}
                  style={{
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                >
                  <Box width="90%" ml={1}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mb={1}
                    >
                      <Grid item xs={7} md={7} lg={7} xl={7}>
                        <Paper style={{ background: '#fafafa', height: 40 }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justifyContent="center">
                              <KeyboardDatePicker
                                open={open}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                id="date-picker-inline"
                                value={selectedDate}
                                inputValue={inputValue}
                                onClick={handleDateClick}
                                onChange={handleDateChange}
                                onClose={getData()}
                                style={{
                                  marginLeft: 10,
                                  marginRight: 10,
                                  marginTop: 5,
                                  height: 30,
                                  background: '#fafafa',
                                }}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </Paper>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
                <Box
                  height="10%"
                  width="100%"
                  minHeight={70}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderTop="2px solid #fff"
                  bgcolor={corIgreja.principal}
                  sx={{
                    color: '#fff',
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Box
                      sx={{ fontSize: '16px' }}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      borderRight="2px solid #fff"
                      width="50%"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        CÉLULA
                      </Box>
                      <Box
                        fontFamily="arial black"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {perfilUser.Celula}
                      </Box>
                    </Box>
                    <Box
                      sx={{ fontSize: '16px' }}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      width="50%"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        MEMBROS
                      </Box>
                      <Box
                        fontFamily="arial black"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {nomesCel.length}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box height="60%">
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={325}
                    width="100%"
                    color={corIgreja.iconeOn}
                    fontFamily="arial black"
                    fontSize="20px"
                    bgcolor={corIgreja.principal}
                    borderTop="2px solid #fff"
                  >
                    <Box>PLANEJAMENTO DA CÉLULA</Box>
                    <Box
                      color={corIgreja.texto1}
                      fontFamily="arial black"
                      fontSize="20px"
                      mt={1}
                    >
                      SEMANA - {semana}
                    </Box>

                    {!loading ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        color="#fff"
                        fontFamily="arial"
                        fontSize="16px"
                        bgcolor={corIgreja.principal}
                      >
                        <Box mt={2}>Ainda não foi registrado</Box>
                        <Box>nenhum planejamento nessa semana</Box>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        color="#fff"
                        fontFamily="arial"
                        fontSize="16px"
                        bgcolor={corIgreja.principal}
                      >
                        <Box mt={2}>Buscando Planejamento</Box>
                        <Box>aguarde {progress} segundos... </Box>
                      </Box>
                    )}
                    <Box
                      mt={5}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      color="#fff"
                      fontFamily="arial"
                      fontSize="14px"
                      bgcolor={corIgreja.principal}
                    >
                      <Box
                        color={corIgreja.iconeOn}
                        fontFamily="arial black"
                        fontSize="14px"
                      >
                        PARA CRIAR UM NOVO:
                      </Box>
                      <Box>Selecione a data desejada e click</Box>
                      <Box> no botão FAZER PLANEJAMENTO</Box>
                    </Box>
                  </Box>

                  <Box
                    height="10%"
                    minHeight={75}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={corIgreja.principal}
                  >
                    <Box
                      height="10%"
                      minHeight={75}
                      width="90%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor={corIgreja.principal}
                    >
                      <Box width="100%" ml={1}>
                        <Box mb={1}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              <Paper
                                style={{
                                  textAlign: 'center',
                                  background: '#faffaf',
                                  height: 40,
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    setCheckRelatorio(true);
                                    setTela(1);
                                  }}
                                >
                                  <Box
                                    mr={2}
                                    ml={2}
                                    mt={0.3}
                                    color="blue"
                                    sx={{ fontFamily: 'arial black' }}
                                  >
                                    FAZER PLANEJAMENTO
                                  </Box>
                                </Button>
                              </Paper>
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
        )}
      </Box>

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
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

export default RelatorioCelebracao;
