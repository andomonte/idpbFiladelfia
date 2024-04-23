import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TiArrowBack } from 'react-icons/ti';
import Avatar from '@mui/material/Avatar';
import TamanhoJanela from 'src/utils/getSize';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from 'src/components/services/api';
import 'react-toastify/dist/ReactToastify.css';
import corIgreja from 'src/utils/coresIgreja';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Oval } from 'react-loading-icons';

const janela = TamanhoJanela();
let largura = janela.width;
if (largura > 400) largura = 400;

const useStyles = makeStyles((theme) => ({
  button2: {
    display: 'flex',
    background: '#2196f3',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  paper: {
    // backgroundColor: '#2196f3', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },

  root2: {
    backgroundColor: corIgreja.principal,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function Boleto({ dadosDinheiro }) {
  console.log('dadosDinheiro', dadosDinheiro);

  const { email } = dadosDinheiro;
  const { cpf } = dadosDinheiro;
  const { nome } = dadosDinheiro;
  const { Responsavel } = dadosDinheiro;
  const { Secretaria } = dadosDinheiro;
  const { estadia } = dadosDinheiro;
  const { genero } = dadosDinheiro;
  const { grau } = dadosDinheiro;
  const { horario } = dadosDinheiro;
  const { igrejas } = dadosDinheiro;
  const { jEstadual } = dadosDinheiro;
  const { nascimento } = dadosDinheiro;
  const { dataChegada } = dadosDinheiro;
  const { qtyA } = dadosDinheiro;
  const { qtyC1 } = dadosDinheiro;
  const { qtyC2 } = dadosDinheiro;
  const fpag = 'isento';
  const { fone } = dadosDinheiro;
  const { transporte } = dadosDinheiro;
  const { Evento } = dadosDinheiro;
  const { Jurisdicao } = dadosDinheiro;
  const { Distrito } = dadosDinheiro;
  const { logoEvento } = dadosDinheiro;
  const classes = useStyles();
  // console.log('params:', setFPagamento);
  // const router = useRouter();

  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // const [open, setOpen] = React.useState(true);
  const [messageErro, setMessageErro] = React.useState(0);
  // const [fPagamento, setFPagamento] = React.useState('');
  const [openDrawerErro, setOpenDrawerErro] = React.useState(false);

  const router = useRouter();

  const voltar = () => {
    router.push({
      pathname: './comprar',
    });
  };
  const FecharCompra = () => {
    router.push({
      pathname: './iniciaCompra',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const fazerCadastro = () => {
    api
      .post('/api/cadastroCriancaEvento', {
        nome,
        cpf,
        total: 0,
        fone,
        email,
        estadia,
        genero,
        grau,
        horario,
        igrejas,
        jEstadual,
        nascimento,
        dataChegada,
        Responsavel,
        Secretaria,
        qtyA: Number(qtyA),
        qtyC1: Number(qtyC1),
        qtyC2: Number(qtyC2),
        fpag,
        transporte,
        Evento,
        Jurisdicao,
        Distrito,
      })

      .then((response) => {
        if (response) {
          if (response.data.cpf !== '')
            router.push({
              pathname: './meuTicket',
              query: {
                cpf,
                qtyA: Number(qtyA),
                qtyC1: Number(qtyC1),
                qtyC2: Number(qtyC2),
                estadia,
                transporte,
                Evento,
                Jurisdicao,
                Distrito,
              },
            });
        }
        //        const prefID = response.data.body.point_of_interaction.transaction_data;
        else {
          setValorErro(
            `Não conseguimos fazer sua Inscrição. Será necessário refaze-la.`,
          );
          setOpenDrawerErro(true);
          setMessageErro(response.data.message);
        }
      })
      .catch((error) => {
        console.log('error:', error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscEventosAMCPF/${Evento}/${cpf}`;
      const res = await axios.get(url);

      if (res.data && res.data.length) {
        const inscrito = res.data.filter(
          (val) =>
            val.status === 'approved' &&
            val.CPF.replace(/([^0-9])/g, '') === cpf.replace(/([^0-9])/g, ''),
        );

        if (inscrito.length)
          router.push({
            pathname: './meuTicket',
            query: { cpf },
          });
        else {
          fazerCadastro();
        }
      } else {
        fazerCadastro();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Box
      bgcolor={corIgreja.principal2}
      height="100vh"
      width="100vw"
      minHeight={570}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <AppBar className={classes.root2}>
        <Box
          width="100%"
          // maxWidth={450}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml={0}
        >
          <Box ml={2} display="flex" justifyContent="end" width="30px">
            <TiArrowBack size={30} onClick={voltar} />
          </Box>
          <Box
            fontFamily="Fugaz One"
            display="flex"
            justifyContent="center"
            width="85%"
            mr={2}
          >
            EVENTOS IDPB
          </Box>
        </Box>
      </AppBar>
      <Box
        height="93.5vh"
        width="94vw"
        minHeight={570}
        mt="6.5vh"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <Box height="96%" bgcolor={corIgreja.principal}>
          <Box
            mt={0}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height="100%"
            width="90vw"
            // maxWidth={450}
            minHeight={540}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <Box
              mb={2}
              mt={5}
              width="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
            >
              <Box justifyContent="center" height="100%">
                <Avatar
                  alt="Evento"
                  src={logoEvento || ''}
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                />
              </Box>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
              height="70vh"
            >
              <Box
                justifyContent="center"
                alignItems="center"
                display="flex"
                mb={2}
              >
                Salvando dados...
              </Box>
              <Oval stroke="white" width={80} height={80} />{' '}
            </Box>

            <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
              <Box height={260} sx={{ background: '#ffebee' }}>
                <Alert onClose={handleDrawerClose} severity="error">
                  <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                  <strong>{valorErro}</strong>
                </Alert>
              </Box>
            </Drawer>
            <Drawer variant="persistent" anchor="bottom" open={openDrawerErro}>
              <Box height={janela.height} sx={{ background: '#ffebee' }}>
                <Box mt={25}>
                  {messageErro ? (
                    <Box>
                      <Box display="flex" justifyContent="center">
                        <h2>DADOS ERRADOS !</h2>
                      </Box>
                      <Box m={2} textAlign="center">
                        <strong>{valorErro}</strong>
                      </Box>

                      <Box mt={4} textAlign="center">
                        <strong>A operadora Informou:</strong>
                      </Box>
                      <Box m={0} textAlign="center">
                        <strong>{messageErro}</strong>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box display="flex" justifyContent="center">
                        <h2>ERRO NO PAGAMENTO !</h2>
                      </Box>
                      <Box m={2} textAlign="center">
                        <strong>{valorErro}</strong>
                      </Box>
                    </Box>
                  )}
                  <Box
                    mt={4}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      className={classes.button2}
                      variant="contained"
                      id="reload"
                      onClick={FecharCompra}
                    >
                      Fechar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Boleto;
