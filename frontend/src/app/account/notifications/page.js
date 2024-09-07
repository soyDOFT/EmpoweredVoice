import { auth } from '@/app/_lib/auth'

export default async function page() {
    const session = await auth();
    console.log('notifs', session);
    if (session.user.role === 'admin') {
        return (
            <div>
                Admin
            </div>
        )
    } else {
        return (
            <div>
                User
            </div>
        )
    }
}
