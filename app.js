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
  data: String,
  
});

var Map = mongoose.model('Map', MapSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));


app.get('/', async (req, res) => {
  res.render('index.html')
})

app.post('/callMap', (req, res) => {
    Map.find({ name: req.body.name, author: req.body.author }, (err, map) => {    
      if (err) return console.error(err);
      res.send(map[0].data)
    });
})

app.listen(3000, () => {
  console.log(`>> App running`)
})