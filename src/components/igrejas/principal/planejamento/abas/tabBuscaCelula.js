import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ConverteData from 'src/utils/dataMMDDAAAA';
import ConverteData2 from 'src/utils/convData2';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import PegaMes from 'src/utils/getMes2';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core';
import Meses from 'src/utils/mesesAbrev';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';

import { MdScreenSearchDesktop, MdCreateNewFolder } from 'react-icons/md';
import Select from 'react-select';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';
import FazerPlanCelula from '../fazerPlanCelulas';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tf_m: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    height: 40,
    width: '100%',
    fontSize: '5px',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
}));

function createListaMembros(value, label) {
  return {
    value,
    label,
  };
}
export default function TabCelula({ Mes, Ano, perfilUser, rolMembros }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const classes = useStyles();
  const [openPlan, setOpenPlan] = React.useState(false);

  const nomesCel = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const nomesCelulaParcial = nomesCel.map((rol) =>
    createListaMembros(rol.id, rol.Nome),
  );

  const fases = [
    { label: 'Integrar na Visão', value: 1 },
    { label: 'Comunhão', value: 2 },
    { label: 'Edificação', value: 3 },
    { label: 'Evangelismo', value: 4 },
    { label: 'multiplicacao', value: 5 },
  ];

  const valorInicialOjetivo = {
    label: 'Qual o objetivo do evento?',
    value: 0,
  };
  const [objetivo, setObjetivo] = React.useState(valorInicialOjetivo);

  const [openShowPlan, setOpenShowPlan] = React.useState(false);
  const [openPergunta, setOpenPergunta] = React.useState(false);

  const horarioAtual = moment(new Date()).format('MM/DD/YYYY');

  const [horario, setHorario] = React.useState(
    dayjs(new Date(`${horarioAtual} 19:30:00`)),
  );
  const [nomeEvento, setNomeEvento] = React.useState('');
  const [idEvento, setIdEvento] = React.useState('');
  const [semanaEnviada, setSemanaEnviada] = React.useState('');

  const semana = PegaSemana(Mes, Ano);

  const [dadosSem, setDadosSem] = React.useState([]);

  // para usar semanas

  //  const dataEventoRef = React.useRef();
  const horarioRef = React.useRef();

  const nomeEventoRef = React.useRef();
  const objetivoRef = React.useRef();
  const observacoesRef = React.useRef();
  const anfitriaoRef = React.useRef();
  const [carregando, setCarregando] = React.useState(false);

  const [observacoes, setObservacoes] = React.useState('');
  const [valueAnfitriao, setValueAnfitriao] = React.useState('');
  const [inputValor, setInputValor] = React.useState('');

  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  //-------------------
  const [presSem0, setPresSem0] = React.useState(false);
  const [dataSem0, setDataSem0] = React.useState([]);
  const [dataSem1, setDataSem1] = React.useState([]);
  const [presSem1, setPresSem1] = React.useState(false);
  const [presSem2, setPresSem2] = React.useState(false);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [presSem3, setPresSem3] = React.useState(false);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [presSem4, setPresSem4] = React.useState(false);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [presSem5, setPresSem5] = React.useState(false);
  const [dataSem5, setDataSem5] = React.useState([]);
  const [anoEnviado, setAnoEnviado] = React.useState(Ano);
  // para usar semanas
  let semana0 = semana - 1;
  let AnoPesquisado = Ano;
  if (semana - 1 < 1) {
    semana0 = 52;
    AnoPesquisado = Ano - 1;
  }
  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;
  const mesSemana5 = PegaMes(semana5, Ano);
  const mes = Meses();

  let mesAnterior = Mes - 1;
  if (mesAnterior < 0) mesAnterior = 11;
  let anoMostrado = Ano;
  if (Mes - 1 < 0) anoMostrado = Ano - 1;

  const semAnterior = (
    <Box>
      SEMANA ANTERIOR
      <Box>
        {' '}
        {mes[mesAnterior].descricao.toUpperCase()} / {anoMostrado}
      </Box>
    </Box>
  );
  const sem1Mes = (
    <Box>
      SEMANA 1
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem2Mes = (
    <Box>
      SEMANA 2
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem3Mes = (
    <Box>
      SEMANA 3
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem4Mes = (
    <Box>
      SEMANA 4
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem5Mes =
    mesSemana5 === Mes ? (
      <Box>
        SEMANA 5
        <Box>
          {mes[Mes].descricao.toUpperCase()} / {Ano}
        </Box>
      </Box>
    ) : (
      '-'
    );
  const url0 = `/api/consultaPlanCelulasAno/${semana0}/${AnoPesquisado}`;
  const url1 = `/api/consultaPlanCelulasAno/${semana1}/${Ano}`;
  const url2 = `/api/consultaPlanCelulasAno/${semana2}/${Ano}`;
  const url3 = `/api/consultaPlanCelulasAno/${semana3}/${Ano}`;
  const url4 = `/api/consultaPlanCelulasAno/${semana4}/${Ano}`;
  const url5 = `/api/consultaPlanCelulasAno/${semana5}/${Ano}`;
  const { data: sem0, errorSem0 } = useSWR(url0, fetcher);
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: sem2, errorSem2 } = useSWR(url2, fetcher);
  const { data: sem3, errorSem3 } = useSWR(url3, fetcher);
  const { data: sem4, errorSem4 } = useSWR(url4, fetcher);
  const { data: sem5, errorSem5 } = useSWR(url5, fetcher);

  React.useEffect(() => {
    console.log('openPlan', openPlan);
    mutate(url0);
    mutate(url1);
    mutate(url2);
    mutate(url3);
    mutate(url4);
    mutate(url5);
    setDataSem0([]);
    setPresSem0(false);
    setDataSem1([]);
    setPresSem1(false);
    setDataSem2([]);
    setPresSem2(false);
    setDataSem3([]);
    setPresSem3(false);
    setDataSem4([]);
    setPresSem4(false);
    setDataSem5([]);
    setPresSem5(false);
  }, [semana, openPlan]);

  React.useEffect(() => {
    if (sem0 && sem0.length) {
      const presCelula = sem0.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        setDataSem0(presCelula[0]);
        setPresSem0(true);
      }
    }
    if (errorSem0) return <div>An error occured.</div>;
    if (!sem0) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem0, openPlan]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      const presCelula = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem1(presCelula[0]);
        setPresSem1(true);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, openPlan]);

  React.useEffect(() => {
    if (sem2 && sem2.length) {
      const presCelula = sem2.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem2(presCelula[0]);
        setPresSem2(true);
      }
    }
    if (errorSem2) return <div>An error occured.</div>;
    if (!sem2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem2, openPlan]);

  React.useEffect(() => {
    if (sem3 && sem3.length) {
      const presCelula = sem3.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem3(presCelula[0]);
        setPresSem3(true);
      }
    }
    if (errorSem3) return <div>An error occured.</div>;
    if (!sem3) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem3, openPlan]);

  React.useEffect(() => {
    if (sem4 && sem4.length) {
      const presCelula = sem4.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        setDataSem4(presCelula[0]);
        setPresSem4(true);
      }
    }
    if (errorSem4) return <div>An error occured.</div>;
    if (!sem4) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem4, openPlan]);

  React.useEffect(() => {
    if (sem5 && sem5.length) {
      const presCelula = sem5.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        setDataSem5(presCelula[0]);
        setPresSem5(true);
      }
    }
    if (errorSem5) return <div>An error occured.</div>;
    if (!sem5) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem5, openPlan]);

  //------------------

  const zerarValues = () => {
    setInputValue(moment(new Date()).format('DD/MM/YYYY'));
    setObjetivo(valorInicialOjetivo);

    setHorario(dayjs(new Date(`${horarioAtual} 19:30:00`)));
    setNomeEvento('');
    setValueAnfitriao('');
    setObservacoes('');
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'DataEvento') horarioRef.current.focus();
      if (formId === 'Horario') {
        if (horario)
          if (String(horario.$H).length < 2 || String(horario.$m).length < 2)
            toast.error('Horário incompleto !', {
              position: toast.POSITION.TOP_CENTER,
            });
          else nomeEventoRef.current.focus();
        else horarioRef.current.focus();
      }

      if (formId === 'NomeEvento') anfitriaoRef.current.focus();
      if (formId === 'LocalEvento') {
        // bProximoRef.current.focus();
        event.target.blur();
        event.preventDefault();
        const { form } = event.target;
        const index = [...form].indexOf(event.target);
        form.elements[index + 2].focus();
        event.preventDefault();
      }
      if (formId === 'Observacoes') {
        // bProximoRef.current.focus();
        event.target.blur();
        event.preventDefault();
        const { form } = event.target;
        const index = [...form].indexOf(event.target);

        form.elements[index + 2].focus();
        event.preventDefault();
      }
    }
  };

  //= ========================================================================
  // data de inicio
  //= ========================================================================

  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };

  const getData = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };

  //= ========================================================================

  const handleSalvar = () => {
    if (horario)
      if (
        inputValue &&
        String(horario.$H).length === 2 &&
        String(horario.$m).length === 2 &&
        nomeEvento.length &&
        valueAnfitriao.length &&
        objetivo.label !== 'Qual o objetivo do evento?' &&
        observacoes
      ) {
        const horaSalva = `${horario.$H}:${horario.$m}`;
        setCarregando(true);

        // const nomesMembros = JSON.parse(RelDiscipuladoFinal.NomesMembros);
        const CriadoEm = new Date();
        const novaData = new Date(ConverteData(inputValue));
        api
          .post('/api/criarPlanejamentoEvento', {
            Data: novaData,
            Evento: nomeEvento,
            Local: valueAnfitriao,
            Objetivo: objetivo.label,
            Descricao: observacoes,
            Mes,
            Ano,
            id: idEvento,
            Horario: horaSalva,
            Celula: Number(perfilUser.Celula),
            Distrito: Number(perfilUser.Distrito),
            CriadoEm,
          })
          .then((response) => {
            if (response) {
              // enviarPontuacao();

              setCarregando(false);
              setOpenPlan(false);
              setOpenShowPlan(false);
              zerarValues();
              mutate(url0);
              mutate(url1);
              mutate(url2);
              mutate(url3);
              mutate(url4);
              mutate(url5);
            }
          })
          .catch(() => {
            toast.error('Erro ao atualizar Dados !', {
              position: toast.POSITION.TOP_CENTER,
            });

            setCarregando(false);
          });
      } else {
        if (!observacoes) {
          toast.error('Descreta algo sobre o Evento !', {
            position: toast.POSITION.TOP_CENTER,
          });
          observacoesRef.current.focus();
        }

        if (objetivo.label === 'Qual o objetivo do evento?') {
          toast.error('Escolha o Objetivo do Evento !', {
            position: toast.POSITION.TOP_CENTER,
          });
          objetivoRef.current.focus();
        }
        if (!valueAnfitriao.length) {
          toast.error('Escolha o local do Evento !', {
            position: toast.POSITION.TOP_CENTER,
          });
          anfitriaoRef.current.focus();
        }

        if (!nomeEvento.length) {
          toast.error('Descreva o Nome do Evento !', {
            position: toast.POSITION.TOP_CENTER,
          });
          nomeEventoRef.current.focus();
        }
        if (String(horario.$H).length < 2 || String(horario.$m).length < 2) {
          toast.error('Didige o Horário do Evento !', {
            position: toast.POSITION.TOP_CENTER,
          });
          horarioRef.current.focus();
        }
      }
    else {
      toast.error('Didige o Horário do Evento !', {
        position: toast.POSITION.TOP_CENTER,
      });
      horarioRef.current.focus();
    }
  };

  const handleDeletar = () => {
    setCarregando(true);
    setOpenPergunta(false);
    api
      .post('/api/deletarPlanejamentoEvento', {
        id: idEvento,
      })
      .then((response) => {
        if (response) {
          // enviarPontuacao();
          setCarregando(false);
          setOpenPlan(false);
          setOpenShowPlan(false);
          zerarValues();
          mutate(url1);
        }
      })
      .catch(() => {
        toast.error('Erro ao atualizar Dados !', {
          position: toast.POSITION.TOP_CENTER,
        });

        setCarregando(false);
      });
  };

  const pergunta = (
    <Box
      width="80vw"
      height={200}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Box fontFamily="Fugaz One" fontSize="16px" textAlign="center">
          QUER REALMENTE DELETAR?{' '}
        </Box>
        <Box display="flex" mt={2}>
          <Box ml={1} width="45%">
            <Button
              style={{
                background: 'red',
                color: 'white',
                fontFamily: 'arial black',
                borderRadius: 15,
                width: '100%',
              }}
              component="a"
              variant="contained"
              onClick={() => {
                setOpenPergunta(false);
              }}
            >
              NÃO
            </Button>
          </Box>

          <Box ml={1} width="45%">
            <Button
              style={{
                background: 'green',
                color: 'white',
                fontFamily: 'arial black',
                borderRadius: 15,
                width: '100%',
              }}
              component="a"
              variant="contained"
              onClick={handleDeletar}
            >
              SIM
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const bodyShowPlan = (
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
        <Box
          height="15%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={corIgreja.logo} alt="Castelo" height="60%" width="50%" />
        </Box>
        <form style={{ height: '85%' }}>
          <Box height="100%">
            <Box
              display="flex"
              justifyContent="center"
              fontFamily="Fugaz One"
              fontSize="20px"
              alignItems="center"
              color="white"
              height="10%"
            >
              PLANEJAMENTO DA CÉLULA
            </Box>
            <Paper
              style={{
                background: corIgreja.principal,
                height: '75%',
                overflow: 'auto',
              }}
            >
              <List>
                <Box mt="4vh">
                  <Box
                    ml={1.3}
                    width="96%"
                    display="flex"
                    justifyContent="center"
                  >
                    <Grid container spacing={1}>
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
                            Data do Evento
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <Paper style={{ background: '#fafafa', height: 40 }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid container justifyContent="center">
                                <KeyboardDatePicker
                                  disableFuture
                                  disableOpenPicker
                                  disableHighlightToday
                                  open={isPickerOpen}
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
                          {/*                       <TextField
                        className={classes.tf_m}
                        inputProps={{
                          style: {
                            textAlign: 'center',

                            WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                          },
                        }}
                        id="DataEvento"
                        // label="Matricula"
                        type="tel"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={dataMask(dataEvento)}
                        variant="standard"
                        placeholder="dd/mm/aaaa"
                        onChange={(e) => setDataEvento(e.target.value)}
                        onFocus={(e) => setDataEvento(e.target.value)}
                        onKeyDown={handleEnter}
                        inputRef={dataEventoRef}
                      /> */}
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
                            Horário do Evento
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <Paper style={{ background: '#fafafa', height: 40 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopTimePicker
                                ampm={false}
                                variant="inline"
                                value={horario}
                                inputRef={horarioRef}
                                onChange={(newValue) => {
                                  setHorario(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    style={{
                                      marginLeft: 10,
                                      marginRight: 10,
                                      marginTop: 10,
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
                            Nome do Evento
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            inputProps={{
                              style: {
                                height: 28,
                                borderRadius: 5,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="NomeEvento"
                            // label="Matricula"

                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={nomeEvento}
                            variant="standard"
                            placeholder="Título do Evento"
                            onChange={(e) => {
                              setNomeEvento(e.target.value);
                            }}
                            onFocus={(e) => {
                              setNomeEvento(e.target.value);
                            }}
                            onKeyDown={handleEnter}
                            inputRef={nomeEventoRef}
                          />
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
                            Local do Evento
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <Paper
                            style={{
                              marginBottom: 15,
                              textAlign: 'center',
                            }}
                          >
                            <Box display="flex" justifyContent="center">
                              <Stack spacing={2} sx={{ width: 320 }}>
                                <Autocomplete
                                  style={{
                                    width: '99%',
                                    marginTop: 10,
                                    textAlign: 'center',
                                  }}
                                  id="LocalEvento"
                                  freeSolo
                                  value={valueAnfitriao}
                                  onChange={(_, newValue) => {
                                    if (newValue) {
                                      setValueAnfitriao(newValue);
                                    } else setValueAnfitriao('');

                                    if (newValue) objetivoRef.current.focus();
                                  }}
                                  selectOnFocus
                                  inputValue={inputValor}
                                  onInputChange={(_, newInputValue) => {
                                    if (newInputValue !== '') {
                                      setInputValor(
                                        newInputValue.toUpperCase(),
                                      );
                                      setValueAnfitriao(
                                        newInputValue.toUpperCase(),
                                      );
                                    } else setInputValor('');
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
                                      placeholder="Onde será o Evento"
                                    />
                                  )}
                                />
                              </Stack>
                            </Box>
                          </Paper>
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
                            Objetivo deste Evento
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <Select
                            id="Objetivo"
                            ref={objetivoRef}
                            defaultValue={objetivo}
                            onChange={(e) => {
                              // setValues2(e);
                              setObjetivo(e);
                              observacoesRef.current.focus();
                            }}
                            options={fases}
                          />
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
                            Descrição do Evento
                          </Typography>
                        </Box>

                        <Box
                          width="100%"
                          mt={0}
                          display="flex"
                          justifyContent="center"
                        >
                          <TextareaAutosize
                            maxRows={4}
                            value={observacoes}
                            ref={observacoesRef}
                            aria-label="maximum height"
                            placeholder="Descreve Sobre o Evento"
                            onChange={(e) => {
                              setObservacoes(e.target.value);
                            }}
                            style={{
                              display: 'flex',
                              marginTop: -5,
                              textAlign: 'center',
                              width: '98%',
                              height: 80,
                              borderRadius: 15,
                              border: '1px solid #000',
                              resize: 'vertical',
                              overflow: 'auto',
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </List>
            </Paper>
            <Box
              height="15%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="25%" mr={1} mt={0}>
                <Button
                  style={{
                    background: '#ff9e80',
                    color: 'white',
                    fontFamily: 'arial black',
                    borderRadius: 15,
                    width: '100%',
                  }}
                  component="a"
                  variant="contained"
                  onClick={() => {
                    setOpenShowPlan(false);
                    zerarValues();
                  }}
                >
                  VOLTAR
                </Button>
              </Box>
              <Box ml={1} width="25%">
                <Button
                  style={{
                    background: 'red',
                    color: 'white',
                    fontFamily: 'arial black',
                    borderRadius: 15,
                    width: '100%',
                  }}
                  component="a"
                  variant="contained"
                  onClick={() => {
                    setOpenPergunta(true);
                  }}
                >
                  DELETAR
                </Button>
              </Box>
              <Box ml={1} width="34%">
                <Button
                  style={{
                    background: 'green',
                    color: 'white',
                    fontFamily: 'arial black',
                    borderRadius: 15,
                    width: '100%',
                  }}
                  component="a"
                  variant="contained"
                  onClick={handleSalvar}
                >
                  ATUALIZAR
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );

  const atualizaDados = (dadosRecebidos) => {
    if (dadosRecebidos) {
      const atualObjetivo = {
        label: dadosRecebidos.Objetivo,
        value: 0,
      };
      dayjs(new Date(`${horarioAtual} 19:30:00`));
      const horarioNovo = dayjs(
        new Date(`${horarioAtual} ${dadosRecebidos.Horario}:00`),
      );

      setInputValue(ConverteData2(dadosRecebidos.Data));
      setHorario(horarioNovo);
      setNomeEvento(dadosRecebidos.Anfitriao);
      setValueAnfitriao(dadosRecebidos.Local);
      setObjetivo(atualObjetivo);
      setObservacoes(dadosRecebidos.Descricao);
      setIdEvento(dadosRecebidos.id);
      setOpenShowPlan(true);
    }
  };
  return (
    <Box height="100%" fontSize="13px">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="12%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          SEMANA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="35%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box textAlign="center" width="35%">
          RELATÓRIO
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#eaeaea"
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          {semAnterior || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem0 && dataSem0.Data ? ConverteData2(dataSem0.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem0.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem0);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlan(true);
                        setSemanaEnviada(semana0);
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem0);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlan(true);
                        setSemanaEnviada(semana0);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          {sem1Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem1 && dataSem1.Data ? ConverteData2(dataSem1.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem1.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem1);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana1);
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem1);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana1);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          {sem2Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem2 && dataSem2.Data ? ConverteData2(dataSem2.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem2.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem2);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana2);
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem2);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana2);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          {sem3Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem3 && dataSem3.Data ? ConverteData2(dataSem3.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem3.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem3);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana3);
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem3);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana3);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
        >
          {sem4Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem4 && dataSem4.Data ? ConverteData2(dataSem4.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem4.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem4);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana4);
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem4);
                        setAnoEnviado(Ano);
                        setOpenPlan(true);
                        setSemanaEnviada(semana4);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      {sem5Mes !== '-' && (
        <Box
          sx={{
            fontFamily: 'arial black',
            borderBottom: '1px solid #000',
          }}
          height="14.66%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="30%"
          >
            {sem5Mes || '-'}
          </Box>
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="35%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              <Box>
                {dataSem5 && dataSem5.Data ? ConverteData2(dataSem5.Data) : '-'}
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="35%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            width="35%"
          >
            {sem1 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="100%"
              >
                <Box>
                  <Box>
                    {dataSem5.id ? (
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          setDadosSem(dataSem5);
                          setAnoEnviado(Ano);
                          setOpenPlan(true);
                          setSemanaEnviada(semana5);
                        }}
                      >
                        {' '}
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <MdScreenSearchDesktop size={25} color="green" />
                        </SvgIcon>
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          setDadosSem(dataSem5);
                          setAnoEnviado(Ano);
                          setOpenPlan(true);
                          setSemanaEnviada(semana5);
                        }}
                      >
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <MdCreateNewFolder size={25} color="blue" />
                        </SvgIcon>
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="100%"
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <FazerPlanCelula
          rolMembros={rolMembros}
          perfilUser={perfilUser}
          dadosSem={dadosSem}
          semanaEnviada={semanaEnviada}
          AnoPesquisado={anoEnviado}
          setOpenPlan={setOpenPlan}
        />
      </Dialog>
      <Dialog fullScreen open={openShowPlan} TransitionComponent={Transition}>
        {bodyShowPlan}
      </Dialog>

      <Dialog open={openPergunta} TransitionComponent={Transition}>
        {pergunta}
      </Dialog>
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
      {carregando && <Espera descricao="Salvando os Dados" />}
    </Box>
  );
}
