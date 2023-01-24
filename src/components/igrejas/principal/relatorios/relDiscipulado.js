import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import useSWR, { mutate } from 'swr';
import ConverteData from 'src/utils/dataMMDDAAAA';
// import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';

import { IoIosSave, IoIosAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import api from 'src/components/services/api';
import axios from 'axios';
import PegaIdade from 'src/utils/getIdade';
import { Oval } from 'react-loading-icons';
import Espera from 'src/utils/espera';
import Erros from 'src/utils/erros';
import Emojis from 'src/components/icones/emojis';
import TabDiscipulado from './abas/tabDiscipulado';

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
  };
}

function RelatorioCelebracao({ rolMembros, perfilUser }) {
  //  const classes = useStyles();
  // const router = useRouter();
  const [openErro, setOpenErro] = React.useState(false);
  const [progress, setProgress] = React.useState(5);
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [contBiblia, setContBiblia] = React.useState(0);

  const [observacoes, setObservacoes] = React.useState(0);

  const nomesCelulas = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const dadosCelula = nomesCelulas.map((row) => createData(row.Nome, false));
  const [checkRelatorio, setCheckRelatorio] = React.useState(false);

  // let enviarDia;
  // let enviarData;
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);

  const [presentes, setPresentes] = React.useState(0);
  const [rankCelula, setRankCelula] = React.useState([]);
  const [rankGeral, setRankGeral] = React.useState(0);
  const [pontosAtual, setPontosAtual] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [relPresentes, setRelPresentes] = React.useState(dadosCelula);
  const [tela, setTela] = React.useState(0);
  const [carregando, setCarregando] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [pFinal, setPFinal] = React.useState({});
  const [pTotalAtualRank, setPTotalAtualRank] = React.useState(0);
  const [pTotalAtual, setPTotalAtual] = React.useState(0);

  const [adultos, setAdultos] = React.useState(0);
  const [criancas, setCriancas] = React.useState(0);

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

  React.useEffect(() => {
    const timeElapsed = Date.now();
    const dataAtual = new Date(timeElapsed);

    if (dataAtual) {
      setSemana(semanaExata(dataAtual));
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
  const url3 = `/api/consultaPontuacaoSemana/${semana}`;
  const { data: PontosSemana, error: errorPontosSemana } = useSWR(
    url3,
    fetcher,
  );

  const ajusteRelatorio = () => {
    if (tela === 0) {
      const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
      // const qtyVis = visitantes.filter((val) => val.Presenca === true);
      setTela(0);
      setCarregando(false);
      setPresentes(qtyPres.length);

      setContBiblia(0);
      setRelPresentes(dadosCelula);
      setObservacoes('');
      setCheckRelatorio(false);
      setPodeEditar(true);
      let relExiste = 'inicio';
      if (members) relExiste = 'sem'; // setExisteRelatorio('sem');

      setExisteRelatorio(relExiste);
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
          // setRelCelula(relatorio);
        } else {
          setExisteRelatorio('sem'); // avisa que tem relatório
          setStartShow(!startShow);
        }
      } else {
        //
        setStartShow(!startShow);
      }
      if (errorMembers) return <div>An error occured.</div>;
      if (!members) return <div>Loading ...</div>;
    }
    return 0;
  };

  React.useEffect(() => {
    if (semana !== 0) {
      ajusteRelatorio();
    }
    return 0;
  }, [semana]);
  React.useEffect(() => {
    ajusteRelatorio();

    return 0;
  }, [members]);

  /* React.useEffect(() => {
    setRelPresentes(
      relPresentes.sort((a, b) => {
        if (a.Nome > b.Nome) return 1;
        if (b.Nome > a.Nome) return -1;
        return 0;
      }),
    );
  }, [relPresentes]); */

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

  const pegarPontuacao = () => {
    if (errorPontos) return <div>An error occured.</div>;
    if (!pontos) return <div>Loading ...</div>;
    if (pontos) {
      const pontosSemanaAtual = pontos.filter(
        (val) => val.Semana === Number(semana),
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

    const pontosRelDiscipulado = 1;
    const pontosDiscipulado = presentes;
    const pontosLeituraBiblia = contBiblia;

    let pontosTotalAtual = 0;

    let pontosTotalAtualRank = 0;

    if (pontosAtual.length) {
      pontuacaoAtual = pontosAtual[0].Pontuacao;

      if (pontuacaoAtual !== '') {
        if (
          semanaPontuacao === semana &&
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
  };

  React.useEffect(() => {
    pegarPontuacao();

    criarPontuacao();

    return 0;
  }, [semana, presentes, contBiblia, pontos]);

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
    pegarPontuacao();
    return 0;
  }, [existeRelatorio]);
  React.useEffect(() => {
    criarPontuacao();

    return 0;
  }, [pontosAtual]);
  const enviarPontuacao = () => {
    const CriadoEm = new Date();

    api
      .post('/api/criarPontuacao', {
        Semana: semana,
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
*/ setTela(0);
          mutate(url);
          mutate(url2);
          mutate(url3);
          //    router.reload(window.location.pathname);
        }
      })
      .catch(() => {
        setOpenErro(true);
        setCarregando(false);

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
    const novaData = new Date(ConverteData(inputValue));
    const RelDiscipuladoFinal = createEstatistico(
      Number(perfilUser.Celula),
      Number(perfilUser.Distrito),
      Number(semana),
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
      .catch(() => {
        setOpenErro(true);
        setCarregando(false);

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
    if (pontos) {
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

  React.useEffect(() => 0, [pontos]);
  React.useEffect(() => {
    pegaRankSemana();
    posicao();
    mediaCelula();

    return 0;
  }, [members, pTotalAtual]);
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

  //

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
        <Box height="100%" width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="15%"
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
            height="13%"
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
                      {!checkRelatorio ? 'CÉLULA' : 'DICÍPULOS'}
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {!checkRelatorio ? perfilUser.Celula : presentes}
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
            {!checkRelatorio ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
                width="100%"
              >
                {existeRelatorio === 'sem' && (
                  <Box height="100%">
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      color={corIgreja.iconeOn}
                      fontFamily="arial black"
                      fontSize="20px"
                    >
                      <Box>RELATÓRIO DE DICIPULADO</Box>
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
                        >
                          <Box mt={2}>Ainda não foi registrado</Box>
                          <Box>nenhum relatório nessa semana</Box>
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
                        >
                          <Box mt={2}>Buscando Relatório</Box>
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
                      >
                        <Box
                          color={corIgreja.iconeOn}
                          fontFamily="arial black"
                          fontSize="14px"
                        >
                          PARA CRIAR UM NOVO:
                        </Box>
                        <Box>Selecione a data desejada e click</Box>
                        <Box> no botão FAZER RELATÓRIO</Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                {existeRelatorio === true && (
                  <Box height="100%" width="100%">
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      color={corIgreja.iconeOn}
                      fontFamily="arial black"
                      fontSize="20px"
                    >
                      <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        fontFamily="arial black"
                        fontSize="16px"
                      >
                        <Box
                          mt={2}
                          mb={2}
                          display="flex"
                          fontFamily="Fugaz One"
                          color="#fff"
                        >
                          SEMANA <Box ml={2}>{semana}</Box>
                        </Box>
                        <Box mt={2} color={corIgreja.iconeOn}>
                          RANKING ENTRE {rankGeral.length} CÉLULAS
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
                                POSIÇÃO
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
                                {rank}º
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box mt={5} color={corIgreja.iconeOn}>
                          MEU CRESCIMENTO
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
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
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
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="12%"
            width="100%"
          >
            {!checkRelatorio ? (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                {existeRelatorio !== true ? (
                  <Box
                    height="100%"
                    width="90%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
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
                            style={{ width: '100%' }}
                            onClick={() => {
                              if (existeRelatorio !== 'inicio' && !loading) {
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
                              {loading ? (
                                <Box>
                                  <Oval stroke="red" width={20} height={20} />
                                </Box>
                              ) : (
                                'FAZER RELATÓRIO'
                              )}
                            </Box>
                          </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Box
                    height="100%"
                    width="90%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
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
                              style={{ width: '100%' }}
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
                                EDITAR RELATÓRIO
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
                              style={{ width: '100%' }}
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
                                VER RELATÓRIO CONSOLIDADO
                              </Box>
                            </Button>
                          </Paper>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            ) : (
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
                                setCheckRelatorio(false);
                                ajusteRelatorio();
                                setTela(0);
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
                                            stroke="red"
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
            )}
          </Box>
        </Box>
      </Box>

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
    </Box>
  );
}

export default RelatorioCelebracao;
