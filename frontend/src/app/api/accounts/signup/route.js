import { db } from '../../db';

export async function GET(req, res) {
    const { email, password } = req.query;
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const inserts = [email, password]
    try {
        const result = await connection.promise().query(query, inserts);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}