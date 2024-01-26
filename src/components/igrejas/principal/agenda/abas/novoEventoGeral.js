import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConvData1 from 'src/utils/convData1';
import DateFnsUtils from '@date-io/date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

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
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Espera from 'src/utils/espera';
import api from 'src/components/services/api';

import Select from 'react-select';
import corIgreja from 'src/utils/coresIgreja';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@material-ui/core/Modal';

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
export default function TabCelula({
  setOpenNovoEventoGeral,
  Mes,
  Ano,
  perfilUser,
  lideranca,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const classes = useStyles();

  const nomesCel = lideranca.filter(
    (val) =>
      val.Supervisao === Number(perfilUser.Supervisao) &&
      val.Distrito === Number(perfilUser.Distrito) &&
      (val.Funcao === 'Lider' || val.Funcao === 'Supervisor'),
  );

  const numberCelulas = nomesCel.map((itens) => itens.Nome);
  const participantes = [...new Set(numberCelulas)];

  //      setListaCelulas(dadosCelula);

  const nomesCelulaParcial = participantes.map((rol, index) =>
    createListaMembros(index, rol),
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

  const horarioAtual = moment(new Date()).format('MM/DD/YYYY');
  const [horario, setHorario] = React.useState(
    dayjs(new Date(`${horarioAtual} 19:30:00`)),
  );
  const [nomeEvento, setNomeEvento] = React.useState('');

  // para usar semanas

  //  const dataEventoRef = React.useRef();
  const horarioRef = React.useRef();
  const nomeEventoRef = React.useRef();
  const objetivoRef = React.useRef();
  const observacoesRef = React.useRef();
  const anfitriaoRef = React.useRef();
  const [carregando, setCarregando] = React.useState(false);

  const [valueAnfitriao, setValueAnfitriao] = React.useState('');
  const [inputValor, setInputValor] = React.useState('');

  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const zerarValues = () => {
    setInputValue(moment(new Date()).format('DD/MM/YYYY'));
    setObjetivo(valorInicialOjetivo);

    setHorario(dayjs(new Date(`${horarioAtual} 19:30:00`)));
    setNomeEvento('');
    setValueAnfitriao('');
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
      if (formId === 'LocalEvento') objetivoRef.current.focus();
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
    const Dados = { Publico: '', Numero: '' };
    if (perfilUser.Funcao === 'Supervisor') {
      Dados.Publico = 'Supervisão';
      Dados.Numero = perfilUser.Supervisao;
    }
    if (perfilUser.Funcao === 'Coordenador') {
      Dados.Publico = 'Coordenação';
      Dados.Numero = perfilUser.Coordenacao;
    }
    if (perfilUser.Funcao === 'PastorDistrito') {
      Dados.Publico = 'Distrito';
      Dados.Numero = perfilUser.Distrito;
    }
    if (
      perfilUser.Funcao === 'Presidente' ||
      perfilUser.Funcao === 'Secretaria'
    ) {
      Dados.Publico = 'Distrito';
      Dados.Numero = perfilUser.Distrito;
    }

    if (horario)
      if (
        inputValue &&
        String(horario.$H).length === 2 &&
        String(horario.$m).length === 2 &&
        nomeEvento.length &&
        valueAnfitriao.length &&
        objetivo.label !== 'Qual o objetivo do evento?'
      ) {
        setCarregando(true);
        // const nomesMembros = JSON.parse(RelDiscipuladoFinal.NomesMembros);
        const horaSalva = `${horario.$H}:${horario.$m}`;
        const newDate = new Date(ConvData1(inputValue));
        api
          .post('/api/criarEventoGeral', {
            Data: newDate,
            Evento: nomeEvento,
            Local: valueAnfitriao,
            Objetivo: objetivo.label,
            Publico: Dados.Publico,
            Numero: Number(Dados.Numero),
            Funcao: perfilUser.Funcao,
            Mes,
            Ano,
            Horario: horaSalva,
            Distrito: Number(perfilUser.Distrito),
          })
          .then((response) => {
            if (response) {
              // enviarPontuacao();
              setCarregando(false);
              zerarValues();
              setOpenNovoEventoGeral(false);
            }
          })
          .catch(() => {
            toast.error('Erro ao atualizar Dados !', {
              position: toast.POSITION.TOP_CENTER,
            });

            setCarregando(false);
          });
      } else {
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
                EVENTO DO SETOR {perfilUser.Supervisao}
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
                      <Paper
                        style={{
                          background: '#fafafa',
                          height: 40,
                        }}
                      >
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

                  <Grid item xs={5} md={5}>
                    <Button
                      style={{
                        background: '#f4ff81',
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
                        setOpenShowPlan(false);
                        zerarValues();
                      }}
                    >
                      VOLTAR
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
                      ATUALIZAR
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
        width="96%"
        height="97%"
        minHeight={550}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={16}
        bgcolor={corIgreja.principal} // cor principal tela inteira
      >
        <Box
          height="100%"
          width="100%"
          minWidth={300}
          minHeight={570}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <form>
            <Box height="100%" width="100%">
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                fontFamily="arial black"
                fontSize="16px"
                textAlign="center"
                mt={2}
                color="white"
              >
                <Box color="white" mr={2}>
                  {perfilUser.Funcao === 'Supervisor' && (
                    <Box> EVENTO DA SUPERVISÃO {perfilUser.Supervisao}</Box>
                  )}
                  {perfilUser.Funcao === 'Coordenador' && (
                    <Box> EVENTO DA COORDENAÇÃO {perfilUser.Coordenacao}</Box>
                  )}
                  {perfilUser.Funcao === 'PastorDistrito' && (
                    <Box> EVENTO DO DISTRITO {perfilUser.Distrito}</Box>
                  )}
                </Box>
              </Box>

              <Box
                height="100%"
                width="100%"
                mt={4}
                display="flex"
                justifyContent="center"
              >
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
                        <Paper
                          style={{
                            background: '#fafafa',
                            height: 40,
                          }}
                        >
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
                              <TextField
                                className={classes.tf_m}
                                inputProps={{
                                  style: {
                                    height: 28,
                                    borderRadius: 5,
                                    textAlign: 'center',
                                    WebkitBoxShadow:
                                      '0 0 0 1000px #fafafa  inset',
                                  },
                                }}
                                id="LocalEvento"
                                // label="Matricula"

                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={valueAnfitriao}
                                variant="standard"
                                placeholder="Local do Evento"
                                onChange={(e) => {
                                  setValueAnfitriao(e.target.value);
                                }}
                                onFocus={(e) => {
                                  setValueAnfitriao(e.target.value);
                                }}
                                onKeyDown={handleEnter}
                                inputRef={anfitriaoRef}
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
                          isSearchable={false}
                          ref={objetivoRef}
                          defaultValue={objetivo}
                          onChange={(e) => {
                            // setValues2(e);
                            setObjetivo(e);
                          }}
                          options={fases}
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
                          setOpenNovoEventoGeral(false);
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

      <Modal
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
