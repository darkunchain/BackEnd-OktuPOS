const { Router } = require('express');
const router = Router();
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { find } = require('../models/userModel');

router.get('/', (req,res) => res.send('Hello World!!!'))

router.post('/signup', async (req,res) => {
    const { username, password, rol} = req.body
    if(!username || !password) return res.status(401).send('los campos de email y password no pueden estar vacios')
    const findUser = await User.findOne({username})    
    if(findUser) return res.status(401).send('Este usuario ya existe, pruebe con otro')
    newUser = new User({username,password,rol});
    console.log('signup_request:', newUser)
    
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'MyFr4s3_S3cr3t4+')
    console.log('signup_token:', token)
    res.status(200).json({token});
})

router.post('/signin', async (req,res) => {
    const { username, password, rol } = req.body;
    if(!username || !password) return res.status(401).send('los campos de email y password no pueden estar vacios')
    const user = await User.findOne({username})
    if(!user) return res.status(401).send('El usuario no existe en la base de datos')
    if(user.password !== password) return res.status(401).send('Password incorrecto')

    const token = jwt.sign({_id:user._id}, 'MyFr4s3_S3cr3t4+')
    res.status(200).json({token});
})

router.get('/private', verifyToken, (req,res) => res.send('Hello World!!!'))

router.get('/usuarios', async (req,res) => {
    usuarios = await User.find()

    res.json(usuarios)
})


module.exports = router;

function verifyToken(req, res, next) {
    console.log('req.headers.authorization', req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send('No esta autorizado para esta solicitud')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('No esta autorizado para esta solicitud')
    }
    const payload = jwt.verify(token, 'MyFr4s3_S3cr3t4+')    
    console.log('payload:', payload)
    req.userID = payload._id
    next();
}