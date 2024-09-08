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
        errors.credentials = 'Invalid Credentials';
        return { errors };
    }
    console.log('no errors');

    console.log('signing in...')
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
        await fetch(`http://localhost:8080/api/accounts?email=${email}`);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return { errors: { email: 'An account with that email already exists.' } };
        throw err;
    }
    console.log(password);
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword)
    await fetch(`http://localhost:8080/api/accounts/signup?email=${email}&password=${hashedPassword}`)

    redirect('/account/profile');
}

export async function updateClient(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    
    const state = formData.get("state");
    const city = formData.get("city");
    const email = formData.get("email");
    console.log(state, city, email);
    
    try {
        console.log('updating client')
        const url = `http://localhost:8080/api/update/account?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&email=${email}`;
        console.log(url)
        const result = await fetch(url);
        const answer = await result.json();
        console.log('answer', answer);
    } catch (err) {
        throw new Error("Guest could not be updated");
    }

    revalidatePath("/account/profile");
  }

  export async function subscribeSNS(formData) {
    console.log('SUBSCRIBED')
    console.log('formDaTA:', formData);
    const session = await auth();
    console.log(session?.user);

    try {

        if (formData.get('election-email')) {
            const response = await fetch('http://localhost:3000/api/notifications/subscribe/email', {
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
            console.log(data);
        } 
        
        if (formData.get('election-sms')) {
            const formattedPhoneNumber = '+1' + phoneNumber;
            const response = await fetch('http://localhost:3000/api/notifications/subscribe/sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formattedPhoneNumber }),
            });
            const data = await response.json();
            console.log(data);
        }
    } catch (err) {
        console.error('Error Subscribing:', err)
    }
  }

  export async function messageSNS(formData) {
    console.log('MESSAGE...');

    const subject = formData.get('subject');
    const message = formData.get('message');

    const response = await fetch('http://localhost:3000/api/notifications/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message }),
        });
    const data = await response.json();
    console.log('NOTIF SENT', data);    
}