const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const router = express.Router();
app.use(cors());
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_DATABASE || 'test'
})

connection.connect((err) => {
    if (err) console.log(err);
    else console.log('database connected');
})

router.get('/test', (req, res) => {
    res.send('test');
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));