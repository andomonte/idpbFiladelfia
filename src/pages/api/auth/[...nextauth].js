import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from 'src/lib/prisma';
import CryptoJS from 'crypto-js';
// import useSWR from 'swr';
// import fetch from 'unfetch';

// const data = getUsuarios();
// Configure one or more authentication providers

/* function Useres() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR('/api/getUser', fetcher);
  valorUsuario = 'JSON.parse(JSON.stringify(data))';
 // console.log(valorUsuario);
  return data;
} */

// const fetcher = (url) => fetch(url).then((r) => r.json());
// const { data } => //useSWR('/api/getUser', fetcher);
// console.log(data);
const options = {
  providers: [
    // ...add more providers here

    CredentialsProvider({
      credentials: {
        cpf: {
          label: 'CPF',
          type: 'tel',
          placeholder: 'DIGITE SEU CPF',
        },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.membros
            .findMany({
              where: {
                CPF: credentials.cpf,
              },
            })
            .finally(async () => {
              await prisma.$disconnect();
            });

          if (user && user.length) {
            let getSenha = user[0].senha;
            const ano = user[0].Nascimento.getFullYear();
            const mes =
              user[0].Nascimento.getMonth() + 1 > 9
                ? user[0].Nascimento.getMonth() + 1
                : `0${user[0].Nascimento.getMonth() + 1}`;
            const dia =
              user[0].Nascimento.getDate() + 1 > 9
                ? user[0].Nascimento.getDate() + 1
                : `0${user[0].Nascimento.getDate() + 1}`;
            if (getSenha === undefined || getSenha === null) {
              getSenha = `${dia}${mes}${ano}`;
              if (getSenha === credentials.password) {
                return {
                  // retorna para JWS os dados do usuario do banco
                  name: user[0].Nome,
                  email: user[0].CPF,
                  image: user[0].foto,
                };
              }
              return false;
            }

            const bytes = CryptoJS.AES.decrypt(getSenha, 'secret key lea123');
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            if (originalText === credentials.password) {
              return {
                // retorna para JWS os dados do usuario do banco
                name: user[0].Nome,
                email: user[0].CPF,
                image: user[0].foto,
              };
            }

            return false;
          }
          return 0;
        } catch (error) {
          const { message } = error.response.data;
          throw new Error(message);
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      //  callbackUrl: `${window.location.origin}/userPefil`, // $ { id }
    }),
    /*   Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }), */
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn(user, account, profile) {
      //      const dados = await prisma.Usuarios({ loginUsuario: user });

      // if (!data) return <div>loading...</div>;
      //   return <div>hello {data.name}!</div>;

      /* const dados = JSON.parse(
        JSON.stringify(usuarios.filter((item) => item.email === profile.email)),
      ); */
      //   const verifiedEmail = dados[0].email;

      // console.log(profile.email, dados[0], valorUsuario);

      if (user && account.type === 'credentials') {
        return true;
      }

      if (
        account.provider === 'google' &&
        profile.verified_email === true //  profile.email.endsWith(verifiedEmail)
      ) {
        return true;
      }
      return false;
    },
  },

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
