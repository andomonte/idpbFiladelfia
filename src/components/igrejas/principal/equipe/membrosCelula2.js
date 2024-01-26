import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';

import BuscarNome from '../relatorios/supervisor/buscarNome';
import TabMembros from './abas/tabMembros2';

function Celula({ perfilUser, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

  const membroCelula = rolMembros.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Celula === Number(perfilUser.Celula),
  );

  //= ===================================================================

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
        height="97%"
        width="100%"
        ml={1.2}
        mr={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={corIgreja.principal}
        borderRadius={16}
      >
        {!openBuscar ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth={300}
            height="100%"
            width="100%"
          >
            <Box width="100%" height="100%">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box
                  height={60}
                  alignItems="center"
                  justifyContent="center"
                  fontSize="18px"
                  sx={{ fontFamily: 'Fugaz One' }}
                  width="100%"
                  color="white"
                  display="flex"
                >
                  <Box>CÉLULA:</Box>

                  <Box color="yellow" ml={2}>
                    {' '}
                    {perfilUser.Celula}
                  </Box>
                  <Box color="yellow" ml={2}>
                    {perfilUser.Nome ? perfilUser.NomeCelula : ''}
                  </Box>
                </Box>
                <Box
                  height={60}
                  alignItems="center"
                  justifyContent="center"
                  fontSize="18px"
                  sx={{ fontFamily: 'Fugaz One' }}
                  width="100%"
                  color="white"
                  display="flex"
                >
                  <Box>Total de Membros: </Box>

                  <Box color="yellow" ml={2}>
                    {' '}
                    {membroCelula.length}
                  </Box>
                </Box>
              </Box>
              <Box height="91%" minHeight={315} display="flex" width="100%">
                <TabMembros
                  setBuscarNome={setBuscarNome}
                  membroCelula={membroCelula}
                  setOpenBuscar={setOpenBuscar}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
        )}
      </Box>
    </Box>
  );
}

export default Celula;
