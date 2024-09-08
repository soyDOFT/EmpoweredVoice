import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {

                return { ...profile }
            }
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${credentials.email}`);
                if (!response.ok) console.error('failed to fetch existing user', response.statusText);
                const user = await response.json();
                return user;
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${user.email}`);
                if (!response.ok) console.error('failed to fetch existing user', response.statusText);
                const existingUser = await response.json();
                if (!existingUser.email) await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/signup/google?firstname=${profile.given_name}&lastname=${profile.family_name}&email=${profile.email}&picture=${profile.picture}`);
                return true;
            } catch {
                console.log('ERROR LOGGING IN')
                return false;
            }
        },
        async session({ session, user }) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${session.user.email}`);
            if (!response.ok) console.error('failed to fetch existing user', response.statusText);
            const existingUser = await response.json();
            session.user.role = existingUser.role;
            return session;
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