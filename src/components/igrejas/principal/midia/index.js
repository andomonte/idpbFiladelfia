import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { BsPlayBtnFill, BsFillCameraFill } from 'react-icons/bs';
import { GiSoundOn } from 'react-icons/gi';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useRouter } from 'next/router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Login from 'src/components/botaoLogin';
// import PerfilIcon from 'src/components/icones/perfil';
// import Eventos from './eventos';
import { TiArrowBack } from 'react-icons/ti';

import corIgreja from 'src/utils/coresIgreja';

import TelaPadrao from './telaPadrao';
import Radio from './radio';
import Videos from './videos';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '70vw',
    minWidth: 80,
    height: 48,
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

function Midia({ title, userIgrejas, dataYouTube, radioIdpb }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();
  const handleVoltar = () => {
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
                <TiArrowBack size={25} color="white" />
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
                  label="Rádio"
                  icon={
                    value === 0 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <GiSoundOn />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <GiSoundOn />
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
                  label="Vídeos"
                  icon={
                    value === 1 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <BsPlayBtnFill />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <BsPlayBtnFill />
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
                  label="FaceBook"
                  icon={
                    value === 2 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <BsFillCameraFill />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <BsFillCameraFill />
                      </SvgIcon>
                    )
                  }
                />
              </BottomNavigation>
            </Box>

            <Login />
          </Toolbar>
        </AppBar>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <TabPanel value={value} index={0}>
            <Radio radioIdpb={radioIdpb} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Videos dataYouTube={dataYouTube} userIgrejas={userIgrejas} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TelaPadrao />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}
export default Midia;
