const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')



app.use('/img', assets)
app.use('/asset', express.static('asset'))


app.get('/', async (req, res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log(`>> App running`)
})