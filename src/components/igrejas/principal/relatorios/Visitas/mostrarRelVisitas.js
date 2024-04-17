import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import ConverteData from 'src/utils/convData2';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    fontSize: '16px',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function RelCelula({ dadosRelVisita, setSendResumo }) {
  const classes = useStyles();
  //= ================================================================
  //  const InicialNCelula = { label: 'Escolha...', value: 0 };
  const [openObs, setOpenObs] = React.useState(false);

  const [presentes] = React.useState(dadosRelVisita.Observacoes);

  return (
    <Box
      bgcolor={corIgreja.principal}
      height="100%"
      minHeight={570}
      width="100%"
    >
      <Box
        height="100%"
        minWidth={300}
        width="100%"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100%" minWidth={300}>
          <Box height="100%">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              borderRadius={16}
            >
              <Box width="94%">
                <Box
                  color="white"
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                >
                  RELATÓRIO DE VISITAS
                </Box>
                ´
                <Box
                  color="white"
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                  mb={5}
                  mt={-2}
                >
                  DO {dadosRelVisita.Funcao.toUpperCase()}(A):
                </Box>
                <Box
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                  mb={5}
                  mt={-4}
                  color={corIgreja.textoP}
                >
                  {console.log('dadosRelVisita', dadosRelVisita)}
                  {dadosRelVisita.Nome.toUpperCase()}
                </Box>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={6}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data da Visita
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box
                        fontSize="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={50}
                      >
                        {ConverteData(dadosRelVisita.Data)}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />

                  <Grid item xs={5}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Célula Visitada
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.CelulaVisitada}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Recepcão e Pontualidade
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Recepcao}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Estrutura do Local
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Estrutura}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Etapas da Reunião
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Recepcao}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Observações
                    </Typography>
                  </Box>
                  <Grid container item xs={12} spacing={0}>
                    <Grid item xs={12}>
                      <Box
                        mt={1}
                        mb={5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="2.5vh"
                        minHeight={10}
                        bgcolor="#fafafa"
                      >
                        {presentes ? (
                          <Button
                            style={{
                              background: 'white',
                              color: 'blue',
                              fontFamily: 'arial black',
                              width: '100%',
                            }}
                            component="a"
                            variant="contained"
                            onClick={() => {
                              setOpenObs(true);
                            }}
                          >
                            CLICK P/ VER OBSERVAÇÕES
                          </Button>
                        ) : (
                          <Button
                            style={{
                              background: 'white',
                              color: 'gray',
                              fontSize: '14px',
                              fontFamily: 'arial black',
                              width: '100%',
                            }}
                            component="a"
                            variant="contained"
                          >
                            SEM OBSERVAÇÕES
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Box className={classes.novoBox} mt="3vh">
                      <Button
                        style={{
                          color: 'white',
                          borderRadius: '10px',
                          fontFamily: 'arial black',
                          background: corIgreja.tercenaria,
                          width: '100%',
                        }}
                        onClick={() => {
                          setSendResumo(false);
                        }}
                        variant="contained"
                        severity="success"
                      >
                        VOLTAR
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog fullScreen open={openObs} TransitionComponent={Transition}>
        <Box
          mt={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="95%"
          color="black"
          bgcolor="#fafafa"
        >
          <Box
            mt={-1}
            height="100%"
            width="94%"
            display="flex"
            fontSize="18px"
            justifyContent="center"
            alignItems="center"
          >
            {presentes !== undefined && presentes !== null ? (
              <Box textAlign="justify"> {presentes}</Box>
            ) : (
              'Sem Observações'
            )}
          </Box>
        </Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="5%"
          minHeight={10}
          bgcolor="#fafafa"
        >
          <Button
            style={{
              background: 'orange',
              color: 'black',
              fontFamily: 'arial black',
              fontSize: '16px',
              width: '90%',
            }}
            component="a"
            variant="contained"
            onClick={() => {
              setOpenObs(false);
            }}
          >
            FECHAR OBSERVAÇÕES
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default RelCelula;
