import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/roboto-mono'; // Padrões para peso 400.
import '@fontsource/rubik';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import TabLideresDistrito from './abas/tabLideresDistrito';
import BuscarNome from '../relatorios/supervisor/buscarNome';

function Funcao({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const numeroFuncoes = ['Coordenador', 'Supervisor', 'Lider'];
  const tipoLiderados = ['Coordenações', 'Supervisões', 'Células'];
  const tipoPesquisado = ['Coordenacao', 'Supervisao', 'Celula'];
  const [contNumeroFucao, setContNumeroFucao] = React.useState(0);
  //= ===================================================================
  const membrosDistrito = rolMembros.filter(
    (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
  );

  const celulasCoordP = lideranca.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === numeroFuncoes[contNumeroFucao],
  );
  const numberCelulas = celulasCoordP.map(
    (itens) => itens[tipoPesquisado[contNumeroFucao]],
  );
  const celulaCoord = [...new Set(numberCelulas)];

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
      height="90vh"
      minHeight={570}
      minWidth={300}
      width="100vw"
      bgcolor={corIgreja.principal2}
    >
      {!openBuscar ? (
        <Box
          height="100%"
          width="100%"
          minWidth={300}
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box minWidth={300} maxWidth={500} height="94%" width="92%">
            <Box width="100%" height="100%">
              <Box
                borderRadius={16}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight={570}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mt={0}
                  mb={0}
                  width="100%"
                  height="8%"
                >
                  <Box
                    height="100%"
                    flexDirection="column"
                    justifyContent="center"
                    width="100%"
                    display="flex"
                  >
                    <Box
                      mt={0}
                      height="100%"
                      width="100%"
                      justifyContent="center"
                      display="flex"
                    >
                      <Box
                        height="100%"
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ml={1}
                        fontSize="14px"
                        fontFamily="Rubik"
                      >
                        {tipoLiderados[contNumeroFucao]}:{' '}
                        <Box
                          fontFamily="Roboto Mono"
                          fontSize="14px"
                          fontWeight="bold"
                          color="white"
                          mt={0}
                          ml={1}
                        >
                          {celulaCoord.length}
                        </Box>
                      </Box>
                      <Box
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ml={5}
                        mt={0}
                        fontSize="14px"
                      >
                        Membros:{' '}
                        <Box
                          fontSize="14px"
                          fontWeight="bold"
                          fontFamily="Roboto Mono"
                          color="white"
                          mt={0}
                          ml={1}
                        >
                          {membrosDistrito.length}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box justifyContent="center" width="100%" display="flex">
                  <Box
                    bgcolor={corIgreja.principal}
                    borderTop="1px"
                    style={{ borderTop: '1px solid #f0f0f0' }}
                    borderColor="white"
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display="flex"
                    height={50}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
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
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color="#f0f0f0"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        {numeroFuncoes[contNumeroFucao]}
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
                            handleIncFucao();
                          }}
                        >
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  display="flex"
                  bgcolor="#fafafa"
                  width="100%"
                  sx={{
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                  }}
                >
                  <TabLideresDistrito
                    setBuscarNome={setBuscarNome}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    setOpenBuscar={setOpenBuscar}
                    Funcao={numeroFuncoes[contNumeroFucao]}
                    rolMembros={rolMembros}
                  />
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

export default Funcao;
