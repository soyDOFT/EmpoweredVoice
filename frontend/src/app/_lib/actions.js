'use server';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/app/_lib/auth'
import { hashPassword, verifyPassword } from './hash';

export async function credSignIn(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    // const hashedPassword = hashPassword(password);

    // let errors = {};

    // const response = await fetch(`http://localhost:8080/api/accounts/signin?email=${email}&password=${hashedPassword}`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // });
    // console.log('response1', response)
    // if (!response.ok) {
    //     console.log('failure to fetch response')
    // }

    // const account = await response.json();

    // if (!account) {
    //     errors.password = 'Incorrect password'
    // }

    // if (Object.keys(errors).length > 0) {
    //     return {errors};
    // }
    // console.log('no errors');
    try {
        console.log('signing in...')
        await signIn("credentials", { redirectTo: "/account", email, password });
        redirect('/account');
    } catch (err) {
        if (err) console.log('actions:', err);
    }

}

export async function googleSignInAction() {
    await signIn('google', {redirectTo: "/account"});
}

export async function signOutAction() {
    await signOut({redirectTo: "/"});
}

export async function signup(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address'
    }

    if (password.trim().length < 6) {
        errors.password = 'Password must be at least 6 characters long.'
    }

    if (Object.keys(errors).length > 0) {
        return {errors};
    }

    const hashedPassword = hashPassword(password);

    try {
        await fetch(`http://localhost:8080/api/accounts?email=${email}`);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return { errors: { email: 'An account with that email already exists.' } };
        throw err;
    }

    redirect('/account');
}