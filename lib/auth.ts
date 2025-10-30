import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginUser } from "@/actions/auth";

// ---- 🔐 AUTH.JS CONFIG ---- //
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const res = await loginUser(credentials.email, credentials.password);

        if (!res || !res.success) return null;

        const data = res.data;

        // ✅ Return shape of user stored in JWT
        return {
          id: data.user._id,
          email: data.user.email,
          accessToken: data.accessToken,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, profile }) {
      // ✅ just return true or false here
      if (account?.provider === "google" && !profile?.email) {
        return false;
      }
      return true;
    },
    

    async jwt({ token, user, account, profile }) {
      // ✅ When user logs in, attach the accessToken to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }

       // ✅ For Google login
       if (account?.provider === "google" && profile?.email) {
        const res = await loginUser(profile.email);
        if (res?.success) {
          token.id = res.data.user._id;
          token.email = res.data.user.email;
          token.accessToken = res.data.accessToken;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ Expose accessToken inside client session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },

    
  },

  pages: {
    signIn: "/login",
  },
});

// ---- 🧠 TYPE AUGMENTATION ---- //
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    email?: string;
    accessToken?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string;
  }
}
