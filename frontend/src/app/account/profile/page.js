import { auth } from '@/app/_lib/auth'
import AccountUpdateForm from '@/components/AccountUpdateForm';

export default async function page() {
    const session = await auth();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts?email=${session.user.email}`);
    const client = await response.json();
    return (
        <AccountUpdateForm client={client} />
    )
}
