import GerarPdf from 'src/components/Eventos/Comprar/pdfs/pdf';
// import React from 'react';

function Comprove({ comprovante }) {
  return (
    <div>
      {comprovante && (
        <GerarPdf
          nome={comprovante.nome}
          codigo={comprovante.codigoPagamento}
          estadia={comprovante.estadia}
          valor={comprovante.vTotal}
          fp={comprovante.fp}
          status={comprovante.status}
          parcelas={comprovante.descParcelas}
          cpf={comprovante.cpf}
        />
      )}
    </div>
  );
}

export default Comprove;
