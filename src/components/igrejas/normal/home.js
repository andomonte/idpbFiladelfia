import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'next/router';

import Avisos from 'src/components/igrejas/principal/home/Avisos';
import Mensagem from 'src/components/igrejas/principal/home/mensagem';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const home = () => {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');

  const [openMensagem, setOpenMensagem] = React.useState(false);
  const [openAviso, setOpenAviso] = React.useState(false);
  const router = useRouter();
  const handleAvisos = () => {
    router.push({
      pathname: '/principal/aviso',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleInscricoes = () => {
    router.push({
      pathname: '/eventos',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  /* const handleQuemSomos = () => {
    router.push({
      pathname: '/quemSomos',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  }; */
  const handleMembros = () => {
    router.push({
      pathname: '/membros',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleMensagem = () => {
    router.push({
      pathname: '/principal/mensagem',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };

  const handleMidias = () => {
    router.push({
      pathname: '/midia',
    });
  };
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
        mt={0.5}
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal2}
      >
        <TableContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: 400,
          }}
        >
          <Box
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMensagem}
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              maxWidth={500}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={16}
                  style={{
                    backgroundImage: `url('/images/mensagens.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={1}
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleAvisos}
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              maxWidth={500}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={16}
                  style={{
                    backgroundImage: `url('/images/avisosGerais.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={1}
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleInscricoes}
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              maxWidth={500}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={16}
                  style={{
                    backgroundImage: `url('/images/nossosEventos.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
            mt={1}
          >
            <Box
              onClick={handleMembros}
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              maxWidth={500}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={16}
                  style={{
                    backgroundImage: `url('/images/quemSomos3.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover',
                  }}
                >
                  <Box width="30%" display="flex" justifyContent="center">
                    <img
                      src="/images/quemSomos.png"
                      alt="equipe"
                      height={35}
                      width={35}
                    />
                  </Box>
                  <Box
                    fontSize="30px"
                    fontFamily="Rubik"
                    fontWeight="bold"
                    display="flex"
                    justifyContent="center"
                    width="70%"
                    color="white"
                  >
                    EQUIPE
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            height="19%"
            mt={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMidias}
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              maxWidth={500}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={16}
                  style={{
                    backgroundImage: `url('/images/midias.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover',
                  }}
                />
              </Box>
            </Box>{' '}
          </Box>
        </TableContainer>
      </Box>
      {openAviso && (
        <Modal
          open={openAviso}
          //  onClose={!openAviso}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Avisos setOpenAviso={setOpenAviso} />
        </Modal>
      )}
      {openMensagem && (
        <Modal
          open={openMensagem}
          //  onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Mensagem setOpenMensagem={setOpenMensagem} />
        </Modal>
      )}
    </Box>
  );
};

export default home;
