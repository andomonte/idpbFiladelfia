import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';



export default function NestedGrid() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box mt={10}>
        <Box textAlign="center" mt={3} mb={2}>
          <img src={corIgreja.logo} alt="CAFINPI" width={80} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            height="auto"
            width="80%"
            sx={{ background: '#fff' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={5}
            minWidth={300}
          >
            <Box textAlign="center" mt={2} mb={2}>
              <Box style={{ fontFamily: 'arial black', fontSize: '20px' }}>
                Tela em Desenvolvimento
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <strong style={{ marginTop: 20, textAlign: 'center' }}>
                  Estará disponível em Breve
                </strong>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
