import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';
import { MdOnlinePrediction } from 'react-icons/md';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function TabCelula({
  nomesCelulas,
  setPresentes,
  setPresentesLive,
  setRelPresentes,
  podeEditar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const [respostas, setRespostas] = React.useState({});
  let dados = [{ Nome: 'Sem nomes registrados', Presenca: false }];
  if (nomesCelulas) dados = nomesCelulas;

  const handleRegistro = (index) => {
    let cor;
    let contStatus = 0;

    if (podeEditar) {
      if (dados[index].Presenca === false && contStatus === 0) {
        dados[index].Presenca = 'igreja';
        contStatus += 1;
      }
      if (dados[index].Presenca === 'igreja' && contStatus === 0) {
        dados[index].Presenca = 'live';
        contStatus += 1;
      }
      if (dados[index].Presenca === 'live' && contStatus === 0) {
        dados[index].Presenca = false;
        contStatus += 1;
      }
    }

    if (dados[index].Presenca === 'igreja') {
      cor = '#F0FFF0';
    } else if (dados[index].Presenca === 'live') cor = '#fe9f';
    else cor = '#feff';

    setRelPresentes(dados);
    const updatedValue = { [index]: cor };
    setRespostas((shopCart) => ({
      ...shopCart,
      ...updatedValue,
    }));
  };

  React.useEffect(() => {
    //    setPresentes(setPresentes(dados.length));
    const qtyPresentes = dados.filter((val) => val.Presenca === 'igreja');
    const qtyPresentesLive = dados.filter((val) => val.Presenca === 'live');

    setPresentes(qtyPresentes.length);
    setPresentesLive(qtyPresentesLive.length);
  }, [respostas]);

  React.useEffect(() => {
    for (let index = 0; index < dados.length; index += 1) {
      let cor;
      if (dados[index].Presenca === 'igreja') {
        cor = '#F0FFF0';
      } else if (dados[index].Presenca === 'live') cor = '#fe9f';
      else cor = '#feff';
      setRelPresentes(dados);
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
      <TableContainer sx={{ maxHeight: 310 }}>
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
                {dados[index].Presenca === 'igreja' ? (
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
