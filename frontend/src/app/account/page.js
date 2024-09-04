import GoogleLogoutButton from '@/components/GoogleLogoutButton'
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
    const session = await auth();

    const name = session.user.email;
    console.log('sesh',session);
    console.log(session.user);

  return (
    <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {name}
        </h2>
        <GoogleLogoutButton/>
    </div>
  );
}