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
import PegaData from 'src/utils/getDataQuarta';
import ConverteData2 from 'src/utils/convData2';
import FormatoData from 'src/utils/formatoData';
import TabCelula from './tabCelula';
import 'react-toastify/dist/ReactToastify.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);

function createData(Nome, Presenca, status) {
  return { Nome, Presenca, status };
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
  visitantes,
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
  const visitantesCelula = visitantes.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );

  const dataAtual2 = dataEscolhida; // new Date(timeElapsed2);
  const [inputValue, setInputValue] = React.useState(
    moment(dataEscolhida).format('DD/MM/YYYY'),
  );
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);

  const [contConversoes, setContConversoes] = React.useState(0);
  const [contEventos, setContEventos] = React.useState(0);
  const [contVisitas, setContVisitas] = React.useState(0);
  const [contVisAdultos, setContVisAdultos] = React.useState(0);
  const [contVisCriancas, setContVisCriancas] = React.useState(0);
  const [observacoes, setObservacoes] = React.useState(0);
  const [nomesVisitantes, setNomesVisitantes] = React.useState(
    visitantesCelula || [],
  );
  const [dadosCelula, setDadosCelula] = React.useState(
    dadosSem && dadosSem.id
      ? JSON.parse(dadosSem.NomesMembros)
      : nomesCelulas.map((row) => createData(row.Nome, false, row.Situacao)),
  );

  const [openErro, setOpenErro] = React.useState(false);

  // let enviarDia;
  // let enviarData;
  const [open, setIsPickerOpen] = React.useState(false);
  const [qtyVisitante, setQtyVisitante] = React.useState(0);
  const [presentes, setPresentes] = React.useState(0);
  const [membrosCelula, setMembrosCelula] = React.useState(0);
  const [membrosCelulaHj, setMembrosCelulaHj] = React.useState(0);

  const [pontosAtual, setPontosAtual] = React.useState([]);

  const [pontosAnterior, setPontosAnterior] = React.useState([]);
  const [relPresentes, setRelPresentes] = React.useState(dadosCelula);
  const [tela, setTela] = React.useState(0);
  const [carregando, setCarregando] = React.useState(false);

  const [pFinal, setPFinal] = React.useState({});
  const [pTotalAtualRank, setPTotalAtualRank] = React.useState(0);
  const [pTotalAtual, setPTotalAtual] = React.useState(0);
  const [adultos, setAdultos] = React.useState(0);
  const [planejamento, setPlanejamento] = React.useState(0);
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
  const url0 = `/api/consultaRelatorioCelulas/${semana - 1}`;
  const { data: celulaPassada, error: errorCelulaPassada } = useSWR(
    url0,
    fetcher,
  );
  const url = `/api/consultaRelatorioCelulas/${semana}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  const url2 = `/api/consultaPontuacao/${perfilUser.Distrito}/${perfilUser.Celula}`;
  const { data: pontos, error: errorPontos } = useSWR(url2, fetcher);

  const ajusteRelatorio = () => {
    if (contagem) {
      const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
      setTela(1);
      setCarregando(false);
      setPresentes(qtyPres.length);
      setQtyVisitante(0);
      setContConversoes(0);
      setContVisitas(0);
      setContEventos(0);
      setRelPresentes(dadosCelula);
      setObservacoes('');

      setPodeEditar(true);
      if (members) setExisteRelatorio('sem');
      else setExisteRelatorio('inicio');
      // if (members) setExisteRelatorio('sem');
      // else setExisteRelatorio('inicio');

      if (members && members.length > 0) {
        const relatorio = members.filter(
          (val) =>
            val.Celula === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito) &&
            String(val.Data.slice(0, 4)) === String(AnoAtual),
        );

        if (relatorio && relatorio.length) {
          const dataAgora = new Date();

          /*  if (semanaAgora - semana < 9) setPodeEditar(true);
          else setPodeEditar(false); */
          const date1 = moment(dataAgora);
          const date2 = moment(selectedDate);
          const diff = date2.diff(date1, 'seconds') + 3600;

          if (diff > -92948 * 15) {
            setPodeEditar(true);
          }
          // 7 dia =-650637
          else setPodeEditar(false);
          setExisteRelatorio(true); // avisa que tem relatório
          // setCheckRelatorio(true); // avisa que tem relatório nessa data

          const nomesMembros = JSON.parse(relatorio[0].NomesMembros);
          const semNovos = nomesMembros.filter((val) => val.status !== 'NOVO');
          setMembrosCelulaHj(semNovos.length);
          let qtyVisCriancas = 0;
          let qtyVisitants = 0;

          if (relatorio[0].Visitantes) {
            qtyVisitants = Number(relatorio[0].Visitantes);
          }
          if (relatorio[0].NomesVisitantes) {
            if (Number.isInteger(Number(relatorio[0].NomesVisitantes))) {
              qtyVisCriancas = Number(relatorio[0].NomesVisitantes);
            }
          }

          setContVisAdultos(qtyVisitants);
          setContVisCriancas(qtyVisCriancas);
          const qtyPresentes = nomesMembros.filter(
            (val) => val.Presenca === true,
          );

          setPresentes(qtyPresentes.length);
          setQtyVisitante(Number(qtyVisitants) + Number(qtyVisCriancas));
          setContConversoes(relatorio[0].Conversoes);
          setContVisitas(relatorio[0].Visitas);
          setContEventos(relatorio[0].PresentesEventos);
          setRelPresentes(nomesMembros);
          setObservacoes(relatorio[0].Observacoes);

          setStartShow(!startShow);

          setContagem(false);
        } else {
          //  const nomesMembros = JSON.parse(relatorio[0].NomesMembros);
          const semNovos = dadosCelula.filter((val) => val.status !== 'NOVO');
          setMembrosCelulaHj(semNovos.length);
          setRelPresentes(
            dadosCelula.sort((a, b) => {
              if (a.Nome > b.Nome) return 1;
              if (b.Nome > a.Nome) return -1;
              return 0;
            }),
          );
          setContagem(false);
          setQtyVisitante(Number(contVisAdultos) + Number(contVisCriancas));
          setExisteRelatorio('sem');
          setStartShow(!startShow);
        }
      } else {
        setQtyVisitante(Number(contVisAdultos) + Number(contVisCriancas));
        setContagem(false);
        setStartShow(!startShow);
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
      setQtyVisitante(0);
      setContConversoes(0);
      setContVisitas(0);
      setContEventos(0);
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
          const semNovos = nomesMembros.filter((val) => val.status !== 'NOVO');
          setMembrosCelulaHj(semNovos.length);
          let qtyVisCriancas = 0;
          let qtyVisitants = 0;

          if (relatorio[0].Visitantes) {
            qtyVisitants = Number(relatorio[0].Visitantes);
          }
          if (relatorio[0].NomesVisitantes) {
            if (Number.isInteger(Number(relatorio[0].NomesVisitantes))) {
              qtyVisCriancas = Number(relatorio[0].NomesVisitantes);
            }
          }

          setContVisAdultos(qtyVisitants);
          setContVisCriancas(qtyVisCriancas);
          const qtyPresentes = nomesMembros.filter(
            (val) => val.Presenca === true,
          );

          setPresentes(qtyPresentes.length);
          setQtyVisitante(Number(qtyVisitants) + Number(qtyVisCriancas));
          setContConversoes(relatorio[0].Conversoes);
          setContVisitas(relatorio[0].Visitas);
          setContEventos(relatorio[0].PresentesEventos);
          setRelPresentes(nomesMembros);
          setObservacoes(relatorio[0].Observacoes);

          setStartShow(!startShow);
          setTela(1);
          setCheckInicio('não');
        } else {
          setQtyVisitante(Number(contVisAdultos) + Number(contVisCriancas));
          setExisteRelatorio('sem');
          setStartShow(!startShow);
        }
      } else {
        setQtyVisitante(Number(contVisAdultos) + Number(contVisCriancas));
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
    if (celulaPassada) {
      const relatorio = celulaPassada.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          String(val.Data.slice(0, 4)) === String(AnoAtual),
      );

      if (relatorio && relatorio.length) {
        const nomesMembros = JSON.parse(relatorio[0].NomesMembros);
        const semNovos = nomesMembros.filter((val) => val.status !== 'NOVO');

        setMembrosCelula(semNovos.length);
      }
    }
    if (errorCelulaPassada) return <div>An error occured.</div>;
    if (!celulaPassada) return <div>Loading ...</div>;

    return 0;
  }, [celulaPassada]);

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
    const anoI = selectedDate.getFullYear();

    api
      .post('/api/consultaCelulaParaPlanejamento', {
        semana: semanaExata(selectedDate),
        anoI,
        Celula: Number(perfilUser.Celula),
        Distrito: Number(perfilUser.Distrito),
      })
      .then((response) => {
        if (response) {
          if (response.data.length) {
            setPlanejamento(response.data.length * 10);
          } else setPlanejamento(0);
          return 0;
        }
        return 0;
      })
      .catch((erro) => {
        console.log(erro); //  updateFile(uploadedFile.id, { error: true });
        return 0;
      });
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

  //= =========================================

  //= ============================================================

  const pegarPontuacao = () => {
    if (errorPontos) return <div>An error occured.</div>;
    if (!pontos) return <div>Loading ...</div>;
    if (pontos) {
      const pontosSemanaAtual = pontos.filter(
        (val) => Number(val.Semana) === Number(semanaEnviada),
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

    const pontosPresentes = presentes;
    const pontosVisitantesCelula = qtyVisitante;
    const pontosEventos = contEventos;
    let pontosNovoMembro = 0;
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
    let pontosPontualidade = 0;
    if (membrosCelula > 0 && membrosCelulaHj > 0) {
      //      if (membrosCelula > membrosCelulaHj) pontosNovoMembro = -5; // SE PERDERU PERDE 5 PONTOS
      if (membrosCelula < membrosCelulaHj) pontosNovoMembro = 10; // SE PERDERU PERDE 5 PONTOS
    }

    if (pontosAtual.length) {
      pontuacaoAtual = JSON.parse(pontosAtual[0].Pontuacao);

      if (pontuacaoAtual !== '') {
        pontosPontualidade = pontuacaoAtual.Pontualidade;
        if (Number(pontuacaoAtual.Pontualidade) === 0)
          if (
            semanaPontuacao === semana &&
            Number(pontuacaoAtual.RelCelebracao) === 1 &&
            Number(pontuacaoAtual.RelDiscipulado) === 1
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

    // toal rank conta os eventos mas o total não pois nem sempre tem eventos e pode
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
  }, [
    semana,
    presentes,
    qtyVisitante,
    contConversoes,
    contEventos,
    contVisitas,
    pontos,
  ]);

  React.useEffect(() => {
    pegarPontuacao();

    // criarPontuacao();

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

    const criadoEm = new Date();
    const nomesCelulaParcial = relPresentes.map((row, index) =>
      createRelCelula(
        row.RolMembro,
        row.Nome,
        relPresentes[index] ? relPresentes[index].Presenca : false,
      ),
    );
    const nomesCelulaFinal = JSON.stringify(nomesCelulaParcial);
    const novaData = new Date(ConverteData(inputValue));
    const RelCelulaFinal = createEstatistico(
      Number(perfilUser.Celula),
      Number(perfilUser.Distrito),
      Number(semanaEnviada),
      novaData,
      nomesCelulaFinal,
      String(contVisCriancas),
      Number(adultos),
      Number(criancas),
      Number(contVisAdultos),
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
        setCarregando(false);
        // console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
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

  const handleIncVisAdultos = () => {
    let contAtual = contVisAdultos;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContVisAdultos(contAtual);
    setQtyVisitante(contAtual + contVisCriancas);
  };
  const handleDecVisAdultos = () => {
    let contAtual = contVisAdultos;
    if (podeEditar) contAtual -= 1;
    if (contAtual < 0) contAtual = 0;
    setContVisAdultos(contAtual);
    setQtyVisitante(contAtual + contVisCriancas);
  };

  const handleIncVisCriancas = () => {
    let contAtual = contVisCriancas;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContVisCriancas(contAtual);
    setQtyVisitante(contAtual + contVisAdultos);
  };
  const handleDecVisCriancas = () => {
    let contAtual = contVisCriancas;
    if (podeEditar) contAtual -= 1;
    if (contAtual < 0) contAtual = 0;
    setContVisCriancas(contAtual);
    setQtyVisitante(contAtual + contVisAdultos);
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
            RELATÓRIO DA CÉLULA - {perfilUser.Celula}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            width="100%"
          >
            <Paper style={{ background: '#fafafa', height: 40, width: '90%' }}>
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
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Paper>
          </Box>
          <Box mt={2} mb={-2} width="100%" display="flex" height={10}>
            <Box
              ml={0}
              width="50%"
              height="100%"
              display="flex"
              alignItems="end"
              justifyContent="center"
              color="white"
              fontFamily="Fugaz one"
            >
              VISITANTES ADULTOS
            </Box>
            <Box
              ml={0}
              width="50%"
              height="100%"
              display="flex"
              alignItems="end"
              justifyContent="center"
              color="white"
              fontFamily="Fugaz one"
            >
              VISITANTES CRIANÇAS
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            width="100%"
            mb={2}
          >
            <Paper
              style={{
                marginTop: 20,
                width: '40%',
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
                  width="20%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => {
                    handleIncVisAdultos();
                  }}
                >
                  <IoIosAddCircle color="green" size={30} />
                </Box>
                <Box
                  width="60%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ fontFamily: 'arial black' }}
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <Box
                      mt={0.5}
                      display="flex"
                      color="blue"
                      fontSize="16px"
                      fontFamily="arial black "
                    >
                      {contVisAdultos}
                    </Box>
                  </Box>
                </Box>
                <Box
                  width="20%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => {
                    handleDecVisAdultos();
                  }}
                >
                  <IoMdRemoveCircle color="red" size={30} />
                </Box>
              </Box>
            </Paper>
            <Box width="10%" />
            <Paper
              style={{
                marginTop: 20,
                width: '40%',
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
                  width="20%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => {
                    handleIncVisCriancas();
                  }}
                >
                  <IoIosAddCircle color="green" size={30} />
                </Box>
                <Box
                  width="60%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ fontFamily: 'arial black' }}
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <Box
                      mt={0.5}
                      display="flex"
                      color="blue"
                      fontSize="16px"
                      fontFamily="arial black "
                    >
                      {contVisCriancas}
                    </Box>
                  </Box>
                </Box>
                <Box
                  width="20%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => {
                    handleDecVisCriancas();
                  }}
                >
                  <IoMdRemoveCircle color="red" size={30} />
                </Box>
              </Box>
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
            height="56%"
            width="100%"
          >
            <Box display="flex" alignItems="end" height="100%" width="96%">
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
                  <Box display="flex" justifyContent="center" width="100%">
                    <Box width="90%" ml={1}>
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={40}
                            bgcolor="#fafafa"
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
                            bgcolor="#fafafa"
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
                              ml={1}
                              width="60%"
                              mt={0.5}
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              CONVERSÕES
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
                  <Box display="flex" justifyContent="center" width="100%">
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
                          <Box width="100%" display="flex" textAlign="center">
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
                    mt={2}
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
                          <Box width="100%" display="flex" textAlign="center">
                            <Box ml={2} width="60%">
                              <Box
                                width="100%"
                                mt={0}
                                display="flex"
                                justifyContent="center"
                                fontSize="12px"
                              >
                                VISITAS DO
                              </Box>
                              <Box
                                width="100%"
                                mt={0}
                                display="flex"
                                justifyContent="center"
                                fontSize="12px"
                              >
                                LIDER
                              </Box>
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
            mb={2}
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
