import React, { useState, useRef } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import api from 'src/components/services/api';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';

import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import styles from './compVideo/App.module.css';
import Control from './compVideo/Components/control';
import formatTime from './compVideo/format';

let count = 0;
const customStyles2 = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    maxHeight: '100px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided) => ({
    ...provided,

    maxHeight: '90px',
    padding: '0 6px',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
};
const customStyles = {
  option: (provided, state) => ({
    ...provided,

    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: state.data.color,
    fontSize: '16px',
  }),
  singleValue: (provided) => ({
    ...provided,

    color: 'black',
    fontSize: '16px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '14px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  }),
};
function createListaCategoria(value, label) {
  return {
    value,
    label,
  };
}
function Player({ radioIdpb }) {
  const musicaInicial = {
    label: 'Buscando uma Musica...',
    value: -1,
  };
  let listaCategoria = '';
  const setPerson = new Set();
  const musicsCategoria = radioIdpb.filter((person) => {
    const duplicatedPerson = setPerson.has(person.categoria);
    setPerson.add(person.categoria);
    return !duplicatedPerson;
  });

  if (musicsCategoria.length) {
    listaCategoria = musicsCategoria.map((rol) =>
      createListaCategoria(rol.id, rol.categoria),
    );
  }

  const categoriaInicial = [
    {
      value: 0,
      label: 'Todos os Tipos',
    },
  ];

  const [musics, setMusics] = React.useState(radioIdpb);
  const [opMusics, setOpMusics] = React.useState(
    radioIdpb.map((rol, index) => createListaCategoria(index, rol.label)),
  );
  const [numberMusic, setNumberMusic] = React.useState(0);
  const [musicaValor, setMusicaValor] = React.useState('');
  const [selMusica, setSelMusica] = React.useState('');
  const [musica, setMusica] = React.useState(musicaInicial);
  const [categoria, setCategoria] = React.useState(categoriaInicial[0]);

  const opcCategoria = categoriaInicial;
  const listaCategoriaInicial = listaCategoria.map((val, index) =>
    createListaCategoria(index, val.label),
  );

  listaCategoriaInicial.map((val) => {
    opcCategoria.push(val);
    return 0;
  });

  const [novaLista, setNovaLista] = React.useState('');
  const [repeat, setRepeat] = React.useState(false);
  const [video, setVideo] = React.useState('');

  const [fimPlay, setFimPlay] = React.useState(false);

  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);
  const telaRef = useRef(null);
  const [zoomVideo, setZoomVideo] = React.useState(false);
  const [playingControl, setPlayingControl] = React.useState(false);
  const [playingOn, setPlayingOn] = React.useState(false);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const handle = useFullScreenHandle();
  React.useEffect(() => {
    if (zoomVideo) {
      handle.enter();
    } else handle.exit();

    return 0;
  }, [zoomVideo]);
  // Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking } = videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : 0;
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : 0;

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    // plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
    setPlayingControl(!videoState.playing);
  };

  const rewindHandler = () => {
    // Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    // FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state) => {
    if (count > 2) {
      telaRef.current.style.cursor = 'none';
      controlRef.current.style.visibility = 'hidden'; // toggling player control container
    } else if (controlRef.current.style.visibility === 'visible') {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0,
    });
  };

  const muteHandler = () => {
    // Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };
  const handleMudar = () => {
    controlRef.current.style.visibility = 'visible';
    telaRef.current.style.cursor = 'inherit';
    count = 0;
    setPlayingControl(!videoState.playing);
    setFimPlay('fim');
  };
  const onSeekMouseDownHandler = () => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = 'visible';
    telaRef.current.style.cursor = 'inherit';
    count = 0;
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  const playStartHandler = () => {
    setVideoState({ ...videoState, playing: true });
    controlRef.current.style.visibility = 'visible';
    telaRef.current.style.cursor = 'inherit';
    count = 0;
    if (playingOn) {
      setPlayingControl(true);

      // setVideoState({ ...videoState, playing: true });
    } else {
      setPlayingControl(false);
      setVideoState({ ...videoState, playing: false });
    }
    //  setVideoState({ ...videoState, playing: true });
  };
  React.useEffect(() => {
    if (playingOn) {
      setPlayingControl(true);
    } else setVideoState({ ...videoState, playing: true });
  }, [playingOn]);
  React.useEffect(() => {
    if (fimPlay === 'fim') {
      const listaFiltrada = musics;

      if (!novaLista.length) {
        let newMusic = Math.floor(Math.random() * listaFiltrada.length);
        if (newMusic === numberMusic) newMusic -= 1;
        if (newMusic < 0) newMusic = listaFiltrada.length - 1;
        setMusica(listaFiltrada[newMusic]);
        setNumberMusic(newMusic);
      } else if (novaLista.length && novaLista[0].label) {
        let newMusic = numberMusic + 1;

        if (numberMusic > novaLista.length) newMusic = novaLista.length - 1;
        if (newMusic > novaLista.length - 1) newMusic = 0;

        setMusica(novaLista[newMusic]);
        setNumberMusic(newMusic);
      } else {
        const musicaInicials = {
          label: novaLista[0],
          value: -1,
          compositor: 'gospel (Áudio oficial)',
        };

        setMusica(musicaInicials);
        setNumberMusic(0);
      }
      setFimPlay(false);
    }
  }, [fimPlay]);
  React.useEffect(() => {
    if (categoria.label !== 'Todos os Tipos') {
      const listaFiltrada = radioIdpb.filter(
        (val) => val.categoria === categoria.label,
      );
      setMusics(listaFiltrada);
      setOpMusics(
        listaFiltrada.map((rol, index) =>
          createListaCategoria(index, rol.label),
        ),
      );
    } else {
      setMusics(radioIdpb);
      setOpMusics(
        radioIdpb.map((rol, index) => createListaCategoria(index, rol.label)),
      );
    }

    if (!novaLista.length) {
      const newMusic = Math.floor(Math.random() * musics.length);
      setNumberMusic(newMusic);
      setFimPlay('fim');
    }
  }, [categoria]);
  React.useEffect(() => {
    const newLista = [];
    if (selMusica) {
      for (let i = 0; i < selMusica.length; i += 1) {
        const filterMusic = musics.filter((val) => val.label === selMusica[i]);

        if (filterMusic && filterMusic.length) {
          const valUnicoMusica = filterMusic[0];
          newLista[i] = valUnicoMusica;
        } else {
          newLista[i] = {
            label: selMusica[i],
            compositor: 'gospel (Áudio oficial)',
          };
        }
      }

      if (newLista && newLista.length) setNovaLista(newLista);
      else setNovaLista(selMusica);

      setNumberMusic(1);
    }
  }, [selMusica]);

  React.useEffect(() => {
    setFimPlay('fim');
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

  React.useEffect(async () => {
    if (musica && musica.label && musica.compositor) {
      const musicas = `${musica.label} ${musica.compositor}`;

      api
        .post('/api/consultaYouTube', {
          musicas,
        })
        .then((response) => {
          if (response) {
            setVideo(
              `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`,
            );
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [musica]);
  // const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const onBlurValue = () => {
    if (inputValue) {
      const valorFinal = musicaValor.length ? musicaValor : [];
      if (valorFinal.length) {
        const valorArray = [
          {
            value: valorFinal.length ? valorFinal.length : 0,
            label: inputValue,
          },
        ];
        valorFinal.push(valorArray[0]);
        setMusicaValor(valorFinal);
        setSelMusica(valorFinal.map((val) => val.label));
      } else {
        const valorArray = [
          {
            value: valorFinal.length ? valorFinal.length : 0,
            label: inputValue,
          },
        ];
        setMusicaValor(valorArray);
        setSelMusica(valorArray.map((val) => val.label));
      }
    }
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
        <Box width="100%">
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box mb="2vh" height="97%" width="90%" maxWidth={500}>
              <CreatableSelect
                isMulti
                id="long-value-select"
                instanceId
                options={opMusics}
                styles={customStyles2}
                value={musicaValor}
                inputValue={inputValue}
                onInputChange={setInputValue}
                // onMenuClose={onMenuClose}
                onBlur={onBlurValue}
                onChange={(e) => {
                  setMusicaValor(e);
                  setSelMusica(e.map((val) => val.label));

                  // setCategoria(e);
                }}
                placeholder={<div>Escolha ou digite a música e o autor</div>}
              >
                {opMusics}
              </CreatableSelect>{' '}
            </Box>
          </Box>
          <Box
            width="100%"
            mt={2}
            color="white"
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="60vh"
          >
            <Box borderRadius={16} height="100%" width="100%">
              {/* autoPlay */}
              <Box height="90%" display="flex" justifyContent="center">
                {/* <ReactPlayer
                  playing
                  controls={false}
                  width="auto"
                  height="auto"
                  url={video}
                  onEnded={handleMudar}
                  onError={(e) => {
                    setNumberVideo(numberVideo + 1);
             
                  }}
                /> */}

                <FullScreen handle={handle}>
                  <div ref={telaRef} className={styles.video_container}>
                    <div onMouseMove={mouseMoveHandler}>
                      <Box
                        mt={3}
                        width="100%"
                        height="100%"
                        display="flex"
                        sx={{ pointerEvents: 'none' }}
                        justifyContent="center"
                      >
                        <ReactPlayer
                          sytles={{ pointerEvents: 'none' }}
                          ref={videoPlayerRef}
                          url={video || ''}
                          width={zoomVideo ? '100vw' : '90vw'}
                          height={zoomVideo ? '100vh' : '40vh'}
                          playing={playing}
                          volume={volume}
                          muted={muted}
                          controls={false}
                          onReady={playStartHandler}
                          onPlay={() => {
                            setPlayingOn(true);
                          }}
                          onEnded={handleMudar}
                          onProgress={progressHandler}
                          onBuffer={bufferStartHandler}
                          onBufferEnd={bufferEndHandler}
                          config={{
                            youtube: {
                              playerVars: { showinfo: 1 },
                            },
                          }}
                        />
                      </Box>
                      <Control
                        controlRef={controlRef}
                        onPlayPause={playPauseHandler}
                        playing={playingControl}
                        onRewind={rewindHandler}
                        onForward={handleFastFoward}
                        played={played}
                        onSeek={seekHandler}
                        onSeekMouseUp={seekMouseUpHandler}
                        volume={volume}
                        onVolumeChangeHandler={volumeChangeHandler}
                        onVolumeSeekUp={volumeSeekUpHandler}
                        mute={muted}
                        onMute={muteHandler}
                        playRate={playbackRate}
                        duration={formatDuration}
                        currentTime={formatCurrentTime}
                        onMouseSeekDown={onSeekMouseDownHandler}
                        setZoomVideo={setZoomVideo}
                        zoomVideo={zoomVideo}
                      />
                    </div>
                  </div>
                </FullScreen>
              </Box>
              <Box height="10%" mt={-3} display="flex" justifyContent="center">
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
          <Box height="97%" display="flex" justifyContent="center" width="100%">
            <Box width="90%" maxWidth={500} mt={-3}>
              <Select
                menuPlacement="top"
                instanceId
                styles={customStyles}
                defaultValue={categoria}
                onChange={(e) => {
                  setCategoria(e);
                }}
                options={opcCategoria}
              />
            </Box>
          </Box>
          <Box
            mt={2}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="6%"
          >
            <Box
              width="100%"
              textAlign="center"
              fontSize="18px"
              fontFamily="Fugaz One"
              color="white"
            >
              {musica && musica.label ? musica.label : ''}
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Rubik"
            color="yellow"
            height="6%"
          >
            <Box
              width="100%"
              textAlign="center"
              fontSize="18px"
              fontFamily="Fugaz One"
            >
              {musica && musica.compositor ? musica.compositor : ''}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Player;
