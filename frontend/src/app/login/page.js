'use client';
import Link from 'next/link'
import TextInput from "@/components/TextInput";
import GoogleLoginButton from "@/components/GoogleLoginButton"
import PasswordInput from '@/components/PasswordInput';
import { credSignIn } from '../_lib/actions';
import { useFormState } from 'react-dom';

export default function Page() {
    const [ credSignInState, credSignInAction ] = useFormState(credSignIn, {});

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <form action={credSignInAction}>
                    <div className='space-y-12'>
                        <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-4xl font-semibold leading-7 text-secondary">Login</h2>
                        {credSignInState.errors && (
                        <ul className='mt-3'>
                            {Object.keys(credSignInState.errors).map((err) => <li className='text-red-600' key={err}>{credSignInState.errors[err]}</li>)}
                        </ul>
                        )}
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <TextInput label='Email' placeholder='example@example.com'/>
                            <PasswordInput/>                          
                            <div className="mt-24 flex items-center justify-end gap-x-6">
                                <button
                                type="submit"
                                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1803fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Login</button>
                            </div>
                        </div>
                        <Link href="/signup" className='text-secondary text-md hover:underline hover:text-primary'>Don't have an Account? Create one!</Link>
                        </div>
                    </div>
                </form>
                <GoogleLoginButton />
            </div>
        </div>
    )
}