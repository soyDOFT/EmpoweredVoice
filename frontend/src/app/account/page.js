import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page({ children }) {
  const session = await auth();
  const response = await fetch('http://localhost:8080/api/accounts?email=' + session.user.email);
  const client = await response.json();

  const name = session.user.email;
  //session.user.role = client.role;
  console.log('sesh2', session);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {name}
      </h2>
      {children}
    </div>
  );
}