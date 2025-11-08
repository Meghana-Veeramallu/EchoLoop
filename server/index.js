const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/Users')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/users");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else{
                res.json("Incorrect Password")
            }
        } else {
            res.json("User doesn't exist")
        }
    })
})

app.post('/signup', (req, res) => {
    UsersModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.listen(4000, () => {
    console.log("server is running")
})