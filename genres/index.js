const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./logger')
const auth = require('./auth')
const express = require('express')
const app = express()

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get('env')}`)

// built in middleware
app.use(express.json())
app.use(express.urlencoded( {extended: true}) )
app.use(express.static('public'))
app.use(helmet())

// Configuration
console.log(`Application name ${config.get('name')}`)
console.log(`Mail server: ${config.get('mail.host')}`)
console.log(`Mail password: ${config.get('mail.password')}`)


// morgan logs requests; don't use in production
// will slow applicatiuon down
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled....')
}


// custom middleware
// must use next 
// custom middleware should go in a seperate file
// see import above
app.use(logger)

app.use(auth)



const genres = [
    { id: 1, genre: 'horror'},
    { id: 2, genre: 'comedy'},
    { id: 3, genre: 'documentary'}
]

// vidly home page
app.get('/', (req, res) => {
    res.send('Hello from Vidly')
})

// list genres
app.get('/api/genres', (req, res) => {
    res.send(genres)
})

// get individual genre
app.get('/api/genres/:id',(req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Invalid genre')
    res.send(genre)
})

// function for input validation
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

// post genre
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

// update genre
app.put('/api/genres/:id', (req, res) => {
    // look up genre; !exist, return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id))

    if(!genre) return res.status(404).send('Invalid Genre....')

    //validate; !valid, return 400, bad req
    const { error } = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    //update genre; return
    genre.name = req.body.name
    res.send(genre) 
})

// delete genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))

    if (!genre) return res.status(404).send('Invalid Genre')

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})

const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}.....`))