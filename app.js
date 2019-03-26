const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



mongoose.connect(process.env.DB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('>> Connected to database')
});

const MapSchema = new mongoose.Schema({
  name: String,
  author: String,
  cols: Number,
  rows: Number,
  data: String,
  
});

var Map = mongoose.model('Map', MapSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    Map.find({}, (err, maps) => {    
      if (err) return console.error(err);
      res.render('index.ejs', {maps: maps})
    });
})

app.post('/callMap', (req, res) => {
    Map.findOne({ name: req.body.name, author: req.body.author }, (err, map) => {    
      if (err) return console.error(err);
      res.send(map.data)
    });
})

app.listen(3000, () => {
  console.log(`>> App running`)
})