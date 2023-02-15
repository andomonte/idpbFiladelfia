import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import { Oval } from 'react-loading-icons';
import {
  BsFillEmojiFrownFill,
  BsFillEmojiSmileFill,
  BsEmojiNeutralFill,
} from 'react-icons/bs';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  Ano,
  perfilUser,
  contSemana,
  numeroCelula,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);
  const [presCeleb, setPresCeleb] = React.useState([]);
  const [presDisc, setPresDisc] = React.useState([]);

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);
  const [mediaMesCelula, setMediaMesCelula] = React.useState([0, 0, 0, 0, 0]);
  const [mediaMesCelebracao, setMediaMesCelebracao] = React.useState([
    0, 0, 0, 0, 0,
  ]);
  const [mediaMesDiscipulado, setMediaMesDiscipulado] = React.useState([
    0, 0, 0, 0, 0,
  ]);
  const [mediaAtualCelula, setMediaAtualCelula] = React.useState([
    0, 0, 0, 0, 0,
  ]);
  const [mediaAtualCelebracao, setMediaAtualCelebracao] = React.useState([
    0, 0, 0, 0, 0,
  ]);
  const [mediaAtualDiscipulado, setMediaAtualDiscipulado] = React.useState([]);

  const url1 = `/api/consultaRelatorioCelulasAno/${contSemana2}/${Ano}`;
  const url2 = `/api/consultaRelatorioCelebracaoAno/${contSemana2}/${Ano}`;
  const url3 = `/api/consultaRelatorioDiscipuladoAno/${contSemana2}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  const { data: culto, errorCulto } = useSWR(url2, fetcher);
  const { data: discipular, errorDiscipular } = useSWR(url3, fetcher);

  React.useEffect(() => {
    setPresSem1([]);
    setPresCeleb([]);
    setPresDisc([]);
    setMediaMesCelula([[0, 0, 0, 0, 0]]);
    setMediaAtualCelula([[0, 0, 0, 0, 0]]);

    setMediaMesCelebracao([[0, 0, 0, 0, 0]]);
    setMediaAtualCelebracao([[0, 0, 0, 0, 0]]);

    setMediaMesDiscipulado([]);
    setMediaAtualDiscipulado([]);

    setContSemana2(contSemana);
  }, [contSemana]);

  React.useEffect(() => {
    setPresSem1([]);
    if (sem1) {
      // map para filtrar duas listas
      //= =========================================
      const listaTemp = [];
      if (sem1 && sem1[0]) {
        sem1.map((item) => {
          numeroCelula.map((row) => {
            if (
              Number(item.Celula) === Number(row) &&
              Number(item.Distrito) === Number(perfilUser.Distrito)
            ) {
              listaTemp.push(item);
              return item;
            }
            return 0;
          });
          return 0;
        });

        // soma adultos, criancas, visitantes e converções das 4 semanas
        const itens = [
          'Adultos',
          'Criancas',
          'Visitantes',
          'Conversoes',
          'Visitas',
        ];
        const listaMedia = [];
        for (let i = 0; i < itens.length; i += 1) {
          const somaAdultos = listaTemp
            .map((item) => {
              if (item[itens[i]] !== undefined) {
                return item[itens[i]];
              }
              return 0;
            })
            .reduce((prev, curr) => prev + curr, 0);

          const tAdultos = (Number(somaAdultos) / 4).toFixed(0);
          listaMedia[i] = tAdultos;
        }

        if (listaMedia.length) {
          listaMedia[5] =
            Number(listaMedia[0]) +
            Number(listaMedia[1]) +
            Number(listaMedia[2]) +
            Number(listaMedia[3]);

          setMediaMesCelula(listaMedia);
        }
        //= ==================================================================

        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = sem1.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              val.Semana === Number(contSemana2),
          );

          if (presCelula && presCelula[0]) {
            setPresSem1((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

  React.useEffect(() => {
    setPresCeleb([]);
    if (culto) {
      // map para filtrar duas listas
      //= =========================================
      const listaTemp = [];
      if (culto && culto[0]) {
        culto.map((item) => {
          numeroCelula.map((row) => {
            if (
              Number(item.Celula) === Number(row) &&
              Number(item.Distrito) === Number(perfilUser.Distrito)
            ) {
              listaTemp.push(item);
              return item;
            }
            return 0;
          });
          return 0;
        });

        // soma adultos, criancas, visitantes e converções das 4 semanas
        const itens = ['Adultos', 'Criancas', 'Visitantes', 'Conversoes'];
        const listaMedia = [];
        for (let i = 0; i < itens.length; i += 1) {
          const somaAdultos = listaTemp
            .map((item) => {
              if (item[itens[i]] !== undefined) {
                return item[itens[i]];
              }
              return 0;
            })
            .reduce((prev, curr) => prev + curr, 0);

          const tAdultos = (Number(somaAdultos) / 4).toFixed(0);
          listaMedia[i] = tAdultos;
        }

        if (listaMedia.length) {
          listaMedia[4] =
            Number(listaMedia[0]) +
            Number(listaMedia[1]) +
            Number(listaMedia[2]) +
            Number(listaMedia[3]);
          setMediaMesCelebracao(listaMedia);
        }
        //= ==================================================================

        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = culto.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              val.Semana === Number(contSemana2),
          );

          if (presCelula && presCelula[0]) {
            setPresCeleb((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresCeleb((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresCeleb((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorCulto) return <div>An error occured.</div>;

    if (!culto) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [culto]);

  React.useEffect(() => {
    setPresDisc([]);

    // map para filtrar duas listas
    //= =========================================
    const listaTemp = [];
    if (discipular) {
      if (discipular && discipular[0]) {
        discipular.map((item) => {
          numeroCelula.map((row) => {
            if (
              Number(item.Celula) === Number(row) &&
              Number(item.Distrito) === Number(perfilUser.Distrito)
            ) {
              listaTemp.push(item);
              return item;
            }
            return 0;
          });
          return 0;
        });

        // soma adultos, criancas, visitantes e converções das 4 semanas
        const itens = ['Adultos', 'Criancas', 'LeituraBiblica'];
        const listaMedia = [];
        for (let i = 0; i < itens.length; i += 1) {
          const somaAdultos = listaTemp
            .map((item) => {
              if (item[itens[i]] !== undefined) {
                return item[itens[i]];
              }
              return 0;
            })
            .reduce((prev, curr) => prev + curr, 0);

          const tAdultos = (Number(somaAdultos) / 4).toFixed(0);
          listaMedia[i] = tAdultos;
        }

        if (listaMedia.length) {
          listaMedia[3] = Number(listaMedia[0]) + Number(listaMedia[1]);
          setMediaMesDiscipulado(listaMedia);
        }
        //= ==================================================================
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = discipular.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              val.Semana === Number(contSemana2),
          );

          if (presCelula && presCelula[0]) {
            setPresDisc((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorDiscipular) return <div>An error occured.</div>;

    if (!discipular) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [discipular]);

  React.useEffect(() => {
    if (presSem1.length) {
      // soma adultos, criancas, visitantes e converções das 4 semanas
      const itens = [
        'Adultos',
        'Criancas',
        'Visitantes',
        'Conversoes',
        'Visitas',
      ];
      const listaMedia = [];

      for (let i = 0; i < itens.length; i += 1) {
        const somaAdultos = presSem1
          .map((item, index) => {
            if (presSem1[index])
              if (item[itens[i]] !== undefined) {
                return item[itens[i]];
              }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);

        listaMedia[i] = somaAdultos;
      }

      if (listaMedia.length) {
        listaMedia[5] =
          Number(listaMedia[0]) +
          Number(listaMedia[1]) +
          Number(listaMedia[2]) +
          Number(listaMedia[3]);

        setMediaAtualCelula(listaMedia);
      }
    }
  }, [presSem1]);

  React.useEffect(() => {
    if (presCeleb.length) {
      const itens = ['Adultos', 'Criancas', 'Visitantes', 'Conversoes'];
      const listaMedia = [];
      for (let i = 0; i < itens.length; i += 1) {
        const somaAdultos = presCeleb
          .map((item) => {
            if (item[itens[i]] !== undefined) {
              return item[itens[i]];
            }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);

        listaMedia[i] = somaAdultos;
      }

      if (listaMedia.length) {
        listaMedia[4] =
          Number(listaMedia[0]) +
          Number(listaMedia[1]) +
          Number(listaMedia[2]) +
          Number(listaMedia[3]);

        setMediaAtualCelebracao(listaMedia);
      }
    }
  }, [presCeleb]);

  React.useEffect(() => {
    if (presDisc.length) {
      // soma adultos, criancas, visitantes e converções das 4 semanas
      const itens = ['Adultos', 'Criancas', 'LeituraBiblica'];
      const listaMedia = [];

      for (let i = 0; i < itens.length; i += 1) {
        const somaAdultos = presDisc
          .map((item) => {
            if (item[itens[i]] !== undefined) {
              return item[itens[i]];
            }
            return 0;
          })
          .reduce((prev, curr) => prev + curr, 0);

        listaMedia[i] = somaAdultos;
      }

      if (listaMedia.length) {
        listaMedia[3] = Number(listaMedia[0]) + Number(listaMedia[1]);
        setMediaAtualDiscipulado(listaMedia);
      }
    }
  }, [presDisc]);

  //= ==================================================================

  return (
    <Box>
      {presDisc[0] !== undefined && presCeleb.length && presSem1.length ? (
        <Box height="100%">
          <Box
            bgcolor="#d1c4e9"
            sx={{
              fontFamily: 'arial black',
              fontSize: '10px',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="5.6vh"
            minHeight={30}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="25%"
            >
              CELULA
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="15%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              ADUL
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="15%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              CRIAN
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="15%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              VISIT
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="15%"
              sx={{
                borderRight: '1px solid #000',
              }}
            >
              CONV
            </Box>

            <Box textAlign="center" width="15%">
              TOTAL
            </Box>
          </Box>

          <Box height="100%">
            <Box
              bgcolor="#fafafa"
              sx={{
                fontFamily: 'arial black',
                fontSize: '10px',
                borderBottom: '1px solid #000',
              }}
              height="5.6vh"
              minHeight={30}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                color="blue"
              >
                Semana - {contSemana2}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {mediaAtualCelula[0]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="5.6vh"
                minHeight={30}
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaAtualCelula[1]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="5.6vh"
                minHeight={30}
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaAtualCelula[2]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="5.6vh"
                minHeight={30}
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaAtualCelula[3]}
              </Box>

              <Box textAlign="center" width="15%" fontSize="12px" color="blue">
                {mediaAtualCelula[5]}
              </Box>
            </Box>
            <Box
              bgcolor="#fafafa"
              sx={{
                fontFamily: 'arial black',
                fontSize: '10px',
                borderBottom: '1px solid #000',
              }}
              height="5.6vh"
              minHeight={30}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                color="blue"
              >
                Média Mês
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {mediaMesCelula[0]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaMesCelula[1]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaMesCelula[2]}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {mediaMesCelula[3]}
              </Box>

              <Box textAlign="center" width="15%" fontSize="12px" color="blue">
                {mediaMesCelula[5]}
              </Box>
            </Box>
            <Box
              bgcolor="#fafafa"
              sx={{
                fontFamily: 'arial black',
                fontSize: '10px',
                borderBottom: '1px solid #000',
              }}
              height="5.6vh"
              minHeight={30}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                color="blue"
              >
                Status
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {Number(mediaMesCelula[0]) > Number(mediaAtualCelula[0]) && (
                  <BsFillEmojiFrownFill color="red" size={20} />
                )}
                {Number(mediaMesCelula[0]) === Number(mediaAtualCelula[0]) && (
                  <BsEmojiNeutralFill color="indigo" size={20} />
                )}
                {Number(mediaMesCelula[0]) < Number(mediaAtualCelula[0]) && (
                  <BsFillEmojiSmileFill color="green" size={20} />
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {Number(mediaMesCelula[1]) > Number(mediaAtualCelula[1]) && (
                  <BsFillEmojiFrownFill color="red" size={20} />
                )}
                {Number(mediaMesCelula[1]) === Number(mediaAtualCelula[1]) && (
                  <BsEmojiNeutralFill color="indigo" size={20} />
                )}
                {Number(mediaMesCelula[1]) < Number(mediaAtualCelula[1]) && (
                  <BsFillEmojiSmileFill color="green" size={20} />
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {Number(mediaMesCelula[2]) > Number(mediaAtualCelula[2]) && (
                  <BsFillEmojiFrownFill color="red" size={20} />
                )}
                {Number(mediaMesCelula[2]) === Number(mediaAtualCelula[2]) && (
                  <BsEmojiNeutralFill color="indigo" size={20} />
                )}
                {Number(mediaMesCelula[2]) < Number(mediaAtualCelula[2]) && (
                  <BsFillEmojiSmileFill color="green" size={20} />
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {Number(mediaMesCelula[3]) > Number(mediaAtualCelula[3]) && (
                  <BsFillEmojiFrownFill color="red" size={20} />
                )}
                {Number(mediaMesCelula[3]) === Number(mediaAtualCelula[3]) && (
                  <BsEmojiNeutralFill color="indigo" size={20} />
                )}
                {Number(mediaMesCelula[3]) < Number(mediaAtualCelula[3]) && (
                  <BsFillEmojiSmileFill color="green" size={20} />
                )}
              </Box>

              <Box
                mt={0.5}
                textAlign="center"
                width="15%"
                fontSize="12px"
                color="blue"
              >
                {Number(mediaMesCelula[5]) > Number(mediaAtualCelula[5]) && (
                  <BsFillEmojiFrownFill color="red" size={20} />
                )}
                {Number(mediaMesCelula[5]) === Number(mediaAtualCelula[5]) && (
                  <BsEmojiNeutralFill color="indigo" size={20} />
                )}
                {Number(mediaMesCelula[5]) < Number(mediaAtualCelula[5]) && (
                  <BsFillEmojiSmileFill color="green" size={20} />
                )}
              </Box>
            </Box>
            <Box height="100%">
              <Box
                bgcolor="#d7ccc8"
                sx={{
                  fontFamily: 'arial black',
                  fontSize: '10px',
                  borderBottom: '1px solid #000',
                }}
                height="5.6vh"
                minHeight={30}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="25%"
                >
                  CELEBRAÇÃO
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="15%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  ADUL
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="15%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  CRIAN
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="15%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  VISIT
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="15%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  CONV
                </Box>

                <Box textAlign="center" width="15%">
                  TOTAL
                </Box>
              </Box>
              <Box height="100%">
                <Box
                  bgcolor="#fafafa"
                  sx={{
                    fontFamily: 'arial black',
                    fontSize: '10px',
                    borderBottom: '1px solid #000',
                  }}
                  height="5.6vh"
                  minHeight={30}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="brown"
                  >
                    Semana - {contSemana2}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaAtualCelebracao[0]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaAtualCelebracao[1]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaAtualCelebracao[2]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaAtualCelebracao[3]}
                  </Box>

                  <Box
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                  >
                    {mediaAtualCelebracao[4]}
                  </Box>
                </Box>
                <Box
                  bgcolor="#fafafa"
                  sx={{
                    fontFamily: 'arial black',
                    fontSize: '10px',
                    borderBottom: '1px solid #000',
                  }}
                  height="5.6vh"
                  minHeight={30}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="brown"
                  >
                    Média Mês
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaMesCelebracao[0]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaMesCelebracao[1]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaMesCelebracao[2]}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {mediaMesCelebracao[3]}
                  </Box>

                  <Box
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                  >
                    {mediaMesCelebracao[4]}
                  </Box>
                </Box>
                <Box
                  bgcolor="#fafafa"
                  sx={{
                    fontFamily: 'arial black',
                    fontSize: '10px',
                    borderBottom: '1px solid #000',
                  }}
                  height="5.6vh"
                  minHeight={30}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                    color="brown"
                  >
                    Status
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {Number(mediaMesCelebracao[0]) >
                      Number(mediaAtualCelebracao[0]) && (
                      <BsFillEmojiFrownFill color="red" size={20} />
                    )}
                    {Number(mediaMesCelebracao[0]) ===
                      Number(mediaAtualCelebracao[0]) && (
                      <BsEmojiNeutralFill color="indigo" size={20} />
                    )}
                    {Number(mediaMesCelebracao[0]) <
                      Number(mediaAtualCelebracao[0]) && (
                      <BsFillEmojiSmileFill color="green" size={20} />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {Number(mediaMesCelebracao[1]) >
                      Number(mediaAtualCelebracao[1]) && (
                      <BsFillEmojiFrownFill color="red" size={20} />
                    )}
                    {Number(mediaMesCelebracao[1]) ===
                      Number(mediaAtualCelebracao[1]) && (
                      <BsEmojiNeutralFill color="indigo" size={20} />
                    )}
                    {Number(mediaMesCelebracao[1]) <
                      Number(mediaAtualCelebracao[1]) && (
                      <BsFillEmojiSmileFill color="green" size={20} />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {Number(mediaMesCelebracao[2]) >
                      Number(mediaAtualCelebracao[2]) && (
                      <BsFillEmojiFrownFill color="red" size={20} />
                    )}
                    {Number(mediaMesCelebracao[2]) ===
                      Number(mediaAtualCelebracao[2]) && (
                      <BsEmojiNeutralFill color="indigo" size={20} />
                    )}
                    {Number(mediaMesCelebracao[2]) <
                      Number(mediaAtualCelebracao[2]) && (
                      <BsFillEmojiSmileFill color="green" size={20} />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {Number(mediaMesCelebracao[3]) >
                      Number(mediaAtualCelebracao[3]) && (
                      <BsFillEmojiFrownFill color="red" size={20} />
                    )}
                    {Number(mediaMesCelebracao[3]) ===
                      Number(mediaAtualCelebracao[3]) && (
                      <BsEmojiNeutralFill color="indigo" size={20} />
                    )}
                    {Number(mediaMesCelebracao[3]) <
                      Number(mediaAtualCelebracao[3]) && (
                      <BsFillEmojiSmileFill color="green" size={20} />
                    )}
                  </Box>

                  <Box
                    textAlign="center"
                    width="15%"
                    fontSize="12px"
                    color="brown"
                  >
                    {Number(mediaMesCelebracao[4]) >
                      Number(mediaAtualCelebracao[4]) && (
                      <BsFillEmojiFrownFill color="red" size={20} />
                    )}
                    {Number(mediaMesCelebracao[4]) ===
                      Number(mediaAtualCelebracao[4]) && (
                      <BsEmojiNeutralFill color="indigo" size={20} />
                    )}
                    {Number(mediaMesCelebracao[4]) <
                      Number(mediaAtualCelebracao[4]) && (
                      <BsFillEmojiSmileFill color="green" size={20} />
                    )}
                  </Box>
                </Box>
                <Box
                  bgcolor="#fff59d"
                  sx={{
                    fontFamily: 'arial black',
                    fontSize: '10px',
                    borderBottom: '1px solid #000',
                  }}
                  height="5.6vh"
                  minHeight={30}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="25%"
                  >
                    DISCIPULADO
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="15%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    DISC
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="30%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    VISITAS DO LIDER
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="30%"
                  >
                    LEIT. BíBLICA
                  </Box>
                </Box>
                <Box height="100%">
                  <Box
                    bgcolor="#fafafa"
                    sx={{
                      fontFamily: 'arial black',
                      fontSize: '10px',
                      borderBottom: '1px solid #000',
                    }}
                    height="5.6vh"
                    minHeight={30}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="25%"
                      color="green"
                    >
                      Semana - {contSemana2}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="15%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderLeft: '1px solid #000',
                        borderRight: '1px solid #000',
                      }}
                    >
                      {mediaAtualDiscipulado[3]}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderRight: '1px solid #000',
                      }}
                    >
                      {mediaAtualCelula[4]}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                    >
                      {mediaAtualDiscipulado[2]}
                    </Box>
                  </Box>
                  <Box
                    bgcolor="#fafafa"
                    sx={{
                      fontFamily: 'arial black',
                      fontSize: '10px',
                      borderBottom: '1px solid #000',
                    }}
                    height="5.6vh"
                    minHeight={30}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="25%"
                      color="green"
                    >
                      Média Mês
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="15%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderLeft: '1px solid #000',
                        borderRight: '1px solid #000',
                      }}
                    >
                      {mediaMesDiscipulado[3]}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderRight: '1px solid #000',
                      }}
                    >
                      {mediaMesCelula[4]}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                    >
                      {mediaMesDiscipulado[2]}
                    </Box>
                  </Box>
                  <Box
                    bgcolor="#fafafa"
                    sx={{
                      fontFamily: 'arial black',
                      fontSize: '10px',
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                    height="5.6vh"
                    minHeight={30}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="25%"
                      color="green"
                    >
                      Status
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="15%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderLeft: '1px solid #000',
                        borderRight: '1px solid #000',
                      }}
                    >
                      {Number(mediaMesDiscipulado[3]) >
                        Number(mediaAtualDiscipulado[3]) && (
                        <BsFillEmojiFrownFill color="red" size={20} />
                      )}
                      {Number(mediaMesDiscipulado[3]) ===
                        Number(mediaAtualDiscipulado[3]) && (
                        <BsEmojiNeutralFill color="indigo" size={20} />
                      )}
                      {Number(mediaMesDiscipulado[3]) <
                        Number(mediaAtualDiscipulado[3]) && (
                        <BsFillEmojiSmileFill color="green" size={20} />
                      )}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                      sx={{
                        borderRight: '1px solid #000',
                      }}
                    >
                      {Number(mediaMesCelula[4]) >
                        Number(mediaAtualCelula[4]) && (
                        <BsFillEmojiFrownFill color="red" size={20} />
                      )}
                      {Number(mediaMesCelula[4]) ===
                        Number(mediaAtualCelula[4]) && (
                        <BsEmojiNeutralFill color="indigo" size={20} />
                      )}
                      {Number(mediaMesCelula[4]) <
                        Number(mediaAtualCelula[4]) && (
                        <BsFillEmojiSmileFill color="green" size={20} />
                      )}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      fontSize="12px"
                      color="green"
                    >
                      {Number(mediaMesDiscipulado[2]) >
                        Number(mediaAtualDiscipulado[2]) && (
                        <BsFillEmojiFrownFill color="red" size={20} />
                      )}
                      {Number(mediaMesDiscipulado[2]) ===
                        Number(mediaAtualDiscipulado[2]) && (
                        <BsEmojiNeutralFill color="indigo" size={20} />
                      )}
                      {Number(mediaMesDiscipulado[2]) <
                        Number(mediaAtualDiscipulado[2]) && (
                        <BsFillEmojiSmileFill color="green" size={20} />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          textAlign="center"
          width="100%"
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={-2}
              textAlign="center"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height={50} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
