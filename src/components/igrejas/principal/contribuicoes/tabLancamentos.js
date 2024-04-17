import * as React from 'react';
import { Box } from '@material-ui/core';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';

import TabDetalhes from './tabDetalhes';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const theme = createTheme();
theme.typography.hs4 = {
  fontSize: '8px',
  '@media (min-width:360px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '11px',
  },
  '@media (min-width:500px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};
theme.typography.hs3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
function createDetalhes(
  Nome,
  Descricao,
  valor,
  NomeCategoria,
  data,
  conta,
  centroCusto,
) {
  return {
    Nome,
    Descricao,
    valor,
    NomeCategoria,
    data,
    conta,
    centroCusto,
  };
}
export default function TabCelula({
  Mes,
  Ano,
  // perfilUser,

  listaContas,
  listaCC,
  mesesAbertos,
  tipo,
  entradas,
  entradasT,
  setValorReceita,
  setValorDespesa,
  setValorSaldoT,
  setSaldoMes,
  setValorReceitaT,
  setValorDespesaT,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [dadosFiltrados, setDadosFiltrados] = React.useState([]);
  const [entradasMes, setEntradasMes] = React.useState([]);
  const [valorEntradas, setValorEntradas] = React.useState([]);
  const [valorFLanc, setValorFLanc] = React.useState([]);
  const [valorFLancT, setValorFLancT] = React.useState([]);
  const [valD, setValD] = React.useState([]);
  const [valR, setValR] = React.useState([]);

  const [loading, setLoading] = React.useState([]);
  const [contConta, setContConta] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [qytLoading, setQytLoading] = React.useState(false);
  const listaTipos = [
    { label: 'RECEITA', value: 0 },
    { label: 'DESPESA', value: 1 },
  ];

  const url1 = `/api/consultaMembros`;
  const { data: membros } = useSWR(url1, fetcher);
  const url3 = `/api/consultaTransferencias`;
  const { data: transferencias } = useSWR(url3, fetcher);
  const calculaLancamento = () => {
    const newEntrada = entradas?.filter(
      (val) =>
        Number(val.LANC_DATA.substring(5, 7)) === Number(Mes) + 1 &&
        val.LANC_TIPO.toUpperCase() === listaTipos[contConta].label,
    );

    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CAT_NOME);
      setPerson.add(person.CAT_NOME);
      return !duplicatedPerson;
    });
    const arrayLanc = [];
    const valorFinalLanc = [];

    if (filterPerson) {
      if (newEntrada.length) {
        setEntradasMes(newEntrada);
      }
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CAT_NOME === val2.CAT_NOME,
        );
        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      setValorEntradas(filterPerson);
      setLoading(filterPerson?.map(() => false));
    }
    setValorFLanc(valorFinalLanc);
  };

  //= ======================================================
  const calculaContas = () => {
    const newEntrada = entradas?.map((u) => ({
      ...u,
      LANC_VALOR:
        u.LANC_TIPO === 'Receita'
          ? Number(u.LANC_VALOR)
          : -Number(u.LANC_VALOR),
    }));

    // newEntrada = newEntrada.filter((val) => val.LANC_PAGO);

    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CT_ID);
      setPerson.add(person.CT_ID);
      return !duplicatedPerson;
    });

    const arrayLanc = [];
    const arrayLancR = [];
    const arrayLancD = [];
    const valorFinalLanc = [];
    const valorFinalLancR = [];
    const valorFinalLancD = [];
    const arrayLancSaldo = [];
    const valorFinalLancSaldo = [];

    if (filterPerson) {
      if (newEntrada.length) {
        setEntradasMes(newEntrada);
      }
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CT_ID === val2.CT_ID,
        );

        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        arrayLancSaldo[index] = newEntrada?.filter((val2) => val2);

        valorFinalLancSaldo[index] = arrayLancSaldo[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      filterPerson?.map((val, index) => {
        arrayLancR[index] = newEntrada?.filter(
          (val2) => val2.LANC_TIPO === 'Receita',
        );
        arrayLancD[index] = newEntrada?.filter(
          (val2) => val2.LANC_TIPO === 'Despesa',
        );

        valorFinalLancR[index] = arrayLancR[0].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );

        valorFinalLancD[index] = arrayLancD[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );

        return 0;
      });

      setValorEntradas(filterPerson);
      setLoading(filterPerson?.map(() => false));

      setSaldoMes(valorFinalLancSaldo[0]);
    }
    /* transferencias?.map((val) => {
      if (val.TF_CT_DESTINO !== val.TF_CT_ORIGEM) {
        valorFinalLanc[Number(val.TF_CT_DESTINO) - 1] =
          valorFinalLanc[Number(val.TF_CT_DESTINO) - 1] + val.TF_VALOR;
        valorFinalLanc[Number(val.TF_CT_ORIGEM) - 1] =
          valorFinalLanc[Number(val.TF_CT_ORIGEM) - 1] - val.TF_VALOR;
      }
      return 0;
    }); */
    setValorReceita(valorFinalLancR[0]);
    setValorDespesa(valorFinalLancD[0]);
    setValorFLanc(valorFinalLanc);
  };

  //= ======================================================

  //= ======================================================
  const calculaContasT = () => {
    let newEntrada = entradasT?.map((u) => ({
      ...u,
      LANC_VALOR:
        u.LANC_TIPO === 'Receita'
          ? Number(u.LANC_VALOR)
          : -Number(u.LANC_VALOR),
    }));
    newEntrada = newEntrada?.filter((val) => val.LANC_PAGO);
    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CT_ID);
      setPerson.add(person.CT_ID);
      return !duplicatedPerson;
    });
    const arrayLanc = [];
    const valorFinalLanc = [];
    const arrayLancR = [];
    const arrayLancD = [];
    const valorFinalLancR = [];
    const valorFinalLancD = [];
    const arrayLancSaldo = [];
    const valorFinalLancSaldo = [];

    if (filterPerson) {
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CT_ID === val2.CT_ID,
        );

        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      filterPerson?.map((val, index) => {
        arrayLancSaldo[index] = newEntrada?.filter((val2) => val2);

        valorFinalLancSaldo[index] = arrayLancSaldo[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });
    }

    filterPerson?.map((val, index) => {
      arrayLancR[index] = newEntrada?.filter(
        (val2) => val2.LANC_TIPO === 'Receita',
      );
      arrayLancD[index] = newEntrada?.filter(
        (val2) => val2.LANC_TIPO === 'Despesa',
      );
      valorFinalLancR[index] = arrayLancR[index].reduce(
        (prev, curr) => prev + Number(curr.LANC_VALOR),
        0,
      );
      valorFinalLancD[index] = arrayLancD[index].reduce(
        (prev, curr) => prev + Number(curr.LANC_VALOR),
        0,
      );

      return 0;
    });
    setValorFLancT(valorFinalLanc);
    setValorSaldoT(valorFinalLancSaldo[0]);
    setValorReceitaT(valorFinalLancR[0] / mesesAbertos.length);
    setValorDespesaT(valorFinalLancD[0] / mesesAbertos.length);
    calculaContas();
  };
  //= ======================================================
  //= ======================================================
  const calculaCC = () => {
    let newEntrada = entradas?.map((u) => ({
      ...u,
      LANC_VALOR:
        u.LANC_TIPO === 'Receita'
          ? Number(u.LANC_VALOR)
          : -Number(u.LANC_VALOR),
    }));
    newEntrada.sort((a, b) => {
      if (a.CC_ID > b.CC_ID) {
        return 1;
      }
      if (a.CC_ID < b.CC_ID) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    newEntrada = newEntrada?.filter((val) => val.LANC_PAGO);

    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CC_ID);
      setPerson.add(person.CC_ID);
      return !duplicatedPerson;
    });

    const arrayLanc = [];
    const arrayLancR = [];
    const arrayLancD = [];
    const valorFinalLanc = [];
    const valorFinalLancR = [];
    const valorFinalLancD = [];
    const arrayLancSaldo = [];
    const valorFinalLancSaldo = [];

    if (filterPerson) {
      if (newEntrada.length) {
        setEntradasMes(newEntrada);
      }
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CC_ID === val2.CC_ID,
        );

        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        arrayLancSaldo[index] = newEntrada?.filter((val2) => val2);

        valorFinalLancSaldo[index] = arrayLancSaldo[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      filterPerson?.map((val, index) => {
        arrayLancR[index] = arrayLanc[index]?.filter(
          (val2) => val2.LANC_TIPO === 'Receita',
        );
        arrayLancD[index] = arrayLanc[index]?.filter(
          (val2) => val2.LANC_TIPO === 'Despesa',
        );

        valorFinalLancR[index] = arrayLancR[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );

        valorFinalLancD[index] = arrayLancD[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );

        return 0;
      });

      setValorEntradas(filterPerson);
      setLoading(filterPerson?.map(() => false));
      setSaldoMes(valorFinalLancSaldo[0]);
    }
    /* console.log('oi transfer', transferencias);
    transferencias.map((val) => {
      if (val.TF_CC_DESTINO !== val.TF_CC_ORIGEM) {
        valorFinalLanc[Number(val.TF_CC_DESTINO) - 1] =
          valorFinalLanc[Number(val.TF_CC_DESTINO) - 1] + Number(val.TF_VALOR);
        valorFinalLanc[Number(val.TF_CC_ORIGEM) - 1] =
          valorFinalLanc[Number(val.TF_CC_ORIGEM) - 1] - Number(val.TF_VALOR);
      }
      return 0;
    }); */
    let somaR = 0;
    for (let i = 0; i < valorFinalLancR.length; i += 1) {
      somaR += valorFinalLancR[i];
    }
    let somaD = 0;
    for (let i = 0; i < valorFinalLancD.length; i += 1) {
      somaD += valorFinalLancD[i];
    }
    setValorDespesa(somaD);
    setValorReceita(somaR);
    setValR(valorFinalLancR);
    setValD(valorFinalLancD);
    setValorFLanc(valorFinalLanc);
  };

  //= ======================================================

  //= ======================================================
  const calculaCCT = () => {
    let newEntrada = entradasT?.map((u) => ({
      ...u,
      LANC_VALOR:
        u.LANC_TIPO === 'Receita'
          ? Number(u.LANC_VALOR)
          : -Number(u.LANC_VALOR),
    }));
    newEntrada.sort((a, b) => {
      if (a.CC_ID > b.CC_ID) {
        return 1;
      }
      if (a.CC_ID < b.CC_ID) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    newEntrada = newEntrada?.filter((val) => val.LANC_PAGO);
    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CC_ID);
      setPerson.add(person.CC_ID);
      return !duplicatedPerson;
    });

    const arrayLanc = [];
    const valorFinalLanc = [];
    const arrayLancR = [];
    const arrayLancD = [];
    const valorFinalLancR = [];
    const valorFinalLancD = [];
    const arrayLancSaldo = [];
    const valorFinalLancSaldo = [];

    if (filterPerson) {
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CC_ID === val2.CC_ID,
        );

        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      filterPerson?.map((val, index) => {
        arrayLancSaldo[index] = newEntrada?.filter((val2) => val2);

        valorFinalLancSaldo[index] = arrayLancSaldo[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });
    }

    filterPerson?.map((val, index) => {
      arrayLancR[index] = newEntrada?.filter(
        (val2) => val2.LANC_TIPO === 'Receita',
      );
      arrayLancD[index] = newEntrada?.filter(
        (val2) => val2.LANC_TIPO === 'Despesa',
      );
      valorFinalLancR[index] = arrayLancR[index].reduce(
        (prev, curr) => prev + Number(curr.LANC_VALOR),
        0,
      );
      valorFinalLancD[index] = arrayLancD[index].reduce(
        (prev, curr) => prev + Number(curr.LANC_VALOR),
        0,
      );

      return 0;
    });

    const transferFinal = transferencias?.filter(
      (val) =>
        (Number(val.mesReferencia) <= Number(Mes) + 1 &&
          Number(val.anoReferencia) <= Number(Ano)) ||
        Number(val.anoReferencia) < Number(Ano),
    );

    transferFinal?.map((val) => {
      if (val.TF_CC_DESTINO !== val.TF_CC_ORIGEM) {
        valorFinalLanc[Number(val.TF_CC_DESTINO) - 1] =
          valorFinalLanc[Number(val.TF_CC_DESTINO) - 1] + Number(val.TF_VALOR);
        valorFinalLanc[Number(val.TF_CC_ORIGEM) - 1] =
          valorFinalLanc[Number(val.TF_CC_ORIGEM) - 1] - Number(val.TF_VALOR);
      }
      return 0;
    });

    setValorFLancT(valorFinalLanc);
    setValorSaldoT(valorFinalLancSaldo[0]);
    setValorReceitaT(valorFinalLancR[0] / mesesAbertos.length);
    setValorDespesaT(valorFinalLancD[0] / mesesAbertos.length);
    calculaCC();
  };
  //= ======================================================

  React.useEffect(() => {
    if (entradas) {
      setEntradasMes(entradas);
    }
  }, [entradas]);
  React.useEffect(() => {
    if (!open && valorEntradas) {
      setLoading(valorEntradas?.map(() => false));
      setQytLoading(false);
    } else {
      let contQyt = 0;
      for (let i = 0; i < loading.length; i += 1) {
        if (loading[i]) contQyt = +1;
      }
      const t = setTimeout(() => {
        if (contQyt > 0) setQytLoading(true);
      }, 1000);
      return () => clearTimeout(t);
    }
    return 0;
  }, [open]);

  React.useEffect(() => {
    if (tipo === 'LANÇAMENTOS') {
      calculaLancamento();
    }

    if (tipo === 'CONTAS') {
      calculaContasT();
    }

    if (tipo === 'CENTRO DE CUSTO') {
      calculaCCT();
    }
  }, [tipo, entradasT, contConta, entradas]);

  const handleIncConta = () => {
    let contContaAtual = contConta + 1;

    if (contContaAtual > listaTipos.length - 1) contContaAtual = 0;
    setContConta(contContaAtual);
  };
  const handleDecConta = () => {
    let contContaAtual = contConta - 1;

    if (contContaAtual < 0) contContaAtual = listaTipos.length - 1;
    setContConta(contContaAtual);
  };
  const handleDetalhes = (dados) => {
    const filterValor = entradasMes?.filter(
      (val) => val.CAT_NOME === dados.CAT_NOME,
    );
    const detalhes = [];
    filterValor?.map((val, index) => {
      const filterNome = membros?.filter(
        (val2) => val2.RolMembro === Number(val.id_membro),
      );

      detalhes[index] = createDetalhes(
        filterNome.length ? filterNome[0].Nome : val.LANC_DESCRICAO,
        val.LANC_DESCRICAO,
        val.LANC_VALOR,
        val.CAT_NOME,
        val.LANC_DATA,
        val.CT_ID,
        val.CC_ID,
      );

      return 0;
    });
    setDadosFiltrados(detalhes);
    setOpen(true);
  };

  return (
    <Box height="100%">
      <Box height="100%">
        {tipo === 'LANÇAMENTOS' ? (
          <Box height="100%">
            <Box
              bgcolor="#80cbc4"
              sx={{
                fontFamily: 'Roboto',
                borderBottom: '1px solid #000',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
              height="10%"
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
                width="70%"
                sx={{
                  borderRight: '1px solid #000',
                }}
              >
                {' '}
                <ThemeProvider theme={theme}>
                  <Typography variant="hs2">
                    <Box
                      display="flex"
                      justifyContent="center"
                      height={40}
                      width="60vw"
                    >
                      <Box width="100%" display="flex">
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecConta();
                            }}
                          >
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="80%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          color="black"
                          sx={{ fontFamily: 'Fugaz One' }}
                        >
                          {listaTipos[contConta].label.toUpperCase()}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncConta();
                            }}
                          >
                            <BiCaretRight
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                </ThemeProvider>
              </Box>

              <Box textAlign="center" width="30%">
                <ThemeProvider theme={theme}>
                  <Typography variant="hs2">VALOR</Typography>
                </ThemeProvider>
              </Box>
            </Box>

            <TableContainer sx={{ minHeight: 320, height: '90%' }}>
              {valorEntradas && valorEntradas.length ? (
                <Box width="100%" height="100%" fontSize="12px">
                  {valorEntradas?.map((row, index) => (
                    <Box
                      key={index}
                      borderBottom={
                        index < entradasMes.length
                          ? '1px solid #000'
                          : '0px solid #000'
                      }
                      sx={{
                        fontFamily: 'Roboto',
                      }}
                      height="17%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        width="70%"
                        sx={{
                          borderRight: '1px solid #000',
                        }}
                      >
                        {!loading[index] ? (
                          <Box
                            color={row.LANC_TIPO === 'Receita' ? 'blue' : 'red'}
                            onClick={() => {
                              const valLoading = loading;
                              valLoading[index] = true;
                              setLoading(valLoading);

                              handleDetalhes(row);
                            }}
                          >
                            <ThemeProvider theme={theme}>
                              <Typography variant="hs4">
                                {row.CAT_NOME
                                  ? row.CAT_NOME.toUpperCase()
                                  : row.LANC_DESCRICAO.toUpperCase()}
                              </Typography>
                            </ThemeProvider>
                          </Box>
                        ) : (
                          <Box>Processando...</Box>
                        )}
                      </Box>
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        width="30%"
                        sx={{
                          borderRight: '1px solid #000',
                        }}
                      >
                        <Box>
                          {valorFLanc[index] ? (
                            <Box>
                              <ThemeProvider theme={theme}>
                                <Typography variant="hs3">
                                  <Box>
                                    {Number(valorFLanc[index]).toLocaleString(
                                      'pt-br',
                                      {
                                        style: 'currency',
                                        currency: 'BRL',
                                      },
                                    )}
                                  </Box>
                                  <Box>{row.forma_pagamento}</Box>
                                </Typography>
                              </ThemeProvider>
                            </Box>
                          ) : (
                            '-'
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  height="40vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  SEM LANÇAMENTOS NESSE PERÍODO
                </Box>
              )}
            </TableContainer>
            <Dialog fullScreen open={qytLoading}>
              <TabDetalhes
                qytLoading={qytLoading}
                entradas={dadosFiltrados}
                setOpen={setOpen}
              />
            </Dialog>
          </Box>
        ) : (
          <Box height="100%">
            {tipo === 'CENTRO DE CUSTO' ? (
              <Box height="100%">
                <Box
                  bgcolor="#e0e0e0"
                  color="blue"
                  sx={{
                    fontFamily: 'Fugaz One',
                    borderBottom: '1px solid #000',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                  height="10%"
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
                    width="46%"
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                  >
                    {' '}
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs4">
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height={40}
                          width="100%"
                          minWidth={300}
                        >
                          CENTRO DE CUSTO
                        </Box>
                      </Typography>
                    </ThemeProvider>
                  </Box>

                  <Box
                    sx={{
                      borderRight: '1px solid #000',
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="27%"
                    height="100%"
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs4">ENTRADAS MES</Typography>
                    </ThemeProvider>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="27%"
                    height="100%"
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs4">SALDO TOTAL</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>

                <TableContainer sx={{ minHeight: 320, height: '90%' }}>
                  {valorEntradas &&
                  valorEntradas.length &&
                  listaCC &&
                  listaCC.length ? (
                    <Box width="100%" height="100%" fontSize="12px">
                      {listaCC?.map((row, index) => (
                        <Box
                          key={index}
                          borderBottom={
                            index < entradasMes.length
                              ? '1px solid #000'
                              : '0px solid #000'
                          }
                          sx={{
                            fontFamily: 'Roboto',
                          }}
                          height="17%"
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="46%"
                            sx={{
                              borderRight: '1px solid #000',
                            }}
                          >
                            {!loading[index] ? (
                              <Box color="black">
                                <ThemeProvider theme={theme}>
                                  <Typography variant="hs3">
                                    {row.label ? row.label.toUpperCase() : ''}
                                  </Typography>
                                </ThemeProvider>
                              </Box>
                            ) : (
                              <Box>Processando...</Box>
                            )}
                          </Box>
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="27%"
                            sx={{
                              borderRight: '1px solid #000',
                            }}
                          >
                            <Box>
                              {[index] && setValorDespesa ? (
                                <Box>
                                  <ThemeProvider theme={theme}>
                                    <Typography variant="hs3">
                                      <Box>
                                        {Number(valR[index]).toLocaleString(
                                          'pt-br',
                                          {
                                            style: 'currency',
                                            currency: 'BRL',
                                          },
                                        )}
                                      </Box>
                                      <Box color="red">
                                        {Number(valD[index]).toLocaleString(
                                          'pt-br',
                                          {
                                            style: 'currency',
                                            currency: 'BRL',
                                          },
                                        )}
                                      </Box>
                                    </Typography>
                                  </ThemeProvider>
                                </Box>
                              ) : (
                                '-'
                              )}
                            </Box>
                          </Box>
                          <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                            width="27%"
                          >
                            <Box>
                              {valorFLanc[index] ? (
                                <Box>
                                  <ThemeProvider theme={theme}>
                                    <Typography variant="hs3">
                                      <Box>
                                        {Number(
                                          valorFLancT[index],
                                        ).toLocaleString('pt-br', {
                                          style: 'currency',
                                          currency: 'BRL',
                                        })}
                                      </Box>
                                      <Box>{row.forma_pagamento}</Box>
                                    </Typography>
                                  </ThemeProvider>
                                </Box>
                              ) : (
                                '-'
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      height="40vh"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      SEM LANÇAMENTOS NESSE PERÍODO
                    </Box>
                  )}
                </TableContainer>
              </Box>
            ) : (
              <Box height="100%">
                {tipo === 'CONTAS' ? (
                  <Box height="100%">
                    <Box
                      bgcolor="#e0e0e0"
                      color="blue"
                      sx={{
                        fontFamily: 'Fugaz One',
                        borderBottom: '1px solid #000',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                      }}
                      height="10%"
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
                        width="46%"
                        sx={{
                          borderRight: '1px solid #000',
                        }}
                      >
                        {' '}
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              height={40}
                              width="100%"
                              minWidth={300}
                            >
                              CONTAS
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </Box>

                      <Box
                        sx={{
                          borderRight: '1px solid #000',
                        }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="27%"
                        height="100%"
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs3">SALDO MES</Typography>
                        </ThemeProvider>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="27%"
                        height="100%"
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">SALDO TOTAL</Typography>
                        </ThemeProvider>
                      </Box>
                    </Box>

                    <TableContainer sx={{ minHeight: 320, height: '90%' }}>
                      {listaContas && listaContas.length ? (
                        <Box width="100%" height="100%" fontSize="12px">
                          {listaContas?.map((row, index) => (
                            <Box
                              key={index}
                              borderBottom={
                                index < entradasMes.length
                                  ? '1px solid #000'
                                  : '0px solid #000'
                              }
                              sx={{
                                fontFamily: 'Roboto',
                              }}
                              height="17%"
                              width="100%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                textAlign="center"
                                alignItems="center"
                                width="46%"
                                sx={{
                                  borderRight: '1px solid #000',
                                }}
                              >
                                {!loading[index] ? (
                                  <Box color="black">
                                    <ThemeProvider theme={theme}>
                                      <Typography variant="hs3">
                                        {row.label
                                          ? row.label.toUpperCase()
                                          : ''}
                                      </Typography>
                                    </ThemeProvider>
                                  </Box>
                                ) : (
                                  <Box>Processando...</Box>
                                )}
                              </Box>
                              <Box
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                textAlign="center"
                                alignItems="center"
                                width="27%"
                                sx={{
                                  borderRight: '1px solid #000',
                                }}
                              >
                                <Box>
                                  {valorFLanc[index] ? (
                                    <Box>
                                      <ThemeProvider theme={theme}>
                                        <Typography variant="hs3">
                                          <Box>
                                            {Number(
                                              valorFLanc[index],
                                            ).toLocaleString('pt-br', {
                                              style: 'currency',
                                              currency: 'BRL',
                                            })}
                                          </Box>
                                          <Box>{row.forma_pagamento}</Box>
                                        </Typography>
                                      </ThemeProvider>
                                    </Box>
                                  ) : (
                                    '-'
                                  )}
                                </Box>
                              </Box>
                              <Box
                                height="100%"
                                display="flex"
                                justifyContent="center"
                                textAlign="center"
                                alignItems="center"
                                width="27%"
                              >
                                <Box>
                                  {valorFLanc[index] ? (
                                    <Box>
                                      <ThemeProvider theme={theme}>
                                        <Typography variant="hs3">
                                          <Box>
                                            {Number(
                                              valorFLancT[index],
                                            ).toLocaleString('pt-br', {
                                              style: 'currency',
                                              currency: 'BRL',
                                            })}
                                          </Box>
                                          <Box>{row.forma_pagamento}</Box>
                                        </Typography>
                                      </ThemeProvider>
                                    </Box>
                                  ) : (
                                    '-'
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Box
                          height="40vh"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          SEM LANÇAMENTOS NESSE PERÍODO
                        </Box>
                      )}
                    </TableContainer>
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
