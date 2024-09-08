'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from '@/app/_lib/auth'
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${email}`);
    if (!response.ok) {
        console.log('failure to fetch response')
    }
    const account = await response.json();
    let isValidLogin = false;
    if (account.password) {
        isValidLogin = verifyPassword(account.password, password);
    }

    if (!isValidLogin) {
        errors.credentials = 'Invalid Credentials';
        return { errors };
    }

    await signIn('credentials', { redirectTo: "/account/profile", email, password });
}

export async function googleSignInAction() {
    await signIn('google', { redirectTo: "/account/profile" });
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
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${email}`);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return { errors: { email: 'An account with that email already exists.' } };
        throw err;
    }
    const hashedPassword = hashPassword(password);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/signup?email=${email}&password=${hashedPassword}`)

    redirect('/account/profile');
}



export async function subscribeSNS(formData) {
    const session = await auth();

    try {

        if (formData.get('election-email')) {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/notifications/subscribe/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email }),
            });
            if (!response.ok) {
                console.log('error resopnse:', response)
            }
            const data = await response.json();
        } 
        
        if (formData.get('election-sms')) {
            const formattedPhoneNumber = '+1' + phoneNumber;
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/notifications/subscribe/sms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formattedPhoneNumber }),
            });
            const data = await response.json();
        }
    } catch (err) {
        console.error('Error Subscribing:', err)
    }
}

export async function messageSNS(formData) {

const subject = formData.get('subject');
const message = formData.get('message');

const response = await fetch(`${process.env.NEXTAUTH_URL}/api/notifications/send`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, message }),
    });
const data = await response.json(); 
}