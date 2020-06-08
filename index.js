const express = require('express')
const app = express()
const path = require('path')
// const { uuid } = require('uuidv4')
const morgan = require('morgan')
require('dotenv').config()

const snarky = require('./middlewares/snarky')
const gameRouter = require('./routes/gameRoutes')

const port = process.env.PORT || 8080


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(snarky)
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})


app.use('/api/v1/games',gameRouter);