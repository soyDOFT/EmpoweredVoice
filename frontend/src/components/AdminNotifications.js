import { messageSNS } from '@/app/_lib/actions';
import SubmitNotifButton from '@/components/SubmitNotifButton'
export default function AdminNotifications() {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Admin Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Create notifications to send out.</p>

        <form action={messageSNS} className="mt-10 space-y-10">
            <div className="flex flex-col space-y-2">
                <label htmlFor="subject">Subject</label>
                <input
                name="subject"
                id="subject"
                className="px-5 py-3 bg-primary-200 text-primary-800 w-5/6 shadow-sm rounded-sm"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="message">Message</label>
                <input
                name="message"
                id="message"
                className="px-5 py-3 bg-primary-200 text-primary-800 w-5/6 shadow-sm rounded-sm"
                />
            </div>
            <div className="flex justify-end items-center gap-6">
                <SubmitNotifButton />
            </div>
        </form>
    </div>
  )
}
