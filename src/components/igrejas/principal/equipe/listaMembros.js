import { Box } from '@material-ui/core';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TabMembros from './abas/tabMembros';
import BuscarNome from './abas/buscarNome';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const theme = createTheme();
theme.typography.h4 = {
  fontSize: '9px',
  '@media (min-width:400px)': {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme.typography.h3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.h2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
function Celula({
  perfilUser,
  coordenacoes,
  supervisoes,
  distritos,
  celulas,
  rolMembros,
}) {
  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);

  //--------------------------------------------------------------------

  const membrosCelula = rolMembros.filter(
    (val) =>
      val.Distrito &&
      val.Celula &&
      val.Coordenacao &&
      val.Supervisao &&
      val.Situacao !== 'INATIVO' &&
      Number(val.Distrito) === Number(distritos.Distrito) &&
      Number(val.Coordenacao) === Number(coordenacoes.Coordenacao) &&
      Number(val.Supervisao) === Number(supervisoes.Supervisao) &&
      Number(val.Celula) === Number(celulas.Celula),
  );
  const membrosAtivo = rolMembros.filter(
    (val) =>
      val.Distrito &&
      val.Celula &&
      val.Coordenacao &&
      val.Supervisao &&
      val.Situacao === 'ATIVO' &&
      Number(val.Distrito) === Number(distritos.Distrito) &&
      Number(val.Coordenacao) === Number(coordenacoes.Coordenacao) &&
      Number(val.Supervisao) === Number(supervisoes.Supervisao) &&
      Number(val.Celula) === Number(celulas.Celula),
  );
  const membrosNovo = rolMembros.filter(
    (val) =>
      val.Distrito &&
      val.Celula &&
      val.Coordenacao &&
      val.Supervisao &&
      val.Situacao === 'NOVO' &&
      Number(val.Distrito) === Number(distritos.Distrito) &&
      Number(val.Coordenacao) === Number(coordenacoes.Coordenacao) &&
      Number(val.Supervisao) === Number(supervisoes.Supervisao) &&
      Number(val.Celula) === Number(celulas.Celula),
  );

  //= ===================================================================

  //--------------------------------------------------------

  //----------------------------------------------------------------

  //= ===================================================================

  return (
    <Box
      height="100%"
      width="100%"
      fontSize="16px"
      sx={{ fontFamily: 'Rubik' }}
    >
      <Box
        height="100%"
        width="100%"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          width="100%"
          ml={0}
          mt={1}
          height="4%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h4">MEMBROS ATIVOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="35%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h4">MEMBROS NOVOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h4"> TOTAL DE MEMBROS</Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Box
          width="100%"
          height="5%"
          ml={0}
          mb={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="black"
            bgcolor="#ffff8d"
            fontSize="12px"
            height="100%"
            borderRadius={6}
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h2"> {membrosAtivo.length}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="black"
            bgcolor="#ffff8d"
            borderRadius={6}
            fontSize="12px"
            height="100%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h2">{membrosNovo.length}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            fontSize="12px"
            color="black"
            bgcolor="#ffff8d"
            borderRadius={6}
            height="100%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h2"> {membrosCelula.length}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Box
          width="100%"
          ml={0}
          mt={1}
          height="10%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="12px"
          color="white"
          fontFamily="Fugaz One"
          style={{ borderTop: '1px solid #f0f0f0' }}
        >
          LISTA DE MEMBROS DA CÉLULA - {celulas.Celula}
        </Box>
        <Box
          color="#000"
          justifyContent="center"
          width="100%"
          display="flex"
          height="70%"
        >
          <TabMembros
            setBuscarNome={setBuscarNome}
            membroCelula={membrosCelula}
            setOpenBuscar={setOpenBuscar}
            perfilUser={perfilUser}
          />
        </Box>
      </Box>
      <Dialog fullScreen open={openBuscar} TransitionComponent={Transition}>
        <BuscarNome
          perfilUser={perfilUser}
          nomeBuscado={buscarNome}
          setOpenBuscar={setOpenBuscar}
        />
      </Dialog>
    </Box>
  );
}

export default Celula;
