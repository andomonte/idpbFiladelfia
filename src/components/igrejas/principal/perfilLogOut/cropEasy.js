import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import { Button, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import getCroppedImg from './cropImage';
import '@fontsource/fugaz-one';
// Padrões para peso 400.
const useStyles = makeStyles((theme) => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#AA4400',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 32,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
}));

export default function Demo({
  photoURL,
  setOpenCrop,
  setFileImage,
  imageSize,
}) {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels2) => {
    setCroppedAreaPixels(croppedAreaPixels2);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage2 = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        imageSize,
        rotation,
      );
      // const previewUrl = window.URL.createObjectURL(blob);

      setFileImage(croppedImage2);

      setOpenCrop(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          image={photoURL}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={16 / 16}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div style={{ color: 'white' }} className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={0}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom2) => setZoom(zoom2)}
          />
        </div>
        <div style={{ color: 'white' }} className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ root: classes.slider }}
            onChange={(e, rotation2) => setRotation(rotation2)}
          />
        </div>
        <Box width="100%" display="flex" justifyContent="center" mt="6vh">
          <Button
            onClick={() => {
              setOpenCrop(false);
              setFileImage('');
            }}
            variant="contained"
            style={{
              width: '50%',
              background: '#781080',
              color: 'white',
              fontFamily: 'Fugaz One',
            }}
            classes={{ root: classes.cropButton }}
          >
            CANCELAR
          </Button>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            style={{
              width: '50%',
              background: '#e0711a',
              color: 'white',
              fontFamily: 'Fugaz One',
            }}
            classes={{ root: classes.cropButton }}
          >
            SELECIONAR IMAGEM
          </Button>
        </Box>
      </div>
    </div>
  );
}
