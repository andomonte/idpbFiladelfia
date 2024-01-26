import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/roboto-mono'; // Padrões para peso 400.
import '@fontsource/rubik';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import TabMembros from './abas/tabMembros';
import BuscarNome from '../relatorios/supervisor/buscarNome';

function Funcao({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const [contNumeroCelula, setContNumeroCelula] = React.useState(0);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================
  const lideresSetor = lideranca.filter(
    (val) =>
      Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === 'Lider',
  );
  const celulasParcial = lideresSetor.map((itens) => itens.Celula);
  const numeroCelulas = [...new Set(celulasParcial)];

  const membroCelula = rolMembros.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Celula === Number(numeroCelulas[contNumeroCelula]),
  );

  const handleIncCelula = () => {
    let contCelulaAtual = contNumeroCelula + 1;

    if (contCelulaAtual > numeroCelulas.length - 1) contCelulaAtual = 0;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleDecCelula = () => {
    let contCelulaAtual = contNumeroCelula - 1;

    if (contCelulaAtual < 0) contCelulaAtual = numeroCelulas.length - 1;
    setContNumeroCelula(contCelulaAtual);
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
          <Box minWidth={300} maxWidth={500} height="100%" width="100%">
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
                        fontFamily="Fugaz One"
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ml={5}
                        mt={0}
                        fontSize="14px"
                      >
                        Total de Membros:{' '}
                        <Box
                          fontSize="14px"
                          fontWeight="bold"
                          fontFamily="Roboto Mono"
                          color="white"
                          mt={0}
                          ml={1}
                        >
                          {membroCelula.length}
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
                            handleDecCelula();
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
                        Célula
                        <Box ml={3}>{numeroCelulas[contNumeroCelula]}</Box>
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
                            handleIncCelula();
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
                  <TabMembros
                    setBuscarNome={setBuscarNome}
                    membroCelula={membroCelula}
                    setOpenBuscar={setOpenBuscar}
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
