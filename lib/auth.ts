import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginUser } from "@/actions/auth";
import { DefaultSession } from "next-auth";

// ============================================
// 🔐 AUTH CONFIGURATION
// ============================================

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

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

        // ✅ Return user shape to store in JWT
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
    // ============================================
    // ✅ SIGN-IN CALLBACK
    // Used to allow or block sign-in before JWT is created
    // ============================================
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;

        // Call backend login logic for Google user
        const res = await loginUser(profile.email);

        if (!res?.success) {
          console.error("❌ Google login failed for:", profile.email);
          return false; // Stop login if backend fails
        }

        // Temporarily attach backend response to account
        // (used later in jwt callback)
        account.backendData = res.data;
      }

      return true;
    },

    // ============================================
    // ✅ JWT CALLBACK
    // Runs whenever a JWT is created or updated
    // ============================================
    async jwt({ token, user, account }) {
      // -- Credentials login --
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }

      // -- Google login --
      if (account?.provider === "google" && account.backendData) {
        token.id = account.backendData.user._id;
        token.email = account.backendData.user.email;
        token.accessToken = account.backendData.accessToken;
      }

      return token;
    },

    // ============================================
    // ✅ SESSION CALLBACK
    // Expose JWT data to the client session
    // ============================================
    async session({ session, token }) {
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

// ============================================
// 🧠 TYPE AUGMENTATION
// ============================================

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

  interface Account {
    backendData?: {
      user: { _id: string; email: string };
      accessToken: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string;
  }
}
