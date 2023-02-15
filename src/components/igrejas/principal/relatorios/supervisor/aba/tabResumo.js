import * as React from 'react';
import { Box, Grid, Button, Paper } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import Emojis from 'src/components/icones/emojis';
import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import TelaSize from 'src/utils/getSize';
import converterData from 'src/utils/convData2';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function createRelFinal(Rol, Nome, Funcao, PresCelula, PresCulto, PresDisc) {
  return {
    Rol,
    Nome,
    Funcao,
    PresCelula,
    PresCulto,
    PresDisc,
  };
}

export default function TabCelula({
  Ano,
  lideranca,
  contSemana,
  perfilUser,
  numeroCelula,
  setSendResumo,
  dadosCelulaSend,
  valorIndexSend,
  indexTabela,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const nomeLider = lideranca.filter((val) => {
    if (
      Number(val.Celula) === Number(valorIndexSend) &&
      Number(val.Distrito) === Number(perfilUser.Distrito)
    )
      return val.Nome;

    return 0;
  });
  const altura = TelaSize().height;
  const [valorIndex] = React.useState(indexTabela);
  const [openPlan, setOpenPlan] = React.useState(false);

  const [presSem1, setPresSem1] = React.useState([]);
  const [pontosSem, setPontosSem] = React.useState([]);
  const [pontosSem2, setPontosSem2] = React.useState([]);
  const [pontosSem3, setPontosSem3] = React.useState([]);
  const [pontosSem4, setPontosSem4] = React.useState([]);
  const [celebracaoSem1, setCelebracaoSem1] = React.useState([]);
  const [discipuladoSem1, setDiscipuladoSem1] = React.useState([]);
  const [presentesCelula, setPresentesCelula] = React.useState('');
  const [presentesCelebracao, setPresentesCelebracao] = React.useState('');
  const [presentesDisc, setPresentesDisc] = React.useState('');
  const [nomesPresentes, setNomesPresentes] = React.useState('');

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);
  const [dadosCelula, setDadosCelula] = React.useState(dadosCelulaSend);
  const [dadosCelebracao, setDadosCelebracao] = React.useState([]);
  const [dadosDiscipulado, setDadosDiscipulado] = React.useState([]);
  const [dadosPontuacao1, setDadosPontuacao1] = React.useState([]);
  const [dadosPontuacao2, setDadosPontuacao2] = React.useState([]);
  const [dadosPontuacao3, setDadosPontuacao3] = React.useState([]);
  const [dadosPontuacao4, setDadosPontuacao4] = React.useState([]);
  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [mediaCrescimento, setMediaCrescimento] = React.useState(0);
  const [rankGeral, setRankGeral] = React.useState(0);
  const [rank, setRank] = React.useState(0);

  const url1 = `/api/consultaRelatorioCelulas/${contSemana2}`;
  const url2 = `/api/consultaPontuacaoSemana/${contSemana2}`;
  const url3 = `/api/consultaRelatorioCelebracao/${contSemana2}`;
  const url4 = `/api/consultaRelatorioDiscipulado/${contSemana2}`;

  const url5 = `/api/consultaPontuacaoSemana/${contSemana2 - 1}`;
  const url6 = `/api/consultaPontuacaoSemana/${contSemana2 - 2}`;
  const url7 = `/api/consultaPontuacaoSemana/${contSemana2 - 3}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: pontos, errorPontos } = useSWR(url2, fetcher);
  const { data: celebracaoSem, errorCelebracaoSem } = useSWR(url3, fetcher);
  const { data: discipuladoSem, errorDiscipuladoSem } = useSWR(url4, fetcher);

  const { data: pontos2, errorPontos2 } = useSWR(url5, fetcher);
  const { data: pontos3, errorPontos3 } = useSWR(url6, fetcher);
  const { data: pontos4, errorPontos4 } = useSWR(url7, fetcher);
  const dataAtual = Date.now();
  const semanaAtual = PegaSemanaAtual(dataAtual);
  React.useEffect(() => {
    setPresSem1([]);
    setCelebracaoSem1([]);
    setDiscipuladoSem1([]);
    setDiscipuladoSem1([]);
    setPresentesCelula('');
    setPresentesCelebracao('');
    setPresentesDisc('');
    setPontosSem([]);
    setPontosSem2([]);
    setPontosSem3([]);
    setPontosSem4([]);
    setNomesPresentes('');
  }, [contSemana2]);

  React.useEffect(() => {
    setPresSem1([]);
    setCelebracaoSem1([]);
    setDiscipuladoSem1([]);
    setContSemana2(contSemana);
  }, [contSemana]);

  React.useEffect(() => {
    setPresSem1([]);
    if (sem1) {
      if (sem1 && sem1[0]) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = sem1.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );

          if (presCelula && presCelula[0]) {
            setPresSem1((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

  React.useEffect(() => {
    if (celebracaoSem) {
      if (celebracaoSem.length) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = celebracaoSem.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );
          if (presCelula.length) {
            setCelebracaoSem1((presSemAtual) => [
              ...presSemAtual,
              presCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setCelebracaoSem1((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setCelebracaoSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }

    if (errorCelebracaoSem) return <div>An error occured.</div>;

    if (!celebracaoSem) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [celebracaoSem]);

  React.useEffect(() => {
    if (discipuladoSem) {
      if (discipuladoSem.length) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = discipuladoSem.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );

          if (presCelula.length) {
            setDiscipuladoSem1((presSemAtual) => [
              ...presSemAtual,
              presCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setDiscipuladoSem1((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setDiscipuladoSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }
    if (errorDiscipuladoSem) return <div>An error occured.</div>;

    if (!discipuladoSem) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [discipuladoSem]);

  React.useEffect(() => {
    if (pontos) {
      if (pontos.length) {
        setRankGeral(
          pontos.sort((a, b) => {
            if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
            if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
            return 0;
          }),
        );
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const pontosCelula = pontos.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.CriadoEm.slice(0, 4)) === Number(Ano),
          );

          if (pontosCelula.length) {
            setPontosSem((pontosSemAtual) => [
              ...pontosSemAtual,
              pontosCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setPontosSem((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setPontosSem((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }
    if (errorPontos) return <div>An error occured.</div>;

    if (!pontos) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos]);

  /* React.useEffect(() => {
    
  }, [pontosSem, pontosSem2, pontosSem3, pontosSem4]); */

  React.useEffect(() => {
    if (pontos2) {
      if (pontos2.length) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const pontosCelula = pontos2.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.CriadoEm.slice(0, 4)) === Number(Ano),
          );

          if (pontosCelula.length) {
            setPontosSem2((pontosSemAtual) => [
              ...pontosSemAtual,
              pontosCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setPontosSem2((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setPontosSem2((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }
    if (errorPontos2) return <div>An error occured.</div>;

    if (!pontos2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos2]);

  React.useEffect(() => {
    if (pontos3) {
      if (pontos3.length) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const pontosCelula = pontos3.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.CriadoEm.slice(0, 4)) === Number(Ano),
          );

          if (pontosCelula.length) {
            setPontosSem3((pontosSemAtual) => [
              ...pontosSemAtual,
              pontosCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setPontosSem3((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setPontosSem3((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }
    if (errorPontos3) return <div>An error occured.</div>;

    if (!pontos3) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos3]);

  React.useEffect(() => {
    if (pontos4) {
      if (pontos4.length) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const pontosCelula = pontos4.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.CriadoEm.slice(0, 4)) === Number(Ano),
          );

          if (pontosCelula.length) {
            setPontosSem4((pontosSemAtual) => [
              ...pontosSemAtual,
              pontosCelula[0],
            ]);
          } else {
            const semRel = { Celula: numeroCelula[i] };
            setPontosSem4((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };
          setPontosSem4((presSemAtual) => [...presSemAtual, semRel]);
        }
      }
    }
    if (errorPontos4) return <div>An error occured.</div>;

    if (!pontos4) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos4]);

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana2 + 1;
    const AnoAtual = new Date().getFullYear;
    let contAno = Ano;
    if (contSemanaAtual > 52) {
      contAno = Ano + 1;
      contSemanaAtual = 1;
    }
    if (contSemanaAtual > semanaAtual && contAno === AnoAtual)
      contSemanaAtual = semanaAtual;
    setContSemana2(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana2 - 1;

    if (contSemanaAtual < 1) contSemanaAtual = 1;

    setContSemana2(contSemanaAtual);
  };

  /* if (CelulaAtual.length) {
    const idCelula = CelulaAtual[0].id;
    const index = rankGeral.map((e) => e.id).indexOf(idCelula);

    setRank(index + 1);
  } */

  React.useEffect(() => {
    if (discipuladoSem1.length) {
      const idCelula = dadosCelula.Celula;
      const index = pontos.map((e) => e.Celula).indexOf(idCelula);

      setRank(index + 1);
    }

    const myMedia = [];

    if (dadosPontuacao1 && dadosPontuacao1 !== undefined) {
      myMedia.push(dadosPontuacao1.Total);
    }
    if (dadosPontuacao2 && dadosPontuacao2 !== undefined) {
      myMedia.push(dadosPontuacao2.Total);
    }
    if (dadosPontuacao3 && dadosPontuacao3 !== undefined) {
      myMedia.push(dadosPontuacao3.Total);
    }
    if (dadosPontuacao4 && dadosPontuacao4 !== undefined) {
      myMedia.push(dadosPontuacao4.Total);
    }

    let somaTotais = 0;
    let contElementos = 0;

    for (let i = 0; i < myMedia.length; i += 1) {
      if (myMedia[i]) {
        somaTotais += Number(myMedia[i]);
        contElementos += 1;
      }
    }
    if (contElementos === 0) contElementos = 1;

    const mediaFinal = somaTotais / contElementos;

    const mediaCres = parseFloat(
      (100 * (dadosPontuacao1.Total - mediaFinal)) / mediaFinal,
    ).toFixed(2);
    setMediaCrescimento(mediaCres);
    // setMediaAtual(dadosPontuacao1.Total);
  }, [dadosPontuacao1, dadosPontuacao2, dadosPontuacao3, dadosPontuacao4]);

  React.useEffect(() => {
    if (presSem1.length && celebracaoSem1.length && discipuladoSem1.length) {
      setDadosCelula(presSem1[valorIndex]);
      setDadosCelebracao(celebracaoSem1[valorIndex]);
      setDadosDiscipulado(discipuladoSem1[valorIndex]);
      setDadosPontuacao1(pontosSem[valorIndex]);
      setDadosPontuacao2(pontosSem2[valorIndex]);
      setDadosPontuacao3(pontosSem3[valorIndex]);
      setDadosPontuacao4(pontosSem4[valorIndex]);
    }
  }, [presSem1, celebracaoSem1, discipuladoSem1]);

  React.useEffect(() => {
    // 2, isto é, Venda1 e Venda2

    if (dadosCelula.Adultos !== undefined) {
      let somaPresentes = 0;
      if (dadosCelula.Adultos) somaPresentes += dadosCelula.Adultos;
      if (dadosCelula.Criancas) somaPresentes += dadosCelula.Criancas;
      if (dadosCelula.Visitantes) somaPresentes += dadosCelula.Visitantes;

      setPresentesCelula(somaPresentes);
    }
  }, [dadosCelula]);

  React.useEffect(() => {
    // 2, isto é, Venda1 e Venda2

    if (dadosCelebracao.Adultos !== undefined) {
      let somaPresentes = 0;
      if (dadosCelebracao.Adultos) somaPresentes += dadosCelebracao.Adultos;
      if (dadosCelebracao.Criancas) somaPresentes += dadosCelebracao.Criancas;
      if (dadosCelebracao.Visitantes)
        somaPresentes += dadosCelebracao.Visitantes;

      setPresentesCelebracao(somaPresentes);
    }
  }, [dadosCelebracao]);

  React.useEffect(() => {
    // 2, isto é, Venda1 e Venda2

    if (dadosDiscipulado.Adultos !== undefined) {
      let somaPresentes = 0;
      if (dadosDiscipulado.Adultos) somaPresentes += dadosDiscipulado.Adultos;
      if (dadosDiscipulado.Criancas) somaPresentes += dadosDiscipulado.Criancas;
      if (dadosDiscipulado.Visitantes)
        somaPresentes += dadosDiscipulado.Visitantes;

      setPresentesDisc(somaPresentes);
    }
  }, [dadosDiscipulado]);

  //= ==================================================================

  React.useEffect(() => {
    if (presSem1 && celebracaoSem1 && discipuladoSem1) {
      const nomeCelula = presSem1.filter(
        (val) => val.Celula === Number(dadosCelula.Celula),
      );
      const nomeCelebracao = celebracaoSem1.filter(
        (val) => val.Celula === Number(dadosCelula.Celula),
      );
      const nomeDisc = discipuladoSem1.filter(
        (val) => val.Celula === Number(dadosCelula.Celula),
      );

      if (
        nomeCelula.length &&
        nomeCelebracao.length &&
        nomeDisc.length &&
        nomeCelula[0].id
      ) {
        const listNomes = nomeCelula[0].NomesMembros;
        const object = JSON.parse(listNomes);
        const nomesParcial = object.map((rol) =>
          createRelFinal(rol.Rol, rol.Nome, '', rol.Presenca, '', ''),
        );
        // setNomesVisitantes(nomesVisitantesParcial);

        if (nomesParcial && nomeLider) {
          for (let n = 0; n < nomeLider.length; n += 1) {
            for (let i = 0; i < nomesParcial.length; i += 1) {
              if (
                nomeLider[n].Nome === nomesParcial[i].Nome &&
                nomeLider[n].Funcao === 'Lider'
              ) {
                nomesParcial[i].Funcao = 'Lider';
              }
            }
          }
        }

        if (
          nomesParcial &&
          nomeCelebracao[0].Adultos !== null &&
          nomeCelebracao[0].Adultos !== undefined
        ) {
          const listNomes2 = nomeCelebracao[0].NomesMembros;
          const object2 = JSON.parse(listNomes2);
          //          const object2 = JSON.parse(object3);
          for (let n = 0; n < nomesParcial.length; n += 1) {
            for (let i = 0; i < object2.length; i += 1) {
              if (nomesParcial[n].Rol === object2[i].Rol) {
                nomesParcial[n].PresCulto = object2[i].Presenca;
              }
            }
          }
        }

        if (
          nomesParcial &&
          nomeDisc[0].Adultos !== null &&
          nomeDisc[0].Adultos !== undefined
        ) {
          const listNomes3 = nomeDisc[0].NomesMembros;
          const object3 = JSON.parse(listNomes3);

          for (let n = 0; n < nomesParcial.length; n += 1) {
            for (let i = 0; i < object3.length; i += 1) {
              if (nomesParcial[n].Rol === object3[i].Rol)
                nomesParcial[n].PresDisc = object3[i].Presenca;
            }
          }
        }

        setNomesPresentes(nomesParcial);
      }
    }
  }, [presSem1, celebracaoSem1, discipuladoSem1]);

  const tipo = [
    'Relatório da Célula',
    'Relatório da Celebração',
    'Relatório do Discipulado',
  ];
  const [contTipo, setContTipo] = React.useState(0);
  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 2) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
  };

  //= ==================================================================

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="calc(100vh - 56px)"
      minHeight={570}
    >
      <Box
        width="96%"
        height="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box
          width="100%"
          height="85%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="-1vh"
        >
          <Box width="98%">
            <Box
              sx={{
                fontFamily: 'arial black',
              }}
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                mr="20vw"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="50%"
              >
                <Box color="#ffff8d">Celula:</Box>
                <Box width={25} color="#ffffff">
                  {dadosCelula.Celula}
                </Box>
              </Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="flex-start"
                textAlign="center"
                alignItems="center"
                width="50%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  fontFamily="arial black"
                  textAlign="center"
                  color="white"
                >
                  <Box color="#ffff8d" mr={1}>
                    Posição:
                  </Box>

                  <Box width={25} color="#ffffff">
                    {rank}º{' '}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              minWidth={300}
            >
              <Box
                mt={1}
                borderRadius={5}
                bgcolor="white"
                width="98%"
                height={40}
                display="flex"
              >
                <Box
                  width="10%"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleDecTipo();
                    }}
                  >
                    <BiCaretLeft size={35} color={corIgreja.principal2} />
                  </IconButton>
                </Box>
                <Box
                  width="80%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="16px"
                  sx={{ fontFamily: 'Fugaz One' }}
                >
                  {tipo[contTipo]}
                </Box>
                <Box
                  width="10%"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      handleIncTipo();
                    }}
                  >
                    <BiCaretRight size={35} color={corIgreja.principal2} />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box
              mt={2}
              display="flex"
              alignItems="center"
              height="4vh"
              width="100%"
              minHeight={30}
            >
              <Box
                sx={{
                  fontFamily: 'arial black',
                }}
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  mr="20vw"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    color="#ffff8d"
                    mr={1}
                  >
                    Data:
                  </Box>

                  <Box color="#ffffff">
                    {tipo[contTipo] === 'Relatório da Célula' &&
                      dadosCelula.Data &&
                      converterData(dadosCelula.Data)}
                    {tipo[contTipo] === 'Relatório da Celebração' && (
                      <Box>
                        {dadosCelebracao.Data !== undefined
                          ? converterData(dadosCelebracao.Data)
                          : 'S/R'}
                      </Box>
                    )}
                    {tipo[contTipo] === 'Relatório do Discipulado' && (
                      <Box>
                        {dadosDiscipulado.Data !== undefined
                          ? converterData(dadosDiscipulado.Data)
                          : 'S/R'}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="flex-start"
                  textAlign="center"
                  alignItems="center"
                  width="50%"
                >
                  <Box
                    display="flex"
                    fontFamily="arial black"
                    textAlign="center"
                    color="white"
                  >
                    <Box color="#ffff8d" mr={1}>
                      Presentes:
                    </Box>

                    <Box width={25} color="#ffffff">
                      {tipo[contTipo] === 'Relatório da Célula' &&
                        presentesCelula}
                      {tipo[contTipo] === 'Relatório da Celebração' && (
                        <Box>
                          {presentesCelebracao !== ''
                            ? presentesCelebracao
                            : 'S/R'}
                        </Box>
                      )}
                      {tipo[contTipo] === 'Relatório do Discipulado' && (
                        <Box>
                          {presentesDisc !== '' ? presentesDisc : 'S/R'}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              mt={0}
              display="flex"
              alignItems="center"
              height="4vh"
              width="100%"
              minHeight={30}
            >
              <Box
                sx={{
                  fontFamily: 'arial black',
                }}
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  mr="20vw"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                >
                  <Box color="#ffff8d" mr={1}>
                    Adultos:
                  </Box>

                  <Box width={25} color="#ffffff">
                    {tipo[contTipo] === 'Relatório da Célula' && (
                      <Box>
                        {dadosCelula.Adultos !== undefined
                          ? dadosCelula.Adultos
                          : 'S/R'}
                      </Box>
                    )}
                    {tipo[contTipo] === 'Relatório da Celebração' && (
                      <Box>
                        {dadosCelebracao.Adultos !== undefined
                          ? dadosCelebracao.Adultos
                          : 'S/R'}
                      </Box>
                    )}
                    {tipo[contTipo] === 'Relatório do Discipulado' && (
                      <Box>
                        {dadosDiscipulado.Adultos !== undefined
                          ? dadosDiscipulado.Adultos
                          : 'S/R'}
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                >
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontFamily="arial black"
                    textAlign="center"
                    color="white"
                  >
                    <Box color="#ffff8d" mr={1}>
                      Crianças:
                    </Box>
                    <Box width={25} color="#ffffff">
                      {tipo[contTipo] === 'Relatório da Célula' && (
                        <Box>
                          {tipo[contTipo] === 'Relatório da Célula' && (
                            <Box>
                              {dadosCelula.Criancas !== undefined
                                ? dadosCelula.Criancas
                                : 'S/R'}
                            </Box>
                          )}
                          {tipo[contTipo] === 'Relatório da Celebração' && (
                            <Box>
                              {dadosCelebracao.Criancas !== undefined
                                ? dadosCelebracao.Criancas
                                : 'S/R'}
                            </Box>
                          )}
                          {tipo[contTipo] === 'Relatório do Discipulado' && (
                            <Box>
                              {dadosDiscipulado.Criancas !== undefined
                                ? dadosDiscipulado.Criancas
                                : 'S/R'}
                            </Box>
                          )}
                        </Box>
                      )}
                      {tipo[contTipo] === 'Relatório da Celebração' && (
                        <Box>
                          {dadosCelebracao.Criancas !== undefined
                            ? dadosCelebracao.Criancas
                            : 'S/R'}
                        </Box>
                      )}
                      {tipo[contTipo] === 'Relatório do Discipulado' && (
                        <Box>
                          {dadosDiscipulado.Criancas !== undefined
                            ? dadosDiscipulado.Criancas
                            : 'S/R'}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              mt={0}
              display="flex"
              alignItems="center"
              height="4vh"
              width="100%"
              minHeight={30}
            >
              <Box
                sx={{
                  fontFamily: 'arial black',
                }}
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  mr="20vw"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                >
                  <Box color="#ffff8d" mr={1}>
                    {tipo[contTipo] === 'Relatório da Célula' && 'Visitantes:'}
                    {tipo[contTipo] === 'Relatório da Celebração' &&
                      'Visitantes:'}
                    {tipo[contTipo] === 'Relatório do Discipulado' &&
                      'Visitas do Lider:'}
                  </Box>

                  <Box width={25} color="#ffffff">
                    {tipo[contTipo] === 'Relatório da Célula' && (
                      <Box>
                        {dadosCelula.Visitantes !== undefined
                          ? dadosCelula.Visitantes
                          : 'S/R'}
                      </Box>
                    )}

                    {tipo[contTipo] === 'Relatório da Celebração' && (
                      <Box>
                        {dadosCelebracao.Visitantes !== undefined
                          ? dadosCelebracao.Visitantes
                          : 'S/R'}
                      </Box>
                    )}
                    {tipo[contTipo] === 'Relatório do Discipulado' && (
                      <Box>
                        {dadosCelula.Visitas !== undefined
                          ? dadosCelula.Visitas
                          : 'S/R'}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                >
                  <Box color="#ffff8d" mr={1}>
                    {tipo[contTipo] === 'Relatório da Célula' && 'Conversões:'}
                    {tipo[contTipo] === 'Relatório da Celebração' &&
                      'Conversões:'}
                    {tipo[contTipo] === 'Relatório do Discipulado' &&
                      'Leitura:'}
                  </Box>

                  <Box width={25} color="#ffffff">
                    {tipo[contTipo] === 'Relatório da Célula' && (
                      <Box>
                        {dadosCelula.Conversoes !== undefined
                          ? dadosCelula.Conversoes
                          : 'S/R'}
                      </Box>
                    )}

                    {tipo[contTipo] === 'Relatório da Celebração' && (
                      <Box>
                        {dadosCelebracao.Conversoes !== undefined
                          ? dadosCelebracao.Conversoes
                          : 'S/R'}
                      </Box>
                    )}
                    {tipo[contTipo] === 'Relatório do Discipulado' && (
                      <Box>
                        {dadosDiscipulado.LeituraBiblica !== undefined
                          ? dadosDiscipulado.LeituraBiblica
                          : 'S/R'}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              mt="1vh"
              bgcolor="#fafafa"
              sx={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                fontFamily: 'arial black',
                borderBottom: '1px solid ',
                borderColor: corIgreja.principal2,
              }}
              height={50}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="50%"
                minWidth={370 / 2}
                flexDirection="column"
                sx={{
                  borderRight: '1px solid #000',
                  borderColor: corIgreja.principal2,
                }}
              >
                <Box width="100%" fontFamily="arial black">
                  Crescimento
                </Box>
                <Box mt={0} color="red">
                  <Box fontFamily="arial black">
                    {mediaCrescimento !== 'NaN' ? (
                      <Box mt={0} color={mediaCrescimento > 0 ? 'blue' : 'red'}>
                        {mediaCrescimento} %
                      </Box>
                    ) : (
                      'S/R'
                    )}
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100%"
                textAlign="center"
                width="50%"
                minWidth={370 / 2}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="50%"
                  flexDirection="column"
                >
                  {rankGeral.length && rank && rankGeral[rank - 1] ? (
                    <Box
                      fontFamily="arial black"
                      color="#000"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      mt={0.5}
                    >
                      {mediaCrescimento && mediaCrescimento > 0 ? (
                        <Emojis tipo="alegre" />
                      ) : (
                        <Box>
                          {Number(mediaCrescimento) === 0 ? (
                            <Emojis tipo="igual" />
                          ) : (
                            <Emojis tipo="triste" />
                          )}
                        </Box>
                      )}
                    </Box>
                  ) : (
                    'S/R'
                  )}
                </Box>
              </Box>
            </Box>

            {presSem1.length && celebracaoSem1 && discipuladoSem1 ? (
              <TableContainer
                sx={{
                  border: '1px solid ',
                  borderColor: corIgreja.principal2,
                  minHeight: 10,
                  height: altura > 700 ? '45vh' : '35vh',
                }}
              >
                <Box width="100%" height="100%">
                  {nomesPresentes.length ? (
                    nomesPresentes.map((row, index) => (
                      <Box key={index} width="100%">
                        {tipo[contTipo] === 'Relatório da Célula' && (
                          <Box
                            mt={0}
                            display="flex"
                            alignItems="center"
                            height="5vh"
                            sx={{ borderBottom: '1px solid ' }}
                            borderColor={corIgreja.principal2}
                            minHeight={40}
                            bgcolor={row.PresCelula ? '#e8f5e9' : '#fce4ec'}
                          >
                            <Box
                              height="100%"
                              display="flex"
                              justifyContent="center"
                              textAlign="center"
                              alignItems="center"
                              width="10%"
                            >
                              {row.Funcao === 'Lider' ? (
                                <Box>
                                  <img
                                    src="/images/lider.png"
                                    height={25}
                                    width={25}
                                    alt="lider"
                                  />
                                </Box>
                              ) : (
                                ''
                              )}
                            </Box>
                            <Box
                              sx={{
                                fontFamily: 'Fugaz One',
                              }}
                              height="100%"
                              width="90%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                                textAlign="center"
                                width="100%"
                              >
                                {row.Nome.length >= 35
                                  ? row.Nome.substring(0, 35)
                                  : row.Nome.toUpperCase()}
                              </Box>
                            </Box>
                          </Box>
                        )}
                        {tipo[contTipo] === 'Relatório da Celebração' && (
                          <Box
                            mt={0}
                            display="flex"
                            alignItems="center"
                            height="5vh"
                            sx={{ borderBottom: '1px solid ' }}
                            borderColor={corIgreja.principal2}
                            minHeight={40}
                            color={row.PresCulto === 'live' ? 'blue' : 'black'}
                            bgcolor={
                              row.PresCulto === false ? '#fce4ec' : '#e8f5e9'
                            }
                          >
                            {row.PresCulto !== '' ? (
                              <Box
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                textAlign="center"
                                alignItems="center"
                                width="100%"
                              >
                                <Box
                                  height="100%"
                                  display="flex"
                                  justifyContent="center"
                                  textAlign="center"
                                  alignItems="center"
                                  width="10%"
                                >
                                  {row.Funcao === 'Lider' ? (
                                    <Box>
                                      <img
                                        src="/images/lider.png"
                                        height={25}
                                        width={25}
                                        alt="lider"
                                      />
                                    </Box>
                                  ) : (
                                    ''
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    fontFamily: 'Fugaz One',
                                  }}
                                  height="100%"
                                  width="90%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    textAlign="center"
                                    width="100%"
                                  >
                                    {row.Nome.length >= 35
                                      ? row.Nome.substring(0, 35)
                                      : row.Nome.toUpperCase()}
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                                fontFamily="Fugaz One"
                                width="100%"
                              >
                                Sem Relatório
                              </Box>
                            )}
                          </Box>
                        )}
                        {console.log('quantidade', row.PresDisc)}
                        {tipo[contTipo] === 'Relatório do Discipulado' && (
                          <Box
                            mt={0}
                            display="flex"
                            alignItems="center"
                            height="5vh"
                            sx={{ borderBottom: '1px solid ' }}
                            borderColor={corIgreja.principal2}
                            minHeight={40}
                            color={row.PresDisc === 'live' ? 'blue' : 'black'}
                            bgcolor={
                              row.PresDisc === false ? '#fce4ec' : '#e8f5e9'
                            }
                          >
                            {row.PresDisc !== '' ? (
                              <Box
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                textAlign="center"
                                alignItems="center"
                                width="100%"
                              >
                                <Box
                                  height="100%"
                                  display="flex"
                                  justifyContent="center"
                                  textAlign="center"
                                  alignItems="center"
                                  width="10%"
                                >
                                  {row.Funcao === 'Lider' ? (
                                    <Box>
                                      <img
                                        src="/images/lider.png"
                                        height={25}
                                        width={25}
                                        alt="lider"
                                      />
                                    </Box>
                                  ) : (
                                    ''
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    fontFamily: 'Fugaz One',
                                  }}
                                  height="100%"
                                  width="90%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    textAlign="center"
                                    width="100%"
                                  >
                                    {row.Nome.length >= 35
                                      ? row.Nome.substring(0, 35)
                                      : row.Nome.toUpperCase()}
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                                fontFamily="Fugaz One"
                                width="100%"
                              >
                                Sem Relatório
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor="white"
                      fontFamily="Fugaz One"
                      fontSize="16px"
                    >
                      SEM RELATÓRIO
                    </Box>
                  )}
                </Box>
              </TableContainer>
            ) : (
              <TableContainer
                sx={{
                  border: '1px solid ',
                  borderColor: corIgreja.principal2,
                  minHeight: 10,
                  height: altura > 700 ? '35vh' : '25vh',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={267}
                  bgcolor="#fafafa"
                  textAlign="center"
                  width="100%"
                >
                  <Box>
                    <Box
                      fontFamily="arial black"
                      mb={5}
                      mt={5}
                      textAlign="center"
                      color="Blue"
                    >
                      Buscando Dados
                    </Box>
                    <Oval stroke="blue" width={50} height="4vh" />
                  </Box>
                </Box>
              </TableContainer>
            )}

            <Box
              mt={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="2.5vh"
              minHeight={10}
              bgcolor="#fafafa"
            >
              {dadosCelula.Observacoes ? (
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
                    setOpenPlan(true);
                  }}
                >
                  Ver Observações
                </Button>
              ) : (
                <Button
                  style={{
                    background: 'white',
                    color: 'gray',
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
            <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
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
                  justifyContent="center"
                  alignItems="center"
                >
                  {dadosCelula.Observacoes !== undefined &&
                  dadosCelula.Observacoes !== null ? (
                    <Box textAlign="justify"> {dadosCelula.Observacoes}</Box>
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
                    setOpenPlan(false);
                  }}
                >
                  FECHAR OBSERVAÇÕES
                </Button>
              </Box>
            </Dialog>
          </Box>
        </Box>
        <Box mt="3vh" width="100%" display="flex" justifyContent="center">
          <Grid container spacing={0}>
            <Grid container item xs={6}>
              <Paper width="100%">
                <Box height={36} width="100%" display="flex">
                  <Box
                    width="20%"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        handleDecSemana();
                      }}
                    >
                      <BiCaretLeft size={35} color={corIgreja.principal2} />
                    </IconButton>
                  </Box>
                  <Box
                    width="60%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ fontFamily: 'arial black' }}
                  >
                    Semana - {contSemana2}
                  </Box>
                  <Box
                    width="20%"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        handleIncSemana();
                      }}
                    >
                      <BiCaretRight size={35} color={corIgreja.principal2} />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Button
                style={{
                  background: '#69f0ae',
                  color: 'blue',
                  fontFamily: 'arial black',
                  width: '100%',
                }}
                component="a"
                variant="contained"
                onClick={() => {
                  setSendResumo(false);
                  setContSemana2(contSemana);
                }}
              >
                FECHAR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
