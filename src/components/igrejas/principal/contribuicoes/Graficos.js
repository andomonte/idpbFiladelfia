import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';

import { Oval } from 'react-loading-icons';
import TabGraficos from './tabGrafico';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function RelCelula() {
  //= ================================================================

  const d = new Date();
  const anoAtual = Number(d.getFullYear());
  const [contAno, setContAno] = React.useState(anoAtual);
  const [contConta, setContConta] = React.useState(0);
  const [entradas, setEntradas] = React.useState([]);

  const [entradasT, setEntradasT] = React.useState([]);

  const [loadingLC, setLoadingLC] = React.useState(false);

  const url1 = `/api/consultaContas`;
  const { data: contas, errorContas } = useSWR(url1, fetcher);

  const url2 = `/api/consultaCentroCusto`;
  const { data: centroCusto } = useSWR(url2, fetcher);

  const pesquisaSaldo = () => {
    api
      .post('/api/consultaLancamentos')
      .then((responses) => {
        if (responses) {
          const contribuicoes = responses.data.filter(
            (val) =>
              val.LANC_PAGO && Number(val.anoReferencia) === Number(contAno),
          );

          const newContribuicoes = contribuicoes;

          setEntradas(newContribuicoes);
          setEntradasT(contribuicoes);
          setLoadingLC(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    setLoadingLC(true);
    pesquisaSaldo();
  }, [contAno]);
  React.useEffect(() => {
    if (errorContas) return <div>An error occured.</div>;
    if (!contas) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [contas]);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2020) contAnoAtual = 2020;
    setContAno(contAnoAtual);
  };

  const handleIncConta = () => {
    let contContaAtual = contConta + 1;

    if (contContaAtual > centroCusto.length - 1) contContaAtual = 0;
    setContConta(contContaAtual);
  };
  const handleDecConta = () => {
    let contContaAtual = contConta - 1;

    if (contContaAtual < 0) contContaAtual = centroCusto.length - 1;
    setContConta(contContaAtual);
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
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
        <Box
          display="flex"
          justifyContent="center"
          height="6%"
          width="100%"
          minWidth={300}
          mb={1}
        >
          <Box width="96%" display="flex" bgcolor="white">
            <Box
              width="10%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  handleDecAno();
                }}
              >
                <BiCaretLeft size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="black"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              {contAno}
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
                  handleIncAno();
                }}
              >
                <BiCaretRight size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          height="6%"
          width="100%"
          minWidth={300}
        >
          <Box width="96%" display="flex" bgcolor="white">
            <Box
              width="10%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  handleDecConta();
                }}
              >
                <BiCaretLeft size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="black"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              {centroCusto
                ? centroCusto[contConta].CC_NOME.toUpperCase()
                : 'Buscando...'}
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
                  handleIncConta();
                }}
              >
                <BiCaretRight size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {!loadingLC ? (
          <Box height="82%" mt={2}>
            {entradas && entradas.length ? (
              <Box height="100%">
                <Box width="100%" height="100%">
                  <Box
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                    }}
                    height="100%"
                    minWidth={300}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={350}
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="96%"
                      height="100%"
                    >
                      <Box
                        height="99%"
                        minHeight={300}
                        bgcolor="#fafafa"
                        width="100%"
                        borderRadius={16}
                      >
                        {centroCusto ? (
                          <TabGraficos
                            Ano={contAno}
                            listaCC={centroCusto[contConta]}
                            entradas={entradas}
                            entradasT={entradasT}
                          />
                        ) : null}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontFamily="Fugaz One"
                color="white"
              >
                SEM LANÇAMENTO NESSE PERÍODO
              </Box>
            )}
          </Box>
        ) : (
          <Box
            height="84%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Fugaz One"
            color="white"
          >
            <Box ml={0} mt={1} display="flex" alignItems="center">
              <Oval stroke="white" width={50} height={50} />
            </Box>
            <Box ml={2} mt={1} display="flex" alignItems="center">
              BUSCANDO DADOS...
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RelCelula;
