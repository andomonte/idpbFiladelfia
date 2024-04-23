import React from 'react';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSession } from 'next-auth/client';
import Box from '@material-ui/core/Box';
import Espera from 'src/utils/espera';
// import HomeIcon from '@material-ui/icons/Home';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import Login from 'src/components/botaoLogin';

// import Carrossel from '../carrossel';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';

const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '70vw',
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
function Pagina({ title }) {
  const classes = useStyles();
  const [session] = useSession();
  const theme = useTheme();
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    if (mobile && open) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (session) {
      router.push({
        pathname: '/principal',
      });
    } else {
      router.push({
        pathname: '/login',
      });
    }
  }, []);
  return (
    <div
      style={{
        minWidth: 300,
        background: corIgreja.principal2,
      }}
      onLoad={handleDrawerClose}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
      </Head>

      <div>
        <AppBar className={classes.root2}>
          <Toolbar className={classes.toolbar}>
            <Box width="100%" display="flex" justifyContent="center">
              <img
                src="/images/logo1.png"
                height={30}
                width={120}
                className={classes.logo}
                alt="bolo"
              />
            </Box>
            <Login />
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.drawerHeader} />
          <Espera descricao="APP-CÉLULAS IDPB" />
        </main>
      </div>
    </div>
  );
}

export { Pagina, TabPanel };
