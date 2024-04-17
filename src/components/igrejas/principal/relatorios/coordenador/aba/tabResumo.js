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
import SvgIcon from '@mui/material/SvgIcon';
import Emojis from 'src/components/icones/emojis';
import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  fontResponsive: {
    fontSize: '3vw',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: { fontSize: '1.3vw' },
  },
  fontResponsive16: {
    fontSize: '2vw',

    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    },
  },
}));

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  Ano,
  lideranca,
  contSemana,
  perfilUser,
  numeroCelula,
  setSendResumo,
  dadosCelulaSend,
  valorIndexSend,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const classes = useStyles();
  const nomeLider = lideranca?.filter((val) => {
    if (
      Number(val.Celula) === Number(valorIndexSend) &&
      Number(val.Distrito) === Number(perfilUser.Distrito)
    )
      return val.Nome;

    return 0;
  });
  const primeiroNome = nomeLider[0].Nome.split(' ');

  const [valorIndex] = React.useState(valorIndexSend);
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
              Number(val.Data.slice(6, 10)) === Number(Ano),
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
              Number(val.Data.slice(6, 10)) === Number(Ano),
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
              Number(val.Data.slice(6, 10)) === Number(Ano),
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

    if (contSemanaAtual > semanaAtual) contSemanaAtual = semanaAtual;
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

  const body = (
    <Box
      className={classes.fontResponsive}
      mt={0}
      ml={0}
      width="100vw"
      height="90vh"
      minHeight={570}
    >
      <Box
        height="100%"
        width="100%"
        minWidth={300}
        minHeight={570}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
      >
        <Box width="90%">
          <Box
            display="flex"
            justifyContent="center"
            fontFamily="arial black"
            className={classes.fontResponsive16}
            textAlign="center"
            mt={-1}
            color="white"
          >
            <Box color="#ffff8d" mr={2}>
              Lider:
            </Box>
            <Box color="white" mr={2}>
              {primeiroNome[0]}
            </Box>
            <Box color="#ffff8d" mr={2}>
              Célula:
            </Box>

            <Box color="#ffffff"> {dadosCelula.Celula} </Box>
          </Box>

          <Box
            bgcolor="#80cbc4"
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            mt={1}
            height={60}
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
              width="25%"
              flexDirection="column"
            >
              <Box> Data</Box>
              {dadosCelula.Data}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="25%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              Célula
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="25%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              Celebração
            </Box>
            <Box textAlign="center" width="25%">
              Discipulado
            </Box>
          </Box>

          {presSem1.length ? (
            <TableContainer sx={{ maxHeight: 390 }}>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
                className={classes.fontResponsive}
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="100%"
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
                    width="25%"
                  >
                    Adultos
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Adultos !== undefined
                      ? dadosCelula.Adultos
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Adultos !== undefined
                      ? dadosCelebracao.Adultos
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.Adultos !== undefined
                      ? dadosDiscipulado.Adultos
                      : '-'}
                  </Box>
                </Box>
              </Box>

              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="100%"
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
                    width="25%"
                  >
                    Criancas
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Criancas !== undefined
                      ? dadosCelula.Criancas
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Criancas !== undefined
                      ? dadosCelebracao.Criancas
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.Criancas !== undefined
                      ? dadosDiscipulado.Criancas
                      : '-'}
                  </Box>
                </Box>
              </Box>

              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="100%"
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
                    width="25%"
                  >
                    Visitantes
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Visitantes !== undefined
                      ? dadosCelula.Visitantes
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Visitantes !== undefined
                      ? dadosCelebracao.Visitantes
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.Visitantes !== undefined
                      ? dadosDiscipulado.Visitantes
                      : '-'}
                  </Box>
                </Box>
              </Box>

              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="100%"
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
                    width="25%"
                  >
                    Conversões
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Conversoes !== undefined
                      ? dadosCelula.Conversoes
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Conversoes !== undefined
                      ? dadosCelebracao.Conversoes
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.Conversoes !== undefined
                      ? dadosDiscipulado.Conversoes
                      : '-'}
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="100%"
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
                    width="25%"
                  >
                    Visitas
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Visitas !== undefined
                      ? dadosCelula.Visitas
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Visitas !== undefined
                      ? dadosCelebracao.Visitas
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.Visitas !== undefined
                      ? dadosDiscipulado.Visitas
                      : '-'}
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
                sx={{
                  fontFamily: 'arial black',
                  borderBottom: '1px solid #000',
                }}
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                  >
                    Leitura
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Leitura !== undefined
                      ? dadosCelula.Leitura
                      : '-'}
                  </Box>

                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelebracao.Leitura !== undefined
                      ? dadosCelebracao.Leitura
                      : '-'}
                  </Box>
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="25%"
                  >
                    {dadosDiscipulado.LeituraBiblica !== undefined
                      ? dadosDiscipulado.LeituraBiblica
                      : '-'}
                  </Box>
                </Box>
              </Box>

              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
                sx={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="blue"
                  >
                    Presentes
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="blue"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {presentesCelula !== '' ? presentesCelula : '-'}
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="blue"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {presentesCelebracao !== '' ? presentesCelebracao : '-'}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="blue"
                  >
                    {presentesDisc !== '' ? presentesDisc : '-'}
                  </Box>
                </Box>
              </Box>
              <Box
                mt={1}
                display="flex"
                alignItems="center"
                height="5.5vh"
                minHeight={30}
                bgcolor="#fafafa"
                borderRadius={16}
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                  >
                    obs:
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="75%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {dadosCelula.Observacoes !== undefined
                      ? dadosCelula.Observacoes
                      : '-'}
                  </Box>
                </Box>
              </Box>
            </TableContainer>
          ) : (
            <TableContainer sx={{ maxHeight: 390 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={270}
                bgcolor="#fafafa"
                textAlign="center"
                width="100%"
                sx={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
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
                  <Oval stroke="blue" width={50} height="5.5vh" />
                </Box>
              </Box>
            </TableContainer>
          )}
          <Box
            mt="1vh"
            bgcolor="#c5cae9"
            sx={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
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
              }}
            >
              <Box width="100%" fontFamily="arial black">
                Crescimento
              </Box>
              <Box mt={0} color="red">
                <Box fontFamily="arial black">
                  {mediaCrescimento !== 'NaN' ? (
                    <Box mt={0} color="red">
                      {mediaCrescimento} %
                    </Box>
                  ) : (
                    '-'
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
              <Box>Ranking Semanal</Box>
              <Box>
                {rankGeral.length && rank && rankGeral[rank - 1] ? (
                  <Box mt={0} color="red">
                    {rankGeral[rank - 1].TotalRank.toString().replace('.', ',')}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            </Box>
          </Box>
          <Box
            bgcolor="#faffca"
            fontSize="12px"
            sx={{
              borderBottom: '1px solid #000',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
            height={40}
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
              flexDirection="column"
              sx={{
                borderRight: '1px solid #000',
              }}
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
                '-'
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="50%"
              fontFamily="arial black"
              fontSize="14px"
              color="blue"
            >
              {rank ? <Box mt={0.6}>{rank}º Lugar</Box> : '-'}
            </Box>
          </Box>
          <Box mt="3vh" display="flex" justifyContent="center">
            <Grid container spacing={6}>
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
                        <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                        <BiCaretLeft />
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
                        <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                        <BiCaretRight />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid container item xs={6}>
                <Button
                  style={{
                    background: '#69f0ae',
                    color: '#780810',
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
    </Box>
  );

  //= ==================================================================

  return <Box>{body}</Box>;
}
