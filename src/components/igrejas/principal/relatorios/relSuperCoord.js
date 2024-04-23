import { Box, Grid } from '@material-ui/core';
import React from 'react';

import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import MostrarRelatorioGeral from 'src/components/igrejas/principal/relatorios/supervisor/mostrarRelSuper';

import Meses from 'src/utils/mesesAbrev';
import TamanhoJanela from 'src/utils/getSize';
import MostrarRelatorioVisita from './Visitas/mostrarRelVisitas';
import TabRelSuperGeral from './Visitas/tabRelSuper';
import TabRelSuperVisita from './Visitas/tabRelVisita';

const janela = TamanhoJanela();

function PlanMembro({ perfilUser, lideranca, distritos, supervisoes }) {
  //= ================================================================

  const distritoF = distritos.filter(
    (val) => val.Distrito === Number(perfilUser.Distrito),
  );

  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosRelVisita, setDadosRelVisita] = React.useState(false);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

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

  const tipo = ['Visita', 'Supervisão'];
  const [contTipo, setContTipo] = React.useState(0);
  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
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
                    <Grid item xs={12}>
                      <Box width="100%" height={40} display="flex">
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
                            <BiCaretLeft color="white" size={35} />
                          </IconButton>
                        </Box>
                        <Box
                          width="80%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          color="white"
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
                            <BiCaretRight size={35} color="white" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} />
                  </Grid>
                </Box>
                <Box mt={1} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        height={40}
                        bgcolor="white"
                        width="100%"
                        display="flex"
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
                              handleDecTipo();
                            }}
                          >
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                        >
                          Relatório de {tipo[contTipo]}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncTipo();
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
                    minHeight={225}
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    {contTipo ? (
                      <TabRelSuperGeral
                        numeroCoord={Number(perfilUser.Coordenacao)}
                        Mes={contMes}
                        Ano={contAno}
                        perfilUser={perfilUser}
                        lideranca={lideranca}
                        supervisoes={supervisoes}
                        setSendResumo={setSendResumo}
                        setDadosRelVisita={setDadosRelVisita}
                        distrito={distritoF[0].Distrito}
                      />
                    ) : (
                      <TabRelSuperVisita
                        distrito={distritoF[0].Distrito}
                        Mes={contMes}
                        Ano={contAno}
                        numeroCoord={perfilUser.Coordenacao}
                        lideranca={lideranca}
                        setSendResumo={setSendResumo}
                        setDadosRelVisita={setDadosRelVisita}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            {dadosRelVisita && dadosRelVisita.Avaliacoes ? (
              <MostrarRelatorioGeral
                dadosRelVisita={dadosRelVisita}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            ) : (
              <MostrarRelatorioVisita
                dadosRelVisita={dadosRelVisita}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PlanMembro;
