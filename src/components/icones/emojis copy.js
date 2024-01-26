import React from 'react';

function Emojis({ tipo }) {
  return (
    <div>
      {tipo === 'alegre' && (
        <img src="/images/alegre.png" height={25} width={25} alt="emojis" />
      )}
      {tipo === 'igual' && (
        <img src="/images/igual.png" height={25} width={25} alt="emojis" />
      )}
      {tipo === 'triste' && (
        <img src="/images/triste.png" height={25} width={25} alt="emojis" />
      )}
    </div>
  );
}

export default Emojis;
