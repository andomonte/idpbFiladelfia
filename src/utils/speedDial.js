import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import { styled } from '@mui/material/styles';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',

  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(0),
    right: theme.spacing(0),
  },

  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(0),
    left: theme.spacing(0),
  },
}));
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function OpenIconSpeedDial() {
  return (
    <Box mt={0}>
      <StyledSpeedDial
        sx={{
          '& .MuiFab-primary': { width: 35, height: 30 },
          '& .MuiSpeedDialIcon-icon': { fontSize: 25 },
        }}
        ariaLabel="SpeedDial playground example"
        hidden={false}
        icon={<SpeedDialIcon />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
}
