import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import BuscarNome from '../relatorios/supervisor/buscarNome';
import TabMembros from './abas/tabMembros';

function Celula({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const [contNumeroCelula, setContNumeroCelula] = React.useState(0);
  const [contNumeroCoord, setContNumeroCoord] = React.useState(0);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

  //--------------------------------------------------------------------

  //= ===================================================================
  const coordenadores = lideranca.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === 'Coordenador',
  );

  const coordParcial = coordenadores.map((itens) => itens.Coordenacao);
  const numeroCoordP = [...new Set(coordParcial)];

  const coordOrdenadas = numeroCoordP.sort((a, b) => {
    if (new Date(a) > new Date(b)) return 1;
    if (new Date(b) > new Date(a)) return -1;
    return 0;
  });

  const numeroCoord = coordOrdenadas;
  //--------------------------------------------------------------------
  const lideresSetor = lideranca.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      Number(val.Coordenacao) === Number(numeroCoord[contNumeroCoord]) &&
      val.Funcao === 'Lider',
  );

  const celulasParcial = lideresSetor.map((itens) => itens.Celula);

  const membrosCoordParcial = rolMembros.filter(
    (itens) => itens.Coordenacao === Number(numeroCoord[contNumeroCoord]),
  );
  const numeroCelulasP = [...new Set(celulasParcial)];

  const celulasOrdenadas = numeroCelulasP.sort((a, b) => {
    if (new Date(a) > new Date(b)) return 1;
    if (new Date(b) > new Date(a)) return -1;
    return 0;
  });

  const numeroCelulas = celulasOrdenadas;
  const membroCelula = rolMembros.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      Number(val.Coordenacao) === Number(numeroCoord[contNumeroCoord]) &&
      val.Celula === Number(numeroCelulas[contNumeroCelula]),
  );

  const handleIncCelula = () => {
    let contCelulaAtual = contNumeroCelula + 1;

    if (contCelulaAtual > numeroCelulas.length - 1) contCelulaAtual = 0;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleDecCelula = () => {
    let contCelulaAtual = contNumeroCelula - 1;

    if (contCelulaAtual < 0) contCelulaAtual = numeroCelulas.length - 1;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleIncCoord = () => {
    let contCoordAtual = contNumeroCoord + 1;

    if (contCoordAtual > numeroCoord.length - 1) contCoordAtual = 0;
    setContNumeroCoord(contCoordAtual);
    setContNumeroCelula(0);
  };

  const handleDecCoord = () => {
    let contCoordAtual = contNumeroCoord - 1;

    if (contCoordAtual < 0) contCoordAtual = numeroCoord.length - 1;
    setContNumeroCoord(contCoordAtual);
    setContNumeroCelula(0);
  };

  //= ===================================================================

  return (
    <Box
      height="90vh"
      minHeight={570}
      minWidth={300}
      width="100vw"
      bgcolor={corIgreja.principal2}
    >
      {!openBuscar ? (
        <Box
          height="100%"
          width="100%"
          minWidth={300}
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box minWidth={300} maxWidth={500} height="94%" width="92%">
            <Box width="100%" height="100%">
              <Box
                borderRadius={16}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight={570}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mt={0}
                  mb={0}
                  width="100%"
                  height="8%"
                >
                  <Box
                    bgcolor={corIgreja.principal}
                    borderRadius={16}
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display="flex"
                    height={50}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCoord();
                          }}
                        >
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color="#f0f0f0"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Rubik' }}
                      >
                        Coordenação:
                        <Box fontFamily="arial black" ml={2} mr={2}>
                          {numeroCoord[contNumeroCoord]}
                        </Box>
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
                            handleIncCoord();
                          }}
                        >
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box justifyContent="center" width="100%" display="flex">
                  <Box
                    bgcolor={corIgreja.principal}
                    style={{ borderTop: '1px solid #f0f0f0' }}
                    borderColor="white"
                    color="#000"
                    justifyContent="center"
                    width="100%"
                    display="flex"
                    height={50}
                  >
                    <Box ml={0} width="100%" display="flex">
                      <Box
                        width="10%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCelula();
                          }}
                        >
                          <BiCaretLeft size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        ml={0}
                        color="#f0f0f0"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="16px"
                        sx={{ fontFamily: 'Rubik' }}
                      >
                        Célula:
                        <Box fontFamily="arial black" ml={2} mr={2}>
                          {numeroCelulas[contNumeroCelula]}
                        </Box>
                        (
                        <Box ml={0.5} color="yellow" fontSize="12px">
                          Membros:
                        </Box>
                        <Box
                          color="yellow"
                          fontSize="12px"
                          fontFamily="arial black"
                          ml={1}
                          mr={0.5}
                        >
                          {membroCelula.length} / {membrosCoordParcial.length}
                        </Box>
                        )
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
                            handleIncCelula();
                          }}
                        >
                          <BiCaretRight size={30} color="#f0f0f0" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  display="flex"
                  bgcolor="#fafafa"
                  width="100%"
                  sx={{
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                  }}
                >
                  <TabMembros
                    setBuscarNome={setBuscarNome}
                    membroCelula={membroCelula}
                    setOpenBuscar={setOpenBuscar}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
      )}
    </Box>
  );
}

export default Celula;
