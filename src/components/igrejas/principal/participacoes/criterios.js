import React from 'react';

import { Box } from '@material-ui/core';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Example() {
  return (
    <Box height="calc(100vh - 56px)" width="100%" bgcolor="#fafafa">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="end"
        height="50px"
        fontFamily="FUGAZ ONE"
      >
        <Box fontSize="18px"> CRITÉRIOS DOS PONTOS</Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="end"
        height="50px"
        fontFamily="arial"
      >
        <Box fontSize="14px"> Pressione cada e veja os detalhes </Box>
      </Box>

      <Box mt={4}>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{ fontSize: '12px', fontFamily: 'Fugaz One' }}
              >
                PONTOS POR RELATÓRIOS ENTREGUES
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Box width="80vw">
                <Box mt={0} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">
                      {' '}
                      ENTREGA INDIVIDUAL DE CADA RELATÓRIO:
                    </Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    1 ponto por cada relatório feito
                  </Box>
                </Box>

                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">ENTREGA DE TODOS OS RELATÓRIOS:</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    quando todos são entregues marca 1 ponto
                  </Box>
                </Box>
                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">
                      {' '}
                      PONTUALIDADE NA ENTREGA DOS RELATÓRIOS:
                    </Box>
                  </Box>
                  <Box color="#6a1b9a" fontSize="14px">
                    1 ponto por todos registados no prazo
                  </Box>
                </Box>
                <Box mt={2} fontSize="14px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">PONTOS POSSÍVEIS - 5 PONTOS</Box>
                  </Box>
                </Box>
              </Box>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{ fontSize: '12px', fontFamily: 'Fugaz One' }}
              >
                PONTOS PELO RELATÓRIO DA CÉLULA
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Box width="80vw">
                <Box mt={0} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%"> PRESENÇA NA CÉLULA:</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Percentual de Presentes / 10 (maximo 10 pts)
                  </Box>
                </Box>

                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">VISITANTES NA CÉLULA</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Cada Visitante vale 1 ponto
                  </Box>
                </Box>
                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%"> VISITA DO LÍDER</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Cada visita feita pelo lider vale 1 pontos
                  </Box>
                </Box>
                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">NOVO MEMBRO</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Cada novo membro cadastrado vale 10 pontos
                  </Box>
                </Box>
              </Box>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{ fontSize: '12px', fontFamily: 'Fugaz One' }}
              >
                PONTOS PELO RELATÓRIO DA CELEBRAÇÃO
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Box width="80vw">
                <Box mt={0} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">
                      PARTICIPAÇÃO DA CELEBRAÇÃO NA IGREJA:
                    </Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Percentual de Presentes / 10 (maximo 10 pts)
                  </Box>
                </Box>

                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">PARTICIPAÇÃO DA CELEBRAÇÃO ON LINE:</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Percentual de Presentes / 20 (maximo 5 pts)
                  </Box>
                </Box>
                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%"> VISITANTES NO CULTO</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Cada visitante vale 1 pontos
                  </Box>
                </Box>
              </Box>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{ fontSize: '12px', fontFamily: 'Fugaz One' }}
              >
                PONTOS PELO RELATÓRIO DE DISCIPULADO
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Box width="80vw">
                <Box mt={0} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">DISCIPULADO RECEBIDO:</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Percentual de Presentes / 10 (maximo 10 pts)
                  </Box>
                </Box>

                <Box mt={2} fontSize="11px" fontFamily="Fugaz One">
                  <Box width="100%" display="flex">
                    <Box width="100%">LEITURA DIÁRIA DA BÍBLIA:</Box>
                  </Box>
                  <Box fontFamily="arial" color="#6a1b9a" fontSize="14px">
                    Percentual de Presentes / 10 (maximo 10 pts)
                  </Box>
                </Box>
              </Box>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
}
