import { Box, Grid } from '@material-ui/core';
import React from 'react';
import PegaSemanaMes from 'src/utils/getSemanaMes';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import PegaSemanaAtual from 'src/utils/getSemanaAtual';

import PegaMes from 'src/utils/getMes';

import Meses from 'src/utils/mesesAbrev';

import TamanhoJanela from 'src/utils/getSize';
import TabCelula from './supervisor/aba/tabRelSuperCelulas';
import TabSetor from './coordenador/aba/tabRelCoordTotal';
import TabResumo from './supervisor/aba/tabResumo';



//------------------------------------------
const janela = TamanhoJanela();
function RelCelula({ perfilUser, lideranca }) {
  //= ================================================================
  const mes = Meses();
  const dataAtual = new Date();
  const mesAtual = Number(dataAtual.getMonth());
  const anoAtual = Number(dataAtual.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const semanaAtual = PegaSemanaAtual(dataAtual);

  // const mesSemana = PegaMes(semanaAtual, anoAtual);
  const semanaMes = PegaSemanaMes(dataAtual); // pega a semana certa do mes

  const [contSemanaMes, setContSemanaMes] = React.useState(semanaMes);

  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosCelulaSend, setDadosCelulaSend] = React.useState([]);
  const [valorIndexSend, setValorIndexSend] = React.useState([]);
  const [indexTabela, setIndexTabela] = React.useState([]);

  const [contSemana, setContSemana] = React.useState(semanaAtual);

  const lideresSetor = lideranca.sort((a, b) => {
    if (Number(a.Celula) > Number(b.Celula)) return 1;
    if (Number(b.Celula) > Number(a.Celula)) return -1;
    return 0;
  });
  const celulaSetorIni = lideresSetor.filter(
    (results) =>
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider' &&
      Number(results.Coordenacao) === Number(perfilUser.Coordenacao),
  );

  const listaSetor = lideresSetor.sort((a, b) => {
    if (Number(a.Supervisao) > Number(b.Supervisao)) return 1;
    if (Number(b.Supervisao) > Number(a.Supervisao)) return -1;
    return 0;
  });

  const numberCelulas = celulaSetorIni.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];
  const numeroCelula = uniqueArr;

  const numberSuper = listaSetor.map((itens) => itens.Supervisao);
  const uniqueArrSuper = [...new Set(numberSuper)];
  const numeroSupervisao = uniqueArrSuper;

  const [contSetor, setContSetor] = React.useState(0);
  const numeroSetorIni = numeroSupervisao.map((val) => val);
  numeroSetorIni.unshift('TODAS AS SUPERVIÕES');
  const numeroSetor = numeroSetorIni;
  const [celulaSetor, setCelulaSetor] = React.useState(numeroCelula);

  const tipo = ['Relatório das Células', 'Relatório Geral'];
  const [contTipo, setContTipo] = React.useState(0);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    if (contSetor !== 0) {
      const novaLista = lideresSetor.filter(
        (results) =>
          Number(results.Distrito) === Number(perfilUser.Distrito) &&
          Number(results.Coordenacao) === Number(perfilUser.Coordenacao) &&
          results.Funcao === 'Lider' &&
          Number(results.Supervisao) === Number(numeroSetor[contSetor]),
      );

      const numberCelulasF = novaLista.map((itens) => itens.Celula);
      const uniqueArrF = [...new Set(numberCelulasF)];
      const numeroCelulaF = uniqueArrF;
      setCelulaSetor(numeroCelulaF);
    } else {
      const novaLista = lideresSetor.filter(
        (results) =>
          Number(results.Distrito) === Number(perfilUser.Distrito) &&
          results.Funcao === 'Lider' &&
          Number(results.Coordenacao) === Number(perfilUser.Coordenacao),
      );
      const numberCelulasF = novaLista.map((itens) => itens.Celula);
      const uniqueArrF = [...new Set(numberCelulasF)];
      const numeroCelulaF = uniqueArrF;

      const lideresSetor2 = numeroCelulaF.sort((a, b) => {
        if (new Date(a) > new Date(b)) return 1;
        if (new Date(b) > new Date(a)) return -1;
        return 0;
      });

      setCelulaSetor(lideresSetor2);
    }
  }, [contSetor]);

  const handleIncSetor = () => {
    let contTipoAtual = contSetor + 1;
    if (contTipoAtual > numeroSetor.length - 1) {
      contTipoAtual = 0;
    }

    setContSetor(contTipoAtual);
  };
  const handleDecSetor = () => {
    let contTipoAtual = contSetor - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = numeroSetor.length - 1;
    }
    setContSetor(contTipoAtual);
  };

  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
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

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    let ano2 = contAno;
    if (contSemanaAtual > semanaAtual && contAno === anoAtual) {
      contSemanaAtual = semanaAtual;
    }
    if (contSemanaAtual > 52) {
      contSemanaAtual = 1;
      ano2 = contAno + 1;
      setContAno(contAno + 1);
    }
    const simple = PegaSemanaMes(new Date(ano2, 0, 1 + contSemanaAtual * 7));
    const mesAgora = new Date(ano2, 0, 1 + contSemanaAtual * 7).getMonth();
    setContSemanaMes(simple);

    setContMes(mesAgora);

    setContSemana(contSemanaAtual);
  };

  const handleDecSemana = () => {
    let ano2 = contAno;
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 1) {
      contSemanaAtual = 52;
      ano2 = contAno - 1;
      setContAno(contAno - 1);
    }
    setContMes(PegaMes(contSemanaAtual, anoAtual));

    const simple = PegaSemanaMes(new Date(ano2, 0, 1 + contSemanaAtual * 7));
    setContSemanaMes(simple);
    const mesAgora = new Date(ano2, 0, 1 + contSemanaAtual * 7).getMonth();
    setContMes(mesAgora);
    setContSemana(contSemanaAtual);
  };
  React.useEffect(() => {
    const diaSemana = dataAtual.getDay();

    if (diaSemana !== 1 && diaSemana !== 2) handleDecSemana();
  }, []);
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
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
        {!sendResumo ? (
          <Box
            style={{
              borderRadius: '16px',
            }}
            height="100%"
            width="100%"
          >
            <Box height="100%">
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box bgcolor="gray" width="96%" mt={-1} ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box height={40} width="100%" display="flex">
                        <Box
                          height="100%"
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
                              handleDecSemana();
                            }}
                          >
                            <BiCaretLeft color="white" size={35} />
                          </IconButton>
                        </Box>
                        <Box
                          width="80%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          color="white"
                          sx={{ fontFamily: 'Fugaz One' }}
                        >
                          {contSemanaMes}ª SEM
                          <Box
                            ml={4}
                            color="white"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontSize="16px"
                            sx={{ fontFamily: 'Fugaz One' }}
                          >
                            {mes[contMes].descricao.toLocaleUpperCase()} /{' '}
                            {contAno}
                          </Box>
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
                              handleIncSemana();
                            }}
                          >
                            <BiCaretRight size={35} color="white" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={1} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        height={40}
                        bgcolor="#e1bee7"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecSetor();
                            }}
                          >
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                        >
                          {numeroSetor[contSetor]}
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
                              handleIncSetor();
                            }}
                          >
                            <BiCaretRight
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={1} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        height={40}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="20%"
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
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontSize: '14px', fontFamily: 'arial black' }}
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
                            <BiCaretRight
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  mt={4}
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                  }}
                  height={janela.height > 570 ? '74%' : '70%'}
                  minWidth={300}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={250}
                  width="95%"
                >
                  <Box
                    height="100%"
                    minHeight={225}
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    {!contTipo ? (
                      <TabCelula
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={celulaSetor}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                        setIndexTabela={setIndexTabela}
                      />
                    ) : (
                      <TabSetor
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={celulaSetor}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <TabResumo
              perfilUser={perfilUser}
              lideranca={lideranca}
              Mes={contMes}
              Ano={contAno}
              contSemana={contSemana}
              numeroCelula={celulaSetor}
              setSendResumo={setSendResumo}
              dadosCelulaSend={dadosCelulaSend}
              valorIndexSend={valorIndexSend}
              indexTabela={indexTabela}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RelCelula;
