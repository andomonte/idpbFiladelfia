import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { FaHome } from 'react-icons/fa';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useRouter } from 'next/router';

import useMediaQuery from '@material-ui/core/useMediaQuery';
// import PerfilIcon from 'src/components/icones/perfil';

import { useSession } from 'next-auth/client';
// import Eventos from './eventos';
import { TiArrowBack } from 'react-icons/ti';
import { Oval } from 'react-loading-icons';
import { MdGroupWork } from 'react-icons/md';
import { IoIosPeople, IoIosSchool } from 'react-icons/io';
import corIgreja from 'src/utils/coresIgreja';
import { HiUserGroup } from 'react-icons/hi';
import BuscarNome from './abas/buscarNome';

import Liderados from './liderados';
import LideradosCoord from './lideradosCoord';
import LideradosDistrito from './lideradosDistrito';
import Membros from './membrosSuper';
import MembrosCoord from './membrosCoord';
import MembrosDistrito from './membrosDistrito';
import MembrosIgreja from './membrosIgreja';
import MembrosCelula from './membrosCelula';
import MembrosCelula2 from './membrosCelula2'; // só para os membros
import Padrao from '../relatorios/lider/abas/telaPadrao';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '80vw',
    minWidth: 80,
    height: 48,
    marginRight: 0,
  },
  root: {
    backgroundColor: corIgreja.principal2,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: corIgreja.principal,
    boxShadow: 'none',
    height: 56,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    height: '8vh',

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

function Perfil({ title, rolMembros, lideranca, perfilUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const [session] = useSession();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const handleVoltar = () => {
    setLoading(true);
    router.back();

    // setOpen(false);
    // window.location.reload();
  };

  const handleDrawerClose = () => {
    if (mobile && open) {
      setOpen(false);
    }
  };

  return (
    <div onLoad={handleDrawerClose} translate="no">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.root}>
        <AppBar className={classes.root2} color="default">
          <Toolbar className={classes.toolbar}>
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
            {perfilUser.Funcao === 'Membro' && (
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
                        ? { color: corIgreja.iconeOn, fontSize: '12px' }
                        : { color: '#eeeeee', fontSize: '12px' }
                    }
                    label="Célula"
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <IoIosSchool />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <IoIosSchool />
                        </SvgIcon>
                      )
                    }
                  />
                </BottomNavigation>
              </Box>
            )}

            {perfilUser.Funcao === 'Lider' && (
              <Box
                justifyContent="center"
                width="100%"
                fontFamily="Fugaz One"
                fontSize="18px"
                color="white"
                display="flex"
                m={0}
              >
                CÉLULA - {perfilUser.Celula}
              </Box>
            )}
            {perfilUser.Funcao === 'Secretaria' && (
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
                    label="Local"
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <FaHome />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <FaHome />
                        </SvgIcon>
                      )
                    }
                  />
                  <BottomNavigationAction
                    style={
                      value === 1
                        ? { color: corIgreja.iconeOn, fontSize: '12px' }
                        : { color: '#eeeeee', fontSize: '12px' }
                    }
                    label="Celula"
                    icon={
                      value === 1 ? (
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
                </BottomNavigation>
              </Box>
            )}
            {(perfilUser.Funcao === 'Supervisor' ||
              perfilUser.Funcao === 'Coordenador' ||
              perfilUser.Funcao === 'PastorDistrito' ||
              perfilUser.Funcao === 'Presidente') && (
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
                    label="Lideres"
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <MdGroupWork />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <MdGroupWork />
                        </SvgIcon>
                      )
                    }
                  />
                  <BottomNavigationAction
                    style={
                      value === 1
                        ? { color: corIgreja.iconeOn, fontSize: '12px' }
                        : { color: '#eeeeee', fontSize: '12px' }
                    }
                    label="Membros"
                    icon={
                      value === 1 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <HiUserGroup />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <HiUserGroup />
                        </SvgIcon>
                      )
                    }
                  />
                </BottomNavigation>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Membro' ? (
                  <MembrosCelula2
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Lider' ? (
                  <MembrosCelula
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Secretaria' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Supervisor' ? (
                  <Liderados
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Coordenador' ? (
                  <LideradosCoord
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}

                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <LideradosDistrito
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? (
                  <LideradosCoord
                    secao={session}
                    perfilUser={perfilUser}
                    lideranca={lideranca}
                    rolMembros={rolMembros}
                  />
                ) : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/*  <Eventos item={item} /> */}
            {perfilUser.Funcao === 'Membro' ? (
              <BuscarNome perfilUser={perfilUser} setOpenBuscar />
            ) : null}

            {perfilUser.Funcao === 'Secretaria' ? <Padrao /> : null}
            {perfilUser.Funcao === 'Supervisor' ? (
              <Membros
                secao={session}
                perfilUser={perfilUser}
                lideranca={lideranca}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Coordenador' ? (
              <MembrosCoord
                secao={session}
                perfilUser={perfilUser}
                lideranca={lideranca}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'PastorDistrito' ? (
              <MembrosDistrito
                secao={session}
                perfilUser={perfilUser}
                lideranca={lideranca}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Presidente' ? (
              <MembrosIgreja
                secao={session}
                perfilUser={perfilUser}
                lideranca={lideranca}
                rolMembros={rolMembros}
              />
            ) : null}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export { Perfil, TabPanel };
