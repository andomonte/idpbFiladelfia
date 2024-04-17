import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';
import { MdOnlinePrediction } from 'react-icons/md';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function TabCelula({ nomesCelulas, podeEditar }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [respostas, setRespostas] = React.useState({});
  const dados = nomesCelulas || [
    { Nome: 'Sem nomes registrados', Presenca: false, Situacao: 'MEMBRO' },
  ];

  const handleRegistro = (index) => {
    let cor;

    if (podeEditar) dados[index].Presenca = !dados[index].Presenca;
    if (dados[index].Presenca === 'igreja') {
      cor = '#F0FFF0';
    } else if (dados[index].Presenca === 'live') cor = '#fe9f';
    else cor = '#feff';

    const updatedValue = { [index]: cor };
    setRespostas((shopCart) => ({
      ...shopCart,
      ...updatedValue,
    }));
  };

  React.useEffect(() => {
    for (let index = 0; index < dados.length; index += 1) {
      let cor;
      if (
        dados[index].Presenca === 'igreja' ||
        dados[index].Presenca === true
      ) {
        cor = '#F0FFF0';
      } else if (dados[index].Presenca === 'live') cor = '#fe9f';
      else cor = '#feff';

      const updatedValue = { [index]: cor };
      setRespostas((shopCart) => ({
        ...shopCart,
        ...updatedValue,
      }));
    }
  }, [dados]);
  React.useEffect(() => {
    for (let index = 0; index < dados.length; index += 1) {
      let cor;
      if (
        dados[index].Presenca === 'igreja' ||
        dados[index].Presenca === true
      ) {
        cor = '#F0FFF0';
      } else if (dados[index].Presenca === 'live') cor = '#fe9f';
      else cor = '#feff';

      const updatedValue = { [index]: cor };
      setRespostas((shopCart) => ({
        ...shopCart,
        ...updatedValue,
      }));
    }
  }, [nomesCelulas.length]);
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
                {row.Nome.length > 30
                  ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                  : row.Nome}
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
                {dados[index].Presenca === 'igreja' ||
                dados[index].Presenca === true ? (
                  <BsFillCheckCircleFill color="green" />
                ) : (
                  <Box>
                    {dados[index].Presenca === 'live' ? (
                      <MdOnlinePrediction size={20} color="blue" />
                    ) : (
                      <BsXCircleFill color="red" />
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </TableContainer>
    </Paper>
  );
}
