import React from 'react';
import { Box, TextField } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { BsSearch } from 'react-icons/bs';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';
import Autocomplete from '@mui/material/Autocomplete';
import PegaDataPelaSemana from 'src/utils/getData';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');
  const ano = dataSplit[2].split(' ');

  const novaData = new Date(
    parseInt(ano[0], 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );

  return novaData;
}

function compare(a, b) {
  if (
    converteData(
      moment(a.Data.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'),
    ) >
    converteData(moment(b.Data.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'))
  )
    return -1;
  return true;
}

//= =================================================================

function getPreviousMonday2(date) {
  const getAno = new Date().getFullYear();
  const getDia = new Date().getDay();
  let dataFinal = date;
  if (getDia < 3) dataFinal = date + 1;
  const nova = PegaDataPelaSemana(dataFinal, getAno);

  const previousMonday = nova;

  previousMonday.setDate(previousMonday.getDate() - 7);

  return previousMonday;
}
function nextSunday(date) {
  // const today = new Date();
  const nextweek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 6,
  );
  return nextweek;
}

function Mensagem({ mensagem, titulo2 }) {
  const [shareUrl, setShareUrl] = React.useState('');
  const [boletim, setBoletim] = React.useState('');
  const [dataBr, setDataBr] = React.useState('');
  const [diaSem, setDiaSem] = React.useState('');
  const nomeRef = React.useRef();
  // const d = new Date();
  // const anoAtual = Number(d.getFullYear());
  let valorInicialTitulo = {
    label: 'Título da Mensagem',
    value: 1,
  };
  if (titulo2 && titulo2.length) valorInicialTitulo = titulo2;
  const url1 = `/api/consultaMensagem`;
  const { data: mensage, errorMensage } = useSWR(url1, fetcher);

  const ref3 = React.useRef();
  const [titulo, setTitulo] = React.useState(valorInicialTitulo);
  const [pesquisaTitulo, setPesquisaTitulo] = React.useState(false);
  const [inputValor, setInputValor] = React.useState('');

  const [openPesquisa, setOpenPesquisa] = React.useState(false);
  const [contFonte, setContFonte] = React.useState(16);
  let newCont = 0;
  if (mensagem && mensagem.length) newCont = mensagem.length;
  const [contSemana, setContSemana] = React.useState(newCont);
  const semanaAtual2 = getPreviousMonday2(contSemana);

  let listaNomes = '';
  if (mensagem) listaNomes = mensagem.map((nomes) => nomes.titulo);

  const [mensGeral, setMensGeral] = React.useState(mensagem);
  const [mensagemF, setMensagemF] = React.useState('');
  React.useEffect(() => {
    if (mensage && mensage.length) {
      listaNomes = mensage.map((nomes) => nomes.titulo);

      setMensGeral(mensage);
      setContSemana(mensage.length);
    }

    if (errorMensage) return <div>An error occured.</div>;
    if (!mensage) return <div>Loading ...</div>;

    return 0;
  }, [mensage]);

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;

    if (contSemanaAtual > mensGeral.length) contSemanaAtual = contSemana;
    setPesquisaTitulo(false);
    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 0) contSemanaAtual = contSemana;
    setPesquisaTitulo(false);
    setContSemana(contSemanaAtual);
  };

  const handleIncFonte = () => {
    let contFonteAtual = contFonte + 1;
    if (contFonteAtual > 124) contFonteAtual = 124;
    setContFonte(contFonteAtual);
  };

  const handleDecFonte = () => {
    let contFonteAtual = contFonte - 1;

    if (contFonteAtual < 8) contFonteAtual = 8;
    setContFonte(contFonteAtual);
  };

  React.useEffect(() => {
    if (!pesquisaTitulo && mensGeral) {
      const dataMens = mensGeral.sort(compare);
      const dataMens2 = dataMens;
      const diaSemana = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ];

      if (dataMens2.length) {
        const novaData1 = dataMens2[dataMens2.length - contSemana].Data; // nextSunday(semanaAtual2);
        setBoletim(dataMens2[dataMens2.length - contSemana]);
        setTitulo(dataMens2[dataMens2.length - contSemana].titulo);
        const ano = novaData1.substring(0, 4);
        const mes = novaData1.substring(5, 7);
        const dia = novaData1.substring(8, 10);
        const diaSemana2 = new Date(`${mes}/${dia}/${ano}`);

        const showData = `${dia}/${mes}/${ano}`;
        setDiaSem(` ${diaSemana[diaSemana2.getDay()]}`);
        setDataBr(showData);
      }
    }
  }, [contSemana, mensGeral]);

  React.useEffect(() => {
    if (titulo2) {
      setTitulo(titulo2);
    }
  }, [titulo2]);
  React.useEffect(() => {
    if (boletim) {
      setMensagemF(boletim.Mensagem.replace(/font-size/g, 'font-sizes'));
    }
  }, [boletim]);
  React.useEffect(() => {
    if (titulo && titulo.length && mensagem) {
      const dataMens2 = mensagem.filter(
        (val) => val.titulo.toLowerCase().indexOf(titulo.toLowerCase()) !== -1,
      );

      if (dataMens2.length) {
        setBoletim(dataMens2[0]);
        setPesquisaTitulo(true);
      }
      const urltiluto = `https://www.idpbcastelo.com.br/principal/mensagem?titulo=${titulo}`;
      setShareUrl(urltiluto);
      const diaSemana = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ];

      if (dataMens2.length) {
        const novaData1 = dataMens2[0].Data; // nextSunday(semanaAtual2);

        const ano = novaData1.substring(0, 4);
        const mes = novaData1.substring(5, 7);
        const dia = novaData1.substring(8, 10);
        const diaSemana2 = new Date(`${mes}/${dia}/${ano}`);

        const showData = `${dia}/${mes}/${ano}`;
        setDiaSem(` ${diaSemana[diaSemana2.getDay()]}`);
        setDataBr(showData);
      } else {
        const novaData11 = nextSunday(semanaAtual2);
        const dia =
          novaData11.getDate() > 9
            ? novaData11.getDate()
            : `0${novaData11.getDate()}`;
        const mes =
          novaData11.getMonth() + 1 > 9
            ? novaData11.getMonth() + 1
            : `0${novaData11.getMonth() + 1}`;
        const ano = novaData11.getFullYear();
        const diaSemana2 = new Date(`${mes}/${dia}/${ano}`);

        const showData = `${dia}/${mes}/${ano}`;
        setDiaSem(` ${diaSemana[diaSemana2.getDay()]}`);
        setDataBr(showData);
      }
    }
  }, [titulo]);
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      // const form = event.target.id;
      //  if (form === 'Nascimento') handleCheckDadosMembro();
    }
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
        width="96%"
        // maxWidth={450}
        ref={ref3}
        bgcolor={corIgreja.secundaria}
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url('/images/mensagem2.png')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          display="flex"
          flexDirection="column"
          height="15vh"
          minHeight={120}
          width="100%"
        >
          <Box
            mt={2}
            ml={2}
            height="100%"
            width="96%"
            display="flex"
            alignItems="start"
            justifyContent="start"
          >
            <Box
              width="99%"
              height="100%"
              mt={-1}
              color="white"
              fontSize="25px"
              fontFamily="Fugaz One"
              display="flex"
              justifyContent="center"
            >
              <Box
                width="90%"
                height="auto"
                display="flex"
                justifyContent="start"
              >
                <Box
                  height="100%"
                  onClick={() => {
                    setOpenPesquisa(!openPesquisa);
                    setTitulo('');
                    nomeRef.current.focus();
                  }}
                >
                  <BsSearch size={25} color="white" />
                </Box>
                <Box
                  ml={2}
                  width="100%"
                  display={openPesquisa ? 'flex' : 'none'}
                >
                  <Autocomplete
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      background: 'white',
                    }}
                    id="Nome"
                    freeSolo
                    value={titulo}
                    onChange={(_, newValue) => {
                      setOpenPesquisa(false);
                      if (inputValor && newValue) setTitulo(newValue);
                      else setTitulo('');
                    }}
                    onBlur={() => {
                      if (inputValor.length > 0) {
                        setTitulo(inputValor);
                      }
                    }}
                    selectOnFocus
                    inputValue={inputValor}
                    onInputChange={(_, newInputValue) => {
                      if (newInputValue !== '')
                        setInputValor(newInputValue.toUpperCase());
                      else setInputValor('');
                    }}
                    options={listaNomes}
                    renderInput={(params) => (
                      <TextField
                        autoComplete="off"
                        inputRef={nomeRef}
                        {...params}
                        onKeyDown={handleEnter}
                        placeholder="  Digite o titulo"
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box
                height="100%"
                width="30%"
                display="flex"
                justifyContent="flex-start"
              >
                <Box
                  style={{
                    color: 'white',
                    fontFamily: 'arial black',
                    fontSize: '16px',
                  }}
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <WhatsappShareButton
                    url={shareUrl}
                    title="title"
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <WhatsappIcon size={25} round />
                  </WhatsappShareButton>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            width="99%"
            mt={0}
            color="white"
            fontSize="25px"
            fontFamily="Fugaz One"
            display="flex"
            justifyContent="center"
          >
            <Box
              mt={0}
              height="100%"
              width="12%"
              display="flex"
              justifyContent="flex-start"
            >
              <Box
                ml={0}
                mr={0}
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '16px',
                }}
                display="flex"
                justifyContent="flex-start"
                width="100%"
                onClick={() => handleDecFonte()}
              >
                <IconButton
                  style={{
                    color: 'white',
                    fontFamily: 'arial black',
                    fontSize: '16px',
                  }}
                >
                  A -
                </IconButton>
              </Box>
            </Box>
            <Box width="200px" display="flex" justifyContent="center">
              MENSAGEM
            </Box>
            <Box
              height="100%"
              width="12%"
              display="flex"
              justifyContent="flex-end"
              mt={0}
            >
              <Box
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '16px',
                }}
                display="flex"
                justifyContent="flex-end"
                width="100%"
                onClick={() => handleIncFonte()}
              >
                {' '}
                <IconButton
                  style={{
                    color: 'white',
                    fontFamily: 'arial black',
                    fontSize: '16px',
                  }}
                >
                  A +
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            height="100%"
            mt={-0.5}
            flexDirection="column"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="98%"
              height="100%"
            >
              <Box
                height="100%"
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '12px',
                }}
                width="80%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  ml={2}
                  height="100%"
                >
                  <Box
                    height="100%"
                    width="10%"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      onClick={() => {
                        handleDecSemana();
                      }}
                    >
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '16px',
                        }}
                        display="flex"
                        width="100%"
                      >
                        <MdOutlineArrowLeft size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                  <Box
                    width="80%"
                    fontFamily="Fugaz One"
                    fontSize="14px"
                    color="white"
                    mt={-0.3}
                    ml={-3}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      fontFamily="Fugaz One"
                      fontSize="14px"
                      color="white"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {diaSem ? `${diaSem.toLocaleUpperCase()}` : ''}
                    </Box>
                    <Box
                      fontFamily="Fugaz One"
                      fontSize="14px"
                      color="white"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      ml={1}
                    >
                      {diaSem ? '-' : ''}
                    </Box>
                    <Box
                      ml={1}
                      fontFamily="Fugaz One"
                      fontSize="16px"
                      color="white"
                      display="flex"
                      justifyContent="center"
                    >
                      {dataBr ? `${dataBr}` : 'Não encontrado'}
                    </Box>
                  </Box>
                  <Box
                    width="10%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton onClick={() => handleIncSemana()}>
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '14px',
                        }}
                        display="flex"
                        justifyContent="flex-end"
                        width="100%"
                      >
                        <MdOutlineArrowRight size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                </Box>{' '}
              </Box>
              <Box width="8%" />
            </Box>
          </Box>
        </Box>
        <TableContainer
          style={{
            minWidth: 280,
            width: '96vw',
            height: '98vh',
            minHeight: 400,
          }}
        >
          <Box height="100%" width="100%">
            <Box height="100%">
              <Box height="100%" mt={0} width="100%">
                <Box
                  height="100%"
                  display="flex"
                  width="100%"
                  mb={1}
                  justifyContent="center"
                  fontFamily="Fugaz One"
                  sx={{ textAlign: 'justify' }}
                >
                  {boletim && mensagemF ? (
                    <Box width="90%" color="black">
                      <Box width="100%">
                        <Box
                          mb={3}
                          fontFamily="Rubik"
                          fontSize={contFonte}
                          sx={{ textAlign: 'justify', textIndent: '30px' }}
                        >
                          <div
                            style={{ fontSize: contFonte }}
                            className="mensagem"
                            dangerouslySetInnerHTML={{
                              __html: mensagemF,
                            }}
                          />
                        </Box>

                        <Box width="100%" height="100%">
                          <Box
                            mt={0}
                            width="100%"
                            fontSize={contFonte}
                            fontFamily="Rubik"
                            borderRadius={16}
                            style={{
                              textAlign: 'justify',

                              border: '2px solid',
                              borderColor: corIgreja.principal,
                            }}
                          >
                            <Box
                              width="100%"
                              display="flex"
                              justifyContent="center"
                            >
                              <Box
                                mt={-1.4}
                                fontSize={16}
                                color={corIgreja.principal}
                                width={200}
                                bgcolor="#fafafa"
                                textAlign="center"
                              >
                                PARA COMPARTILHAR
                              </Box>
                            </Box>
                            <Box ml={1} mt={1} mb={3} width="100%">
                              <Box
                                sx={{
                                  textAlign: 'justify',
                                }}
                                width="100%"
                                display="flex"
                                fontSize={contFonte}
                              >
                                <Box width="85%" ml={1}>
                                  Qual foi a afirmação ou versículo mais
                                  importante que você aprendeu com esta
                                  mensagem?
                                </Box>
                              </Box>
                            </Box>
                            <Box ml={1} mt={1} width="100%">
                              <Box
                                sx={{
                                  textAlign: 'justify',
                                }}
                                width="100%"
                                display="flex"
                                fontSize={contFonte}
                              >
                                <Box ml={1}>2.</Box>

                                <Box width="85%" ml={1}>
                                  O que Deus quer que você faça em resposta ao
                                  que Ele falou a você hoje?
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box height={10} mt={1} />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      height="75vh"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      SEM BOLETIM REGISTRADO NESSA SEMANA
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Mensagem;
