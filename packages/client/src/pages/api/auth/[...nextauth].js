import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      jwt: {
        encryption: true,
      },
      secret: process.env.secret,
      callbacks: {
        async jwt(token, account) {
          if (account?.accesstoken) {
            token.accesstoken = account.accesstoken;
          }
          return token;
        },
        redirect: async (url, _baseurl) => {
          if (url === "/profile") {
            return Promise.resolve("/");
          }
          return Promise.resolve("/");
        },
      },
    }),
  ],
});
