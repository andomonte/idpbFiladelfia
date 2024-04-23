import { Box, Avatar, Button } from '@material-ui/core';
import React from 'react';
import QRCode from 'react-qr-code';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/rubik';
import api from 'src/components/services/api';
import { styled } from '@mui/material/styles';
import imageCompression from 'browser-image-compression';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import useSWR from 'swr';
import { signOut } from 'next-auth/client';
import CropImage from './cropEasy';

const Input = styled('input')({
  display: 'none',
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

/* import useSWR from 'swr';

function getDados(email, nome) {
  const Nome = nome;
  const Email = email;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const url = `${window.location.origin}/api/consultarolMembros/${Email}/${Nome}`;

  const { data, error } = useSWR(url, fetcher);

  
  

  return data;
} */

function meuPerfil({ secao, perfilUser }) {
  const urlImagem = perfilUser ? perfilUser.foto : '';
  const [upLoadFile, setUpLoadFile] = React.useState('');
  const [imageSize, setImageSize] = React.useState('');
  const [urlImage, setUrlImage] = React.useState('');

  const [fileImage, setFileImage] = React.useState(urlImagem);
  const [openCrop, setOpenCrop] = React.useState('inicio');
  // const [fotoDeletar, setFotoDeletar] = React.useState(urlImagem);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const url = `/api/consultaRolMembros2/${perfilUser.RolMembro}`;
  const { data: inscritos, error2 } = useSWR(url, fetcher);
  React.useEffect(async () => {
    if (inscritos && inscritos.length) {
      setFileImage(inscritos[0].foto);
      //   setFotoDeletar(inscritos[0].foto);
    }
    if (error2) return <div>An error occured.</div>;
    if (!inscritos) return <div>Loading ...</div>;

    return 0;
  }, [inscritos]);
  console.log('perfilUser', perfilUser);
  const process = async (selectedImage) => {
    try {
      const createFile = async (Myfile) => {
        const response = await fetch(Myfile);
        const data = await response.blob();
        const metadata = {
          type: 'image/png',
        };
        const nomeFoto = perfilUser.RolMembro;
        const file = new File([data], perfilUser.RolMembro, metadata);
        const dataFile = new FormData();
        dataFile.append('file', file, nomeFoto);
        api
          .post('/api/fotos', dataFile)

          .then((responses) => {
            if (responses) {
              api
                .post('/api/imagePerfil', {
                  RolMembro: perfilUser.RolMembro,
                  fileImage: `https://cafinpi.s3.amazonaws.com/membros/${nomeFoto}`,
                  // urlImage -> esse urlImage é o da imagem selecionada já em blob
                })
                .then((response2) => {
                  if (response2) {
                    const valPerfil = {
                      ...perfilUser,
                      foto: response2.data.foto,
                    };

                    sessionStorage.setItem(
                      'perfilUser',
                      JSON.stringify(valPerfil),
                    );
                    window.location.reload(true);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      createFile(selectedImage);
    } catch (err) {
      console.log(err);
    }
  };

  const atualizarImagem = async () => {
    if (upLoadFile) {
      await process(fileImage);
    }
  };

  React.useEffect(() => {
    if (fileImage !== '' && !openCrop) atualizarImagem();
  }, [openCrop]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      {!openCrop || openCrop === 'inicio' ? (
        <Box
          height="97%"
          width="100%"
          ml={1.2}
          mr={1.2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth={300}
            height="100%"
            width="100%"
          >
            <Box
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              style={{
                borderRadius: '16px',
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Box>
                  <Box
                    mt="0vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img width={181} src={corIgreja.logo} alt="logo" />
                  </Box>
                </Box>
                <Box
                  mt="2vh"
                  display="flex"
                  width="100%"
                  height="74%"
                  sx={{ minHeight: 400 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt="1vh"
                    >
                      <Box
                        height={160}
                        width={160}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="4px solid #fff"
                        borderRadius="100%"
                      >
                        <label htmlFor="icon-button-file">
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={async (e) => {
                              const imageFile = e.target.files[0];

                              const options = {
                                maxSizeMB: 0.5,
                                maxWidthOrHeight: 320,
                                useWebWorker: true,
                              };
                              try {
                                const compressedFile = await imageCompression(
                                  imageFile,
                                  options,
                                );

                                setUpLoadFile(compressedFile);
                                const imageDataUrl = await readFile(
                                  compressedFile,
                                );
                                setImageSize(compressedFile.size);
                                setUrlImage(imageDataUrl);
                                setOpenCrop(true);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          />

                          <Avatar
                            style={{ width: 150, height: 150 }}
                            alt="nome"
                            ord="123456789?"
                            src={fileImage || ''}
                          >
                            {fileImage === '' || fileImage === null ? (
                              <IconButton
                                style={{ color: 'black' }}
                                aria-label="upload picture"
                                component="span"
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  flexDirection="column"
                                  fontSize="12px"
                                  color="'#fff  '"
                                  fontFamily="arial black"
                                  width="100%"
                                >
                                  <Box color="'#fff'" mt={0.5}>
                                    CLICK AQUI
                                  </Box>
                                  <Box mt={0.5}>PARA</Box>

                                  <Box mt={0.5}>INSERIR SUA</Box>
                                  <Box mt={0.5}>FOTO</Box>
                                </Box>
                              </IconButton>
                            ) : null}
                          </Avatar>
                        </label>
                      </Box>
                    </Box>
                    <Box
                      mt="8vh"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Box
                        height={90}
                        width={100}
                        display="flex"
                        bgcolor="white"
                        borderRadius={6}
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                        ml={2}
                      >
                        <QRCode
                          size={78}
                          value={perfilUser.Igreja + perfilUser.RolMembro}
                        />
                      </Box>
                      <Box ml={3} width="60%">
                        <Box
                          fontFamily="Fugaz One"
                          fontSize="16px"
                          color="white"
                        >
                          {secao && secao.user.name.toUpperCase()}
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Célula:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.Celula}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Supervisão:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.Supervisao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Coordenação:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.Coordenacao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontSize: '12px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          Distrito:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.nomeDistrito}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      mt="3vh"
                      height="40%"
                      minHeight={100}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        height="40%"
                        minHeight={150}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Box fontFamily="Rubik" fontSize="12px" color="white">
                          MATRÍCULA
                        </Box>
                        <Box
                          mt={0}
                          sx={{
                            color: '#ffdd55',
                            fontFamily: 'Rubik',
                            fontWeight: 'bold',
                            fontSize: '28px',
                          }}
                        >
                          {perfilUser.Igreja}
                          {perfilUser.RolMembro}{' '}
                        </Box>
                      </Box>
                    </Box>
                    <Box mt="3vh">
                      <Button
                        style={{
                          color: 'white',
                          borderRadius: '10px',
                          fontFamily: 'arial black',
                          background: corIgreja.tercenaria,
                          width: '100%',
                        }}
                        onClick={() => {
                          signOut({
                            callbackUrl: `${window.location.origin}`,
                          });
                          // setOpenNovoRelatorio(false);
                        }}
                        variant="contained"
                        severity="success"
                      >
                        FAZER LOGOUT
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mt={0} height="100%" width="99vw">
          <Box>
            <CropImage
              photoURL={urlImage}
              setOpenCrop={setOpenCrop}
              setPhotoURL={setUrlImage}
              setFileImage={setFileImage}
              imageSize={imageSize}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default meuPerfil;
