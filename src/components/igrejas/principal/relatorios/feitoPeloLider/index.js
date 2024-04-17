import { Box, Grid } from '@material-ui/core';
import React from 'react';
import PegaSemanaMes from 'src/utils/getSemanaMes';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PegaSemanaAtual from 'src/utils/getSemanaAtual';

import PegaMes from 'src/utils/getMes';
import PegaQuarta from 'src/utils/getDataQuarta';
import Meses from 'src/utils/mesesAbrev';

import TamanhoJanela from 'src/utils/getSize';
import TabCelula from './tabRelCelulas';

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
//------------------------------------------
const janela = TamanhoJanela();

const OrdenarCoordenacoes = (coordenacoesF) => {
  if (coordenacoesF.length && coordenacoesF !== 'inicio') {
    coordenacoesF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return coordenacoesF;
};

function RelCelula({
  distritos,
  celulas,
  coordenacoes,
  perfilUser,
  lideranca,
  parametros,
  supervisoes,
}) {
  //= ================================================================
  const mes = Meses();

  const dataAtual = new Date(); // new Date();
  const mesAtual = Number(dataAtual.getMonth());
  const anoAtual = Number(dataAtual.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const semanaAtual = PegaSemanaAtual(dataAtual);

  // const mesSemana = PegaMes(semanaAtual, anoAtual);
  const semanaMes = PegaSemanaMes(dataAtual); // pega a semana certa do mes
  const [contSemanaMes, setContSemanaMes] = React.useState(semanaMes);

  const [contSemana, setContSemana] = React.useState(semanaAtual);
  const [dataEnviada, setDataEnviada] = React.useState('');
  const [celulaSetor, setCelulaSetor] = React.useState(0);
  const [setor, setSetor] = React.useState(0);
  //= ========================================================
  let newContDistrito = 0;
  let newContCoord = 0;

  if (perfilUser.Funcao === 'PastorDistrito') {
    distritos.map((val, index) => {
      if (Number(val.Distrito) === Number(perfilUser.Distrito)) {
        newContDistrito = index + 1;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Coordenador') {
    distritos.map((val, index) => {
      if (Number(val.Distrito) === Number(perfilUser.Distrito)) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    coordenacoes.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao)
      ) {
        newContCoord = index + 1;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Supervisor') {
    distritos.map((val, index) => {
      if (Number(val.Distrito) === Number(perfilUser.Distrito)) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    coordenacoes.map((val, index) => {
      if (Number(val.Coordenacao) === Number(perfilUser.Coordenacao)) {
        newContCoord = index + 1;
      }
      return 0;
    });
  }

  if (
    perfilUser.Funcao === 'Lider' ||
    perfilUser.Funcao === 'Membro' ||
    perfilUser.Funcao === 'Professor'
  ) {
    distritos.map((val, index) => {
      if (Number(val.Distrito) === Number(perfilUser.Distrito)) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    coordenacoes.map((val, index) => {
      if (Number(val.Coordenacao) === Number(perfilUser.Coordenacao)) {
        newContCoord = index + 1;
      }
      return 0;
    });
  }
  const [contNumeroDistrito, setContNumeroDistrito] =
    React.useState(newContDistrito);
  const [contNumeroCoord, setContNumeroCoord] = React.useState(newContCoord);
  const [coordF, setCoordF] = React.useState('inicio');

  const distritosT = distritos?.filter((val) => val.Status);
  const distritoF = [];
  distritosT.map((val) => distritoF.push(val));

  React.useEffect(() => {
    const coordT = coordenacoes?.filter(
      (val) =>
        val.Status &&
        Number(val.Distrito) ===
          Number(distritoF[contNumeroDistrito].Distrito) &&
        val.Status,
    );

    const coordInicial = [
      { Coordenacao: 0, Coordenacao_Nome: 'TODAS AS COORDENAÇÕES' },
    ];
    coordT.map((val) => coordInicial.push(val));
    if (coordT.length > 1 || !coordT.length)
      setCoordF(OrdenarCoordenacoes(coordInicial));
    else setCoordF(OrdenarCoordenacoes(coordT));
  }, [contNumeroDistrito]);

  React.useEffect(() => {
    if (coordF !== 'inicio') {
      if (Number(coordF[contNumeroCoord].Coordenacao) !== 0) {
        const celulasF = celulas?.filter(
          (val) =>
            Number(val.Distrito) === Number(coordF[contNumeroCoord].Distrito) &&
            Number(val.Coordenacao) ===
              Number(coordF[contNumeroCoord].Coordenacao),
        );

        const superF = supervisoes?.filter(
          (val) =>
            Number(val.Distrito) === Number(coordF[contNumeroCoord].Distrito) &&
            Number(val.Coordenacao) ===
              Number(coordF[contNumeroCoord].Coordenacao),
        );
        setCelulaSetor(celulasF);
        setSetor(superF);
      } else {
        const celulasF = celulas?.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );

        const superF = supervisoes?.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        setSetor(superF);
        setCelulaSetor(celulasF);
      }
    }
  }, [coordF, contNumeroCoord]);

  const handleIncDistrito = () => {
    let contDistritoAtual = contNumeroDistrito + 1;

    if (contDistritoAtual > distritoF.length - 1) contDistritoAtual = 0;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
  };
  const handleDecDistrito = () => {
    let contDistritoAtual = contNumeroDistrito - 1;

    if (contDistritoAtual < 0) contDistritoAtual = distritoF.length - 1;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
  };

  const handleIncCoord = () => {
    let contCoordAtual = contNumeroCoord + 1;

    if (contCoordAtual > coordF.length - 1) contCoordAtual = 0;
    setContNumeroCoord(contCoordAtual);
  };

  const handleDecCoord = () => {
    let contCoordAtual = contNumeroCoord - 1;

    if (contCoordAtual < 0) contCoordAtual = coordF.length - 1;
    setContNumeroCoord(contCoordAtual);
  };
  //= ========================================================

  const lideresSetor = lideranca?.sort((a, b) => {
    if (Number(a.Celula) > Number(b.Celula)) return 1;
    if (Number(b.Celula) > Number(a.Celula)) return -1;
    return 0;
  });

  const listaSetor = lideresSetor.sort((a, b) => {
    if (Number(a.Coordenacao) > Number(b.Coordenacao)) return 1;
    if (Number(b.Coordenacao) > Number(a.Coordenacao)) return -1;
    return 0;
  });

  const numberSuper = listaSetor.map((itens) => itens.Coordenacao);
  const uniqueArrSuper = [...new Set(numberSuper)];
  const numeroSupervisao = uniqueArrSuper;

  const numeroSetorIni = numeroSupervisao.map((val) => val);
  numeroSetorIni.unshift('TODAS AS COORDENAÇÕES');

  //  const tipo = ['Relatório das Células', 'Relatório Geral'];
  const [contTipo] = React.useState(false);

  React.useEffect(() => {}, []);

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
    let simple = PegaSemanaMes(new Date(ano2, 0, 1 + contSemanaAtual * 7));
    let mesAgora = new Date(ano2, 0, 1 + contSemanaAtual * 7).getMonth();

    if (Number(simple) < 1) {
      mesAgora -= 1;
      simple = 5;
    }
    const diaF = PegaQuarta(contSemanaAtual, ano2).getDate();
    const mesF = PegaQuarta(contSemanaAtual, ano2).getMonth();
    const anoF = PegaQuarta(contSemanaAtual, ano2).getFullYear();
    const diaFF = diaF > 9 ? diaF : `0${diaF}`;
    const mesFF = mesF + 1 > 9 ? mesF + 1 : `0${mesF + 1}`;
    const dtFinal = `${diaFF}/${mesFF}/${anoF}`;
    setDataEnviada(dtFinal);

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

    let simple = PegaSemanaMes(new Date(ano2, 0, 1 + contSemanaAtual * 7));

    let mesAgora = new Date(ano2, 0, 1 + contSemanaAtual * 7).getMonth();
    const diaF = PegaQuarta(contSemanaAtual, ano2).getDate();
    const mesF = PegaQuarta(contSemanaAtual, ano2).getMonth();
    const anoF = PegaQuarta(contSemanaAtual, ano2).getFullYear();

    const diaFF = diaF > 9 ? diaF : `0${diaF}`;
    const mesFF = mesF + 1 > 9 ? mesF + 1 : `0${mesF + 1}`;
    const dtFinal = `${diaFF}/${mesFF}/${anoF}`;
    setDataEnviada(dtFinal);
    if (Number(simple) < 1) {
      mesAgora -= 1;
      simple = 5;
    }

    setContSemanaMes(simple);
    setContMes(mesAgora);
    setContSemana(contSemanaAtual);
  };
  React.useEffect(() => {
    const diaSemana = dataAtual.getDay();

    if (diaSemana !== 1 && diaSemana !== 2) handleDecSemana();
    const contSemanaAtual = contSemana;
    const ano2 = contAno;
    let simple = PegaSemanaMes(new Date(ano2, 0, 1 + contSemanaAtual * 7));

    if (Number(simple) < 1) {
      simple = 5;
    }
    const diaF = PegaQuarta(contSemanaAtual, ano2).getDate();
    const mesF = PegaQuarta(contSemanaAtual, ano2).getMonth();
    const anoF = PegaQuarta(contSemanaAtual, ano2).getFullYear();
    const diaFF = diaF > 9 ? diaF : `0${diaF}`;
    const mesFF = mesF + 1 > 9 ? mesF + 1 : `0${mesF + 1}`;
    const dtFinal = `${diaFF}/${mesFF}/${anoF}`;
    setDataEnviada(dtFinal);
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
        height="94%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
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
              <Box bgcolor="gray" width="95.5%" mt={1} ml={0} borderRadius={6}>
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
                        <ThemeProvider theme={theme}>
                          <Typography variant="h4">
                            {contSemanaMes}ª SEMANA
                          </Typography>
                        </ThemeProvider>

                        <Box
                          ml={4}
                          color="white"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          sx={{ fontFamily: 'Fugaz One' }}
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="h4">
                              {mes[contMes].descricao.toLocaleUpperCase()} /{' '}
                              {contAno}
                            </Typography>
                          </ThemeProvider>
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
                      bgcolor="#f4ff81"
                      width="100%"
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
                            handleDecDistrito();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="h4">
                            {distritoF[contNumeroDistrito].Distrito_Nome}
                          </Typography>
                        </ThemeProvider>
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
                            handleIncDistrito();
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
                      bgcolor="#c5cae9"
                      width="100%"
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
                            handleDecCoord();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="h4">
                            {coordF[contNumeroCoord].Coordenacao_Nome}
                          </Typography>
                        </ThemeProvider>
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
                            handleIncCoord();
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
                  height="96%"
                  minHeight={225}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  {!contTipo && celulaSetor.length ? (
                    <TabCelula
                      dataEnviada={dataEnviada}
                      Ano={contAno}
                      contSemana={contSemana}
                      numeroCelula={celulaSetor}
                      parametros={parametros}
                      supervisoes={setor}
                      coordenacoes={coordF[contNumeroCoord]}
                      distritos={distritoF[contNumeroDistrito]}
                    />
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
