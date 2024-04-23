import React from 'react';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Oval } from 'react-loading-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TiArrowBack } from 'react-icons/ti';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import clsx from 'clsx';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { MdOutlineEventNote } from 'react-icons/md';
import { GiArchiveRegister } from 'react-icons/gi';
import SvgIcon from '@mui/material/SvgIcon';
import Evento from './eventos';
import Evento2 from './inscritos';

const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '80vw',
    minWidth: 80,
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
    height: 56,
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
  },
  logo: {
    height: 35,
    marginTop: 0,
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

function Eventos({ usuario, title, perfilUser, rolMembros, nomesIgrejas }) {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleVoltar = () => {
    setLoading(true);
    router.push({
      pathname: './',
    });
  };

  const handleDrawerClose = () => {
    if (mobile && open) {
      setOpen(false);
    }
  };
  return (
    <div onLoad={handleDrawerClose}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.root}>
        <AppBar className={classes.root2}>
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

            {!perfilUser ||
            (perfilUser.Funcao &&
              (perfilUser.Funcao === 'Membro' ||
                perfilUser.Funcao === 'Professor')) ? (
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={50}
              >
                <Box
                  ml={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={50}
                  fontFamily="Fugaz One"
                >
                  LISTA DOS EVENTOS
                </Box>
              </Box>
            ) : (
              <Box display="flex">
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  showLabels
                  className={classes.rootTopbarIcon}
                >
                  <BottomNavigationAction
                    style={
                      value === 0
                        ? { color: corIgreja.iconeOn, fontSize: '12px' }
                        : { color: '#eeeeee', fontSize: '12px' }
                    }
                    label="Eventos"
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <MdOutlineEventNote />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                          <MdOutlineEventNote />
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
                    label="Inscritos"
                    icon={
                      value === 1 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <GiArchiveRegister />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                          <GiArchiveRegister />
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

          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <Evento
              nomesIgrejas={nomesIgrejas}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
              usuario={usuario}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Evento2
              nomesIgrejas={nomesIgrejas}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
            />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default Eventos;
