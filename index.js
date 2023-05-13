const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to Back End form')
});

app.use('/test', require('./api/TestConnect'))
app.use('/users', require('./api/users'))

app.listen(process.env.port, () => {
    console.log(`App is runing in port ${process.env.port}`)
});