const express = require('express')
const app = express()

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
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}....`))