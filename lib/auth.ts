import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "@/actions/auth";

// ---- 🔐 AUTH.JS CONFIG ---- //
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
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

        if (!res || !res.user || !res.accessToken) return null;

        // ✅ Return shape of user stored in JWT
        return {
          id: res.user._id,
          email: res.user.email,
          accessToken: res.accessToken,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // ✅ When user logs in, attach the accessToken to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
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
import { JWT } from "@auth/core/jwt";

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
