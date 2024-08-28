import Link from 'next/link';

export default function Nav() {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/civics">Election Information</Link>
            </li>
            <li>
                <Link href="/about">Why does it Matter?</Link>
            </li>
            <li>
                <Link href="/register">Voting Registration</Link>
            </li>
        </ul>
    )
}