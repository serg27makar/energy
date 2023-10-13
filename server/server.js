const bodyParser = require('body-parser');
const db = require("./database");
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', (req, res) => {
    const {email, password} = req.body;
    let data = {}
    db.getToDB(result => {
        data = result
        if (data && data.users) {
            let isLogin = false;
            data.users.map(item => {
                if (item.email === email && item.password === password) isLogin = true
            })
            if (isLogin) {
                res.send({
                    token: 'test456'
                });
                res.end()
            } else {
                res.send({
                    errMsg: 'email or password is invalid'
                });
                res.end()
            }
        } else {
            res.send({
                errMsg: 'something was wrong'
            });
            res.end()
        }
    });
});

app.use('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    let data = {}
    db.getToDB(result => {
        data = result
        if (data && data.users) {
            let exist = false;
            data.users.map(item => {
                if (item.email === email && !exist) exist = true;
            })
            if (exist) {
                res.send({
                    errMsg: "this user already exist"
                });
                res.end()
                return;
            }
        } else {
            data = {
                users: []
            }
        }
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        data.users.push(user)
        db.setToDB(data)
        res.send({
            token: 'test456'
        });
        res.end()
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));