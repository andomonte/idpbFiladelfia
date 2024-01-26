import React from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TiArrowBack } from 'react-icons/ti';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';

import { Oval } from 'react-loading-icons';
import { useSession } from 'next-auth/client';
// import Eventos from './eventos';
import corIgreja from 'src/utils/coresIgreja';

import DadosPessoais from './dadosPessoais';
import DadosAdicionais from './dadosAdicionais';
import DadosEndereco from './dadosEndereco';

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

function AtualizarDados({ title, rolMembros, perfilUser }) {
  const classes = useStyles();
  const [value] = React.useState(0);
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
    <div translate="no">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        <AppBar className={classes.root2}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center" onClick={handleVoltar}>
              {loading ? (
                <Box>
                  <Oval stroke="white" width={25} height={25} />
                </Box>
              ) : (
                <TiArrowBack size={25} color="white" />
              )}
            </Box>

            <Box
              fontSize="18px"
              fontFamily="Fugaz One"
              justifyContent="center"
              width="100%"
              display="flex"
              m={0}
            >
              ATUALIZE SEUS DADOS
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
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}

                {perfilUser.Funcao === 'Lider' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}

                {perfilUser.Funcao === 'Secretaria' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Supervisor' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Coordenador' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? (
                  <DadosPessoais
                    perfilUser={perfilUser}
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
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
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
                {perfilUser.Funcao === 'Supervisor' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Coordenador' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? (
                  <DadosEndereco
                    perfilUser={perfilUser}
                    secao={session}
                    rolMembros={rolMembros}
                  />
                ) : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/*  <Eventos item={item} /> */}
            {perfilUser.Funcao === 'Membro' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
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
            {perfilUser.Funcao === 'Supervisor' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Coordenador' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'PastorDistrito' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Presidente' ? (
              <DadosAdicionais
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default AtualizarDados;
