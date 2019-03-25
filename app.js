const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')
const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  name: String,
  author: String,
  data: String,
  
});

var Map = mongoose.model('Map', MapSchema);


app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));


app.get('/', async (req, res) => {
  res.render('index.html')
})

app.post('/callMap', (req, res) => {
  
  mongoose.connect(process.env.DB, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    
    Map.find({ name: "Default"}, (err, map) => {    
      if (err) return console.error(err);
      console.log(map);
      res.send(map[0])
    });
  });
})

app.listen(3000, () => {
  console.log(`>> App running`)
})