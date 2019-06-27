const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

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