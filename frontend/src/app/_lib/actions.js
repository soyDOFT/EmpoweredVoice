'use server';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/app/_lib/auth'
import { hashPassword, verifyPassword } from './hash';

export async function credSignIn(prevState, formData) {
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
        return { errors };
    }

    const response = await fetch(`http://localhost:8080/api/accounts?email=${email}`);
    console.log('response1', response)
    if (!response.ok) {
        console.log('failure to fetch response')
    }
    const account = await response.json();
    console.log('fmkasdl', account)
    let isValidLogin = false;
    if (account.password) {
        isValidLogin = verifyPassword(account.password, password);
    }

    if (!isValidLogin) {
        errors.credentials = 'Invalid Credentials!!!';
        return { errors };
    }
    console.log('no errors');

    console.log('signing in...')
    await signIn('credentials', { redirectTo: "/account", email, password });
}

export async function googleSignInAction() {
    await signIn('google', { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
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
        return { errors };
    }


    try {
        await fetch(`http://localhost:8080/api/accounts?email=${email}`);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return { errors: { email: 'An account with that email already exists.' } };
        throw err;
    }
    console.log(password);
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword)
    await fetch(`http://localhost:8080/api/accounts/signup?email=${email}&password=${hashedPassword}`)

    redirect('/account');
}