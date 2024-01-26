import React from 'react';
import { makeStyles, Slider, withStyles, Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoIosRewind, IoIosFastforward } from 'react-icons/io';
import { IoVolumeMediumSharp, IoVolumeMuteSharp } from 'react-icons/io5';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { Oval } from 'react-loading-icons';

import { TiArrowBack } from 'react-icons/ti';
import styles from './control.module.css';

const useStyles = makeStyles({
  volumeSlider: {
    width: '100px',
    color: 'white',
  },

  bottomIcons: {
    color: '#999',
    padding: '12px 8px',

    '&:hover': {
      color: '#fff',
    },
  },
});
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
  const [loading2, setLoading2] = React.useState(false);
  const handleVoltar = () => {
    setLoading2(true);
    /* window.location.href =
      'https://www.idpb-ibpms.com.br/Pages/modulocursandoPage.aspx'; */
  };
  return (
    <Box
      style={{ marginTop: '-40vh' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="60vw"
        height="40.0vh"
        ref={controlRef}
        bgcolor={currentTime !== ' rgba(0, 0, 0, 0.6)' ? '' : 'black'}
      >
        <Box
          fontFamily="Fugaz One"
          fontSize="12px"
          display="flex"
          justifyContent="start"
          alignItems="center"
          height="10%"
          width="100%"
          onClick={handleVoltar}
          bgcolor="black"
        />
        <Box
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
            height={48}
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
        <div className={styles.bottom__container}>
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
          <div className={styles.control__box}>
            <Box
              bgcolor="black"
              width="100%"
              height={60}
              className={styles.inner__controls}
            >
              <Box width="90%" display="flex">
                <Box ml={2} onClick={onPlayPause}>
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
                  <Box ml={1} className={styles.icon__btn} onClick={onForward}>
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

                <Box width="30%" color="#fafafa" ml={3}>
                  {currentTime} : {duration}
                </Box>
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
                    justifyContent="center"
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
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Control;
