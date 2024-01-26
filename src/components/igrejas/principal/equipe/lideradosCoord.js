import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';

import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import TabLideresCoord from './abas/tabLideresCoord';
import BuscarNome from '../relatorios/supervisor/buscarNome';

function Fucao({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const numeroFuncoes = ['Supervisor', 'Lider'];
  const tipoLiderados = ['Supervisões', 'Células'];
  const tipoPesquisado = ['Coordenacao', 'Supervisao', 'Celula'];
  const [contNumeroFucao, setContNumeroFucao] = React.useState(0);
  //= ===================================================================
  const membrosCoordenacao = rolMembros.filter(
    (val) =>
      Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito),
  );

  const celulasSetorP = lideranca.filter(
    (val) =>
      Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === numeroFuncoes[contNumeroFucao],
  );
  const numberCelulas = celulasSetorP.map(
    (itens) => itens[tipoPesquisado[contNumeroFucao]],
  );
  const celulaSetor = [...new Set(numberCelulas)];

  const handleIncFucao = () => {
    let contFuncaoAtual = contNumeroFucao + 1;
    if (contFuncaoAtual > numeroFuncoes.length - 1) contFuncaoAtual = 0;
    setContNumeroFucao(contFuncaoAtual);
  };

  const handleDecFucao = () => {
    let contFuncaoAtual = contNumeroFucao - 1;

    if (contFuncaoAtual < 0) contFuncaoAtual = numeroFuncoes.length - 1;
    setContNumeroFucao(contFuncaoAtual);
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
      {!openBuscar ? (
        <Box
          height="97%"
          width="100%"
          ml={1.2}
          mr={1.2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box minWidth={300} height="100%" width="100%">
            <Box width="100%" height="100%">
              <Box
                style={{
                  borderRadius: '16px',
                }}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={350}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mt={1}
                  mb={1}
                  width="95%"
                  height="100%"
                >
                  <Box justifyContent="center" width="100%" display="flex">
                    <Box
                      mb={2}
                      bgcolor="#fff"
                      height={40}
                      justifyContent="center"
                      width="100%"
                      display="flex"
                      borderRadius={10}
                    >
                      <Box ml={-1.8} width="100%" display="flex">
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecFucao();
                            }}
                          >
                            <BiCaretLeft
                              color={corIgreja.principal2}
                              size={35}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          ml={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          sx={{ fontFamily: 'Fugaz One' }}
                        >
                          {numeroFuncoes[contNumeroFucao]}
                        </Box>
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncFucao();
                            }}
                          >
                            <BiCaretRight
                              color={corIgreja.principal2}
                              size={35}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box justifyContent="center" width="100%" display="flex">
                    <Box
                      mb={2}
                      bgcolor="#fff"
                      height={40}
                      justifyContent="center"
                      width="48%"
                      display="flex"
                      borderRadius={10}
                    >
                      <Box
                        color="black"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={10}
                        width="100%"
                        height="100%"
                        ml={1}
                        mt={0}
                        fontSize="12px"
                      >
                        Total de {tipoLiderados[contNumeroFucao]}:{' '}
                        <Box
                          fontFamily="arial black"
                          fontSize="14px"
                          color="blue"
                          mt={0}
                          ml={1}
                        >
                          {celulaSetor.length}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      bgcolor="white"
                      color="black"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={10}
                      width="50%"
                      height={35}
                      ml={1}
                      mt={0}
                      fontSize="12px"
                    >
                      Total de Membros:{' '}
                      <Box
                        fontSize="14px"
                        fontFamily="arial black"
                        color="blue"
                        mt={0}
                        ml={1}
                      >
                        {membrosCoordenacao.length}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    height="75%"
                    minHeight={315}
                    display="flex"
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    <TabLideresCoord
                      setBuscarNome={setBuscarNome}
                      perfilUser={perfilUser}
                      lideranca={lideranca}
                      setOpenBuscar={setOpenBuscar}
                      Funcao={numeroFuncoes[contNumeroFucao]}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
      )}
    </Box>
  );
}

export default Fucao;
