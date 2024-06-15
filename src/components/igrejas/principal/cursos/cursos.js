import { Box } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TableContainer from '@mui/material/TableContainer';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Inscricoes from './inscricoes';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
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

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Eventos({ perfilUser, rolMembros }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));

  const [todos, setTodos] = React.useState([]);
  const [cursosCadastrados, setCursosCadastrados] = React.useState('');
  const [openPlan, setOpenPlan] = React.useState(false);
  const [eventoEscolhido, setEventoEscolhido] = React.useState('');
  const url = `/api/consultaTurmas`;
  const { data, error } = useSWR(url, fetcher);
  const url2 = `/api/consultaCursos`;
  const { data: data2, error: error2 } = useSWR(url2, fetcher);
  //  dateStart.getTime() < dateIndex.getTime() &&
  //    dateEnd.getTime() > dateIndex.getTime();
  React.useEffect(() => {
    if (data) {
      const dataStart = new Date();
      const dataAtual = dataStart.getTime();
      const eventoAtivo = data.filter(
        (results) =>
          results.Status === 'emAberto' &&
          results.inicioDivulgacao &&
          results.inicioDivulgacao &&
          Number(dataAtual) >=
            Number(new Date(results.inicioDivulgacao).getTime()) &&
          Number(dataAtual) <=
            Number(new Date(results.fimDivulgacao).getTime()),
      );

      const evento = eventoAtivo.filter(
        (val) =>
          Number(val.Distrito) === Number(perfilUser.Distrito) ||
          Number(val.Distrito) === 0,
      );

      setTodos(evento);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  React.useEffect(() => {
    if (data2) {
      setCursosCadastrados(data2);
    }
    if (error2) return <div>An error occured.</div>;
    if (!data2) return <div>Loading ...</div>;

    return 0;
  }, [data2]);

  const handleInscricao = (index) => {
    setOpenPlan(true);
    const evento = todos.filter(
      (val) => Number(val.codigoCurso) === Number(index),
    );

    setEventoEscolhido(evento);
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
      <Paper
        sx={{
          background: '#f0f0f0',
          width: '100%',
          height: 'calc(100%)',
          marginTop: 0,
          overflow: 'hidden',
          borderRadius: 5,
        }}
      >
        <TableContainer sx={{ height: '100%' }}>
          {todos?.map((row, index) => (
            <Box
              mt={3}
              //            bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={index}
            >
              <Box ml={0.5} display="flex" alignItems="center">
                <Avatar
                  alt="User"
                  src={row.imagemCurso}
                  sx={{
                    width: '20vw',
                    maxWidth: 100,
                    height: '20vw',
                    maxHeight: 100,
                  }}
                >
                  {row.imagemCurso ? row.imagemCurso : index + 1}
                </Avatar>
              </Box>
              <Box mt={index === 0 ? 2 : 1} ml={-2} mb={index === 0 ? 1 : 0}>
                <Box mt={0} ml={2}>
                  <Box fontFamily="Fugaz One" mt={0} ml={2} display="flex">
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs2">
                        {row.Curso ? row.Curso.toLocaleUpperCase() : null}
                      </Typography>
                    </ThemeProvider>
                  </Box>
                  <Box ml={2} display="flex">
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3">
                        <Box>
                          <Box display="flex" color={corIgreja.principal2}>
                            <Box color="#1a237e" ml={0} fontFamily="Fugaz One">
                              Valor:{' '}
                              {Number(row.valor).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    </ThemeProvider>
                  </Box>

                  <Box
                    width="100%"
                    mt={1}
                    mb={0}
                    display="flex"
                    justifyContent="flex-start"
                    ml={0}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs2">
                        <Box
                          ml={2}
                          mt={0}
                          onClick={() => {
                            handleInscricao(row.codigoCurso);
                          }}
                          style={{
                            width: '100%',
                            color: 'blue',
                            fontFamily: 'Fugaz One',
                          }}
                          sx={{ cursor: 'pointer' }}
                        >
                          VER MINHA INSCRIÇÃO
                        </Box>
                      </Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </TableContainer>
      </Paper>

      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <Inscricoes
          eventoEscolhido={eventoEscolhido}
          setOpenPlan={setOpenPlan}
          rolMembros={rolMembros}
          perfilUser={perfilUser}
          cursosCadastrados={cursosCadastrados}
        />
      </Dialog>
    </Box>
  );
}

export default Eventos;
