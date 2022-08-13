const { Router } = require('express');
const router = Router(); 
const Team = require('../model/Team') 
const Authorization = require('../middleware/auth');
const ApiError = require('../middleware/ApiError');

// Get all teams
router.get('/', Authorization, async(req, res) => {
    try {
        const teams = await Team.find().sort('-_id')
        res.send(teams)
    } catch (error) {
        ApiError(res, 500, 'Server Error', error)
    }
})

// Create a new team
router.post('/', Authorization, async(req, res) => {
    try {
        console.log(req.files)

        let picture=''
        if(req.files.image){
            console.log(req.files.image)
            const image = req.files.image
           var r= Math.random()
            r= r.toString().replace('.','-')
            var is_error= false
            const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

             picture = '/images/'+imageName
            const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName

           image.mv(uploadPath,(error)=>{
            is_error= error
           })
           if(is_error){
            return res.status(500).send(is_error)
           }
        }

        let team = new Team({
            name:req.body.name,
            nickname:req.body.nickname,
            image:picture
        })
        team = await team.save()
        res.send(team)
    } catch (error) {
        ApiError(res, 500, 'Server Error', error)
    }
})

// Get team By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        res.send(team)
    } catch (error) {
        ApiError(res, 500, 'Server Error', error)
    }
})

// Update team By ID
router.put('/:id', Authorization, async(req, res) => {
    try {

        const team = await Team.findById(req.params.id)

        if(req.files && req.files.image){
            const image = req.files.image
           var r= Math.random()
            r= r.toString().replace('.','-')
            var is_error= false
            const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

            var picture = '/images/'+imageName
            const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName

           image.mv(uploadPath,(error)=>{
            is_error= error
           })
           if(is_error){
            return  res.status(500).json(is_error)
           }
           team.image=picture
        }
            team.name=req.body.name,
            team.nikname=req.body.nikname,
           await team.save()
        res.send(team)
    } catch (error) {
        ApiError(res, 500, 'Server Error', error)
    }
})

// Delete team By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id)
        res.send(team)
    } catch (error) {
        ApiError(res, 500, 'Server Error', error)
    }
})

module.exports = router