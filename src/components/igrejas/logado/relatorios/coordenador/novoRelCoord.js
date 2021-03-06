import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Oval } from 'react-loading-icons';
import Chip from '@mui/material/Chip';
import TableContainer from '@mui/material/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import api from 'src/components/services/api';
import Select from 'react-select';

import Progresso from 'src/utils/progressoCircular';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

const necessidade = [
  { label: 'Leitura Bíblica e Oração', value: -1 },
  { label: 'Integrar na Visão', value: 0 },
  { label: 'Melhorar a Unidade', value: 1 },
  { label: 'Trabalhar a Comunhão', value: 2 },
  { label: 'Treinar a Liderança', value: 3 },
  { label: 'Lider em Treinamento', value: 4 },
  { label: 'Melhorar a Estrutura', value: 5 },
  { label: 'Novos Anfitriões', value: 6 },
  { label: 'Discipulado e Mentoriamento', value: 7 },
  { label: 'Cursos e Treinamento', value: 8 },
  { label: 'Levar Convidados', value: 9 },
  { label: 'Multiplicação', value: 10 },
];

const obstaculos = [
  { label: 'Desânimo do Grupo', value: 0 },
  { label: 'Falta de Tempo', value: 1 },
  { label: 'Distância Geográfica', value: 2 },
  { label: 'Falta de paixão por pessoas', value: 3 },
  { label: 'Falta de líderes treinados', value: 4 },
  { label: 'Não sabem com Fazer', value: 5 },
  { label: 'Falta de Interesse', value: 6 },
  { label: 'Falta de Recursos', value: 7 },
];

const acoes = [
  { label: 'Planejar Vigílias e Jejuns', value: 0 },
  { label: 'Planejar Momentos de Oração', value: 1 },
  { label: 'Fazer células em novos lugares', value: 2 },
  { label: 'Agendar Treinamento para novos Líderes', value: 3 },
  { label: 'Visitas Regulares as Reuniões dessa Celula', value: 4 },
  { label: 'Planejar Eventos pontos', value: 5 },
  { label: 'Planejar visitas e eventos de comunhão', value: 6 },
  { label: 'Treinamento sobre a visão celular', value: 7 },
  { label: 'Planejar um encontro com Deus para a Célula', value: 7 },
  { label: 'Treinamento de Discipulado para a célula', value: 7 },
  { label: 'Preparar um novo líder para a Célula', value: 7 },
];
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

function createData(label, value) {
  return { label, value };
}

function RelSuper({ perfilUser, setOpenNovoRelatorio, lideranca, Mes, Ano }) {
  const classes = useStyles();
  //= ================================================================

  const valorInicial = { label: 'Escolha uma Opção', value: -1 };
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [percentual, setPercentual] = React.useState(0);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [percentualInicial] = React.useState(percentual);
  //  const InicialNSuper = { label: 'Escolha...', value: 0 };

  const [numeroSuper, setNumeroSuper] = React.useState({
    label: 'Escolha...',
    value: -1,
  });
  const [listaSuper, setListaSuper] = React.useState(valorInicial);

  const [valorNecessidade, setValorNecessidade] = React.useState(valorInicial);
  const [valorObstaculos, setValorObstaculos] = React.useState(valorInicial);
  const [valorDescricao, setValorDescricao] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const obstaculoRef = React.useRef();
  const nSuperRef = React.useRef();
  const necessidadeRef = React.useRef();
  const acaoRef = React.useRef();

  const superOrdenada = lideranca.sort((a, b) => {
    if (new Date(a.supervisao) > new Date(b.supervisao)) return 1;
    if (new Date(b.supervisao) > new Date(a.supervisao)) return -1;
    return 0;
  });

  const superSetor = superOrdenada.filter(
    (results) =>
      Number(results.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Supervisor',
  );

  React.useEffect(() => {
    const numberSuper = superSetor.map((itens) => itens.supervisao);
    const uniqueArr = [...new Set(numberSuper)];
    //  const [numeroSuper] = React.useState(uniqueArr);
    if (uniqueArr) {
      const dadosSuper = uniqueArr.map((row, index) =>
        createData(`Supervisão - ${row}`, index),
      );

      setListaSuper(dadosSuper);
    }
  }, []);

  const enviarRelatorio = () => {
    setLoading(true);
    api
      .post('/api/criarRelSuper', {
        Nome: perfilUser.Nome,
        Funcao: perfilUser.Funcao,
        CelulaVisitada: numeroSuper.label,
        Supervisao: Number(perfilUser.supervisao),
        Coordenacao: Number(perfilUser.Coordenacao),
        Distrito: Number(perfilUser.Distrito),
        Data: inputValue,
        Necessidades: JSON.stringify(valorNecessidade),
        Progresso: String(percentual),
        Obstaculos: JSON.stringify(valorObstaculos),
        Acao: JSON.stringify(valorDescricao),
        Mes,
        Ano,
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
    if (numeroSuper.label !== 'Escolha...') {
      if (valorNecessidade.label !== 'Escolha uma Opção') {
        if (valorObstaculos.label !== 'Escolha uma Opção') {
          if (valorDescricao) {
            enviarRelatorio();
          } else {
            acaoRef.current.focus();
            toast.error('preencha pelo menos uma Ação !', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          obstaculoRef.current.focus();
          toast.error('preencha pelo menos 1 obstaculo !', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        acaoRef.current.focus();
        toast.error('Descreva as Necessidades !', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      nSuperRef.current.focus();
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

  // const jsonNecessidade = JSON.stringify(valorNecessidade);
  //  const obj = JSON.parse(jsonNecessidade);

  return (
    <Box height="90vh" minHeight={500} width="100%">
      <Box
        height="100%"
        minWidth={300}
        width="100vw"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100vw" minWidth={300}>
          <Box height="100%">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              bgcolor={corIgreja.principal}
            >
              <Box width="94%">
                <Box
                  m="2vh"
                  color="#F0F0F0"
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                >
                  RELATÓRIO DO COORDENADOR
                </Box>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={6}>
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
                  <Grid item xs={1} />

                  <Grid item xs={5}>
                    <Box mt={0} ml={1} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Escolha a Supervisão
                      </Typography>
                    </Box>
                    <Box mt={-0.8} width="100%">
                      <Select
                        styles={customStyles}
                        isSearchable={false}
                        defaultValue={numeroSuper}
                        onChange={(e) => {
                          setNumeroSuper(e);
                          necessidadeRef.current.focus();
                        }}
                        ref={nSuperRef}
                        options={listaSuper}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <TableContainer
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: 2,
                    maxHeight: 300,
                    background: corIgreja.principal,
                    borderRadius: 6,
                  }}
                >
                  <Box width="100%">
                    <Box mt="2vh" ml={2} width="90%" color="white">
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{ fontFamily: 'arial black', fontSize: '12px' }}
                      >
                        Necessidades Imediatas
                      </Typography>
                    </Box>
                    <Box
                      mt={-0.5}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Box width="96%">
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          sx={{
                            background: 'white',
                            color: 'black',

                            borderRadius: 2,
                          }}
                          onChange={(_, newValue) => {
                            if (newValue) setValorNecessidade(newValue);
                          }}
                          options={necessidade.map((option) => option.label)}
                          freeSolo
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={necessidadeRef}
                              placeholder="Necessidades existentes"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box width="100%">
                    <Box mt="2vh" ml={2} width="90%" color="white">
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{ fontFamily: 'arial black', fontSize: '12px' }}
                      >
                        Obstáculos Existentes
                      </Typography>
                    </Box>
                    <Box
                      mt={-0.5}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Box width="96%">
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          sx={{
                            background: 'white',
                            color: 'black',
                            borderRadius: 2,
                          }}
                          onChange={(_, newValue) => {
                            if (newValue) setValorObstaculos(newValue);
                          }}
                          options={obstaculos.map((option) => option.label)}
                          freeSolo
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={obstaculoRef}
                              placeholder="Possíveis obstáculos a enfrentar"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box mb={2} width="100%">
                    <Box mt="2vh" ml={2} width="80%" color="white">
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{ fontFamily: 'arial black', fontSize: '12px' }}
                      >
                        Plano de Ação
                      </Typography>
                    </Box>
                    <Box
                      mt={-0.5}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Box width="96%">
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          sx={{
                            background: 'white',
                            color: 'black',
                            border: '2px solid black',
                            borderRadius: 2,
                          }}
                          onChange={(_, newValue) => {
                            if (newValue) setValorDescricao(newValue);
                          }}
                          options={acoes.map((option) => option.label)}
                          freeSolo
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={acaoRef}
                              placeholder="Ações a serem aplicadas"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TableContainer>
                <Grid item xs={11}>
                  <Box
                    textAlign="center"
                    mt="1vh"
                    mb="2vh"
                    color="white"
                    sx={{ fontSize: 'bold' }}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      {percentual}% de Desenvolvimento da Ação
                    </Typography>
                  </Box>
                  <Box ml={2} mt={-2}>
                    <Progresso
                      percentual={percentualInicial}
                      setPercentual={setPercentual}
                    />
                  </Box>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Box className={classes.novoBox} mt={-1}>
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
                    <Box className={classes.novoBox} mt={-1}>
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

export default RelSuper;
