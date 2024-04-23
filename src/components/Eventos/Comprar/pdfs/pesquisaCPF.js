import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import QRCode from 'react-qr-code';
import TamanhoJanela from 'src/utils/getSize';
import LinearProgress from '@material-ui/core/LinearProgress';
import GeneratePdf from './generatePdfTicket';

const janela = TamanhoJanela();
let largura;
let altura;
if (janela.width > 400) largura = 400;
else largura = janela.width;

if (janela.height > 700) altura = 700;
else altura = janela.height;

if (janela.height < 500) altura = 500;
else altura = janela.height;
// const fetcher = (urls) => axios.get(urls).then((res) => res.data);

const ajusteAltura = Number(altura / 11).toFixed(0) - 5;

const useStyles = makeStyles(() => ({
  root: {
    height: altura,
    minHeight: 500,
    //  overflow: 'hidden',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  imgBack: {
    //    width: '100%',
    height: altura,
    backgroundImage: `url('/images/global/ticket.png')`,
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #1a237e',
  },
}));

const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  // border: '2px solid #1a237e',
  width: largura,
  height: altura,
};

function PesquisaCPF({ ticket }) {
  const { cpf } = ticket;
  const classes = useStyles();
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();
  const url = `${window.location.origin}/api/consultaInscConvencao/${cpf}`;
  const [posts, setPosts] = React.useState('vazio');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDrawerInval, setOpenDrawerInval] = React.useState(false);
  const [openDrawerPend, setOpenDrawerPend] = React.useState(false);
  const [openDrawerPend2, setOpenDrawerPend2] = React.useState(false);
  const [inscCancel, setInscCancel] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [adultos, setAdultos] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [idPagamento, setIdPagamento] = React.useState('');

  React.useEffect(async () => {
    try {
      const res = await axios.get(url);
      if (res.data) setPosts(() => [...res.data]);
      // setArray
      else {
        setPosts('nada');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  React.useEffect(async () => {
    if (posts !== 'vazio') {
      if (posts.length > 0) {
        const inscrito = posts.filter((val) => val.status !== 'cancelled');
        const inscCancelada = posts.filter((val) => val.status === 'cancelled');

        if (!inscCancelada.length) {
          if (inscrito[0].CPF === cpf) {
            setNome(posts[0].Nome);
            setAdultos(posts[0].Adultos);
            setCriancas(posts[0].Criancas);
            setIdPagamento(posts[0].idPagamento);

            if (inscrito[0].status === 'approved') setOpenDrawer(true);
            if (
              inscrito[0].status !== 'cancelled' &&
              inscrito[0].status !== 'approved'
            )
              setOpenDrawerPend(true);
          } else setOpenDrawerInval(true);
        } else {
          setOpenDrawerPend2(true);

          setInscCancel(() => [...inscCancelada]);
        }
      } else setOpenDrawerInval(true);
    }
  }, [posts]);
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#1a237e'),
      backgroundColor: '#1a237e',
      '&:hover': {
        backgroundColor: '#1a237e',
      },
    },
  }))(Button);

  /*   const handleCloseOK = () => {
    router.push({
      pathname: '/global',
    });
  }; */
  const handleClose = () => {
    setOpenDrawerInval(false);
    setOpenDrawerPend(false);
    // setOpen(false); // fechar o open da função pai que chamou -> telaLogin
    return null;
  };

  return (
    <Box maxwidth={400} minHeight={500} display="flex" justifyContent="center">
      <Drawer variant="persistent" anchor="bottom" open={openDrawerInval}>
        <Box className={classes.root}>
          <Box>
            <div className="content" ref={ref1} id="comprovante">
              <Box display="flex" justifyContent="center">
                <Box
                  width="100%"
                  height="100vh"
                  maxWidth={400}
                  maxHeight={700}
                  minHeight={500}
                >
                  <Box>
                    <Box mt={-1} ml={0}>
                      <img
                        src="/images/global/informe.png"
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </Box>

                    <Box
                      //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                      width="100%"
                      ml={-0.3}

                      // className={classes.imgBack}
                      // sx={{ backgroundImage: `url('/images/global/ticket.png')` }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mb={0}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={-ajusteAltura - 3}>Não temos registro</Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mb={0}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={-ajusteAltura}>de compra no cpf</Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold', color: '#1a237e' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: 'blue',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={-ajusteAltura + 3}>{cpf}</Box>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        height={50}
                        mt={1}
                        sx={{ fontSize: 'bold', background: '#780208' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '13px',
                            color: '#000',
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginLeft: 2,

                            width: largura - 28,
                            height: 60,
                            textAlign: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              border: '1px solid #780208',
                              borderLeft: 0,
                              borderRight: 0,
                              borderBottom: 0,
                            }}
                            mt={altura > 630 ? -40 : -34}
                          >
                            <Box mt={1}> Central de atendimento: </Box>
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={0}
                        sx={{ fontSize: 'bold', background: '#1a237e' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '13px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={altura > 630 ? -40 : -34}>
                            Secretaria da Igreja
                          </Box>
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      mt={1}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />

                    <Box
                      mt={0}
                      mb={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                mt={altura < 600 ? -15 : -20}
                display="flex"
                width="100%"
                justifyContent="center"
              >
                <Box>
                  <ColorButton
                    style={{ borderRadius: 16 }}
                    variant="contained"
                    value="value"
                    onClick={handleClose}
                  >
                    FECHAR
                  </ColorButton>
                </Box>
              </Box>
            </div>
          </Box>
        </Box>
      </Drawer>
      <Drawer variant="persistent" anchor="bottom" open={openDrawerPend}>
        <Box className={classes.root}>
          <Box>
            <div className="content" ref={ref2} id="comprovante">
              <Box width="100%" mb={1}>
                <Box {...defaultProps}>
                  <Box mt={-1} ml={0}>
                    <img
                      src="/images/global/informe.png"
                      alt=""
                      width="100%"
                      height="100vh"
                    />
                  </Box>
                  <Box
                    //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                    width="100vw"
                    ml={-0.3}

                    // className={classes.imgBack}
                    // sx={{ backgroundImage: `url('/images/global/ticket.png')` }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mb={0}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '16px',
                          color: '#000',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        <Box mt={-ajusteAltura - 3}>CPF: {cpf}</Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mb={0}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '12px',
                          color: '#000',
                          fontWeight: 'bold',
                        }}
                      >
                        <Box mt={-ajusteAltura + 2}>
                          STATUS DE PAGAMENTO ESTÁ
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mt={1}
                      sx={{ fontSize: 'bold', color: '#1a237e' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '16px',
                          color: 'blue',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        <Box mt={-ajusteAltura + 3}>PENDENTE</Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mt={1}
                      sx={{ fontSize: 'bold', color: '#1a237e' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '16px',
                          color: 'green',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        <Box mt={-ajusteAltura + 6}>
                          <strong style={{ color: '#000' }}>código:</strong>{' '}
                          {idPagamento}
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      height={50}
                      mt={1}
                      sx={{ fontSize: 'bold', background: '#780208' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '13px',
                          color: '#000',
                          fontWeight: 'bold',
                          marginTop: 10,
                          marginLeft: 2,

                          width: largura - 28,
                          height: 60,
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            border: '1px solid #780208',
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                          }}
                          mt={altura > 630 ? -40 : -34}
                        >
                          <Box mt={1}> Central de atendimento: </Box>
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mt={0}
                      sx={{ fontSize: 'bold', background: '#1a237e' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '13px',
                          color: '#000',
                          fontWeight: 'bold',
                        }}
                      >
                        <Box mt={altura > 630 ? -40 : -34}>
                          Secretaria da Igreja
                        </Box>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    mt={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  />

                  <Box
                    mt={0}
                    mb={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  />
                </Box>
              </Box>
            </div>
            <Box mt={-10} display="flex" justifyContent="center">
              <ColorButton
                style={{ borderRadius: 16 }}
                variant="contained"
                value="value"
                onClick={handleClose}
              >
                FECHAR
              </ColorButton>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box className={classes.root}>
        {posts === 'vazio' && (
          <Box>
            <Box mt={-1} ml={0}>
              <img
                src="/images/global/informe.png"
                alt=""
                width="100%"
                height="100vh"
              />
            </Box>
            <Box mt={-27} justifyContent="center" display="flex">
              <Box width="90%">
                <LinearProgress />
                <Box display="flex" justifyContent="center">
                  <small>Carregando...</small>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {openDrawerPend2 && (
          <Box>
            <div className="content" ref={ref2} id="comprovante">
              <Box width="100%" mb={1}>
                <Box {...defaultProps}>
                  <Box mt={-1} ml={0}>
                    <img
                      src="/images/global/informe.png"
                      alt=""
                      width="100%"
                      height="100vh"
                    />
                  </Box>
                </Box>
                <Box>
                  <Box mt={altura > 570 ? (altura < 630 ? -50 : -56) : -40}>
                    <Box
                      //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                      width="100vw"
                      ml={-0.3}

                      // className={classes.imgBack}
                      // sx={{ backgroundImage: `url('/images/global/ticket.png')` }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mb={0}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={-3}>CPF: {cpf}</Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mb={0}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '14px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={0}>
                            Quantidade de inscrições ={' '}
                            <strong>{inscCancel.length}</strong>
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold', color: '#1a237e' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: 'blue',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={0}>CANCELADA</Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold', color: '#1a237e' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            color: 'green',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={0}>
                            <Box display="flex" justifyContent="space-around">
                              <strong style={{ color: '#000' }}>código</strong>
                            </Box>
                            <Box display="flex" justifyContent="space-around">
                              {inscCancel.length && inscCancel[0].idPagamento}
                            </Box>
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="92%"
                        height={0}
                        mt={1}
                        ml={2}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '13px',
                            color: '#000',
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginLeft: 2,

                            width: largura - 28,
                            height: 60,
                            textAlign: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              borderLeft: 0,
                              borderRight: 0,
                              borderBottom: 0,
                            }}
                            mt={altura > 570 ? (altura < 630 ? 3 : 5) : 0}
                          >
                            <Box mt={1}> Central de atendimento: </Box>
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={0}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '13px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          <Box mt={altura > 570 ? (altura < 630 ? 0 : 0) : -4}>
                            Secretaria da Igreja
                          </Box>
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      mt={1}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />

                    <Box
                      mt={0}
                      mb={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </div>
            <Box
              mt={altura > 570 ? (altura < 630 ? 8 : 12) : 0}
              display="flex"
              justifyContent="center"
            >
              <ColorButton
                style={{ borderRadius: 16 }}
                variant="contained"
                value="value"
                onClick={handleClose}
              >
                FECHAR
              </ColorButton>
            </Box>
          </Box>
        )}
      </Box>

      <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
        <Box className={classes.root}>
          <Box>
            <div className="content" ref={ref3} id="comprovante">
              <Box width="100%" mb={1}>
                <Box {...defaultProps}>
                  <Box mt={-1} ml={0}>
                    <img
                      src="/images/global/ticket.png"
                      alt=""
                      width="100%"
                      height="100vh"
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={-ajusteAltura - 8}
                    mb={0}
                    sx={{
                      fontSize: '16px',
                      color: '#1a237e',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        color: '#000',
                        fontFamily: 'Arial Black',
                        fontWeight: 'bold',
                      }}
                    >
                      {nome}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={1}
                    sx={{ fontSize: 'bold', color: '#1a237e' }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      ADULTOS:{' '}
                      <strong
                        style={{
                          fontSize: '16px',
                          color: 'blue',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        {adultos}
                      </strong>
                    </Typography>
                    <Box ml={5} />
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      CRIANÇAS:{' '}
                      <strong
                        style={{
                          fontSize: '16px',
                          color: 'blue',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        {criancas}
                      </strong>
                    </Typography>
                  </Box>

                  <Box
                    mt={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  />

                  <Box
                    mt={0}
                    mb={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box mt={altura < 610 ? 0 : 2}>
                      <QRCode
                        fgColor="#1a237e"
                        size={altura > 610 ? 250 : 180}
                        value={cpf}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
            <Box mt={-4}>
              <GeneratePdf html={ref3} cpf={cpf} />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default PesquisaCPF;
