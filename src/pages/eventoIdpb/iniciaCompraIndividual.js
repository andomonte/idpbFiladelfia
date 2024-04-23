import React from 'react';
import IniCompras from 'src/components/Eventos/Comprar/telaCompra';
import IniComprasCrianca from 'src/components/Eventos/Comprar/telaCompraCriancas';
import { useRouter } from 'next/router';
import prisma from 'src/lib/prisma';
import Espera from 'src/utils/espera';

function IniCompra({ nomesIgrejas, nomesMembros }) {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...dados } = router.query;
  let mudaDados = 'sai';
  if (dados.total) mudaDados = 'entra';
  const [dadosF, setDadosF] = React.useState('');

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setDadosF(dados);
      sessionStorage.setItem('dadosEventosIdpbInd', JSON.stringify(dados));
    } else {
      const result = JSON.parse(sessionStorage.getItem('dadosEventosIdpbInd'));

      setDadosF(result);
    }
  }, [mudaDados]);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/iniciaCompraIndividual');
  }

  return (
    <div>
      {dadosF.cpf && dadosF.tipo ? (
        <div>
          {dadosF.tipo === 'criança' ? (
            <div>
              {dadosF.cpf && (
                <IniComprasCrianca
                  nomesIgrejas={nomesIgrejas}
                  nomesMembros={nomesMembros}
                  dados={dadosF}
                />
              )}
            </div>
          ) : (
            <div>
              {dadosF.cpf && (
                <div>
                  <IniCompras
                    nomesIgrejas={nomesIgrejas}
                    nomesMembros={nomesMembros}
                    dados={dadosF}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Espera descricao="Atualizando os dados" />
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const nomesIgrejas = await prisma.nucleos.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const nomesMembros = await prisma.membros.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      nomesIgrejas: JSON.parse(
        JSON.stringify(
          nomesIgrejas,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      nomesMembros: JSON.parse(
        JSON.stringify(
          nomesMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default IniCompra;
