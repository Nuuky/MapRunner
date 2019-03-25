const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')



app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));


app.get('/', async (req, res) => {
  res.render('index.html')
})

app.post('/callMap', (req, res) => {
  console.log('Calling Map', req)
  res.send('test')
})

app.listen(3000, () => {
  console.log(`>> App running`)
})