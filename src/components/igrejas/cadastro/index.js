import React, { useRef } from 'react';
import { signOut, useSession } from 'next-auth/client';
import dataMask from 'src/components/mascaras/datas';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import SvgIcon from '@mui/material/SvgIcon';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FuzzySearch from 'fuzzy-search';
import api from 'src/components/services/api';
import { Oval } from 'react-loading-icons';
import Erros from 'src/utils/erros';
import corIgreja from 'src/utils/coresIgreja';
import Autocomplete from '@mui/material/Autocomplete';
import '@fontsource/rubik';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: corIgreja.principal,
    '&:hover': {
      backgroundColor: corIgreja.principal,
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },

  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: '90%',
    height: '40px',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {},
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
function Cadastro({ rolMembros }) {
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();

  //= ==========================================================================
  //= = DADOS DO email
  //= =========================================================================

  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const nomeRef = useRef();
  const [nome, setNome] = React.useState('');
  const [inputValor, setInputValor] = React.useState('');
  const [usuarioMembro, setUsuarioMembro] = React.useState('');
  const [validacaoNascimento, setValidacaoNascimento] =
    React.useState('testar');
  const nascimentoRef = useRef();
  const [nascimento, setNascimento] = React.useState('');
  const [carregar, setCarregar] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);

  //= =========================================================================

  const handleValidacaoClose = () => {
    if (validacaoNome !== 'testar' && validacaoNome !== true) {
      setValidacaoNome('testar');
      nomeRef.current.focus();
    }
  };
  const listaNomes = rolMembros.map((nomes) => nomes.Nome);

  // const [, setListaNomlistaNomee] = React.useState(listaParcial);

  //= ========================================================================

  const cadastrarEmailMembro = () => {
    if (usuarioMembro.length > 0) {
      setCarregar(true);

      api
        .post(`/api/igrejas/cadastrarEmailMembro`, {
          Email: session ? session.user.email : '',
          RolMembro: usuarioMembro[0].RolMembro,
        })

        .then((response) => {
          if (response) {
            router.push(
              {
                pathname: '/',
              },
              '/',
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setCarregar(false);
          setOpenErro(true);
          return 0;
          //  updateFile(uploadedFile.id, { error: true });
        });
    }
    return true;
  };

  const handleCheckDadosMembro = () => {
    if (nome !== '') {
      const regName =
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(nome);

      if (!vaiNome) {
        setValidacaoNome('Digite um Sobrenome');
      } else {
        //= para procurar os dados  ==========================================

        const searcher = new FuzzySearch(rolMembros, ['Nome'], {
          caseSensitive: false,
        });

        const checarNome = searcher.search(nome);
        let valNasc = 'testar';

        if (checarNome.length === 1) {
          setValidacaoNome(true);

          const newDNascimento = moment(
            checarNome[0].Nascimento.substring(0, 10),
          ).format('DD/MM/YYYY');

          if (String(newDNascimento) === String(nascimento)) {
            setValidacaoNascimento(true);
            valNasc = true;
          } else {
            valNasc = false;
            setValidacaoNascimento(false);
          }
          setValidacaoNascimento(valNasc);
          if (valNasc) {
            setUsuarioMembro(checarNome);
            cadastrarEmailMembro();
            // verificar se é da liderança
          } else setValidacaoNascimento(false);
        } else setValidacaoNome('Procure a Secretaria da Igreja');
      }
    } else {
      setValidacaoNome('Digite um Nome');
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;

      if (form === 'Nascimento') handleCheckDadosMembro();
    }
  };

  const handleCancelar = () => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <Box
      height="100vh"
      width="100%"
      minWidth={300}
      minHeight={570}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="corIgreja.principal"
    >
      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="90%"
        minWidth={280}
        maxWidth={500}
        borderRadius={16}
        height="auto"
        bgcolor="#fafafa"
      >
        <Box
          mt={3}
          mb={3}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          minWidth={300}
        >
          <Box
            color="#000"
            style={{ fontSize: '22px', fontFamily: 'arial black' }}
          >
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                color="#000"
                style={{ fontSize: '18px', fontFamily: 'arial black' }}
              >
                ATENÇÃO!!!
              </Box>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                mt={1}
                color="#000"
                style={{ fontSize: '16px', fontFamily: 'arial' }}
              >
                o email:
                <strong style={{ color: '' }}>
                  {' '}
                  {session && session.user.email}
                </strong>{' '}
              </Box>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                color="red"
                style={{ fontSize: '16px', fontFamily: 'arial black' }}
              >
                Não foi cadastrado
              </Box>
            </Grid>

            <Grid container direction="column">
              <Grid item container direction="column" xs={12}>
                <Box
                  mt={3}
                  textAlign="center"
                  color="#000"
                  style={{ fontSize: '16px', fontFamily: 'arial black' }}
                  width="100%"
                  minWidth={300}
                >
                  FAZER CADASTRO
                </Box>
                <Box
                  mt={-2}
                  width="100%"
                  minWidth={250}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    border={1}
                    borderColor={
                      validacaoNome === true || validacaoNome === 'testar'
                        ? 'green'
                        : 'red'
                    }
                    mt={2}
                    mr={0}
                    display="flex"
                    flexDirection="row"
                    bgcolor="#fafafa"
                    borderRadius="16px"
                    height={120}
                    width="90%"
                  >
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={2}
                        mb={1}
                        ml={3}
                        sx={{ fontSize: 'bold', color: '#000' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Nome
                        </Typography>
                      </Box>
                      <Box mt={0} textAlign="center">
                        <Box width="92%" ml={2}>
                          <Autocomplete
                            sx={{
                              width: '100%',
                              textAlign: 'center',
                            }}
                            id="Nome"
                            freeSolo
                            value={nome}
                            onChange={(_, newValue) => {
                              setValidacaoNome('testar');
                              if (inputValor && newValue) setNome(newValue);
                              else setNome('');
                            }}
                            onBlur={() => {
                              if (inputValor.length > 0) {
                                setNome(inputValor);
                                setValidacaoNome('testar');
                              }
                            }}
                            selectOnFocus
                            inputValue={inputValor}
                            onInputChange={(_, newInputValue) => {
                              if (newInputValue !== '')
                                setInputValor(newInputValue.toUpperCase());
                              else setInputValor('');
                            }}
                            options={listaNomes}
                            renderInput={(params) => (
                              <TextField
                                autoComplete="off"
                                className={classes.textField}
                                {...params}
                                inputRef={nomeRef}
                                onKeyDown={handleEnter}
                                placeholder="Digite seu Nome"
                              />
                            )}
                          />
                        </Box>
                      </Box>
                      {validacaoNome !== true && validacaoNome !== 'testar' && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'red' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box
                            mt={0.5}
                            ml={2}
                            color="red"
                            style={{ fontSize: '12px' }}
                          >
                            {validacaoNome}
                          </Box>
                        </Box>
                      )}
                      {validacaoNome === true && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'green' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box
                            mt={0.5}
                            ml={2}
                            color="green"
                            style={{ fontSize: '12px' }}
                          >
                            Nome Encontrado
                          </Box>
                        </Box>
                      )}
                      {carregar && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <Box
                            mt={0.5}
                            ml={0}
                            color="blue"
                            style={{ fontSize: '12px' }}
                          >
                            Cadastrando...
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  mt={-1}
                  width="100%"
                  minWidth={300}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    border={1}
                    borderColor={validacaoNascimento ? 'green' : 'red'}
                    mt={2}
                    mr={0}
                    display="flex"
                    flexDirection="row"
                    bgcolor="#fafafa"
                    borderRadius="16px"
                    height={120}
                    width="90%"
                  >
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={2}
                        mb={1}
                        ml={3}
                        sx={{ fontSize: 'bold', color: '#000' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Data de Nascimento
                        </Typography>
                      </Box>
                      <Box mt={0} textAlign="center">
                        <Box>
                          <TextField
                            autoComplete="off"
                            className={classes.tf_s}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nascimento"
                            // label="Matricula"
                            type="tel"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(nascimento)}
                            variant="standard"
                            placeholder="dd/mm/aaaa"
                            onChange={(e) => {
                              if (e.target.value.length <= 10) {
                                setNascimento(e.target.value);
                                handleValidacaoClose();
                              }
                            }}
                            onFocus={(e) => {
                              setNascimento(e.target.value);
                            }}
                            onBlur={handleCheckDadosMembro}
                            onKeyDown={handleEnter}
                            inputRef={nascimentoRef}
                          />
                        </Box>
                      </Box>
                      {!validacaoNascimento && (
                        <Box display="flex" ml={5} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'red' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box
                            mt={0.3}
                            ml={2}
                            color="red"
                            style={{ fontSize: '12px' }}
                          >
                            Data não Confere com o Nome
                          </Box>
                        </Box>
                      )}
                      {carregar && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <Box
                            mt={0.3}
                            ml={0}
                            color="blue"
                            style={{ fontSize: '12px' }}
                          >
                            <Box>Cadastrando o Email </Box>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    className={classes.button2}
                    variant="contained"
                    id="reload"
                    onClick={handleCheckDadosMembro}
                  >
                    <Box>
                      {!carregar ? (
                        <Box>CADASTRAR</Box>
                      ) : (
                        <Box display="flex">
                          <Oval width={120} height={25} />{' '}
                        </Box>
                      )}
                    </Box>
                  </Button>
                  <Box ml={2} />
                  <Button
                    className={classes.button1}
                    variant="contained"
                    id="reload"
                    onClick={handleCancelar}
                  >
                    CANCELAR
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Cadastro;
