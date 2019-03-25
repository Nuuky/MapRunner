const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB);



app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));


app.get('/', async (req, res) => {
  res.render('index.html')
})

app.post('/callMap', (req, res) => {
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    
  console.log('Calling Map', req)
  res.send('test')
  });
})

app.listen(3000, () => {
  console.log(`>> App running`)
})