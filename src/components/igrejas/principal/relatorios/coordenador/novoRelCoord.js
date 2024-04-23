import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import { Oval } from 'react-loading-icons';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import api from 'src/components/services/api';
import Select from 'react-select';
import TableContainer from '@mui/material/TableContainer';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import DataMMDDAAA from 'src/utils/dataMMDDAAAA';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme2 = createTheme();
theme2.typography.hs4 = {
  fontWeight: 'normal',

  fontSize: '9px',
  '@media (min-width:400px)': {
    fontSize: '10px',
  },
  [theme2.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme2.typography.hs3 = {
  fontWeight: 'normal',

  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  [theme2.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme2.typography.hs2 = {
  fontWeight: 'normal',

  fontSize: '13px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme2.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

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
  tf_m: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    fontSize: '5px',
    borderRadius: 5,
  },
}));

function createAvaliacoes(relatorios, planejamentos, mentoriamentos) {
  return { relatorios, planejamentos, mentoriamentos };
}

function RelSuper({ perfilUser, setOpenNovoRelatorio }) {
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

  const valorInicial = { label: 'Escolha uma Opção', value: 0 };
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );

  const [observacoes, setObservacoes] = React.useState([]);
  const [qytCelulasVisitadas, setQytCelulasVisitadas] = React.useState('');
  const [qytMembrosVisitados, setQytMembrosVisitados] = React.useState('');

  const [corQytCelulas, setCorQytCelulas] = React.useState('white');
  const [corQytLiderados, setCorQytLiderados] = React.useState('white');
  const [corAvalRelatorios, setCorAvalRelatorios] = React.useState('white');
  const [corAvalPlanejamento, setCorAvalPlanejamento] = React.useState('white');
  const [corAvalDiscipulado, setCorAvalDiscipulado] = React.useState('white');
  const [corObs, setCorObs] = React.useState('white');
  const [loading, setLoading] = React.useState(false);
  const [avaliacaoRelatorio, setAvaliacaoRelatorio] = React.useState([]);
  const [avaliacaoDiscipulado, setAvaliacaoDiscipulado] = React.useState([]);
  const [avaliacaoPlanejamento, setAvaliacaoPlanejamento] = React.useState([]);
  const avaliacaoDiscipuladoRef = React.useRef();
  const avaliacaoPlanejamentoRef = React.useRef();
  const avaliacaoRelatoriosRef = React.useRef();
  const obsRef = React.useRef();
  const qytCelulasRef = React.useRef();
  const qytLideradosRef = React.useRef();

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
        Presentes: observacoes,
        Mes: selectedDate.getMonth(),
        Ano: selectedDate.getFullYear(),
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          toast.info('Dados Atualizados !', {
            position: toast.POSITION.TOP_CENTER,
          });
          setOpenNovoRelatorio(false);
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
        if (Object.keys(avaliacaoRelatorio).length) {
          if (Object.keys(avaliacaoPlanejamento).length) {
            if (Object.keys(avaliacaoDiscipulado).length) {
              if (observacoes.length) {
                enviarRelatorio();
              } else {
                obsRef.current.focus();
                setCorObs('yellow');
                toast.error('Descreva suas observações !', {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
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
        setCorQytLiderados('yellow');
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={6} sm={4}>
                    <Box width="100%" display="flex" justifyContent="center">
                      <Box textAlign="center" width="100%">
                        <Box
                          textAlign="start"
                          width="100%"
                          ml={0}
                          color={corQytCelulas}
                          sx={{ fontSize: 'bold' }}
                        >
                          <ThemeProvider theme={theme2}>
                            <Typography noWrap variant="hs3">
                              Qty de Células visitadas
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box mt={-0}>
                          <TextField
                            autoComplete="off"
                            className={classes.tf_m}
                            inputRef={qytCelulasRef}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                height: 33,

                                borderRadius: 5,
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="visCelulas"
                            // label="Matricula"
                            type="number"
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
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box width="100%" display="flex" justifyContent="center">
                      <Box textAlign="center" width="100%">
                        <Box
                          width="100%"
                          textAlign="start"
                          ml={0}
                          color={corQytLiderados}
                          sx={{ fontSize: 'bold' }}
                        >
                          <ThemeProvider theme={theme2}>
                            <Typography noWrap variant="hs3">
                              Qyt de Membros visitados
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box>
                          <TextField
                            className={classes.tf_m}
                            inputRef={qytLideradosRef}
                            autoComplete="off"
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                height: 33,
                                borderRadius: 5,
                                width: '100%',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="visIrmaos"
                            // label="Matricula"
                            type="number"
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
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  fontFamily="Rubik"
                  fontWeight="bold"
                  fontSize="14px"
                  textAlign="center"
                  color="white"
                  mt="4vh"
                  mb="2vh"
                >
                  SEU DESEMPENHO QUANTO À
                </Box>
                <TableContainer
                  sx={{
                    height: '50vh',
                    width: '100%',
                    minHeight: 280,
                  }}
                >
                  <Box width="100%">
                    <Box color={corAvalRelatorios} mt="1vh" ml={2} width="90%">
                      <ThemeProvider theme={theme2}>
                        <Typography variant="hs2">
                          Avaliação dos Relatórios de supervisão e visitas
                          feitas pelo Supervisor
                        </Typography>
                      </ThemeProvider>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box height="100%" width="100%">
                        <Select
                          placeholder="Escolha uma opção"
                          styles={customStyles}
                          defaultValue={valorInicial}
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
                    <Box
                      color={corAvalPlanejamento}
                      mt="2vh"
                      ml={2}
                      width="90%"
                    >
                      <ThemeProvider theme={theme2}>
                        <Typography variant="hs2">
                          Orientação e Auxílio às necessdiades detectadas na
                          supervisão e nas células
                        </Typography>
                      </ThemeProvider>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box height="100%" width="100%">
                        <Select
                          styles={customStyles}
                          placeholder="Escolha uma opção"
                          isSearchable={false}
                          defaultValue={valorInicial}
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
                      <ThemeProvider theme={theme2}>
                        <Typography variant="hs2">
                          Mentoriamento e pastoreio da equipe de Supervisores e
                          líderes
                        </Typography>
                      </ThemeProvider>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box height="100%" width="100%">
                        <Select
                          styles={customStyles}
                          placeholder="Escolha uma opção"
                          menuPlacement="top"
                          isSearchable={false}
                          defaultValue={valorInicial}
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
                  <Box
                    mt={-2}
                    mb={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    minHeight={10}
                  >
                    <Box width="100%">
                      <Box color={corObs} mt="4vh" ml={2} width="90%">
                        <ThemeProvider theme={theme2}>
                          <Typography variant="hs2">
                            Necessidades detectadas nesse período
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Textarea
                        value={observacoes}
                        ref={obsRef}
                        onChange={(e) => {
                          setCorObs('white');
                          setObservacoes(e.target.value);
                        }}
                        aria-label="empty textarea"
                        placeholder="descreva suas observações"
                      />
                    </Box>
                  </Box>
                </TableContainer>
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
                          setOpenNovoRelatorio(false);
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
