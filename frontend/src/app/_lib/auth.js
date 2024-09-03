import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./hash";

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
                try {
                    console.log('credemails', credentials.email);
                    const response = await fetch(`http://localhost:8080/api/accounts?email=${credentials.email}`);
                    const user = await response.json();
                    const isValidLogin = verifyPassword(user.password, credentials.password); 
                    console.log('user', user);

                    if (isValidLogin) {
                        console.log('YESSS RIGHT PASS')
                        return user;
                    } else {
                        // If login fails
                        console.log('NOO WRONG PASS')
                        return null;
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        authorized({auth, request}) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }) {
            console.log('SIGNED IN')
            console.log(user)
            console.log(account)
            console.log(profile)
            try {
                const existingUser = await fetch('http://localhost:8080/api/accounts?email=' + user.email);

                if (!existingUser) await fetch(`http://localhost:8080/api/accounts/signup?email=${user.email}&password=${user.password}`);

                return true;
            } catch {

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