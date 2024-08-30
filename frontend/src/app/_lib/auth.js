import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({auth, request}) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }) {
            // verify if user exists
        },
        async session({ session, user }) {
            //keep track of user id
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
};

export const { 
    auth,
    signIn,
    signOut,
    handlers: { GET, POST }
} = NextAuth(authConfig)