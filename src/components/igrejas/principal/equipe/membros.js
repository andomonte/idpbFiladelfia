import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ListaMembrosDistrito from './listaMembros';

const theme = createTheme();
theme.typography.h4 = {
  fontSize: '9px',
  '@media (min-width:350px)': {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme.typography.h3 = {
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

const OrdenarSupervisoes = (supervisoesF) => {
  supervisoesF.sort((a, b) => {
    if (a.Celula > b.Celula) {
      return 1;
    }
    if (a.Celula < b.Celula) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  supervisoesF.sort((a, b) => {
    if (a.Distrito > b.Distrito) {
      return 1;
    }
    if (a.Distrito < b.Distrito) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return supervisoesF;
};
const OrdenarCoordenacoes = (coordenacoesF) => {
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

  return coordenacoesF;
};
const OrdenarCelulas = (celulasF) => {
  celulasF.sort((a, b) => {
    if (a.Celula > b.Celula) {
      return 1;
    }
    if (a.Celula < b.Celula) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  celulasF.sort((a, b) => {
    if (a.Distrito > b.Distrito) {
      return 1;
    }
    if (a.Distrito < b.Distrito) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return celulasF;
};
function Celula({
  distritos,
  coordenacoes,
  supervisoes,
  celulas,
  rolMembros,
  igreja,

  perfilUser,
}) {
  let newContDistrito = 0;
  let newContCoord = 0;
  let newContSuper = 0;
  let newContCelula = 0;
  if (perfilUser.Funcao === 'PastorDistrito') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Coordenador') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index;
      }
      return 0;
    });
    const newCoord = coordenacoes.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );
    newCoord?.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        newCoord.length > 1
      ) {
        newContCoord = index;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Supervisor') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index;
      }
      return 0;
    });
    const newCoord = coordenacoes.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );

    newCoord.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        newCoord.length > 1
      ) {
        newContCoord = index;
      }
      return 0;
    });
    const newSuper = supervisoes.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao),
    );

    newSuper.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newSuper.length > 1
      ) {
        newContSuper = index;
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
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index;
      }
      return 0;
    });
    const newCoord = coordenacoes.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );
    newCoord.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        newCoord.length > 1
      ) {
        newContCoord = index;
      }
      return 0;
    });
    const newSuper = supervisoes.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao),
    );
    newSuper.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newSuper.length > 1
      ) {
        newContSuper = index;
      }
      return 0;
    });

    const newCelulas = celulas.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        val.Coordenacao === Number(perfilUser.Coordenacao) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao),
    );

    newCelulas.map((val, index) => {
      if (
        Number(val.Celula) === Number(perfilUser.Celula) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newCelulas.length > 1
      ) {
        newContCelula = index;
      }
      return 0;
    });
  }
  const [contNumeroDistrito, setContNumeroDistrito] =
    React.useState(newContDistrito);
  const [contNumeroCoord, setContNumeroCoord] = React.useState(newContCoord);
  const [contNumeroSuper, setContNumeroSuper] = React.useState(newContSuper);
  const [contNumeroCelula, setContNumeroCelula] = React.useState(newContCelula);

  const [coordF, setCoordF] = React.useState('inicio');
  const [superF, setSuperF] = React.useState('inicio');
  const [celulasF, setCelulaF] = React.useState(0);
  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================
  const distritosT = distritos.filter((val) => val.Status);
  const distritoF = [];
  distritosT.map((val) => distritoF.push(val));

  React.useEffect(() => {
    const coordT = coordenacoes.filter(
      (val) =>
        val.Status &&
        Number(val.Distrito) ===
          Number(distritoF[contNumeroDistrito].Distrito) &&
        val.Status,
    );
    setCoordF(OrdenarCoordenacoes(coordT));
  }, [contNumeroDistrito]);

  React.useEffect(() => {
    if (coordF !== 'inicio' && coordF[contNumeroCoord]) {
      const nSuper = supervisoes.filter(
        (val) =>
          Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito) &&
          Number(val.Coordenacao) ===
            Number(coordF[contNumeroCoord].Coordenacao),
      );
      setSuperF(OrdenarSupervisoes(nSuper));
    }
  }, [coordF, contNumeroCoord]);

  React.useEffect(() => {
    if (superF !== 'inicio' && superF.length) {
      const nCelula = OrdenarCelulas(
        celulas.filter(
          (val) =>
            Number(val.Distrito) ===
              Number(distritoF[contNumeroDistrito].Distrito) &&
            Number(val.Coordenacao) ===
              Number(coordF[contNumeroCoord].Coordenacao) &&
            Number(val.Supervisao) ===
              Number(superF[contNumeroSuper].Supervisao),
        ),
      );

      setCelulaF(nCelula);
    }
  }, [superF, contNumeroSuper]);
  //= ===================================================================

  //--------------------------------------------------------

  //----------------------------------------------------------------

  const handleIncDistrito = () => {
    let contDistritoAtual = contNumeroDistrito + 1;

    if (contDistritoAtual > distritoF.length - 1) contDistritoAtual = 0;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleDecDistrito = () => {
    let contDistritoAtual = contNumeroDistrito - 1;

    if (contDistritoAtual < 0) contDistritoAtual = distritoF.length - 1;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleIncCoord = () => {
    let contCoordAtual = contNumeroCoord + 1;

    if (contCoordAtual > coordF.length - 1) contCoordAtual = 0;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleDecCoord = () => {
    let contCoordAtual = contNumeroCoord - 1;

    if (contCoordAtual < 0) contCoordAtual = coordF.length - 1;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleIncSuper = () => {
    let contSuperAtual = contNumeroSuper + 1;

    if (contSuperAtual > superF.length - 1) contSuperAtual = 0;
    setContNumeroSuper(contSuperAtual);
    setContNumeroCelula(0);
  };

  const handleDecSuper = () => {
    let contSuperAtual = contNumeroSuper - 1;

    if (contSuperAtual < 0) contSuperAtual = superF.length - 1;
    setContNumeroSuper(contSuperAtual);
    setContNumeroCelula(0);
  };

  const handleIncCelula = () => {
    let contCelulaAtual = contNumeroCelula + 1;

    if (contCelulaAtual > celulasF.length - 1) contCelulaAtual = 0;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleDecCelula = () => {
    let contCelulaAtual = contNumeroCelula - 1;

    if (contCelulaAtual < 0) contCelulaAtual = celulasF.length - 1;
    setContNumeroCelula(contCelulaAtual);
  };

  //= ===================================================================

  return (
    <Box
      height="90vh"
      minHeight={600}
      minWidth={300}
      width="100vw"
      bgcolor={corIgreja.principal2}
    >
      <Box
        width="100%"
        minWidth={300}
        height="100%"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box minWidth={300} maxWidth={500} mt="2vh" height="96%" width="92%">
          <Box width="100%" height="100%">
            <Box
              borderRadius={16}
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight={500}
              minWidth={300}
              width="100%"
              bgcolor={corIgreja.principal}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={0}
                mb={0}
                width="100%"
                height="100%"
              >
                <Box mt={0} mb={0} width="100%">
                  <Box
                    bgcolor={corIgreja.principal}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display={
                      distritoF.length > 1 && perfilUser.Funcao === 'Presidente'
                        ? 'flex'
                        : 'none'
                    }
                    height={38}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display={distritoF.length > 1 ? 'flex' : 'none'}
                        justifyContent="center"
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
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color={
                          distritoF.length &&
                          distritoF[contNumeroDistrito] &&
                          Number(distritoF[contNumeroDistrito].Distrito) ===
                            Number(perfilUser.Distrito)
                            ? corIgreja.textoP
                            : corIgreja.textoS
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        <Box fontFamily="arial" ml={0} mr={0}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">DISTRITO: </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box fontFamily="arial" ml={1} mr={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {distritos.length &&
                              distritoF[contNumeroDistrito] &&
                              distritoF[contNumeroDistrito].Distrito_Nome >
                                10 ? (
                                distritoF[
                                  contNumeroDistrito
                                ].Distrito_Nome.substring(
                                  0,
                                  distritoF[
                                    contNumeroDistrito
                                  ].Distrito_Nome.lastIndexOf(' '),
                                ).toUpperCase()
                              ) : (
                                <Box>
                                  {distritos.length &&
                                  distritoF !== 'inicio' &&
                                  distritoF[contNumeroDistrito]
                                    ? distritoF[
                                        contNumeroDistrito
                                      ].Distrito_Nome.toUpperCase()
                                    : ''}
                                </Box>
                              )}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                      <Box
                        width="10%"
                        display={distritoF.length > 1 ? 'flex' : 'none'}
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
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    bgcolor={corIgreja.principal}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display={
                      perfilUser.Funcao === 'Presidente' ||
                      perfilUser.Funcao === 'PastorDistrito'
                        ? 'flex'
                        : 'none'
                    }
                    height={38}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display={coordF.length > 1 ? 'flex' : 'none'}
                        justifyContent="center"
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
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>

                      <Box
                        width="100%"
                        ml={0}
                        color={
                          coordF.length &&
                          coordF[contNumeroCoord] &&
                          Number(coordF[contNumeroCoord].Distrito) ===
                            Number(perfilUser.Distrito) &&
                          Number(coordF[contNumeroCoord].Coordenacao) ===
                            Number(perfilUser.Coordenacao)
                            ? corIgreja.textoP
                            : corIgreja.textoS
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        <Box fontFamily="arial" ml={0} mr={0}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">COORD.: </Typography>
                          </ThemeProvider>
                        </Box>

                        <Box fontFamily="arial" ml={1} mr={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {coordenacoes.length &&
                              coordF[contNumeroCoord] &&
                              coordF !== 'inicio' &&
                              coordF[contNumeroCoord].Coordenacao_Nome.length >
                                20 ? (
                                coordF[
                                  contNumeroCoord
                                ].Coordenacao_Nome.substring(
                                  0,
                                  coordF[
                                    contNumeroCoord
                                  ].Coordenacao_Nome.lastIndexOf(' '),
                                ).toUpperCase()
                              ) : (
                                <Box>
                                  {coordenacoes.length &&
                                  coordF !== 'inicio' &&
                                  coordF[contNumeroCoord]
                                    ? coordF[
                                        contNumeroCoord
                                      ].Coordenacao_Nome.toUpperCase()
                                    : ''}
                                </Box>
                              )}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                      <Box
                        width="10%"
                        display={coordF.length > 1 ? 'flex' : 'none'}
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
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    bgcolor={corIgreja.principal}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display={
                      perfilUser.Funcao === 'Presidente' ||
                      perfilUser.Funcao === 'PastorDistrito' ||
                      perfilUser.Funcao === 'Coordenador'
                        ? 'flex'
                        : 'none'
                    }
                    height={38}
                    style={{
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display={superF.length > 1 ? 'flex' : 'none'}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecSuper();
                          }}
                        >
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color={
                          superF.length &&
                          superF[contNumeroSuper] &&
                          Number(superF[contNumeroSuper].Distrito) ===
                            Number(perfilUser.Distrito) &&
                          Number(superF[contNumeroSuper].Coordenacao) ===
                            Number(perfilUser.Coordenacao) &&
                          Number(superF[contNumeroSuper].Supervisao) ===
                            Number(perfilUser.Supervisao)
                            ? corIgreja.textoP
                            : corIgreja.textoS
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        <Box fontFamily="arial" ml={2} mr={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {supervisoes.length &&
                              superF[contNumeroSuper].Supervisao_Nome &&
                              superF[contNumeroSuper]
                                ? superF[
                                    contNumeroSuper
                                  ].Supervisao_Nome.toUpperCase()
                                : ''}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                      <Box
                        width="10%"
                        display={superF.length > 1 ? 'flex' : 'none'}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncSuper();
                          }}
                        >
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    bgcolor={corIgreja.principal}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display={
                      perfilUser.Funcao === 'Presidente' ||
                      perfilUser.Funcao === 'PastorDistrito' ||
                      perfilUser.Funcao === 'Coordenador' ||
                      perfilUser.Funcao === 'Supervisor'
                        ? 'flex'
                        : 'none'
                    }
                    height={38}
                    style={{
                      borderTop: '1px solid #f0f0f0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display={celulasF.length > 1 ? 'flex' : 'none'}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCelula();
                          }}
                        >
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color={
                          celulasF.length &&
                          celulasF[contNumeroCelula] &&
                          Number(celulasF[contNumeroCelula].Distrito) ===
                            Number(perfilUser.Distrito) &&
                          Number(celulasF[contNumeroCelula].Coordenacao) ===
                            Number(perfilUser.Coordenacao) &&
                          Number(celulasF[contNumeroCelula].Supervisao) ===
                            Number(perfilUser.Supervisao) &&
                          Number(celulasF[contNumeroCelula].Celula) ===
                            Number(perfilUser.Celula)
                            ? corIgreja.textoP
                            : corIgreja.textoS
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        <Box
                          display={
                            celulasF[contNumeroCelula] &&
                            celulasF[contNumeroCelula].Celula === 0
                              ? 'none'
                              : 'flex'
                          }
                          fontFamily="arial"
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {celulas.length && celulasF[contNumeroCoord] ? (
                                <Box>
                                  {' '}
                                  CÉLULA -{' '}
                                  {celulasF.length &&
                                    celulasF[contNumeroCelula] &&
                                    celulasF[contNumeroCelula].Celula}
                                </Box>
                              ) : (
                                ''
                              )}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box fontFamily="arial" ml={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {celulas.length && celulasF[contNumeroCelula]
                                ? celulasF[contNumeroCelula].Nome
                                : ''}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </Box>
                      <Box
                        width="10%"
                        display={celulasF.length > 1 ? 'flex' : 'none'}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncCelula();
                          }}
                        >
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={0}
                  mb={0}
                  width="100%"
                  height="100%"
                >
                  {celulasF.length &&
                  celulasF[contNumeroCelula] &&
                  superF.length &&
                  superF[contNumeroSuper] &&
                  coordF.length &&
                  coordF[contNumeroCoord] &&
                  distritoF.length &&
                  distritoF[contNumeroDistrito] ? (
                    <ListaMembrosDistrito
                      perfilUser={perfilUser}
                      rolMembros={rolMembros}
                      distritos={distritoF[contNumeroDistrito]}
                      coordenacoes={coordF[contNumeroCoord]}
                      supervisoes={superF[contNumeroSuper]}
                      celulas={celulasF[contNumeroCelula]}
                      igreja={igreja}
                      contNumeroDistrito={contNumeroDistrito}
                    />
                  ) : (
                    <Box>BUSCANDO DADOS...</Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Celula;
