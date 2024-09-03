import { db } from './db';

export default async function handler(req, res) {
    const { email } = req.query;

    const query = `SELECT * FROM users WHERE email = ?`;
    const inserts = [email];
    try {
        const [ rows ] = await db.promise().execute(query, inserts);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching user', err);
        throw err;
    }
}