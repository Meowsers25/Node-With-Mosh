const Joi = require('joi')
const express = require('express')
const app = express()

// middleware
app.use(express.json())

const courses = [
    { id: 1, name:'course 1' },
    { id: 2, name:'course 2' },
    { id: 3, name:'course 3' }

]

// HTTP verbs
app.get('/', (req, res) => {
    res.send('Hello, Express :0')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     // query string parameters-using ? in url
//     // res.send(req.query)
//     // route parameters-using : above
//     res.send(req.params)
// })

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('No course with that ID')
    res.send(course)
})

// post course
app.post('/api/courses', (req, res) => {
    // define schema object to utilize Joi
    // const schema = {
    //     // check Joi docs for various methods
    //     name: Joi.string().min(3).required()
    // }

    // // validate body and schema
    // const result = Joi.validate(req.body, schema)
    // // console.log(result)

    // // check input validation
    // // if(!req.body.name || req.body.name.length < 3){
    // if(result.error){
    //     //status 400
    //     // res.status(400).send('Incorrect naming convention. Status 400')
    //     res.status(400).send(result.error.details[0].message)
    //     // return to exit code
    //     return
    // }

    const { error } = validateCourse(req.body)
    
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    // Look up course
    // !exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('No course with thad ID')

    //validate
    // !valid, return 400 - bad request
    const { error } = validateCourse(req.body)
    
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }

    // Update course
    // return updated course
    course.name = req.body.name
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

// environment variable
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}....`))