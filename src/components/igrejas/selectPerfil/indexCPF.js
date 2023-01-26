import React from 'react';
import { useSession } from 'next-auth/client';
import api from 'src/components/services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Erros from 'src/utils/erros';
import Cadastro from 'src/components/igrejas/cadastro';
import { Oval } from 'react-loading-icons';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import { Pagina } from 'src/components/igrejas/normal';
import Espera from 'src/utils/espera';
import corIgreja from 'src/utils/coresIgreja';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import '@fontsource/rubik';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tamanhoDonw600: {
    [theme.breakpoints.between('xl', 'lg')]: {
      maxWidth: 500,
    },
    [theme.breakpoints.between('md', 'sm')]: {
      maxWidth: 600,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 300,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    width: '50%',
    height: '30%',
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
function SelectPerfil({ lideranca, rolMembros, celulas, userIgrejas }) {
  const classes = useStyles();

  const [session] = useSession();
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(true);
  const [rolMembro, setRolMembro] = React.useState(true);
  const [openEspera, setOpenEspera] = React.useState(true);
  const [contagem, setContagem] = React.useState(false);
  const [perfilUser, setPerfilUser] = React.useState('');
  const [perfilSelect] = React.useState('0');
  const [openPlan, setOpenPlan] = React.useState(false);
  const [openPlan2, setOpenPlan2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [senha, setSenha] = React.useState('');
  const [senha2, setSenha2] = React.useState('');
  const [valSenha, setValSenha] = React.useState(false);
  const [valSenha2, setValSenha2] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const [pageState, setPageState] = React.useState({
    error: '',
    processing: false,
  });
  let secao = [{ email: '' }];
  const router = useRouter();

  React.useEffect(() => {
    if (
      userIgrejas.length &&
      lideranca.length &&
      rolMembros.length &&
      celulas.length
    ) {
      setOpenEspera(false);
    }
    return 0;
  }, [userIgrejas, lideranca, rolMembros, celulas]);
  React.useEffect(() => {
    if (session) {
      const membro = rolMembros.filter(
        (val) =>
          val.CPF.replace(/\D/g, '') ===
            session.user.email.replace(/\D/g, '') ||
          val.Email === session.user.email,
      );
      if (membro) setRolMembro(membro[0].RolMembro);
    }
  }, [session]);

  if (openEspera) return <Espera descricao="Buscando Seu Perfil" />;

  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');
  let valorPerfil = {};
  let userMembro = {};
  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleTrocarSenha = () => {
    if (senha.length < 3) setValSenha(true);
    if (senha2.length < 3) setValSenha2(true);

    if (senha.length > 2 && senha2.length > 2) {
      if (senha === senha2 && rolMembro) {
        setLoading(true);
        api
          .post(`/api/igrejas/updateSenha`, {
            senha,
            RolMembro: Number(rolMembro),
          })

          .then((response) => {
            if (response) {
              setOpenPlan2(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            setOpenErro(true);
            return 0;
            //  updateFile(uploadedFile.id, { error: true });
          });
      } else
        setPageState((old) => ({
          ...old,
          processing: false,
          error: 'a data não confere!',
        }));
    }
  };

  if (session) {
    const membro = rolMembros.filter(
      (val) =>
        val.CPF.replace(/\D/g, '') === session.user.email.replace(/\D/g, ''),
    );
    if (membro.length) {
      if (lideranca.length) {
        secao = lideranca.filter(
          (val) => val.RolMembro === membro[0].RolMembro,
        );

        valorPerfil = secao.map((items, index) => {
          if (items.Funcao === 'Secretaria')
            return {
              Funcao: items.Funcao,
              Descricao: `Secretaria da Igreja`,
              id: index + 1,
              numero: items.Distrito,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };
          if (items.Funcao === 'Presidente')
            return {
              Funcao: items.Funcao,
              Descricao: `Pastor Presidente`,
              id: index + 1,
              numero: items.Igreja,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };
          if (items.Funcao === 'PastorDistrito')
            return {
              Funcao: items.Funcao,
              Descricao: `Pastor (Distrito ${items.Distrito})`,
              id: index + 1,
              numero: items.Distrito,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };

          if (items.Funcao === 'Coordenador')
            return {
              Funcao: items.Funcao,
              Descricao: `Coordenador (Coordenação ${items.Coordenacao})`,
              id: index + 1,
              numero: items.Coordenacao,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };
          if (items.Funcao === 'Supervisor')
            return {
              Funcao: items.Funcao,
              Descricao: `Supervisor (Supervisao ${items.Supervisao})`,
              id: index + 1,
              numero: items.Supervisao,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };

          if (items.Funcao === 'Lider')
            return {
              Funcao: items.Funcao,
              Descricao: `Líder (Celula ${items.Celula})`,
              id: index + 1,
              numero: items.Celula,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              Supervisao: items.Supervisao,
              foto: items.foto,
              login: 'credencial',
            };

          return 0;
        });
      }

      if (membro.length > 0) {
        userMembro = {
          Celula: membro[0].Celula,
          Coordenacao: membro[0].Coordenacao,
          Descricao: `Membro (Célula ${membro[0].Celula})`,
          Distrito: membro[0].Distrito,
          Email: membro[0].Email,
          Funcao: `Membro`,
          Igreja: membro[0].Igreja,
          Nascimento: membro[0].Nascimento,
          Nome: membro[0].Nome,
          RolMembro: membro[0].RolMembro,
          id: secao.length + 1,
          Supervisao: membro[0].Supervisao,
          numero: membro[0].Celula,
          login: 'credencial',
        };
      }
      valorPerfil.push(userMembro); // para objeto -> Object.assign(secao, userMembro);
      // expected output: Object { a: 1, b: 4, c: 5 }

      // expected output: Object { a: 1, b: 4, c: 5 }

      const handleChange = (event) => {
        setContagem(true);
        const indexPerfil = Number(event.target.value - 1);
        setPerfilUser(() => [valorPerfil[indexPerfil]]);
      };
      if (Object.keys(userMembro).length === 0 && start) setStart(false);

      const body = (
        <Box width="100vw">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            minHeight={570}
            bgcolor={corIgreja.principal2}
          >
            <Box
              height="94vh"
              width="92%"
              minWidth={300}
              minHeight={570}
              borderRadius={16}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
            >
              <Box width="100%">
                <Box textAlign="center" mt={-3} mb={5}>
                  <img src={corIgreja.logo} alt="Logo" width={200} />
                </Box>
                <Box
                  fontFamily="Rubik"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    width="90%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minWidth={280}
                    borderRadius={16}
                    height="auto"
                    bgcolor="#fafafa"
                  >
                    <Box>
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
                          style={{ fontSize: '22px', fontFamily: 'Rubik' }}
                        >
                          <Grid item container direction="column" xs={12}>
                            <Box
                              textAlign="center"
                              color="#000"
                              style={{
                                fontSize: '18px',
                                fontFamily: 'Rubik',
                                fontWeight: 'bold',
                              }}
                            >
                              VOCÊ TEM {valorPerfil.length} PERFIS
                            </Box>
                          </Grid>
                          <Grid item container direction="column" xs={12}>
                            <Box
                              textAlign="center"
                              mt={1}
                              color="#000"
                              style={{ fontSize: '16px', fontFamily: 'Rubik' }}
                            >
                              Escolha qual deseja acessar
                            </Box>
                          </Grid>
                        </Box>
                        <Box mt={5} mb={3} width="100%" textAlign="center">
                          <Grid item xs={12} md={12}>
                            {valorPerfil && valorPerfil[0].id && (
                              <Box>
                                <TextField
                                  autoComplete="off"
                                  value={perfilSelect}
                                  select
                                  onChange={handleChange}
                                  variant="outlined"
                                  placeholder="Escolha seu Perfil"
                                  className={classes.tf_s}
                                  style={{
                                    textAlign: 'start',
                                    WebkitBoxShadow:
                                      '0 0 0 1000px #fafafa  inset',
                                  }}
                                >
                                  <MenuItem value={perfilSelect}>
                                    <em>Escolha seu Perfil</em>
                                  </MenuItem>

                                  {valorPerfil?.map((items) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.Descricao ?? items.Descricao}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Box>
                            )}
                          </Grid>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mb={1}
                          mt={0}
                        >
                          <Box width="90%" mb={1} mt={0}>
                            <Button
                              style={{
                                width: '100%',
                                fontSize: '16px',
                                height: 40,
                                marginTop: 10,
                                color: 'black',
                                fontFamily: 'Fugaz One',
                              }}
                              variant="outlined"
                              onClick={() => {
                                setOpenPlan(true);
                              }}
                            >
                              Trocar Senha
                            </Button>
                          </Box>
                        </Box>
                        {contagem && (
                          <Espera descricao="Atualizando Seu Perfil" />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="100vh"
              minHeight={570}
              minWidth={300}
              bgcolor={corIgreja.principal}
            >
              {openErro && (
                <Erros
                  descricao="banco"
                  setOpenErro={(openErros) => setOpenErro(openErros)}
                />
              )}
              <Box height="100%">
                <Box
                  height="10%"
                  minHeight={80}
                  width="100vw"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxWidth={400}
                >
                  <img src={corIgreja.logo} alt="" width="35%" height="40%" />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxWidth={400}
                  minHeight={480}
                  height="85vh"
                  width="100%"
                >
                  <Box
                    borderRadius={6}
                    height="100%"
                    width="90%"
                    bgcolor={corIgreja.principal2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box width="100%">
                      <Box
                        width="100%"
                        display="flex"
                        fontFamily="Fugaz One"
                        fontSize="16px"
                        color={corIgreja.secundaria}
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item>
                            {pageState.error !== '' && (
                              <Alert severity="error" sx={{ mb: 2 }}>
                                {pageState.error}
                              </Alert>
                            )}
                            <Box width="80vw" maxWidth={320}>
                              <Box color="white" mb={-1} ml={1}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{ fontSize: '14px' }}
                                >
                                  NOVA SENHA
                                </Typography>
                              </Box>
                              <Box
                                bgcolor="#f0f0f0"
                                height={40}
                                borderRadius={5}
                                width="100%"
                                display="flex"
                                color="blue"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="90%"
                                >
                                  <TextField
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSenha(e.target.value);
                                      setValSenha(false);
                                      setPageState((old) => ({
                                        ...old,
                                        processing: true,
                                        error: '',
                                      }));
                                    }}
                                    value={senha}
                                    placeholder={
                                      !valSenha ? '' : 'informe a nova senha'
                                    }
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    InputProps={{
                                      style: {
                                        color: !valSenha ? 'black' : 'red',
                                        background: '#f0f0f0',
                                        width: '100%',

                                        height: 40,
                                        borderRadius: 5,
                                      },
                                      endAdornment: senha ? (
                                        <InputAdornment position="end">
                                          <IconButton onClick={handleClick}>
                                            {showPassword ? (
                                              <MdVisibility />
                                            ) : (
                                              <MdVisibilityOff />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ) : null,
                                    }}
                                  />
                                </Box>
                              </Box>
                              <Box color="white" mt={3} mb={-1} ml={1}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{ fontSize: '14px' }}
                                >
                                  CONFIRME A SENHA
                                </Typography>
                              </Box>
                              <Box
                                bgcolor="#f0f0f0"
                                height={40}
                                borderRadius={5}
                                width="100%"
                                display="flex"
                                color="blue"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="90%"
                                >
                                  <TextField
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSenha2(e.target.value);
                                      setValSenha2(false);
                                      setPageState((old) => ({
                                        ...old,
                                        processing: true,
                                        error: '',
                                      }));
                                    }}
                                    value={senha2}
                                    placeholder={
                                      !valSenha2 ? '' : 'informe a nova senha'
                                    }
                                    fullWidth
                                    type={showPassword2 ? 'text' : 'password'}
                                    id="password"
                                    InputProps={{
                                      style: {
                                        color: !valSenha2 ? 'black' : 'red',
                                        background: '#f0f0f0',
                                        width: '100%',

                                        height: 40,
                                        borderRadius: 5,
                                      },
                                      endAdornment: senha2 ? (
                                        <InputAdornment position="end">
                                          <IconButton onClick={handleClick2}>
                                            {showPassword2 ? (
                                              <MdVisibility />
                                            ) : (
                                              <MdVisibilityOff />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ) : null,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={5}
                      >
                        <Box width="90%">
                          <Button
                            style={{
                              width: '100%',
                              backgroundColor: corIgreja.button1,
                              fontSize: '16px',
                              height: 40,
                              color: 'white',
                              fontFamily: 'Fugaz One',
                            }}
                            onClick={() => {
                              handleTrocarSenha();
                            }}
                          >
                            <Box>
                              {loading ? (
                                <Box display="flex" alignItems="center">
                                  <Oval stroke="white" width={30} height={30} />
                                </Box>
                              ) : (
                                'Trocar a Senha'
                              )}
                            </Box>
                          </Button>
                          <Button
                            style={{
                              width: '100%',
                              backgroundColor: corIgreja.button2,
                              fontSize: '16px',
                              height: 40,
                              marginTop: 10,
                              color: 'white',
                              fontFamily: 'Fugaz One',
                            }}
                            onClick={() => {
                              setOpenPlan(false);
                            }}
                          >
                            <Box>
                              {loading === 2 ? (
                                <Box display="flex" alignItems="center">
                                  <Oval stroke="white" width={30} height={30} />
                                </Box>
                              ) : (
                                'CANCELAR'
                              )}
                            </Box>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Dialog>
          <Dialog fullScreen open={openPlan2} TransitionComponent={Transition}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="100vh"
              minHeight={570}
              minWidth={300}
              bgcolor={corIgreja.principal}
            >
              <Box height="100%" width="100%">
                <Box
                  height="10%"
                  minHeight={80}
                  width="100vw"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxWidth={400}
                >
                  <img src={corIgreja.logo} alt="" width="60%" height="60%" />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxWidth={400}
                  minHeight={480}
                  height="85vh"
                  width="100%"
                >
                  <Box
                    borderRadius={6}
                    height="100%"
                    width="90%"
                    bgcolor={corIgreja.principal2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box width="100%">
                      <Box
                        width="100%"
                        display="flex"
                        fontFamily="Fugaz One"
                        fontSize="16px"
                        color={corIgreja.secundaria}
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        TROCA DE SENHA REALIZADA
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        fontFamily="Fugaz One"
                        fontSize="16px"
                        color={corIgreja.secundaria}
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        COM SUCESSO!!!
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          mt="2vh"
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          height="60%"
                          width="100%"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                            mt={2}
                          >
                            <Box width="90%">
                              <Button
                                style={{
                                  width: '100%',
                                  backgroundColor: corIgreja.button2,
                                  fontSize: '16px',
                                  height: 40,
                                  marginTop: 10,
                                  color: 'white',
                                  fontFamily: 'Fugaz One',
                                }}
                                onClick={() => {
                                  setOpenPlan(false);
                                  setOpenPlan2(false);
                                }}
                              >
                                <Box>
                                  {loading === 1 ? (
                                    <Box display="flex" alignItems="center">
                                      <Oval
                                        stroke="white"
                                        width={30}
                                        height={30}
                                      />
                                    </Box>
                                  ) : (
                                    'Fechar'
                                  )}
                                </Box>
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>
      );

      if (start) {
        if (valorPerfil.length === 1 && perfilUser === '')
          setPerfilUser(valorPerfil);
        if (valorPerfil.length > 1 && !open && perfilUser === '') setOpen(true);

        if (perfilUser !== '') {
          router.push(
            {
              pathname: '/principal',
              query: perfilUser[0],
            },
            '/principal',
          );
        }
        return <Box>{open && start && <Box minHeight={500}>{body}</Box>} </Box>;
      }
    }
    return (
      <Box display="flex" align="center" justifyContent="center">
        {!start ? (
          <Cadastro
            title="IDPB-CELULAS"
            lideranca={lideranca}
            rolMembros={rolMembros}
          />
        ) : (
          <Box>
            <Pagina
              lideranca={lideranca}
              rolMembros={rolMembros}
              userIgrejas={dadosUser}
              celulas={celulas}
              perfilUser={perfilUser[0]}
              title="IDPB-CELULAS"
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" align="center" justifyContent="center">
      {!start ? (
        <Box>
          <Cadastro
            title="IDPB-CELULAS"
            lideranca={lideranca}
            rolMembros={rolMembros}
          />
        </Box>
      ) : (
        <Box>
          <Pagina
            lideranca={lideranca}
            rolMembros={rolMembros}
            userIgrejas={dadosUser}
            celulas={celulas}
            perfilUser={perfilUser[0]}
            title="IDPB-CELULAS"
          />
        </Box>
      )}
    </Box>
  );
}

export default SelectPerfil;
