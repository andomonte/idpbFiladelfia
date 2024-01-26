import * as React from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';

import Avatar from '@material-ui/core/Avatar';
import Modal from '@mui/material/Modal';
import moment from 'moment';

dayjs.extend(relativeTime);

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');
  const ano = new Date().getFullYear();
  const novaData = new Date(
    ano,
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );
  return novaData;
}
const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
  caption: {
    fontSize: '3.5vw',
    fontFamily: 'Fugaz One',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',

      //      marginBottom: 25,
    },
  },
  avatar: {
    width: 50,
    height: 50,
    [theme.breakpoints.up('sm')]: {
      width: 70,
      height: 70,

      //      marginBottom: 25,
    },
  },

  dados: {
    // backgroundColor: '#fafafa',
    //    padding: '4px 4px',
    //    display: 'flex',
    // alignItems: 'center',
    height: 45,
    width: '100%',
    borderRadius: 16,
    marginLeft: 10,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      marginBottom: -40,

      //      marginBottom: 25,
    },
  },
  dadosBox: {
    marginBottom: -20,
    marginTop: 0,
    width: '100%',
    marginLeft: 0,
    maxHeight: 310,
    marginRight: 0,
  },
  icons: {
    marginRight: 20,
    marginTop: 10,
  },
}));
function SearchList({ distritos, rolMembros }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [imagem, setImagem] = React.useState('');
  const handleSistema = () => {};
  let nomeCelula = rolMembros.Nome;
  if (nomeCelula === '') nomeCelula = 'Nome não registrado';
  const diaSemana = [
    'DOM -',
    'SEG -',
    'TER -',
    'QUA -',
    'QUI -',
    'SEX -',
    'SAB -',
  ];

  const diaAniversario = converteData(
    moment(rolMembros.Nascimento.substring(0, 10)).format(
      'DD/MM/YYYY hh:mm:ss',
    ),
  ).getDate();

  const diaDaSemana = converteData(
    moment(rolMembros.Nascimento.substring(0, 10)).format(
      'DD/MM/YYYY hh:mm:ss',
    ),
  ).getDay();

  // const mesAniversario = converteData(rolMembros.Nascimento).getMonth();
  // const dia = converteData(semanaAtual).getDate();

  return (
    <Box sx={{ maxHeight: 310, minWidth: 280 }} className={classes.dadosBox}>
      <TableContainer sx={{ maxHeight: 310 }}>
        <Box mt={2} ml={1} display="flex" alignItems="center">
          {rolMembros.foto !== null && rolMembros.foto !== undefined ? (
            <Avatar
              onClick={() => {
                setOpenModal(true);
                setImagem(rolMembros.foto);
              }}
              src={rolMembros.foto}
              alt="User"
              className={classes.avatar}
            />
          ) : (
            <Avatar src="" alt="User" className={classes.avatar} />
          )}
          <Box ml={0} mt={2}>
            <Typography
              style={{ marginLeft: 15, marginRight: 5 }}
              className={classes.caption}
              gutterBottom
              component="span"
              variant="body1"
              color="textPrimary"
              button="true"
              onClick={handleSistema}
            >
              {rolMembros.Nome.toUpperCase()}
            </Typography>
            <Box ml={2} display="flex">
              <Typography
                className={classes.caption}
                gutterBottom
                component="span"
                variant="body1"
                color="textPrimary"
                button="true"
                onClick={handleSistema}
              >
                <Box display="flex">
                  <Box>
                    <Box display="flex" color={corIgreja.principal}>
                      Dia:
                      <Box color="black" ml={1}>
                        {diaSemana[diaDaSemana]} {diaAniversario}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Typography>
              <Typography
                className={classes.caption}
                gutterBottom
                component="span"
                variant="body1"
                color="textPrimary"
                button="true"
                onClick={handleSistema}
              >
                <Box ml={4} display="flex">
                  <Box>
                    <Box display="flex" color={corIgreja.principal}>
                      Célula:
                      <Box color="black" ml={1}>
                        {rolMembros.Celula}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Typography>
            </Box>
            <Box ml={2} display="flex">
              <Typography
                className={classes.caption}
                gutterBottom
                component="span"
                variant="body1"
                color="textPrimary"
                button="true"
                onClick={handleSistema}
              >
                <Box display="flex">
                  <Box>
                    <Box display="flex" color={corIgreja.principal}>
                      Supervisão:
                      <Box color="black" ml={1}>
                        {rolMembros.Supervisao}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Typography>
            </Box>

            <Box mb={2} display="flex" ml={-0.5}>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{
                  marginLeft: 20,
                  color: 'black',
                  fontSize: '12px',
                  fontFamily: 'Fugaz One',
                }}
              >
                <Box className={classes.caption}>
                  {distritos &&
                    distritos.length &&
                    distritos[Number(rolMembros.Distrito) - 1].Distrito_Nome}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </TableContainer>
      <Modal
        open={openModal}
        //  onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={corIgreja.principal2}
          display="block"
          flexDirection="column"
          width="auto"
          height="100vh"
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={imagem || '/images/inserirFoto.jpg'}
              width="100%"
              alt="install"
            />

            <Box mt={5}>
              <Box textAlign="center">
                <Button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  style={{
                    background: corIgreja.principal,
                    color: 'white',
                    fontFamily: 'Fugaz One',
                  }}
                  variant="contained"
                  severity="success"
                  //   endIcon={<TouchAppIcon />}
                >
                  Fechar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchList;
