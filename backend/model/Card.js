const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    status:{type:String,required:true},
    balance:{type:Number,default:0},
    reward:{type:Number,default:0},
    winners:{Type:Number,default:0}
},{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

CardSchema.virtual('matches',{
    localField:'_id',
    foreignField:'card_id',
    ref:'Match'
})

const Card = mongoose.model('Card', CardSchema)

module.exports = Card