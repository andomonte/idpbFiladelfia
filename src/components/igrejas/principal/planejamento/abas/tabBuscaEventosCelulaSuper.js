import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ConverteData2 from 'src/utils/convData2';
import PegaMes from 'src/utils/getMes2';
import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import { Box } from '@material-ui/core';
import Meses from 'src/utils/mesesAbrev';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

import { MdScreenSearchDesktop } from 'react-icons/md';

import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';

import FazerPlanCelula from './mostrarEventoGeral';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  Mes,
  Ano,
  perfilUser,

  numeroCelulas,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [openPlan, setSendResumo] = React.useState(false);

  const [setSemanaEnviada] = React.useState('');

  const semana = PegaSemana(Mes, Ano);

  const [dadosSem, setDadosSem] = React.useState([]);

  // para usar semanas

  //  const dataEventoRef = React.useRef();
  //-------------------

  const [dataSem0, setDataSem0] = React.useState([]);
  const [dataSem1, setDataSem1] = React.useState([]);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [dataSem5, setDataSem5] = React.useState([]);
  const [setAnoEnviado] = React.useState(Ano);
  // para usar semanas
  let semana0 = semana - 1;
  let AnoPesquisado = Ano;
  if (semana - 1 < 1) {
    semana0 = 52;
    AnoPesquisado = Ano - 1;
  }
  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;
  const mesSemana5 = PegaMes(semana5, Ano);
  const mes = Meses();

  let mesAnterior = Mes - 1;
  if (mesAnterior < 0) mesAnterior = 11;

  const semAnterior = <Box>SEMANA ANTERIOR</Box>;
  const sem1Mes = (
    <Box>
      SEMANA 1
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem2Mes = (
    <Box>
      SEMANA 2
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem3Mes = (
    <Box>
      SEMANA 3
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem4Mes = (
    <Box>
      SEMANA 4
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem5Mes =
    mesSemana5 === Mes ? (
      <Box>
        SEMANA 5
        <Box>
          {mes[Mes].descricao.toUpperCase()} / {Ano}
        </Box>
      </Box>
    ) : (
      <Box>SEMANA SEGUINTE</Box>
    );
  const url0 = `/api/consultaPlanejamentoEventos/${Mes}/${AnoPesquisado}`;
  const url1 = `/api/consultaPlanejamentoEventos/${Mes}/${Ano}`;
  const { data: sem0, errorSem0 } = useSWR(url0, fetcher);
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    mutate(url0);
    mutate(url1);
    setDataSem0([]);
    setDataSem1([]);
  }, [semana, openPlan, numeroCelulas]);

  React.useEffect(() => {
    if (sem0 && sem0.length) {
      const presCelula = sem0.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        presCelula.map((val) => {
          const pegaAtual = PegaSemanaAtual(val.Data);
          if (pegaAtual === 0) setDataSem0(val);
          return 0;
        });
      }
    }
    if (errorSem0) return <div>An error occured.</div>;
    if (!sem0) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem0, openPlan, numeroCelulas]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      // const semanaAgora = PegaSemana(sem1.Data);
      const presCelula = sem1.filter(
        (val) =>
          val.Celula === Number(numeroCelulas) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula.length) {
        presCelula.map((val) => {
          const pegaAtual = PegaSemanaAtual(val.Data);
          if (pegaAtual === 1) setDataSem1(val);
          if (pegaAtual === 2) setDataSem2(val);
          if (pegaAtual === 3) setDataSem3(val);
          if (pegaAtual === 4) setDataSem4(val);
          if (pegaAtual === 5) setDataSem5(val);
          return 0;
        });
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, openPlan, numeroCelulas]);

  //------------------

  //= ========================================================================
  // data de inicio
  //= ========================================================================

  //= ========================================================================

  return (
    <Box height="100%" fontSize="11px">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="12%"
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
          SEMANA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="35%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box textAlign="center" width="35%">
          VER
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#eaeaea"
        height="14.66%"
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
          {semAnterior || '-'}
        </Box>

        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem0 && dataSem0.Data ? ConverteData2(dataSem0.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem0.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem0);
                        setAnoEnviado(AnoPesquisado);
                        setSendResumo(true);
                        setSemanaEnviada(semana0);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f0f4c3"
        height="14.66%"
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
          {sem1Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem1 && dataSem1.Data ? ConverteData2(dataSem1.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem1.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem1);
                        setAnoEnviado(Ano);
                        setSendResumo(true);
                        setSemanaEnviada(semana1);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
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
          {sem2Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem2 && dataSem2.Data ? ConverteData2(dataSem2.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem2.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem2);
                        setAnoEnviado(Ano);
                        setSendResumo(true);
                        setSemanaEnviada(semana2);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f0f4c3"
        height="14.66%"
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
          {sem3Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem3 && dataSem3.Data ? ConverteData2(dataSem3.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem3.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem3);
                        setAnoEnviado(Ano);
                        setSendResumo(true);
                        setSemanaEnviada(semana3);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="14.66%"
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
          {sem4Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem4 && dataSem4.Data ? ConverteData2(dataSem4.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem4.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem4);
                        setAnoEnviado(Ano);
                        setSendResumo(true);
                        setSemanaEnviada(semana4);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderBottomRightRadius: 16,
          borderBottomLeftRadius: 16,
        }}
        bgcolor={mesSemana5 === Mes ? '#f0f4c3' : '#EAEAEA'}
        height="14.66%"
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
          {sem5Mes || '-'}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              {dataSem5 && dataSem5.Data ? ConverteData2(dataSem5.Data) : '-'}
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="35%"
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
          width="35%"
        >
          {sem1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box>
                <Box>
                  {dataSem5.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5);
                        setAnoEnviado(Ano);
                        setSendResumo(true);
                        setSemanaEnviada(semana5);
                      }}
                    >
                      {' '}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
      </Box>

      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <FazerPlanCelula dadosEvento={dadosSem} setSendResumo={setSendResumo} />
      </Dialog>
    </Box>
  );
}
