import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import EstatisticoDistrito from './estatisticoDistrito';
import EstatisticoCoord from './estatisticoCoord';
import EstatisticoSuper from './estatisticoSuper';
import EstatisticoCelula from './estatisticoCelula';

const theme = createTheme();
theme.typography.h4 = {
  fontSize: '9px',
  '@media (min-width:400px)': {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme.typography.h3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.h2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};

const OrdenarSupervisoes = (supervisoesF) => {
  if (supervisoesF && supervisoesF !== 'inicio') {
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
  }
  return supervisoesF;
};
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
const OrdenarCelulas = (celulasF) => {
  if (celulasF && celulasF !== 'inicio') {
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
  }
  return celulasF;
};
function Celula({
  distritos,
  coordenacoes,
  supervisoes,
  celulas,
  rolMembros,
  igreja,
  lideranca,
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
        newContDistrito = index + 1;
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
        newContDistrito = index + 1;
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
        newContCoord = index + 1;
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
        newContDistrito = index + 1;
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
        newContCoord = index + 1;
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
        newContSuper = index + 1;
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
        newContDistrito = index + 1;
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
        newContCoord = index + 1;
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
        newContSuper = index + 1;
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
        newContCelula = index + 1;
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
  const distritoF = [{ Distrito: 0, Distrito_Nome: 'TODOS OS DISTRITOS' }];
  distritosT.map((val) => distritoF.push(val));

  React.useEffect(() => {
    const coordT = coordenacoes.filter(
      (val) =>
        val.Status &&
        Number(val.Distrito) ===
          Number(distritoF[contNumeroDistrito].Distrito) &&
        val.Status,
    );
    const coordInicial = [
      { coordenacao: 0, Coordenacao_Nome: 'TODAS AS COORDENAÇÕES' },
    ];
    if (contNumeroDistrito !== 0) coordT.map((val) => coordInicial.push(val));
    else coordenacoes.map((val) => coordInicial.push(val));
    if (coordT.length > 1 || !coordT.length)
      setCoordF(OrdenarCoordenacoes(coordInicial));
    else setCoordF(OrdenarCoordenacoes(coordT));
  }, [contNumeroDistrito]);

  React.useEffect(() => {
    if (coordF !== 'inicio' && coordF[contNumeroCoord]) {
      let nSuper;

      if (contNumeroCoord !== 0) {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];

        if (contNumeroDistrito !== 0) {
          nSuper = supervisoes.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(distritoF[contNumeroDistrito].Distrito) &&
              Number(val.Coordenacao) ===
                Number(coordF[contNumeroCoord].Coordenacao),
          );
          if (nSuper) {
            nSuper.map((val) => superInicial.push(val));
          }
          if (nSuper.length > 1 || !nSuper.length) setSuperF(superInicial);
          else setSuperF(nSuper);
        } else {
          nSuper = supervisoes.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(coordF[contNumeroCoord].Distrito) &&
              Number(val.Coordenacao) ===
                Number(coordF[contNumeroCoord].Coordenacao),
          );
          if (nSuper) {
            nSuper.map((val) => superInicial.push(val));
          }

          if (nSuper.length > 1 || !nSuper.length) {
            setSuperF(superInicial);
          } else {
            setSuperF(nSuper);
          }
        }
      } else if (contNumeroDistrito !== 0) {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];

        nSuper = supervisoes.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        nSuper.map((val) => superInicial.push(val));

        if (nSuper.length > 1 || !nSuper.length) setSuperF(superInicial);
        else setSuperF(nSuper);
      } else {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];
        nSuper = OrdenarSupervisoes(supervisoes);
        nSuper.map((val) => superInicial.push(val));

        if (nSuper.length > 1 || !nSuper.length) setSuperF(superInicial);
        else setSuperF(nSuper);
      }
    }
  }, [coordF, contNumeroCoord]);

  React.useEffect(() => {
    if (superF !== 'inicio' && superF.length) {
      let nCelula;

      if (contNumeroDistrito !== 0) {
        if (contNumeroCoord !== 0) {
          if (contNumeroSuper !== 0) {
            // ('os 3 em 1');

            const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
            nCelula = OrdenarCelulas(
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
            if (nCelula.length > 1) {
              nCelula.map((val) => celulaInicial.push(val));
              setCelulaF(celulaInicial);
            } else {
              setCelulaF(nCelula);
            }
          } else {
            // ('distrito e coord em 1 ');

            const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(distritoF[contNumeroDistrito].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao),
              ),
            );
            if (nCelula.length > 1) {
              nCelula.map((val) => celulaInicial.push(val));
              setCelulaF(celulaInicial);
            } else {
              setCelulaF(nCelula);
            }
          }
        } else if (contNumeroSuper !== 0) {
          // ('só Coord  em 0');

          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          nCelula = OrdenarCelulas(
            celulas.filter(
              (val) =>
                Number(val.Distrito) ===
                  Number(distritoF[contNumeroDistrito].Distrito) &&
                Number(val.Supervisao) ===
                  Number(superF[contNumeroSuper].Supervisao),
            ),
          );
          if (nCelula.length > 1) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaF(celulaInicial);
          } else {
            setCelulaF(nCelula);
          }
        } else {
          // ('so distr em 1 - feito');

          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          nCelula = OrdenarCelulas(
            celulas.filter(
              (val) =>
                Number(val.Distrito) ===
                Number(distritoF[contNumeroDistrito].Distrito),
            ),
          );
          if (nCelula.length > 1) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaF(celulaInicial);
          } else {
            setCelulaF(nCelula);
          }
        }
      } else if (contNumeroCoord !== 0) {
        if (contNumeroSuper !== 0) {
          // ('só distrito em 1');
        } else {
          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          if (superF.length > 1) {
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(celulas[contNumeroCelula].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(celulas[contNumeroCelula].Coordenacao),
              ),
            );
          } else {
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(coordF[contNumeroCoord].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao) &&
                  Number(val.Supervisao) ===
                    Number(superF[contNumeroSuper].Supervisao),
              ),
            );
          }

          if (nCelula.length > 1) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaF(celulaInicial);
          } else {
            setCelulaF(nCelula);
          }
        }
      } else if (contNumeroSuper !== 0) {
        // ('só super em 1');

        const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
        nCelula = OrdenarCelulas(
          celulas.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(superF[contNumeroSuper].Distrito) &&
              Number(val.Coordenacao) ===
                Number(superF[contNumeroSuper].Coordenacao) &&
              Number(val.Supervisao) ===
                Number(superF[contNumeroSuper].Supervisao),
          ),
        );
        if (nCelula.length > 1) {
          nCelula.map((val) => celulaInicial.push(val));
          setCelulaF(celulaInicial);
        } else {
          setCelulaF(nCelula);
        }
      } else {
        const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
        nCelula = OrdenarCelulas(celulas);

        nCelula.map((val) => celulaInicial.push(val));

        if (nCelula.length > 1 || !nCelula.length) setCelulaF(celulaInicial);
        else setCelulaF(nCelula);
      }
    }
  }, [superF, contNumeroSuper]);
  //--------------------------------------------------------------------

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
        height="100%"
        width="100%"
        minWidth={300}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box minWidth={300} maxWidth={500} height="94%" width="92%">
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
                <Box mt={0} mb={0} width="100%" height="27%">
                  <Box
                    bgcolor={corIgreja.principal}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display="flex"
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
                        <Box fontFamily="arial" ml={2} mr={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {distritos.length && distritoF[contNumeroDistrito]
                                ? distritoF[contNumeroDistrito].Distrito_Nome
                                : ''}
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
                    display="flex"
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
                        <Box fontFamily="arial" ml={2} mr={2}>
                          <ThemeProvider theme={theme}>
                            <Typography variant="h2">
                              {coordenacoes.length && coordF[contNumeroCoord]
                                ? coordF[contNumeroCoord].Coordenacao_Nome
                                : ''}
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
                    display="flex"
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
                              {supervisoes.length && superF[contNumeroSuper]
                                ? superF[contNumeroSuper].Supervisao_Nome
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
                    display="flex"
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
                                  CÉLULA - {celulasF[contNumeroCelula].Celula}
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
                {contNumeroCoord === 0 &&
                contNumeroSuper === 0 &&
                contNumeroCelula === 0 ? (
                  <Box
                    bgcolor={corIgreja.principal}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={0}
                    mb={0}
                    width="100%"
                    height="73%"
                  >
                    <EstatisticoDistrito
                      rolMembros={rolMembros}
                      distritos={distritos}
                      coordenacoes={coordenacoes}
                      supervisoes={supervisoes}
                      celulas={celulas}
                      igreja={igreja}
                      contNumeroDistrito={contNumeroDistrito}
                    />
                  </Box>
                ) : (
                  <Box
                    bgcolor={corIgreja.principal}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={0}
                    mb={0}
                    width="100%"
                    height="73%"
                  >
                    {contNumeroSuper === 0 &&
                    contNumeroCelula === 0 &&
                    coordF !== 'inicio' &&
                    distritoF !== 'inicio' &&
                    superF !== 'inicio' &&
                    celulasF !== 'inicio' ? (
                      <Box width="100%">
                        <EstatisticoCoord
                          rolMembros={rolMembros}
                          distritos={distritos}
                          coordenacoes={OrdenarCoordenacoes(coordF)}
                          supervisoes={supervisoes}
                          celulas={celulas}
                          igreja={igreja}
                          lideranca={lideranca}
                          contNumeroDistrito={contNumeroDistrito}
                          contNumeroCoord={contNumeroCoord}
                        />
                      </Box>
                    ) : (
                      <Box
                        bgcolor={corIgreja.principal}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mt={0}
                        mb={0}
                        width="100%"
                        height="73%"
                      >
                        {contNumeroCelula === 0 &&
                        coordF !== 'inicio' &&
                        distritoF !== 'inicio' &&
                        superF !== 'inicio' &&
                        celulasF !== 'inicio' ? (
                          <Box width="100%">
                            <EstatisticoSuper
                              rolMembros={rolMembros}
                              distritos={distritos}
                              coordenacoes={OrdenarCoordenacoes(coordF)}
                              supervisoes={OrdenarSupervisoes(superF)}
                              celulas={celulas}
                              igreja={igreja}
                              lideranca={lideranca}
                              contNumeroSuper={contNumeroSuper}
                            />
                          </Box>
                        ) : (
                          <Box width="100%">
                            {coordF !== 'inicio' &&
                            distritoF !== 'inicio' &&
                            superF !== 'inicio' &&
                            celulasF !== 'inicio' &&
                            celulasF.length ? (
                              <EstatisticoCelula
                                rolMembros={rolMembros}
                                distritos={distritos}
                                coordenacoes={OrdenarCoordenacoes(coordF)}
                                supervisoes={OrdenarSupervisoes(superF)}
                                celulas={OrdenarCelulas(celulasF)}
                                igreja={igreja}
                                lideranca={lideranca}
                                contNumeroCelula={contNumeroCelula}
                              />
                            ) : (
                              <Box
                                fontFamily="Fugaz One"
                                color="white"
                                height="100%"
                                width="100%"
                                textAlign="center"
                              >
                                AGUARDE...
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Celula;
