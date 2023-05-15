const express = require('express');
const router = express.Router();
const { conn } = require('../database/connectDB');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { query } = require('express');
const bcrypt = require('bcrypt');
const verifyToken = require('../services/verify-token');

///mã hóa password (cái này lỗi phần mã hóa nên chưa mã hóa đc)
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
            .input("email", req.body.email)
            .query('insert into dbo.TAI_KHOAN (MaTK, TenTK, MatKhau, Role, email) values (@MaTK, @TenTK, @MatKhau, @Role, @email)');


        const user = req.body;
        // console.log(user);
        let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "2 days" });
        res.json({ user, token, Message: "tao user thanh cong" });

    } catch (error) {
        res.status(500).json(error);
    }
});

//lấy 1 user
router.get('/auth/user', verifyToken, async (req, res) => {
    // console.log(req.decoded);
    // console.log(req.decoded.user);
    // console.log(req.decoded.user.email);
    const email = req.decoded.user.email;

    try {

        await conn.connect();
        const result = await conn.request()
            .input('email', email)
            .query(`select * from dbo.TAI_KHOAN where email=@email`);
        const user = result.recordset[0];
        if (!user) {
            res.status(403).json({ success: false, message: 'Autheticate failed, not found user!' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }

})

// xác thực auth --- http://localhost:6969/users/auth/login
router.post('/auth/login', async (req, res, next) => {
    const email = req.body.email;
    const PassWord = req.body.PassWord;

    try {
        await conn.connect();
        const result = await conn.request()
            .input('email', email)
            .input('MatKhau', PassWord)
            .query('select * from dbo.TAI_KHOAN where email = @email');
        console.log(`User:  ${result}`);

        const user = result.recordset[0];

        if (!user) {

            res.status(403).json({
                success: false,
                message: 'Autheticate failed, không tìm thấy user!'
            });

        } else {
            // const match = await bcrypt.compare(Pwd, user.MatKhau);
            if (PassWord == user.MatKhau) {
                let token = jwt.sign(user, process.env.SECRET, { expiresIn: '5 days' });
                res.json({ user, token });
                console.log(user);
                // console.log(token);
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Sai mật khẩu rồi bây bê!'

                });
                console.log(user)

            }

        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;