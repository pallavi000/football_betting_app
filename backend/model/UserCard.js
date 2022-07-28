const mongoose = require('mongoose');

const UserCardSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    status:{type:String,required:true},
    card_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Card'}
},{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


UserCardSchema.virtual('matches',{
    foreignField:'user_card_id',
    localField:'_id',
    ref:'UserMatch'
})




const UserCard = mongoose.model('UserCard', UserCardSchema)

module.exports = UserCard