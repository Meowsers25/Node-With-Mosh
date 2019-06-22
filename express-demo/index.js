const express = require('express')
const app = express()

// HTTP verbs
app.get('/', (req, res) => {
    res.send('Hello, Express :0')
})

app.get('/api/courses', (req, res) => {
    res.send([5, 8, 25])
})

const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}....`))