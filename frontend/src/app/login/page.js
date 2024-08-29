import TextInput from "@/components/TextInput";

export default function Page() {

    function submitHandler() {
        e.preventDefault();
        const user = e.target.value;
        const pass = e.target.value;
        console.log(e.target.value);
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <form>
                    <div className='space-y-12'>
                        <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <TextInput label='Username' placeholder='example'/>
                            <TextInput label='Password' placeholder='********'/>                            
                            <div className="mt-24 flex items-center justify-end gap-x-6">
                                <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Login</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}