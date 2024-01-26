import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import { Oval } from 'react-loading-icons';
// import HomeIcon from '@material-ui/icons/Home';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FaBible } from 'react-icons/fa';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TiArrowBack } from 'react-icons/ti';
import SvgIcon from '@mui/material/SvgIcon';
import corIgreja from 'src/utils/coresIgreja';
import { MdGroups } from 'react-icons/md';

import Mensagem from './mensagem';
import Avisos from '../avisos/avisosSemana';
import Aniversarios3 from '../aniversariantes/aniversarios3';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';

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

function Aniversariantes({
  distritos,
  rolMembros,
  dadosAvisos,
  mensagem,
  title,
  perfilUser,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleVoltar = () => {
    setLoading(true);
    router.back();
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
                  label="Mensagem"
                  icon={
                    value === 0 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <FaBible />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <FaBible />
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
                  label="Avisos"
                  icon={
                    value === 1 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <BsFillMegaphoneFill />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <BsFillMegaphoneFill />
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
                  label="Aniversariantes"
                  icon={
                    value === 2 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdGroups />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <MdGroups />
                      </SvgIcon>
                    )
                  }
                />
              </BottomNavigation>
            </Box>
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
            <Mensagem
              titulo2={title}
              mensagem={mensagem}
              perfilUser={perfilUser}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Avisos dadosAvisos={dadosAvisos} perfilUser={perfilUser} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Aniversarios3
              distritos={distritos}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
            />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default Aniversariantes;
