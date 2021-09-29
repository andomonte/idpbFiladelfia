import { signOut } from 'next-auth/client';
import React from 'react';
import BuscarEventos from './userTelas/buscaEventos';
import Padrao from './userTelas/telaPadrao';

const Evento = ({ item, secao, statusDrawer, perfilUser }) => {
  const dadosUser = item.filter(
    (val) => val.email === secao.user.email && val.NivelUser === perfilUser,
  );

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = dadosUser[0].NivelUser;

  switch (route) {
    case 'sup-MM':
      return (
        <BuscarEventos
          item={item}
          secao={secao}
          statusDrawer={statusDrawer}
          perfilUser={perfilUser}
        />
      );
    default:
      return <Padrao />;
  }
};

export default Evento;
