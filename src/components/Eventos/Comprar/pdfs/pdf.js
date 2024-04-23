import * as React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import TamanhoJanela from 'src/utils/getSize';

import GeneratePdf from './generatePdf';

const janela = TamanhoJanela();
let largura2 = janela.width;
let altura2 = janela.height;
if (altura2 < 500) altura2 = 500;
if (largura2 > 400) largura2 = 400;

function PdfCompra({ codigo, nome, fp, status, parcelas, cpf, valor }) {
  const ref = React.useRef();
  // const dataFinal = String(`${data} `);
  //  console.log('estadia', estadia);

  return (
    <Box
      width="90vw"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="row"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        width="100%"
        height="100%"
        color="white"
      >
        <Box width="100%" height="100%">
          <div
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            }}
            className="content"
            ref={ref}
            id="comprovante"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Box height="100%" width="100%" mt={0} ml={0}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="40%"
                  width="100%"
                  mt={0}
                >
                  <Box width="100%">
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="row"
                      alignItems="center"
                      width="100%"
                    >
                      <Box width="100%">
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={0}
                          mb={0}
                          sx={{
                            fontSize: '16px',

                            fontWeight: 'bold',
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '12px',
                              fontFamily: 'Arial Black',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            COMPROVANTE DE PAGAMENTO
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          width="100%"
                          mt={2}
                          mb={2}
                          justifyContent="center"
                          sx={{
                            fontSize: '15px',
                            color: '#e0711a',
                            fontWeight: 'bold',
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '14px',
                              color: '#e0711a',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                            }}
                          >
                            {nome}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          width="100%"
                          mt={-3}
                          justifyContent="center"
                          sx={{
                            fontSize: '15px',
                            color: '#e0711a',
                            fontWeight: 'bold',
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '14px',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            CPF: {cpf}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center">
                          <Box width="90%">
                            <Box
                              display="flex"
                              justifyContent="center"
                              width="100%"
                              mt={2}
                              sx={{
                                fontSize: '16px',
                                color: '#e0711a',
                                fontWeight: 'bold',
                              }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  fontSize: '12px',
                                  fontFamily: 'Arial Black',
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                              >
                                CONVENÇÃO IDPB-AM 2023
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box height="60%" width="100%" mt={0}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    height="100%"
                  >
                    <Box height="100%" width="100%">
                      <Box width="100%" bgcolor="#81c784">
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={0}
                          mb={2}
                          sx={{
                            fontSize: '16px',
                            color: '#fff',
                            fontWeight: 'bold',
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '18px',
                              marginTop: 10,
                              color: 'white',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                            }}
                          >
                            {status}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={-2}
                          mb={0}
                          sx={{
                            fontSize: '20px',
                            color: '#bf360c',
                            fontWeight: 'bold',
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '20px',
                              color: '#e0711a',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                              marginTop: -3,
                              marginLeft: 10,
                            }}
                          >
                            {codigo}
                          </Typography>
                        </Box>
                      </Box>
                      <Box width="100%" display="flex" justifyContent="center">
                        <Box width="100%">
                          {fp === 'Pix' && (
                            <Box width="100%">
                              <Box display="flex" width="100%" mt={3} ml={2}>
                                <Grid item xs={3} md={3}>
                                  <Box
                                    sx={{
                                      fontSize: '14px',
                                      color: 'white',
                                    }}
                                    width="80vw"
                                  >
                                    PAGO COM PIX
                                  </Box>
                                </Grid>
                              </Box>
                              <Box
                                display="flex"
                                width="100%"
                                mt={0}
                                mb={-1}
                                ml={2}
                                sx={{
                                  fontSize: '16px',
                                  color: '#e0711a',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Grid item xs={8} md={6}>
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '12px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      Valor avista R${valor},00
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Box>
                            </Box>
                          )}
                          {fp === 'Boleto' && (
                            <Box width="100%">
                              <Box display="flex" width="100%" mt={3} ml={2}>
                                <Grid item xs={3} md={3}>
                                  <Box
                                    sx={{
                                      fontSize: '14px',
                                      color: 'white',
                                    }}
                                    width="80vw"
                                  >
                                    BOLETO BANCÁRIO
                                  </Box>
                                </Grid>
                              </Box>
                              <Box
                                display="flex"
                                width="100%"
                                mt={0}
                                mb={-1}
                                ml={2}
                                sx={{
                                  fontSize: '16px',
                                  color: '#e0711a',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Grid item xs={8} md={6}>
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '12px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      Valor a vista de {valor}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Box>
                            </Box>
                          )}
                          {fp === 'Cartão de Crédito' && (
                            <Box width="100%">
                              <Box display="flex" width="100%" mt={3} ml={2}>
                                <Grid item xs={3} md={3}>
                                  <Box
                                    sx={{
                                      fontSize: '14px',
                                      color: 'white',
                                    }}
                                    width="80vw"
                                  >
                                    CARTÃO DE CRÉDITO
                                  </Box>
                                </Grid>
                              </Box>
                              <Box
                                display="flex"
                                width="100%"
                                mt={0}
                                mb={-1}
                                ml={2}
                                sx={{
                                  fontSize: '16px',
                                  color: '#e0711a',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Grid item xs={9} md={9}>
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '12px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {parcelas}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Box>
                            </Box>
                          )}

                          <Box
                            display="flex"
                            width="100%"
                            mt={2}
                            ml={2}
                            sx={{
                              fontSize: '16px',
                              color: '#e0711a',
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                      </Box>
                      <Box width="100%" display="flex" justifyContent="center">
                        <Box width="100%" mt={2}>
                          <Box mt={0} width="100%">
                            <GeneratePdf html={ref} cpf={cpf} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default PdfCompra;
