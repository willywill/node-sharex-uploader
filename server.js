const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())

app.post('/upload', async (req, res) => res.send({ message: 'Upload feature coming soon!' }))

app.listen(port, async () => console.log(`Server started on port ${port}.`))

module.exports = app