import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Oval } from 'react-loading-icons';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import api from 'src/components/services/api';
import Select from 'react-select';
import DataMMDDAAA from 'src/utils/dataMMDDAAAA';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ConvertData from 'src/utils/convData2';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
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

const avaliacao = [
  { label: 'Ruim (Fora da Visão)', value: 1, ranking: 2 },
  { label: 'Regular (Corrigir Muitos Pontos)', value: 2, ranking: 5 },
  { label: 'Boa (Corrigir alguns pontos)', value: 3, ranking: 7 },
  { label: 'Ótima (Funcionando Perfeitamente)', value: 4, ranking: 9 },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: state.data.color,
    fontSize: '16px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '16px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  }),
};

function createData(label, value) {
  return { label, value };
}

function RelCelula({
  perfilUser,
  dadosRelVisita,
  setSendResumo,
  lideranca,
  Mes,
  Ano,
}) {
  const classes = useStyles();
  //= ================================================================

  const valorInicial = { label: 'Escolha uma Opção', value: -1 };
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    ConvertData(dadosRelVisita.Data),
  );
  //  const InicialNCelula = { label: 'Escolha...', value: 0 };

  const [numeroCelulas, setNumeroCelulas] = React.useState({
    label: dadosRelVisita.CelulaVisitada,
    value: -1,
    ranking: 0,
  });
  const [listaCelulas, setListaCelulas] = React.useState(valorInicial);
  const [valorEstrutura, setValorEstrutura] = React.useState({
    label: dadosRelVisita.Estrutura,
    value: -1,
  });
  const [valorRecepcao, setValorRecepcao] = React.useState({
    label: dadosRelVisita.Recepcao,
    value: -1,
  });
  const [valorEtapas, setValorEtapas] = React.useState({
    label: dadosRelVisita.Etapas,
    value: -1,
  });
  const [valorDescricao, setValorDescricao] = React.useState(
    dadosRelVisita.Observacoes,
  );
  const [loading, setLoading] = React.useState(false);
  const [ranking, setRanking] = React.useState('');

  const recepcaoRef = React.useRef();
  const estruturaRef = React.useRef();
  const nCelulaRef = React.useRef();
  const etapasRef = React.useRef();

  const descricaoRef = React.useRef();
  const celulaSetor = lideranca.filter(
    (results) =>
      Number(results.Supervisao) === Number(perfilUser.Supervisao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );

  React.useEffect(() => {
    const numberCelulas = celulaSetor.map((itens) => itens.Celula);
    const uniqueArr = [...new Set(numberCelulas)];
    //  const [numeroCelula] = React.useState(uniqueArr);
    if (uniqueArr) {
      const dadosCelula = uniqueArr.map((row, index) =>
        createData(`Célula - ${row}`, index),
      );

      setListaCelulas(dadosCelula);
    }
  }, []);

  const enviarRelatorio = () => {
    setLoading(true);
    const Data = new Date(DataMMDDAAA(inputValue));
    api
      .post('/api/salvarRelVisitaSuper', {
        id: dadosRelVisita.id,
        Nome: perfilUser.Nome,
        Funcao: perfilUser.Funcao,
        CelulaVisitada: numeroCelulas.label,
        Supervisao: Number(perfilUser.Supervisao),
        Coordenacao: Number(perfilUser.Coordenacao),
        Distrito: Number(perfilUser.Distrito),
        Data,
        Recepcao: valorRecepcao.label,
        Etapas: valorEtapas.label,
        Estrutura: valorEstrutura.label,
        Observacoes: valorDescricao,
        Mes,
        Ano,
        Ranking: ranking,
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

  React.useEffect(() => {
    if (ranking) {
      enviarRelatorio();
    }
  }, [ranking]);

  const calculaRanking = () => {
    const ruim = { label: 'Ruim (Fora da Visão)', value: 1, ranking: 2 };
    const regular = {
      label: 'Regular (Corrigir Muitos Pontos)',
      value: 2,
      ranking: 5,
    };
    const boa = { label: 'Boa (Corrigir alguns pontos)', value: 3, ranking: 7 };
    const otima = {
      label: 'Ótima (Funcionando Perfeitamente)',
      value: 4,
      ranking: 9,
    };
    let nVR = 0;
    let nve = 0;
    let nvet = 0;
    if (valorRecepcao.label === 'Ruim (Fora da Visão)') nVR = ruim;
    if (valorRecepcao.label === 'Regular (Corrigir Muitos Pontos)')
      nVR = regular;
    if (valorRecepcao.label === 'Boa (Corrigir alguns pontos)') nVR = boa;
    if (valorRecepcao.label === 'Ótima (Funcionando Perfeitamente)')
      nVR = otima;

    if (valorEstrutura.label === 'Ruim (Fora da Visão)') nve = ruim;
    if (valorEstrutura.label === 'Regular (Corrigir Muitos Pontos)')
      nve = regular;
    if (valorEstrutura.label === 'Boa (Corrigir alguns pontos)') nve = boa;
    if (valorEstrutura.label === 'Ótima (Funcionando Perfeitamente)')
      nve = otima;

    if (valorEtapas.label === 'Ruim (Fora da Visão)') nvet = ruim;
    if (valorEtapas.label === 'Regular (Corrigir Muitos Pontos)')
      nvet = regular;
    if (valorEtapas.label === 'Boa (Corrigir alguns pontos)') nvet = boa;
    if (valorEtapas.label === 'Ótima (Funcionando Perfeitamente)') nvet = otima;

    const valorRanking = Number(
      (nVR.ranking + nve.ranking + nvet.ranking) / 3,
    ).toFixed(2);
    if (valorRanking <= 4) setRanking('Ruim');
    if (valorRanking > 4 && valorRanking < 6) setRanking('Regular');
    if (valorRanking >= 6 && valorRanking < 8) setRanking('Bom');
    if (valorRanking >= 8) setRanking('Otimo');
  };
  const handleSalvar = () => {
    if (numeroCelulas.label !== 'Escolha...') {
      if (valorRecepcao.label !== 'Escolha uma Opção') {
        if (valorEstrutura.label !== 'Escolha uma Opção') {
          if (valorEtapas.label !== 'Escolha uma Opção') {
            calculaRanking();
          } else {
            etapasRef.current.focus();
            toast.error('AVALIE AS ETAPAS DA REUNIÃO !', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          estruturaRef.current.focus();
          toast.error('AVALIE A ESTRUTURA DO LOCAL !', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        recepcaoRef.current.focus();
        toast.error('AVALIE A RECPÇÃO E A PONTUALIDADE !', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      nCelulaRef.current.focus();
      toast.error('ESCOLHA A CÉLULA VISITADA !', {
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
              width="100%"
              minHeight={570}
            >
              <Box width="94%">
                <Box
                  height={60}
                  color="white"
                  fontFamily="Fugaz One"
                  fontSize="18px"
                  textAlign="center"
                >
                  RELATÓRIO DE VISITAS
                </Box>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={6}>
                    <Box ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data da Visita
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
                  <Grid item xs={1} />

                  <Grid item xs={5}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Célula Visitada
                      </Typography>
                    </Box>
                    <Box mt={-0.8} width="100%">
                      <Select
                        styles={customStyles}
                        isSearchable={false}
                        defaultValue={numeroCelulas}
                        onChange={(e) => {
                          setNumeroCelulas(e);
                          recepcaoRef.current.focus();
                        }}
                        ref={nCelulaRef}
                        options={listaCelulas}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Recepcão e Pontualidade
                    </Typography>
                  </Box>
                  <Box mt={-0.5}>
                    <Select
                      styles={customStyles}
                      isSearchable={false}
                      defaultValue={valorRecepcao}
                      onChange={(e) => {
                        setValorRecepcao(e);
                        estruturaRef.current.focus();
                      }}
                      ref={recepcaoRef}
                      options={avaliacao}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Estrutura do Local
                    </Typography>
                  </Box>
                  <Box mt={-0.5}>
                    <Select
                      styles={customStyles}
                      isSearchable={false}
                      defaultValue={valorEstrutura}
                      onChange={(e) => {
                        setValorEstrutura(e);
                        etapasRef.current.focus();
                      }}
                      ref={estruturaRef}
                      options={avaliacao}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Etapas da Reunião
                    </Typography>
                  </Box>
                  <Box mt={-0.5}>
                    <Select
                      styles={customStyles}
                      isSearchable={false}
                      defaultValue={valorEtapas}
                      onChange={(e) => {
                        setValorEtapas(e);
                        descricaoRef.current.focus();
                      }}
                      ref={etapasRef}
                      options={avaliacao}
                    />
                  </Box>
                </Grid>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Observações
                    </Typography>
                  </Box>
                  <Box
                    width="100%"
                    mt={-3}
                    display="flex"
                    justifyContent="center"
                  >
                    <TextareaAutosize
                      id="Descriacao"
                      maxRows={4}
                      ref={descricaoRef}
                      value={valorDescricao}
                      aria-label="maximum height"
                      placeholder="Descreva as maiores necessidades observada"
                      onChange={(e) => {
                        setValorDescricao(e.target.value);
                      }}
                      style={{
                        display: 'flex',
                        marginTop: 20,
                        textAlign: 'center',
                        width: '100%',
                        height: 80,
                        borderRadius: 15,
                        border: '1px solid #000',
                        resize: 'vertical',
                        overflow: 'auto',
                      }}
                    />
                  </Box>
                </Box>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Box className={classes.novoBox} mt="4vh">
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
                    <Box className={classes.novoBox} mt="4vh">
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
                          style={{ background: 'green', color: 'white' }}
                          onClick={handleSalvar}
                          variant="contained"
                          severity="success"
                          endIcon={<Oval stroke="red" width={20} height={20} />}
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

export default RelCelula;
