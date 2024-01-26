import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';

import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlinePublishedWithChanges, MdGroups } from 'react-icons/md';
// import { usePWAInstall } from 'react-use-pwa-install';
// import { IoGameControllerOutline } from 'react-icons/io5';
import { Oval } from 'react-loading-icons';
// import { RiInstallLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { FaChartBar } from 'react-icons/fa';
import Avisos from './Avisos';
import Mensagem from './mensagem';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const home = ({ perfilUser }) => {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');
  const [openMensagem, setOpenMensagem] = React.useState(false);
  const [openAviso, setOpenAviso] = React.useState(false);
  const router = useRouter();
  const [loadingMensagem, setLoadingMensagem] = React.useState(false);
  const [loadingAviso, setLoadingAviso] = React.useState(false);
  const [loadingAniversarios, setLoadingAniversarios] = React.useState(false);
  const [loadingInscricoes, setLoadingInscricoes] = React.useState(false);
  const [loadingSec, setLoadingSec] = React.useState(false);
  const [loadingHow, setLoadingHow] = React.useState(false);
  const [loadingPerfil, setLoadingPerfil] = React.useState(false);
  const [loadingCont, setLoadingCont] = React.useState(false);
  const [loadingPontos, setLoadingPontos] = React.useState(false);
  const [loadingRel, setLoadingRel] = React.useState(false);
  const [loadingPlan, setLoadingPlan] = React.useState(false);
  const [loadingAtual, setLoadingAtual] = React.useState(false);
  const [loadingMidia, setLoadingMidia] = React.useState(false);
  const [loadingCursos, setLoadingCursos] = React.useState(false);
  const [loadingMudar, setLoadingMudar] = React.useState(false);

  const handleAgenda = () => {
    setLoadingAviso(true);
    router.push({
      pathname: '/agenda',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  /* const handleJogos = () => {
    setLoadingJogos(true);
    router.push({
      pathname: '/principal',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
    setLoadingJogos(false);
  }; */
  const handleAniversarios = () => {
    setLoadingAniversarios(true);
    router.push({
      pathname: '/aniversariantes',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleContribuicoes = () => {
    setLoadingCont(true);

    router.push({
      pathname: '/contribuicoes',
      query: { perfilUser },
    });
  };
  const handleInscricoes = () => {
    setLoadingInscricoes(true);

    router.push({
      pathname: '/eventos',
      query: { perfilUser },
    });
  };

  const handleCursos = () => {
    setLoadingCursos(true);

    router.push({
      pathname: '/cursos',
      query: { perfilUser },
    });
  };

  const handleSecretaria = () => {
    setLoadingSec(true);

    router.push({
      pathname: '/secretaria',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handlePontuacao = () => {
    setLoadingPontos(true);

    router.push({
      pathname: '/pontuacao',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  /*  const handleQuemSomos = () => {
    setLoadingHow(true);

    router.push({
      pathname: '/quemSomos',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  }; */

  const handleMembros = () => {
    setLoadingHow(true);

    router.push({
      pathname: '/membros',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };

  const handleMensagem = () => {
    setLoadingMensagem(true);

    router.push({
      pathname: '/principal/mensagem',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleAtualizar = () => {
    setLoadingAtual(true);

    router.push({
      pathname: '/atualizar',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handlePerfil = () => {
    setLoadingPerfil(true);

    router.push({
      pathname: '/meuPerfil',
      query: { perfilUser },
    });
  };

  const handleRelatorios = () => {
    setLoadingRel(true);
    if (perfilUser.Funcao !== 'Membro')
      router.push({
        pathname: '/relatorio',
        query: { perfilUser },
      });
    else
      router.push({
        pathname: '/participacoes',
        query: { perfilUser },
      });
  };

  const handlePlanejamento = () => {
    setLoadingPlan(true);

    router.push({
      pathname: '/planejamento',
      query: { perfilUser },
    });
  };

  const handleMudarPerfil = () => {
    setLoadingMudar(true);

    if (perfilUser.login === 'google')
      router.push({
        pathname: '/selectPerfil',
      });

    if (perfilUser.login === 'credencial')
      router.push({
        pathname: '/selectPerfilCPF',
      });
  };
  const handleMidia = () => {
    setLoadingMidia(true);

    router.push({
      pathname: '/midia',
    });
  };
  // const install = usePWAInstall();

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
              width="32%"
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingMensagem ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/biblia.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">BOLETIM</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAgenda}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingAviso ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <IoCalendarOutline size={35} color="white" />
                  )}
                </Box>
                <Box fontSize="12px">AGENDA</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAniversarios}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingAniversarios ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/bolo.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">ANIVERSÁRIOS</Box>
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
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingInscricoes ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/eventos.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">EVENTOS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleSecretaria}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingSec ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/secretaria.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">SECRETARIA</Box>
              </Box>
            </Box>
            <Box
              onClick={handleCursos}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingCursos ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/school.png"
                      height={35}
                      width={35}
                      alt="cursos"
                    />
                  )}
                </Box>
                <Box fontSize="12px">CURSOS</Box>
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
              onClick={handlePerfil}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingPerfil ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/credencial.png"
                      height={40}
                      width={30}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">MEU PERFIL</Box>
              </Box>
            </Box>
            <Box
              onClick={handleContribuicoes}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingCont ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/contribuicoes.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">CONTRIBUIÇÃO</Box>
              </Box>
            </Box>
            <Box
              onClick={handleRelatorios}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingRel ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/relatorio.png"
                      height={35}
                      width={30}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">RELATÓRIOS</Box>
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
              onClick={handlePlanejamento}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingPlan ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/planejamento.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="11px">PLANEJAMENTO</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAtualizar}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingAtual ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/atualizar.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">ATUALIZAR</Box>
              </Box>
            </Box>
            <Box
              onClick={handleMidia}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingMidia ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <img
                      src="/images/midia2.png"
                      height={35}
                      width={35}
                      alt="bolo"
                    />
                  )}
                </Box>
                <Box fontSize="12px">MÍDIA</Box>
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
            {/* <Box
              onClick={handleJogos}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingJogos ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <IoGameControllerOutline color="white" size={35} />
                  )}
                </Box>
                <Box fontSize="12px">JOGOS</Box>
              </Box>
            </Box> */}
            <Box
              onClick={handleMembros}
              ml={0}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingHow ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <MdGroups size={35} color="white" />
                  )}
                </Box>
                <Box fontSize="12px">MEMBROS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleMudarPerfil}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingMudar ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <MdOutlinePublishedWithChanges color="white" size={35} />
                  )}
                </Box>
                <Box fontSize="12px">MUDAR PERFIL</Box>
              </Box>
            </Box>

            <Box
              onClick={handlePontuacao}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
              bgcolor={corIgreja.principal}
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
                flexDirection="column"
              >
                <Box mb={1}>
                  {loadingPontos ? (
                    <Box>
                      <Oval stroke="white" width={35} height={35} />
                    </Box>
                  ) : (
                    <FaChartBar color="#f0f0f0" size={35} />
                  )}
                </Box>
                <Box fontSize="12px">PONTUAÇÃO</Box>
              </Box>
            </Box>
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
