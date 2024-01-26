import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LoginIcon from 'src/components/icones/login';

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
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
            ord="123456789?"
            alt="User"
            className={classes.avatar}
            src={foto.foto || session?.user?.image}
          />
        </Box>
      )}
    </Box>
  );
}
