import Link from 'next/link';
import { auth } from "../app/_lib/auth"

export default async function Nav() {
  const session = await auth();

    return (
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link href="/civics">Civics</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/register">Register</Link></li>
              </ul>
            </div>
            <Link className="btn btn-ghost text-xl" href="/">EmpoweredVoice</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/civics">Civics</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
          <div className="navbar-end">
            {session?.user?.image ? 
            <Link className="btn" href="/account">
              <img className="h-10 rounded-full" 
              src={session.user.image} 
              alt={session.user.name}
              referrerPolicy='no-referrer'/>
            </Link> 
            : <Link className="btn" href="/account">Login</Link>}
          </div>
        </div>
    )
}