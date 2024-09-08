import { auth } from '@/app/_lib/auth'
import AccountUpdateForm from '@/components/AccountUpdateForm';

export default async function page() {
    const session = await auth();
    const response = await fetch('http://localhost:8080/api/accounts?email=' + session.user.email);
    const client = await response.json();
    return (
        <AccountUpdateForm client={client} />
    )
}
