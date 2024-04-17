import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import IconButton from '@mui/material/IconButton';
import ConverteData from 'src/utils/convData2';
import { AiOutlineFileSearch } from 'react-icons/ai';

import Dialog from '@mui/material/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';

import CalcularPontuacao from './calcularPontuacao';
import MostrarRelatorioCelula from './mostrarRelatorioCelula';
import MostrarRelatorioCelebracao from './mostrarRelatorioCelebracao';
import MostrarRelatorioDiscipulado from './mostrarRelatorioDiscipulado';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const fetcher = (url) => axios.get(url).then((res) => res.data);
function createPontuacaoFinal(
  Celula,
  Distrito,
  Semana,
  relCelula,
  relCelebracao,
  relDiscipulado,
  Posicao,
  TotalRank,
  Pontuacao,
  Ano,
  Total,
) {
  return {
    Celula,
    Distrito,
    Semana,
    relCelula,
    relCelebracao,
    relDiscipulado,
    Posicao,
    TotalRank,
    Pontuacao,
    Ano,
    Total,
  };
}

export default function TabCelula({
  Ano,
  parametros,
  supervisoes,
  coordenacoes,
  distritos,
  contSemana,
  numeroCelula,
  dataEnviada,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);

  const [presCelebracao, setPresCelebracao] = React.useState([]);
  const [presDisc, setPresDisc] = React.useState([]);
  const [ordem, setOrdem] = React.useState('Celula');
  const [openPontuacao, setOpenPontuacao] = React.useState(false);
  const [openPlan, setOpenPlan] = React.useState(false);
  const [openCeleb, setOpenCeleb] = React.useState(false);
  const [openDisc, setOpenDisc] = React.useState(false);
  const [pontosF, setPontosF] = React.useState([]);
  const [celula, setCelula] = React.useState([]);
  const [celulaEnviada, setCelulaEnviada] = React.useState([]);

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [rankGeral, setRankGeral] = React.useState(0);

  const [posicaoFinal, setPosicaoFinal] = React.useState(0);
  const [posicao0, setPosicao0] = React.useState(0);
  const [posicao1, setPosicao1] = React.useState(0);
  const [posicao2, setPosicao2] = React.useState(0);
  const [posicao3, setPosicao3] = React.useState(0);

  const url1 = `/api/consultaRelatorioCelulas/${contSemana2}`;
  const url2 = `/api/consultaPontuacaoSemana/${contSemana2}`;
  const url3 = `/api/consultaRelatorioCelebracao/${contSemana2}`;
  const url4 = `/api/consultaRelatorioDiscipulado/${contSemana2}`;
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: pontos, errorPontos } = useSWR(url2, fetcher);
  const { data: celebracao, errorCelebracao } = useSWR(url3, fetcher);
  const { data: discipulado, errorDiscipulado } = useSWR(url4, fetcher);

  React.useEffect(() => {
    setPresSem1([]);
    setPosicaoFinal([]);
    setRankGeral(contSemana);
    setPosicao0([]);
    setPosicao1([]);
    setPosicao2([]);
    setContSemana2(contSemana);
  }, [contSemana]);

  React.useEffect(() => {
    setPresSem1([]);

    if (sem1 && numeroCelula.length) {
      if (sem1 && sem1[0]) {
        numeroCelula.map((val2) => {
          const newPresCelula = sem1?.filter(
            (val) =>
              val.Celula === Number(val2.Celula) &&
              val.Distrito === Number(val2.Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );

          if (newPresCelula.length)
            setPresSem1((presSemAtual) => [...presSemAtual, newPresCelula[0]]);
          else setPresSem1((presSemAtual) => [...presSemAtual, []]);
          return 0;
        });
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i].Celula };

          setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
    } else {
      setPresSem1([]);
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, numeroCelula]);

  React.useEffect(() => {
    setPresCelebracao([]);
    if (celebracao && numeroCelula.length) {
      if (celebracao && celebracao[0]) {
        numeroCelula.map((row) => {
          const presCeleb = celebracao?.filter(
            (val) =>
              Number(val.Celula) === Number(row.Celula) &&
              Number(val.Distrito) === Number(row.Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );

          if (presCeleb && presCeleb[0]) {
            setPresCelebracao((presSemAtual) => [
              ...presSemAtual,
              presCeleb[0],
            ]);
          } else {
            const semRel = { Celula: row.Celula };

            setPresCelebracao((presSemAtual) => [...presSemAtual, semRel]);
          }
          return 0;
        });
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[0].Celula };

          setPresCelebracao((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorCelebracao) return <div>An error occured.</div>;

    if (!celebracao) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [celebracao, numeroCelula]);

  React.useEffect(() => {
    setPresDisc([]);
    if (discipulado && numeroCelula.length) {
      if (discipulado && discipulado[0]) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = discipulado?.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i].Celula) &&
              val.Distrito === Number(numeroCelula[i].Distrito) &&
              Number(val.Data.slice(0, 4)) === Number(Ano),
          );

          if (presCelula && presCelula[0]) {
            setPresDisc((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i].Celula };

            setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[0].Celula };

          setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorDiscipulado) return <div>An error occured.</div>;

    if (!discipulado) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [discipulado, numeroCelula]);

  React.useEffect(() => {
    if (pontos && pontos.length) {
      const pontosFinal = pontos?.filter((rol) => rol.Ano === Ano);

      if (pontosFinal.length) {
        setRankGeral(
          pontosFinal.sort((a, b) => {
            if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
            if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
            return 0;
          }),
        );
      }
    } else {
      setRankGeral(numeroCelula);
    }

    if (errorPontos) return <div>An error occured.</div>;

    if (!pontos) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos, numeroCelula]);

  /* React.useEffect(() => {
    
  }, [pontosSem, pontosSem2, pontosSem3, pontosSem4]); */

  /* if (CelulaAtual.length) {
    const idCelula = CelulaAtual[0].id;
    const index = rankGeral.map((e) => e.id).indexOf(idCelula);

    setRank(index + 1);
  } */

  React.useEffect(() => {
    const valFinal = [];

    if (numeroCelula.length > 0) {
      numeroCelula.map((row, i) => {
        if (Object.keys(rankGeral).length > 0) {
          let check = 0;

          rankGeral.map((rol, index) => {
            if (row) {
              if (
                Number(row.Distrito) === Number(rol.Distrito) &&
                Number(row.Celula) === Number(rol.Celula)
              ) {
                check = 1;

                valFinal[i] = createPontuacaoFinal(
                  rol.Celula,
                  rol.Distrito,
                  contSemana,
                  rol.relCelula ? rol.relCelula : '',
                  rol.relCelebracao ? rol.relCelebracao : '',
                  rol.relDiscipulado ? rol.relDiscipulado : '',
                  index + 1,
                  rol.TotalRank,
                  rol.Pontuacao,
                  Ano,
                  rol.Total,
                );
              } else if (check === 0) {
                valFinal[i] = createPontuacaoFinal(
                  row.Celula,
                  row.Distrito,
                  contSemana,
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  Ano,
                  '',
                );
              }
            }

            setPosicao0(valFinal);
            return 0;
          });
        }
        return 0;
      });
    }
  }, [rankGeral, numeroCelula]);

  React.useEffect(() => {
    const valFinal = [];

    let newValor;
    if (Object.keys(posicao0).length > 0) {
      posicao0.map((vPosicao, i) => {
        if (Object.keys(presSem1).length > 0) {
          newValor = presSem1?.filter(
            (vPresSem1) => Number(vPosicao.Celula) === Number(vPresSem1.Celula),
          );

          valFinal[i] = createPontuacaoFinal(
            vPosicao.Celula,
            vPosicao.Distrito,
            vPosicao.Semana,
            newValor.length && newValor[0].NomesMembros ? newValor[0] : '',
            vPosicao.relCelebracao ? vPosicao.relCelebracao : '',
            vPosicao.relDiscipulado ? vPosicao.relDiscipulado : '',
            vPosicao.Posicao,
            vPosicao.TotalRank,
            vPosicao.Pontuacao,
            Ano,
            vPosicao.Total,
          );

          setPosicao1(valFinal);
        } else setPosicaoFinal([]);
        return 0;
      });
    } else setPosicaoFinal([]);
  }, [posicao0, presSem1]);

  React.useEffect(() => {
    const valFinal = [];
    let newValor;

    if (Object.keys(posicao1).length > 0) {
      posicao1.map((vPosicao, i) => {
        if (Object.keys(presCelebracao).length > 0) {
          newValor = presCelebracao?.filter(
            (vPresCelebracao) =>
              Number(vPosicao.Celula) === Number(vPresCelebracao.Celula),
          );

          valFinal[i] = createPontuacaoFinal(
            vPosicao.Celula,
            vPosicao.Distrito,
            vPosicao.Semana,
            vPosicao.relCelula ? vPosicao.relCelula : '',
            newValor.length && newValor[0].NomesMembros ? newValor[0] : '',
            vPosicao.relDiscipulado ? vPosicao.relDiscipulado : '',
            vPosicao.Posicao,
            vPosicao.TotalRank,
            vPosicao.Pontuacao,
            Ano,
            vPosicao.Total,
          );

          setPosicao2(valFinal);
        }
        return 0;
      });
    }
  }, [posicao1, presCelebracao]);

  React.useEffect(() => {
    const valFinal = [];
    let newValor;
    if (Object.keys(posicao2).length > 0) {
      posicao2.map((vPosicao, i) => {
        if (Object.keys(presDisc).length > 0) {
          newValor = presDisc?.filter(
            (vPresDisc) => Number(vPosicao.Celula) === Number(vPresDisc.Celula),
          );
          valFinal[i] = createPontuacaoFinal(
            vPosicao.Celula,
            vPosicao.Distrito,
            vPosicao.Semana,
            vPosicao.relCelula ? vPosicao.relCelula : '',
            vPosicao.relCelebracao ? vPosicao.relCelebracao : '',
            newValor.length && newValor[0].NomesMembros ? newValor[0] : '',
            vPosicao.Posicao,
            vPosicao.TotalRank,
            vPosicao.Pontuacao,
            Ano,
            vPosicao.Total,
          );

          setPosicao3(valFinal);
        }
        return 0;
      });
    }
  }, [posicao2, presDisc, ordem]);
  React.useEffect(() => {
    let novaOrdem = [];
    if (posicao3) {
      if (ordem === 'Celula') {
        novaOrdem = posicao3.sort((a, b) => a.Celula - b.Celula);
      } else novaOrdem = posicao3.sort((a, b) => a.Posicao - b.Posicao);

      setPosicaoFinal(novaOrdem);
    }
  }, [ordem, posicao3]);
  const handleOrdCelula = () => {
    setOrdem('Celula');
  };

  const handleOrdRank = () => {
    setOrdem('Rank');
  };

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          fontSize: '11px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="15%"
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
          width="18%"
          onClick={handleOrdCelula}
        >
          Nº CÉLULA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="16%"
          height="100%"
          onClick={handleOrdRank}
          sx={{
            borderLeft: '1px solid #000',
          }}
        >
          RANK
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="66%"
          sx={{
            borderLeft: '1px solid #000',
          }}
        >
          <Box height="100%" width="100%">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50%"
              width="100%"
              sx={{
                borderBottom: '1px solid #000',
              }}
            >
              RELATÓRIOS - SEMANA{' '}
              {posicao0.length && posicao0[0].Semana && posicao0[0].Semana}
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50%"
              textAlign="center"
              width="100%"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="33%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                CÉLULA
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="33%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                CELEBR.
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="34%"
              >
                DISCIP.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box height="85%">
        {Object.keys(posicaoFinal).length && posicaoFinal[0].Celula ? (
          <TableContainer sx={{ minHeight: 135, height: '100%' }}>
            {posicaoFinal.map((row, index) => (
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                key={index}
                height="8vh"
                minHeight={60}
              >
                <Box
                  sx={{
                    fontFamily: 'arial black',
                  }}
                  fontSize="12px"
                  borderBottom="1px solid #000"
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
                    width="18.1%"
                  >
                    {posicaoFinal[index] ? posicaoFinal[index].Celula : '-'}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="16.1%"
                    sx={{
                      borderLeft: '1px solid #000',
                    }}
                  >
                    {posicaoFinal[index] ? (
                      <Box
                        height="100%"
                        color="blue"
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                      >
                        <Box height="100%">
                          {posicaoFinal[index] &&
                          posicaoFinal[index].Pontuacao ? (
                            <Box
                              height="100%"
                              onClick={() => {
                                setCelulaEnviada(row);
                                setOpenPontuacao(true);
                                if (posicaoFinal[index].relCelula) {
                                  setCelula(posicaoFinal[index].relCelula);
                                } else if (posicaoFinal[index].relCelebracao) {
                                  setCelula(posicaoFinal[index].relCelebracao);
                                } else
                                  setCelula(posicaoFinal[index].relDiscipulado);
                                setPontosF(posicaoFinal[index]);
                              }}
                            >
                              <Box
                                height="60%"
                                fontSize="12px"
                                alignItems="end"
                                justifyContent="center"
                                display="flex"
                              >
                                <AiOutlineFileSearch
                                  color="#780210"
                                  size={25}
                                />
                              </Box>
                              <Box
                                height="40%"
                                color="black"
                                fontSize="12px"
                                alignItems="center"
                                justifyContent="center"
                                display="flex"
                              >
                                {posicaoFinal[index].Posicao}º
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              height="100%"
                              color="blue"
                              alignItems="center"
                              justifyContent="center"
                              display="flex"
                            >
                              -
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      ''
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="21.9%"
                    sx={{
                      borderLeft: '1px solid #000',
                    }}
                  >
                    {posicaoFinal[index].relCelula ? (
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        width="100%"
                      >
                        <Box>
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="100%"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                /*  setValorIndexSend(posicaoFinal[index].Celula);
                              setIndexTabela(index);
                              setDadosCelulaSend(posicaoFinal[index]);
                              setSendResumo(true); */

                                setOpenPlan(true);
                                setCelula(posicaoFinal[index].relCelula);
                              }}
                            >
                              <AiOutlineFileSearch color="#4caf50" size={25} />
                            </IconButton>
                          </Box>

                          {posicaoFinal[index] &&
                          posicaoFinal[index].relCelula &&
                          posicaoFinal[index].relCelula.Data
                            ? ConverteData(
                                posicaoFinal[index].relCelula.Data,
                              ).slice(0, 5)
                            : ''}
                        </Box>
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
                    width="22.0%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {posicaoFinal[index].relCelebracao ? (
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        width="100%"
                      >
                        <Box>
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="100%"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                /*  setValorIndexSend(posicaoFinal[index].Celula);
                              setIndexTabela(index);
                              setDadosCelulaSend(posicaoFinal[index]);
                              setSendResumo(true); */
                                setOpenCeleb(true);
                                setCelula(posicaoFinal[index].relCelebracao);
                              }}
                            >
                              <AiOutlineFileSearch color="#aa00ff" size={25} />
                            </IconButton>
                          </Box>
                          {posicaoFinal[index] &&
                          posicaoFinal[index].relCelebracao &&
                          posicaoFinal[index].relCelebracao.Data
                            ? ConverteData(
                                posicaoFinal[index].relCelebracao.Data,
                              ).slice(0, 5)
                            : ''}
                        </Box>
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
                    width="22.5%"
                  >
                    {posicaoFinal[index].relDiscipulado ? (
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        width="100%"
                      >
                        <Box>
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="100%"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                /*  setValorIndexSend(posicaoFinal[index].Celula);
                              setIndexTabela(index);
                              setDadosCelulaSend(posicaoFinal[index]);
                              setSendResumo(true); */
                                setOpenDisc(true);
                                setCelula(posicaoFinal[index].relDiscipulado);
                              }}
                            >
                              <AiOutlineFileSearch color="#2196f3" size={25} />
                            </IconButton>
                          </Box>
                          {posicaoFinal[index] &&
                          posicaoFinal[index].relDiscipulado &&
                          posicaoFinal[index].relDiscipulado.Data
                            ? ConverteData(
                                posicaoFinal[index].relDiscipulado.Data,
                              ).slice(0, 5)
                            : ''}
                        </Box>
                      </Box>
                    ) : (
                      '-'
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </TableContainer>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="100%"
          >
            {!numeroCelula.length ? (
              <Box>
                <Box
                  fontSize="16px"
                  fontFamily="arial black"
                  mb={5}
                  mt={-2}
                  textAlign="center"
                >
                  SEM RELATÓRIOS
                </Box>
              </Box>
            ) : (
              <Box>
                <Box
                  fontSize="16px"
                  fontFamily="arial black"
                  mb={5}
                  mt={-2}
                  textAlign="center"
                >
                  Buscando Dados
                </Box>
                <Oval stroke="blue" width={50} height={50} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <MostrarRelatorioCelula celula={celula} setOpenPlan={setOpenPlan} />
      </Dialog>
      <Dialog fullScreen open={openCeleb} TransitionComponent={Transition}>
        <MostrarRelatorioCelebracao
          celula={celula}
          setOpenCeleb={setOpenCeleb}
        />
      </Dialog>
      <Dialog fullScreen open={openDisc} TransitionComponent={Transition}>
        <MostrarRelatorioDiscipulado
          celula={celula}
          setOpenDisc={setOpenDisc}
        />
      </Dialog>

      <Dialog fullScreen open={openPontuacao} TransitionComponent={Transition}>
        <CalcularPontuacao
          pontos={pontosF}
          celula={celula}
          setOpenPontuacao={setOpenPontuacao}
          perfilUser={numeroCelula[0]}
          parametros={parametros}
          supervisoes={supervisoes}
          coordenacoes={coordenacoes}
          distritos={distritos}
          dataEnviada={dataEnviada}
          celulaEnviada={celulaEnviada}
          semanaEnviada={contSemana2}
          ano={Ano}
        />
      </Dialog>
    </Box>
  );
}
