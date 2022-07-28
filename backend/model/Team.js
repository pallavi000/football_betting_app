const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    nickname:{type:String,required:true}
},{
    timestamps: true,
});

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team