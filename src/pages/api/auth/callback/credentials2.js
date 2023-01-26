import NextAuth from 'next-auth';

// Configure one or more authentication providers
const options = {
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      }
      // Return false to display a default error message
      return true;
      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    },
    pages: {
      error: '/login', // Changing the error redirect page to our custom login page
    },
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};
export default (req, res) => NextAuth(req, res, options);
