// Display posts in frontend (in /pages/index.tsx)
import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import corIgreja from 'src/utils/coresIgreja';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip'; // dica ao passar o mouse
import SearchList from './searchList';



const useStyles = makeStyles((theme) => ({
  input_Box: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  search: {
    background: '#fafafa',
    padding: '0px 0px',
    display: 'flex',
    // alignCelulass: 'center',
    height: 55,
    width: '100%',
    borderRadius: 0,
    //  maxWidth: 900,
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 4,
      marginBottom: 5,
    },
  },
  search2: {
    width: '90%',
    marginTop: 10,

    [theme.breakpoints.down('md')]: {
      marginTop: 4,
    },
  },
  tf_s: {
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
  },
  imgSearch: {
    display: 'flex',
    alignCelulass: 'center',
    height: '40%',
    width: '50%',
    marginLeft: '40%',
    marginBottom: 20,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '20%',
      marginLeft: '40%',
      marginTop: 4,
    },
  },
}));

function BuscarCelulas({ celulas }) {
  const classes = useStyles();

  const [querys, updateQuery] = React.useState(null);
  const [valor, setValor] = React.useState('');

  const handleChange = ({ currentTarget }) => {
    setValor(currentTarget.value);
  };

  const handlePress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      updateQuery(valor);
    }
  };
  const handleClick = () => {
    if (valor === '') {
      updateQuery(null);
    } else {
      updateQuery(valor);
    }
  };
  //= para procurar os dados  ==========================================
  const searcher = new FuzzySearch(
    celulas,
    ['Lider', 'Celula', 'Nome', 'Logradouro', 'Bairro', 'CelulaNumber', 'CEP'],
    {
      caseSensitive: false,
    },
  );

  let result = '';
  if (querys) result = searcher.search(querys);
  if (celulas === 'error') return <div>Erro ao acessar o Banco.</div>;
  if (!celulas) return <div>Carregando ...</div>;
  //= =================================================================
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box className={classes.search2}>
          <Box textAlign="center" mt={5} mb={2}>
            <img src={corIgreja.logo} alt="Celulas" width={100} />
          </Box>
          <TextField
            InputProps={{
              endAdornment: (
                <Tooltip title="Pesquisar Igreja">
                  <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <SearchIcon />
                  </Box>
                </Tooltip>
              ),
            }}
            className={classes.search}
            id="field1"
            name="password"
            autoComplete="off"
            type="text"
            value={valor}
            variant="outlined"
            placeholder="Nome ou Número da Celula, Nome do Lider"
            onChange={handleChange}
            // onKeyPress={handlePress}
            onKeyPress={handlePress}
          />
        </Box>
      </Box>
      <Box width="100%">
        {result && (
          <Box>
            {result.map((itens) => (
              <Box ml={0} key={itens.id}>
                <Box>
                  <Grid>
                    <SearchList celulas={itens} />
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BuscarCelulas;
