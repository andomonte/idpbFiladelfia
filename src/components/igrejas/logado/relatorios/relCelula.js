import { Box, Grid, Paper, Button, TextField } from '@material-ui/core';
import React from 'react';
import useSWR, { mutate } from 'swr';
// import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Erros from 'src/utils/erros';
import dataMask from 'src/components/mascaras/datas';
import celularMask from 'src/components/mascaras/celular';
import moment from 'moment';
import { TiUserAdd } from 'react-icons/ti';
import { IoIosSave, IoIosAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import {
  IoArrowUndoSharp,
  IoReturnDownBack,
  IoArrowRedoSharp,
} from 'react-icons/io5';
import api from 'src/components/services/api';
import axios from 'axios';
import PegaIdade from 'src/utils/getIdade';
import { Oval } from 'react-loading-icons';
import Espera from 'src/utils/espera';

import Emojis from 'src/components/icones/emojis';

import TabCelula from './abas/tabCelula';
import TabVisitantes from './abas/tabVisitantes';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);

function createData(Nome, Presenca) {
  return { Nome, Presenca };
}
function createRelCelula(Rol, Nome, Presenca) {
  return {
    Rol,
    Nome,
    Presenca,
  };
}
function createRelVisitantes(Rol, Nome, Presenca) {
  return {
    Rol,
    Nome,
    Presenca,
  };
}

function createEstatistico(
  Celula,
  Distrito,
  Semana,
  Data,
  NomesMembros,
  NomesVisitantes,
  Adultos,
  Criancas,
  Visitantes,
  PresentesEventos,
  Visitas,
  Conversoes,
  Observacoes,
  CriadoPor,
  CriadoEm,
) {
  return {
    Celula,
    Distrito,
    Semana,
    Data,
    NomesMembros,
    NomesVisitantes,
    Adultos,
    Criancas,
    Visitantes,
    PresentesEventos,
    Visitas,
    Conversoes,
    Observacoes,
    CriadoPor,
    CriadoEm,
  };
}

function createPontuacao(
  RelCelulaFeito, // indeca que houve c??lula
  Relatorio, // vale 1 ponto
  Pontualidade, // vale 1 ponto
  PresentesCelula, // vale percentual/10 pontos
  VisitantesCelula, // vale 1 ponto cada
  RelCelebracao,
  CelebracaoIgreja, // vale percentual/10 pontos
  CelebracaoLive, // vale percentual/20 pontos
  RelDiscipulado,
  Discipulados, // vale 2 pontos cada
  Visitas, // vale 1 ponto cada membro visitando pelo lider
  NovoMembro, // vale 10 pontos cada novo membro
  Eventos, // participa????o nos eventos vale 1 ponto por membro
  LeituraBiblica, // vale 2 pontos cada membro
  VisitantesCelebracao,
) {
  return {
    RelCelulaFeito, // indeca que houve c??lula
    Relatorio, // vale 1 ponto
    Pontualidade, // vale 1 ponto
    PresentesCelula, // vale percentual/10 pontos
    VisitantesCelula, // vale 1 ponto cada
    RelCelebracao,
    CelebracaoIgreja, // vale percentual/10 pontos
    CelebracaoLive, // vale percentual/20 pontos
    RelDiscipulado,
    Discipulados, // vale 2 pontos cada
    Visitas, // vale 1 ponto cada membro visitando pelo lider
    NovoMembro, // vale 10 pontos cada novo membro
    Eventos, // participa????o nos eventos vale 1 ponto por membro
    LeituraBiblica, // vale 2 pontos cada membro
    VisitantesCelebracao,
  };
}

function RelCelula({ rolMembros, perfilUser, visitantes }) {
  //  const classes = useStyles();
  // const router = useRouter();
  let visitantesCelula = visitantes.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [contConversoes, setContConversoes] = React.useState(0);
  const [contEventos, setContEventos] = React.useState(0);
  const [contVisitas, setContVisitas] = React.useState(0);
  const [observacoes, setObservacoes] = React.useState(0);
  const [nomesVisitantes, setNomesVisitantes] =
    React.useState(visitantesCelula);
  const nomesCelulas = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const dadosCelula = nomesCelulas.map((row) => createData(row.Nome, false));
  const [checkRelatorio, setCheckRelatorio] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const [progress, setProgress] = React.useState(5);

  // let enviarDia;
  // let enviarData;
  const [nomeVistante, setNomeVisitante] = React.useState('');
  const [nomesVisitanteTab, setNomesVisitanteTab] = React.useState('');
  const [nascimentoVisitante, setNascimentoVisitante] = React.useState('');
  const [foneVisitante, setFoneVisitante] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [qtyVisitante, setQtyVisitante] = React.useState(0);
  const [presentes, setPresentes] = React.useState(0);
  const [rankCelula, setRankCelula] = React.useState([]);
  const [rankGeral, setRankGeral] = React.useState(0);
  const [pontosAtual, setPontosAtual] = React.useState([]);

  const [pontosAnterior, setPontosAnterior] = React.useState([]);
  const [relPresentes, setRelPresentes] = React.useState(dadosCelula);
  const [tela, setTela] = React.useState(1);
  const [carregando, setCarregando] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [loading, setLoading] = React.useState(true);
  const [pFinal, setPFinal] = React.useState({});
  const [pTotalAtualRank, setPTotalAtualRank] = React.useState(0);
  const [pTotalAtual, setPTotalAtual] = React.useState(0);

  const [adultos, setAdultos] = React.useState(0);
  const [criancas, setCriancas] = React.useState(0);
  const [openVisitantes, setOpenVisitantes] = React.useState(false);
  const [rank, setRank] = React.useState(0);
  const anoAtual = dataAtual2.getFullYear();
  const [AnoAtual, setAnoAtual] = React.useState(anoAtual);
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
  const [startShow, setStartShow] = React.useState(false);
  const [semana, setSemana] = React.useState(0);
  const [existeRelatorio, setExisteRelatorio] = React.useState('inicio');
  const [podeEditar, setPodeEditar] = React.useState(true);
  const [deleteVis, setDeleteVis] = React.useState(false);

  React.useEffect(() => {
    const timeElapsed = Date.now();
    const dataAtual = new Date(timeElapsed);

    if (dataAtual) {
      setSemana(semanaExata(dataAtual));
    }
    if (nomesVisitantes.length) {
      const nomesVisitantesParcial = nomesVisitantes.map((row) =>
        createRelVisitantes(row.id, row.Nome, false),
      );
      setNomesVisitantes(nomesVisitantesParcial);
    }
  }, []);

  const handleIncConversoes = () => {
    let contAtual = contConversoes;
    if (podeEditar) contAtual += 1;

    if (contAtual > 999) contAtual = 0;
    setContConversoes(contAtual);
  };
  const handleDecConversoes = () => {
    let contAtual = contConversoes;
    if (podeEditar) contAtual -= 1;

    if (contAtual < 0) contAtual = 0;
    setContConversoes(contAtual);
  };

  const handleIncEventos = () => {
    let contAtual = contEventos;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContEventos(contAtual);
  };
  const handleDecEventos = () => {
    let contAtual = contEventos;
    if (podeEditar) contAtual -= 1;
    if (contAtual < 0) contAtual = 0;
    setContEventos(contAtual);
  };
  const handleIncVisitas = () => {
    let contAtual = contVisitas;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContVisitas(contAtual);
  };
  const handleDecVisitas = () => {
    let contAtual = contVisitas;
    if (podeEditar) contAtual -= 1;

    if (contAtual < 0) contAtual = 0;
    setContVisitas(contAtual);
  };

  const url = `/api/consultaRelatorioCelulas/${semana}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  const url2 = `/api/consultaPontuacao/${perfilUser.Distrito}/${perfilUser.Celula}`;
  const { data: pontos, error: errorPontos } = useSWR(url2, fetcher);
  const url3 = `/api/consultaPontuacaoSemana/${semana}`;
  const { data: PontosSemana, error: errorPontosSemana } = useSWR(
    url3,
    fetcher,
  );

  const url4 = `/api/consultaVisitantes`;
  const { data: novoVisitante, error: errorVisitante } = useSWR(url4, fetcher);

  const ajusteRelatorio = () => {
    const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
    // const qtyVis = visitantes.filter((val) => val.Presenca === true);
    setTela(1);
    setCarregando(false);
    setPresentes(qtyPres.length);
    setQtyVisitante(0);
    setContConversoes(0);
    setContVisitas(0);
    setContEventos(0);
    setRelPresentes(dadosCelula);
    setObservacoes('');
    setCheckRelatorio(false);
    setPodeEditar(true);

    if (members) setExisteRelatorio('sem');
    else setExisteRelatorio('inicio');
    if (members && members.length > 0) {
      const relatorio = members.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (relatorio && relatorio.length) {
        const dataAgora = new Date();
        const semanaAgora = semanaExata(dataAgora);
        if (semanaAgora - semana < 2) setPodeEditar(true);
        else setPodeEditar(false);
        setExisteRelatorio(true); // avisa que tem relat??rio
        // setCheckRelatorio(true); // avisa que tem relat??rio nessa data

        const nomesMembros = JSON.parse(relatorio[0].NomesMembros);
        const nVisitantes = relatorio[0].NomesVisitantes;

        const qtyPresentes = nomesMembros.filter(
          (val) => val.Presenca === true,
        );
        const qtyVisitants = nVisitantes.filter((val) => val.Presenca === true);
        setPresentes(qtyPresentes.length);
        setQtyVisitante(qtyVisitants.length);
        setContConversoes(relatorio[0].Conversoes);
        setContVisitas(relatorio[0].Visitas);
        setContEventos(relatorio[0].PresentesEventos);
        setRelPresentes(nomesMembros);
        setObservacoes(relatorio[0].Observacoes);

        setNomesVisitanteTab(nVisitantes);
        setStartShow(!startShow);

        // setRelCelula(relatorio);
      } else {
        //   setNomesVisitantes(nomesVisitantesParcial);
        const qtyVisitanteNovo = visitantesCelula.filter(
          (val) => val.Presenca === true,
        );
        setQtyVisitante(qtyVisitanteNovo.length);
        setExisteRelatorio('sem');
        setStartShow(!startShow);
      }
    } else {
      // setNomesVisitantes(nomesVisitantesParcial);
      const qtyVisitanteNovo = visitantesCelula.filter(
        (val) => val.Presenca === true,
      );
      setQtyVisitante(qtyVisitanteNovo.length);

      setStartShow(!startShow);
    }

    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;

    return 0;
  };

  React.useEffect(() => {
    if (semana !== 0) {
      ajusteRelatorio();
    }
    return 0;
  }, [semana]);

  React.useEffect(() => {
    if (deleteVis) {
      mutate(url4);
      setDeleteVis(false);
    }
    return 0;
  }, [deleteVis]);

  React.useEffect(() => {
    if (errorVisitante) return <div>An error occured.</div>;
    if (!novoVisitante) return <div>Loading ...</div>;

    if (novoVisitante) {
      // se teve relat??rio nomesVisitantes tras a lista

      const visitantesCelula2 = novoVisitante.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      // filtrou apenas os visitantes da c??lula

      let visitantesPresentes = '';

      if (nomesVisitanteTab) {
        visitantesPresentes = nomesVisitanteTab.filter(
          (val) => val.Presenca === true,
        );
      }

      // filtrou apenas os visitantes da c??lula presentes

      if (visitantesCelula2.length) {
        const nomesVisitantesParcial = visitantesCelula2.map((row) =>
          createRelVisitantes(row.id, row.Nome, false),
        );
        // atribuiu falta a todos visitantes da c??lula

        for (let i = 0; i < nomesVisitantesParcial.length; i += 1) {
          for (let j = 0; j < visitantesPresentes.length; j += 1) {
            if (nomesVisitantesParcial[i].Rol === visitantesPresentes[j].Rol)
              nomesVisitantesParcial[i].Presenca = true;
          }
        }

        visitantesCelula = nomesVisitantesParcial;
        setNomesVisitantes(nomesVisitantesParcial);
      }
    }
    return 0;
  }, [novoVisitante, nomesVisitanteTab]);

  React.useEffect(() => {
    ajusteRelatorio();

    return 0;
  }, [members]);

  React.useEffect(() => {
    //  contEffect += 1;
    setExisteRelatorio('inicio');
    if (selectedDate) {
      const checkAno = selectedDate.getFullYear();
      setAnoAtual(checkAno);
      // selectedDate.setTime(selectedDate.getTime() + 1000 * 60);
      if (checkAno > 2020) {
        setSemana(semanaExata(selectedDate));
      }

      ajusteRelatorio();
    }
  }, [selectedDate]);

  React.useEffect(() => {
    setRelPresentes(
      relPresentes.sort((a, b) => {
        if (a.Nome > b.Nome) return 1;
        if (b.Nome > a.Nome) return -1;
        return 0;
      }),
    );
  }, [relPresentes]);

  //= ========================calcular adulto e crianca========================

  const handleTela2 = () => {
    if (nomesCelulas && nomesCelulas.length > 0) {
      const listaPresentes = nomesCelulas.filter(
        (val, index) => val.Nome && relPresentes[index].Presenca === true,
      );
      const idade = [];
      let contAdultos = 0;
      let contCriancas = 0;
      for (let i = 0; i < listaPresentes.length; i += 1) {
        idade[i] = PegaIdade(listaPresentes[i].Nascimento);
        if (String(idade[i]) !== 'NaN')
          if (idade[i] > 11) {
            contAdultos += 1;
          } else {
            contCriancas += 1;
          }
      }
      setAdultos(contAdultos);
      setCriancas(contCriancas);
    }

    setTela(2);
  };

  const handleVisitantes = () => {
    setOpenVisitantes(true);
    // setVisBackUp(nomesVisitantes);
    // setQtyVisitanteBackUp(qtyVisitante);
  };
  //= =========================================
  const handleSalvarVisitante = () => {
    //    const { dataVisitante, errorVisitante } = useSWR(url2, fetcher);
    // if(dataVisitante,)

    const CriadoEm = new Date();

    if (nomeVistante.length > 3) {
      setCarregando(true);

      api
        .post('/api/inserirVisitante', {
          Nome: nomeVistante,
          Celula: Number(perfilUser.Celula),
          Distrito: Number(perfilUser.Distrito),
          Contato: foneVisitante,
          Nascimento: nascimentoVisitante,
          CriadoPor: perfilUser.Nome,
          CriadoEm,
        })
        .then((response) => {
          if (response) {
            setCarregando(false);
            setNomeVisitante('');
            setNascimentoVisitante('');
            setFoneVisitante('');

            let dadosNovos = [];
            dadosNovos = response.data;

            const nomesVisitantesParcial = createRelVisitantes(
              dadosNovos.id,
              dadosNovos.Nome,
              true,
            );

            const nomesNovos = [];
            nomesNovos.push(nomesVisitantesParcial);

            setNomesVisitantes((state) => [...state, nomesVisitantesParcial]);

            // mutate(url4);
          }
        })
        .catch(() => {
          setOpenErro(true);
          // console.log(erro); //  updateFile(uploadedFile.id, { error: true });
        });
    } else {
      handleVisitantes();
      setOpenVisitantes(false);
    }
  };
  //= ============================================================

  const handleCancelaVisitante = () => {
    // setNomesVisitantes(visBackUp);
    //  setQtyVisitante(qtyVisitanteBackUp);
    setOpenVisitantes(false);
  };

  const pegarPontuacao = () => {
    if (errorPontos) return <div>An error occured.</div>;
    if (!pontos) return <div>Loading ...</div>;
    if (pontos) {
      const pontosSemanaAtual = pontos.filter(
        (val) => val.Semana === Number(semana),
      );
      const pontosSemanaAnterior = pontos.filter(
        (val) => val.Semana === Number(semana - 1),
      );

      setPontosAtual(pontosSemanaAtual);
      setPontosAnterior(pontosSemanaAnterior);
    }

    return 0;
  };

  const criarPontuacao = () => {
    const criadoEm = new Date();
    // const dataRel = getDataPontos(selectedDate);
    const semanaPontuacao = semanaExata(criadoEm);
    let pontuacaoAtual = [];
    const pontosRelCelula = 1;
    let pontosRelatorio = 0;
    let pontosPontualidade = 0;
    const pontosPresentes = presentes;
    const pontosVisitantesCelula = qtyVisitante;
    const pontosEventos = contEventos;
    const pontosNovoMembro = 0;
    const pontosVisitas = contVisitas;

    let pontosRelCelebracao = 0;
    let pontosCelebracaoIgreja = 0;
    let pontosCelebracaoLive = 0;
    let pontosRelDiscipulado = 0;
    let pontosDiscipulado = 0;
    let pontosLeituraBiblia = 0;
    let pontosVisitantesCelebracao = 0;
    let pontosTotalAtual = 0;
    let pontosTotalAnterior = 0;
    let pontosTotalAtualRank = 0;

    if (pontosAtual.length) {
      pontuacaoAtual = pontosAtual[0].Pontuacao;

      if (pontuacaoAtual !== '') {
        if (
          semanaPontuacao === semana &&
          pontuacaoAtual.RelCelebracao === 1 &&
          pontuacaoAtual.RelDiscipulado === 1
        )
          pontosPontualidade = 1;
      }
      if (pontuacaoAtual.RelCelebracao === 1) {
        pontosRelCelebracao = pontuacaoAtual.RelCelebracao;
        pontosCelebracaoIgreja = pontuacaoAtual.CelebracaoIgreja;
        pontosCelebracaoLive = pontuacaoAtual.CelebracaoLive;
        pontosVisitantesCelebracao = pontuacaoAtual.VisitantesCelebracao;
      }
      if (pontuacaoAtual.RelDiscipulado === 1) {
        pontosRelDiscipulado = pontuacaoAtual.RelDiscipulado;
        pontosDiscipulado = pontuacaoAtual.Discipulados;
        pontosLeituraBiblia = pontuacaoAtual.LeituraBiblica;
      }
      if (
        pontuacaoAtual.RelCelebracao === 1 &&
        pontuacaoAtual.RelDiscipulado === 1
      )
        pontosRelatorio = 1;
      if (pontosAnterior.length) {
        if (pontosAnterior[0].Total) {
          pontosTotalAnterior = pontosAnterior[0].Total;
        }
      }
    }

    const percPresentes = Number(
      Number((pontosPresentes * 100) / relPresentes.length).toFixed(2) / 10,
    ).toFixed(2);
    const percCelebracaoIgreja = Number(
      Number((pontosCelebracaoIgreja * 100) / relPresentes.length).toFixed(2) /
        10,
    ).toFixed(2);
    const percCelebracaoLive = Number(
      Number((pontosCelebracaoLive * 100) / relPresentes.length).toFixed(2) /
        20,
    ).toFixed(2);
    const percDiscipulado = Number(
      Number((pontosDiscipulado * 100) / relPresentes.length).toFixed(2) / 10,
    ).toFixed(2);

    const percLeituraBiblica = Number(
      Number((pontosLeituraBiblia * 100) / relPresentes.length).toFixed(2) / 10,
    ).toFixed(2);
    // toal rank conta os eventos mas o total n??o pois nem sempre tem eventos e pode
    // causar erros no percentual de crescimento.
    if (pontosTotalAtual === 0)
      pontosTotalAtual = Number(
        pontosRelatorio +
          Number(percPresentes) +
          Number(pontosPontualidade) +
          pontosVisitantesCelula +
          pontosVisitas +
          Number(percCelebracaoIgreja) +
          Number(percCelebracaoLive) +
          Number(percDiscipulado) +
          Number(percLeituraBiblica),
      ).toFixed(2);
    if (pontosTotalAtualRank === 0)
      pontosTotalAtualRank = Number(
        pontosRelatorio +
          Number(percPresentes) +
          Number(pontosPontualidade) +
          pontosVisitantesCelula +
          pontosVisitas +
          pontosEventos +
          Number(percCelebracaoIgreja) +
          Number(percCelebracaoLive) +
          Number(percDiscipulado) +
          Number(percLeituraBiblica),
      ).toFixed(2);
    const TotalPercentual = pontosTotalAtual;
    if (pontosTotalAnterior === 0)
      pontosTotalAnterior = parseFloat(TotalPercentual).toFixed(2);

    const PontuacaoFinal = createPontuacao(
      Number(pontosRelCelula),
      Number(pontosRelatorio),
      Number(pontosPontualidade),
      Number(pontosPresentes),
      Number(pontosVisitantesCelula),
      Number(pontosRelCelebracao),
      Number(pontosCelebracaoIgreja),
      Number(pontosCelebracaoLive),
      Number(pontosRelDiscipulado),
      Number(pontosDiscipulado),
      Number(pontosVisitas),
      Number(pontosNovoMembro),
      Number(pontosEventos),
      Number(pontosLeituraBiblia),
      Number(pontosVisitantesCelebracao),
    );

    setPFinal(PontuacaoFinal);
    setPTotalAtual(TotalPercentual);
    setPTotalAtualRank(pontosTotalAtualRank);
    //  setPTotalAnterior(pontosTotalAnterior);

    // const nomesMembros = JSON.parse(RelCelulaFinal.NomesMembros);
    /*
     */
  };
  React.useEffect(() => {
    pegarPontuacao();

    return 0;
  }, [existeRelatorio]);

  React.useEffect(() => {
    pegarPontuacao();

    criarPontuacao();

    return 0;
  }, [
    semana,
    presentes,
    qtyVisitante,
    contConversoes,
    contEventos,
    contVisitas,
    pontos,
  ]);

  const enviarPontuacao = () => {
    const CriadoEm = new Date();

    api
      .post('/api/criarPontuacao', {
        Semana: semana,
        Celula: Number(perfilUser.Celula),
        Distrito: Number(perfilUser.Distrito),
        Supervisao: Number(perfilUser.supervisao),
        Ano: Number(AnoAtual),
        Pontuacao: pFinal,
        Total: pTotalAtual,
        TotalRank: pTotalAtualRank,
        CriadoPor: perfilUser.Nome,
        CriadoEm,
      })
      .then((response) => {
        if (response) {
          /*  setCarregando(false);
          setCheckRelatorio(false);
          ajusteRelatorio();
          setTela(1);
*/
          mutate(url);
          mutate(url2);
          mutate(url3);
          //    router.reload(window.location.pathname);
        }
      })
      .catch(() => {
        // console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
  };
  const handleSalvar = () => {
    setCarregando(true);
    criarPontuacao();

    const criadoEm = new Date();
    const nomesCelulaParcial = nomesCelulas.map((row, index) =>
      createRelCelula(row.RolMembro, row.Nome, relPresentes[index].Presenca),
    );
    const nomesCelulaFinal = JSON.stringify(nomesCelulaParcial);

    const RelCelulaFinal = createEstatistico(
      Number(perfilUser.Celula),
      Number(perfilUser.Distrito),
      Number(semana),
      inputValue,
      nomesCelulaFinal,
      nomesVisitantes,
      Number(adultos),
      Number(criancas),
      Number(qtyVisitante),
      Number(contEventos),
      Number(contVisitas),
      Number(contConversoes),
      String(observacoes),
      perfilUser.Nome,
      criadoEm,
    );

    // const nomesMembros = JSON.parse(RelCelulaFinal.NomesMembros);

    api
      .post('/api/criarRelCelula', {
        relatorio: RelCelulaFinal,
      })
      .then((response) => {
        if (response) {
          enviarPontuacao();
        }
      })
      .catch(() => {
        setOpenErro(true);
        // console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
  };
  const pegaRankSemana = () => {
    if (errorPontosSemana) return <div>An error occured.</div>;
    if (!PontosSemana) return <div>Loading ...</div>;
    if (PontosSemana) {
      setRankGeral(
        PontosSemana.sort((a, b) => {
          if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
          if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
          return 0;
        }),
      );
    }

    return 0;
  };

  const posicao = () => {
    if (rankGeral.length > 0) {
      const CelulaAtual = rankGeral.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (CelulaAtual.length) {
        const idCelula = CelulaAtual[0].id;
        const index = rankGeral.map((e) => e.id).indexOf(idCelula);

        setRank(index + 1);
      }
    }
  };
  const mediaCelula = () => {
    if (pontos && pontos.length > 0) {
      const semanas = [];
      const semanasTotal = [];
      for (let index = 0; index < 4; index += 1) {
        semanas[index] = pontos.filter(
          (val) => val.Semana === Number(semana - index),
        );
      }

      let somaTotal = 0;
      let divisor = 0;
      for (let index = 0; index < semanas.length; index += 1) {
        if (semanas[index] && semanas[index].length > 0) {
          semanasTotal[index] = semanas[index][0].Total;
          somaTotal += Number(semanasTotal[index]);
          divisor += 1;
        }
      }

      if (divisor === 0) divisor = 1;
      somaTotal /= divisor;

      if (somaTotal !== 0) {
        let mediaCrescimento = parseFloat(
          (100 * (pTotalAtual - somaTotal)) / somaTotal,
        ).toFixed(2);

        if (mediaCrescimento === Number(0).toFixed(2)) setRankCelula(0);
        else {
          if (pTotalAtual === somaTotal) {
            mediaCrescimento = 0;
          }

          setRankCelula(mediaCrescimento);
        }
      } else setRankCelula(0);
    }
  };

  React.useEffect(() => {
    pegaRankSemana();
    posicao();
    mediaCelula();

    return 0;
  }, [members, pTotalAtual, pontos]);

  React.useEffect(() => {
    posicao();

    return 0;
  }, [rankGeral]);
  React.useEffect(() => {
    ajusteRelatorio();
    pegaRankSemana();
    posicao();
    mediaCelula();

    return 0;
  }, [PontosSemana]);

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
      bgcolor={corIgreja.principal}
      height="90vh"
      width="100vw"
      minWidth={300}
      minHeight={500}
    >
      {openVisitantes ? (
        <Box
          minWidth={300}
          height="100%"
          width="100%"
          maxWidth={600}
          border="4px solid #fff"
        >
          <Paper
            style={{
              width: '100%',
              minHeight: 500,
              height: '100%',
              background: '#fafafa',
            }}
          >
            <Box height="100%">
              <Box
                height="10%"
                minHeight={30}
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
                  color="white"
                  fontSize="18px"
                  fontFamily="arial black"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="90%"
                  mt={1}
                >
                  LISTA DE VISITANTES
                </Box>
              </Box>

              <Box
                height="43.9%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={220}
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
                    width="95%"
                    height="100%"
                  >
                    <Box
                      height="43.7%"
                      minHeight={220}
                      bgcolor="#ffff"
                      width="100%"
                      borderRadius={16}
                    >
                      <Box mt={2}>
                        <TabVisitantes
                          nomesVisitantes={nomesVisitantes}
                          setQtyVisitante={setQtyVisitante}
                          setNomesVisitantes={setNomesVisitantes}
                          podeEditar={podeEditar}
                          setDeleteVis={setDeleteVis}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                height="33%"
                width="100%"
                minHeight={120}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
              >
                <Box ml={1}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="white"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Nome do Visitante
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '90vw',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nome"
                            // label="Matricula"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={nomeVistante}
                            variant="standard"
                            placeholder="Nome completo"
                            onChange={(e) => {
                              setNomeVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="white"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Celular
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '100%',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Fone"
                            // label="Matricula"
                            type="tel"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={celularMask(foneVisitante)}
                            variant="standard"
                            placeholder="telefone"
                            onChange={(e) => {
                              setFoneVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="white"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Data de Nascimento
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '100%',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nascimento"
                            // label="Matricula"
                            type="tel"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(nascimentoVisitante)}
                            variant="standard"
                            placeholder="dd/mm/aaaa"
                            onChange={(e) => {
                              setNascimentoVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                height="10%"
                minHeight={75}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
                style={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
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
                        <Grid item xs={6} md={6} lg={6} xl={9}>
                          <Paper
                            style={{
                              borderRadius: 16,
                              textAlign: 'center',
                              background: '#feeffa',
                              height: 40,
                            }}
                          >
                            <Button
                              startIcon={<IoReturnDownBack color="blue" />}
                              onClick={() => {
                                handleCancelaVisitante();
                              }}
                            >
                              <Box mt={0.3} sx={{ fontFamily: 'arial black' }}>
                                Voltar
                              </Box>
                            </Button>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={9}>
                          <Paper
                            style={{
                              borderRadius: 16,
                              textAlign: 'center',
                              background: podeEditar ? '#ffffaa' : 'gray',

                              height: 40,
                            }}
                          >
                            {podeEditar ? (
                              <Box>
                                <Box>
                                  {!carregando ? (
                                    <Button
                                      onClick={handleSalvarVisitante}
                                      startIcon={<IoIosSave color="blue" />}
                                    >
                                      <Box
                                        mt={0.3}
                                        sx={{ fontFamily: 'arial black' }}
                                      >
                                        <Box>Salvar</Box>
                                      </Box>
                                    </Button>
                                  ) : (
                                    <Button>
                                      <Box
                                        display="flex"
                                        mt={0.5}
                                        sx={{ fontFamily: 'arial black' }}
                                      >
                                        <Oval
                                          stroke="red"
                                          width={20}
                                          height={20}
                                        />
                                        <Box mt={-0.1} ml={0.8} mr={0}>
                                          Salvando
                                        </Box>
                                      </Box>
                                    </Button>
                                  )}
                                </Box>
                              </Box>
                            ) : (
                              <Button>
                                <Box
                                  mr={0}
                                  ml={0}
                                  mt={0.3}
                                  color="#fff"
                                  sx={{ fontFamily: 'arial black' }}
                                >
                                  CONSOLIDADO
                                </Box>
                              </Button>
                            )}
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box height="100%">
          {checkRelatorio ? (
            <Box
              height="100%"
              minWidth={300}
              width="100vw"
              mt={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                minWidth={300}
                height="100%"
                width="100vw"
                maxWidth={600}
                border="4px solid #fff"
              >
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
                    <Box width="100%" ml={1}>
                      <Box mb={1}>
                        <Grid container spacing={0}>
                          <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Paper
                                style={{ background: '#fafafa', height: 40 }}
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
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Paper
                                style={{
                                  textAlign: 'center',
                                  background: '#fafafa',
                                  height: 40,
                                }}
                              >
                                <Button
                                  onClick={handleVisitantes}
                                  startIcon={<TiUserAdd color="red" />}
                                >
                                  <Box
                                    display="flex"
                                    mt={0.8}
                                    sx={{
                                      fontSize: '12px',
                                      fontFamily: 'arial black',
                                    }}
                                  >
                                    <Box mt={-0.2}> VISITANTES: </Box>
                                    <Box
                                      color="blue"
                                      fontFamily="arial black"
                                      fontSize="16px"
                                      mt={-0.8}
                                      ml={1}
                                    >
                                      {qtyVisitante}
                                    </Box>
                                  </Box>
                                </Button>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="10%"
                    width="100%"
                    minHeight={50}
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
                          C??LULA
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
                        borderRight="2px solid #fff"
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
                          {relPresentes.length}
                        </Box>
                      </Box>

                      <Box
                        sx={{ fontSize: '16px' }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        borderLeft="2px solid #fff"
                        width="50%"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          PRESENTES
                        </Box>
                        <Box
                          fontFamily="arial black"
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {presentes}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="63.9%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={343}
                    width="100%"
                    bgcolor={corIgreja.principal}
                    borderTop="2px solid #fff"
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
                        width="95%"
                        height="100%"
                      >
                        <Box
                          height="63.7%"
                          minHeight={330}
                          bgcolor="#fafafa"
                          width="100%"
                        >
                          {tela === 1 && (
                            <TabCelula
                              nomesCelulas={relPresentes}
                              setPresentes={setPresentes}
                              setRelCelula={setRelPresentes}
                              podeEditar={podeEditar}
                            />
                          )}
                          {tela === 2 && (
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="100%"
                              flexDirection="column"
                              height="100%"
                              mt={1}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Box width="90%" ml={1}>
                                  <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={6} md={6} lg={6} xl={6}>
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100%"
                                        sx={{
                                          fontSize: '14px',
                                          fontFamily: 'arial black',
                                          borderRadius: 15,
                                          border: '1px solid #000',
                                        }}
                                      >
                                        <Box display="flex" mt={-0.2}>
                                          ADULTOS
                                          <Box
                                            mt={0.3}
                                            ml={1}
                                            mr={0}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                        </Box>
                                        <Box
                                          color="blue"
                                          fontFamily="arial black"
                                          fontSize="16px"
                                          mt={-0.2}
                                          ml={1}
                                        >
                                          {adultos}
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6} xl={6}>
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height={40}
                                        sx={{
                                          fontSize: '14px',
                                          fontFamily: 'arial black',
                                          borderRadius: 15,
                                          border: '1px solid #000',
                                        }}
                                      >
                                        <Box display="flex" mt={-0.2}>
                                          CRIAN??AS
                                          <Box
                                            mt={0.3}
                                            ml={1}
                                            mr={0}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                        </Box>
                                        <Box
                                          color="blue"
                                          fontFamily="arial black"
                                          fontSize="16px"
                                          mt={-0.2}
                                          ml={1}
                                        >
                                          {criancas}
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncConversoes();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={1}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          CONVERS??ES
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-2}
                                          display="flex"
                                          color="blue"
                                          textAlign="center"
                                          fontSize="16px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contConversoes}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecConversoes();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncEventos();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={2}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          EVENTOS
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-3}
                                          display="flex"
                                          color="blue"
                                          fontSize="20px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contEventos}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecEventos();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncVisitas();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={2}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          VISITAS
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-3}
                                          display="flex"
                                          color="blue"
                                          textAlign="center"
                                          fontSize="20px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contVisitas}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecVisitas();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Box
                                  width="100%"
                                  mt={0}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <TextareaAutosize
                                    maxRows={4}
                                    value={observacoes}
                                    aria-label="maximum height"
                                    placeholder="Observa????es"
                                    onChange={(e) => {
                                      setObservacoes(e.target.value);
                                    }}
                                    style={{
                                      display: 'flex',
                                      marginTop: 20,
                                      textAlign: 'center',
                                      width: '90%',
                                      height: 80,
                                      borderRadius: 15,
                                      border: '1px solid #000',
                                    }}
                                  />
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
                                        setCheckRelatorio(false);
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
                                    <Button
                                      onClick={() => {
                                        handleTela2();
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
                                        Pr??xima
                                      </Box>
                                    </Button>
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
                                            {carregando && (
                                              <Box>
                                                <Espera descricao="Gerando o Relat??rio" />
                                              </Box>
                                            )}
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
                                                  <Box>Atualizar</Box>
                                                </Box>
                                              </Button>
                                            ) : (
                                              <Button>
                                                <Box
                                                  display="flex"
                                                  mt={0.5}
                                                  sx={{
                                                    fontFamily: 'arial black',
                                                  }}
                                                >
                                                  <Oval
                                                    stroke="red"
                                                    width={20}
                                                    height={20}
                                                  />
                                                  <Box
                                                    mt={-0.1}
                                                    ml={0.8}
                                                    mr={0}
                                                  >
                                                    Atualizando
                                                  </Box>
                                                </Box>
                                              </Button>
                                            )}
                                          </Box>
                                        ) : (
                                          <Button>
                                            <Box
                                              color="#fff"
                                              mt={0.3}
                                              sx={{ fontFamily: 'arial black' }}
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
                                              sx={{ fontFamily: 'arial black' }}
                                            >
                                              <Box>Salvar</Box>
                                            </Box>
                                          </Button>
                                        ) : (
                                          <Button>
                                            <Box
                                              display="flex"
                                              mt={0.5}
                                              sx={{ fontFamily: 'arial black' }}
                                            >
                                              <Oval
                                                stroke="red"
                                                width={20}
                                                height={20}
                                              />
                                              <Box mt={-0.1} ml={0.8} mr={0}>
                                                Salvando
                                              </Box>
                                            </Box>
                                          </Button>
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
              <Box
                minWidth={300}
                height="100%"
                width="100vw"
                maxWidth={600}
                border="4px solid #fff"
              >
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
                          C??LULA
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
                          {relPresentes.length}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {existeRelatorio !== true ? (
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
                        <Box>RELAT??RIO DA C??LULA</Box>
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
                            <Box mt={2}>Ainda n??o foi registrado</Box>
                            <Box>nenhum relat??rio nessa semana</Box>
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
                            <Box mt={2}>Buscando Relat??rio</Box>
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
                          <Box> no bot??o FAZER RELAT??RIO</Box>
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
                                      borderRadius: 16,
                                      textAlign: 'center',
                                      background: '#faffaf',
                                      height: 40,
                                    }}
                                  >
                                    <Button
                                      onClick={() => {
                                        if (existeRelatorio !== 'inicio') {
                                          setCheckRelatorio(true);
                                          setTela(1);
                                        }
                                      }}
                                    >
                                      <Box
                                        mr={2}
                                        ml={2}
                                        mt={0.3}
                                        color="blue"
                                        sx={{ fontFamily: 'arial black' }}
                                      >
                                        {existeRelatorio === 'inicio' ? (
                                          <Box>
                                            <Oval
                                              stroke="red"
                                              width={20}
                                              height={20}
                                            />
                                          </Box>
                                        ) : (
                                          'FAZER RELAT??RIO'
                                        )}
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
                  ) : (
                    <Box height="60.9%" minHeight={320}>
                      <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={320}
                        width="100%"
                        fontFamily="arial black"
                        fontSize="16px"
                        bgcolor={corIgreja.principal}
                        borderTop="2px solid #fff"
                      >
                        <Box mt={2} fontFamily="arial" color="#fff">
                          SEMANA: {semana}
                        </Box>
                        <Box mt={2} color={corIgreja.iconeOn}>
                          RANKING ENTRE {rankGeral.length} C??LULAS
                        </Box>

                        <Box
                          mt={0}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color="blue"
                          fontFamily="arial black"
                          fontSize="16px"
                          bgcolor={corIgreja.principal}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="90%"
                            bgcolor="#e5e6b8"
                            height="100%"
                            border="2px solid orange"
                          >
                            <Box
                              sx={{ fontSize: '14px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height={80}
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={30}
                                borderBottom="2px solid orange"
                              >
                                PONTOS
                              </Box>
                              <Box
                                fontSize="20px"
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={50}
                              >
                                {pTotalAtualRank && pTotalAtualRank}
                              </Box>
                            </Box>
                            <Box
                              sx={{ fontSize: '14px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height={80}
                              borderLeft="2px solid orange"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                borderBottom="2px solid orange"
                                justifyContent="center"
                                width="100%"
                                fontFamily="arial black"
                                height={30}
                              >
                                POSI????O
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={50}
                                fontSize="20px"
                              >
                                {rank}??
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box mt={5} color={corIgreja.iconeOn}>
                          CRESCIMENTO DA C??LULA
                        </Box>

                        <Box
                          mt={0}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color="blue"
                          fontFamily="arial black"
                          fontSize="16px"
                          bgcolor={corIgreja.principal}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="90%"
                            bgcolor="#e5e6b8"
                            height="100%"
                            border="2px solid orange"
                          >
                            <Box
                              sx={{ fontSize: '14px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height={80}
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={30}
                                borderBottom="2px solid orange"
                              >
                                PERCENTUAL
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                fontSize="22px"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={50}
                              >
                                {rankCelula && rankCelula} %
                              </Box>
                            </Box>
                            <Box
                              sx={{ fontSize: '14px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height={80}
                              borderLeft="2px solid orange"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                borderBottom="2px solid orange"
                                justifyContent="center"
                                width="100%"
                                fontFamily="arial black"
                                height={30}
                              >
                                STATUS
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={50}
                              >
                                {rankCelula && rankCelula > 0 ? (
                                  <Emojis tipo="alegre" />
                                ) : (
                                  <Box>
                                    {!rankCelula ? (
                                      <Emojis tipo="igual" />
                                    ) : (
                                      <Emojis tipo="triste" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          mt={2}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color="#fff"
                          fontFamily="arial"
                          fontSize="14px"
                          bgcolor={corIgreja.principal}
                        />
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
                                  {podeEditar ? (
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: 'white',
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
                                          color="black"
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          EDITAR RELAT??RIO
                                        </Box>
                                      </Button>
                                    </Paper>
                                  ) : (
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: 'white',
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
                                          color="black"
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          VER RELAT??RIO CONSOLIDADE
                                        </Box>
                                      </Button>
                                    </Paper>
                                  )}
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
    </Box>
  );
}

export default RelCelula;
