const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    home_team:{type:String,required:true},
    home_team_image:{type:String,required:true},
    away_team_image:{type:String,required:true},
    home_team_nickname:{type:String},
    away_team_nickname:{type:String},
    away_team:{type:String,required:true},
    result:{type:String},
    card_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Card'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps: true,
});

const Match = mongoose.model('Match', MatchSchema)
module.exports = Match