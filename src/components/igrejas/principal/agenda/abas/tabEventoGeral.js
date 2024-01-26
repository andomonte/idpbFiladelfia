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
import ConvData2 from 'src/utils/convData2';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  perfilUser,
  setSendResumo,
  setDadosEvento,
  Mes,
  Ano,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [eventoEncontrado, setEventoEncontrado] = React.useState([]);
  const [rel, setRel] = React.useState('nada');
  const nomeEvento = '';

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas

  const url1 = `/api/consultaEventos/${Mes}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    setRel('nada');
    setEventoEncontrado([]);
    let listaEveSuper = 0;

    if (sem1) {
      setRel(sem1);
      if (sem1 && sem1[0]) {
        if (perfilUser.Funcao === 'Supervisor') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Supervisao),
          );
        }
        if (perfilUser.Funcao === 'Coordenador') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Coordenacao),
          );
        }
        if (perfilUser.Funcao === 'PastorDistrito') {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Distrito),
          );
        }
        if (
          perfilUser.Funcao === 'Presidente' ||
          perfilUser.Funcao === 'Secretaria'
        ) {
          listaEveSuper = sem1.filter(
            (val) =>
              val.Funcao === perfilUser.Funcao &&
              Number(val.Numero) === Number(perfilUser.Igreja),
          );
        }

        if (listaEveSuper && listaEveSuper.length) {
          const listaEventosSetor = listaEveSuper.sort((a, b) => {
            if (new Date(a.Data) > new Date(b.Data)) return 1;
            if (new Date(b.Data) > new Date(a.Data)) return -1;
            return 0;
          });
          if (listaEventosSetor.length) setEventoEncontrado(listaEventosSetor);
        }
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, Mes, setSendResumo]);

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontSize: '12px',
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
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
          width="30%"
        >
          DATA
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="55%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          EVENTO
        </Box>
        <Box textAlign="center" width="15%">
          VER
        </Box>
      </Box>
      {rel !== 'nada' ? (
        <TableContainer sx={{ height: '80%' }}>
          {eventoEncontrado && Object.keys(eventoEncontrado).length > 0 ? (
            <Box>
              {eventoEncontrado.map((row, index) => (
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
                      fontSize: '14px',
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
                      fontSize="14px"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                    >
                      {eventoEncontrado[index]
                        ? ConvData2(eventoEncontrado[index].Data)
                        : '-'}
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      height="100%"
                      textAlign="center"
                      width="55%"
                      sx={{
                        borderRight: '1px solid #000',
                        borderLeft: '1px solid #000',
                      }}
                    >
                      {eventoEncontrado[index] ? (
                        <Box color="blue" display="flex">
                          <Box>
                            {nomeEvento !== '' ? <Box> {nomeEvento}</Box> : ''}
                          </Box>
                        </Box>
                      ) : (
                        ''
                      )}
                      {eventoEncontrado[index].Evento ? (
                        <Box display="flex">
                          {eventoEncontrado[index].Evento}
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
                      {eventoEncontrado[index].Data ? (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            setDadosEvento(eventoEncontrado[index]);
                            setSendResumo(true);
                          }}
                        >
                          <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                            <MdScreenSearchDesktop size={25} color="green" />
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
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Sem Eventos
            </Box>
          )}
        </TableContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80%"
          textAlign="center"
          width="100%"
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={-2}
              textAlign="center"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height={50} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
