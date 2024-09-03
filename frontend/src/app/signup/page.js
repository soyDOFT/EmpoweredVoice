'use client';
import Link from 'next/link';
import TextInput from '@/components/TextInput';
import PasswordInput from '@/components/PasswordInput';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { signup } from '@/app/_lib/actions'
import { useFormState } from 'react-dom';

export default function Page() {
    const [ signUpState, signUpAction ] = useFormState(signup, {});

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <form id="signup-form" action={signUpAction}>
                    <div className='space-y-12'>
                        <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Create an Account</h2>
                        {signUpState.errors && (
                        <ul>
                            {Object.keys(signUpState.errors).map((err) => <li className='text-red-600' key={err}>{signUpState.errors[err]}</li>)}
                        </ul>
                        )}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <TextInput label='Email' placeholder='example@example.com'/>
                            <TextInput label='Username' placeholder='example'/>
                            <PasswordInput/>                        
                            <div className="mt-24 flex items-center justify-end gap-x-6">
                                <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Sign Up</button>
                            </div>
                        </div>
                        <Link href="/login">Login with existing account</Link>
                        </div>
                    </div>
                </form>
                <GoogleLoginButton/>
            </div>
        </div>

        // <div>
        //     <form id="signup-form" action={signUpAction}>
        //         
        //         <p>
        //             <label htmlFor="email">Email</label>
        //             <input type="email" name="email" id="email" />
        //         </p>
        //         <p>
        //             <label htmlFor="password">Password</label>
        //             <input type="password" name="password" id="password" />
        //         </p>
        //         <p>
        //             <button type="submit">
        //             Create Account
        //             </button>
        //         </p>
        //         <p>
        //             <Link href="/">Login with existing account.</Link>
        //         </p>
        //     </form>
        // </div>
    )
}