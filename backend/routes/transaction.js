const { Router } = require('express');
const router = Router(); 
const Transaction = require('../model/Transaction') 
const Authorization = require('../middleware/auth');
const User = require('../model/User');

// Get all transactions
router.get('/', Authorization, async(req, res) => {
    try {
        const transactions = await Transaction.find()
        res.send(transactions)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// get transaction by user id

router.get('/user/transit/',Authorization, async(req,res)=>{
    try {
        let transaction
        if(req.user.role=='admin'){
            transaction = await Transaction.find()

        }else{
            transaction = await Transaction.find({'user_id':req.user._id})

        }

        res.send(transaction)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Create a new transaction
router.post('/', Authorization, async(req, res) => {
    try {
        let transaction = new Transaction({
          
        })
        transaction = await transaction.save()
        res.send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get transaction By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        res.send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update transaction By ID
router.put('/:id', Authorization, async(req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
            key:value
        },{new: true})
        res.send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete transaction By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        res.send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router