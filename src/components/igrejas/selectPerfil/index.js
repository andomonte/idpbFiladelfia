import React from 'react';
import { useSession } from 'next-auth/client';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField } from '@material-ui/core';
import Cadastro from 'src/components/igrejas/cadastro';

import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import { Pagina } from 'src/components/igrejas/normal';
import Espera from 'src/utils/espera';
import corIgreja from 'src/utils/coresIgreja';
import '@fontsource/rubik';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

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
function SelectPerfil({
  lideranca,
  distritos,
  rolMembros,
  celulas,
  userIgrejas,
}) {
  const classes = useStyles();

  const [session] = useSession();

  let ministroEncontrado = '';
  if (session)
    ministroEncontrado = rolMembros.filter(
      (val) => val.Email === session.user.email,
    );

  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(true);
  const [openEspera, setOpenEspera] = React.useState(true);
  const [contagem, setContagem] = React.useState(false);
  const [perfilUser, setPerfilUser] = React.useState('');
  const [perfilSelect] = React.useState('0');
  const [listaMembros, setListaMinistros] = React.useState(ministroEncontrado);
  const router = useRouter();

  let secao = [{ email: '' }];
  const url = `/api/consultaMembros`;
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
  React.useEffect(() => {
    if (data && session) {
      const ministroEncontrado2 = data.filter(
        (val) => val.Email === session.user.email,
      );

      if (ministroEncontrado2.length) {
        setListaMinistros(ministroEncontrado2);
        setStart(true);
      } else {
        setStart(false);
        setOpenEspera(false);
      }
    }

    if (error) return <div>An error occured.</div>;
    if (!data || !perfilUser)
      return <Espera descricao="Verificando sua Presença" />;
    return 0;
  }, [data, perfilUser]);

  React.useEffect(() => {
    if (
      userIgrejas.length &&
      lideranca.length &&
      data.length &&
      celulas.length
    ) {
      setOpenEspera(false);
    }
    return 0;
  }, [userIgrejas, lideranca, data, celulas]);

  if (openEspera) return <Espera descricao="Buscando Seu Perfil" />;

  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');
  let valorPerfil = {};
  let userMembro = {};

  if (session && listaMembros.length) {
    const membros = listaMembros.filter(
      (val) => val.Email === session.user.email,
    );

    if (membros.length) {
      const newDistrito = distritos.filter(
        (val) => Number(val.Distrito) === Number(membros[0].Distrito),
      );

      if (lideranca.length) {
        secao = lideranca.filter(
          (val) => val.RolMembro === listaMembros[0].RolMembro,
        );
        if (secao)
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
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
                foto: membros[0].foto,
                login: 'google',
                nomeDistrito: newDistrito[0].Distrito_Nome,
              };

            return 0;
          });
      }
      const membro = listaMembros.filter(
        (val) => val.Email === session.user.email,
      );

      if (membro.length > 0) {
        userMembro = {
          Funcao: `Membro`,
          Descricao: `Membro (Célula ${membro[0].Celula})`,
          id: secao.length + 1,
          numero: membro[0].Celula,
          Celula: membro[0].Celula,
          Coordenacao: membro[0].Coordenacao,
          Distrito: membro[0].Distrito,
          Email: membro[0].Email,
          Igreja: membro[0].Igreja,
          Nascimento: membro[0].Nascimento,
          Nome: membro[0].Nome,
          RolMembro: membro[0].RolMembro,
          Supervisao: membro[0].Supervisao,
          foto: membros[0].foto,
          login: 'google',
          nomeDistrito: newDistrito[0].Distrito_Nome,
        };
        //
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
                  <img src={corIgreja.logo} alt="logo" width={200} />
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

        return (
          <Box>
            {open && start ? (
              <Box minHeight={500}>{body}</Box>
            ) : (
              <Espera descricao="Atualizando Seu Perfil" />
            )}{' '}
          </Box>
        );
      }
    }
  }
  return (
    <Box display="flex" align="center" justifyContent="center">
      {!start ? (
        <Cadastro
          title="APP-IDPB"
          lideranca={lideranca}
          rolMembros={rolMembros}
        />
      ) : (
        <Box>
          <Pagina
            lideranca={lideranca}
            rolMembros={listaMembros}
            userIgrejas={dadosUser}
            celulas={celulas}
            perfilUser={perfilUser[0]}
            title="APP-IDPB"
          />
        </Box>
      )}
    </Box>
  );
}

export default SelectPerfil;
