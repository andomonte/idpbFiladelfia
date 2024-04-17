import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';

import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function TabDiscipuado({
  nomesCelulas,
  setPresentes,
  setRelCelula,
  podeEditar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [respostas, setRespostas] = React.useState({});
  let dados = [{ Nome: 'Sem nomes registrados', Presenca: false }];
  if (nomesCelulas) dados = nomesCelulas;

  const handleRegistro = (index) => {
    let cor;

    if (podeEditar) dados[index].Presenca = !dados[index].Presenca;
    if (dados[index].Presenca) {
      cor = '#F0FFF0';
    } else {
      cor = '#feff';
    }
    setRelCelula(dados);
    const updatedValue = { [index]: cor };
    setRespostas((shopCart) => ({
      ...shopCart,
      ...updatedValue,
    }));
  };

  React.useEffect(() => {
    //    setPresentes(setPresentes(dados.length));
    const qtyPresentes = dados?.filter((val) => val.Presenca === true);

    setPresentes(qtyPresentes.length);
  }, [respostas]);

  React.useEffect(() => {
    for (let index = 0; index < dados.length; index += 1) {
      let cor;
      if (dados[index].Presenca) {
        cor = '#F0FFF0';
      } else {
        cor = '#feff';
      }
      setRelCelula(dados);
      const updatedValue = { [index]: cor };
      setRespostas((shopCart) => ({
        ...shopCart,
        ...updatedValue,
      }));
    }
  }, []);
  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '98%',
        height: '95%',
        marginLeft: 0.5,
        marginTop: 1,
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ height: '100%' }}>
        {dados.map((row, index) => (
          <Box
            mt={0}
            bgcolor={Object.keys(respostas).length && respostas[index]}
            display="flex"
            alignItems="center"
            key={
              row.Nome.length > 30
                ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                : row.Nome
            }
            height={40}
            sx={{ borderBottom: '1px solid #00a' }}
          >
            <Box display="flex" width="100%">
              <Box width="100%" display="flex" alignItems="center" ml={1}>
                {row.Nome.length > 30 ? (
                  <Box
                    color={
                      row.status && row.status.toUpperCase() === 'NOVO'
                        ? 'blue'
                        : 'black'
                    }
                  >
                    {row.Nome.substring(0, row.Nome.lastIndexOf(' '))}
                  </Box>
                ) : (
                  <Box
                    color={
                      row.status && row.status.toUpperCase() === 'NOVO'
                        ? 'blue'
                        : 'black'
                    }
                  >
                    {row.Nome}
                  </Box>
                )}
              </Box>
              <Box
                onClick={() => {
                  handleRegistro(index);
                }}
                width="10%"
                display="flex"
                alignItems="center"
                ml={1}
              >
                {dados[index].Presenca ? (
                  <BsFillCheckCircleFill color="green" />
                ) : (
                  <BsXCircleFill color="red" />
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </TableContainer>
    </Paper>
  );
}
