import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import corIgreja from 'src/utils/coresIgreja';
import { Oval } from 'react-loading-icons';
import '@fontsource/rubik';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  minWidth: 400,
  bgcolor: corIgreja.principal,
  boxShadow: 24,
  p: 4,
};
export default function Espere({ descricao }) {
  return (
    <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box mt={-5}>
            <Box textAlign="center" mt={3} mb={2}>
              <img src={corIgreja.logo} alt="Celulas" width={200} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                height="auto"
                width="80%"
                sx={{ background: '#fafafa' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius={5}
                minWidth={300}
              >
                <Box textAlign="center" mt={2} mb={2}>
                  <Box style={{ fontFamily: 'Fugaz One', fontSize: '16px' }}>
                    {descricao.toUpperCase()}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <strong
                      style={{ textAlign: 'center', fontFamily: 'Rubik' }}
                    >
                      Por Favor Espere ...
                    </strong>
                    <Box display="flex" justifyContent="center" mt={5}>
                      <Oval stroke="blue" width={80} height={80} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
