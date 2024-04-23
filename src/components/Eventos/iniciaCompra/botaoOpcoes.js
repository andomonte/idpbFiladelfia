import * as React from 'react';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { CgPlayListAdd } from 'react-icons/cg';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { MdPictureAsPdf, MdCloudUpload } from 'react-icons/md';

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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <CgPlayListAdd color="white" size={30} />
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
              top: 0,
              right: 200,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box display="flex" flexDirection="column">
          <MenuItem onClick={() => setAction(1)}>
            <ListItemIcon sx={{ marginLeft: 3 }}>
              <MdPictureAsPdf color="#b91a10" size={25} />{' '}
              <Box ml={2} mr={2}>
                {' '}
                Rel. Congregações
              </Box>
            </ListItemIcon>
          </MenuItem>

          <MenuItem onClick={() => setAction(2)}>
            <ListItemIcon sx={{ marginLeft: -2 }}>
              <MdCloudUpload color="#b91a10" size={25} />{' '}
              <Box ml={2}> Carta Delegado</Box>
            </ListItemIcon>
          </MenuItem>
        </Box>
        <Divider />
        <MenuItem onClick={() => setAction(3)}>
          <ListItemIcon sx={{ marginLeft: 3.5 }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Voltar
        </MenuItem>
      </Menu>
    </>
  );
}
