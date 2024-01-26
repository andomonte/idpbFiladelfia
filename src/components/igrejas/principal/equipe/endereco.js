import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';

function Celula({ perfilUser, rolMembros }) {
  const dadosEndereco = rolMembros.filter(
    (val) => Number(val.RolMembro) === Number(perfilUser.RolMembro),
  );

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

  const { Logradouro } = dadosEndereco[0];
  let logradouro;
  if (Logradouro.length > 30)
    logradouro = Logradouro.substring(0, Logradouro.lastIndexOf(' '));
  if (Logradouro.length < 2) logradouro = 'Falta Atualizar o Endereço';

  const { CEP } = dadosEndereco[0];
  let cep;
  if (CEP.length < 2) cep = 'Não Informado';

  const { Numero } = dadosEndereco[0];
  let numero;
  if (Numero.length < 2) numero = 'Não Informado';

  const { Bairro } = dadosEndereco[0];
  let bairro;
  if (Bairro.length > 30) bairro = Bairro.substring(0, Bairro.lastIndexOf(' '));
  if (Bairro.length < 2) bairro = 'Falta Atualizar o Endereço';

  const { Complemento } = dadosEndereco[0];
  let complemento;
  if (Complemento.length > 30)
    complemento = Complemento.substring(0, Complemento.lastIndexOf(' '));
  if (Complemento.length < 2) complemento = 'Falta Atualizar o Endereço';

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30

  //= ===================================================================
  return (
    <Box height="90vh" minHeight={500} minWidth={300}>
      <Box
        height="100%"
        width="100vw"
        minWidth={300}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          minWidth={300}
          height="100%"
          width="100vw"
          maxWidth={600}
          border="4px solid #fff"
        >
          <Box height="100%">
            <Box
              height="25%"
              minHeight={150}
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
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
                    IDPB - Filadelfia{' '}
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
              minWidth={300}
              width="100%"
              bgcolor={corIgreja.principal}
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
                  MEU ENDEREÇO RESIDENCIAL
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  display="flex"
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <Box height="100%" mt={0} width="100%">
                    <Box height="100%">
                      <Box
                        width="100%"
                        height="25%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          width="100%"
                          display="flex"
                          ml={0}
                          sx={{
                            color: '#000',
                            fontFamily: 'Times New Roman Times serif',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={2}>Logradouro:</Box>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          mt={0}
                          sx={{
                            color: 'blue',
                            fontFamily: 'arial black',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={5}> {logradouro}</Box>
                        </Box>
                      </Box>

                      <Box
                        height="25%"
                        bgcolor="#e0e0e0"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={0}
                      >
                        <Box
                          width="100%"
                          sx={{
                            color: '#000',
                            fontFamily: 'Times New Roman Times serif',
                            fontSize: '16px',
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box ml={2} width="50%">
                              CEP:
                            </Box>

                            <Box ml={2} width="50%">
                              Número:
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box
                              color="blue"
                              style={{ fontFamily: 'arial black' }}
                              ml={5}
                              width="50%"
                            >
                              {cep}
                            </Box>
                            <Box
                              color="blue"
                              textAlign="center"
                              width="50%"
                              style={{ fontFamily: 'arial black' }}
                            >
                              {numero}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        width="100%"
                        height="25%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          width="100%"
                          display="flex"
                          ml={0}
                          sx={{
                            color: '#000',
                            fontFamily: 'Times New Roman Times serif',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={2}>Bairro:</Box>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          mt={0}
                          sx={{
                            color: 'blue',
                            fontFamily: 'arial black',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={5}> {bairro}</Box>
                        </Box>
                      </Box>

                      <Box
                        width="100%"
                        height="25%"
                        bgcolor="#e0e0e0"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                        }}
                      >
                        <Box
                          width="100%"
                          display="flex"
                          ml={0}
                          sx={{
                            color: '#000',
                            fontFamily: 'Times New Roman Times serif',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={2}>Complemento:</Box>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          mt={0}
                          sx={{
                            color: 'blue',
                            fontFamily: 'arial black',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        >
                          <Box ml={5}> {complemento}</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Celula;
