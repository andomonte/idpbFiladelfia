import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/fugaz-one';
// Padrões para peso 400.
function PesquisaCPF({ iniCompra, eventoSelecionado }) {
  const { cpf } = iniCompra;
  // const classes = useStyles();

  const [posts, setPosts] = React.useState('vazio');
  const router = useRouter();

  const handleComprar = async () => {
    const qtyA = cpf;
    const qtyC = 0;
    const total = 0;
    router.push({
      pathname: './dadosComprador',
      query: { qtyA, qtyC, total },
    });
  };

  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscEventosAMCPF/${eventoSelecionado.nomeEvento}/${cpf}`;
      const res = await axios.get(url);
      if (res.data && res.data.length) {
        setPosts(() => [...res.data]);
        // setArray
      } else {
        handleComprar();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  React.useEffect(async () => {
    if (posts !== 'vazio') {
      if (posts.length > 0) {
        const inscrito = posts.filter(
          (val) =>
            val.status === 'approved' ||
            (val.status === 'pending' && val.Fpagamento === 'pix'),
        );

        if (inscrito.length) {
          router.push({
            pathname: './meuTicket',
            query: {
              cpf,
            },
          });
        } else handleComprar();
      } else handleComprar(); // setOpenDrawerInval(true);
    }
  }, [posts]);

  const voltar = () => {
    router.push({
      pathname: './',
    });
  };

  return (
    <Box>
      <Box width="100vw" height={2} bgcolor={corIgreja.principal} mt={0} ml={0}>
        <Box width="10%" p={2}>
          <ArrowBackIcon
            sx={{
              fontSize: 20,
              color: '#fff',
            }}
            onClick={voltar}
          />
        </Box>
      </Box>
      <Box
        height="99vh"
        minHeight={500}
        bgcolor={corIgreja.principal}
        display="flex"
        justifyContent="center"
      >
        <Box
          width="100vw"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          height="99vh"
          minHeight={500}
        >
          <Box
            display="flex"
            justifyContent="center"
            textAlign="center"
            mt={6}
            mb={2}
          >
            <Box
              mb={2}
              mt={2}
              width="80%"
              display="flex"
              justifyContent="center"
              textAlign="center"
            >
              <img src={corIgreja.logo1} alt="Castelo" width={60} height={75} />
            </Box>
          </Box>
          <Box
            ml={2}
            width="90%"
            height="100%"
            mt={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box display="flex" justifyContent="center">
              <Oval stroke="white" width={130} height={85} />
            </Box>
            <Box color="white" mt={2} display="flex" justifyContent="center">
              <strong>Carregando...</strong>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PesquisaCPF;
