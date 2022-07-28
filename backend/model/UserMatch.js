const mongoose = require('mongoose');

const UserMatchSchema = new mongoose.Schema({
    match_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Match"},
    card_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Card'},
    user_card_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'UserCard'},
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    home_team:{type:String,required:true},
    away_team:{type:String,required:true},
    result:{type:String,required:true},
    home_team_image:{type:String,required:true},
    away_team_image:{type:String,required:true},
    home_team_nickname:{type:String},
    away_team_nickname:{type:String},
},{
    timestamps: true,
});




const UserMatch = mongoose.model('UserMatch', UserMatchSchema)

module.exports = UserMatch