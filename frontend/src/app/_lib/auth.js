import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

let existingUser = {};

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                console.log('google profile: here')

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
                console.log('authorize: here')
                console.log('credentials:', credentials)
                const response = await fetch(`http://localhost:8080/api/accounts?email=${credentials.email}`);
                if (!response.ok) console.error('failed to fetch existing user', response.statusText);
                const user = await response.json();
                console.log('auth', user);
                return user;
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            console.log('authorized: here')

            return !!auth?.user
        },
        async signIn({ user, account, profile }) {

            console.log('SIGNED IN')
            console.log('user:', user)
            console.log('account:', account) //providerAccountId
            console.log('profile:', profile) //undefined unless signed in with google
            try {
                const response = await fetch('http://localhost:8080/api/accounts?email=' + user.email);
                if (!response.ok) console.error('failed to fetch existing user', response.statusText);
                existingUser = await response.json();
                console.log('existingUser:', existingUser);
                if (!existingUser.email) await fetch(`http://localhost:8080/api/accounts/signup/google?firstname=${profile.given_name}&lastname=${profile.family_name}&email=${profile.email}&picture=${profile.picture}`);
                console.log(!existingUser.email);
                return true;
            } catch {
                console.log('ERROR LOGGING IN')
                return false;
            }
        },
        async session({ session, user }) {
            console.log('session: here');
            console.log('here3', user)
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