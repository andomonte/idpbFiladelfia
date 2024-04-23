import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/roboto-mono'; // Padrões para peso 400.
import '@fontsource/rubik';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TabLideres from './abas/tabLideres';
import BuscarNome from './abas/buscarNome';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
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
function Funcao({
  coordenacoes,
  distritos,
  perfilUser,
  lideranca,
  rolMembros,
}) {
  let newContDistrito = 0;
  let newContCoord = 0;

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
  }
  const [contNumeroDistrito, setContNumeroDistrito] =
    React.useState(newContDistrito);
  const [contNumeroCoord, setContNumeroCoord] = React.useState(newContCoord);
  const [distritoF, setDistritoF] = React.useState('inicio');
  const [coordF, setCoordF] = React.useState('inicio');

  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const funcoesPresidente = [
    { funcao: 'PastorDistrito', label: 'Pastores de Distritos' },
    { funcao: 'Coordenador', label: 'Coordenadores' },
    { funcao: 'Supervisor', label: 'Supervisores' },
    { funcao: 'Lider', label: 'LÍDERES' },
    { funcao: 'Professor', label: 'PROFESSORES' },
  ];
  const funcoesPastorDistrito = [
    { funcao: 'Coordenador', label: 'Coordenadores' },
    { funcao: 'Supervisor', label: 'Supervisores' },
    { funcao: 'Lider', label: 'LÍDERES' },
    { funcao: 'Professor', label: 'PROFESSORES' },
  ];
  const funcoesCoord = [
    { funcao: 'Supervisor', label: 'Supervisores' },
    { funcao: 'Lider', label: 'LÍDERES' },
    { funcao: 'Professor', label: 'PROFESSORES' },
  ];
  const funcoesSuper = [
    { funcao: 'Lider', label: 'LÍDERES' },
    { funcao: 'Professor', label: 'PROFESSORES' },
  ];

  const [contNumeroFucao, setContNumeroFucao] = React.useState(0);
  //= ===================================================================
  let numeroFuncoes = '';
  if (perfilUser.Funcao === 'Presidente') numeroFuncoes = funcoesPresidente;
  if (perfilUser.Funcao === 'PastorDistrito')
    numeroFuncoes = funcoesPastorDistrito;
  if (perfilUser.Funcao === 'Coordenador') numeroFuncoes = funcoesCoord;
  if (perfilUser.Funcao === 'Supervisor') numeroFuncoes = funcoesSuper;

  //= ===================================================================
  React.useEffect(() => {
    if (distritos) {
      const distritosT = distritos.filter((val) => val.Status);
      setDistritoF(distritosT);
    }
  }, []);

  React.useEffect(() => {
    if (
      distritoF !== 'inicio' &&
      distritos.length &&
      distritoF[contNumeroDistrito]
    ) {
      const nCoord = OrdenarCoordenacoes(
        coordenacoes.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        ),
      );

      setCoordF(nCoord);
    }
  }, [contNumeroDistrito, distritoF]);

  //----------------------------------------------------------------
  const handleIncFucao = () => {
    let contFuncaoAtual = contNumeroFucao + 1;
    if (contFuncaoAtual > numeroFuncoes.length - 1) contFuncaoAtual = 0;
    setContNumeroFucao(contFuncaoAtual);
  };
  const handleDecFucao = () => {
    let contFuncaoAtual = contNumeroFucao - 1;

    if (contFuncaoAtual < 0) contFuncaoAtual = numeroFuncoes.length - 1;
    setContNumeroFucao(contFuncaoAtual);
  };
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

  return (
    <Box
      height="90vh"
      minHeight={570}
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
              minHeight={570}
              minWidth={300}
              width="100%"
              bgcolor={corIgreja.principal}
            >
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
                height={50}
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
                          distritoF[contNumeroDistrito].Distrito_Nome > 10 ? (
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
                style={{
                  borderBottom: '1px solid #f0f0f0',
                }}
                justifyContent="center"
                width="100%"
                display={
                  perfilUser.Funcao === 'Presidente' ||
                  perfilUser.Funcao === 'PastorDistrito'
                    ? 'flex'
                    : 'none'
                }
                height={50}
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
                            coordF[contNumeroCoord].Coordenacao_Nome.substring(
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
              <Box justifyContent="center" width="100%" display="flex">
                <Box
                  bgcolor={corIgreja.principal}
                  borderTop="1px"
                  color="#000"
                  justifyContent="center"
                  width="100%"
                  display="flex"
                  height={50}
                >
                  <Box ml={0} width="100%" display="flex">
                    <Box
                      width="10%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          handleDecFucao();
                        }}
                      >
                        <BiCaretLeft size={30} color="#f0f0f0" />
                      </IconButton>
                    </Box>
                    <Box
                      width="100%"
                      ml={0}
                      color="#f0f0f0"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="16px"
                      sx={{ fontFamily: 'Fugaz One' }}
                    >
                      {numeroFuncoes[contNumeroFucao].label.toLocaleUpperCase()}
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
                          handleIncFucao();
                        }}
                      >
                        <BiCaretRight size={30} color="#f0f0f0" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                height="100%"
                minHeight={315}
                display="flex"
                bgcolor="#fafafa"
                width="100%"
                sx={{
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                {numeroFuncoes[contNumeroFucao] &&
                distritoF !== 'inicio' &&
                coordF !== 'inicio' ? (
                  <TabLideres
                    setBuscarNome={setBuscarNome}
                    lideranca={lideranca}
                    perfilUser={perfilUser}
                    setOpenBuscar={setOpenBuscar}
                    Funcao={numeroFuncoes[contNumeroFucao].funcao}
                    rolMembros={rolMembros}
                    Distrito={distritoF[contNumeroDistrito]}
                    Coordenacao={coordF[contNumeroCoord]}
                  />
                ) : (
                  'AGUARDE...'
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog fullScreen open={openBuscar} TransitionComponent={Transition}>
        <BuscarNome
          perfilUser={perfilUser}
          nomeBuscado={buscarNome}
          setOpenBuscar={setOpenBuscar}
        />
      </Dialog>
    </Box>
  );
}

export default Funcao;
