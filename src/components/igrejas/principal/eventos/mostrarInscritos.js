import { Box, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/roboto-mono'; // Padrões para peso 400.
import '@fontsource/rubik';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Image from 'next/image';
//--------------------------------------------------------------------------
const bannerBlurHash =
  'data:image/webp;base64,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';
//--------------------------------------------------------------------------

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '9px',
  '@media (min-width:350px)': {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme.typography.hs3 = {
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
theme.typography.hs2 = {
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
function createListaIgrejas(label, value) {
  return {
    label,
    value,
  };
}
function Funcao({ setOpenInscritos, nomesIgrejas, evento }) {
  const [contNumeroIgreja, setContNumeroIgreja] = React.useState(0);
  const [listaInscritos, setListaInscritos] = React.useState([]);
  const [newListaInscritos, setNewListaInscritos] = React.useState([]);
  const [adultos, setAdultos] = React.useState(0);
  const [criancas1, setCriancas1] = React.useState(0);
  const [criancas2, setCriancas2] = React.useState(0);
  const [listaIgrejaF, setListaIgrejaF] = React.useState({
    label: 'TODAS AS IGREJA',
    value: 0,
  });

  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscritosEventosTipo/${evento.Evento}`;
      const res = await axios.get(url);

      if (res.data) {
        setListaInscritos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  React.useEffect(async () => {
    if (nomesIgrejas.length) {
      const newListaIgreja = [
        {
          label: 'TODAS AS IGREJAS',
          value: 0,
        },
      ];
      nomesIgrejas.map((val, index) => {
        newListaIgreja[index + 1] = createListaIgrejas(val.nomeNucleo, index);
        return 0;
      });

      if (newListaIgreja.length) setListaIgrejaF(newListaIgreja);
    }
  }, [nomesIgrejas]);
  React.useEffect(async () => {
    let adultoF = 0;
    let c1F = 0;
    let c2F = 0;
    if (listaIgrejaF.length && listaInscritos) {
      if (listaIgrejaF[contNumeroIgreja].label === 'TODAS AS IGREJAS') {
        adultoF = listaInscritos
          .map((item) => {
            if (item.qtyAdultos !== undefined) return item.qtyAdultos;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        c1F = listaInscritos
          .map((item) => {
            if (item.qtyCriancas1 !== undefined) return item.qtyCriancas1;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        c2F = listaInscritos
          .map((item) => {
            if (item.qtyCriancas2 !== undefined) return item.qtyCriancas2;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        setNewListaInscritos(listaInscritos);
      } else {
        const listaInscritos2 = listaInscritos?.filter(
          (val) => val.Igreja === listaIgrejaF[contNumeroIgreja].label,
        );

        adultoF = listaInscritos2
          ?.map((item) => {
            if (item.qtyAdultos !== undefined) return item.qtyAdultos;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        c1F = listaInscritos2
          .map((item) => {
            if (item.qtyCriancas1 !== undefined) return item.qtyCriancas1;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        c2F = listaInscritos2
          .map((item) => {
            if (item.qtyCriancas2 !== undefined) return item.qtyCriancas2;
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);
        setNewListaInscritos(listaInscritos2);
      }
      setAdultos(adultoF);
      setCriancas1(c1F);
      setCriancas2(c2F);
    }
  }, [contNumeroIgreja, listaIgrejaF, listaInscritos]);
  //= ===================================================================
  const handleIncIgreja = () => {
    let contDistritoAtual = contNumeroIgreja + 1;

    if (contDistritoAtual > listaIgrejaF.length - 1) contDistritoAtual = 0;
    setContNumeroIgreja(contDistritoAtual);
  };

  const handleDecIgreja = () => {
    let contDistritoAtual = contNumeroIgreja - 1;

    if (contDistritoAtual < 0) contDistritoAtual = listaIgrejaF.length - 1;
    setContNumeroIgreja(contDistritoAtual);
  };
  //= ===================================================================

  //----------------------------------------------------------------

  return (
    <Box
      height="100vh"
      minHeight={600}
      minWidth={300}
      width="100vw"
      bgcolor={corIgreja.principal}
    >
      <Box
        width="100%"
        height="100%"
        minWidth={300}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100%">
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="end"
            fontFamily="Fugaz One"
            color="white"
            height="5%"
          >
            {evento ? evento.Evento.toLocaleUpperCase() : ''}
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height="8%"
            width="100%"
            display="flex"
          >
            <Box
              bgcolor={corIgreja.principal2}
              color="#000"
              justifyContent="center"
              width="90%"
              display="flex"
              height={38}
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
                      handleDecIgreja();
                    }}
                  >
                    <BiCaretLeft size={30} color="#f0f0f0" />
                  </IconButton>
                </Box>
                <Box
                  width="100%"
                  ml={0}
                  color={corIgreja.textoS}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="16px"
                  sx={{ fontFamily: 'Fugaz One' }}
                >
                  <Box ml={2} mr={2}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs2">
                        {listaIgrejaF[contNumeroIgreja]
                          ? listaIgrejaF[contNumeroIgreja].label
                          : 'aguarde...'}
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
                      handleIncIgreja();
                    }}
                  >
                    <BiCaretRight size={30} color="#f0f0f0" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            justifyContent="center"
            width="100%"
            height="10%"
            display="flex"
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="white"
              width="90%"
              height="100%"
              borderRadius={6}
            >
              <Box>
                <Box
                  ml={2}
                  width="100%"
                  textAlign="center"
                  fontFamily="Fugaz ONE"
                  color="black"
                >
                  TOTAL DE INSCRITOS:
                </Box>
                <ThemeProvider theme={theme}>
                  <Typography variant="hs2">
                    <Box
                      mt={2}
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      fontFamily="arial"
                      color="black"
                    >
                      ADULTOS:{' '}
                      <Box ml={1} fontFamily="Fugaz ONE" color="blue">
                        {adultos}
                      </Box>
                      <Box ml={3} display="flex">
                        0 à 6 anos:{' '}
                        <Box ml={1} fontFamily="Fugaz ONE" color="blue">
                          {criancas2}
                        </Box>
                      </Box>
                      <Box ml={3} display="flex">
                        7 à 11 anos:{' '}
                        <Box ml={1} fontFamily="Fugaz ONE" color="blue">
                          {criancas1}
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                </ThemeProvider>
              </Box>
            </Box>
          </Box>
          <Box height="2%" />
          <Box
            justifyContent="center"
            alignItems="start"
            width="100%"
            height="65%"
            display="flex"
          >
            <Box bgcolor="white" height="100%" width="90%" borderRadius={6}>
              <TableContainer sx={{ height: '100%' }}>
                {newListaInscritos && newListaInscritos.length ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="start"
                    width="90vw"
                    height="100%"
                  >
                    <List sx={{ width: '100%', maxWidth: 360 }}>
                      {newListaInscritos?.map((row, index) => (
                        <ListItem key={index} alignItems="flex-start">
                          <ListItemAvatar>
                            {row.foto !== null && row.foto !== undefined ? (
                              <Avatar
                                src=""
                                alt="User"
                                style={{
                                  width: 50,
                                  height: 50,
                                }}
                              >
                                {row.foto.slice(0, 1) === 'h' ? (
                                  <Image
                                    src={row.foto}
                                    layout="fill"
                                    objectFit="contain"
                                    loading="eager"
                                    placeholder="blur"
                                    blurDataURL={bannerBlurHash}
                                  />
                                ) : null}
                              </Avatar>
                            ) : (
                              <Avatar
                                src=""
                                alt="User"
                                style={{
                                  width: 50,
                                  height: 50,
                                }}
                              />
                            )}
                          </ListItemAvatar>
                          <Box>
                            <ListItemText style={{ marginTop: 20 }}>
                              <Box
                                style={{
                                  display: 'flex',
                                  marginLeft: 10,
                                  fontFamily: 'Fugaz One',
                                  fontSize: '12px',
                                  color: '#000',
                                }}
                              >
                                <ThemeProvider theme={theme}>
                                  <Typography variant="hs2">
                                    {row.Nome.length > 30
                                      ? row.Nome.substring(
                                          0,
                                          row.Nome.lastIndexOf(' '),
                                        ).toUpperCase()
                                      : row.Nome.toUpperCase()}
                                  </Typography>
                                </ThemeProvider>
                              </Box>

                              <Box
                                style={{
                                  display: 'flex',
                                  marginLeft: 10,
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                  color: '#000',
                                }}
                              >
                                <Box ml={0.2} display="flex">
                                  <ThemeProvider theme={theme}>
                                    <Typography variant="hs4">
                                      <Box display="flex">
                                        Adultos:{' '}
                                        <Box color="blue" ml={0.5}>
                                          {row.qtyAdultos ? row.qtyAdultos : 0}
                                        </Box>
                                        <Box ml={2} display="flex">
                                          0 à 6 anos:{' '}
                                          <Box color="blue" ml={0.5}>
                                            {row.qtyCriancas2
                                              ? row.qtyCriancas2
                                              : 0}
                                          </Box>
                                        </Box>
                                        <Box ml={2} display="flex">
                                          7 à 11 anos:{' '}
                                          <Box color="blue" ml={0.5}>
                                            {row.qtyCriancas1
                                              ? row.qtyCriancas1
                                              : 0}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Typography>
                                  </ThemeProvider>
                                </Box>
                              </Box>
                            </ListItemText>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : null}
              </TableContainer>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="10%"
          >
            <Button
              onClick={() => {
                setOpenInscritos(false);
              }}
              style={{
                background: corIgreja.tercenaria,
                color: 'white',
                fontFamily: 'Fugaz One',
                width: '70%',
              }}
              variant="contained"
              severity="success"
              //   endIcon={<TouchAppIcon />}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Funcao;
