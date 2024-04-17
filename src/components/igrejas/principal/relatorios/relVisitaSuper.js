import { Box, Grid, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { MdCreateNewFolder } from 'react-icons/md';
import NovoRelatorio from 'src/components/igrejas/principal/relatorios/supervisor/novoRelVisitaSuper';
import MostrarRelatorio from 'src/components/igrejas/principal/relatorios/supervisor/editarRelVisitaSuper';
import Meses from 'src/utils/meses';
import TamanhoJanela from 'src/utils/getSize';
import TabRelSuperVisita from './supervisor/aba/tabRelVisita';



const janela = TamanhoJanela();

function PlanMembro({ perfilUser, lideranca }) {
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [openNovoRelatorio, setOpenNovoRelatorio] = React.useState(false);
  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosRelVisita, setDadosRelVisita] = React.useState(false);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2022) contAnoAtual = 2022;
    setContAno(contAnoAtual);
  };
  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
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
      {!openNovoRelatorio ? (
        <Box
          width="96%"
          height="97%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          borderRadius={16}
          ml={0}
          bgcolor={corIgreja.principal}
        >
          {!sendResumo ? (
            <Box
              style={{
                borderRadius: '16px',
              }}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
            >
              <Box height="100%">
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box width="96%" mt={-1} ml={1}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={8}>
                        <Box
                          width="100%"
                          height={40}
                          display="flex"
                          bgcolor="#f0f0f0"
                          borderRadius={5}
                        >
                          <Box
                            width="20%"
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleDecMes();
                              }}
                            >
                              <BiCaretLeft
                                color={corIgreja.principal2}
                                size={35}
                              />
                            </IconButton>
                          </Box>
                          <Box
                            width="80%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontSize="16px"
                            color="black"
                            mt={0.5}
                            sx={{ fontFamily: 'Fugaz One' }}
                          >
                            {mes[contMes].descricao.toUpperCase()} / {contAno}
                          </Box>
                          <Box
                            width="20%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                handleIncMes();
                              }}
                            >
                              <BiCaretRight
                                size={35}
                                color={corIgreja.principal2}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          style={{
                            background: '#f0f0f0',
                            width: '100%',
                            height: '100%',
                            fontSize: '14px',
                            fontFamily: 'arial black',
                          }}
                          onClick={() => setOpenNovoRelatorio(true)}
                          variant="contained"
                          severity="success"
                          endIcon={
                            <MdCreateNewFolder
                              size={30}
                              color={corIgreja.principal}
                            />
                          }
                        >
                          Novo
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={2} width="96%" ml={1}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={12}>
                        <Box
                          borderRadius={5}
                          height={40}
                          color="white"
                          width="100%"
                          display="flex"
                        >
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontSize: '16px', fontFamily: 'Fugaz One' }}
                          >
                            VISITAS ÀS CÉLULAS
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    mt={4}
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                    }}
                    height={janela.height > 570 ? '74%' : '70%'}
                    minWidth={300}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={250}
                    width="95%"
                  >
                    <Box
                      height="100%"
                      minHeight={205}
                      bgcolor="#fafafa"
                      width="100%"
                      borderRadius={16}
                    >
                      <TabRelSuperVisita
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        lideranca={lideranca}
                        setSendResumo={setSendResumo}
                        setDadosRelVisita={setDadosRelVisita}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <MostrarRelatorio
                dadosRelVisita={dadosRelVisita}
                perfilUser={perfilUser}
                lideranca={lideranca}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            </Box>
          )}
        </Box>
      ) : (
        <NovoRelatorio
          perfilUser={perfilUser}
          setOpenNovoRelatorio={setOpenNovoRelatorio}
          lideranca={lideranca}
          Mes={contMes}
          Ano={contAno}
        />
      )}
    </Box>
  );
}

export default PlanMembro;
