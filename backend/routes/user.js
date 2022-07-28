const { Router } = require('express');
const router = Router(); 
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Authorization = require('../middleware/auth');
const Transaction = require('../model/Transaction');

// Get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new user
router.post('/register', async(req, res) => {

    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await  bcrypt.hash(req.body.password,salt)

        let user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword
        })
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        console.log(user)
        if(user){
            const valid = await bcrypt.compare(req.body.password,user.password)  
            if(valid){
               
                var token = await jwt.sign({ _id: user._id,email:user.email }, process.env.SECRET_KEY);
                console.log(token)
                res.json({token:token,user:user})
                
            }else{
                res.status(400).json('login failed!Invalid Password')
            }
        }else{
            res.status(404).json('user not found')
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Get user By ID
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/current/user',Authorization, async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/change/password/',Authorization,async(req,res)=>{
    try {
        if(req.body.newpassword == req.body.confirmpassword){
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await  bcrypt.hash(req.body.newpassword,salt)
    
            const user = await User.findById(req.user._id)
                user.password = hashPassword
                user.save()
            res.send(user) 
        }else{
            res.status(400).send('Password didnot match')
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update user By ID
router.put('/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {

        },{new: true})
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// user update balance
router.put('/balance/update', Authorization,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        console.log(req.body.balance)
        user.balance = user.balance+req.body.balance
        await user.save()

        var transaction = new Transaction({
            amount:req.body.balance,
            payment_method:'credit_card',
            user_id:req.user._id
        })
       transaction =  await transaction.save()

        res.send({user,transaction})
    } catch (error) {
        res.status(500).send(error.message)
    }
   
})

// admin update balance
router.put('/admin/balance-update/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        user.balance = user.balance+Number(req.body.balance)
        await user.save()
        
    } catch (error) {
        res.status(500).send(error.message)
    }
   
})

// Delete user By ID
router.delete('/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router
