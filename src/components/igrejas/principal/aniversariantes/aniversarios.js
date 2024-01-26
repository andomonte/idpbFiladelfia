import React from 'react';
import { Box, Grid } from '@material-ui/core';
import List from '@mui/material/List';

import corIgreja from 'src/utils/coresIgreja';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { BiCaretRight, BiCaretLeft } from 'react-icons/bi';
import SearchList from './searchList';

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');
  const novaData = new Date(
    parseInt(2000, 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );

  return novaData;
}

function compare(a, b) {
  if (
    converteData(
      moment(a.Nascimento.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'),
    ) <
    converteData(
      moment(b.Nascimento.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'),
    )
  )
    return -1;
  return true;
}

function BuscarAniversariantes({ distritos, rolMembros, perfilUser }) {
  // const mes = Meses();

  //= ========================================================================
  // data de inicio
  //= ========================================================================

  //= ========================================================================
  //= ================================================================
  const mes = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ];
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const [contMes, setContMes] = React.useState(mesAtual);

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) contMesAtual = 0;
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) contMesAtual = 11;
    setContMes(contMesAtual);
  };

  //= ========================================================================
  // data de Final
  //= ========================================================================
  //= ========================================================================
  const niverGeralValido = rolMembros.filter(
    (results) => results.Nascimento !== null && results.Nascimento.length > 8,
  );

  const niverGeral = niverGeralValido.filter(
    (results) =>
      converteData(
        moment(results.Nascimento.substring(0, 10)).format(
          'DD/MM/YYYY  hh:mm:ss',
        ),
      ).getMonth() === contMes,
  );

  const niverSetor = niverGeral.filter((results) => {
    if (
      Number(results.Celula) === Number(perfilUser.Celula) &&
      Number(results.Distrito) === Number(perfilUser.Distrito)
    ) {
      return results;
    }
    return 0;
  });
  const niverSetorOrdenado = niverSetor.sort(compare);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={500}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        bgcolor={corIgreja.secundaria}
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box width="100%" height="100%">
          <Box
            height="16%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url('/images/aniversariantes.png')`,
              backgroundSize: '100% 100%',
            }}
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="white"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              <Box>ANIVERSARIANTES</Box> <Box> DO MÊS (CÉLULA) </Box>
            </Box>
          </Box>
          <Box
            height="8%"
            minHeight={40}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              bgcolor="#fafafa"
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
                  <BiCaretLeft size={30} />
                </IconButton>
              </Box>
              <Box
                width="76%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                sx={{ fontFamily: 'Fugaz One' }}
              >
                {mes[contMes]}
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
                  <BiCaretRight size={30} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            width="100%"
            height="76%"
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {Object.keys(niverSetorOrdenado).length ? (
              <Box width="100%" height="100%">
                <List
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',

                    '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {niverSetorOrdenado.map((itens) => (
                    <Box ml={0} key={itens.id}>
                      <Box>
                        <Grid>
                          <SearchList
                            mesAtual={contMes}
                            rolMembros={itens}
                            distritos={distritos}
                          />
                        </Grid>
                      </Box>
                    </Box>
                  ))}
                </List>
              </Box>
            ) : (
              <Box
                bgcolor="background.paper"
                height="66vh"
                width="90%"
                border={1}
              >
                <Box mt={20} textAlign="center">
                  {' '}
                  Não temos aniversariantes registrados nesse Periodo
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BuscarAniversariantes;
