import React from 'react';
import PagPix from 'src/components/Eventos/Comprar/pix';
import PagCC from 'src/components/Eventos/Comprar/checkouT';
import PagBol from 'src/components/Eventos/Comprar/boleto';
import PagIsento from 'src/components/Eventos/Comprar/isento';
import PagDinheiro from 'src/components/Eventos/Comprar/dinheiro';
import { useRouter } from 'next/router';

function TelaPagamento() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...pagamento } = router.query;

  let mudaDados = 'sai';
  if (pagamento.nome) mudaDados = 'entra';
  const [pagamentoF, setPagamentoF] = React.useState();

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPagamentoF(pagamento);
      sessionStorage.setItem('pagamentos', JSON.stringify(pagamento));
    } else {
      const result = JSON.parse(sessionStorage.getItem('pagamentos'));

      // resultado = result.id;
      setPagamentoF(result);
    }
  }, [mudaDados]);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/pagamento');
  }

  return (
    <div>
      {pagamento.nome ? (
        <div>
          {pagamento.fpag === 'Pix' && (
            <PagPix title="SISTEMA-IDPB" dadosPix={pagamento} />
          )}
          {pagamento.fpag === 'Cartão de Crédito' && (
            <PagCC title="SISTEMA-IDPB" dadosCC={pagamento} />
          )}
          {pagamento.fpag === 'Boleto' && (
            <PagBol title="SISTEMA-IDPB " dadosBoleto={pagamento} />
          )}
          {pagamento.fpag === 'Isento de Pagamento' && (
            <PagIsento title="SISTEMA-IDPB " dadosDinheiro={pagamento} />
          )}
          {pagamento.fpag === 'Dinheiro (apenas secretaria)' && (
            <PagDinheiro title="SISTEMA-IDPB " dadosDinheiro={pagamento} />
          )}
        </div>
      ) : (
        <div>
          {pagamentoF && pagamentoF.fpag === 'Pix' && (
            <div>
              {pagamentoF && (
                <PagPix title="SISTEMA-IDPB" dadosPix={pagamentoF} />
              )}
            </div>
          )}
          {pagamentoF && pagamentoF.fpag === 'Cartão de Crédito' && (
            <div>
              {pagamentoF && (
                <PagCC title="SISTEMA-IDPB" dadosCC={pagamentoF} />
              )}
            </div>
          )}
          {pagamentoF && pagamentoF.fpag === 'Boleto' && (
            <div>
              {pagamentoF && (
                <PagBol title="SISTEMA-IDPB" dadosBoleto={pagamentoF} />
              )}
            </div>
          )}
          {pagamentoF && pagamentoF.fpag === 'Isento de Pagamento' && (
            <div>
              {pagamentoF && (
                <PagIsento title="SISTEMA-IDPB" dadosDinheiro={pagamentoF} />
              )}
            </div>
          )}
          {pagamentoF && pagamentoF.fpag === 'Dinheiro (apenas secretaria)' && (
            <div>
              {pagamentoF && (
                <PagDinheiro title="SISTEMA-IDPB" dadosDinheiro={pagamentoF} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TelaPagamento;
