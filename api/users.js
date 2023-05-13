const express = require('express');
const router = express.Router();
const { conn } = require('../database/connectDB');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { query } = require('express');
const bcrypt = require('bcrypt');

///ma hoa password
router.post('/account', async (req, res) => {
    var MatKhau = req.body.MatKhau;
    const encryptedMatKhau = await bcrypt.hash(MatKhau, 10);

    try {
        await conn.connect();
        await conn
            .request()
            .input("MaTK", req.body.MaTK)
            .input("TenTK", req.body.TenTK)
            .input("MatKhau", req.body.MatKhau)
            .input("Role", req.body.Role)
            .query('insert into dbo.TAI_KHOAN (MaTK, TenTK, MatKhau, Role) values (@MaTK, @TenTK, @MatKhau, @Role)');


        const user = req.body;
        console.log(user);
        let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "2 days" });
        res.json({ user, token, Message: "tao user thanh cong" });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;