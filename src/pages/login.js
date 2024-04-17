import { Alert, Button, Grid, TextField, Typography, Box } from '@mui/material';
import {
  signIn,
  providers,
  getSession,
  csrfToken,
  useSession,
} from 'next-auth/client';
import validator from 'validator';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@mui/material/IconButton';
import corIgreja from 'src/utils/coresIgreja';
import { IoIosPerson } from 'react-icons/io';
import cpfMask from 'src/components/mascaras/cpf';
import { FcGoogle } from 'react-icons/fc';
import ValidaCPF from 'src/utils/validarCPF';
import prisma from 'src/lib/prisma';
import Espera from 'src/utils/espera';
import { Oval } from 'react-loading-icons';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import dataMask from 'src/components/mascaras/datas';
import moment from 'moment';
import api from 'src/components/services/api';
import Erros from 'src/utils/erros';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function Login({ providers2, rolMembros }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [valSenha, setValSenha] = useState(false);
  const [valorCPF, setValorCPF] = useState(false);
  const [validarNascimento, setValidarNascimento] = useState(true);
  const [session] = useSession();
  const [loading, setLoading] = React.useState(0);
  const [openPlan, setOpenPlan] = React.useState(false);
  const [openPlan2, setOpenPlan2] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [authState, setAuthState] = useState({
    cpf: '',
    password: '',
  });
  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });

  const handleFieldChange = (e) => {
    const valorCPF2 = e.target.value.slice(0, 14);
    setAuthState((old) => ({ ...old, [e.target.id]: valorCPF2 }));
    setPageState((old) => ({ ...old, processing: true, error: '' }));
  };

  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: 'Senha inválida',
    };
    return errorMap[error] ?? 'ocorreu um erro';
  };
  React.useEffect(() => {
    if (session) {
      if (validator.isEmail(session.user.email))
        router.push({
          pathname: '/selectPerfil',
        });
      else {
        router.push({
          pathname: '/selectPerfilCPF',
          query: { cpf: authState.cpf },
        });
      }
    }
  }, [session]);
  const handleAuth = async (providers22) => {
    if (providers22 === 'google') {
      signIn('google', {
        ...authState,
      });
    }
    if (providers22 === 'credentials') {
      let vCPF = ValidaCPF(authState.cpf.replace(/\D/g, ''));
      if (authState.cpf.replace(/\D/g, '').length < 10) vCPF = false;

      if (authState.password.length < 3) {
        setAuthState((old) => ({ ...old, password: '' }));
        setValSenha(true);
      }
      if (!vCPF) {
        setAuthState((old) => ({ ...old, cpf: '' }));
        setValorCPF(true);
      }
      if (vCPF && authState.password.length > 3) {
        try {
          const user = rolMembros?.filter((val) => {
            if (val.CPF) {
              return (
                String(val.CPF.replace(/\D/g, '')) ===
                String(authState.cpf.replace(/\D/g, ''))
              );
            }
            return 0;
          });
          if (user && user.length) {
            setPageState((old) => ({ ...old, processing: true, error: '' }));
            signIn('credentials', {
              ...authState,
              redirect: false,
            })
              .then((response) => {
                if (response.ok && response.erro === null) {
                  // Authenticate user

                  router.push({
                    pathname: '/selectPerfilCPF',
                    query: { cpf: authState.cpf },
                  });
                } else {
                  setLoading(0);
                  setPageState((old) => ({
                    ...old,
                    processing: false,
                    error: response.error,
                  }));
                }
              })
              .catch((error) => {
                router.push({
                  pathname: '/selectPerfilCPF',
                  query: { cpf: authState.cpf },
                });
                setPageState((old) => ({
                  ...old,
                  processing: false,
                  error: error.message ?? 'Algo deu Errado!',
                }));
              });
          } else {
            router.push({
              pathname: '/cadastro',
              query: { cpf: authState.cpf },
            });
          } // ola
        } catch (error) {
          setLoading(0);
          if (error.response) {
            const { message } = error.response.data;
            throw new Error(message);
          } else console.log(error);
        }
      } else {
        setLoading(0);
      }
    }
    return 0;
  };

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResetarSenha = async () => {
    let vCPF = ValidaCPF(authState.cpf.replace(/\D/g, ''));

    if (authState.cpf.replace(/\D/g, '').length < 10) vCPF = false;

    if (!vCPF) {
      setValorCPF(true);
    }
    if (vCPF) {
      const user = rolMembros.filter(
        (val) =>
          val.CPF.replace(/\D/g, '') === authState.cpf.replace(/\D/g, ''),
      );

      if (user && user.length) {
        // encontrar a data

        const getData = moment(user[0].Nascimento.substring(0, 10)).format(
          'DD/MM/YYYY',
        );

        if (dataNascimento.length === 10)
          if (getData === dataNascimento) {
            setLoading(1);
            api
              .post(`/api/igrejas/updateSenha`, {
                senha: dataNascimento.replace(/\D/g, ''),
                RolMembro: user[0].RolMembro,
              })

              .then((response) => {
                if (response) {
                  setOpenPlan2(true);
                  setLoading(0);
                  setDataNascimento('');
                }
              })
              .catch((error) => {
                console.log(error);
                setLoading(0);
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
        else setValidarNascimento(false);
      }
    } else setLoading(0);
  };

  return (
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
      <Box height="100%">
        {session === null ? (
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
                    height="15%"
                    width="100%"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    <IoIosPerson size={60} color="white" />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="85%"
                  >
                    <Box
                      mt="2vh"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      height="60%"
                      width="100%"
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          {pageState.error !== '' && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                              {simplifyError(pageState.error)}
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
                                CPF
                              </Typography>
                            </Box>
                            <TextField
                              autoComplete="off"
                              sx={{ mb: 1 }}
                              onChange={(e) => {
                                handleFieldChange(e);
                                setValorCPF(false);
                              }}
                              onBlur={(e) => {
                                handleFieldChange(e);
                                setValorCPF(false);
                              }}
                              value={cpfMask(authState.cpf)}
                              fullWidth
                              variant="outlined"
                              type="tel"
                              placeholder="Digite o CPF"
                              id="cpf"
                              InputProps={{
                                style: {
                                  color: !valorCPF ? 'black' : 'red',
                                  background: '#f0f0f0',
                                },
                              }}
                            />
                            <Box color="white" mb={-1} mt={1} ml={1}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{ fontSize: '14px' }}
                              >
                                Senha
                              </Typography>
                            </Box>
                            <TextField
                              autoComplete="off"
                              sx={{ mb: 1 }}
                              onChange={(e) => {
                                handleFieldChange(e);
                                setValSenha(false);
                              }}
                              value={authState.password}
                              placeholder={!valSenha ? '' : 'informe a senha'}
                              fullWidth
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              InputProps={{
                                style: {
                                  color: !valSenha ? 'black' : 'red',
                                  background: '#f0f0f0',
                                },
                                endAdornment: authState.password ? (
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
                        </Grid>
                      </Grid>
                      <Box
                        onClick={() => {
                          setOpenPlan(true);
                        }}
                        display="flex"
                        color="white"
                        mb={1}
                        mt={0}
                        ml={3}
                      >
                        Esqueci a Senha
                      </Box>
                      <Box width="100%" mt={2}>
                        {Object.values(providers2).map((provider, index) => (
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            key={provider.name}
                          >
                            <Box width="90%">
                              {index > 0 ? (
                                <Box
                                  height={40}
                                  fontFamily="Fugaz One"
                                  width="100%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  color="white"
                                >
                                  OU
                                </Box>
                              ) : (
                                ''
                              )}
                              <Button
                                style={{
                                  width: '100%',
                                  backgroundColor:
                                    provider.id === 'google'
                                      ? 'indigo'
                                      : corIgreja.tercenaria,
                                  fontSize: '16px',
                                  height: 40,
                                  color: 'white',
                                  fontFamily: 'Fugaz One',
                                }}
                                onClick={() => {
                                  if (provider.id === 'google') setLoading(2);
                                  else setLoading(1);
                                  handleAuth(provider.id);
                                }}
                              >
                                {provider.name === 'Credentials' ? (
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
                                      'Entrar com CPF'
                                    )}
                                  </Box>
                                ) : (
                                  <Box>
                                    {provider.id === 'google' && (
                                      <Box>
                                        {loading === 2 ? (
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Oval
                                              stroke="white"
                                              width={30}
                                              height={30}
                                            />
                                          </Box>
                                        ) : (
                                          <Box
                                            ml={2}
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Box mr={2}>
                                              {' '}
                                              Entrar com {provider.name}{' '}
                                            </Box>
                                            <FcGoogle size={30} />
                                          </Box>
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                )}{' '}
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Espera descricao="Buscando Perfil" />
        )}
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
            {openErro && (
              <Erros
                descricao="banco"
                setOpenErro={(openErros) => setOpenErro(openErros)}
              />
            )}

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
                    height="15%"
                    width="100%"
                    display="flex"
                    fontFamily="Fugaz One"
                    fontSize="20px"
                    color={corIgreja.secundaria}
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    REINICIAR SUA SENHA
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="85%"
                  >
                    <Box
                      mt="2vh"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      height="60%"
                      width="100%"
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
                                CPF
                              </Typography>
                            </Box>
                            <TextField
                              autoComplete="off"
                              sx={{ mb: 1 }}
                              onChange={(e) => {
                                handleFieldChange(e);
                                setValorCPF(false);
                              }}
                              value={cpfMask(authState.cpf)}
                              fullWidth
                              variant="outlined"
                              type="tel"
                              placeholder="Digite o CPF"
                              id="cpf"
                              InputProps={{
                                style: {
                                  color: !valorCPF ? 'black' : 'red',
                                  background: '#f0f0f0',
                                },
                              }}
                            />
                            <Box color="white" mb={-1} mt={1} ml={1}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{ fontSize: '14px' }}
                              >
                                Data de Nascimento
                              </Typography>
                            </Box>
                            <TextField
                              autoComplete="off"
                              id="DataNascimento"
                              fullWidth
                              variant="outlined"
                              type="tel"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                style: {
                                  color: !validarNascimento ? 'red' : 'black',
                                  background: '#f0f0f0',
                                  height: 40,
                                  // textAlign: 'center',
                                },
                              }}
                              value={dataMask(dataNascimento)}
                              placeholder="dd/mm/aaaa"
                              size="small"
                              onChange={(e) => {
                                setDataNascimento(e.target.value);
                                setPageState((old) => ({
                                  ...old,
                                  processing: true,
                                  error: '',
                                }));
                                setValidarNascimento(true);
                              }}
                              onFocus={(e) => setDataNascimento(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Grid>

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
                              backgroundColor: corIgreja.button1,
                              fontSize: '16px',
                              height: 40,
                              color: 'white',
                              fontFamily: 'Fugaz One',
                            }}
                            onClick={() => {
                              handleResetarSenha();
                            }}
                          >
                            <Box>
                              {loading === 1 ? (
                                <Box display="flex" alignItems="center">
                                  <Oval stroke="white" width={30} height={30} />
                                </Box>
                              ) : (
                                'Reiniciar Senha'
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
                    SENHA REINICIADA COM SUCESSO
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
                    VOLTOU PARA A SENHA INICIAL
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
                                  <Oval stroke="white" width={30} height={30} />
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
}

export async function getStaticProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const rolMembros = await prisma.membros
    .findMany({
      where: {
        Situacao: 'ATIVO',
      },
      orderBy: [
        {
          Nome: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  const csrfTokens = await csrfToken(context);
  return {
    props: {
      providers2: await providers(context),
      csrfTokens: JSON.parse(JSON.stringify(csrfTokens)),
      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    },
    revalidate: 5,
  };
}
