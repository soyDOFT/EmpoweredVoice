export default function PasswordInput() {
    return (
        <div className="sm:col-span-5">
            <label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-wd">
                    <input 
                        type="password"
                        id='password'
                        name='password'
                        placeholder='*********'
                        className="pl-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                </div>
            </div>
        </div>

    )
}