import { auth } from '@/app/_lib/auth'

export default async function page() {
    const session = await auth();
    return (
        <AccountUpdateForm client={client} />
    )
}
