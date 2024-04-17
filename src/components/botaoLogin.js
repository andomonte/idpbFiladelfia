import { signIn, useSession } from 'next-auth/client';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LoginIcon from 'src/components/icones/login';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  button2: {
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
}));

export default function BotaoLogin() {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [foto, setFoto] = React.useState('');
  React.useEffect(() => {
    if (session === null)
      sessionStorage.setItem('perfilUser', JSON.stringify(''));
    else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      if (result) setFoto(result);
    }
    return 0;
  }, [session]);
  const handleLogout = () => {
    router.push({
      pathname: '/meuPerfilLogOut',
    });
  };
  return (
    <Box>
      {!session ? (
        <IconButton
          onClick={() =>
            signIn('', {
              callbackUrl: `${window.location.origin}/selectPerfil`,
            })
          }
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <LoginIcon />{' '}
            <Box
              color="white"
              mt={0}
              style={{ fontFamily: 'arial black', fontSize: '10px' }}
            >
              LOGIN
            </Box>
          </Box>
        </IconButton>
      ) : (
        <Box display="flex" alignItems="center">
          <Avatar
            className={classes.avatar}
            onClick={
              () => handleLogout()
              /*  signOut({
                  callbackUrl: `${window.location.origin}`,
                }) */
            }
            alt="nome"
            ord="123456789?"
            src={foto.foto || ''}
          >
            {foto.foto === '' || foto.foto === null ? (
              <IconButton
                style={{ color: 'black' }}
                aria-label="upload picture"
                component="span"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  fontSize="8px"
                  fontFamily="arial black"
                  width="100%"
                >
                  <Box mt={0.5}>SUA</Box>

                  <Box mt={0.2} mb={0.5}>
                    FOTO
                  </Box>
                </Box>
              </IconButton>
            ) : null}
          </Avatar>
        </Box>
      )}
    </Box>
  );
}
