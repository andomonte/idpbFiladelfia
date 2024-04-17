import React from 'react';
import { Contribuicao } from 'src/components/igrejas/principal/contribuicoes';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function Contribuir() {
  const router = useRouter();
  const perfilUser = router.query;
  const [session] = useSession();
  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      if (session === null || !result) {
        router.push({
          pathname: '/',
        });
      }
      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/contribuicoes');
  }

  return (
    <div>
      {perfilUserF && (
        <Contribuicao title="IDPB-IDPB-CELULAS" perfilUser={perfilUserF} />
      )}
    </div>
  );
}

export default Contribuir;
