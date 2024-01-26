import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { FaHome } from 'react-icons/fa';
import { DiDatabase } from 'react-icons/di';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import Login from 'src/components/botaoLogin';
// import PerfilIcon from 'src/components/icones/perfil';

import { useSession } from 'next-auth/client';
// import Eventos from './eventos';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import corIgreja from 'src/utils/coresIgreja';

import DadosMembros from './dadosMembros';
import DadosAdicionais from './dadosAdicionais';
import DadosEndereco from './dadosEndereco';
import Padrao from './telaPadrao';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '70vw',
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

function AtualizarDados({ title, rolMembros, perfilUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [session] = useSession();

  const handleDrawerOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    //! open ? setOpen(true) : setOpen(false);
  };

  return (
    <div translate="no">
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
              {open ? (
                <MenuOpenIcon
                  className={classes.hamburger}
                  onClick={handleDrawerOpen}
                />
              ) : null}
              {!open ? (
                <MenuIcon
                  className={classes.hamburger}
                  onClick={handleDrawerOpen}
                />
              ) : null}
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
                  label="Pessoal"
                  icon={
                    value === 0 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <BsFillPersonCheckFill />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <BsFillPersonCheckFill />
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
                  label="Endereço"
                  icon={
                    value === 1 ? (
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
                    value === 2
                      ? { color: corIgreja.iconeOn, fontSize: '12px' }
                      : { color: '#eeeeee', fontSize: '12px' }
                  }
                  label="Geral"
                  icon={
                    value === 2 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <DiDatabase />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: '#eeeeee' }}>
                        <DiDatabase />
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
          {/* {children} */}

          <TabPanel value={value} index={0}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Lider' ? (
                  <DadosMembros
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}

                {perfilUser.Funcao === 'Secretaria' ? (
                  <DadosMembros
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Supervisor' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Coordenador' ? <Padrao /> : null}
                {perfilUser.Funcao === 'PastorDistrito' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Lider' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Secretaria' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Supervisor' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Coordenador' ? <Padrao /> : null}
                {perfilUser.Funcao === 'PastorDistrito' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/*  <Eventos item={item} /> */}
            {perfilUser.Funcao === 'Lider' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Secretaria' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Supervisor' ? <Padrao /> : null}
            {perfilUser.Funcao === 'Coordenador' ? <Padrao /> : null}
            {perfilUser.Funcao === 'PastorDistrito' ? <Padrao /> : null}
            {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default AtualizarDados;
