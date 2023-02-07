import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import horarioMask from 'src/components/mascaras/horario';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DateFnsUtils from '@date-io/date-fns';
import ConverteData from 'src/utils/dataMMDDAAAA';
import ConverteData2 from 'src/utils/convData2';
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
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';

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

  const [horario, setHorario] = React.useState('');
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

    setHorario('');
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
  return <Box height="100%">ola</Box>;
}
