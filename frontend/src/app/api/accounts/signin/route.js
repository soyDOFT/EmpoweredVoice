import { db } from '../../../lib/db'; // Adjust the path based on your file structure

export async function GET(req) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const inserts = [email, password];

    try {
        const [rows] = await db.promise().execute(query, inserts);

        if (rows.length > 0) {
            return new Response(JSON.stringify(rows[0]), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}