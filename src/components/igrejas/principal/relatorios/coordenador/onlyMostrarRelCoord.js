import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Oval } from 'react-loading-icons';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import api from 'src/components/services/api';
import Select from 'react-select';
import { MultiSelect } from 'react-multi-select-component';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ConvertData from 'src/utils/convData2';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import DataMMDDAAA from 'src/utils/dataMMDDAAAA';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  MultiSelect: {
    height: 60,
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    fontSize: '16px',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function createData(label, value) {
  return { label, value };
}

function createAvaliacoes(relatorios, planejamentos, mentoriamentos) {
  return { relatorios, planejamentos, mentoriamentos };
}

function RelSuper({
  perfilUser,
  lideranca,
  Mes,
  Ano,
  dadosRelVisita,
  setSendResumo,
}) {
  const classes = useStyles();
  //= ================================================================
  const numeroRelatorio = [
    {
      label: 'Ruim (abaixo de 30% Realizado)',
      value: 0,
    },
    {
      label: 'Regular (entre 30% e 60% Realizado)',
      value: 0,
    },
    {
      label: 'Bom (acima de 60% Realizado)',
      value: 0,
    },
    {
      label: 'Ótimo (100% Realizado)',
      value: 0,
    },
  ];

  const valorInicial = { label: 'Escolha entre as opções', value: 0 };
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    ConvertData(dadosRelVisita.Data),
  );

  const [numeroSuper, setNumeroSuper] = React.useState(
    JSON.parse(dadosRelVisita.Presentes),
  );
  const [qytCelulasVisitadas, setQytCelulasVisitadas] = React.useState(
    dadosRelVisita.CelulaVisitada,
  );
  const [qytMembrosVisitados, setQytMembrosVisitados] = React.useState(
    dadosRelVisita.MembrosVisitados,
  );
  const [listaSuper, setListaSuper] = React.useState(valorInicial);

  const [corQytCelulas, setCorQytCelulas] = React.useState('white');
  const [corQytLiderados, setCorQytLiderados] = React.useState('white');
  const [corPresentes, setCorPresentes] = React.useState('white');
  const [corAvalRelatorios, setCorAvalRelatorios] = React.useState('white');
  const [corAvalPlanejamento, setCorAvalPlanejamento] = React.useState('white');
  const [corAvalDiscipulado, setCorAvalDiscipulado] = React.useState('white');

  const [loading, setLoading] = React.useState(false);
  const [avaliacaoRelatorio, setAvaliacaoRelatorio] = React.useState({
    label: JSON.parse(dadosRelVisita.Avaliacoes).relatorios,
    value: 0,
  });

  const [avaliacaoDiscipulado, setAvaliacaoDiscipulado] = React.useState({
    label: JSON.parse(dadosRelVisita.Avaliacoes).mentoriamentos,
    value: 0,
  });
  const [avaliacaoPlanejamento, setAvaliacaoPlanejamento] = React.useState({
    label: JSON.parse(dadosRelVisita.Avaliacoes).planejamentos,
    value: 0,
  });
  const avaliacaoDiscipuladoRef = React.useRef();
  const avaliacaoPlanejamentoRef = React.useRef();
  const avaliacaoRelatoriosRef = React.useRef();
  const nSuperRef = React.useRef();
  const qytCelulasRef = React.useRef();
  const qytLideradosRef = React.useRef();

  const superOrdenada = lideranca.sort((a, b) => {
    if (new Date(a.Supervisao) > new Date(b.Supervisao)) return 1;
    if (new Date(b.Supervisao) > new Date(a.Supervisao)) return -1;
    return 0;
  });

  const superSetor = superOrdenada.filter(
    (results) =>
      Number(results.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Supervisor',
  );

  React.useEffect(() => {
    const numberSuper = superSetor.map((itens) => itens.Supervisao);
    const uniqueArr = [...new Set(numberSuper)];
    //  const [numeroSuper] = React.useState(uniqueArr);

    if (uniqueArr) {
      const dadosSuper = uniqueArr.map((row, index) =>
        createData(`${row}`, index),
      );

      setListaSuper(dadosSuper);
    }
  }, []);

  const enviarRelatorio = () => {
    setLoading(true);
    const Data = new Date(DataMMDDAAA(inputValue));

    const Avaliacoes = createAvaliacoes(
      avaliacaoRelatorio.label,
      avaliacaoPlanejamento.label,
      avaliacaoDiscipulado.label,
    );

    api
      .post('/api/criarRelSuper', {
        Nome: perfilUser.Nome,
        Funcao: perfilUser.Funcao,
        CelulaVisitada: Number(qytCelulasVisitadas),
        Supervisao: Number(perfilUser.Supervisao),
        Coordenacao: Number(perfilUser.Coordenacao),
        Distrito: Number(perfilUser.Distrito),
        Data,
        Avaliacoes: JSON.stringify(Avaliacoes),
        MembrosVisitados: Number(qytMembrosVisitados),
        Presentes: JSON.stringify(numeroSuper),
        Mes,
        Ano,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          toast.info('Dados Atualizados !', {
            position: toast.POSITION.TOP_CENTER,
          });
          setSendResumo(false);
        }
      })
      .catch(() => {
        toast.error('Erro ao Atualizar Dados!,tente Novamente', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };

  const handleSalvar = () => {
    if (qytCelulasVisitadas !== '') {
      if (qytMembrosVisitados !== '') {
        if (numeroSuper.length) {
          if (Object.keys(avaliacaoRelatorio).length) {
            if (Object.keys(avaliacaoPlanejamento).length) {
              if (Object.keys(avaliacaoDiscipulado).length) {
                enviarRelatorio();
              } else {
                setCorAvalDiscipulado('yellow');
                avaliacaoDiscipuladoRef.current.focus();
                toast.error('Avalie o Mentoriamento !', {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            } else {
              setCorAvalPlanejamento('yellow');
              avaliacaoPlanejamentoRef.current.focus();
              toast.error('Avalie o Planejamento !', {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          } else {
            setCorAvalRelatorios('yellow');
            avaliacaoRelatoriosRef.current.focus();
            toast.error('Avalie a analise dos Relatório !', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          setCorPresentes('yellow');
          nSuperRef.current.focus();
          toast.error('Quem foi na Reunião !', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        setCorQytCelulas('yellow');
        qytLideradosRef.current.focus();
        toast.error('quantos Liderados você visitou?', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      setCorQytCelulas('yellow');
      qytCelulasRef.current.focus();
      toast.error('quantas células você visitou?', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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

  // const jsonNecessidade = JSON.stringify(valorNecessidade);
  //  const obj = JSON.parse(jsonNecessidade);
  const handleNewField = (value) => ({
    label: value,
    value: value.toUpperCase(),
  });

  return (
    <Box height="100%" minHeight={570} width="100%">
      <Box
        height="100%"
        minWidth={300}
        width="100%"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="96%"
          height="97%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          borderRadius={16}
          ml={0}
          bgcolor={corIgreja.principal}
        >
          <Box height="100%">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
            >
              <Box width="94%">
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data da Reunião
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
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
                              height: 36,
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
                </Grid>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={12}>
                    <Box
                      mt={2}
                      ml={1}
                      color={corPresentes}
                      sx={{ fontSize: 'bold' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Selecione as Supervisões
                      </Typography>
                    </Box>
                    <Box mt={-0.8} width="100%" ref={nSuperRef}>
                      <MultiSelect
                        text="Please select your user."
                        value={numeroSuper}
                        overrideStrings={{
                          allItemsAreSelected: 'Todos Presentes',
                          clearSearch: 'Clear Search',
                          clearSelected: 'Clear Selected',
                          noOptions: 'No options',
                          search: 'Search',
                          selectAll: 'Select All',
                          selectAllFiltered: 'Select All (Filtered)',
                          selectSomeItems: 'Presentes na Reunião',
                          create: 'Create',
                        }}
                        onChange={(e) => {
                          setCorPresentes('white');
                          setNumeroSuper(e);
                          // necessidadeRef.current.focus();
                        }}
                        isCreatable
                        onCreateOption={handleNewField}
                        options={listaSuper}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  fontFamily="Rubik"
                  fontWeight="bold"
                  fontSize="14px"
                  textAlign="center"
                  color="white"
                  mt="2vh"
                >
                  QUANTIDADE DE VISITAS FEITA NO MÊS
                </Box>

                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Box
                      mt={2}
                      ml={2}
                      color={corQytCelulas}
                      sx={{ fontSize: 'bold' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Às Células
                      </Typography>
                    </Box>
                    <Box mt={-0.5}>
                      <TextField
                        className={classes.tf_m}
                        inputRef={qytCelulasRef}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                            height: 36,
                            borderRadius: 5,
                            WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                          },
                        }}
                        id="visCelulas"
                        // label="Matricula"
                        type="tel"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={qytCelulasVisitadas}
                        variant="standard"
                        placeholder="Quantidade"
                        onChange={(e) => {
                          setCorQytCelulas('white');

                          setQytCelulasVisitadas(e.target.value);
                        }}
                        onFocus={(e) => {
                          setQytCelulasVisitadas(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value !== '') {
                            qytLideradosRef.current.focus();
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Box
                      mt={2}
                      ml={2}
                      color={corQytLiderados}
                      sx={{ fontSize: 'bold' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Aos Liderados
                      </Typography>
                    </Box>
                    <Box mt={-0.5}>
                      <TextField
                        className={classes.tf_m}
                        inputRef={qytLideradosRef}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                            height: 36,
                            borderRadius: 5,
                            WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                          },
                        }}
                        id="visIrmaos"
                        // label="Matricula"
                        type="tel"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={qytMembrosVisitados}
                        variant="standard"
                        placeholder="Quantidade"
                        onChange={(e) => {
                          setCorQytLiderados('white');
                          setQytMembrosVisitados(e.target.value);
                        }}
                        onFocus={(e) => {
                          setQytMembrosVisitados(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value !== '') {
                            avaliacaoRelatoriosRef.current.focus();
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box width="100%">
                  <Box color={corAvalRelatorios} mt="4vh" ml={2} width="90%">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ fontFamily: 'arial black', fontSize: '12px' }}
                    >
                      Avaliação semanal dos Relatórios
                    </Typography>
                  </Box>
                  <Box
                    mt={-0.5}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box height="100%" width="100%">
                      <Select
                        styles={customStyles}
                        defaultValue={avaliacaoRelatorio}
                        menuPlacement="top"
                        isSearchable={false}
                        // value={avaliacaoRelatorio}
                        onChange={(e) => {
                          setCorAvalRelatorios('white');

                          setAvaliacaoRelatorio(e);
                          // estruturaRef.current.focus();
                        }}
                        ref={avaliacaoRelatoriosRef}
                        options={numeroRelatorio}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box width="100%">
                  <Box color={corAvalPlanejamento} mt="2vh" ml={2} width="90%">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ fontFamily: 'arial black', fontSize: '12px' }}
                    >
                      Planejamentos e Atividades do Mês
                    </Typography>
                  </Box>
                  <Box
                    mt={-0.5}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box height="100%" width="100%">
                      <Select
                        styles={customStyles}
                        menuPlacement="top"
                        isSearchable={false}
                        defaultValue={avaliacaoPlanejamento}
                        onChange={(e) => {
                          setCorAvalPlanejamento('white');

                          setAvaliacaoPlanejamento(e);
                          // estruturaRef.current.focus();
                        }}
                        ref={avaliacaoPlanejamentoRef}
                        options={numeroRelatorio}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box width="100%">
                  <Box mt="2vh" ml={2} width="90%" color={corAvalDiscipulado}>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ fontFamily: 'arial black', fontSize: '12px' }}
                    >
                      Mentoriamento da Supervisão no Mês
                    </Typography>
                  </Box>
                  <Box
                    mt={-0.5}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box height="100%" width="100%">
                      <Select
                        styles={customStyles}
                        menuPlacement="top"
                        isSearchable={false}
                        defaultValue={avaliacaoDiscipulado}
                        onChange={(e) => {
                          setCorAvalDiscipulado('white');

                          setAvaliacaoDiscipulado(e);
                          // estruturaRef.current.focus();
                        }}
                        ref={avaliacaoDiscipuladoRef}
                        options={numeroRelatorio}
                      />
                    </Box>
                  </Box>
                </Box>

                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Box className={classes.novoBox} mt="3vh">
                      <Button
                        style={{
                          color: 'white',
                          borderRadius: '10px',
                          fontFamily: 'arial black',
                          background: corIgreja.tercenaria,
                          width: '100%',
                        }}
                        onClick={() => {
                          setSendResumo(false);
                        }}
                        variant="contained"
                        severity="success"
                      >
                        VOLTAR
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className={classes.novoBox} mt="3vh">
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
                            borderRadius: '10px',
                          }}
                          onClick={handleSalvar}
                          variant="contained"
                          severity="success"
                          endIcon={
                            <Oval stroke="white" width={20} height={20} />
                          }
                        >
                          SALVANDO...
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
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

export default RelSuper;
