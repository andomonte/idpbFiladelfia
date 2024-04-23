import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { MdScreenSearchDesktop } from 'react-icons/md';
import ConvertData from 'src/utils/convData2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '9px',
  '@media (min-width:350px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};
export default function TabCelula({
  setSendResumo,
  supervisoes,
  setDadosRelVisita,
  Mes,
  Ano,
  numeroCoord,
  distrito,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [relEncontrado, setRelEncontrado] = React.useState([]);
  const [rel, setRel] = React.useState('nada');

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas

  const url1 = `/api/consultaRelSuperVisita/${Mes}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    setRel('nada');
    setRelEncontrado([]);
    let listaRelSuper;
    if (sem1) {
      setRel(sem1);
      if (sem1 && sem1[0]) {
        if (numeroCoord === 0) {
          listaRelSuper = sem1.filter(
            (val) =>
              Number(val.Distrito) === Number(distrito) &&
              val.Funcao === 'Supervisor',
          );
        } else {
          listaRelSuper = sem1.filter(
            (val) =>
              Number(val.Distrito) === Number(distrito) &&
              Number(val.Coordenacao) === Number(numeroCoord) &&
              val.Funcao === 'Supervisor',
          );
        }
        if (listaRelSuper && listaRelSuper.length) {
          const listaMinhaVisitas = listaRelSuper.sort((a, b) => {
            if (new Date(a.Data) > new Date(b.Data)) return 1;
            if (new Date(b.Data) > new Date(a.Data)) return -1;
            return 0;
          });
          if (listaMinhaVisitas.length) setRelEncontrado(listaMinhaVisitas);
        }
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, numeroCoord]);

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          fontSize: '13px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height={40}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
        >
          DATA
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="60%"
        >
          SUPERVISÃO
        </Box>
        <Box textAlign="center" width="15%">
          VER
        </Box>
      </Box>
      <ThemeProvider theme={theme}>
        <Typography variant="hs4">
          {rel !== 'nada' ? (
            <TableContainer sx={{ maxHeight: 290 }}>
              {relEncontrado && Object.keys(relEncontrado).length > 0 ? (
                <Box>
                  {relEncontrado.map((row, index) => (
                    <Box
                      mt={0}
                      display="flex"
                      alignItems="center"
                      key={row.id}
                      height={58}
                    >
                      <Box
                        sx={{
                          fontFamily: 'arial black',

                          borderBottom: '1px solid #000',
                        }}
                        height="100%"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          textAlign="center"
                          width="25%"
                        >
                          {relEncontrado[index]
                            ? ConvertData(relEncontrado[index].Data) // relEncontrado[index].CelulaVisitada.slice(8, 11)
                            : '-'}
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          height="100%"
                          textAlign="center"
                          width="60%"
                          sx={{
                            borderRight: '1px solid #000',
                            borderLeft: '1px solid #000',
                          }}
                        >
                          {relEncontrado[index] ? (
                            <Box color="blue" display="flex">
                              <Box>
                                {relEncontrado[index].Supervisao !== '' &&
                                supervisoes.filter(
                                  (val) =>
                                    Number(val.Supervisao) ===
                                    Number(relEncontrado[index].Supervisao),
                                ).length ? (
                                  <Box>
                                    {relEncontrado[index].Supervisao} -{' '}
                                    {supervisoes
                                      .filter(
                                        (val) =>
                                          Number(val.Supervisao) ===
                                          Number(
                                            relEncontrado[index].Supervisao,
                                          ),
                                      )[0]
                                      .Supervisao_Nome.toLocaleUpperCase()}
                                  </Box>
                                ) : (
                                  ''
                                )}
                              </Box>
                            </Box>
                          ) : (
                            ''
                          )}
                          {relEncontrado[index].Progresso ? (
                            <Box color="#ba68c8" display="flex">
                              {relEncontrado[index].Progresso}%
                            </Box>
                          ) : (
                            ''
                          )}
                        </Box>
                        <Box
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          alignItems="center"
                          width="15%"
                        >
                          {relEncontrado[index].Data ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                setDadosRelVisita(relEncontrado[index]);
                                setSendResumo(true);
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdScreenSearchDesktop
                                  size={25}
                                  color="green"
                                />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            '-'
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  height="38vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontFamily="Fugaz One"
                >
                  SEM RELATÓRIOS
                </Box>
              )}
            </TableContainer>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box fontFamily="arial black" mb={5} mt={-2} textAlign="center">
                  Buscando Dados
                </Box>
                <Oval stroke="blue" width={50} height={50} />
              </Box>
            </Box>
          )}
        </Typography>
      </ThemeProvider>
    </Box>
  );
}
