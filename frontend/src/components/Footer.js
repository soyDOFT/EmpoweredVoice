'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  async function handleSubscribe(e) {
    e.preventDefault();
    const response = await fetch('/api/notifications/subscribe/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await response.json();
  };

    return (
<footer className="footer bg-page text-base-content p-10 320Max:p-0 320Max:pl-5 shadow-2xl ">
  <aside>
    <img
      src="/ev-logo.svg" alt="Company Logo" className="h-32 320Max:h-20"
    />
  </aside>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link href='/' className="link link-hover">Home</Link>
    <Link href='/candidates' className="link link-hover">Candidates</Link>
    <Link href='/elections' className="link link-hover">Elections</Link>
    <Link href='/register' className="link link-hover">Register</Link>
    <Link href='/about' className="link link-hover">About</Link>
    <Link href='/faq' className="link link-hover">FAQ</Link>

  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form onSubmit={handleSubscribe}>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80 320Max:w-52">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item 320Max:w-3/5 " />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>

    )
}