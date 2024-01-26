import React from 'react';

import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { Oval } from 'react-loading-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TiArrowBack } from 'react-icons/ti';
import Box from '@material-ui/core/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { GiPartyPopper } from 'react-icons/gi';
import { BiCalendar } from 'react-icons/bi';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { useSession } from 'next-auth/client';
import { IoIosPeople } from 'react-icons/io';
import corIgreja from 'src/utils/coresIgreja';
import { useRouter } from 'next/router';

import PlanCelula from './planejamentoRelCelulas';
import PlanCelulaSuper from './planejamentoCelulaSuper';
import PlanCelulaCoord from './planejamentoCelulaCoord';
import PlanCelulaDistrito from './planejamentoCelulaDistrito';
import PlanCelulaIgreja from './planejamentoCelulaIgreja';
import PlanEventos from './planejamentoEventos';
import PlanEventosGeral from './planejamentoEventosGeral';
import PlanEventosMembros from './planejamentoEventosMembros';
import PlanCelulaMembro from './planejamentoCelulaMembro';
import Calendario from './calendario';
import Padrao from './telaPadrao';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '80vw',
    minWidth: 80,
    height: 56,
  },
  root: {
    backgroundColor: 'theme.palette.background.dark',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: corIgreja.principal,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    cursor: 'pointer',
    height: 28,
    color: '#fff',
  },
  logo: {
    height: 25,
    marginLeft: theme.spacing(2),
  },
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  contentMain: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShiftMain: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    justifyContent: 'flex',
    marginTop: 56,
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: '#fff', // theme.palette.background.default,
    // backgroundImage: `url('/images/home/img01.png')`,
    margin: 0,
    padding: 0,
    flex: '1 1 auto',
    height: '100%',
    maxHeight: 600,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 64px)',
      width: '100%',
    },
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function AtualizarDados({ title, celulas, rolMembros, perfilUser, lideranca }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [session] = useSession();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const handleVoltar = () => {
    setLoading(true);
    router.back();

    // setOpen(false);
    // window.location.reload();
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        <AppBar className={classes.root2} color="default">
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" onClick={handleVoltar}>
                  {loading ? (
                    <Box>
                      <Oval stroke="white" width={25} height={25} />
                    </Box>
                  ) : (
                    <TiArrowBack size={25} color="white" />
                  )}
                </Box>
              </Box>
            </Box>

            <Box display="flex" m={0}>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                fontSize="large"
                showLabels
                className={classes.rootTopbarIcon}
              >
                <BottomNavigationAction
                  style={
                    value === 0
                      ? { color: corIgreja.iconeOn, fontSize: '18px' }
                      : { color: '#eeeeee', fontSize: '18px' }
                  }
                  label="Células"
                  icon={
                    value === 0 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <IoIosPeople />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <IoIosPeople />
                      </SvgIcon>
                    )
                  }
                />
                <BottomNavigationAction
                  style={
                    value === 1
                      ? { color: corIgreja.iconeOn, fontSize: '18px' }
                      : { color: '#eeeeee', fontSize: '18px' }
                  }
                  label="Evento"
                  icon={
                    value === 1 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <GiPartyPopper />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <GiPartyPopper />
                      </SvgIcon>
                    )
                  }
                />
                <BottomNavigationAction
                  style={
                    value === 2
                      ? { color: corIgreja.iconeOn, fontSize: '12px' }
                      : { color: '#eeeeee', fontSize: '12px' }
                  }
                  label="Calendario"
                  icon={
                    value === 2 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <BiCalendar />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <BiCalendar />
                      </SvgIcon>
                    )
                  }
                />
              </BottomNavigation>
            </Box>
          </Toolbar>
        </AppBar>

        <main>
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Membro' ? (
                  <PlanCelulaMembro
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Lider' ? (
                  <PlanCelula
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}

                {perfilUser.Funcao === 'Secretaria' ? (
                  <PlanCelula
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Supervisor' ? (
                  <PlanCelulaSuper
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Coordenador' ? (
                  <PlanCelulaCoord
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <PlanCelulaDistrito
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? (
                  <PlanCelulaIgreja
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Membro' ? (
                  <PlanEventosMembros
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Lider' ? (
                  <PlanEventos
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Secretaria' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Supervisor' ||
                perfilUser.Funcao === 'Coordenador' ? (
                  <PlanEventosGeral
                    perfilUser={perfilUser}
                    secao={session}
                    lideranca={lideranca}
                    celulas={celulas}
                  />
                ) : null}
                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <PlanEventosGeral
                    perfilUser={perfilUser}
                    secao={session}
                    lideranca={lideranca}
                    celulas={celulas}
                  />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/*  <Eventos item={item} /> */}

            <Calendario
              perfilUser={perfilUser}
              secao={session}
              rolMembros={rolMembros}
            />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default AtualizarDados;
