import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';

import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Player({ radioIdpb }) {
  const musics = radioIdpb;
  const musicaInicial = {
    label: 'Buscando uma Musica...',
    value: -1,
  };

  const [numberMusic, setNumberMusic] = React.useState(0);
  const [selMusica, setSelMusica] = React.useState('');
  const [musica, setMusica] = React.useState(musicaInicial);
  const [novaLista, setNovaLista] = React.useState('');
  const [repeat, setRepeat] = React.useState(false);

  const handleMudar = () => {
    if (!novaLista.length) {
      let newMusic = Math.floor(Math.random() * musics.length);
      if (newMusic === numberMusic) newMusic -= 1;
      if (newMusic < 0) newMusic = musics.length - 1;
      setMusica(musics[newMusic]);
      setNumberMusic(newMusic);
    } else {
      let newMusic = numberMusic + 1;
      if (numberMusic > novaLista.length) newMusic = novaLista.length - 1;
      if (newMusic > novaLista.length - 1) newMusic = 0;

      setMusica(novaLista[newMusic]);
      setNumberMusic(newMusic);
    }
  };

  React.useEffect(() => {
    const newLista = [];

    if (selMusica) {
      for (let i = 0; i < selMusica.length; i += 1) {
        for (let j = 0; j < musics.length; j += 1) {
          if (musics[j].label === selMusica[i]) newLista[i] = musics[j];
        }
      }

      setNovaLista(newLista);
      setNumberMusic(1);
    }
  }, [selMusica]);

  React.useEffect(() => {
    const newMusic = Math.floor(Math.random() * musics.length);
    setNumberMusic(newMusic);
    handleMudar();
  }, []);
  React.useEffect(() => {
    handleMudar();
  }, [novaLista]);
  const handleIncMusica = () => {
    let newMusic = numberMusic + 1;
    if (novaLista.length < 1) {
      if (newMusic >= musics.length) newMusic = 0;
      setMusica(musics[newMusic]);
      setNumberMusic(newMusic);
    } else {
      if (newMusic >= novaLista.length) newMusic = 0;
      setMusica(novaLista[newMusic]);
      setNumberMusic(newMusic);
    }
  };
  const handleDecMusica = () => {
    let newMusic = numberMusic - 1;
    if (novaLista.length < 1) {
      if (newMusic < 0) newMusic = musics.length - 1;
      setMusica(musics[newMusic]);
      setNumberMusic(newMusic);
    } else {
      if (newMusic < 0) newMusic = novaLista.length - 1;
      setMusica(novaLista[newMusic]);
      setNumberMusic(newMusic);
    }
  };
  const handleRepMusica = () => {
    setRepeat(!repeat);
  };

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
      <Box
        width="96%"
        // maxWidth={450}

        bgcolor={corIgreja.principal}
        height="97%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
        ml={0}
      >
        <Box width="100%" mb="10vh">
          <Box
            height={180}
            mb="2vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img src={corIgreja.logo} alt="Filadelfia" height={60} />
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Box width="96%">
              <Autocomplete
                multiple
                id="tags-filled"
                sx={{
                  background: 'white',
                  color: 'black',

                  borderRadius: 2,
                }}
                onChange={(_, newValue) => {
                  if (newValue) setSelMusica(newValue);
                }}
                options={musics.map((option) => option.label)}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    //                    inputRef={necessidadeRef}
                    placeholder="Escolha suas Músicas"
                  />
                )}
              />
            </Box>
          </Box>
          <Box
            width="100%"
            mt={10}
            color="white"
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box borderRadius={16} height={120} width="90%" bgcolor="#f1f3f4">
              {/* autoPlay */}
              <Box display="flex" justifyContent="center">
                <ReactAudioPlayer
                  src={musica && musica.url ? musica.url : ''}
                  loop={repeat}
                  autoPlay
                  controls
                  onEnded={handleMudar}
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <FaCaretLeft
                  onClick={handleDecMusica}
                  size={25}
                  color={corIgreja.principal2}
                />
                <Box ml={5} mr={5}>
                  <MdLoop
                    onClick={handleRepMusica}
                    size={25}
                    color={repeat ? 'blue' : corIgreja.principal2}
                  />
                </Box>

                <FaCaretRight
                  onClick={handleIncMusica}
                  size={25}
                  color={corIgreja.principal2}
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={5}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="18px" fontFamily="Fugaz One" color="white">
              {musica && musica.label ? musica.label : ''}
            </Box>
          </Box>
          <Box
            mt={2}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Rubik"
            color="yellow"
          >
            <Box fontSize="18px" fontFamily="Fugaz One">
              {musica && musica.compositor ? musica.compositor : ''}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Player;
