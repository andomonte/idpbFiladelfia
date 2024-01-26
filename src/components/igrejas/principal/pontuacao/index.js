import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import { TiArrowBack } from 'react-icons/ti';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Oval } from 'react-loading-icons';

import corIgreja from 'src/utils/coresIgreja';

// import Carrossel from '../carrossel';
// import GoogleMaps from './googleMap';
import Pontuacao from './pontuacao';
import PontuacaoCoord from './pontuacaoCoord';
import PontuacaoSuper from './pontuacaoSuper';
import PontuacaoLider from './pontuacaoLider';

const drawerWidth = 240;
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
    [theme.breakpoints.up('sm')]: {
      marginLeft: +drawerWidth,
    },
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

function Secretaria({ parametros, perfilUser, title, lideranca, supervisao }) {
  const classes = useStyles();

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
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
            <Box width="10%" display="flex" alignItems="center">
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
            <Box
              fontFamily="Fugaz One"
              width="90%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              PONTUAÇÃO DAS CÉLULAS
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

          {perfilUser.Funcao === 'PastorDistrito' ? (
            <Pontuacao
              lideranca={lideranca}
              supervisao={supervisao}
              parametros={parametros}
              perfilUser={perfilUser}
            />
          ) : null}
          {perfilUser.Funcao === 'Coordenador' ? (
            <PontuacaoCoord
              supervisao={supervisao}
              parametros={parametros}
              perfilUser={perfilUser}
            />
          ) : null}
          {perfilUser.Funcao === 'Supervisor' ? (
            <PontuacaoSuper parametros={parametros} perfilUser={perfilUser} />
          ) : null}
          {perfilUser.Funcao === 'Lider' || perfilUser.Funcao === 'Membro' ? (
            <PontuacaoLider parametros={parametros} perfilUser={perfilUser} />
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default Secretaria;
