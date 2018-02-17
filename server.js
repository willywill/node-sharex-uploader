const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const generate = require('nanoid/generate')
const dotenv = require('dotenv').config()

const key = () => generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6)

const toMegaBytes = (x) => x * 1000 * 1000

let imageURL = undefined

const storageOptions = {
  destination: process.env.UPLOAD_DESTINATION,
  filename: function (req, file, callback) {
    imageURL = key() + path.extname(file.originalname)
    callback(null, imageURL)
  }
}

const storage = multer.diskStorage(storageOptions)

const limits = {
  fileSize: toMegaBytes(5)
}

const upload = multer({ storage, limits }).any()

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended: true}))

app.post('/upload', (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(500).send({ error })
    } else if (req.body.secretKey !== process.env.SECRET_KEY) {
      res.status(500).send({ error: 'Unauthorized.' })
    } else {
      res.status(200).send({ url: process.env.HOST_NAME_URL + imageURL)})
    }
  })
})

app.listen(port, () => console.log(`Server started on port ${port}.`))

module.exports = app
