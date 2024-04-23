import * as React from 'react';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconGoogleMap from 'src/components/icones/mapasGoogle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { FcSearch } from 'react-icons/fc';
import { TiArrowBack } from 'react-icons/ti';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import { MdOutlineMenu, MdPictureAsPdf, MdCloudUpload } from 'react-icons/md';

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
        ml={0}
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
            width: 200,

            marginLeft: '4vw',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
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
              right: 175,
              width: 10,
              height: 10,
              bgcolor: '#fafafa',
              transform: 'translateY(-60%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box display="flex" flexDirection="column">
          <Box mt={2} ml={1.5} display="flex" onClick={() => setAction(1)}>
            <MdPictureAsPdf color="#b91a10" size={25} />
            <Box width={150} fontFamily="Fugaz One" ml={1.6} mt={0.5}>
              Rel. Congregações
            </Box>
          </Box>

          <Box mt={3} ml={1.5} display="flex" onClick={() => setAction(2)}>
            <MdCloudUpload color="green" size={25} />{' '}
            <Box width={150} fontFamily="Fugaz One" ml={1.6} mt={0.5}>
              Carta Delegado
            </Box>
          </Box>

          <Box mt={3} ml={1.5} display="flex" onClick={() => setAction(3)}>
            <IconGoogleMap color="#faaaff" size={25} />
            <Box width={120} fontFamily="Fugaz One" ml={1.6} mt={0.5}>
              Como Chegar
            </Box>
          </Box>
          <Box
            mb={3}
            mt={3}
            ml={1.5}
            display="flex"
            onClick={() => setAction(4)}
          >
            <FcSearch color="#b91a10" size={25} />
            <Box width={120} fontFamily="Fugaz One" ml={1.6} mt={0.5}>
              Ver Inscritos
            </Box>
          </Box>
          <Divider />
          <Box
            mb={2}
            mt={2}
            ml={1.5}
            display="flex"
            onClick={() => setAction(5)}
          >
            <TiArrowBack color="blue" size={25} />
            <Box width={150} fontFamily="Fugaz One" ml={1.6} mt={0.5}>
              Voltar
            </Box>
          </Box>
        </Box>
      </Menu>
    </>
  );
}
