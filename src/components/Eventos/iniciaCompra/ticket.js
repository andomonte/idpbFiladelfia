import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/rubik';
import QRCode from 'react-qr-code';
import TamanhoTela from 'src/utils/screenSize';
import { useRouter } from 'next/router';
import { Oval } from 'react-loading-icons';
import api from 'src/components/services/api';
import JsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import cpfMask from 'src/components/mascaras/cpf';
// import { TelegramShareButton, TelegramIcon } from 'react-share';
import corIgreja from 'src/utils/coresIgreja';
import CropImage from './cropEasy';
import BotaoExtra from './botaoExtra';
import '@fontsource/fugaz-one';
// Padrões para peso 400.

function PesquisaCPF({ dadosInscrito, membros }) {
  // const classes = useStyles();

  const { height } = TamanhoTela();

  const ref3 = React.useRef();
  const [urlImage, setUrlImage] = React.useState('');
  const [fileImage, setFileImage] = React.useState('');
  const [openCrop, setOpenCrop] = React.useState('inicio');
  const [posts, setPosts] = React.useState('vazio');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDrawerPend, setOpenDrawerPend] = React.useState(false);
  const [openDrawerPend2, setOpenDrawerPend2] = React.useState(false);
  const [action, setAction] = React.useState('');
  const [nome, setNome] = React.useState(false);

  const [matricula, setMatricula] = React.useState('');
  const [estadia, setEstadia] = React.useState('');
  const [transporte, setTransporte] = React.useState('');
  const [GM, setGM] = React.useState('');
  const [imageSize] = React.useState('');
  const [igreja, setIgreja] = React.useState('');
  const [adultos, setAdultos] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [membrosF, setMembrosF] = React.useState('');

  const [idPagamento, setIdPagamento] = React.useState('');
  const [cartaDelegado, setCartaDelegado] = React.useState('');
  const router = useRouter();
  const [upLoadFile] = React.useState('');

  React.useEffect(async () => {
    if (dadosInscrito.cpf) {
      try {
        const newCPF = cpfMask(dadosInscrito.cpf);
        const url = `${window.location.origin}/api/consultaInscEventosAMCPF/${dadosInscrito.Evento}/${dadosInscrito.cpf}`;
        const res = await axios.post(url, { newCPF });
        if (res.data && res.data.length) {
          const inscrito = res.data.filter(
            (val) =>
              val.CPF.replace(/([^0-9])/g, '') ===
              dadosInscrito.cpf.replace(/([^0-9])/g, ''),
          );
          const membroF = membros.filter((val) => val.CPF === inscrito[0].CPF);

          setPosts(inscrito);
          setMembrosF(membroF);
          // setArray
        } else {
          setPosts([]);
          setOpenDrawerPend2(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else
      router.push({
        pathname: './verTicket',
      });
  }, []);

  React.useEffect(async () => {
    if (posts !== 'vazio') {
      if (posts.length > 0) {
        let inscrito = posts.filter((val) => val.status === 'approved');

        if (!inscrito.length)
          inscrito = posts.filter(
            (val) => val.status === 'pending' && val.Fpagamento === 'pix',
          );

        if (inscrito.length) {
          if (inscrito[0].status === 'approved') {
            // limitar nomes até 30 caracteres ou ultimo espaço antes de 30

            const nomes = inscrito[0].Nome;

            const nomeCompleto = inscrito[0].Nome.split(' ');

            let firstName = nomeCompleto[0];
            let lastName = nomeCompleto[nomeCompleto.length - 1];

            for (let i = 0; nomeCompleto[i] === ''; i += 1) {
              if (i > nomeCompleto.length) break;
              firstName = nomeCompleto[i + 1];
            }
            for (
              let i = nomeCompleto.length - 1;
              nomeCompleto[i] === '';
              i -= 1
            ) {
              if (i < 0) break;
              lastName = nomeCompleto[i - 1];
            }

            let nomeInscrito;
            if (nomes.length > 30) nomeInscrito = `${firstName} ${lastName}`;
            else nomeInscrito = nomes;

            //   setNome(`${firstName} ${lastName}`);
            setNome(nomeInscrito);
            setGM(inscrito[0].GrauMinisterial);
            setIgreja(inscrito[0].Igreja);

            setMatricula(inscrito[0].idPagamento);
            setTransporte(inscrito[0].transporte);
            setEstadia(inscrito[0].Estadia);
            setAdultos(inscrito[0].qtyAdultos);
            if (inscrito[0].qtyCriancas1 !== null)
              setCriancas(Number(inscrito[0].qtyCriancas1));
            setIdPagamento(inscrito[0].CPF);
            setCartaDelegado(inscrito[0].cartaDelegado);
            let fotoInscrito = inscrito[0].Image;
            if (!fotoInscrito)
              fotoInscrito = `https://idpbamazonas.s3.amazonaws.com/secretaria/${dadosInscrito.cpf}`;
            if (!fotoInscrito) fotoInscrito = '';
            setFileImage(fotoInscrito);
            setOpenDrawer(true);
          } else if (inscrito[0].status === 'pending') {
            setIdPagamento(inscrito[0].CPF);
            setOpenDrawerPend(true);
          } else setOpenDrawerPend2(true);
        } else setOpenDrawerPend2(true);
      } else setOpenDrawerPend2(true); // setOpenDrawerInval(true);
    }
  }, [posts]);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#e0711a'),
      backgroundColor: '#e0711a',
      '&:hover': {
        backgroundColor: '#e0711a',
      },
    },
  }))(Button);

  /*   const handleCloseOK = () => {
    router.push({
      pathname: '/global',
    });
  }; */
  const handleClose = () => {
    router.push({
      pathname: './verTicket',
    });
  };
  const process = async (selectedImage) => {
    try {
      const createFile = async (Myfile) => {
        const response = await fetch(Myfile);
        const data = await response.blob();
        const metadata = {
          type: 'image/png',
        };
        const nomeFoto = dadosInscrito.cpf;
        const file = new File([data], dadosInscrito.cpf, metadata);
        const dataFile = new FormData();
        //      dataFile.append('file', uploadedFile[0], nomeFoto);
        dataFile.append('file', file, nomeFoto);

        api
          .post('/api/fotos', dataFile)
          .then((responses) => {
            if (responses) {
              api
                .post('/api/imageEvento', {
                  idPagamento,
                  fileImage: `https://idpbamazonas.s3.amazonaws.com/secretaria/${dadosInscrito.cpf}`,
                  // urlImage -> esse urlImage é o da imagem selecionada já em blob
                })
                .then((response2) => {
                  if (response2) {
                    //         console.log(response);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
              // console.log('ccc', valCep);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      createFile(selectedImage);
    } catch (err) {
      console.log(err);
    }
  };
  const atualizarImagem = async () => {
    if (upLoadFile) {
      await process(fileImage);
    }
  };

  const voltar = () => {
    router.push({
      pathname: './verTicket',
    });
  };

  React.useEffect(() => {
    if (fileImage !== '' && !openCrop) atualizarImagem();
  }, [openCrop]);

  const handlePrint = useReactToPrint({
    content: () => ref3.current,
  });

  const generateImage = async () => {
    //  setOpenDrawer(true);
    try {
      const data = await toPng(ref3.current, { quality: 0.95 }); // await convertDivToPng(html.current);
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Credencial Eventos.jpeg';
        link.click();
      }
    } catch (error) {
      console.log(error, 'ini error sertifikat');
    }
  };

  React.useEffect(async () => {
    if (action !== '') {
      if (action === 1) {
        // imprimir
        handlePrint();
      }

      if (action === 2) {
        const image = await toPng(ref3.current, { quality: 0.95 });

        const doc = new JsPDF();

        doc.addImage(image, 'JPEG', 5, 25, 130, 200);
        doc.save('Credencial Eventos');
      }

      if (action === 3) {
        generateImage();
      }

      if (action === 4) voltar();

      setAction('');
    }
  }, [action]);

  return (
    <Box>
      <Box
        ref={ref3}
        height="99vh"
        minHeight={580}
        minWidth={300}
        bgcolor={corIgreja.principal2}
        display="flex"
        justifyContent="center"
      >
        {openDrawer && nome ? (
          <Box
            width="100vw"
            minWidth={300}
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            height="100vh"
            minHeight={500}
          >
            <Box>
              <div className="content" ref={ref3} id="comprovante">
                <Box width="90vw" minWidth={280}>
                  <Box
                    borderRadius={20}
                    bgcolor={corIgreja.principal}
                    ml={0}
                    width="90vw"
                    minWidth={280}
                    height="90vh"
                    minHeight={550}
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                  >
                    {!openCrop || openCrop === 'inicio' ? (
                      <Box height="100%" width="100%" minHeight={450}>
                        <Box
                          flexDirection="column"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="15vh"
                          minHeight={75}
                        >
                          <Box height="100%" width="100%">
                            <Box
                              mb={2}
                              mt={2}
                              width="100%"
                              display="flex"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Box width="20%" ml={0}>
                                  <BotaoExtra setAction={setAction} />
                                </Box>
                                <Box
                                  width="100%"
                                  height="100%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  color="white"
                                  fontFamily="Fugaz One"
                                >
                                  {dadosInscrito.Evento.toLocaleUpperCase()}
                                </Box>
                                <Box width="10%" ml={0} />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          flexDirection="column"
                          display="flex"
                          alignItems="center"
                          height="auto"
                          mt={-2}
                        >
                          <Box
                            width="90vw"
                            display="flex"
                            justifyContent="center"
                          >
                            <Box
                              bgcolor={corIgreja.principal}
                              style={{
                                border: '6px solid  #fff',
                                padding: 0,
                              }}
                              alignItems="center"
                              borderRadius={100}
                              sx={{
                                width: height < 680 ? 120 : 160,
                                height: height < 680 ? 120 : 160,
                              }}
                              width="100vw"
                              display="flex"
                              justifyContent="center"
                            >
                              <label htmlFor="icon-button-file">
                                <Avatar
                                  alt={nome}
                                  src={
                                    membrosF && membrosF.length
                                      ? membrosF[0].foto
                                      : null
                                  }
                                  sx={{
                                    width: height < 680 ? 100 : 140,
                                    height: height < 680 ? 100 : 140,
                                  }}
                                />
                              </label>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          height="6vh"
                          minHeight={40}
                          width="100%"
                          fontFamily="Fugaz One"
                          fontSize="16px"
                          color="white"
                          display="flex"
                          justifyContent="center"
                          alignItems="end"
                          textAlign="center"
                        >
                          {nome ? nome.toUpperCase() : 'Nome do Inscrito'}
                        </Box>
                        <Box
                          display="flex"
                          width="100%"
                          height="20vh"
                          sx={{ minHeight: 60 }}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            display="flex"
                            width="100%"
                            height="100%"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box alignItems="center" display="flex">
                              <Box
                                width={height < 600 ? 70 : 80}
                                height={height < 600 ? 70 : 80}
                                display="flex"
                                bgcolor="white"
                                borderRadius={6}
                                justifyContent="center"
                                alignItems="center"
                                ml={2}
                              >
                                <QRCode
                                  size={height < 600 ? 60 : 70}
                                  value={idPagamento}
                                />
                              </Box>
                              <Box width="auto" ml={3}>
                                <Box
                                  display="flex"
                                  sx={{
                                    color: '#ffff8d',
                                    fontFamily: 'Rubik',
                                    fontSize: '12px',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    ml={0}
                                    sx={{
                                      color: '#fff',
                                      fontFamily: 'Rubik',

                                      fontSize: '12px',
                                    }}
                                  >
                                    {GM}
                                  </Box>
                                </Box>
                                <Box
                                  mt={0.3}
                                  display="flex"
                                  sx={{
                                    color: '#ffff8d',
                                    fontFamily: 'Rubik',
                                    fontSize: '12px',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    ml={0}
                                    sx={{
                                      color: '#fff',
                                      fontFamily: 'Rubik',

                                      fontSize: '12px',
                                    }}
                                  >
                                    {igreja.length > 30
                                      ? igreja.substring(0, 30)
                                      : igreja}
                                  </Box>
                                </Box>
                                <Box
                                  mt={0.3}
                                  display="flex"
                                  sx={{
                                    color: '#ffff8d',
                                    fontFamily: 'Rubik',
                                    fontSize: '12px',
                                  }}
                                >
                                  Célula:
                                  <Box
                                    width="100%"
                                    ml={1}
                                    sx={{
                                      color: '#fff',
                                      fontFamily: 'Rubik',

                                      fontSize: '12px',
                                    }}
                                  >
                                    {membrosF && membrosF.length
                                      ? membrosF[0].Celula
                                      : ''}
                                  </Box>
                                </Box>
                                <Box
                                  mt={0.3}
                                  display="flex"
                                  sx={{
                                    color: '#ffff8d',
                                    fontFamily: 'Rubik',
                                    fontSize: '12px',
                                  }}
                                >
                                  Supervisão:
                                  <Box
                                    width="100%"
                                    ml={1}
                                    sx={{
                                      color: '#fff',
                                      fontFamily: 'Rubik',

                                      fontSize: '12px',
                                    }}
                                  >
                                    {membrosF && membrosF.length
                                      ? membrosF[0].Supervisao
                                      : ''}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        {console.log('dados', dadosInscrito)}
                        <Box
                          display={
                            adultos !== '' && criancas !== '' ? 'flex' : 'none'
                          }
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color="white"
                          mt={2}
                        >
                          <Box>Adultos: {adultos}</Box>
                          <Box ml={2}>Crianças: {criancas}</Box>
                        </Box>
                        <Box
                          display={
                            adultos !== '' && criancas !== '' ? 'flex' : 'none'
                          }
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color="white"
                          mt={2}
                        >
                          <Box ml={2}>Isentos: {dadosInscrito.qtyC2}</Box>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          mt={2}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <Box
                              width="100%"
                              fontFamily="Fugaz One"
                              fontSize="14px"
                              color="#80d8ff"
                            >
                              <Box>
                                {estadia === 'SIM'
                                  ? 'NECESSITA DE HOSPEDAGEM'
                                  : null}
                              </Box>
                              <Box>
                                {estadia === 'SIM' ? (
                                  <Box textAlign="center">
                                    CHEGA DE {transporte.toLocaleUpperCase()}
                                  </Box>
                                ) : null}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="60px"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <Box
                              width="100%"
                              fontFamily="Fugaz One"
                              fontSize="16px"
                              color="#aaffaa"
                            >
                              {GM !== 'DELEGADO' &&
                              GM !== 'MEMBRO AUTORIZADO' ? (
                                'INSCRIÇÃO CONFIRMADA'
                              ) : (
                                <Box mb={2}>
                                  {cartaDelegado === '' ||
                                  cartaDelegado === null ? (
                                    <Box textAlign="center">
                                      <Box color="#ff1744">
                                        FALTA A AUTORIZAÇÃO DO SEU PASTOR
                                      </Box>
                                    </Box>
                                  ) : (
                                    <Box>
                                      <Box width="100%" textAlign="center">
                                        INSCRIÇÃO CONFIRMADA
                                      </Box>{' '}
                                      {/* <Box color="white">
                                        <TelegramShareButton
                                          size={32}
                                          round
                                          url="https://t.me/+-bIM8yYuntBhMGIx"
                                        >
                                          <Box
                                            width="100vw"
                                            mt={2}
                                            display="flex"
                                            fontFamily="arial black"
                                            justifyContent="center"
                                          >
                                            <Box mt={0.5} mr={2}>
                                              click e entre no Grupo{' '}
                                            </Box>
                                            <Box>
                                              <TelegramIcon size={32} round />
                                            </Box>
                                          </Box>
                                        </TelegramShareButton>
                                      </Box> */}
                                    </Box>
                                  )}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          mt="0"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <Box
                              fontFamily="Fugaz One"
                              fontSize="12px"
                              color="#ffff8d"
                            >
                              MATRÍCULA
                            </Box>
                            <Box
                              width="100%"
                              mt={0}
                              sx={{
                                color: '#fff',
                                fontFamily: 'Rubik',
                                fontWeight: 'bold',
                                fontSize: '20px',
                              }}
                            >
                              {matricula}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box mt={0} height="100%" width="99vw">
                        <Box>
                          <CropImage
                            photoURL={urlImage}
                            setOpenCrop={setOpenCrop}
                            setPhotoURL={setUrlImage}
                            setFileImage={setFileImage}
                            imageSize={imageSize}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </div>
            </Box>
          </Box>
        ) : (
          <Box
            width="100vw"
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            height="99vh"
            minHeight={500}
          >
            <Box>
              <div className="content" ref={ref3} id="comprovante">
                <Box width="94vw">
                  <Box
                    borderRadius={20}
                    bgcolor={corIgreja.principal}
                    ml={1}
                    width="90vw"
                    height="90vh"
                    minHeight={440}
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Box width="100%">
                      <Box height="100%" width="100%">
                        <Box
                          mb={2}
                          mt={2}
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                          >
                            <Box width="10%" ml={1}>
                              <BotaoExtra setAction={setAction} />
                            </Box>

                            <Box
                              width="90%"
                              height="100%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              color="white"
                              fontFamily="Fugaz One"
                            >
                              {dadosInscrito.Evento.toLocaleUpperCase()}
                            </Box>
                            <Box width="10%" ml={0} />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        width="100%"
                        height="77.5vh"
                        sx={{ minHeight: 200 }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box color="white" mt={-1} ml={0} height="100%">
                          <Box height="100%">
                            {posts === 'vazio' ? (
                              <Box
                                ml={2}
                                width="90%"
                                height="100%"
                                mt={0}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                              >
                                <Box display="flex" justifyContent="center">
                                  <Oval
                                    stroke="white"
                                    width={130}
                                    height={85}
                                  />
                                </Box>
                                <Box
                                  mt={2}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <strong>Carregando...</strong>
                                </Box>
                              </Box>
                            ) : (
                              <Box>
                                {openDrawerPend && (
                                  <Box>
                                    <Box mt={5}>
                                      <Box
                                        //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                                        width="100vw"
                                        ml={-0.3}

                                        // className={classes.imgBack}
                                        // sx={{ backgroundImage: `url('/images/global/iniCompra.png')` }}
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
                                              fontSize: '12px',
                                              color: '#fff',
                                              fontFamily: 'Arial Black',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            <Box mt={-3}>
                                              CPF: {dadosInscrito.cpf}
                                            </Box>
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
                                              color: '#fff',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            <Box mt={2}>
                                              STATUS DE PAGAMENTO ESTÁ
                                            </Box>
                                          </Typography>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                          width="100%"
                                          mt={1}
                                          sx={{
                                            fontSize: 'bold',
                                            color: '#e0711a',
                                          }}
                                        >
                                          <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            style={{
                                              fontSize: '12px',
                                              color: 'blue',
                                              fontFamily: 'Arial Black',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            <Box mt={-1}>PENDENTE</Box>
                                          </Typography>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                          width="100%"
                                          mt={1}
                                          sx={{
                                            fontSize: 'bold',
                                            color: '#e0711a',
                                          }}
                                        >
                                          <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            style={{
                                              fontSize: '12px',
                                              color: 'green',
                                              fontFamily: 'Arial Black',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            <Box mt={0}>
                                              <Box
                                                display="flex"
                                                justifyContent="space-around"
                                              >
                                                <strong
                                                  style={{ color: '#fff' }}
                                                >
                                                  código
                                                </strong>
                                              </Box>
                                              <Box
                                                display="flex"
                                                justifyContent="space-around"
                                              >
                                                {idPagamento}
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
                                              color: '#fff',
                                              fontWeight: 'bold',
                                              marginTop: 10,
                                              marginLeft: 2,

                                              width: '100vw' - 28,
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
                                              mt={3}
                                            >
                                              <Box mt={1}>
                                                Central de atendimento:{' '}
                                              </Box>
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
                                              color: '#fff',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            <Box mt={1}>
                                              Secretaria da Igreja
                                            </Box>
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Box
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
                                    <Box
                                      mt={5}
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
                                  </Box>
                                )}
                                {openDrawerPend2 && (
                                  <Box>
                                    <Box>
                                      <div
                                        className="content"
                                        ref={ref3}
                                        id="comprovante"
                                      >
                                        <Box>
                                          <Box>
                                            <Box mt={3}>
                                              <Box
                                                //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                                                width="100%"
                                                ml={0}

                                                // className={classes.imgBack}
                                                // sx={{ backgroundImage: `url('/images/global/iniCompra.png')` }}
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
                                                      color: '#fff',
                                                      fontFamily: 'Arial Black',
                                                      fontWeight: 'bold',
                                                    }}
                                                  >
                                                    <Box mt={0}>
                                                      Não temos registro
                                                    </Box>
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
                                                      color: '#fff',
                                                      fontFamily: 'Arial Black',
                                                      fontWeight: 'bold',
                                                    }}
                                                  >
                                                    <Box mt={2}>
                                                      de compra no CPF
                                                    </Box>
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
                                                      color: '#fff',
                                                      fontFamily: 'Arial Black',
                                                      fontWeight: 'bold',
                                                    }}
                                                  >
                                                    <Box mt={2}>
                                                      {dadosInscrito.cpf}
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
                                                      color: '#fff',
                                                      fontWeight: 'bold',
                                                      marginTop: 10,
                                                      marginLeft: 2,

                                                      width: '100%',
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
                                                      mt={1}
                                                    >
                                                      <Box mt={1}>
                                                        {' '}
                                                        Central de atendimento:{' '}
                                                      </Box>
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
                                                      color: '#fff',
                                                      fontWeight: 'bold',
                                                    }}
                                                  >
                                                    <Box mt={1}>
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
                                                mb={0}
                                                sx={{
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              mt={5}
                                              display="flex"
                                              width="100%"
                                              justifyContent="center"
                                              bgcolor="#fdd835"
                                              color="black"
                                              fontSize="16px"
                                              borderRadius={16}
                                              fontFamily="Fugaz One"
                                              alignItems="center"
                                              height={40}
                                            >
                                              <Box
                                                variant="contained"
                                                value="value"
                                                onClick={handleClose}
                                              >
                                                FECHAR
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </div>
                                    </Box>
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
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PesquisaCPF;
