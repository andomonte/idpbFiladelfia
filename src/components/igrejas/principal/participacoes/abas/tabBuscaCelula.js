import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ConverteData2 from 'src/utils/convData2';
import PegaMes from 'src/utils/getMes2';
import PegaSemana from 'src/utils/getSemana';
import { Box } from '@material-ui/core';
import Meses from 'src/utils/mesesAbrev';
import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { MdOutlineCheck, MdClose } from 'react-icons/md';
import { FcSearch } from 'react-icons/fc';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';
import CalcularPontuacao from './calcularPontuacao';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function createPontuacaoFinal(
  Posicao,
  Celula,
  Distrito,
  TotalRank,
  Semana,
  Pontuacao,
  Ano,
  Total,
) {
  return {
    Posicao,
    Celula,
    Distrito,
    TotalRank,
    Semana,
    Pontuacao,
    Ano,
    Total,
  };
}

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [openPontuacao, setOpenPontuacao] = React.useState(false);
  const [semana, setSemana] = React.useState(PegaSemana(Mes, Ano));

  const [pontos, setPontos] = React.useState([]);

  const [celula, setCelula] = React.useState([]);

  // para usar semanas

  //  const dataEventoRef = React.useRef();
  //-------------------

  const [dataSem0, setDataSem0] = React.useState([]);
  const [dataSem1, setDataSem1] = React.useState([]);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [dataSem5, setDataSem5] = React.useState([]);

  const [preSem0, setPreSem0] = React.useState('-');
  const [preSem1, setPreSem1] = React.useState('-');
  const [preSem2, setPreSem2] = React.useState('-');
  const [preSem3, setPreSem3] = React.useState('-');
  const [preSem4, setPreSem4] = React.useState('-');
  const [preSem5, setPreSem5] = React.useState('-');

  const [preSem0C, setPreSem0C] = React.useState('-');
  const [preSem1C, setPreSem1C] = React.useState('-');
  const [preSem2C, setPreSem2C] = React.useState('-');
  const [preSem3C, setPreSem3C] = React.useState('-');
  const [preSem4C, setPreSem4C] = React.useState('-');
  const [preSem5C, setPreSem5C] = React.useState('-');

  const [preSem0D, setPreSem0D] = React.useState('-');
  const [preSem1D, setPreSem1D] = React.useState('-');
  const [preSem2D, setPreSem2D] = React.useState('-');
  const [preSem3D, setPreSem3D] = React.useState('-');
  const [preSem4D, setPreSem4D] = React.useState('-');
  const [preSem5D, setPreSem5D] = React.useState('-');

  const [dataSem0Celebracao, setDataSem0Celebracao] = React.useState([]);
  const [dataSem1Celebracao, setDataSem1Celebracao] = React.useState([]);
  const [dataSem2Celebracao, setDataSem2Celebracao] = React.useState([]);
  const [dataSem3Celebracao, setDataSem3Celebracao] = React.useState([]);
  const [dataSem4Celebracao, setDataSem4Celebracao] = React.useState([]);
  const [dataSem5Celebracao, setDataSem5Celebracao] = React.useState([]);

  const [dataSem0Discipulado, setDataSem0Discipulado] = React.useState([]);
  const [dataSem1Discipulado, setDataSem1Discipulado] = React.useState([]);
  const [dataSem2Discipulado, setDataSem2Discipulado] = React.useState([]);
  const [dataSem3Discipulado, setDataSem3Discipulado] = React.useState([]);
  const [dataSem4Discipulado, setDataSem4Discipulado] = React.useState([]);
  const [dataSem5Discipulado, setDataSem5Discipulado] = React.useState([]);

  const [dataRSem0, setDataRSem0] = React.useState([]);
  const [dataRSem1, setDataRSem1] = React.useState([]);
  const [dataRSem2, setDataRSem2] = React.useState([]);
  const [dataRSem3, setDataRSem3] = React.useState([]);
  const [dataRSem4, setDataRSem4] = React.useState([]);
  const [dataRSem5, setDataRSem5] = React.useState([]);

  // para usar semanas
  let semana0 = semana - 1;

  let AnoPesquisado = Ano;
  if (semana0 < 1) {
    semana0 = 52;
    AnoPesquisado = Ano - 1;
  }
  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;
  const mesSemana5 = PegaMes(semana5, Ano);
  const mes = Meses();

  let mesAnterior = Mes - 1;
  if (mesAnterior < 0) mesAnterior = 11;

  const semAnterior = <Box>SEMANA ANTERIOR</Box>;
  const sem1Mes = (
    <Box>
      SEMANA 1
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem2Mes = (
    <Box>
      SEMANA 2
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem3Mes = (
    <Box>
      SEMANA 3
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );
  const sem4Mes = (
    <Box>
      SEMANA 4
      <Box>
        {mes[Mes].descricao.toUpperCase()} / {Ano}
      </Box>
    </Box>
  );

  const sem5Mes =
    mesSemana5 === Mes ? (
      <Box>
        SEMANA 5
        <Box>
          {mes[Mes].descricao.toUpperCase()} / {Ano}
        </Box>
      </Box>
    ) : (
      <Box>SEMANA SEGUINTE</Box>
    );

  const url0 = `/api/consultaRelatorioCelulasAno2/${semana0}/${AnoPesquisado}`;
  const { data: sem0, errorSem0 } = useSWR(url0, fetcher);
  const url1 = `/api/consultaPontuacaoSemanaAno/${semana0}/${AnoPesquisado}`;
  const { data: pontos2, errorPontos2 } = useSWR(url1, fetcher);

  const url2 = `/api/consultaRelatorioCelebracaoAno2/${semana0}/${AnoPesquisado}`;
  const { data: sem0Celebracao, errorSem0Celebracao } = useSWR(url2, fetcher);

  const url3 = `/api/consultaRelatorioDiscipuladoAno2/${semana0}/${AnoPesquisado}`;
  const { data: sem0Discipulado, errorSem0Discipulado } = useSWR(url3, fetcher);

  React.useEffect(() => {
    const novaSemana = PegaSemana(Mes, Ano);

    setSemana(novaSemana);
  }, [Mes, Ano]);

  React.useEffect(() => {
    mutate(url0);
    mutate(url1);

    setDataSem0([]);
    setDataSem1([]);
    setDataSem2([]);
    setDataSem3([]);
    setDataSem4([]);
    setDataSem5([]);

    setDataRSem0([]);
    setDataRSem1([]);
    setDataRSem2([]);
    setDataRSem3([]);
    setDataRSem4([]);
    setDataRSem5([]);
  }, [semana]);

  React.useEffect(() => {
    mutate(url1);
    mutate(url2);
    mutate(url0);

    setDataSem0Celebracao([]);
    setDataSem1Celebracao([]);
    setDataSem2Celebracao([]);
    setDataSem3Celebracao([]);
    setDataSem4Celebracao([]);
    setDataSem5Celebracao([]);

    setDataRSem0([]);
    setDataRSem1([]);
    setDataRSem2([]);
    setDataRSem3([]);
    setDataRSem4([]);
    setDataRSem5([]);
  }, [semana]);

  React.useEffect(() => {
    mutate(url1);
    mutate(url2);
    mutate(url0);
    mutate(url3);

    setDataSem0Discipulado([]);
    setDataSem1Discipulado([]);
    setDataSem2Discipulado([]);
    setDataSem3Discipulado([]);
    setDataSem4Discipulado([]);
    setDataSem5Discipulado([]);

    setPreSem0('-');
    setPreSem1('-');
    setPreSem2('-');
    setPreSem3('-');
    setPreSem4('-');
    setPreSem5('-');

    setPreSem0C('-');
    setPreSem1C('-');
    setPreSem2C('-');
    setPreSem3C('-');
    setPreSem4C('-');
    setPreSem5C('-');

    setPreSem0D('-');
    setPreSem1D('-');
    setPreSem2D('-');
    setPreSem3D('-');
    setPreSem4D('-');
    setPreSem5D('-');

    setDataRSem0([]);
    setDataRSem1([]);
    setDataRSem2([]);
    setDataRSem3([]);
    setDataRSem4([]);
    setDataRSem5([]);
  }, [semana]);

  React.useEffect(() => {
    if (sem0 && sem0.length) {
      const presCelula = sem0.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      const presCelulaSem0 = sem0.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Semana === semana0,
      );

      if (presCelulaSem0.length && presCelulaSem0[0].Semana === semana0) {
        setDataSem0(presCelulaSem0[0]);
        const nomes = JSON.parse(presCelulaSem0[0].NomesMembros);
        const nome = nomes.filter((valor) => valor.Nome === perfilUser.Nome);

        if (nome.length) {
          setPreSem0(nome[0].Presenca);
        } else setPreSem0('-');
      }

      if (presCelula.length) {
        presCelula.map((val) => {
          const pegaAtual = PegaSemanaAtual(val.Data);

          let mesSem0 = PegaMes(semana0, AnoPesquisado);
          if (mesSem0 + 1 === 12) mesSem0 = 1;

          if (Mes === 0) {
            setDataSem0('-');
            setPreSem0('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano)) {
            setDataSem1(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem1(nome[0].Presenca);
            } else setPreSem1('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 1) {
            setDataSem2(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem2(nome[0].Presenca);
            } else setPreSem2('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 2) {
            setDataSem3(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem3(nome[0].Presenca);
            } else setPreSem3('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 3) {
            setDataSem4(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem4(nome[0].Presenca);
            } else setPreSem4('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 3) setDataSem4(val);
          if (pegaAtual === PegaSemana(Mes, Ano) + 4) {
            setDataSem5(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem5(nome[0].Presenca);
            } else setPreSem5('-');
          }
          return 0;
        });
      }
    }
    if (errorSem0) return <div>An error occured.</div>;
    if (!sem0) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem0, semana]);

  React.useEffect(() => {
    if (sem0Celebracao && sem0Celebracao.length) {
      const presCelula = sem0Celebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );
      const presCelulaSem0 = sem0Celebracao.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Semana === semana0,
      );

      if (presCelulaSem0.length && presCelulaSem0[0].Semana === semana0) {
        setDataSem0Celebracao(presCelulaSem0[0]);
        const nomes = JSON.parse(presCelulaSem0[0].NomesMembros);
        const nome = nomes.filter((valor) => valor.Nome === perfilUser.Nome);

        if (nome.length) {
          setPreSem0C(nome[0].Presenca);
        } else setPreSem0C('-');
      }

      if (presCelula.length) {
        presCelula.map((val) => {
          const pegaAtual = PegaSemanaAtual(val.Data);

          let mesSem0 = PegaMes(semana0, AnoPesquisado);
          if (mesSem0 + 1 === 12) mesSem0 = 1;

          if (Mes === 0) {
            setPreSem0C('-');
            setDataSem0Celebracao('-');
          }

          if (pegaAtual === PegaSemana(Mes, Ano)) {
            setDataSem1Celebracao(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem1C(nome[0].Presenca);
            } else setPreSem1C('-');
          }

          if (pegaAtual === PegaSemana(Mes, Ano) + 1) {
            setDataSem2Celebracao(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem2C(nome[0].Presenca);
            } else setPreSem2C('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 2) {
            setDataSem3Celebracao(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem3C(nome[0].Presenca);
            } else setPreSem3C('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 3) {
            setDataSem4Celebracao(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem4C(nome[0].Presenca);
            } else setPreSem4C('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 4) {
            setDataSem5Celebracao(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem5C(nome[0].Presenca);
            } else setPreSem5C('-');
          }
          return 0;
        });
      }
    }
    if (errorSem0Celebracao) return <div>An error occured.</div>;
    if (!sem0Celebracao) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem0Celebracao, semana]);

  React.useEffect(() => {
    if (sem0Discipulado && sem0Discipulado.length) {
      const presCelula = sem0Discipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      const presCelulaSem0 = sem0Discipulado.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          val.Semana === semana0,
      );

      if (presCelulaSem0.length && presCelulaSem0[0].Semana === semana0) {
        setDataSem0Discipulado(presCelulaSem0[0]);
        const nomes = JSON.parse(presCelulaSem0[0].NomesMembros);
        const nome = nomes.filter((valor) => valor.Nome === perfilUser.Nome);

        if (nome.length) {
          setPreSem0D(nome[0].Presenca);
        } else setPreSem0D('-');
      }

      if (presCelula.length) {
        presCelula.map((val) => {
          const pegaAtual = PegaSemanaAtual(val.Data);

          let mesSem0 = PegaMes(semana0, AnoPesquisado);
          if (mesSem0 + 1 === 12) mesSem0 = 1;

          if (Mes === 0) {
            setPreSem0D('-');
            setDataSem0Discipulado('-');
          }

          if (pegaAtual === PegaSemana(Mes, Ano)) {
            setDataSem1Discipulado(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem1D(nome[0].Presenca);
            } else setPreSem1D('-');
          }

          if (pegaAtual === PegaSemana(Mes, Ano) + 1) {
            setDataSem2Discipulado(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem2D(nome[0].Presenca);
            } else setPreSem2D('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 2) {
            setDataSem3Discipulado(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem3D(nome[0].Presenca);
            } else setPreSem3D('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 3) {
            setDataSem4Discipulado(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem4D(nome[0].Presenca);
            } else setPreSem4D('-');
          }
          if (pegaAtual === PegaSemana(Mes, Ano) + 4) {
            setDataSem5Discipulado(val);
            const nomes = JSON.parse(val.NomesMembros);
            const nome = nomes.filter(
              (valor) => valor.Nome === perfilUser.Nome,
            );

            if (nome.length) {
              setPreSem5D(nome[0].Presenca);
            } else setPreSem5D('-');
          }
          return 0;
        });
      }
    }
    if (errorSem0Discipulado) return <div>An error occured.</div>;
    if (!sem0Discipulado) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem0Discipulado, semana]);

  React.useEffect(() => {
    if (pontos2 && pontos2.length) {
      const rSem0 = [];
      const rSem1 = [];
      const rSem2 = [];
      const rSem3 = [];
      const rSem4 = [];
      const rSem5 = [];

      pontos2.map((val, index) => {
        if (
          val.Semana === semana0 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem0[index] = val;
        if (
          val.Semana === semana1 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem1[index] = val;
        if (
          val.Semana === semana2 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem2[index] = val;
        if (
          val.Semana === semana3 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem3[index] = val;
        if (
          val.Semana === semana4 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem4[index] = val;
        if (
          val.Semana === semana5 &&
          val.Distrito === Number(perfilUser.Distrito)
        )
          rSem5[index] = val;
        return 0;
      });
      if (rSem0) {
        const rOrderSem0 = rSem0.sort((a, b) => {
          if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
          if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
          return 0;
        });

        const Ranking = rOrderSem0.map((rol, index) =>
          createPontuacaoFinal(
            index + 1,
            rol.Celula,
            rol.Distrito,
            rol.TotalRank,
            rol.Semana,
            rol.Pontuacao,
            AnoPesquisado,
            rol.Total,
          ),
        );
        setDataRSem0(
          Ranking.filter(
            (val) =>
              Number(val.Celula) === Number(perfilUser.Celula) &&
              val.Distrito === Number(perfilUser.Distrito),
          ),
        );
      }
      //-------------------------------------------------------------
      // Rank da Semana 1
      //------------------------------------------------------------

      const rOrderSem1 = rSem1.sort((a, b) => {
        if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
        if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
        return 0;
      });

      const Ranking1 = rOrderSem1.map((rol, index) =>
        createPontuacaoFinal(
          index + 1,
          rol.Celula,
          rol.Distrito,
          rol.TotalRank,
          rol.Semana,
          rol.Pontuacao,
          AnoPesquisado,
          rol.Total,
        ),
      );
      setDataRSem1(
        Ranking1.filter(
          (val) =>
            Number(val.Celula) === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito),
        ),
      );

      //= ===========================================================

      //-------------------------------------------------------------
      // Rank da Semana 2
      //------------------------------------------------------------

      const rOrderSem2 = rSem2.sort((a, b) => {
        if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
        if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
        return 0;
      });

      const Ranking2 = rOrderSem2.map((rol, index) =>
        createPontuacaoFinal(
          index + 1,
          rol.Celula,
          rol.Distrito,
          rol.TotalRank,
          rol.Semana,
          rol.Pontuacao,
          AnoPesquisado,
          rol.Total,
        ),
      );
      setDataRSem2(
        Ranking2.filter(
          (val) =>
            Number(val.Celula) === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito),
        ),
      );

      //= ===========================================================

      //-------------------------------------------------------------
      // Rank da Semana 3
      //------------------------------------------------------------

      const rOrderSem3 = rSem3.sort((a, b) => {
        if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
        if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
        return 0;
      });

      const Ranking3 = rOrderSem3.map((rol, index) =>
        createPontuacaoFinal(
          index + 1,
          rol.Celula,
          rol.Distrito,
          rol.TotalRank,
          rol.Semana,
          rol.Pontuacao,
          AnoPesquisado,
          rol.Total,
        ),
      );
      setDataRSem3(
        Ranking3.filter(
          (val) =>
            Number(val.Celula) === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito),
        ),
      );

      //= ===========================================================

      //-------------------------------------------------------------
      // Rank da Semana 4
      //------------------------------------------------------------

      const rOrderSem4 = rSem4.sort((a, b) => {
        if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
        if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
        return 0;
      });

      const Ranking4 = rOrderSem4.map((rol, index) =>
        createPontuacaoFinal(
          index + 1,
          rol.Celula,
          rol.Distrito,
          rol.TotalRank,
          rol.Semana,
          rol.Pontuacao,
          AnoPesquisado,
          rol.Total,
        ),
      );
      setDataRSem4(
        Ranking4.filter(
          (val) =>
            Number(val.Celula) === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito),
        ),
      );

      //= ===========================================================

      //-------------------------------------------------------------
      // Rank da Semana 5
      //------------------------------------------------------------

      const rOrderSem5 = rSem5.sort((a, b) => {
        if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
        if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
        return 0;
      });

      const Ranking5 = rOrderSem5.map((rol, index) =>
        createPontuacaoFinal(
          index + 1,
          rol.Celula,
          rol.Distrito,
          rol.TotalRank,
          rol.Semana,
          rol.Pontuacao,
          AnoPesquisado,
          rol.Total,
        ),
      );
      setDataRSem5(
        Ranking5.filter(
          (val) =>
            Number(val.Celula) === Number(perfilUser.Celula) &&
            val.Distrito === Number(perfilUser.Distrito),
        ),
      );

      //= ===========================================================
    }
    if (errorPontos2) return <div>An error occured.</div>;
    if (!pontos2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos2, semana]);

  //------------------
  //= ========================================================================
  // data de inicio
  //= ========================================================================

  //= ========================================================================

  return (
    <Box height="100%" fontSize="11px">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="12%"
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
          SEMANA
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
          RANK
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
        >
          CÉLULA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          CELEB.
        </Box>
        <Box textAlign="center" width="20%">
          DISCIP.
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#eaeaea"
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
          width="25%"
        >
          {semAnterior || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);

                if (dataSem0.CriadoPor) setCelula(dataSem0);
                if (dataSem0Celebracao.CriadoPor) setCelula(dataSem0Celebracao);
                if (dataSem0Discipulado.CriadoPor)
                  setCelula(dataSem0Discipulado);
                setPontos(dataRSem0[0]);
              }}
            >
              {(dataSem0.CriadoPor ||
                dataSem0Celebracao.CriadoPor ||
                dataSem0Discipulado.CriadoPor) &&
              dataRSem0.length &&
              dataRSem0[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem0.length && dataRSem0[0]
                      ? `${dataRSem0[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem0 !== '-' ? (
                        <Box width="100%">
                          {preSem0 ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem0 && dataSem0.Data
                  ? ConverteData2(dataSem0.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem0C !== '-' ? (
                        <Box width="100%">
                          {preSem0C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem0Celebracao && dataSem0Celebracao.Data
                  ? ConverteData2(dataSem0Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem0D !== '-' ? (
                        <Box width="100%">
                          {preSem0D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem0Discipulado && dataSem0Discipulado.Data
                  ? ConverteData2(dataSem0Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f9fbe7"
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
          width="25%"
        >
          {sem1Mes || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);
                if (dataSem1.CriadoPor) setCelula(dataSem1);
                if (dataSem1Celebracao.CriadoPor) setCelula(dataSem1Celebracao);
                if (dataSem1Discipulado.CriadoPor)
                  setCelula(dataSem1Discipulado);

                setPontos(dataRSem1[0]);
              }}
            >
              {(dataSem1.CriadoPor ||
                dataSem1Celebracao.CriadoPor ||
                dataSem1Discipulado.CriadoPor) &&
              dataRSem1.length &&
              dataRSem1[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem1.length && dataRSem1[0]
                      ? `${dataRSem1[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem1 !== '-' ? (
                        <Box width="100%">
                          {preSem1 ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem1 && dataSem1.Data
                  ? ConverteData2(dataSem1.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem1C !== '-' ? (
                        <Box width="100%">
                          {preSem1C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem1Celebracao && dataSem1Celebracao.Data
                  ? ConverteData2(dataSem1Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem1D !== '-' ? (
                        <Box width="100%">
                          {preSem1D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem1Discipulado && dataSem1Discipulado.Data
                  ? ConverteData2(dataSem1Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f9fbe7"
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
          width="25%"
        >
          {sem2Mes || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);
                if (dataSem2.CriadoPor) setCelula(dataSem2);
                if (dataSem2Celebracao.CriadoPor) setCelula(dataSem2Celebracao);
                if (dataSem2Discipulado.CriadoPor)
                  setCelula(dataSem2Discipulado);

                setPontos(dataRSem2[0]);
              }}
            >
              {(dataSem2.CriadoPor ||
                dataSem2Celebracao.CriadoPor ||
                dataSem2Discipulado.CriadoPor) &&
              dataRSem2.length &&
              dataRSem2[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem2.length && dataRSem2[0]
                      ? `${dataRSem2[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                      >
                        {preSem2 !== '-' ? (
                          <Box width="100%">
                            {preSem2 ? (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                {' '}
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdOutlineCheck size={25} color="green" />
                                </SvgIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdClose size={25} color="red" />
                                </SvgIcon>
                              </IconButton>
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
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem2 && dataSem2.Data
                  ? ConverteData2(dataSem2.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem2C !== '-' ? (
                        <Box width="100%">
                          {preSem2C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem2Celebracao && dataSem2Celebracao.Data
                  ? ConverteData2(dataSem2Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem2D !== '-' ? (
                        <Box width="100%">
                          {preSem2D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem2Discipulado && dataSem2Discipulado.Data
                  ? ConverteData2(dataSem2Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f9fbe7"
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
          width="25%"
        >
          {sem3Mes || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);
                if (dataSem3.CriadoPor) setCelula(dataSem3);
                if (dataSem3Celebracao.CriadoPor) setCelula(dataSem3Celebracao);
                if (dataSem3Discipulado.CriadoPor)
                  setCelula(dataSem3Discipulado);

                setPontos(dataRSem3[0]);
              }}
            >
              {(dataSem3.CriadoPor ||
                dataSem3Celebracao.CriadoPor ||
                dataSem3Discipulado.CriadoPor) &&
              dataRSem3.length &&
              dataRSem3[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem3.length && dataRSem3[0]
                      ? `${dataRSem3[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                      >
                        {preSem3 !== '-' ? (
                          <Box width="100%">
                            {preSem3 ? (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                {' '}
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdOutlineCheck size={25} color="green" />
                                </SvgIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdClose size={25} color="red" />
                                </SvgIcon>
                              </IconButton>
                            )}
                          </Box>
                        ) : (
                          '-'
                        )}
                      </Box>{' '}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem3 && dataSem3.Data
                  ? ConverteData2(dataSem3.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem3C !== '-' ? (
                        <Box width="100%">
                          {preSem3C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem3Celebracao && dataSem3Celebracao.Data
                  ? ConverteData2(dataSem3Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem3D !== '-' ? (
                        <Box width="100%">
                          {preSem3D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem3Discipulado && dataSem3Discipulado.Data
                  ? ConverteData2(dataSem3Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#f9fbe7"
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
          width="25%"
        >
          {sem4Mes || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);
                if (dataSem4.CriadoPor) setCelula(dataSem4);
                if (dataSem4Celebracao.CriadoPor) setCelula(dataSem4Celebracao);
                if (dataSem4Discipulado.CriadoPor)
                  setCelula(dataSem4Discipulado);

                setPontos(dataRSem4[0]);
              }}
            >
              {(dataSem4.CriadoPor ||
                dataSem4Celebracao.CriadoPor ||
                dataSem4Discipulado.CriadoPor) &&
              dataRSem4.length &&
              dataRSem4[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem4.length && dataRSem4[0]
                      ? `${dataRSem4[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                      >
                        {preSem4 !== '-' ? (
                          <Box width="100%">
                            {preSem4 ? (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                {' '}
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdOutlineCheck size={25} color="green" />
                                </SvgIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdClose size={25} color="red" />
                                </SvgIcon>
                              </IconButton>
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
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem4 && dataSem4.Data
                  ? ConverteData2(dataSem4.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem4C !== '-' ? (
                        <Box width="100%">
                          {preSem4C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem4Celebracao && dataSem4Celebracao.Data
                  ? ConverteData2(dataSem4Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem4D !== '-' ? (
                        <Box width="100%">
                          {preSem4D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem4Discipulado && dataSem4Discipulado.Data
                  ? ConverteData2(dataSem4Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        bgcolor="#eaeaea"
        height="14.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
        >
          {sem5Mes || '-'}
        </Box>
        {sem0 ? (
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
            <Box
              onClick={() => {
                setOpenPontuacao(true);
                if (dataSem5.CriadoPor) setCelula(dataSem5);
                if (dataSem5Celebracao.CriadoPor) setCelula(dataSem5Celebracao);
                if (dataSem5Discipulado.CriadoPor)
                  setCelula(dataSem5Discipulado);

                setPontos(dataRSem5[0]);
              }}
            >
              {(dataSem5.CriadoPor ||
                dataSem5Celebracao.CriadoPor ||
                dataSem5Discipulado.CriadoPor) &&
              dataRSem5.length &&
              dataRSem5[0].Posicao ? (
                <Box>
                  <Box fontSize="16px" color="blue" mt={1}>
                    {dataRSem5.length && dataRSem5[0]
                      ? `${dataRSem5[0].Posicao}°`
                      : '-'}
                  </Box>
                  <Box fontSize="12px" color="#781080" mt={1}>
                    <Box
                      height="100%"
                      mt={0.2}
                      display="flex"
                      justifyContent="center"
                      fontFamily="Fugaz One"
                      alignItems="center"
                    >
                      <FcSearch size={20} />
                    </Box>
                  </Box>
                </Box>
              ) : (
                '-'
              )}
            </Box>
          </Box>
        ) : (
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
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                      >
                        {preSem5 !== '-' ? (
                          <Box width="100%">
                            {preSem5 ? (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                {' '}
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdOutlineCheck size={25} color="green" />
                                </SvgIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                  <MdClose size={25} color="red" />
                                </SvgIcon>
                              </IconButton>
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
                    textAlign="center"
                    width="100%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem5 && dataSem5.Data
                  ? ConverteData2(dataSem5.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Celebracao ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Celebracao ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem5C !== '-' ? (
                        <Box width="100%">
                          {preSem5C ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem5Celebracao && dataSem5Celebracao.Data
                  ? ConverteData2(dataSem5Celebracao.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
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
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}

        {sem0Discipulado ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Box>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                {sem0Discipulado ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                    >
                      {preSem5D !== '-' ? (
                        <Box width="100%">
                          {preSem5D ? (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              {' '}
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdOutlineCheck size={25} color="green" />
                              </SvgIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                                <MdClose size={25} color="red" />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="100%"
                  >
                    <Oval stroke="blue" width={20} height={20} />
                  </Box>
                )}
              </Box>
              <Box>
                {dataSem5Discipulado && dataSem5Discipulado.Data
                  ? ConverteData2(dataSem5Discipulado.Data).slice(0, 5)
                  : ''}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="20%"
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
      </Box>

      <Dialog fullScreen open={openPontuacao} TransitionComponent={Transition}>
        <CalcularPontuacao
          pontos={pontos}
          celula={celula}
          setOpenPontuacao={setOpenPontuacao}
          perfilUser={perfilUser}
        />
      </Dialog>
    </Box>
  );
}
