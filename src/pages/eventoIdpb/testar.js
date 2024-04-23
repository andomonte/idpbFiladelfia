import { Box, TextField, Button } from '@material-ui/core';
import api from 'src/components/services/api';
import React from 'react';

function Home() {
  const [docNumber, setDocNumber] = React.useState('');
  /* const comprar = () => {
    api
      .post('/api/notification', {
        action: 'payment',
        data: { id: '21517931496' },
      })

      .then((response) => {
        const prefID = response.data;
     
        //   setOpen(true);
      })

      .catch((error) => {
        console.log(error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  }; */
  const testar = () => {
    api
      .post('/api/pegarDadosMP', {
        id: docNumber,
      })

      .then((response) => {
        if (response) {
          // router.push(cursoSelecionado[0].link);
        }
      })
      .catch((error) => {
        console.log('error:', error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };
  // return <Inscrições title="SISTEMA-IDPB Global" />;
  return (
    <Box
      onClick={testar}
      bgcolor="#faf"
      height={200}
      width={200}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box mt={-2}>
        <TextField
          id="Grau Ministerial"
          type="text"
          disabled
          InputLabelProps={{
            shrink: true,
          }}
          value={docNumber}
          variant="outlined"
          placeholder=""
          size="small"
          onChange={(e) => setDocNumber(e.target.value)}
          onFocus={(e) => setDocNumber(e.target.value)}
        />
      </Box>
      <h2>tetando dado</h2>;<Button onClick={testar}>teste envios mp</Button>
    </Box>
  );
}

export default Home;
