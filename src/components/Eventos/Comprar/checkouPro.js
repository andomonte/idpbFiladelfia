import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function CheckoutPro({ prefID }) {
  const mercadopago = useMercadopago.v2(
    'TEST-6b67ce15-15bf-4b78-9eaf-6c29c3ec112e',
    {
      locale: 'pt-BR',
    },
  );
  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: prefID,
        },
        render: {
          container: '.cho-container',
          label: 'Pay',
        },
      });
    }
  }, [mercadopago]);

  return (
    <div>
      <div className="cho-container" />
    </div>
  );
}
