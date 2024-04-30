const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
res.render('index');
})
app.get('/read', async(req,res,next)=>{
    let allUsers = await userModel.find();
    res.render('read',{users:allUsers});
})
app.post('/create', async (req,res,next)=>{
    let {name,email,imageUrl} = req.body;
    let createdUser = await userModel.create({
        name:name,
        email:email,
        imageUrl:imageUrl
    })
    res.render('read');
})

app.listen(3000);