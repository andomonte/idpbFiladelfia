import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/getSize';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Oval } from 'react-loading-icons';
import Iframe from 'react-iframe';

const janela = TamanhoJanela();
let altura;

if (janela.height < 600) altura = 600;
else altura = janela.height;

let largura = janela.width;
if (largura > 400) largura = 400;
// const fetcher = (url) => axios.get(url).then((res) => res.data);
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '500px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '100vh',
  },
  iframe: {
    width: '100%',
    height: altura - 20,
  },
  QrCode: {
    maxWidth: 230,
    maxHeight: 230,
    minWidth: 170,
    minHeight: 170,

    width: altura / 3,
    height: altura / 3,
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
  },
  input1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  letras1: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 0,
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    background: '#1a237e',
    '&:hover': {
      backgroundColor: '#0d47a1',
    },
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    width: 125,
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: 'blue',
    fontSize: '14px',
    fontWeight: 'bold',
    minWidth: 80,
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  texto: {
    color: '#780208',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #1a237e',
  },
  paper: {
    // backgroundColor: '#1a237e', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
  tf_input: {
    backgroundColor: '#ffff',
    borderRadius: '8px',
    border: '2px solid #1a237e',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    padding: 0,
    margin: 0,
  },
}));

function CbBoleto({ boleto }) {
  const classes = useStyles();

  //  const valCodigo = codigo;
  const router = useRouter();
  const [carregar] = React.useState(false);
  // mutate([url]);
  //  React.useEffect(() => {});

  const copyToClipboard = () => {
    // toast('copiado!');
    copy(boleto.codigo);
    toast.info('código copiado !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const FecharCompra = () => {
    router.push({
      pathname: '/eventoIdpb',
      query: { Evento: boleto.Evento },
    });
    // setOpen(false);
    // window.location.reload();
  };
  return (
    <Box height="100vh" width="100vw" display="flex" justifyContent="center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box>
        <Iframe
          url={boleto.urlBoleto}
          width={
            largura > 500 ? (
              '500px'
            ) : (
              <div> {largura > 400 ? '400' : '300px'}</div>
            )
          }
          height={
            altura > 800 ? (
              '700px'
            ) : (
              <div> {altura > 700 ? '650px' : '460px'}</div>
            )
          }
          id=""
          className=""
          display="block"
          position="relative"
        />
        <Box mt={5} display="flex" justifyContent="center" height="10%">
          <Box textAlign="center">
            <Button
              className={classes.button1}
              variant="contained"
              id="pagPix"
              onClick={copyToClipboard}
              style={{
                width: 80,
                borderRadius: 15,
              }}
              // inputRef={fpRef}
            >
              <Box>Copiar</Box>
            </Button>
          </Box>

          <Box ml={2}>
            <Button
              className={classes.button2}
              variant="contained"
              id="pagPix"
              onClick={FecharCompra}
              style={{
                width: 80,
                borderRadius: 15,
              }}
              // inputRef={fpRef}
            >
              {!carregar ? (
                <Box>Fechar</Box>
              ) : (
                <Box display="flex">
                  <Oval width={120} height={25} />{' '}
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default CbBoleto;
