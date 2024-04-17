import React from 'react';
import Head from 'next/head';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Oval } from 'react-loading-icons';
import Hidden from '@material-ui/core/Hidden';
import Login from 'src/components/botaoLogin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography } from '@material-ui/core';
import CarouselImg from './carousel';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    width: 500,
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.between('xl', 'lg')]: {
      width: 500,
    },
    [theme.breakpoints.between('md', 'sm')]: {
      width: 200,
    },

    [theme.breakpoints.down('xs')]: {
      width: 80,
    },
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: '#3f51b5',
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
    button1: {
      display: 'flex',
      background: '#ffa',
      '&:hover': {
        backgroundColor: '#ff9100',
      },
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'blue',
      justifyContent: 'center',
    },
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
}));

function Cursos({ title }) {
  const classes = useStyles();
  const router = useRouter();
  const inscrever = () => {
    router.push({
      pathname: '/principal',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };

  const [loading, setLoading] = React.useState(false);
  const handleVoltar = () => {
    setLoading(true);
    router.back();
  };
  const ColorButton = withStyles(() => ({
    root: {
      color: 'blue', // theme.palette.getContrastText('#ffa'),
      backgroundColor: '#ffa',
      '&:hover': {
        backgroundColor: '#fda',
      },
    },
  }))(Button);
  return (
    <Box bgcolor="#000" height="100vh" width="100vw">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>
        <AppBar className={classes.root2} color="default">
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              {loading ? (
                <Box>
                  <Oval stroke="white" width={25} height={25} />
                </Box>
              ) : (
                <ArrowBackIcon
                  className={classes.hamburger}
                  onClick={handleVoltar}
                />
              )}
            </Box>
            <Hidden smDown>
              <Box color="#fff" display="flex" justifyContent="center">
                <Box>CURSOS IDPB-FILADELFIA</Box>
              </Box>
            </Hidden>

            <Login />
          </Toolbar>
        </AppBar>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Hidden smDown>
          <Box display="flex" justifyContent="center">
            <Box sx={{ fontSize: '20px' }}>CONHEÇA OS NOSSOS CURSOS</Box>
          </Box>

          <Box mt={5} width="100vw" height="90vh">
            <CarouselImg />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box mt={10}>
              <Typography
                display="block"
                variant="body2"
                align="center"
                style={{
                  fontSize: '22px',
                  fontFamily: 'arial black',
                  color: '#fff',
                }}
              >
                CURSOS
              </Typography>
            </Box>
            <Box mt={0}>
              <Typography
                display="block"
                variant="body2"
                align="center"
                style={{
                  fontSize: '22px',
                  fontFamily: 'arial black',
                  color: '#fff',
                }}
              >
                IDPB-FILADELFIA
              </Typography>
            </Box>

            <CarouselImg />
          </Box>
        </Hidden>
        <Box mt={-15} display="flex" justifyContent="center">
          <ColorButton
            className={classes.button1}
            component="a"
            variant="contained"
            onClick={inscrever}
          >
            Inscreva-se
          </ColorButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Cursos;
