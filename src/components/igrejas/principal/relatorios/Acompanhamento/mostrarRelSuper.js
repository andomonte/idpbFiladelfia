import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import Select from 'react-select';
import Dialog from '@mui/material/Dialog';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ConvertData from 'src/utils/convData2';
import DateFnsUtils from '@date-io/date-fns';

import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));
const theme = createTheme();
theme.typography.h4 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.h3 = {
  fontWeight: 'normal',
  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  '@media (min-width:400px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.h2 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};

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

const useStyles = makeStyles(() => ({}));

function RelSuper({ dadosRelVisita, setSendResumo }) {
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

  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const selectedDate = dataAtual2;
  const open = false;
  const inputValue = ConvertData(dadosRelVisita.Data);

  const [presentes] = React.useState(dadosRelVisita.Presentes);
  const [qytCelulasVisitadas, setQytCelulasVisitadas] = React.useState(
    dadosRelVisita.CelulaVisitada,
  );
  const [qytMembrosVisitados, setQytMembrosVisitados] = React.useState(
    dadosRelVisita.MembrosVisitados,
  );

  const [corQytCelulas, setCorQytCelulas] = React.useState('white');
  const [corQytLiderados, setCorQytLiderados] = React.useState('white');

  const [corAvalRelatorios, setCorAvalRelatorios] = React.useState('white');
  const [corAvalPlanejamento, setCorAvalPlanejamento] = React.useState('white');
  const [corAvalDiscipulado, setCorAvalDiscipulado] = React.useState('white');

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

  const qytCelulasRef = React.useRef();
  const qytLideradosRef = React.useRef();
  const [openObs, setOpenObs] = React.useState(false);
  //= ==================================================================

  const getData = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
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
          {' '}
          <Box
            height="5%"
            color="white"
            display="flex"
            alignItems="end"
            justifyContent="center"
          >
            Relatório do{' '}
            {dadosRelVisita && dadosRelVisita.Funcao
              ? dadosRelVisita.Funcao
              : ''}
            :
          </Box>
          <Box
            color={corIgreja.textoP}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {dadosRelVisita && dadosRelVisita.Nome ? dadosRelVisita.Nome : ''}
          </Box>
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
                            disabled
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            id="date-picker-inline"
                            value={selectedDate}
                            inputValue={inputValue}
                            // onClick={handleDateClick}
                            // onChange={handleDateChange}
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

                <Box
                  fontFamily="Rubik"
                  fontWeight="bold"
                  fontSize="14px"
                  textAlign="center"
                  color="white"
                  mt="3vh"
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
                        disabled
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
                        disabled
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
                  mt="5vh"
                >
                  SEU DESEMPELHO QUANTO À
                </Box>
                <Box width="100%">
                  <Box color={corAvalRelatorios} mt="2vh" ml={2} width="90%">
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
                        isDisabled
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
                      Orientação e Auxílio às necessdiades
                    </Typography>
                  </Box>
                  <Box
                    mt={-0.5}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box height="100%" width="100%">
                      <Select
                        isDisabled
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
                      Mentoriamento e pastoreio da Equipe
                    </Typography>
                  </Box>
                  <Box
                    mt={-0.5}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box height="100%" width="100%">
                      <Select
                        isDisabled
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
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={12}>
                    <Box
                      mt={5}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="2.5vh"
                      minHeight={10}
                      bgcolor="#fafafa"
                    >
                      {presentes ? (
                        <Button
                          style={{
                            background: 'white',
                            color: 'blue',
                            fontFamily: 'arial black',
                            width: '100%',
                          }}
                          component="a"
                          variant="contained"
                          onClick={() => {
                            setOpenObs(true);
                          }}
                        >
                          CLICK P/ VER OBSERVAÇÕES
                        </Button>
                      ) : (
                        <Button
                          style={{
                            background: 'white',
                            color: 'gray',
                            fontSize: '14px',
                            fontFamily: 'arial black',
                            width: '100%',
                          }}
                          component="a"
                          variant="contained"
                        >
                          SEM OBSERVAÇÕES
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Box className={classes.novoBox} mt="5vh">
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
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog fullScreen open={openObs} TransitionComponent={Transition}>
        <Box
          mt={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="95%"
          color="black"
          bgcolor="#fafafa"
        >
          <Box
            mt={-1}
            height="100%"
            width="94%"
            display="flex"
            fontSize="18px"
            justifyContent="center"
            alignItems="center"
          >
            {presentes !== undefined && presentes !== null ? (
              <Box textAlign="justify"> {presentes}</Box>
            ) : (
              'Sem Observações'
            )}
          </Box>
        </Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="5%"
          minHeight={10}
          bgcolor="#fafafa"
        >
          <Button
            style={{
              background: 'orange',
              color: 'black',
              fontFamily: 'arial black',
              fontSize: '16px',
              width: '90%',
            }}
            component="a"
            variant="contained"
            onClick={() => {
              setOpenObs(false);
            }}
          >
            FECHAR OBSERVAÇÕES
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default RelSuper;
