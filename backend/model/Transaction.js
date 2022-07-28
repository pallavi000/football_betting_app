const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount:{type:Number,required:true},
    payment_method:{type:String,required:true,default:'credit-card'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction