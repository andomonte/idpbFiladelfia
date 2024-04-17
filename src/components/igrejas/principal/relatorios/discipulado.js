import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import TabCelula from './abas/tabCelula';



function Discipulado({ rolMembros, perfilUser }) {
  const nomesCelulas = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );

  return (
    <Box height="90vh" minHeight={500}>
      <Box
        height="100%"
        width="100vw"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100vw" maxWidth={600} border="4px solid #fff">
          <Box height="100%">
            <Box
              height="25%"
              minHeight={150}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="corIgreja.principal"
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      alt="Remy Sharp"
                      src={corIgreja.logo}
                    />
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      fontFamily: 'Geneva',
                      fontWeight: 'bold',
                      fontSize: '22px',
                      color: '#fff',
                    }}
                    textAlign="center"
                  >
                    IDPB - CAFINPI{' '}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              height="73%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
              width="100%"
              bgcolor="corIgreja.principal"
              borderTop="2px solid #fff"
            >
              <Box width="95%" height="100%">
                <Box
                  height="10%"
                  minHeight={50}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    bgcolor: corIgreja.principal,
                    color: '#ffeb3b',
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  CÉLULA - {perfilUser.Celula}
                  <small
                    style={{ marginLeft: 10, marginTop: 2.5, color: 'pink' }}
                  >
                    {' '}
                    (MEBROS ATIVOS: {nomesCelulas.length})
                  </small>
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabCelula nomesCelulas={nomesCelulas} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Discipulado;
