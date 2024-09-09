import Link from 'next/link';
import { auth } from "../app/_lib/auth"

export default async function Nav() {
  const session = await auth();

    return (
        <div className="navbar bg-page opacity-80 z-[999]">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <img src='hamburger.svg' className='phoneMax:h-32'></img>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-secondary">
                <li><Link href="/candidates">Candidates</Link></li>
                <li><Link href="/elections">Elections</Link></li>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <Link className=" text-xl" href="/">
              <img className="h-24" src="/ev-logo.svg" alt="logo" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-xl">
            <li><Link href="/candidates">Candidates</Link></li>
              <li><Link href="/elections">Elections</Link></li>
              <li><Link href="/register">Register</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/faq">FAQ</Link></li>

            </ul>
          </div>
          <div className="navbar-end">
            {session?.user ? 
            <Link className="btn" href="/account/profile">
              <img className="h-10 rounded-full" 
              src={session.user.image || "\deafult-profile.png"} 
              alt={session.user.name || 'default profile'}
              referrerPolicy='no-referrer'/>
            </Link> 
            : <Link className="btn text-white border-none bg-primary hover:bg-secondary hover:text-white" href="/account/profile">Login</Link>}
          </div>
        </div>
    )
}