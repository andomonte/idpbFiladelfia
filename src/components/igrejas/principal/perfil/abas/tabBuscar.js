import * as React from 'react';
import { Box } from '@material-ui/core';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { MdDone, MdOutlineClose } from 'react-icons/md';
import ConverteData from 'src/utils/convData2';
import { Oval } from 'react-loading-icons';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function filterItems(array, query) {
  return array.filter(
    (el) => el.CAT_NOME.toLowerCase().indexOf(query.toLowerCase()) > -1,
  );
}

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const [listaCursos, setListaCursos] = React.useState([]);
  const [oferta, setOferta] = React.useState(false);
  const [dizimo, setDizimo] = React.useState(false);
  const [presSem1, setPresSem1] = React.useState(false);
  const [dataSem1, setDataSem1] = React.useState([]);
  const [presSem2, setPresSem2] = React.useState([]);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [presSem3, setPresSem3] = React.useState([]);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [presSem4, setPresSem4] = React.useState([]);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [presSem5, setPresSem5] = React.useState([]);
  const [dataSem5, setDataSem5] = React.useState([]);

  const [celebSem1, setCelebSem1] = React.useState(false);
  const [celebSem2, setCelebSem2] = React.useState([]);
  const [celebSem3, setCelebSem3] = React.useState([]);
  const [celebSem4, setCelebSem4] = React.useState([]);
  const [celebSem5, setCelebSem5] = React.useState([]);

  const [discSem1, setDiscSem1] = React.useState(false);
  const [discSem2, setDiscSem2] = React.useState([]);
  const [discSem3, setDiscSem3] = React.useState([]);
  const [discSem4, setDiscSem4] = React.useState([]);
  const [discSem5, setDiscSem5] = React.useState([]);

  const semana = PegaSemana(Mes, Ano);
  // para usar semanas

  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;
  const rolMembros = perfilUser.RolMembro;
  const url1 = `/api/consultaRelCelulasSemanas/${semana1}`;
  const url2 = `/api/consultaRelCelebracaoSemanas/${semana1}`;
  const url3 = `/api/consultaRelDiscipuladoSemanas/${semana1}`;
  const url4 = `/api/consultaInscritosCurso/${rolMembros}`;
  const url5 = `/api/consultaContribuicoes/${Ano}/${Mes}/${rolMembros}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: semCelebracao, errorSemCelebracao } = useSWR(url2, fetcher);
  const { data: semDiscipulado, errorSemDiscipulado } = useSWR(url3, fetcher);
  const { data: cursoFeito, errorCursoFeito } = useSWR(url4, fetcher);
  const { data: contribuicoes, errorContribuicoes } = useSWR(url5, fetcher);

  React.useEffect(() => {
    mutate(url1);

    setDataSem1([]);
    setPresSem1([]);
    setDataSem2([]);
    setPresSem2([]);
    setDataSem3([]);
    setPresSem3([]);
    setDataSem4([]);
    setPresSem4([]);
    setDataSem5([]);
    setPresSem5([]);

    setCelebSem1([]);
    setCelebSem2([]);
    setCelebSem3([]);
    setCelebSem4([]);
    setCelebSem5([]);

    setDiscSem1([]);
    setDiscSem2([]);
    setDiscSem3([]);
    setDiscSem4([]);
    setDiscSem5([]);
  }, [semana]);

  React.useEffect(() => {
    if (cursoFeito && cursoFeito.length) {
      setListaCursos(cursoFeito[0]);
    }
    if (errorCursoFeito) return <div>An error occured.</div>;
    if (!cursoFeito) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [cursoFeito]);

  React.useEffect(() => {
    setOferta(false);
    setDizimo(false);
    if (contribuicoes && contribuicoes.length) {
      const ofertaP = filterItems(contribuicoes, 'ferta');

      const dizimoP = filterItems(contribuicoes, 'zimo');
      if (ofertaP.length) setOferta(true);
      if (dizimoP.length) setDizimo(true);
    }
    if (errorContribuicoes) return <div>An error occured.</div>;
    if (!contribuicoes) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [contribuicoes]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      const presCelula1 = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (presCelula1.length) {
        const nomes = Object.keys(presCelula1).map((i) =>
          JSON.parse(presCelula1[Number(i)].NomesMembros),
        );

        setDataSem1(ConverteData(presCelula1[0].Data));
        const pSem1 = nomes[0].filter((val) => val.Nome === perfilUser.Nome);

        setPresSem1(pSem1);
      }
      // seman 2
      const presCelula2 = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana2) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula2.length) {
        const nomes = Object.keys(presCelula2).map((i) =>
          JSON.parse(presCelula2[Number(i)].NomesMembros),
        );

        setDataSem2(ConverteData(presCelula2[0].Data));
        const pSem1 = nomes[0].filter((val) => val.Nome === perfilUser.Nome);
        setPresSem2(pSem1);
      }

      // seman 3
      const presCelula3 = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana3) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula3.length) {
        const nomes = Object.keys(presCelula3).map((i) =>
          JSON.parse(presCelula3[Number(i)].NomesMembros),
        );

        setDataSem3(ConverteData(presCelula3[0].Data));
        const pSem1 = nomes[0].filter((val) => val.Nome === perfilUser.Nome);
        setPresSem3(pSem1);
      }

      // seman 4
      const presCelula4 = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana4) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula4.length) {
        const nomes = Object.keys(presCelula4).map((i) =>
          JSON.parse(presCelula4[Number(i)].NomesMembros),
        );

        setDataSem4(ConverteData(presCelula4[0].Data));
        const pSem1 = nomes[0].filter((val) => val.Nome === perfilUser.Nome);

        setPresSem4(pSem1);
      }
      // seman 5
      const presCelula5 = sem1.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana5) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelula5.length) {
        const nomes = Object.keys(presCelula5).map((i) =>
          JSON.parse(presCelula5[Number(i)].NomesMembros),
        );

        setDataSem5(ConverteData(presCelula5[0].Data));
        const pSem1 = nomes[0].filter((val) => val.Nome === perfilUser.Nome);
        setPresSem5(pSem1);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;
    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

  React.useEffect(() => {
    if (semCelebracao && semCelebracao.length) {
      const presCelebracao1 = semCelebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelebracao1.length) {
        const nomes = Object.keys(presCelebracao1).map((i) =>
          JSON.parse(presCelebracao1[Number(i)].NomesMembros),
        );

        const pSemCelebracao = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setCelebSem1(pSemCelebracao);
      }
      // seman 2
      const presCelebracao2 = semCelebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana2) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelebracao2.length) {
        const nomes = Object.keys(presCelebracao2).map((i) =>
          JSON.parse(presCelebracao2[Number(i)].NomesMembros),
        );

        const pSemCelebracao = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setCelebSem2(pSemCelebracao);
      }

      // seman 3
      const presCelebracao3 = semCelebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana3) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelebracao3.length) {
        const nomes = Object.keys(presCelebracao3).map((i) =>
          JSON.parse(presCelebracao3[Number(i)].NomesMembros),
        );

        const pSemCelebracao = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setCelebSem3(pSemCelebracao);
      }

      // seman 4
      const presCelebracao4 = semCelebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana4) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelebracao4.length) {
        const nomes = Object.keys(presCelebracao4).map((i) =>
          JSON.parse(presCelebracao4[Number(i)].NomesMembros),
        );

        const pSemCelebracao = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setCelebSem4(pSemCelebracao);
      }

      // seman 5
      const presCelebracao5 = semCelebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana5) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presCelebracao5.length) {
        const nomes = Object.keys(presCelebracao5).map((i) =>
          JSON.parse(presCelebracao5[Number(i)].NomesMembros),
        );

        const pSemCelebracao = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setCelebSem5(pSemCelebracao);
      }
    }
    if (errorSemCelebracao) return <div>An error occured.</div>;
    if (!semCelebracao) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [semCelebracao]);

  React.useEffect(() => {
    console.log('sem discipulado', semDiscipulado);
    if (semDiscipulado && semDiscipulado.length) {
      const presDiscipulado1 = semDiscipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presDiscipulado1.length) {
        const nomes = Object.keys(presDiscipulado1).map((i) =>
          JSON.parse(presDiscipulado1[Number(i)].NomesMembros),
        );

        const pSemDiscipulado = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setDiscSem1(pSemDiscipulado);
      }
      // seman 2
      const presDiscipulado2 = semDiscipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana2) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presDiscipulado2.length) {
        const nomes = Object.keys(presDiscipulado2).map((i) =>
          JSON.parse(presDiscipulado2[Number(i)].NomesMembros),
        );

        const pSemDiscipulado = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setDiscSem2(pSemDiscipulado);
      }

      // seman 3
      const presDiscipulado3 = semDiscipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana3) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presDiscipulado3.length) {
        const nomes = Object.keys(presDiscipulado3).map((i) =>
          JSON.parse(presDiscipulado3[Number(i)].NomesMembros),
        );

        const pSemDiscipulado = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setDiscSem3(pSemDiscipulado);
      }

      // seman 4

      const presDiscipulado4 = semDiscipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana4) &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presDiscipulado4.length) {
        const nomes = Object.keys(presDiscipulado4).map((i) =>
          JSON.parse(presDiscipulado4[Number(i)].NomesMembros),
        );

        const pSemDiscipulado = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setDiscSem4(pSemDiscipulado);
      }

      // seman 5
      const presDiscipulado5 = semDiscipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Semana === Number(semana5) &&
          Ano === new Date(val.Data).getFullYear() &&
          Ano === new Date(val.Data).getFullYear() &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      if (presDiscipulado5.length) {
        const nomes = Object.keys(presDiscipulado5).map((i) =>
          JSON.parse(presDiscipulado5[Number(i)].NomesMembros),
        );

        const pSemDiscipulado = nomes[0].filter(
          (val) => val.Nome === perfilUser.Nome,
        );
        setDiscSem5(pSemDiscipulado);
      }
    }
    if (errorSemDiscipulado) return <div>An error occured.</div>;
    if (!semDiscipulado) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [semDiscipulado]);

  return (
    <Box
      height="100%"
      sx={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
    >
      {sem1 ? (
        <Box
          height="100%"
          sx={{
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
        >
          <Box
            bgcolor="#f4ff81"
            sx={{
              fontFamily: 'arial black',
              fontSize: '12px',
              borderBottom: '1px solid #000',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            height="16.66%"
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
              width="15%"
            >
              SEM
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="25%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              DATA
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              sx={{
                borderRight: '1px solid #000',
              }}
              width="20%"
            >
              CELULA
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              sx={{
                borderRight: '1px solid #000',
              }}
              width="20%"
            >
              CELEB.
            </Box>
            <Box textAlign="center" width="20%">
              DISC.
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
            }}
            height="16.66%"
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
              width="15%"
            >
              {semana1}
            </Box>

            {sem1 ? ( // data semana 1
              <Box
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {dataSem1.length ? dataSem1 : '-'}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // Celula Semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {presSem1.length ? (
                  <Box mt={1}>
                    {presSem1[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // celebracao  semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {celebSem1.length ? (
                  <Box mt={1}>
                    {celebSem1[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="20%"
            >
              {discSem1.length ? ( // discipulado semana 1
                <Box mt={1}>
                  {discSem1[0].Presenca ? (
                    <MdDone size={25} color="green" />
                  ) : (
                    <MdOutlineClose size={25} color="red" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
            }}
            height="16.66%"
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
              width="15%"
            >
              {semana2}
            </Box>

            {sem1 ? ( // data semana 1
              <Box
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {dataSem2.length ? dataSem2 : '-'}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // Celula Semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {presSem2.length ? (
                  <Box mt={1}>
                    {presSem2[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // celebracao  semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {celebSem2.length ? (
                  <Box mt={1}>
                    {celebSem2[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="20%"
            >
              {discSem2.length ? ( // discipulado semana 1
                <Box mt={1}>
                  {discSem2[0].Presenca ? (
                    <MdDone size={25} color="green" />
                  ) : (
                    <MdOutlineClose size={25} color="red" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
            }}
            height="16.66%"
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
              width="15%"
            >
              {semana3}
            </Box>

            {sem1 ? ( // data semana 1
              <Box
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {dataSem3.length ? dataSem3 : '-'}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // Celula Semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {presSem3.length ? (
                  <Box mt={1}>
                    {presSem3[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // celebracao  semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {celebSem3.length ? (
                  <Box mt={1}>
                    {celebSem3[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="20%"
            >
              {discSem3.length ? ( // discipulado semana 1
                <Box mt={1}>
                  {discSem3[0].Presenca ? (
                    <MdDone size={25} color="green" />
                  ) : (
                    <MdOutlineClose size={25} color="red" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
            }}
            height="16.66%"
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
              width="15%"
            >
              {semana4}
            </Box>

            {sem1 ? ( // data semana 1
              <Box
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {dataSem4.length ? dataSem4 : '-'}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // Celula Semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {presSem4.length ? (
                  <Box mt={1}>
                    {presSem4[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // celebracao  semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {celebSem4.length ? (
                  <Box mt={1}>
                    {celebSem4[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="20%"
            >
              {discSem4.length ? ( // discipulado semana 1
                <Box mt={1}>
                  {discSem4[0].Presenca ? (
                    <MdDone size={25} color="green" />
                  ) : (
                    <MdOutlineClose size={25} color="red" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'arial black',
              borderBottom: '1px solid #000',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
            height="16.66%"
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
              width="15%"
            >
              {semana5}
            </Box>

            {sem1 ? ( // data semana 5
              <Box
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                {dataSem5.length ? dataSem5 : '-'}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="25%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // Celula Semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {presSem5.length ? (
                  <Box mt={1}>
                    {presSem5[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}

            {sem1 ? ( // celebracao  semana 1
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {celebSem5.length ? (
                  <Box mt={1}>
                    {celebSem5[0].Presenca ? (
                      <MdDone size={25} color="green" />
                    ) : (
                      <MdOutlineClose size={25} color="red" />
                    )}
                  </Box>
                ) : (
                  '-'
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="20%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                <Oval stroke="blue" width={20} height={20} />
              </Box>
            )}
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="20%"
            >
              {discSem5.length ? ( // discipulado semana 5
                <Box mt={1}>
                  {discSem5[0].Presenca ? (
                    <MdDone size={25} color="green" />
                  ) : (
                    <MdOutlineClose size={25} color="red" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          bgcolor="#fafafa"
          textAlign="center"
          width="100%"
          sx={{
            borderRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={5}
              textAlign="center"
              color="Blue"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height="5.5vh" />
          </Box>
        </Box>
      )}
      <Box
        bgcolor="#bdbdbd"
        mt={2}
        sx={{
          fontFamily: 'arial black',
          fontSize: '12px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="14.66%"
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
          width="60%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          ÚLTIMO CURSO
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          DÍZIMO
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
        >
          OFERTA
        </Box>
      </Box>
      <Box
        bgcolor="#FAFAFA"
        sx={{
          fontFamily: 'arial black',
          fontSize: '12px',
          borderBottom: '1px solid #000',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
        height="18.66%"
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
          width="60%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          {Object.keys(listaCursos).length ? (
            <Box>
              <Box mt={0}>{ConverteData(listaCursos.Data)}</Box>
              <Box mt={0}>{listaCursos.Curso}</Box>
            </Box>
          ) : (
            '-'
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          {dizimo ? (
            <MdDone size={25} color="green" />
          ) : (
            <MdOutlineClose size={25} color="red" />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
        >
          {oferta ? (
            <MdDone size={25} color="green" />
          ) : (
            <MdOutlineClose size={25} color="red" />
          )}
        </Box>
      </Box>
    </Box>
  );
}
