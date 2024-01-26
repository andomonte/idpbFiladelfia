import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import corIgreja from 'src/utils/coresIgreja';
import Image from 'next/image';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// import corIgreja from 'src/utils/coresIgreja';
const bannerBlurHash =
  'data:image/webp;base64,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';

export default function TabCelula({
  lideranca,
  perfilUser,
  setBuscarNome,
  setOpenBuscar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const [openModal, setOpenModal] = React.useState(false);
  const [imagem, setImagem] = React.useState('');

  const lideresParcial = lideranca.filter(
    (val) =>
      Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === 'Lider',
  );

  const lideresSetor = lideresParcial.sort((a, b) => {
    if (new Date(a.Celula) > new Date(b.Celula)) return 1;
    if (new Date(b.Celula) > new Date(a.Celula)) return -1;
    return 0;
  });

  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* <TableContainer sx={{ maxHeight: '100%' }}>
        {lideresSetor &&
          lideresSetor.map((row, index) => (
            <Box
              mt={0}
              // bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={row.id}
              height={60}
            >
              <Box display="flex" width="100%">
                <Box ml={1} display="flex" alignItems="center">
                  <Avatar
                    alt="User"
                    src=""
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </Box>
                <Box
                  onClick={() => {
                    setBuscarNome(lideresSetor[index]);
                    setOpenBuscar(true);
                  }}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  ml={1}
                  mt={1}
                >
                  <Box>
                    <Box fontFamily="Fugaz One" fontSize="13px">
                      {row.Nome.length > 30
                        ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                        : row.Nome}
                    </Box>

                    <Box display="flex" fontFamily="Rubik" fontSize="12px">
                      <Box ml={0.5}>Coordenação: </Box>
                      <Box ml={1}> {row.Coordenacao}</Box>
                      <Box ml={2}>Super.: </Box>
                      <Box ml={1}> {row.Supervisao}</Box>
                      <Box ml={2}>Célula: </Box>
                      <Box ml={1}> {row.Celula}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
      </TableContainer> */}
      <TableContainer sx={{ maxHeight: '100%' }}>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {lideresSetor.map((row, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                {row.foto !== null && row.foto !== undefined ? (
                  <Avatar
                    onClick={() => {
                      setOpenModal(true);
                      setImagem(row.foto);
                    }}
                    src=""
                    alt="User"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  >
                    <Image
                      src={row.foto}
                      layout="fill"
                      objectFit="contain"
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={bannerBlurHash}
                    />
                  </Avatar>
                ) : (
                  <Avatar
                    src=""
                    alt="User"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                )}
              </ListItemAvatar>
              <Box
              /* onClick={() => {
                  setOpenModal2(true);
                }} */
              >
                <ListItemText style={{ marginTop: 8 }}>
                  <Box
                    style={{
                      display: 'flex',
                      marginLeft: 10,
                      fontFamily: 'Fugaz One',
                      fontSize: '12px',
                      color: '#000',
                    }}
                    onClick={() => {
                      setBuscarNome(lideresSetor[index]);
                      setOpenBuscar(true);
                    }}
                  >
                    {row.Nome.length > 30
                      ? row.Nome.substring(
                          0,
                          row.Nome.lastIndexOf(' '),
                        ).toUpperCase()
                      : row.Nome.toUpperCase()}
                  </Box>

                  <Box
                    style={{
                      display: 'flex',
                      marginLeft: 10,
                      fontFamily: 'Rubik',
                      fontSize: '12px',
                      color: '#000',
                    }}
                  >
                    <Box ml={0.2}>Coordenação: </Box>
                    <Box ml={1}> {row.Coordenacao}</Box>
                  </Box>
                </ListItemText>
                <ListItemText style={{ marginTop: -5 }}>
                  <Box
                    style={{
                      display: 'flex',
                      marginLeft: 0,
                      fontFamily: 'Rubik',
                      fontSize: '12px',
                      color: '#000',
                    }}
                  >
                    <Box ml={1.5}>Supervisão: </Box>
                    <Box ml={1}> {row.Supervisao}</Box>
                    <Box ml={2}>Célula: </Box>
                    <Box ml={1}> {row.Celula}</Box>
                  </Box>
                </ListItemText>
              </Box>
            </ListItem>
          ))}
        </List>
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
    </Paper>
  );
}
