import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Dicas() {
  const [nomeDica, setNomeDica] = React.useState('');

  const url = `/api/consultaDicas`;
  const { data, error } = useSWR(url, fetcher);

  React.useEffect(() => {
    if (data) {
      const index = Math.floor(Math.random() * data.length);
      setNomeDica(data[index].Dica);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
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
                height="65vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={350}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <Box
                    height="100%"
                    minHeight={315}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="96%"
                    color="white"
                  >
                    <Box
                      fontSize="20px"
                      fontFamily="Rubik"
                      textAlign="center"
                      width="90%"
                    >
                      {nomeDica}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dicas;
