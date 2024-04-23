import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import meuDataTime from 'src/utils/meuDataTime';
import meuDataTimeBr from 'src/utils/meuDataTimeBrasilia';

import dataSistema from 'src/utils/pegaDataAtual';
import { makeStyles } from '@material-ui/core/styles';
import ListaEventos from './listaEventos';

const useStyles = makeStyles((theme) => ({
  ajustFont1: {
    [theme.breakpoints.down('md')]: {
      fontSize: 'calc(10px + 1.0vw)',
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(14px + 1vw)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(16px + 0.8vw)',
    },
  },
}));

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Eventos({ perfilUser, usuario }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));

  const classes = useStyles();
  const [todos, setTodos] = React.useState('');
  const [dataAtual, setDataAtual] = React.useState('');

  const url = `/api/consultaEventosGerais`;
  const { data, error } = useSWR(url, fetcher);

  React.useEffect(async () => {
    const dataAtualSistema = await dataSistema();

    if (dataAtualSistema) setDataAtual(meuDataTimeBr(dataAtualSistema));
  }, []);

  React.useEffect(() => {
    if (data && data.length && dataAtual) {
      const eventoAtivo = data.filter(
        (results) =>
          dataAtual.getTime() -
            meuDataTime(new Date(results.DataIni).toISOString()).getTime() >
            0 &&
          dataAtual.getTime() -
            meuDataTime(new Date(results.DataFim).toISOString()).getTime() <
            0,
      );
      if (perfilUser) {
        const evento = eventoAtivo.filter(
          (val) =>
            (Number(val.Jurisdicao) === Number(perfilUser.CodigoJurisdicao) ||
              Number(val.Jurisdicao) === 0) &&
            (Number(val.Distrito) === Number(perfilUser.CodigoDistrito) ||
              Number(val.Distrito) === 0),
        );
        if (evento.length) setTodos(evento);
      } else setTodos(eventoAtivo);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data, perfilUser, dataAtual]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={260}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        height="97%"
        width="96%"
        bgcolor={corIgreja.principal}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
      >
        <Box height="100%" width="100%">
          {todos.length ? (
            <ListaEventos
              usuario={usuario}
              eventos={todos}
              dataAtual={dataAtual}
            />
          ) : (
            <Box
              width="100%"
              height="80%"
              fontFamily="Fugaz One"
              fontSize="18px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              className={classes.ajustFont1}
            >
              NENHUM EVENTO ABERTO NESSE PERÍODO
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Eventos;
