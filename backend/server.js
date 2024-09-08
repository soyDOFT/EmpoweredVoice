const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const router = express.Router();
require('dotenv').config();
app.use(cors());
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) console.log(err);
    else console.log('Database connected');
});

router.get('/accounts', async (req, res) => {
    const { email } = req.query;

    const query = `SELECT * FROM ${process.env.DB_TABLE} WHERE email = ?`;
    const inserts = [email];
    try {
        const [ rows ] = await connection.promise().execute(query, inserts);
        res.status(200).json(rows.length > 0 ? rows[0] : {});
    } catch (err) {
        console.error('Error fetching user', err);
        throw err;
    }
})

router.get('/accounts/signin', async (req, res) => {
    const { email, password } = req.query;
    const query = `SELECT * FROM ${process.env.DB_TABLE} WHERE email = ? AND password = ?`;
    const inserts = [email, password];
    
    try {
        const [rows] = await connection.promise().execute(query, inserts);
        if (rows.length > 0) {
            res.status(200).json(rows.length > 0 ? rows[0] : {});
        } else {
            res.status(404).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Route Handler Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/accounts/signup', async (req, res) => {
    const { email, password } = req.query;
    const query = `INSERT INTO ${process.env.DB_TABLE} (email, password) VALUES (?, ?)`;
    const inserts = [email, password]
    try {
        const result = await connection.promise().query(query, inserts);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/accounts/signup/google', async (req, res) => {
    const { firstname, lastname, email, picture } = req.query;
    const query = `INSERT INTO ${process.env.DB_TABLE} (first_name, last_name, email, password, profile_image_path, role) VALUES (?, ?, ?, null, ?, 'user')`;
    const inserts = [firstname, lastname, email, picture]
    try {
        const result = await connection.promise().query(query, inserts);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/update/account', async (req, res) => {
    const { firstName, lastName, state, email } = req.query;
    const query = `UPDATE ${process.env.DB_TABLE} SET state = ?, first_name = ?, last_name = ? WHERE email = ?`;
    const inserts = [state, firstName, lastName, email]
    try {
        const result = await connection.promise().query(query, inserts);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).json({error: 'Internal server error'});
    }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));