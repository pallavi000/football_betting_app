const { Router } = require('express');
const router = Router(); 
const Card = require('../model/Card')
const Authorization = require('../middleware/auth');
const Match = require('../model/Match');
const UserCard = require('../model/UserCard');
const User = require('../model/User');
const UserMatch = require('../model/UserMatch');
const Team = require('../model/Team')

// Get all cards
router.get('/', Authorization, async(req, res) => {
    try {
        const cards = await Card.find().populate('matches').sort('-_id')
        res.send(cards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// get active card
router.get('/active/get',Authorization,async(req,res)=>{
    try {
        const cards = await Card.find({'status':'active'}).populate('matches').sort('-_id')
        res.send(cards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// get archived card
router.get('/archived/get',Authorization,async(req,res)=>{
    try {
        const cards = await Card.find({'status':'archived'}).populate('matches').sort('-_id')
        res.send(cards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Create a new card
router.post('/', Authorization, async(req, res) => {
    try {
        let card = new Card({
            user_id:req.user._id,
            status:'active',  
            balance:req.body.balance,
            reward:req.body.reward
        })
        card = await card.save()
        const counts = req.body.counts
        for (const count of counts) {
            const home_team = await Team.findById(count.home_team)
            const away_team = await Team.findById(count.away_team)

            let match = new Match({
                home_team:home_team.name,
                away_team:away_team.name,
                home_team_image:home_team.image,
                away_team_image:away_team.image,
                home_team_nickname:home_team.nickname,
                away_team_nickname:away_team.nickname,
                card_id:card._id
            })
            match = await match.save();
        }
        res.send(card)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Get card By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const card = await Card.findById(req.params.id).populate('matches').sort('-_id')
        res.send(card)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

async function updateResult(card){
    const users=[]
    for (const match of card.matches) {
        const userMatches = await UserMatch.find({'match_id':match._id})
        for (let usermatch of userMatches) {
            if(match.result==usermatch.result){
               const index=  users.findIndex(user=>user.user_id.toString()==usermatch.user_id.toString() && user.user_card_id.toString()==usermatch.user_card_id.toString())
               
               if(index!=-1){
                users[index].count=users[index].count+1
               }else{
                users.push({
                    user_id:usermatch.user_id,
                    user_card_id:usermatch.user_card_id,
                    count:1
                })
               }
            }
        }
       }
       console.log(users)
       const totalMatch = card.matches.length
       const winners = users.filter(user=>user.count==totalMatch)
       

       console.log(winners)

       for (const winner of winners) {
            var winUser = await User.findById(winner.user_id)
            winUser.balance = winUser.balance+card.reward
            await winUser.save()
       }
       return winners.length
}


// Update card By ID
router.put('/:id', Authorization, async(req, res) => {
    try {
        for (const match of req.body.results) {
            var result = await Match.findById(match._id)
            result.result = match.result
            await result.save()
        }
        const card = await Card.findById(req.params.id).populate('matches')
        card.status='archived'
       
        card.winners = await updateResult(card)
        await card.save() 
       

         await UserCard.updateMany({'card_id':req.params.id},{
            status:'archived'
         },{multi:true})


        res.send(card)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete card By ID
router.delete('/:id', async(req, res) => {
    try {
        const card = await Card.deleteMany()
        res.send(card)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router