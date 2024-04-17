import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import corIgreja from 'src/utils/coresIgreja';



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
              <img src={corIgreja.logo} alt="Celulas" width={80} />
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
                  <Box style={{ fontFamily: 'arial black', fontSize: '20px' }}>
                    {descricao}
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
      </Box>
    </Modal>
  );
}
