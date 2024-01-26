import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/roboto-mono'; // Padrões para peso 400.
import '@fontsource/rubik';
import TabLideres from './abas/tabLideres';
import BuscarNome from '../relatorios/supervisor/buscarNome';

function Funcao({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  //= ===================================================================

  const membrosSetor = rolMembros.filter(
    (val) =>
      Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
      Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito),
  );

  const numberCelulas = membrosSetor.map((itens) => itens.Celula);
  const celulaSetor = [...new Set(numberCelulas)];

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
                        height="100%"
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ml={1}
                        fontSize="14px"
                        fontFamily="Rubik"
                      >
                        Celulas:
                        <Box
                          fontFamily="Roboto Mono"
                          fontSize="14px"
                          fontWeight="bold"
                          color="white"
                          mt={0}
                          ml={1}
                        >
                          {celulaSetor.length}
                        </Box>
                      </Box>
                      <Box
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ml={8}
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
                          {membrosSetor.length}
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
                        width="100%"
                        ml={0}
                        color="#f0f0f0"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Fugaz One' }}
                      >
                        SUPERVISÃO <Box ml={3}>{perfilUser.Supervisao}</Box>
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
                  <TabLideres
                    setBuscarNome={setBuscarNome}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    setOpenBuscar={setOpenBuscar}
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
