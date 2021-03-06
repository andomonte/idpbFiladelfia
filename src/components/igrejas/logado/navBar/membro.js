import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import corIgreja from 'src/utils/coresIgreja';
import { useRouter } from 'next/router';
import SchoolIcon from '@material-ui/icons/School';
import change from 'src/components/icones/change';
import { useSession } from 'next-auth/client';
import { FcCalendar } from 'react-icons/fc';
import { FaHome } from 'react-icons/fa';
import React from 'react';
import IconeAtualizarDados from 'src/components/icones/atualizarDados';
import IconeRelatorio from 'src/components/icones/relatorio';
import midiaPlay from 'src/components/icones/midia';
import SvgIcon from '@mui/material/SvgIcon';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import IconeInstalar from 'src/components/icones/instalar';
import { usePWAInstall } from 'react-use-pwa-install';
// import HomeIcon from '@material-ui/icons/Home';
import { IoMdPerson } from 'react-icons/io';
// import { MdOutlineScreenSearchDesktop } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
    '&:hover': {
      color: '#ffeb3b',
    },
  },
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    backgroundColor: corIgreja.principal,
  },
}));
function HomeIcon2() {
  return (
    <SvgIcon style={{ color: '#ffff ' }}>
      <FaHome />
    </SvgIcon>
  );
}
/* function SecretariaIcon() {
  return (
    <SvgIcon style={{ color: '#ffb74d' }}>
      <MdOutlineScreenSearchDesktop />
    </SvgIcon>
  );
} */
function NiverIcon() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <CakeSharpIcon />
    </SvgIcon>
  );
}
function LogoPerfil() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <IoMdPerson />
    </SvgIcon>
  );
}
function Panejamento() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <FcCalendar />
    </SvgIcon>
  );
}
function Upload() {
  return (
    <SvgIcon style={{ color: '#ffeb3b' }}>
      <IconeAtualizarDados />
    </SvgIcon>
  );
}
function ParticipacoesIcones() {
  return <IconeRelatorio cor="#ffe0b2" />;
}
function iconeInstall() {
  return <IconeInstalar size={25} color="white" />;
}
const primaryMenu = [
  {
    id: 1,
    label: 'Home',
    path: '/logado/',
    icon: HomeIcon2,
  },

  {
    id: 2,
    label: 'Meu Perfil',
    path: '/meuPerfil',
    icon: LogoPerfil,
  },
];

const secondaryManu = [
  {
    id: 1,
    label: 'Participa????es',
    path: '/membro/participacoes',
    icon: ParticipacoesIcones,
  },
  {
    id: 2,
    label: 'Planejamento',
    path: '/planejamento',
    icon: Panejamento,
  },

  {
    id: 3,
    label: 'Atualizar',
    path: '/atualizar',
    icon: Upload, // iconeAtualizarDados,
  },
  {
    id: 4,
    label: 'Ensino',
    path: '/cursos',
    icon: SchoolIcon,
  },

  {
    id: 5,
    label: 'Aniversariantes',
    path: '/aniversariantes',
    icon: NiverIcon,
  },
  {
    id: 6,
    label: 'Midia IDPB',
    path: '/midia',
    icon: midiaPlay,
  },
  {
    id: 7,
    label: 'Mudar Usu??rio',
    path: '/selectPerfil',
    icon: change,
  },
  {
    id: 8,
    label: 'Instalar App',
    icon: iconeInstall,
    path: '/installApp',
  },
];
function navBar({ perfilUser }) {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => router.pathname === item.path;
  const [session] = useSession();
  const install = usePWAInstall();

  const checkInstall = () => {
    if (install) install();
  };

  const content = (
    <Box className={classes.root}>
      <List>
        {primaryMenu.map((itemPrimary) => {
          const Icon = itemPrimary.icon;
          return (
            <ListItem
              key={itemPrimary.label}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(itemPrimary)}
              onClick={() => {
                router.push({
                  pathname: itemPrimary.path,
                  query: { perfilUser },
                });
              }}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(itemPrimary) && '#ffeb3b' }} />
              </ListItemIcon>
              <ListItemText
                style={{ color: isSelected(itemPrimary) && '#ffeb3b' }}
                classes={{
                  primary: classes.listItemText,
                }}
                primary={itemPrimary.label}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider style={{ background: '#fafafa' }} />
      <List>
        {session
          ? secondaryManu.map((itemSecondary) => {
              const Icon = itemSecondary.icon;
              return (
                <ListItem
                  key={itemSecondary.id}
                  button
                  classes={{ root: classes.listItem }}
                  selected={isSelected(itemSecondary)}
                  onClick={() => {
                    if (itemSecondary.path !== '/installApp') {
                      router.push({
                        pathname: itemSecondary.path,
                        query: { perfilUser },
                      });
                    } else {
                      checkInstall();
                    }
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      style={{ color: isSelected(itemSecondary) && '#f44336' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary={itemSecondary.label}
                  />
                </ListItem>
              );
            })
          : null}
      </List>
    </Box>
  );
  return content;
}
export default navBar;
