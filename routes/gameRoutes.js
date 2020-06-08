const express = require('express')
const {uuid} = require('uuidv4')
const router = express.Router();
const games = require('../models/games')




router.get('/getAllGames',(req,res)=>{
    if(games.length===0){
        return res.status(404).json({confirmation: 'failed',message: 'Game Not Found'})
    }
    return res.status(200).json({confirmation: 'success', games})
    })

router.get('/getSingleGame/:name',(req,res)=>{
        const game = games.filter(game=> game.name === req.params.name)
        if(game.length === 0){
            return res.status(404).json({confirmation: 'failed',message: 'Game Not Found'})
        }
    
        return res.status(200).json({confirmation: 'success',game})
})



router.post('/createGame', (req,res)=>{

    if(!req.body.name || !req.body.description){
        return res.status(400).json({confirmation : 'failed', message: 'You must fill in name and description'})
    }
    const game = games.filter((user)=>{
        return user.name === req.body.name 
    })
    if(game.length > 0){
        return res.status(400).json({confirmation:'fail', message:'Game Already exists'})
    } else {
    let newGame = {}

    // newGame.id = (games.length+1).toString()
    newGame.id = uuid();
    newGame.name = req.body.name;
    newGame.description = req.body.description;
    newGame.yearReleased = req.body.yearReleased;
    newGame.playtime = req.body.playtime;
    games.push(newGame);

    return res.status(201).json({message:'Game Created', games})
    }
})


router.put('/:name', (req, res) => {

    let game = games.filter((game) => game.name === req.params.name);
    let updatedGame = req.body;
    if (game.length > 0) {

      games.forEach((game) => {
        console.log(game.id, req.params.id);
        if (game.id === req.params.id) {
          game.name = updatedGame.name ? updatedGame.name : game.name;
          game.description = updatedGame.description ? updatedGame.description : game.description;
        }
      });
    }
    return res.json({ message: 'Game Updated', games });
  });


  router.delete('/:name',(req,res)=>{


    const game = games.filter(game=>game.name !== req.params.name)
    return res.status(200).json({confirmation: 'success',game})
    })

module.exports = router