import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@material-ui/core';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import styles from './App.module.css';
import Control from './Components/control';
import formatTime from './format';

let count = 0;
function App({ linkVideo, setFimPlay }) {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);
  const telaRef = useRef(null);
  const [zoomVideo, setZoomVideo] = React.useState(false);
  const [videoCarregado, setVideoCarregado] = React.useState(false);
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
  const [tempoMusica, setTempoMusica] = React.useState(0);
  const handleStartPlay = () => {
    setVideoCarregado(true);
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };
  React.useEffect(async () => {
    if (videoCarregado) {
      setTempoMusica(duration);
    }
  }, [videoCarregado]);

  React.useEffect(async () => {
    if (tempoMusica !== 0) {
      playPauseHandler();
    }
  }, [tempoMusica]);

  return (
    <FullScreen handle={handle}>
      <div ref={telaRef} className={styles.video_container}>
        <div onMouseMove={mouseMoveHandler}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            sx={{ pointerEvents: 'none' }}
            justifyContent="center"
          >
            <ReactPlayer
              sytles={{ pointerEvents: 'none' }}
              ref={videoPlayerRef}
              url={linkVideo || ''}
              width={zoomVideo ? '100vw' : '90vw'}
              height={zoomVideo ? '100vh' : '50vh'}
              playing={playing}
              volume={volume}
              muted={muted}
              controls={false}
              onEnded={handleMudar}
              onProgress={progressHandler}
              onBuffer={bufferStartHandler}
              onBufferEnd={bufferEndHandler}
              onReady={handleStartPlay}
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
            playing={playing}
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
  );
}

export default App;
