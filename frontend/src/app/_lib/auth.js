import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyPassword } from "./hash";

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
                // try {
                //     console.log('credemails', credentials.email);
                    const response = await fetch(`http://localhost:8080/api/accounts?email=${credentials.email}`);
                    const user = await response.json();
                //     const isValidLogin = verifyPassword(user.password, credentials.password); 
                //     console.log('user', user);

                //     if (isValidLogin) {
                //         console.log('YESSS RIGHT PASS')
                //         return user;
                //     } else {
                //         // If login fails
                //         console.log('NOO WRONG PASS')
                //         let errors = {};
                //         errors.credentials = 'Invalid Credentials!!!';
                //         return {errors};
                //     }
                // } catch (error) {
                //     console.error("Authorization error:", error);
                //     return null;
                // }
                return user;
            },
        }),
    ],
    callbacks: {
        authorized({auth, request}) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }) {
            // return {errors: {credentials: 'error no good'}}
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