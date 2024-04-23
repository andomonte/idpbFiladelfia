import { Box, Grid, Paper, Button } from '@material-ui/core';
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
import moment from 'moment';

import { IoIosSave, IoIosAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import api from 'src/components/services/api';
import axios from 'axios';
import PegaIdade from 'src/utils/getIdade';
import { Oval } from 'react-loading-icons';
import Espera from 'src/utils/espera';
import ConverteData from 'src/utils/dataMMDDAAAA';
import FormatoData from 'src/utils/formatoData';
import ConverteData2 from 'src/utils/convData2';
import PegaData from 'src/utils/getDataQuarta';

import TabDiscipulado from './tabDiscipulado';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function createData(Rol, Nome, Presenca, status) {
  return { Rol, Nome, Presenca, status };
}
function createRelCelula(Rol, Nome, Presenca, Status) {
  return {
    Rol,
    Nome,
    Presenca,
    Status,
  };
}

function createEstatistico(
  Celula,
  Distrito,
  Semana,
  Data,
  NomesMembros,
  LeituraBiblica,
  Observacoes,
  CriadoPor,
  CriadoEm,
  Adultos,
  Criancas,
) {
  return {
    Celula,
    Distrito,
    Semana,
    Data,
    NomesMembros,
    LeituraBiblica,
    Observacoes,
    CriadoPor,
    CriadoEm,
    Adultos,
    Criancas,
  };
}

function createPontuacao(
  RelCelulaFeito, // indeca que houve célula
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
  Eventos, // participação nos eventos vale 1 ponto por membro
  LeituraBiblica, // vale 2 pontos cada membro
  VisitantesCelebracao,
  percPresentes,
  percCelebracaoIgreja,
  percCelebracaoLive,
  percDiscipulado,
  percLeituraBiblica,
  qytMembros,
  planejamento,
) {
  return {
    RelCelulaFeito, // indeca que houve célula
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
    Eventos, // participação nos eventos vale 1 ponto por membro
    LeituraBiblica, // vale 2 pontos cada membro
    VisitantesCelebracao,
    percPresentes,
    percCelebracaoIgreja,
    percCelebracaoLive,
    percDiscipulado,
    percLeituraBiblica,
    qytMembros,
    planejamento,
  };
}

function RelCelula({
  rolMembros,
  perfilUser,
  semanaEnviada,
  anoEnviado,
  dadosSem,
  setOpenPlan,
  dataEnviada,
}) {
  //  const classes = useStyles();
  // const router = useRouter();

  const nomesCelulas = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );

  const dataEscolhida2 = PegaData(semanaEnviada, anoEnviado);
  const dataFinal =
    dataEnviada !== '-' ? FormatoData(dataEnviada) : dataEscolhida2;

  const [dataEscolhida, setDataEscolhida] = React.useState(dataFinal);
  const [contagem, setContagem] = React.useState(false);
  const [checkInicio, setCheckInicio] = React.useState('sim');
  // const timeElapsed2 = Date.now();

  const dataAtual2 = dataEscolhida; // new Date(timeElapsed2);
  const [inputValue, setInputValue] = React.useState(
    moment(dataEscolhida).format('DD/MM/YYYY'),
  );
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);

  const [contBiblia, setContBiblia] = React.useState(0);
  const [observacoes, setObservacoes] = React.useState(0);

  const [dadosCelula, setDadosCelula] = React.useState(
    dadosSem && dadosSem.id
      ? JSON.parse(dadosSem.NomesMembros)
      : nomesCelulas.map((row) =>
          createData(row.RolMembro, row.Nome, false, row.Situacao),
        ),
  );

  const [openErro, setOpenErro] = React.useState(false);

  // let enviarDia;
  // let enviarData;
  const [open, setIsPickerOpen] = React.useState(false);
  const [presentes, setPresentes] = React.useState(0);
  const [pontosAtual, setPontosAtual] = React.useState([]);

  const [relPresentes, setRelPresentes] = React.useState(dadosCelula);
  const [tela, setTela] = React.useState(0);
  const [carregando, setCarregando] = React.useState(false);

  const [pFinal, setPFinal] = React.useState({});
  const [pTotalAtualRank, setPTotalAtualRank] = React.useState(0);
  const [pTotalAtual, setPTotalAtual] = React.useState(0);

  const [adultos, setAdultos] = React.useState(0);
  const [criancas, setCriancas] = React.useState(0);

  const [AnoAtual, setAnoAtual] = React.useState(anoEnviado);
  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
    setDataEscolhida(date);
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
  const semanaExata = (dataEnviada2) => {
    const Ano = dataEnviada2.getFullYear();

    const Mes = dataEnviada2.getMonth();
    const Dia = dataEnviada2.getDate();
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

  React.useEffect(() => {
    if (semanaEnviada) {
      setSemana(semanaEnviada);
    }
  }, []);

  const handleIncConversoes = () => {
    let contAtual = contBiblia;
    if (podeEditar) contAtual += 1;

    if (contAtual > 999) contAtual = 0;
    setContBiblia(contAtual);
  };
  const handleDecConversoes = () => {
    let contAtual = contBiblia;
    if (podeEditar) contAtual -= 1;

    if (contAtual < 0) contAtual = 0;
    setContBiblia(contAtual);
  };

  const url = `/api/consultaRelatorioDiscipulado/${semana}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  const url2 = `/api/consultaPontuacao/${perfilUser.Distrito}/${perfilUser.Celula}`;
  const { data: pontos, error: errorPontos } = useSWR(url2, fetcher);

  const ajusteRelatorio = () => {
    if (contagem) {
      const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
      setTela(1);
      setCarregando(false);
      setPresentes(qtyPres.length);

      setContBiblia(0);
      setRelPresentes(dadosCelula);
      setObservacoes('');

      setPodeEditar(true);
      let relExiste = 'inicio';
      if (members) relExiste = 'sem'; // setExisteRelatorio('sem');

      setExisteRelatorio(relExiste);
      if (members && members.length > 0) {
        const relatorio = members.filter(
          (val) =>
            val.Celula === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito) &&
            String(val.Data.slice(0, 4)) === String(AnoAtual),
        );

        if (relatorio && relatorio.length) {
          const dataAgora = new Date();
          const date1 = moment(dataAgora);
          const date2 = moment(selectedDate);
          const diff = date2.diff(date1, 'seconds') + 3600;

          if (diff > -92948 * 15) {
            setPodeEditar(true);
          }
          // 7 dia =-650637
          else {
            setPodeEditar(false);
          }
          setExisteRelatorio(true); // avisa que tem relatório
          // setCheckRelatorio(true); // avisa que tem relatório nessa data

          const nomesMembros = JSON.parse(relatorio[0].NomesMembros);

          const qtyPresentes = nomesMembros.filter(
            (val) => val.Presenca === true,
          );

          setPresentes(qtyPresentes.length);

          setContBiblia(relatorio[0].LeituraBiblica);

          setRelPresentes(nomesMembros);

          setObservacoes(relatorio[0].Observacoes);
          setStartShow(!startShow);
          setContagem(false);
        } else {
          setExisteRelatorio('sem'); // avisa que tem relatório
          setStartShow(!startShow);
          setContagem(false);
        }
      } else {
        //
        setStartShow(!startShow);
        setContagem(false);
      }
      if (errorMembers) return <div>An error occured.</div>;
      if (!members) return <div>Loading ...</div>;
    }
    return 0;
  };

  const ajusteRelatorio2 = () => {
    if (dadosCelula) {
      const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
      setTela(1);
      setCarregando(false);
      setPresentes(qtyPres.length);
      setContBiblia(0);
      setRelPresentes(dadosCelula);
      setObservacoes('');

      setPodeEditar(true);
      if (!dadosSem) setExisteRelatorio('sem');
      else setExisteRelatorio('inicio');
      // if (members) setExisteRelatorio('sem');
      // else setExisteRelatorio('inicio');

      if (dadosSem && dadosSem.id) {
        const relatorio = [];
        relatorio[0] = dadosSem;

        if (relatorio && relatorio.length) {
          const dataAgora = new Date();

          const date1 = moment(dataAgora);
          const date2 = moment(selectedDate);
          const diff = date2.diff(date1, 'seconds') + 3600;

          if (diff > -92948 * 15) {
            setPodeEditar(true);
          }
          // 7 dia =-650637
          else {
            setPodeEditar(false);
          }

          setExisteRelatorio(true); // avisa que tem relatório
          // setCheckRelatorio(true); // avisa que tem relatório nessa data

          const nomesMembros = JSON.parse(relatorio[0].NomesMembros);

          const qtyPresentes = nomesMembros.filter(
            (val) => val.Presenca === true,
          );

          setPresentes(qtyPresentes.length);

          setContBiblia(relatorio[0].LeituraBiblica);
          setRelPresentes(nomesMembros);
          setObservacoes(relatorio[0].Observacoes);

          setStartShow(!startShow);
          setTela(1);
          setCheckInicio('não');
        } else {
          setExisteRelatorio('sem');
          setStartShow(!startShow);
        }
      } else {
        setStartShow(!startShow);
      }
    } else setContagem(true);
    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    return 0;
  };

  React.useEffect(() => {
    if (dadosSem && dadosSem.id) ajusteRelatorio2();
    else {
      setContagem(true);
    }
    return 0;
  }, [dadosSem]);

  React.useEffect(() => {
    mutate(url);
    return 0;
  }, [existeRelatorio]);

  React.useEffect(() => {
    //  contEffect += 1;
    mutate(url);
    //  setExisteRelatorio('inicio');
    if (selectedDate && checkInicio !== 'sim') {
      setContagem(true);
      const checkAno = selectedDate.getFullYear();

      setAnoAtual(checkAno);
      // selectedDate.setTime(selectedDate.getTime() + 1000 * 60);
      if (checkAno > 2020) {
        setSemana(semanaExata(selectedDate));
      }
    }
  }, [selectedDate]);

  React.useEffect(() => {
    if (checkInicio === 'sim')
      setRelPresentes(
        dadosCelula.sort((a, b) => {
          if (a.Nome > b.Nome) return 1;
          if (b.Nome > a.Nome) return -1;
          return 0;
        }),
      );
    const newValorMembros = [];
    let contMembros = 0;
    if (dadosCelula.length && !dadosCelula[0].status) {
      dadosCelula.map((val) => {
        nomesCelulas.map((row) => {
          if (val.Nome === row.Nome) {
            newValorMembros[contMembros] = createData(
              val.Nome,
              val.Presenca,
              row.Situacao,
            );
            contMembros += 1;
          }
          return 0;
        });

        return 0;
      });

      if (newValorMembros.length) setDadosCelula(newValorMembros);
    }
  }, [dadosCelula]);

  React.useEffect(() => {
    if (contagem) {
      ajusteRelatorio();
    }
  }, [contagem, members]);

  //= ========================calcular adulto e crianca========================

  const handleTela2 = () => {
    if (nomesCelulas && nomesCelulas.length > 0) {
      const listaPresentes = nomesCelulas.filter(
        (val, index) =>
          val.Nome &&
          relPresentes[index] &&
          relPresentes[index].Presenca === true,
      );

      const idade = [];
      let contAdultos = 0;
      let contCriancas = 0;
      for (let i = 0; i < listaPresentes.length; i += 1) {
        idade[i] = listaPresentes[i].Nascimento
          ? PegaIdade(ConverteData2(listaPresentes[i].Nascimento))
          : '';
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

  const pegarPontuacao = () => {
    if (errorPontos) return <div>An error occured.</div>;
    if (!pontos) return <div>Loading ...</div>;
    if (pontos) {
      const pontosSemanaAtual = pontos.filter(
        (val) => Number(val.Semana) === Number(semanaEnviada),
      );

      setPontosAtual(pontosSemanaAtual);
    }

    return 0;
  };

  const criarPontuacao = () => {
    const criadoEm = new Date();
    // const dataRel = getDataPontos(selectedDate);
    const semanaPontuacao = semanaExata(criadoEm);
    let pontuacaoAtual = [];
    let pontosRelatorio = 0;
    let pontosPontualidade = 0;
    let pontosPresentes = 0;
    let pontosVisitantesCelula = 0;
    let pontosEventos = 0;
    let pontosNovoMembro = 0;
    let pontosVisitas = 0;
    let pontosRelCelula = 0;
    let pontosRelCelebracao = 0;
    let pontosCelebracaoIgreja = 0;
    let pontosCelebracaoLive = 0;
    let pontosVisitantesCelebracao = 0;
    let planejamento = 0;
    const pontosRelDiscipulado = 1;
    const pontosDiscipulado = presentes;
    const pontosLeituraBiblia = contBiblia;

    let pontosTotalAtual = 0;

    let pontosTotalAtualRank = 0;

    if (pontosAtual.length) {
      pontuacaoAtual = JSON.parse(pontosAtual[0].Pontuacao);

      if (pontuacaoAtual !== '') {
        if (
          semanaPontuacao === semanaEnviada &&
          pontuacaoAtual.RelCelulaFeito === 1 &&
          pontuacaoAtual.RelCelebracao === 1
        )
          pontosPontualidade = 1;
      }
      if (
        pontuacaoAtual.RelCelulaFeito === 1 &&
        pontuacaoAtual.RelCelebracao === 1
      )
        pontosRelatorio = 1;
      if (pontuacaoAtual.RelCelulaFeito === 1) {
        pontosRelCelula = pontuacaoAtual.RelCelulaFeito;
        pontosPresentes = pontuacaoAtual.PresentesCelula;
        pontosEventos = pontuacaoAtual.Eventos;
        pontosNovoMembro = pontuacaoAtual.NovoMembro;
        pontosVisitas = pontuacaoAtual.Visitas;
        pontosVisitantesCelula = pontuacaoAtual.VisitantesCelula;
        planejamento = pontuacaoAtual.planejamento;
        //        pontosCelebracaoIgreja = pontuacaoAtual.CelebracaoIgreja;
        //        pontosCelebracaoLive = pontuacaoAtual.CelebracaoLive;
      }
      if (pontuacaoAtual.RelCelebracao === 1) {
        pontosRelCelebracao = pontuacaoAtual.RelCelebracao;
        pontosCelebracaoIgreja = pontuacaoAtual.CelebracaoIgreja;
        pontosCelebracaoLive = pontuacaoAtual.CelebracaoLive;
        pontosVisitantesCelebracao = pontuacaoAtual.VisitantesCelebracao;
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
    // toal rank conta os eventos mas o total não coloquei nem sempre tem eventos e pode
    // causar erros no percentual de crescimento.
    if (pontosTotalAtual === 0)
      pontosTotalAtual = Number(
        pontosRelCelula +
          Number(pontosRelatorio) +
          Number(percPresentes) +
          Number(pontosPontualidade) +
          pontosVisitantesCelula +
          pontosVisitas +
          pontosRelCelebracao +
          Number(percCelebracaoIgreja) +
          Number(percCelebracaoLive) +
          pontosVisitantesCelebracao +
          pontosRelDiscipulado +
          Number(pontosNovoMembro) +
          Number(percDiscipulado) +
          Number(percLeituraBiblica) +
          Number(planejamento),
      ).toFixed(2);

    if (pontosTotalAtualRank === 0)
      pontosTotalAtualRank = Number(
        pontosRelCelula +
          Number(pontosRelatorio) +
          Number(percPresentes) +
          Number(pontosPontualidade) +
          pontosVisitantesCelula +
          pontosVisitas +
          pontosEventos +
          pontosRelCelebracao +
          Number(percCelebracaoIgreja) +
          Number(percCelebracaoLive) +
          Number(pontosNovoMembro) +
          pontosVisitantesCelebracao +
          pontosRelDiscipulado +
          Number(percDiscipulado) +
          Number(percLeituraBiblica) +
          Number(planejamento),
      ).toFixed(2);

    const TotalPercentual = pontosTotalAtual;

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
      Number(percPresentes),
      Number(percCelebracaoIgreja),
      Number(percCelebracaoLive),
      Number(percDiscipulado),
      Number(percLeituraBiblica),
      Number(relPresentes.length),
      Number(planejamento),
    );

    setPFinal(PontuacaoFinal);
    setPTotalAtual(TotalPercentual);
    setPTotalAtualRank(pontosTotalAtualRank);
  };
  React.useEffect(() => {
    pegarPontuacao();

    return 0;
  }, [existeRelatorio]);

  React.useEffect(() => {
    criarPontuacao();
    return 0;
  }, [pontosAtual]); // atualiza a pontuação

  React.useEffect(() => {
    pegarPontuacao();

    return 0;
  }, [semana, presentes, contBiblia, pontos]);

  React.useEffect(() => {
    pegarPontuacao();

    // criarPontuacao();

    return 0;
  }, [semana, presentes, contBiblia, pontos]);

  const enviarPontuacao = () => {
    const CriadoEm = new Date();
    criarPontuacao();
    api
      .post('/api/criarPontuacao', {
        Semana: semanaEnviada,
        Celula: Number(perfilUser.Celula),
        Distrito: Number(perfilUser.Distrito),
        Supervisao: Number(perfilUser.Supervisao),
        Ano: Number(AnoAtual),
        Pontuacao: JSON.stringify(pFinal),
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
*/ setOpenPlan(false);
          mutate(url);
          mutate(url2);

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
      createRelCelula(
        row.Rol,
        row.Nome,
        relPresentes[index] ? relPresentes[index].Presenca : false,
        row.status,
      ),
    );
    const nomesCelulaFinal = JSON.stringify(nomesCelulaParcial);
    const novaData = new Date(ConverteData(inputValue));
    const RelDiscipuladoFinal = createEstatistico(
      Number(perfilUser.Celula),
      Number(perfilUser.Distrito),
      Number(semanaEnviada),
      novaData,
      nomesCelulaFinal,
      Number(contBiblia),
      String(observacoes),
      perfilUser.Nome,
      criadoEm,
      Number(adultos),
      Number(criancas),
    );

    // const nomesMembros = JSON.parse(RelDiscipuladoFinal.NomesMembros);

    api
      .post('/api/criarRelDiscipulado', {
        relatorio: RelDiscipuladoFinal,
      })
      .then((response) => {
        if (response) {
          enviarPontuacao();
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenErro(true);
        setCarregando(false);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh)"
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
        <Box height="100%" width="100%">
          <Box
            display="flex"
            alignItems="end"
            justifyContent="center"
            height="5%"
            width="100%"
            fontSize="18px"
            fontFamily="Fugaz One"
            color="white"
          >
            RELATÓRIO DE DISCIPULADO
          </Box>
          <Box
            display="flex"
            alignItems="end"
            justifyContent="center"
            height="5%"
            width="100%"
            fontSize="18px"
            fontFamily="Fugaz One"
            color="white"
          >
            CÉLULA - {perfilUser.Celula}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="10%"
            width="100%"
          >
            <Paper style={{ background: '#fafafa', height: 40, width: '65%' }}>
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
                      marginLeft: 1,
                      marginRight: 1,
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

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            borderTop="2px solid #fff"
            borderBottom="2px solid #fff"
            width="100%"
          >
            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                color: '#fff',
                fontFamily: 'Fugaz One',
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
                      DISCIPULADOS
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
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="60%"
            width="100%"
          >
            <Box display="flex" alignItems="end" height="100%" width="96%">
              {tela === 1 && (
                <TabDiscipulado
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
                  <Box display="flex" justifyContent="center" width="100%">
                    <Box width="90%" ml={1}>
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={40}
                            bgcolor="white"
                            sx={{
                              fontSize: '14px',
                              fontFamily: 'arial black',
                              borderRadius: 15,
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
                            bgcolor="white"
                            sx={{
                              fontSize: '14px',
                              fontFamily: 'arial black',
                              borderRadius: 15,
                            }}
                          >
                            <Box display="flex" mt={-0.2}>
                              CRIANÇAS
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
                    mt={2}
                    mb={2}
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
                          <Box width="100%" display="flex" textAlign="center">
                            <Box
                              ml={2}
                              width="70%"
                              mt={0.5}
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              LEITURA BÍBLICA
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
                                {contBiblia}
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

                  <Box display="flex" justifyContent="center" width="100%">
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
                        placeholder="Observações"
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
                          resize: 'vertical',
                          overflow: 'auto',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="12%"
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Box width="90%">
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
                            style={{ width: '100%' }}
                            onClick={() => {
                              setOpenPlan(false);
                            }}
                            startIcon={<IoArrowUndoSharp color="blue" />}
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
                            style={{ width: '100%' }}
                            onClick={() => {
                              handleTela2();
                            }}
                            endIcon={<IoArrowRedoSharp color="blue" />}
                          >
                            <Box
                              mr={2}
                              ml={2}
                              mt={0.3}
                              sx={{ fontFamily: 'arial black' }}
                            >
                              Próxima
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
                            style={{ width: '100%' }}
                            onClick={() => {
                              setTela(1);
                            }}
                            startIcon={<IoArrowUndoSharp color="blue" />}
                          >
                            <Box mt={0.3} sx={{ fontFamily: 'arial black' }}>
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
                            background: podeEditar ? '#ffffaa' : 'gray',
                            height: 40,
                          }}
                        >
                          {!podeEditar ? (
                            <Box>
                              {podeEditar ? (
                                <Box>
                                  {carregando && (
                                    <Box>
                                      <Espera descricao="Gerando o Relatório" />
                                    </Box>
                                  )}
                                  {!carregando ? (
                                    <Button
                                      style={{ width: '100%' }}
                                      onClick={handleSalvar}
                                      startIcon={<IoIosSave color="blue" />}
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
                                    <Button style={{ width: '100%' }}>
                                      <Box
                                        display="flex"
                                        mt={0.5}
                                        sx={{
                                          fontFamily: 'arial black',
                                        }}
                                      >
                                        <Oval
                                          stroke="green"
                                          width={20}
                                          height={20}
                                        />
                                        <Box mt={-0.1} ml={0.8} mr={0}>
                                          Atualizando
                                        </Box>
                                      </Box>
                                    </Button>
                                  )}
                                </Box>
                              ) : (
                                <Button style={{ width: '100%' }}>
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
                                  style={{ width: '100%' }}
                                  onClick={handleSalvar}
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
                                <Button style={{ width: '100%' }}>
                                  <Box
                                    display="flex"
                                    mt={0.5}
                                    sx={{ fontFamily: 'arial black' }}
                                  >
                                    <Oval
                                      stroke="green"
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

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
      {contagem && <Espera descricao="Buscando o Relatório" />}
    </Box>
  );
}

export default RelCelula;
