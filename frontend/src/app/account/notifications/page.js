import { auth } from '@/app/_lib/auth';
import { subscribeSNS } from '@/app/_lib/actions';
import AdminNotifications from '@/components/AdminNotifications';
import SubmitButton from '@/components/SubmitButton';
import PhoneInput from '@/components/PhoneInput'

export default async function page() {
    const session = await auth();
    console.log('notifs', session);

    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Choose what you want to hear about.</p>

        <form action={subscribeSNS} className="mt-10 space-y-10">
        <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
            <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="election-email" name="election-email" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="election-email" className="font-medium text-gray-900">Election dates through Email</label>
                        <p className="text-gray-500">Get notified for important election dates.</p>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
            <div className="mt-6 space-y-6">
                <PhoneInput/>
            </div>
        </fieldset>
            <div className="flex justify-end items-center gap-6">
            <SubmitButton />
            </div>
        </form>
        
        {session.user.role === 'admin' && <AdminNotifications/>}
        </div>
    )
}
