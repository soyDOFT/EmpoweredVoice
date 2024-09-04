import { auth } from "@/app/_lib/auth";
import AccountUpdateForm from '@/components/AccountUpdateForm'

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
    const session = await auth();
    const response = await fetch('http://localhost:8080/api/accounts?email=' + session.user.email);
    const client = await response.json();
    console.log('client', client);

    const name = session.user.email;
    console.log('sesh',session);
    console.log(session.user);

  return (
    <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {name}
        </h2>
        <AccountUpdateForm client={client}/>
    </div>
  );
}