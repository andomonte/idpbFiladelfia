import React from 'react';
import { Box, Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import Stack from '@mui/material/Stack';
import '@fontsource/rubik';
import { useRouter } from 'next/router';
import { Oval } from 'react-loading-icons';
import api from 'src/components/services/api';
import { styled } from '@mui/material/styles';
import { TiArrowBack } from 'react-icons/ti';
import AppBar from '@material-ui/core/AppBar';
import '@fontsource/fugaz-one';
import { makeStyles } from '@material-ui/core/styles';

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  root2: {
    backgroundColor: '#0d47a1',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    // backgroundColor: '#DA691D', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  tf_s: {
    backgroundColor: '#FFFF',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #DA691D',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    maxHeight: 700,
    padding: 0,
    margin: 0,
  },
  button1: {
    display: 'flex',
    background: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#dd2c00',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#dd2c00',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#df5c00',
    },
  },
}));

function PesquisaCPF({ idPagamento }) {
  // const classes = useStyles();

  const classes = useStyles();
  const [carrega, setCarrega] = React.useState('');
  const router = useRouter();

  const [files, setFiles] = React.useState([]);

  const handleBaixarCarta = () => {
    saveAs('/files/carta_de_autorização.pdf', 'carta_de_autorização.pdf');
  };

  const voltar = () => {
    router.push({
      pathname: '/eventoIdpb/meuTicket',
    });
  };
  const voltar2 = () => {
    router.back();
  };

  const processUpload = (uploadedFile) => {
    if (uploadedFile.name) {
      const nomeFoto = `CartaDelegado_${idPagamento}`;
      setCarrega(true);
      const dataFile = new FormData();
      //      dataFile.append('file', uploadedFile[0], nomeFoto);
      dataFile.append('file', uploadedFile, nomeFoto);
      api
        .post('/api/fotos', dataFile)
        .then((response) => {
          if (response) {
            api
              .post('/api/cartaDelegadoConvencao', {
                idPagamento,
                cartaDelegado: `https://cafinpi.s3.amazonaws.com/secretaria/${idPagamento}`,
                // urlImage -> esse urlImage é o da imagem selecionada já em blob
              })
              .then((response2) => {
                if (response2) {
                  voltar();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const atualizarImagem = async () => {
    if (files) {
      processUpload(files);
    }
  };

  return (
    <Box>
      <Box
        height="99vh"
        minHeight={600}
        minWidth={300}
        bgcolor="#0d47a1"
        display="flex"
        justifyContent="center"
      >
        <AppBar className={classes.root2}>
          <Box
            width="90%"
            // maxWidth={450}
            bgcolor="#1a237e"
            minWidth={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            ml={0}
            mt={3}
          >
            <Box display="flex" justifyContent="flex-start" ml={2} width="10%">
              <TiArrowBack size={30} onClick={voltar2} />
            </Box>
            <Box
              mb={2}
              mt={2}
              width="80%"
              display="flex"
              justifyContent="center"
              textAlign="center"
            >
              <img
                src="/images/missoes/logoSim2.webp"
                alt="Castelo"
                width={200}
                height={45}
              />
            </Box>
            <Box width="10%" />
          </Box>
        </AppBar>
        <Box
          borderRadius={20}
          bgcolor="#1a237e"
          ml={0}
          mt={3}
          width="90vw"
          minWidth={300}
          height="92vh"
          minHeight={560}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            mt={10}
            fontFamily="Fugaz One"
            fontSize="16px"
            color="#f0f0f0"
            mb={0}
          >
            CARTA DO DELEGADO{' '}
          </Box>
          <Box
            mt={2}
            mb={0}
            fontFamily="Fugaz One"
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            bgcolor="#f0f0f0"
          >
            <Box mt={2} fontSize="16px" color="#000" mb={1}>
              SE AINDA NÃO TEM A CARTA:
            </Box>
            <Box fontFamily="Rubik" fontSize="16px" color="#000" mb={0}>
              Baixe a Carta, e pegue a assinatuara
            </Box>
            <Box fontFamily="Rubik" fontSize="16px" color="#000" mb={3}>
              do seu Pastor Presidente
            </Box>

            <Box mb={2}>
              <Button
                style={{ fontFamily: 'Fugaz One', background: '#aaaff0' }}
                variant="contained"
                component="span"
                onClick={handleBaixarCarta}
              >
                BAIXE A CARTA
              </Button>
            </Box>
          </Box>
          <Box
            mt="5vh"
            fontFamily="Fugaz One"
            fontSize="16px"
            color="#f0f0f0"
            mb={1}
          >
            SE JÁ TEM A CARTA ASSINADA:
          </Box>
          <Box fontFamily="Rubik" fontSize="16px" color="#f0f0f0" mb={0}>
            scanei a carta para envia-la
          </Box>
          <Box fontFamily="Rubik" fontSize="16px" color="#f0f0f0" mb={3} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
              <Input
                accept="*/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
              />
            </label>
            <label htmlFor="icon-button-file">
              <Button
                style={{ fontFamily: 'Fugaz One', background: '#78FAFA' }}
                variant="contained"
                component="span"
              >
                SELECIONE A CARTA ASSINADA
              </Button>
            </label>
          </Stack>
          <Box mt={2} color="#f0f0f0">
            {files && files.name}
          </Box>
          <Box mt="10vh">
            <Button
              disabled={!(files && files.name)}
              style={{ fontFamily: 'Fugaz One', background: '#faf59a' }}
              variant="contained"
              component="span"
              onClick={atualizarImagem}
            >
              {carrega ? (
                <Oval stroke="blue" width={120} height={25} />
              ) : (
                'ENVIAR A CARTA'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PesquisaCPF;
