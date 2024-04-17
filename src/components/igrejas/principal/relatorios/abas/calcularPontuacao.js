import * as React from 'react';
import { Box, Button } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';
import useSWR from 'swr';
import axios from 'axios';
import Emojis from 'src/components/icones/emojis';
import ConverteData2 from 'src/utils/convData2';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  pontos,
  celula,
  setOpenPontuacao,
  perfilUser,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  let semanaAnterior = pontos.Semana;
  let anoAnterior = pontos.Ano;
  for (let i = 1; i < 5; i += 1) {
    semanaAnterior -= 1;
    if (semanaAnterior < 0) {
      semanaAnterior = 52;
      anoAnterior = Number(pontos.Ano) - 1;
    }
  }

  const [qytCelulas, setQytCelulas] = React.useState([]);
  const [percentualPontos, setPercentualPontos] = React.useState([]);
  const qytMembros = JSON.parse(celula.NomesMembros).length;
  const pontosF = JSON.parse(pontos.Pontuacao);

  const PPCL = Number(
    (pontosF.PresentesCelula * 100) / qytMembros / 10,
  ).toFixed(2); // Percentual Presentes Celula
  const PPCI = Number(
    (pontosF.CelebracaoIgreja * 100) / qytMembros / 10,
  ).toFixed(2); // Percentual Presentes Celebração Igreja
  const PPCO = Number((pontosF.CelebracaoLive * 100) / qytMembros / 10).toFixed(
    2,
  ); // Percentual Presentes Celebração OnLine

  const PDR = Number((pontosF.Discipulados * 100) / qytMembros / 10).toFixed(2); // Percentual Presentes Celebração OnLine
  const PLB = Number((pontosF.LeituraBiblica * 100) / qytMembros / 10).toFixed(
    2,
  );
  const url2 = `/api/consultaPontuacaoSemanaAno2/${semanaAnterior}/${anoAnterior}`;
  const { data: pontosAnt, error: errorPontosAnt } = useSWR(url2, fetcher);

  const url1 = `/api/consultaPontuacaoSemanaAno1/${pontos.Semana}/${pontos.Ano}`;
  const { data: pontosAtual, error: errorPontosAtual } = useSWR(url1, fetcher);

  React.useEffect(() => {
    if (errorPontosAnt) return <div>An error occured.</div>;
    if (!pontosAnt) return <div>Loading ...</div>;
    if (pontosAnt) {
      const pontosCelula = pontosAnt.filter(
        (val) =>
          Number(val.Celula) === Number(celula.Celula) &&
          Number(val.Distrito) === Number(celula.Distrito),
      );

      //  const pontosTotal = pontosCelula.reduce((prev) => prev.TotalRank);
      const total = Number(
        pontosCelula.reduce((a, b) => Number(a) + Number(b.Total), 0) /
          pontosCelula.length,
      ).toFixed(2);

      const mediaCrescimento = parseFloat(
        (100 * (pontos.Total - total)) / total,
      ).toFixed(2);
      setPercentualPontos(mediaCrescimento);
    }
    return 0;
  }, [pontosAnt]);

  React.useEffect(() => {
    if (errorPontosAtual) return <div>An error occured.</div>;
    if (!pontosAtual) return <div>Loading ...</div>;
    if (pontosAtual) {
      const pontosCelula = pontosAtual.filter(
        (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
      );

      setQytCelulas(pontosCelula.length);
      //  const pontosTotal = pontosCelula.reduce((prev) => prev.TotalRank);
    }
    return 0;
  }, [pontosAtual]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal}
      height="calc(100vh)"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        width="94%"
        height="96%"
        bgcolor="white"
      >
        <Box height="100%">
          <Box
            height="50%"
            fontFamily="Fugaz One"
            color="green"
            fontSize="16px"
            width="90vw"
            textAlign="center"
          >
            <Box
              mt={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontFamily="Fugaz One"
              color="green"
              width="100%"
            >
              <Box> PONTUAÇÃO DA</Box>{' '}
              <Box ml={1}>CÉLULA - {celula.Celula}</Box>
            </Box>
            <Box mt={2} width="100%" fontSize="13px" color="black">
              <TableContainer sx={{ width: '100%', height: '42vh' }}>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    RELATÓRIO DA CÉLULA:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.RelCelulaFeito.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    PRESENÇA NA CÉLULA:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {PPCL} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    VISITANTES NA CÉLULA:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.VisitantesCelula.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    PARTICIPAÇÃO NOS EVENTOS:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {Number(pontosF.Eventos).toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    VISITAS FEITAS PELO LÍDER:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.Visitas.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    NOVO MEMBRO CADASTRADO:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.NovoMembro.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={4} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    RELATÓRIO DA CELEBRAÇÃO:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.RelCelebracao.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    CELEBRAÇÃO NA IGREJA:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {PPCI} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    CELEBRAÇÃO ON LINE:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {PPCO} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    VISITANTES NA CELEBRAÇÃO:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.VisitantesCelebracao.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={4} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    RELATÓRIO DO DISCIPULADO:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.RelDiscipulado.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    DISCIPULADO RECEBIDO:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {PDR} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    LEITURA BÍBLICA:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {' '}
                      {PLB} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={4} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    TODOS RELATÓR. ENTREGUES:
                  </Box>
                  <Box width="30%" mr={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.Relatorio.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    PONTUALIDADE NOS RELATÓR.:
                  </Box>
                  <Box width="30%" mr={2} mb={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.Pontualidade.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} width="100%" display="flex">
                  <Box display="flex" justifyContent="start" width="70%">
                    {' '}
                    PLANEJAMENTO DA CÉLULA:
                  </Box>
                  <Box width="30%" mr={2} mb={2}>
                    <Box
                      fontFamily="arial black"
                      display="flex"
                      justifyContent="end"
                      color={corIgreja.principal}
                    >
                      {pontosF.planejamento.toFixed(2)} Pts
                    </Box>
                  </Box>
                </Box>
              </TableContainer>
            </Box>
          </Box>
          <Box mt={0} height="40%" width="100%">
            <Box height="100%" mt={0} fontFamily="Fugaz One">
              <Box height="100%" width="100%">
                <Box
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  color={corIgreja.iconeOn}
                  fontFamily="arial black"
                  fontSize="20px"
                >
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="arial black"
                    fontSize="14px"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontFamily="Fugaz One"
                      color="white"
                      bgcolor={corIgreja.principal}
                      width="105%"
                    >
                      <Box mt={1} mb={1} display="flex">
                        SEMANA DO DIA{' '}
                        <Box ml={2}>{ConverteData2(celula.Data)}</Box>
                      </Box>
                    </Box>

                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Box width="100%" textAlign="center">
                        <Box mt={2} color={corIgreja.principal}>
                          RANKING ENTRE {qytCelulas} CÉLULAS
                        </Box>

                        <Box
                          mt={0}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          color={corIgreja.principal}
                          fontFamily="arial black"
                          fontSize="12px"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="90%"
                            bgcolor="#e5e6b8"
                            height="10vh"
                            border="1px solid"
                            borderColor="text.primary"
                          >
                            <Box
                              sx={{ fontSize: '12px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height="100%"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                                borderBottom="1px solid"
                                borderColor="text.primary"
                              >
                                PONTOS
                              </Box>
                              <Box
                                fontSize="16px"
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                              >
                                {pontos.TotalRank && pontos.TotalRank} pts
                              </Box>
                            </Box>
                            <Box
                              sx={{ fontSize: '12px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height="100%"
                              borderLeft="1px solid"
                              borderColor="text.primary"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                borderBottom="1px solid"
                                borderColor="text.primary"
                                justifyContent="center"
                                width="100%"
                                fontFamily="arial black"
                                height="100%"
                              >
                                POSIÇÃO
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                                fontSize="16px"
                              >
                                {pontos.Posicao}º
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box mt={2} color={corIgreja.principal}>
                          MEU CRESCIMENTO
                        </Box>

                        <Box
                          mt={0}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          height="10vh"
                          color={corIgreja.principal}
                          fontFamily="arial black"
                          fontSize="14px"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="90%"
                            bgcolor="#e5e6b8"
                            height="100%"
                            border="1px solid"
                            borderColor="text.primary"
                          >
                            <Box
                              sx={{ fontSize: '12px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height="100%"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                                borderBottom="1px solid"
                                borderColor="text.primary"
                              >
                                PERCENTUAL
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                fontSize="16px"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                              >
                                {percentualPontos && percentualPontos} %
                              </Box>
                            </Box>
                            <Box
                              sx={{ fontSize: '12px' }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height="100%"
                              borderLeft="1px solid"
                              borderColor="text.primary"
                              width="50%"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                borderBottom="1px solid"
                                borderColor="text.primary"
                                justifyContent="center"
                                width="100%"
                                fontFamily="arial black"
                                height="100%"
                              >
                                STATUS
                              </Box>
                              <Box
                                fontFamily="arial black"
                                color="#000"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100%"
                              >
                                <Box
                                  fontFamily="arial black"
                                  color="#000"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  width="100%"
                                  height="100%"
                                >
                                  {percentualPontos && percentualPontos > 0 ? (
                                    <Emojis tipo="alegre" />
                                  ) : (
                                    <Box>
                                      {!percentualPontos ? (
                                        <Emojis tipo="igual" />
                                      ) : (
                                        <Emojis tipo="triste" />
                                      )}
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            height="10%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                style={{
                  width: '80%',
                  fontFamily: 'Fugaz One',
                  borderRadius: 10,
                  background: 'blue',
                  color: 'white',
                }}
                onClick={() => {
                  setOpenPontuacao(false);
                }}
              >
                FECHAR
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
