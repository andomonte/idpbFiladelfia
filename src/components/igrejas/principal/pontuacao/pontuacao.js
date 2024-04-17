import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { IoClose } from 'react-icons/io5';

import { GiClick } from 'react-icons/gi';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Oval } from 'react-loading-icons';
import ListItemText from '@mui/material/ListItemText';
import { BsFillTrophyFill } from 'react-icons/bs';
import TableContainer from '@mui/material/TableContainer';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import api from 'src/components/services/api';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { BiCaretRight, BiCaretLeft } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grafico from './grafico';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  '@media (min-width:400px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function createListaPosicao(
  Posicao,
  Supervisao,
  Coordenacao,
  distrito,
  Nome,
  Celula,
  Lider,
  Pontos,
  semanas,
  loading,
  loading2,
) {
  return {
    Posicao,
    Supervisao,
    Coordenacao,
    distrito,
    Nome,
    Celula,
    Lider,
    Pontos,
    semanas,
    loading,
    loading2,
  };
}
function createListaNome(
  Supervisao,
  Coordenacao,
  distrito,
  Nome,
  Celula,
  Lider,
  Pontos,
  semanas,
  loading,
  loading2,
) {
  return {
    Supervisao,
    Coordenacao,
    distrito,
    Nome,
    Celula,
    Lider,
    Pontos,
    semanas,
    loading,
    loading2,
  };
}
function createCelulaSelecionada(
  Celula,
  Distrito,
  semanas,
  CelebracaoIgreja,
  CelebracaoLive,
  Discipulados,
  Eventos,
  LeituraBiblica,
  NovoMembro,
  Pontualidade,
  PresentesCelula,
  RelCelebracao,
  RelCelulaFeito,
  RelDiscipulado,
  Relatorio,
  VisitantesCelebracao,
  VisitantesCelula,
  Visitas,
  percCelebracaoIgreja,
  percCelebracaoLive,
  percDiscipulado,
  percLeituraBiblica,
  percPresentes,
  planejamento,
) {
  return {
    Celula,
    Distrito,
    semanas,
    CelebracaoIgreja,
    CelebracaoLive,
    Discipulados,
    Eventos,
    LeituraBiblica,
    NovoMembro,
    Pontualidade,
    PresentesCelula,
    RelCelebracao,
    RelCelulaFeito,
    RelDiscipulado,
    Relatorio,
    VisitantesCelebracao,
    VisitantesCelula,
    Visitas,
    percCelebracaoIgreja,
    percCelebracaoLive,
    percDiscipulado,
    percLeituraBiblica,
    percPresentes,
    planejamento,
  };
}
const OrdenarSemana = (valorAordenar) => {
  if (valorAordenar) {
    valorAordenar.sort((a, b) => {
      if (a.Semana > b.Semana) {
        return 1;
      }
      if (a.Semana < b.Semana) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return valorAordenar;
};

function getPreviousMonday(date) {
  const previousMonday = date;

  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}

const OrdenarSupervisoes = (supervisoesF) => {
  if (supervisoesF && supervisoesF !== 'inicio') {
    supervisoesF.sort((a, b) => {
      if (a.Celula > b.Celula) {
        return 1;
      }
      if (a.Celula < b.Celula) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    supervisoesF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return supervisoesF;
};
const OrdenarCoordenacoes = (coordenacoesF) => {
  if (coordenacoesF.length && coordenacoesF !== 'inicio') {
    coordenacoesF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return coordenacoesF;
};

export default function Pontuacao({
  perfilUser,
  parametros,
  coordenacoes,
  supervisoes,
  celulas,
  lideranca,
  distritos,
}) {
  let newContDistrito = 0;
  let newContCoord = 0;
  let newContSuper = 0;

  if (perfilUser.Funcao === 'PastorDistrito') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Coordenador') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    const newCoord = coordenacoes.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );

    newCoord?.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        newCoord.length > 1
      ) {
        newContCoord = index + 1;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Supervisor') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    const newCoord = coordenacoes.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );

    newCoord.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        newCoord.length > 1
      ) {
        newContCoord = index + 1;
      }
      return 0;
    });

    const newSuper = supervisoes.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao),
    );

    newSuper.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newSuper.length > 1
      ) {
        newContSuper = index + 1;
      }
      return 0;
    });
  }
  const [loading, setLoading] = React.useState(false);
  const [coordF, setCoordF] = React.useState('inicio');
  const [dadosCelula, setDadosCelula] = React.useState('');
  const [superF, setSuperF] = React.useState('inicio');
  const [contNumeroSuper, setContNumeroSuper] = React.useState(newContSuper);
  //  const [celulasF, setCelulaF] = React.useState(0);

  const semanaExata = (dataEnviada) => {
    const Ano = dataEnviada.getFullYear();
    const Mes = dataEnviada.getMonth();
    const Dia = dataEnviada.getDate();
    const firstSun = new Date(2021, 0, 1);
    const lastSun = new Date(Ano, Mes, Dia);

    while (firstSun.getDay() !== 2) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 2) {
      lastSun.setDate(lastSun.getDate() + 1);
    }

    let result = 0;
    for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
      lastSun.setDate(lastSun.getDate() - 7);
      if (i > 52) i = 1;
      result = i;
    }

    return result;
  };

  const [contNumeroDistrito, setContNumeroDistrito] =
    React.useState(newContDistrito);
  const [contNumeroCoord, setContNumeroCoord] = React.useState(newContCoord);

  //= =================================================================
  const [listaFinal, setListaFinal] = React.useState('');
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [semana, setSemana] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);
  const [pontosCelulas, setPontosCelulas] = React.useState(0);
  const [pontosCelulasT, setPontosCelulasT] = React.useState(0);
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  moment(getPreviousMonday(dataAtual2)).format('DD/MM/YYYY');
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [open, setIsPickerOpen] = React.useState(false);
  const [anoI, setAnoI] = React.useState(dataAtual2.getFullYear());

  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
    setSemana(semanaExata(date));
    setAnoI(date.getFullYear());
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };
  const [qtdMembros, setQtdMembros] = React.useState(0);
  const [selectedDate2, setSelectedDate2] = React.useState(dataAtual2);
  const [inputValue2, setInputValue2] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [anoF, setAnoF] = React.useState(dataAtual2.getFullYear());
  const [open2, setIsPickerOpen2] = React.useState(false);

  const handleDateChange2 = (date, value) => {
    setInputValue2(value);
    setSelectedDate2(date);
    setIsPickerOpen2(false);
    setSemanaF(semanaExata(date));
    setAnoF(date.getFullYear());

    // setSemana(semanaExata(dataAtual));
  };

  const distritosT = distritos.filter((val) => val.Status);
  const distritoF = [{ Distrito: 0, Distrito_Nome: 'TODOS OS DISTRITOS' }];
  distritosT.map((val) => distritoF.push(val));

  React.useEffect(() => {
    const coordT = coordenacoes.filter(
      (val) =>
        val.Status &&
        Number(val.Distrito) ===
          Number(distritoF[contNumeroDistrito].Distrito) &&
        val.Status,
    );
    const coordInicial = [
      { coordenacao: 0, Coordenacao_Nome: 'TODAS AS COORDENAÇÕES' },
    ];

    if (contNumeroDistrito !== 0) coordT.map((val) => coordInicial.push(val));
    else coordenacoes.map((val) => coordInicial.push(val));
    if (coordT.length > 1 || !coordT.length)
      setCoordF(OrdenarCoordenacoes(coordInicial));
    else setCoordF(OrdenarCoordenacoes(coordT));
  }, [contNumeroDistrito]);

  React.useEffect(() => {
    if (coordF !== 'inicio') {
      let superT = supervisoes.filter(
        (val) =>
          val.Status &&
          Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
      );

      if (contNumeroCoord !== 0) {
        superT = supervisoes.filter(
          (val) =>
            Number(val.Distrito) === Number(coordF[contNumeroCoord].Distrito) &&
            Number(val.Coordenacao) ===
              Number(coordF[contNumeroCoord].Coordenacao),
        );
      }

      const superInicial = [
        { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
      ];
      if (contNumeroCoord !== 0) superT.map((val) => superInicial.push(val));
      else supervisoes.map((val) => superInicial.push(val));
      if (superT.length > 1 || !superT.length)
        setSuperF(OrdenarSupervisoes(superInicial));
      else setSuperF(OrdenarSupervisoes(superT));
    }
  }, [contNumeroCoord, contNumeroDistrito, coordF]);

  const verPontos = () => {
    setLoading(true);
    api
      .post('/api/consultaPontuacao', {
        semanaI: semana,
        semanaF,
        anoI,
        anoF,
      })
      .then((response) => {
        if (response) {
          const members = response.data;
          let distrito = members;
          if (contNumeroDistrito !== 0) {
            distrito = members?.filter((val2) => val2);
          }
          setPontosCelulasT(distrito);
        }
      })
      .catch((erro) => {
        console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
  };

  React.useEffect(() => {
    if (selectedDate) {
      setSemana(semanaExata(selectedDate));
    }
    if (selectedDate2) {
      setSemanaF(semanaExata(selectedDate2));
    }
  }, [selectedDate2, selectedDate]);
  React.useEffect(() => {
    if (semana) verPontos();
  }, [semana, semanaF]);

  const handleDateClick2 = () => {
    //   setSelectedDate();
    setIsPickerOpen2(true);
  };

  const [PontosCelulaSelecionada, setPontosCelulaSelecionada] =
    React.useState('');

  const handleCheckCelula = async (celulaSelecionada, openD, indexLoading) => {
    const celulaFiltrada = pontosCelulas?.filter(
      (val) =>
        val.Celula === celulaSelecionada.Celula &&
        val.Distrito === celulaSelecionada.distrito,
    );
    setDadosCelula(celulaSelecionada);
    const detalhesPontos = [];
    const pontosTotal = [];

    if (celulaFiltrada.length) {
      celulaFiltrada?.map((val, index) => {
        detalhesPontos[index] = JSON.parse(val.Pontuacao);
        pontosTotal[index] = val.TotalRank;
        return 0;
      });
    }

    const parametrosPontuacao = [
      'CelebracaoIgreja',
      'CelebracaoLive',
      'Discipulados',
      'Eventos',
      'LeituraBiblica',
      'NovoMembro',
      'Pontualidade',
      'PresentesCelula',
      'RelCelebracao',
      'RelCelulaFeito',
      'RelDiscipulado',
      'Relatorio',
      'VisitantesCelebracao',
      'VisitantesCelula',
      'Visitas',
      'percCelebracaoIgreja',
      'percCelebracaoLive',
      'percDiscipulado',
      'percLeituraBiblica',
      'percPresentes',
      'planejamento',
    ];
    if (detalhesPontos.length) {
      const arrayTeste = [];

      for (let i = 0; i < parametrosPontuacao.length; i += 1) {
        arrayTeste[i] = detalhesPontos.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue[parametrosPontuacao[i]],
          0,
          {},
        );
      }
      let qytMembros = 0;

      const nan = String(arrayTeste[15]);
      if (nan === 'NaN') {
        qytMembros = await api
          .post('/api/consultaCelulaParaPontos', {
            semanaI: semana,
            semanaF,
            anoI,
            anoF,
            Celula: celulaSelecionada.Celula,
          })
          .then((response) => {
            if (response) {
              if (response.data.length) {
                const qytMembrosF = JSON.parse(
                  response.data[0].NomesMembros,
                ).length;

                return qytMembrosF;
              }
              return 0;
            }
            return 0;
          })
          .catch((erro) => {
            console.log(erro); //  updateFile(uploadedFile.id, { error: true });
            return 0;
          });

        setQtdMembros(qytMembros);
      } else {
        const qytMembrosTemp = Number(
          (arrayTeste[7] * 10) / arrayTeste[19],
        ).toFixed(0);

        if (qytMembrosTemp === 'NaN') setQtdMembros(0);
        else setQtdMembros(qytMembrosTemp);
      }

      setPontosCelulaSelecionada(
        createCelulaSelecionada(
          celulaSelecionada.Celula,
          celulaSelecionada.distrito,
          celulaSelecionada.semanas,
          arrayTeste[0],
          arrayTeste[1],
          arrayTeste[2],
          arrayTeste[3],
          arrayTeste[4],
          arrayTeste[5],
          arrayTeste[6],
          arrayTeste[7],
          arrayTeste[8],
          arrayTeste[9],
          arrayTeste[10],
          arrayTeste[11],
          arrayTeste[12],
          arrayTeste[13],
          arrayTeste[14],
          String(arrayTeste[15]) !== 'NaN'
            ? arrayTeste[15]
            : parseFloat(
                parseFloat((arrayTeste[0] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[16]) !== 'NaN'
            ? arrayTeste[16]
            : parseFloat(
                parseFloat((arrayTeste[1] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[17]) !== 'NaN'
            ? arrayTeste[17]
            : parseFloat(
                parseFloat((arrayTeste[2] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[18]) !== 'NaN'
            ? arrayTeste[18]
            : parseFloat(
                parseFloat((arrayTeste[4] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[19]) !== 'NaN'
            ? arrayTeste[19]
            : parseFloat(
                parseFloat((arrayTeste[7] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[20]) !== 'NaN' ? arrayTeste[20] : 0,
        ),
      );
      const newLoadingNormal = [...listaFinal];
      newLoadingNormal[indexLoading].loading = false;
      newLoadingNormal[indexLoading].loading2 = false;
      setListaFinal(newLoadingNormal);
      if (openD === 1) setOpenDialog1(true);
      if (openD === 2) setOpenDialog2(true);
    } else {
      const newLoadingNormal = [...listaFinal];
      newLoadingNormal[indexLoading].loading = false;
      newLoadingNormal[indexLoading].loading2 = false;
      setListaFinal(newLoadingNormal);
    }
  };

  const handleIncDistrito = () => {
    let contDistritoAtual = contNumeroDistrito + 1;

    if (contDistritoAtual > distritoF.length - 1) contDistritoAtual = 0;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
  };

  const handleDecDistrito = () => {
    let contDistritoAtual = contNumeroDistrito - 1;

    if (contDistritoAtual < 0) contDistritoAtual = distritoF.length - 1;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
  };

  const handleIncCoord = () => {
    let contCoordAtual = contNumeroCoord + 1;
    if (contCoordAtual > coordF.length - 1) contCoordAtual = 0;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
  };

  const handleDecCoord = () => {
    let contCoordAtual = contNumeroCoord - 1;

    if (contCoordAtual < 0) contCoordAtual = coordF.length - 1;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
  };

  const handleIncSuper = () => {
    let contSuperAtual = contNumeroSuper + 1;
    if (contSuperAtual > superF.length - 1) contSuperAtual = 0;
    setContNumeroSuper(contSuperAtual);
  };

  const handleDecSuper = () => {
    let contSuperAtual = contNumeroSuper - 1;

    if (contSuperAtual < 0) contSuperAtual = superF.length - 1;
    setContNumeroSuper(contSuperAtual);
  };

  React.useEffect(() => {
    if (pontosCelulasT.length) {
      const listaCelulas = [];
      celulas?.map((val2, i1) => {
        listaCelulas[i1] = val2;
        return 0;
      });

      let contPontos = 0;
      const valListaPontos = [];
      listaCelulas?.map((val) => {
        pontosCelulasT?.map((val2) => {
          if (
            val2.Distrito === val.Distrito &&
            val2.Supervisao === val.Supervisao &&
            val2.Celula === val.Celula
          ) {
            valListaPontos[contPontos] = val2;
            contPontos += 1;
          }
          return 0;
        });

        return 0;
      });

      const distritoFT = valListaPontos;

      setPontosCelulas(OrdenarSemana(distritoFT));

      const filteredArr = distritoFT.reduce((acc, current) => {
        const x = acc.find(
          (item) =>
            item.Celula === current.Celula &&
            item.Distrito === current.Distrito,
        );
        if (!x) {
          return acc.concat([current]);
        }
        return acc;
      }, []);

      const pontuacao = [];

      for (let i = 0; i < filteredArr.length; i += 1) {
        let pontosAgora = 0;
        const liderAgora = [];
        let celulaAgora = 0;
        let nomeCelula = 'Sem';
        distritoFT?.map((val) => {
          if (
            val.Celula === filteredArr[i].Celula &&
            val.Distrito === filteredArr[i].Distrito
          ) {
            pontosAgora = Number(
              Number(pontosAgora) + Number(val.TotalRank),
            ).toFixed(2);
            celulaAgora = val.Celula;
          }

          return 0;
        });

        celulas?.map((val) => {
          if (
            val.Celula === filteredArr[i].Celula &&
            val.Distrito === filteredArr[i].Distrito
          ) {
            nomeCelula = val.Nome;
          }

          return 0;
        });
        let indexLider = 0;
        lideranca?.map((val) => {
          if (
            val.Celula === filteredArr[i].Celula &&
            val.Distrito === filteredArr[i].Distrito &&
            val.Funcao === 'Lider'
          ) {
            liderAgora[indexLider] = val.Nome ? val.Nome : 'Sem';
            indexLider += 1;
          }

          return 0;
        });
        const coordAgora = celulas?.filter(
          (val) =>
            val.Distrito === filteredArr[i].Distrito &&
            val.Celula === filteredArr[i].Celula &&
            val.Supervisao === filteredArr[i].Supervisao,
        );

        pontuacao[i] = createListaNome(
          filteredArr[i].Supervisao,
          coordAgora[0].Coordenacao,
          filteredArr[i].Distrito,
          nomeCelula,
          celulaAgora,
          liderAgora[0],
          pontosAgora,
          semanaF - semana + 1,
          false,
          false,
        );
      }

      const newLista = pontuacao.sort((a, b) => b.Pontos - a.Pontos);
      const pontuacao2 = [];
      newLista?.map((val, i) => {
        pontuacao2[i] = createListaPosicao(
          i + 1,
          val.Supervisao,
          val.Coordenacao,
          val.distrito,
          val.Nome,
          val.Celula,
          val.Lider,
          val.Pontos,
          val.semanas,
          val.loading,
          val.loading2,
        );
        return 0;
      });
      let newListaF = pontuacao2;
      if (contNumeroDistrito !== 0) {
        newListaF = pontuacao2.filter(
          (val) => val.distrito === distritoF[contNumeroDistrito].Distrito,
        );
      }

      if (contNumeroCoord !== 0)
        newListaF = pontuacao2?.filter(
          (val) =>
            val.Coordenacao === coordF[contNumeroCoord].Coordenacao &&
            val.distrito === coordF[contNumeroCoord].Distrito,
        );

      if (contNumeroSuper !== 0)
        newListaF = pontuacao2?.filter(
          (val) =>
            val.distrito === superF[contNumeroSuper].Distrito &&
            val.Coordenacao === superF[contNumeroSuper].Coordenacao &&
            val.Supervisao === superF[contNumeroSuper].Supervisao,
        );
      if (
        perfilUser.Funcao === 'Membro' ||
        perfilUser.Funcao === 'Lider' ||
        perfilUser.Funcao === 'Professor'
      ) {
        newListaF = pontuacao2?.filter(
          (val) =>
            val.distrito === Number(perfilUser.Distrito) &&
            val.Coordenacao === Number(perfilUser.Coordenacao) &&
            val.Supervisao === Number(perfilUser.Supervisao) &&
            val.Celula === Number(perfilUser.Celula),
        );
      }

      setLoading(false);
      setListaFinal(newListaF);
    }
  }, [pontosCelulasT, contNumeroCoord, contNumeroDistrito, contNumeroSuper]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
        <Box
          display={perfilUser.Funcao === 'Presidente' ? 'flex' : 'none'}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={1}
          mb={0}
          width="100%"
          height="8%"
        >
          <Box
            borderRadius={16}
            sx={{
              border: '1px solid #000',
            }}
            borderColor="white"
            color="white"
            justifyContent="center"
            width="96%"
            display="flex"
            height={40}
          >
            <Box ml={0} width="100%" display="flex">
              <Box
                width="10%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleDecDistrito();
                  }}
                >
                  <BiCaretLeft size={30} color="white" />
                </IconButton>
              </Box>
              <Box
                width="100%"
                ml={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="12px"
                sx={{ fontFamily: 'Rubik' }}
              >
                <Box fontFamily="arial black" ml={2} mr={2}>
                  {distritoF[contNumeroDistrito].Distrito_Nome}
                </Box>
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
                    handleIncDistrito();
                  }}
                >
                  <BiCaretRight size={30} color="white" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display={
            perfilUser.Funcao === 'Presidente' ||
            perfilUser.Funcao === 'PastorDistrito'
              ? 'flex'
              : 'none'
          }
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={1}
          mb={0}
          width="100%"
          height="8%"
        >
          <Box
            borderRadius={16}
            sx={{
              border: '1px solid #000',
            }}
            borderColor="white"
            color="white"
            justifyContent="center"
            width="96%"
            display="flex"
            height={40}
          >
            <Box ml={0} width="100%" display="flex">
              <Box
                width="10%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleDecCoord();
                  }}
                >
                  <BiCaretLeft size={30} color="white" />
                </IconButton>
              </Box>
              <Box
                width="100%"
                ml={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="12px"
                sx={{ fontFamily: 'Rubik' }}
              >
                <Box fontFamily="arial black" ml={2} mr={2}>
                  {coordF[contNumeroCoord].Coordenacao_Nome}
                </Box>
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
                    handleIncCoord();
                  }}
                >
                  <BiCaretRight size={30} color="white" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display={
            perfilUser.Funcao === 'Presidente' ||
            perfilUser.Funcao === 'PastorDistrito' ||
            perfilUser.Funcao === 'Coordenador'
              ? 'flex'
              : 'none'
          }
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={1}
          mb={2}
          width="100%"
          height="8%"
        >
          <Box
            borderRadius={16}
            sx={{
              border: '1px solid #000',
            }}
            borderColor="white"
            color="white"
            justifyContent="center"
            width="96%"
            display="flex"
            height={40}
          >
            <Box ml={0} width="100%" display="flex">
              <Box
                width="10%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleDecSuper();
                  }}
                >
                  <BiCaretLeft size={30} color="white" />
                </IconButton>
              </Box>
              <Box
                width="100%"
                ml={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="12px"
                sx={{ fontFamily: 'Rubik' }}
              >
                <Box fontFamily="arial black" ml={2} mr={2}>
                  {superF &&
                    superF !== 'inicio' &&
                    superF[contNumeroSuper].Supervisao_Nome.toUpperCase()}
                </Box>
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
                    handleIncSuper();
                  }}
                >
                  <BiCaretRight size={30} color="white" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width="100%"
          height="10%"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <Paper style={{ marginLeft: 10, background: '#fafafa', height: 40 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="center">
                <KeyboardDatePicker
                  open={open}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  id="date-picker-inline"
                  value={selectedDate}
                  inputValue={inputValue}
                  onClick={handleDateClick}
                  onChange={handleDateChange}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    height: 30,
                    background: '#fafafa',
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Paper>
          <Box ml={2} />
          <Paper style={{ marginRight: 10, background: '#fafafa', height: 40 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="center">
                <KeyboardDatePicker
                  open={open2}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  id="date-picker-inline"
                  value={selectedDate2}
                  inputValue={inputValue2}
                  onClick={handleDateClick2}
                  onChange={handleDateChange2}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    height: 30,
                    background: '#fafafa',
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Paper>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          fontFamily="Fugaz One"
          color="white"
          mt={2}
          mb={2}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs4">
              <Box display="flex">
                <Box>RANK ENTRE</Box>
                <Box ml={1} color="yellow">
                  {pontosCelulasT.length}
                </Box>
                <Box ml={1}>CÉLULAS DO TOTAL DE</Box>
                <Box ml={1} color="yellow">
                  {celulas.length}
                </Box>
              </Box>
            </Typography>
          </ThemeProvider>
        </Box>
        {semanaF >= semana ? (
          <TableContainer sx={{ height: '100%' }}>
            {listaFinal && listaFinal.length && !loading ? (
              <List sx={{ width: '100%', maxWidth: 360 }}>
                {listaFinal?.map((row, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar
                      onClick={() => {
                        const newLoadingNormal = [...listaFinal];
                        newLoadingNormal[index].loading = true;
                        setListaFinal(newLoadingNormal);
                        handleCheckCelula(row, 2, index);
                      }}
                    >
                      <BsFillTrophyFill color={corIgreja.button1} size={60} />
                      <Box mt={-7} fontSize={16} fontFamily="arial black">
                        {row.loading ? (
                          <Box ml={3} mt={1} display="flex" alignItems="center">
                            <Oval stroke="red" width={30} height={30} />
                          </Box>
                        ) : (
                          <Box>
                            <Box mt={0} textAlign="center">
                              {row.Posicao}º
                            </Box>
                            <Box ml={2} mt={3}>
                              <GiClick size={25} color="white" />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </ListItemAvatar>
                    <Box>
                      <ListItemText style={{ marginTop: 5 }}>
                        <Box
                          style={{
                            display: 'flex',
                            marginLeft: 10,
                            fontFamily: 'Fugaz One',
                            fontSize: '14px',
                            color: '#FFFF',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            const newLoadingNormal = [...listaFinal];
                            newLoadingNormal[index].loading2 = true;
                            setListaFinal(newLoadingNormal);
                            handleCheckCelula(row, 1, index);
                          }}
                        >
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs2">
                              {row.Nome && row.Nome.length > 25
                                ? row.Nome.substring(0, 25).toUpperCase()
                                : row.Nome.toUpperCase()}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </ListItemText>
                      <ListItemText style={{ marginTop: 2 }}>
                        <Box
                          style={{
                            display: 'flex',
                            marginLeft: 10,
                            fontFamily: 'arial',
                            color: corIgreja.textoP,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            const newLoadingNormal = [...listaFinal];
                            newLoadingNormal[index].loading2 = true;
                            setListaFinal(newLoadingNormal);
                            handleCheckCelula(row, 1, index);
                          }}
                        >
                          <ThemeProvider theme={theme}>
                            <Typography noWrap variant="hs3">
                              {row.Lider ? (
                                <Box>
                                  {row.Lider.length > 25
                                    ? row.Lider.substring(0, 25).toUpperCase()
                                    : row.Lider.toUpperCase()}
                                </Box>
                              ) : (
                                ''
                              )}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                      </ListItemText>
                      <ListItemText style={{ marginTop: -2 }}>
                        <ThemeProvider theme={theme}>
                          <Typography noWrap variant="hs3">
                            <Box
                              style={{
                                display: 'flex',
                                marginLeft: 0,
                                fontFamily: 'Rubik',

                                color: '#FFFF',
                              }}
                            >
                              <Box ml={1.2}>Distrito: </Box>
                              <Box fontFamily="Fugaz One" color="white" ml={1}>
                                {row.distrito && distritoF.length
                                  ? distritoF[row.distrito].Distrito_Nome
                                  : ''}
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </ListItemText>
                      <ListItemText style={{ marginTop: -2 }}>
                        <ThemeProvider theme={theme}>
                          <Typography noWrap variant="hs3">
                            <Box
                              style={{
                                display: 'flex',
                                marginLeft: 0,
                                fontFamily: 'Rubik',

                                color: '#FFFF',
                              }}
                            >
                              <Box ml={1.2}>Célula: </Box>
                              <Box color="yellow" ml={1}>
                                {row.Celula}
                              </Box>
                              <Box
                                onClick={() => {
                                  handleCheckCelula(row, 1, index);
                                }}
                                ml={2}
                                sx={{ cursor: 'pointer' }}
                              >
                                Pontos:
                              </Box>
                              <Box color="yellow" ml={1}>
                                {row.Pontos}
                              </Box>
                              <Box
                                color="yellow"
                                onClick={() => {
                                  handleCheckCelula(row, 1, index);
                                }}
                                ml={2}
                                sx={{ cursor: 'pointer' }}
                              >
                                {row.loading2 ? (
                                  <Box
                                    ml={0}
                                    mt={0}
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
                                  <Box>
                                    <Box
                                      onClick={() => {
                                        const newLoadingNormal = [
                                          ...listaFinal,
                                        ];
                                        newLoadingNormal[index].loading2 = true;
                                        setListaFinal(newLoadingNormal);
                                        handleCheckCelula(row, 1, index);
                                      }}
                                      mt={0.5}
                                    >
                                      <GiClick
                                        size={25}
                                        color={corIgreja.button1}
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Typography>
                        </ThemeProvider>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontFamily="Fugaz one"
                fontSize="22px"
                color="white"
              >
                {loading ? 'BUSCANDO DADOS...' : 'SEM RELATÓRIO'}
              </Box>
            )}
          </TableContainer>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90%"
            fontFamily="Fugaz one"
            fontSize="22px"
            color="white"
          >
            PERÍODO INVÁLIDO
          </Box>
        )}
      </Box>
      <Dialog fullScreen open={openDialog1} TransitionComponent={Transition}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          minHeight={570}
          minWidth={300}
          bgcolor={corIgreja.principal2}
          height="calc(100vh )"
        >
          <Box
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius={16}
            ml={0}
            bgcolor={corIgreja.principal}
          >
            <Box ml={2} height="5%" display="flex" alignItems="start">
              <Box
                display="flex"
                alignItems="center"
                onClick={() => {
                  setOpenDialog1(false);
                }}
              >
                <IoClose size={25} color="white" />
              </Box>
              <ListItem
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box width="100%">
                  <ListItemText style={{ marginTop: -5 }}>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: 0,
                        fontFamily: 'Fugaz One',
                        fontSize: '18px',
                        color: '#FFFF',
                      }}
                    >
                      <Box display="flex">
                        CÉLULA{' '}
                        <Box ml={2} color="yellow">
                          {' '}
                          {PontosCelulaSelecionada.Celula}{' '}
                        </Box>{' '}
                      </Box>
                    </Box>
                  </ListItemText>
                </Box>
              </ListItem>
            </Box>
            <TableContainer sx={{ width: '100%', height: '90%' }}>
              <List
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {PontosCelulaSelecionada && (
                  <Box width="100%">
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#c5e1a5',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              FEZ TODOS OS RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Relatorio}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CÉLULA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelulaFeito >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelCelulaFeito}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CELEBRAÇÃO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelebracao >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelCelebracao}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DE DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelDiscipulado >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.RelDiscipulado}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUALIDADE NA ENTREGA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO DOS RELATÓRIOS
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas *
                                  5 *
                                  (parametros[0].Relatorios / 100).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Relatorio +
                                PontosCelulaSelecionada.RelCelulaFeito +
                                PontosCelulaSelecionada.RelCelebracao +
                                PontosCelulaSelecionada.RelDiscipulado +
                                PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                5 *
                                (parametros[0].Relatorios / 100).toFixed(2)}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#4fc3f7',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÕES
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percPresentes &&
                                PontosCelulaSelecionada.percPresentes >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percPresentes
                                ? Number(
                                    PontosCelulaSelecionada.percPresentes,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                10 *
                                (parametros[0].PresCelulas / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO IGREJA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percCelebracaoIgreja &&
                                PontosCelulaSelecionada.percCelebracaoIgreja >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percCelebracaoIgreja
                                ? Number(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                10 *
                                (parametros[0].PresCelebracao / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO ON-LINE
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color="black"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percCelebracaoLive
                                ? Number(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RECEBEU DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percDiscipulado &&
                                PontosCelulaSelecionada.percDiscipulado >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percDiscipulado
                                ? Number(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                (
                                  (parametros[0].Discipulado * 10) /
                                  100
                                ).toFixed(2)}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              LEITURA BÍBLICA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percLeituraBiblica &&
                                PontosCelulaSelecionada.percLeituraBiblica >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.percLeituraBiblica
                                ? Number(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ).toFixed(2)
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                ((parametros[0].Leitura * 10) / 100).toFixed(2)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ),
                                ).toFixed(2) >=
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelebracao * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Discipulado * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Leitura * 10) /
                                        100
                                      ).toFixed(2),
                                  )
                                  ? // pontos 80% celula, celebração e leitura - online + 50% do discipulado
                                    'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.percCelebracaoIgreja,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ),
                              ).toFixed(2)}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {parseFloat(
                                PontosCelulaSelecionada.semanas *
                                  (
                                    (parametros[0].PresCelulas * 10) /
                                    100
                                  ).toFixed(2),
                              ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2),
                                )}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#ff8a65',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              MÍNIMO
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula &&
                                PontosCelulaSelecionada.VisitantesCelula >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].VisCelula * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelula || '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].VisCelula * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CELEBRAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelebracao &&
                                PontosCelulaSelecionada.VisitantesCelebracao >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].VisCelebracao *
                                        qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelebracao
                                ? PontosCelulaSelecionada.VisitantesCelebracao
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].VisCelebracao * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITA DO LIDER AOS MEMBROS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Visitas &&
                                PontosCelulaSelecionada.Visitas >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Visitas * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Visitas
                                ? PontosCelulaSelecionada.Visitas
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Visitas * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              EVENTO EVANGELISTICO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Eventos &&
                                PontosCelulaSelecionada.Eventos >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Eventos * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.Eventos
                                ? PontosCelulaSelecionada.Eventos
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Eventos * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              NOVO MEMBRO NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.NovoMembro &&
                                PontosCelulaSelecionada.NovoMembro >=
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].NovoMembro * qtdMembros) /
                                      100
                                    ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.NovoMembro
                                ? PontosCelulaSelecionada.NovoMembro
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].NovoMembro * qtdMembros) /
                                100
                              ).toFixed(0) * PontosCelulaSelecionada.semanas}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PLANEJAMENTO DA CÉLULA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.planejamento &&
                                PontosCelulaSelecionada.planejamento >=
                                  Number(
                                    (parametros[0].Planejamento *
                                      PontosCelulaSelecionada.semanas *
                                      10) /
                                      100,
                                  ).toFixed(0)
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.planejamento
                                ? PontosCelulaSelecionada.planejamento
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {(
                                (parametros[0].Planejamento *
                                  PontosCelulaSelecionada.semanas *
                                  10) /
                                100
                              ).toFixed(0)}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula +
                                  PontosCelulaSelecionada.VisitantesCelebracao +
                                  PontosCelulaSelecionada.Visitas +
                                  PontosCelulaSelecionada.Eventos +
                                  PontosCelulaSelecionada.NovoMembro +
                                  PontosCelulaSelecionada.planejamento >=
                                PontosCelulaSelecionada.semanas *
                                  Number(
                                    Number(
                                      (
                                        (parametros[0].VisCelula * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                      Number(
                                        (
                                          (parametros[0].VisCelebracao *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Visitas * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Eventos * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].NovoMembro *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Planejamento * 10) /
                                          100
                                        ).toFixed(0),
                                      ),
                                  )
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.VisitantesCelula +
                                PontosCelulaSelecionada.VisitantesCelebracao +
                                PontosCelulaSelecionada.Visitas +
                                PontosCelulaSelecionada.Eventos +
                                PontosCelulaSelecionada.NovoMembro +
                                PontosCelulaSelecionada.planejamento}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {PontosCelulaSelecionada.semanas *
                                Number(
                                  Number(
                                    (
                                      (parametros[0].VisCelula * qtdMembros) /
                                      100
                                    ).toFixed(0),
                                  ) +
                                    Number(
                                      (
                                        (parametros[0].VisCelebracao *
                                          qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Visitas * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Eventos * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].NovoMembro *
                                          qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                    Number(
                                      (
                                        (parametros[0].Planejamento * 10) /
                                        100
                                      ).toFixed(0),
                                    ),
                                )}
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#ffeb3b',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              TOTAL GERAL
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelula,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.VisitantesCelebracao,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoIgreja,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Visitas,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Eventos,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.NovoMembro,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.planejamento,
                                    ) +
                                    PontosCelulaSelecionada.Relatorio +
                                    PontosCelulaSelecionada.RelCelulaFeito +
                                    PontosCelulaSelecionada.RelCelebracao +
                                    PontosCelulaSelecionada.RelDiscipulado +
                                    PontosCelulaSelecionada.Pontualidade,
                                ).toFixed(2) >=
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    5 *
                                    (parametros[0].Relatorios / 100).toFixed(2),
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelulas * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].PresCelebracao * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Discipulado * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.semanas *
                                      (
                                        (parametros[0].Leitura * 10) /
                                        100
                                      ).toFixed(2),
                                  ) +
                                  PontosCelulaSelecionada.semanas *
                                    Number(
                                      Number(
                                        (
                                          (parametros[0].VisCelula *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                        Number(
                                          (
                                            (parametros[0].VisCelebracao *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Visitas *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Eventos *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].NovoMembro *
                                              qtdMembros) /
                                            100
                                          ).toFixed(0),
                                        ) +
                                        Number(
                                          (
                                            (parametros[0].Planejamento * 10) /
                                            100
                                          ).toFixed(0),
                                        ),
                                    )
                                  ? 'blue'
                                  : 'red'
                              }
                              fontSize="14px"
                            >
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.VisitantesCelula,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelebracao,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ) +
                                  parseFloat(PontosCelulaSelecionada.Visitas) +
                                  parseFloat(PontosCelulaSelecionada.Eventos) +
                                  parseFloat(
                                    PontosCelulaSelecionada.NovoMembro,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.planejamento,
                                  ) +
                                  PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade,
                              ).toFixed(2)}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {parseFloat(
                                PontosCelulaSelecionada.semanas *
                                  5 *
                                  (parametros[0].Relatorios / 100).toFixed(2),
                              ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelulas * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].PresCelebracao * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Discipulado * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                parseFloat(
                                  PontosCelulaSelecionada.semanas *
                                    (
                                      (parametros[0].Leitura * 10) /
                                      100
                                    ).toFixed(2),
                                ) +
                                PontosCelulaSelecionada.semanas *
                                  Number(
                                    Number(
                                      (
                                        (parametros[0].VisCelula * qtdMembros) /
                                        100
                                      ).toFixed(0),
                                    ) +
                                      Number(
                                        (
                                          (parametros[0].VisCelebracao *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Visitas * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Eventos * qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].NovoMembro *
                                            qtdMembros) /
                                          100
                                        ).toFixed(0),
                                      ) +
                                      Number(
                                        (
                                          (parametros[0].Planejamento * 10) /
                                          100
                                        ).toFixed(0),
                                      ),
                                  )}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                  </Box>
                )}
              </List>
            </TableContainer>
          </Box>{' '}
        </Box>
      </Dialog>
      <Dialog fullScreen open={openDialog2} TransitionComponent={Transition}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          minHeight={570}
          minWidth={300}
          bgcolor={corIgreja.principal2}
          height="calc(100vh )"
        >
          <Box
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius={16}
            ml={0}
            bgcolor={corIgreja.principal}
          >
            <Box ml={2} height="5%" display="flex" alignItems="start">
              <Box
                display="flex"
                alignItems="center"
                onClick={() => {
                  setOpenDialog2(false);
                }}
              >
                <IoClose size={25} color="white" />
              </Box>
              <ListItem
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box width="100%">
                  <ListItemText style={{ marginTop: -5 }}>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: 0,
                        fontFamily: 'Fugaz One',
                        fontSize: '18px',
                        color: '#FFFF',
                      }}
                    >
                      <Box display="flex">
                        CÉLULA{' '}
                        <Box ml={2} color="yellow">
                          {PontosCelulaSelecionada.Celula}{' '}
                        </Box>{' '}
                      </Box>
                    </Box>
                  </ListItemText>
                </Box>
              </ListItem>
            </Box>
            <TableContainer
              sx={{ background: 'white', width: '100%', height: '90%' }}
            >
              {distritoF && coordF ? (
                <Grafico
                  dadosCelula={dadosCelula}
                  parametros={parametros}
                  dados={PontosCelulaSelecionada}
                  qtdMembros={qtdMembros}
                  semana={semana}
                  pontosCelulas={pontosCelulas}
                  ano={anoF}
                  distritos={distritoF}
                />
              ) : null}
            </TableContainer>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
