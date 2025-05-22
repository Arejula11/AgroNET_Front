import { defineConfig } from "auth-astro";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import axios from "axios";
import { Url } from "@/global/url.js";


export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
       authorization: {
        params: {
          prompt: 'select_account' //Obliga al usuario a seleccionar una cuenta de Google
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
        token.provider = account.provider;

        if (account.provider === "google") {
          token.id_token = account.id_token;
        } 
      }
      return token;
    },

    async session({ session, token }) {
      let backendLoginUrl = "";
      let providerDataField = "";

      if (token.provider === "google") {
        backendLoginUrl = `${Url}/auth/google/login`;
        providerDataField = "googleUserData";
      } else if (token.provider === "github") {
        backendLoginUrl = `${Url}/auth/github/login`;
        providerDataField = "githubUserData";
      } else {
        console.error("Unknown provider in token:", token.provider);
        session.error = "Authentication provider is not recognized";
        return session;
      }

      
      try {
        const res = await axios.post(backendLoginUrl, token);

        if (res.status === 202 && res.data.needsMoreData === true) {
          // No account linked with this google account in the backend need to gather it from the user
          session.needsMoreData = true;
          session.provider = token.provider; 
          session[providerDataField] = // prob don't need it
            res.data.googlePayload || res.data.githubPayload;


        } else if (res.status === 200 && res.data.token) {
          session.sessionToken = res.data.token; 
          session.needsMoreData = false; 
        } else {
          console.warn("Unexpected backend response:", res.status, res.data);
          session.error = `Unexpected response from server during ${token.provider} login.`;
        }
      } catch (err) {
        console.error(`Error calling external login: ${err}`);
      }
      session.providerToken = token; 
      return session;
    },
  },
});
