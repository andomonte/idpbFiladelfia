import React from 'react';
import { makeStyles, Slider, withStyles, Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoIosRewind, IoIosFastforward } from 'react-icons/io';
import { IoVolumeMediumSharp, IoVolumeMuteSharp } from 'react-icons/io5';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';

import styles from './control.module.css';

const useStyles = makeStyles((theme) => ({
  volumeSlider: {
    width: '100px',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '15vw',
    },
  },
  alturaRodape: {
    marginTop: 60,

    [theme.breakpoints.down('sm')]: {
      marginTop: -40,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: -10,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 5,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 20,
    },
  },

  alturaPause1: {
    marginTop: -120,

    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: -120,
    },
  },
  bottomIcons: {
    color: '#999',
    padding: '12px 8px',

    '&:hover': {
      color: '#fff',
    },
  },
}));
const PrettoSlider = withStyles({
  root: {
    height: '20px',
    color: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    border: '2px solid currentColor',
    marginTop: -3,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: '100%',
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

function Control({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
  setZoomVideo,
  zoomVideo,
}) {
  const classes = useStyles();

  return (
    <Box
      style={{ marginTop: zoomVideo ? '-100vh' : '-45vh' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={zoomVideo ? '100vw' : '90vw'}
        height={zoomVideo ? '100vh' : '45.0vh'}
        ref={controlRef}
        bgcolor={currentTime !== '0:00' ? '' : 'black'}
      >
        <Box
          fontFamily="Fugaz One"
          fontSize="12px"
          display="flex"
          justifyContent="start"
          alignItems="center"
          height="20%"
          width="100%"
          bgcolor="black"
          mt={3}
        >
          <Box ml={2} />
        </Box>
        <Box
          className={`${classes.alturaRodape}`}
          height="80%"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onDoubleClick={(e) => {
            if (e.clientX >= e.currentTarget.offsetWidth / 2) onForward();
            else onRewind();
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={`${classes.alturaPause1}`}
            height={208}
            width={72}
            borderRadius={8}
            onClick={onPlayPause}
          >
            {playing ? (
              <FaPause color="white" fontSize="medium" />
            ) : (
              <FaPlay color="white" fontSize="medium" />
            )}{' '}
          </Box>
        </Box>
        <div style={{ marginTop: '-10%' }}>
          <div className={styles.control__box}>
            <Box
              bgcolor="black"
              width="100%"
              height={90}
              className={styles.inner__controls}
            >
              <Box width="100%">
                <div className={styles.slider__container}>
                  <PrettoSlider
                    min={0}
                    max={100}
                    value={played * 100}
                    onChange={onSeek}
                    onChangeCommitted={onSeekMouseUp}
                    onMouseDown={onMouseSeekDown}
                  />
                </div>
                <Box width="100%" display="flex">
                  <Box ml={2.5} onClick={onPlayPause}>
                    {playing ? (
                      <FaPause color="white" fontSize="medium" />
                    ) : (
                      <FaPlay color="white" fontSize="medium" />
                    )}{' '}
                  </Box>
                  <Hidden xsDown>
                    <Box
                      ml={3}
                      className={styles.icon__btn}
                      onDoubleClick={onRewind}
                    >
                      <IoIosRewind color="white" fontSize="medium" />
                    </Box>
                    <Box
                      ml={1}
                      className={styles.icon__btn}
                      onClick={onForward}
                    >
                      <IoIosFastforward color="white" fontSize="medium" />
                    </Box>
                  </Hidden>
                  <Box className={styles.icon__btn} onClick={onMute}>
                    {mute ? (
                      <IoVolumeMuteSharp color="white" fontSize="medium" />
                    ) : (
                      <IoVolumeMediumSharp color="white" fontSize="medium" />
                    )}
                  </Box>

                  <Box mt={-0.5}>
                    <Slider
                      className={`${classes.volumeSlider}`}
                      onChange={onVolumeChangeHandler}
                      value={volume * 100}
                      onChangeCommitted={onVolumeSeekUp}
                    />
                  </Box>

                  <Box width="80%" color="#fafafa" ml={3}>
                    {currentTime} : {duration}
                  </Box>
                  <Box ml={0}>
                    {!zoomVideo ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="4vh"
                        width="8vh"
                        borderRadius={6}
                        mt={0}
                        onClick={() => {
                          setZoomVideo(true);
                        }}
                      >
                        <BsArrowsFullscreen size="2vh" color="white" />
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="end"
                        mr={2}
                        alignItems="center"
                        height="4vh"
                        width="8vh"
                        borderRadius={6}
                        mt={0}
                        onClick={() => {
                          setZoomVideo(false);
                        }}
                      >
                        <BsFullscreenExit size="2vh" color="white" />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Control;
