import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { MdScreenSearchDesktop } from 'react-icons/md';

import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ConverteData2 from 'src/utils/convData2';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({ Mes, Ano, perfilUser, numeroCelulas }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [openPlan, setOpenPlan] = React.useState(false);

  const [dataSend, setDataSend] = React.useState([]);

  const [dataSem1, setDataSem1] = React.useState([]);
  const [presSem1, setPresSem1] = React.useState(false);
  const [presSem2, setPresSem2] = React.useState(false);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [presSem3, setPresSem3] = React.useState(false);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [presSem4, setPresSem4] = React.useState(false);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [presSem5, setPresSem5] = React.useState(false);
  const [dataSem5, setDataSem5] = React.useState([]);
  const semana = PegaSemana(Mes, Ano);
  // para usar semanas

  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;

  const url1 = `/api/consultaPlanejamentoCelulas/${semana1}`;
  const url2 = `/api/consultaPlanejamentoCelulas/${semana2}`;
  const url3 = `/api/consultaPlanejamentoCelulas/${semana3}`;
  const url4 = `/api/consultaPlanejamentoCelulas/${semana4}`;
  const url5 = `/api/consultaPlanejamentoCelulas/${semana5}`;
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: sem2, errorSem2 } = useSWR(url2, fetcher);
  const { data: sem3, errorSem3 } = useSWR(url3, fetcher);
  const { data: sem4, errorSem4 } = useSWR(url4, fetcher);
  const { data: sem5, errorSem5 } = useSWR(url5, fetcher);

  React.useEffect(() => {
    mutate(url1);
    mutate(url2);
    mutate(url3);
    mutate(url4);
    mutate(url5);
    setDataSem1([]);
    setPresSem1(false);
    setDataSem2([]);
    setPresSem2(false);
    setDataSem3([]);
    setPresSem3(false);
    setDataSem4([]);
    setPresSem4(false);
    setDataSem5([]);
    setPresSem5(false);
  }, [semana, numeroCelulas]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      const presCelula = sem1.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem1(presCelula[0]);
        setPresSem1(true);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, numeroCelulas]);

  React.useEffect(() => {
    if (sem2 && sem2.length) {
      const presCelula = sem2.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        setDataSem2(presCelula[0]);
        setPresSem2(true);
      }
    }
    if (errorSem2) return <div>An error occured.</div>;
    if (!sem2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem2, numeroCelulas]);

  React.useEffect(() => {
    if (sem3 && sem3.length) {
      const presCelula = sem3.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem3(presCelula[0]);
        setPresSem3(true);
      }
    }
    if (errorSem3) return <div>An error occured.</div>;
    if (!sem3) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem3, numeroCelulas]);

  React.useEffect(() => {
    if (sem4 && sem4.length) {
      const presCelula = sem4.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem4(presCelula[0]);
        setPresSem4(true);
      }
    }
    if (errorSem4) return <div>An error occured.</div>;
    if (!sem4) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem4, numeroCelulas]);
  React.useEffect(() => {
    if (sem5 && sem5.length) {
      const presCelula = sem5.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula.length) {
        setDataSem5(presCelula[0]);
        setPresSem5(true);
      }
    }
    if (errorSem5) return <div>An error occured.</div>;
    if (!sem5) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem5, numeroCelulas]);

  const body = (
    <Box width="100vw" height="100%">
      <Box
        bgcolor={corIgreja.principal}
        height="100vh"
        width="100%"
        minWidth={300}
        minHeight={570}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="86%" mr={0}>
          <Box
            display="flex"
            justifyContent="center"
            fontFamily="arial black"
            textAlign="center"
            mt={2}
            fontSize="16px"
            color="white"
          >
            <Box color="#f0f0f0" mr={2}>
              MULTIPLICAÇÃO:{' '}
            </Box>{' '}
            {dataSend.Multiplicacao}
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={6}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Data da Célula
                  </Box>
                </Grid>
                <Grid container item xs={6}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Horário da Célula
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>
                      {dataSend.Data && ConverteData2(dataSend.Data)}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Horario}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Objetivo Central da Reunião
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Fase}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Anfitrião (local) da Reunião
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Anfitriao}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Quebra Gelo
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Encontro}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Louvor
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Exaltacao}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Edificação
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Edificacao}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Compartilhando a Visão
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Evangelismo}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="center">
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Box ml={1} width="100%" color="white" fontSize="12px">
                    Lanche
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    ml={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4vh"
                    minHeight={25}
                    borderRadius="5px"
                    bgcolor="#fff"
                    color={corIgreja.tercenaria}
                    fontSize="14px"
                    fontFamily="arial black"
                  >
                    <Box mt={0.5}>{dataSend.Lanche}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              style={{
                background: '#69f0ae',
                color: '#000',
                fontFamily: 'arial black',
              }}
              component="a"
              variant="contained"
              onClick={() => setOpenPlan(false)}
            >
              FECHAR PLANEJAMENTO
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box height="100%">
      <Box
        bgcolor="#c5e1a5"
        sx={{
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
          width="33%"
        >
          SEMANA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box textAlign="center" width="33%">
          VER
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
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
          width="33%"
        >
          {semana1}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem1 && dataSem1.Data ? ConverteData2(dataSem1.Data) : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem1 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem1);
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
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
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
          width="33%"
        >
          {semana2}
        </Box>
        {sem2 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem2 && dataSem2.Data ? ConverteData2(dataSem2.Data) : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem2 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem2);
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
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
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
          width="33%"
        >
          {semana3}
        </Box>
        {sem3 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem3 && dataSem3.Data ? ConverteData2(dataSem3.Data) : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem3 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem3);
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
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
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
          width="33%"
        >
          {semana4}
        </Box>
        {sem4 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem4 && dataSem4.Data ? ConverteData2(dataSem4.Data) : '-'}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem4 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem4);
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

      <Box
        sx={{
          fontFamily: 'arial black',
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
          width="33%"
        >
          {semana5}
        </Box>
        {sem5 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem5 && dataSem5.Data ? ConverteData2(dataSem5.Data) : '-'}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem5 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem5);
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
      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        {body}
      </Dialog>
    </Box>
  );
}
