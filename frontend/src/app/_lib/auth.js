import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('credentials:', credentials)
                const response = await fetch(`http://localhost:8080/api/accounts?email=${credentials.email}`);
                if (!response.ok) console.error('failed to fetch existing user', response.statusText);
                const user = await response.json();
                return user;
            },
        }),
    ],
    callbacks: {
        authorized({auth, request}) {
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
                const existingUser = await response.json();
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