import { Box } from '@material-ui/core';
import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import GetIdade from 'src/utils/getIdade';
import convData2 from 'src/utils/convData2';

const theme = createTheme();
theme.typography.h4 = {
  fontSize: '9px',
  '@media (min-width:400px)': {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '11px',
  },
};
theme.typography.h3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.h2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
function Celula({
  contNumeroDistrito,
  distritos,
  coordenacoes,
  supervisoes,
  celulas,
  rolMembros,
}) {
  const [numeroCoord, setNumeroCoord] = React.useState(0);
  const [numeroSuper, setNumeroSuper] = React.useState(0);
  const [numeroCelulas, setNumeroCelulas] = React.useState(0);

  const [idade0a7M, setIdade0a7M] = React.useState(0);
  const [idade0a7N, setIdade0a7N] = React.useState(0);
  const [idade0a7I, setIdade0a7I] = React.useState(0);
  const [idade0a7T, setIdade0a7T] = React.useState(0);

  const [idade8a11M, setIdade8a11M] = React.useState(0);
  const [idade8a11N, setIdade8a11N] = React.useState(0);
  const [idade8a11I, setIdade8a11I] = React.useState(0);
  const [idade8a11T, setIdade8a11T] = React.useState(0);

  const [idade17M, setIdade17M] = React.useState(0);
  const [idade17N, setIdade17N] = React.useState(0);
  const [idade17I, setIdade17I] = React.useState(0);
  const [idade17T, setIdade17T] = React.useState(0);

  const [idade35M, setIdade35M] = React.useState(0);
  const [idade35N, setIdade35N] = React.useState(0);
  const [idade35I, setIdade35I] = React.useState(0);
  const [idade35T, setIdade35T] = React.useState(0);

  const [idade50M, setIdade50M] = React.useState(0);
  const [idade50N, setIdade50N] = React.useState(0);
  const [idade50I, setIdade50I] = React.useState(0);
  const [idade50T, setIdade50T] = React.useState(0);

  const [idade70M, setIdade70M] = React.useState(0);
  const [idade70N, setIdade70N] = React.useState(0);
  const [idade70I, setIdade70I] = React.useState(0);
  const [idade70T, setIdade70T] = React.useState(0);

  const [idade71M, setIdade71M] = React.useState(0);
  const [idade71N, setIdade71N] = React.useState(0);
  const [idade71I, setIdade71I] = React.useState(0);
  const [idade71T, setIdade71T] = React.useState(0);

  const [idadeTM, setIdadeTM] = React.useState(0);
  const [idadeTN, setIdadeTN] = React.useState(0);
  const [idadeTI, setIdadeTI] = React.useState(0);
  const [idadeTT, setIdadeTT] = React.useState(0);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================
  const distritosT = distritos.filter((val) => val.Status);
  const distritoF = [{ Distrito: 0, Distrito_Nome: 'TODOS OS DISTRITOS' }];
  distritosT.map((val) => distritoF.push(val));

  //--------------------------------------------------------------------

  React.useEffect(() => {
    if (rolMembros) {
      if (contNumeroDistrito) {
        const idadeTemp0a7Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade0a7M(idadeTemp0a7Ativo.length);

        const idadeTemp0a7Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade0a7N(idadeTemp0a7Novo.length);

        const idadeTemp0a7Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade0a7I(idadeTemp0a7Inativo.length);

        const idadeTemp0a7Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) < 8 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade0a7T(idadeTemp0a7Total.length);

        const idadeTemp8a11Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade8a11M(idadeTemp8a11Ativo.length);

        const idadeTemp8a11Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade8a11N(idadeTemp8a11Novo.length);

        const idadeTemp8a11Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade8a11I(idadeTemp8a11Inativo.length);

        const idadeTemp8a11Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade8a11T(idadeTemp8a11Total.length);

        const idadeTemp17Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade17M(idadeTemp17Ativo.length);

        const idadeTemp17Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade17N(idadeTemp17Novo.length);

        const idadeTemp17Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade17I(idadeTemp17Inativo.length);

        const idadeTemp17Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade17T(idadeTemp17Total.length);

        const idadeTemp35Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade35M(idadeTemp35Ativo.length);

        const idadeTemp35Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade35N(idadeTemp35Novo.length);

        const idadeTemp35Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade35I(idadeTemp35Inativo.length);

        const idadeTemp35Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade35T(idadeTemp35Total.length);

        const idadeTemp50Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 50 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade50M(idadeTemp50Ativo.length);

        const idadeTemp50Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade50N(idadeTemp50Novo.length);

        const idadeTemp50Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade50I(idadeTemp50Inativo.length);

        const idadeTemp50Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade50T(idadeTemp50Total.length);

        const idadeTemp70Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade70M(idadeTemp70Ativo.length);

        const idadeTemp70Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade70N(idadeTemp70Novo.length);

        const idadeTemp70Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade70I(idadeTemp70Inativo.length);

        const idadeTemp70Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade70T(idadeTemp70Total.length);

        const idadeTemp71Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade71M(idadeTemp71Ativo.length);

        const idadeTemp71Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade71N(idadeTemp71Novo.length);

        const idadeTemp71Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade71I(idadeTemp71Inativo.length);

        const idadeTemp71Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 70 &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdade71T(idadeTemp71Total.length);

        const idadeTempTAtivo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdadeTM(idadeTempTAtivo.length);

        const idadeTempTNovo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdadeTN(idadeTempTNovo.length);

        const idadeTempTInativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdadeTI(idadeTempTInativo.length);

        const idadeTempTTotal = rolMembros.filter(
          (val) =>
            val.Situacao !== 'INATIVO' &&
            val.Distrito === distritoF[contNumeroDistrito].Distrito,
        );
        setIdadeTT(idadeTempTTotal.length);

        const qytCoord = coordenacoes.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        setNumeroCoord(qytCoord.length);

        const qytSuper = supervisoes.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        setNumeroSuper(qytSuper.length);

        const qytCelulas = celulas.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        setNumeroCelulas(qytCelulas.length);
      } else {
        const idadeTemp0a7Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8,
        );
        setIdade0a7M(idadeTemp0a7Ativo.length);

        const idadeTemp0a7Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8,
        );
        setIdade0a7N(idadeTemp0a7Novo.length);

        const idadeTemp0a7Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8,
        );
        setIdade0a7I(idadeTemp0a7Inativo.length);

        const idadeTemp0a7Total = rolMembros.filter(
          (val) =>
            val.Situacao !== 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) < 8,
        );
        setIdade0a7T(idadeTemp0a7Total.length);

        const idadeTemp8a11Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12,
        );
        setIdade8a11M(idadeTemp8a11Ativo.length);

        const idadeTemp8a11Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12,
        );
        setIdade8a11N(idadeTemp8a11Novo.length);

        const idadeTemp8a11Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12,
        );
        setIdade8a11I(idadeTemp8a11Inativo.length);

        const idadeTemp8a11Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 7 &&
            Number(GetIdade(convData2(val.Nascimento))) < 12,
        );
        setIdade8a11T(idadeTemp8a11Total.length);

        //= ==============================================

        const idadeTemp17Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18,
        );
        setIdade17M(idadeTemp17Ativo.length);

        const idadeTemp17Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18,
        );
        setIdade17N(idadeTemp17Novo.length);

        const idadeTemp17Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18,
        );
        setIdade17I(idadeTemp17Inativo.length);

        const idadeTemp17Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 11 &&
            Number(GetIdade(convData2(val.Nascimento))) < 18,
        );
        setIdade17T(idadeTemp17Total.length);

        //= ==============================================

        const idadeTemp35Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36,
        );
        setIdade35M(idadeTemp35Ativo.length);

        const idadeTemp35Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36,
        );
        setIdade35N(idadeTemp35Novo.length);

        const idadeTemp35Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36,
        );
        setIdade35I(idadeTemp35Inativo.length);

        const idadeTemp35Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 17 &&
            Number(GetIdade(convData2(val.Nascimento))) < 36,
        );
        setIdade35T(idadeTemp35Total.length);

        const idadeTemp50Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51,
        );
        setIdade50M(idadeTemp50Ativo.length);

        const idadeTemp50Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51,
        );
        setIdade50N(idadeTemp50Novo.length);

        const idadeTemp50Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51,
        );
        setIdade50I(idadeTemp50Inativo.length);

        const idadeTemp50Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 35 &&
            Number(GetIdade(convData2(val.Nascimento))) < 51,
        );
        setIdade50T(idadeTemp50Total.length);

        const idadeTemp70Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71,
        );
        setIdade70M(idadeTemp70Ativo.length);

        const idadeTemp70Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71,
        );
        setIdade70N(idadeTemp70Novo.length);

        const idadeTemp70Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71,
        );
        setIdade70I(idadeTemp70Inativo.length);

        const idadeTemp70Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 50 &&
            Number(GetIdade(convData2(val.Nascimento))) < 71,
        );
        setIdade70T(idadeTemp70Total.length);

        //= ===========================

        const idadeTemp71Ativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'ATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70,
        );
        setIdade71M(idadeTemp71Ativo.length);

        const idadeTemp71Novo = rolMembros.filter(
          (val) =>
            val.Situacao === 'NOVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70,
        );
        setIdade71N(idadeTemp71Novo.length);

        const idadeTemp71Inativo = rolMembros.filter(
          (val) =>
            val.Situacao === 'INATIVO' &&
            val.Nascimento &&
            Number(GetIdade(convData2(val.Nascimento))) > 70,
        );
        setIdade71I(idadeTemp71Inativo.length);

        const idadeTemp71Total = rolMembros.filter(
          (val) =>
            val.Nascimento &&
            val.Situacao !== 'INATIVO' &&
            Number(GetIdade(convData2(val.Nascimento))) > 70,
        );
        setIdade71T(idadeTemp71Total.length);

        //= ===========================

        const idadeTempTAtivo = rolMembros.filter(
          (val) => val.Situacao === 'ATIVO',
        );
        setIdadeTM(idadeTempTAtivo.length);

        const idadeTempTNovo = rolMembros.filter(
          (val) => val.Situacao === 'NOVO',
        );
        setIdadeTN(idadeTempTNovo.length);

        const idadeTempTInativo = rolMembros.filter(
          (val) => val.Situacao === 'INATIVO',
        );
        setIdadeTI(idadeTempTInativo.length);

        const idadeTempTTotal = rolMembros.filter(
          (val) => val.Situacao !== 'INATIVO',
        );
        setIdadeTT(idadeTempTTotal.length);
        setNumeroCoord(distritos.length);
        setNumeroCoord(coordenacoes.length);
        setNumeroSuper(supervisoes.length);
        setNumeroCelulas(celulas.length);
      }
    }
  }, [contNumeroDistrito]);

  //= ===================================================================

  //--------------------------------------------------------

  //----------------------------------------------------------------

  //= ===================================================================

  return (
    <Box width="100%" fontSize="16px" sx={{ fontFamily: 'Rubik' }}>
      <Box
        width="100%"
        ml={0}
        mt={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="60%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4"> QUANTIDADE DE DISTRITOS</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="black"
          bgcolor="#ffff8d"
          fontSize="12px"
          height="3.65vh"
          borderRadius={6}
          width="94%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2"> {distritos.length}</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mt={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4"> COORDENACÕES</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4"> SUPERVISÕES</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4"> CÉLULAS</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="black"
          bgcolor="#ffff8d"
          fontSize="12px"
          height="3.65vh"
          borderRadius={6}
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2"> {numeroCoord}</Typography>
          </ThemeProvider>
        </Box>

        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />

        <Box
          color="black"
          bgcolor="#ffff8d"
          borderRadius={6}
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2">{numeroSuper}</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          fontSize="12px"
          color="black"
          bgcolor="#ffff8d"
          borderRadius={6}
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2"> {numeroCelulas}</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mt={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4">MEMBROS ATIVOS</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4">MEMBROS NOVOS</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="white"
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4"> TOTAL DE MEMBROS</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mb={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="16px"
        sx={{ fontFamily: 'Rubik' }}
      >
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="black"
          bgcolor="#ffff8d"
          fontSize="12px"
          height="3.65vh"
          borderRadius={6}
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2"> {idadeTM}</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          color="black"
          bgcolor="#ffff8d"
          borderRadius={6}
          fontSize="12px"
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2">{idadeTN}</Typography>
          </ThemeProvider>
        </Box>
        <Box
          color="black"
          fontSize="12px"
          height="3.65vh"
          width="2%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          fontSize="12px"
          color="black"
          bgcolor="#ffff8d"
          borderRadius={6}
          height="3.65vh"
          width="30%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2"> {idadeTT}</Typography>
          </ThemeProvider>
        </Box>
      </Box>
      <Box
        width="100%"
        ml={0}
        mt={1}
        height="3.65vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="12px"
        color="white"
        fontFamily="Fugaz One"
        style={{ borderTop: '1px solid #f0f0f0' }}
      >
        QUANTIDADE POR FAIXA ETÁRIA
      </Box>
      <Box
        bgcolor="#d7ccc8"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> FAIXA ETÁRIA</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> ATIVOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> NOVOS</Typography>
            </ThemeProvider>
          </Box>

          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> TOTAL</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> INATIVOS</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 0 à 7 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade0a7M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade0a7N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade0a7T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade0a7I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#f0f0f0"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 8 à 11 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade8a11M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade8a11N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade8a11T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade8a11I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 12 à 17 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade17M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade17N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade17T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade17I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#f0f0f0"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 18 à 35 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade35M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade35N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade35T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade35I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 36 à 50 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade50M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade50N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade50T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade50I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#f0f0f0"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> 51 à 70 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade70M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade70N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade70T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade70I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> + DE 70 ANOS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade71M}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idade71N}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade71T}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idade71I}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#c8e6c9"
        color="#000"
        justifyContent="center"
        width="100%"
        display="flex"
        height="3.65vh"
      >
        <Box
          width="100%"
          ml={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> TOTAL GERAL</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idadeTM}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3"> {idadeTN}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idadeTT}</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="3.65vh"
            width="17%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h3">{idadeTI}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Celula;