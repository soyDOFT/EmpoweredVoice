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
                        <h2 className="text-4xl font-semibold leading-7 text-secondary">Create an Account</h2>
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
                                className="rounded-md  bg-primary w-72 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-[#1803fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Sign Up</button>
                            </div>
                        </div>
                        <Link href="/login"  className=' text-secondary text-md hover:underline hover:text-primary'>Login with existing account</Link>
                        </div>
                    </div>
                </form>
                <GoogleLoginButton/>
            </div>
        </div>
    )
}