import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';
import ReactPlayer from 'react-player';

export default function App({ dataYouTube }) {
  const [video, setVideo] = React.useState('video incial');
  const [numberVideo, setNumberVideo] = React.useState(0);
  const [repeat, setRepeat] = React.useState(false);
  React.useEffect(() => {
    setNumberVideo(0);
    setVideo(
      `https://www.youtube.com/watch?v=${dataYouTube.items[0].snippet.resourceId.videoId}`,
    );
  }, []);

  const handleIncVideo = () => {
    let newVideo = numberVideo + 1;
    if (newVideo >= dataYouTube.items.length) newVideo = 0;
    setVideo(
      `https://www.youtube.com/watch?v=${dataYouTube.items[numberVideo].snippet.resourceId.videoId}`,
    );
    setNumberVideo(newVideo);
  };
  const handleDecVideo = () => {
    let newVideo = numberVideo - 1;
    if (newVideo < 0) newVideo = 5;
    setVideo(
      `https://www.youtube.com/watch?v=${dataYouTube.items[numberVideo].snippet.resourceId.videoId}`,
    );
    setNumberVideo(newVideo);
  };
  const handleRepVideo = () => {
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
        <Box width="100%" height="100%">
          <Box
            width="100%"
            height="100%"
            color="white"
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              borderRadius={16}
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
            >
              {/* autoPlay */}
              <Box
                mt={2}
                width="100%"
                height="90%"
                display="flex"
                justifyContent="center"
              >
                {/* <YouTube videoId="yhf1Zyft8eY" opts={videoOptions} /> */}
                <ReactPlayer controls width="100%" height="100%" url={video} />
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <FaCaretLeft
                  onClick={handleDecVideo}
                  size={25}
                  color="#C1C2C3"
                />
                <Box ml={5} mr={5}>
                  <MdLoop
                    onClick={handleRepVideo}
                    size={25}
                    color={repeat ? 'blue' : '#C1C2C3'}
                  />
                </Box>

                <FaCaretRight
                  onClick={handleIncVideo}
                  size={25}
                  color="#C1C2C3"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
