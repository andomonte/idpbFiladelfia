import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DateFnsUtils from '@date-io/date-fns';
import ConverteData from 'src/utils/dataMMDDAAAA';
import ConverteData2 from 'src/utils/convData2';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Grid, Typography, Paper } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { MdScreenSearchDesktop } from 'react-icons/md';
import Select from 'react-select';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@material-ui/core/Modal';

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
  modal: {
    position: 'absolute',
    overflow: 'scroll',
    height: '100%',
    width: '102%',
    background: corIgreja.principal,
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
}));

function compare(a, b) {
  if (a.Data < b.Data) return -1;
  return true;
}

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

  const [dataSem1, setDataSem1] = React.useState('inicio');
  const horarioAtual = moment(new Date()).format('MM/DD/YYYY');

  const [horario, setHorario] = React.useState(
    dayjs(new Date(`${horarioAtual} 19:30:00`)),
  );
  const [nomeEvento, setNomeEvento] = React.useState('');
  const semana = PegaSemana(Mes, Ano);

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
  const url1 = `/api/consultaPlanejamentoEventos/${Mes}/${Ano}`;

  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    mutate(url1);
    setDataSem1('inicio');
  }, [semana]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      const planEventosCelula = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (planEventosCelula.length) {
        const planOrdenado = planEventosCelula.sort(compare);
        setDataSem1(planOrdenado);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

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
        if (horario.length < 5)
          toast.error('Horário incompleto !', {
            position: toast.POSITION.TOP_CENTER,
          });
        else nomeEventoRef.current.focus();
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
    if (
      inputValue &&
      horario.length &&
      nomeEvento.length &&
      valueAnfitriao.length &&
      objetivo.label !== 'Qual o objetivo do evento?' &&
      observacoes
    ) {
      setCarregando(true);
      setOpenPlan(false);
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
          Horario: horario,
          Celula: Number(perfilUser.Celula),
          Distrito: Number(perfilUser.Distrito),
          CriadoEm,
        })
        .then((response) => {
          if (response) {
            // enviarPontuacao();

            setCarregando(false);
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
      if (horario.length < 5) {
        toast.error('Didige o Horário do Evento !', {
          position: toast.POSITION.TOP_CENTER,
        });
        horarioRef.current.focus();
      }
    }
  };
  const body = (
    <Box width="100vw">
      <Box
        height="100vh"
        width="100%"
        minWidth={300}
        minHeight={570}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
      >
        <form>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              fontFamily="arial black"
              textAlign="center"
              mt={2}
              color="white"
            >
              <Box color="#ffff8d" mr={2}>
                PLANEJAMENTO DE EVENTOS
              </Box>
            </Box>

            <Box mt={4}>
              <Box ml={1.3} width="96%" display="flex" justifyContent="center">
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                                  setInputValor(newInputValue.toUpperCase());
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                  <Grid item xs={5} md={5}>
                    <Button
                      style={{
                        background: '#ff9e80',
                        color: '#780810',
                        fontFamily: 'arial black',
                        borderRadius: 15,
                        width: '100%',
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                      component="a"
                      variant="contained"
                      onClick={() => {
                        setOpenPlan(false);
                        zerarValues();
                      }}
                    >
                      CANCELAR
                    </Button>
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <Button
                      style={{
                        background: '#69f0ae',
                        color: '#780810',
                        fontFamily: 'arial black',
                        borderRadius: 15,
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 20,
                      }}
                      component="a"
                      variant="contained"
                      onClick={handleSalvar}
                    >
                      SALVAR
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box mt={3} display="flex" justifyContent="center" />
          </Box>
        </form>
      </Box>
    </Box>
  );

  const bodyShowPlan = (
    <Box width="100vw">
      <Box
        height="100vh"
        width="100%"
        minWidth={300}
        minHeight={570}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
      >
        <form>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              fontFamily="arial black"
              textAlign="center"
              mt={2}
              color="white"
            >
              <Box color="#ffff8d" mr={2}>
                PLANEJAMENTO DE EVENTOS
              </Box>
            </Box>

            <Box mt={4}>
              <Box ml={1.3} width="96%" display="flex" justifyContent="center">
                <Grid container spacing={0}>
                  <Grid item xs={6} md={6}>
                    <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                                  setInputValor(newInputValue.toUpperCase());
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                    <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
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
                  <Grid item xs={10} md={10}>
                    <Button
                      style={{
                        background: '#f4ff81',
                        color: '#780810',
                        fontFamily: 'arial black',
                        borderRadius: 15,
                        width: '100%',
                        marginLeft: '6vw',
                        marginTop: 20,
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
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box mt={3} display="flex" justifyContent="center" />
          </Box>
        </form>
      </Box>
    </Box>
  );

  const atualizaDados = (dadosRecebidos) => {
    const atualObjetivo = {
      label: dadosRecebidos.Objetivo,
      value: 0,
    };
    setInputValue(dadosRecebidos.Data);

    setHorario(dadosRecebidos.Horario);
    setNomeEvento(dadosRecebidos.Evento);
    setValueAnfitriao(dadosRecebidos.Local);
    setObjetivo(atualObjetivo);
    setObservacoes(dadosRecebidos.Descricao);

    setOpenShowPlan(true);
  };
  return (
    <Box height="100%">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
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
          EVENTO
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="50%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DESCRIÇÃO
        </Box>
        <Box textAlign="center" width="20%">
          VER
        </Box>
      </Box>

      {dataSem1 !== 'inicio' ? (
        <Box
          sx={{
            fontFamily: 'arial black',
            borderBottom: '1px solid #000',
          }}
          height="16.66%"
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
            {dataSem1[0] && dataSem1[0].Data
              ? ConverteData2(dataSem1[0].Data)
              : '-'}
          </Box>
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="50%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              {dataSem1[0] && dataSem1[0].Evento ? dataSem1[0].Evento : '-'}{' '}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="50%"
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
            width="20%"
          >
            {dataSem1[0] ? (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  atualizaDados(dataSem1[0]);
                }}
              >
                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                  <MdScreenSearchDesktop size={25} color="green" />
                </SvgIcon>
              </IconButton>
            ) : (
              '-'
            )}
          </Box>
        </Box>
      ) : (
        <Box
          height="30vh"
          fontSize="16px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontFamily="Fugaz One"
        >
          SEM RELATÓRIOS
        </Box>
      )}

      <Modal
        open={openPlan}
        //  onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Modal
        className={classes.modal}
        open={openShowPlan}
        //  onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {bodyShowPlan}
      </Modal>
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
