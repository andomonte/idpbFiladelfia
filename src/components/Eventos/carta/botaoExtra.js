import * as React from 'react';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import {
  MdOutlineMenu,
  MdPictureAsPdf,
  MdPrint,
  MdImage,
  MdOutlineKeyboardBackspace,
} from 'react-icons/md';

export default function AccountMenu({ setAction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        ml={3}
        mt={0}
        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: -2, mt: -0.5 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MdOutlineMenu color="white" size={30} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#f0f0f0',
            width: 180,
            marginLeft: '4vw',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0.5,
              right: 155,
              width: 10,
              height: 10,
              bgcolor: '#f0f0f0',
              transform: 'translateY(-60%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box ml={-1.3} display="flex" flexDirection="column">
          <MenuItem onClick={() => setAction(1)}>
            <ListItemIcon sx={{ marginLeft: 0 }}>
              <MdPrint color="blue" size={25} />
              <Box color="black" fontFamily="Fugaz One" ml={2}>
                Imprimir
              </Box>
            </ListItemIcon>
          </MenuItem>

          <MenuItem onClick={() => setAction(2)}>
            <ListItemIcon sx={{ marginLeft: 0 }}>
              <MdPictureAsPdf color="#b91a10" size={25} />{' '}
              <Box color="black" fontFamily="Fugaz One" ml={2}>
                Baixar em PDF
              </Box>
            </ListItemIcon>
          </MenuItem>

          <MenuItem onClick={() => setAction(3)}>
            <ListItemIcon sx={{ marginLeft: 0 }}>
              <MdImage color="#a1a110" size={25} />{' '}
            </ListItemIcon>{' '}
            <Box fontFamily="Fugaz One" ml={0.8}>
              Salvar Imagem
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setAction(4)}>
            <ListItemIcon sx={{ marginLeft: 0 }}>
              <MdOutlineKeyboardBackspace color="#a1a" size={25} />{' '}
            </ListItemIcon>{' '}
            <Box fontFamily="Fugaz One" ml={0.8}>
              Voltar
            </Box>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}
