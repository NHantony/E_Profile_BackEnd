const express = require('express');
const router = express.Router();
const { conn } = require('../database/connectDB');

router.get('/', async (req, res) => {
    try {
        await conn.connect();
        const result = await conn.request().query('select * from dbo.TAI_KHOAN');
        const test = result.recordset;

        res.json(test);
        //console.log(test);

    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;