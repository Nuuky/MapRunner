const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');



mongoose.connect(process.env.DB, { useNewUrlParser: true, 'useCreateIndex': true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('>> Connected to database')
});

const MapSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  cols: Number,
  rows: Number,
  time: Number,
  data: {
    type: String,
    trim: true,
  },
  
});

var Map = mongoose.model('Map', MapSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSanitizer());

app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    Map.find({}, (err, maps) => {    
      if (err) return console.error(err);
      res.render('index.ejs', {maps: maps})
    });
  console.log("[JOIN] New player")
})

app.post('/callMap', (req, res) => {
  
  var name = req.sanitize(req.body.name);
  
  Map.findOne({ name: name }, (err, map) => {    
    if (err) return console.error(err);
    console.log(`[PLAY] ${map.name} has been called !`)
    res.send(JSON.stringify(map))
  });
})



app.post('/saveMap', (req, res) => {
  if (!req.body.name) return
  else if (req.body.name > 10) return
  
  var name = req.sanitize(req.body.name);
  var cols = (typeof req.body.cols === 'number' && req.body.cols > 10 && req.body.cols < 1000) ? true : false
  var rows = (typeof req.body.rows === 'number' && req.body.rows > 10 && req.body.rows < 500) ? true : false
  var data = (req.body.data.match(/((#|[0-9]|[a-z]){4}-?,?)*/gi).length <= 2) ? true : false
  if(!cols || !rows || !data) return console.error(`[SAVE] Something wrong with data set: \n${req.body}`)
  
  Map.findOne({ name: name }, (err, map) => {
    if (err) return console.error(err);
    if (map) return console.log('[SAVE] Map already exist !')
    
    console.log(`[SAVE] New map: ${name} - ${req.body.cols}x${req.body.rows}`)

    const newMap = new Map({
      name: name,
      cols: req.body.cols,
      rows: req.body.rows,
      time: null,
      data: req.body.data
    })

  newMap.save(function (err, newMap) {
  if (err) return console.error(err);
  });
});
})



app.post('/scoreMap', (req, res) => {
  var name = req.sanitize(req.body.name);
  var time = (typeof req.body.time === 'number' && time > 0) ? true : false
  if(!time) return console.log(`[SCORE] Something wrong with time: \n${req.body.time}`)
  
  Map.where({ name: name }).updateOne({ $set: { time: req.body.time }}).exec()
  console.log(`[SCORE] New score for ${name}: ${getTime(req.body.time)}`)
})

app.listen(3000, () => {
  console.log(`>> App running`)
})


function getTime(nb) {
  nb = Number(nb)

  if(nb === 0) return '00:00:00'


  var msA = `${Math.floor(nb%1000)}`

  // // 1000).toFixed(2)
  if(msA > 1000) msA = ((msA / 1000).toFixed(0)) //* 10
  else if(msA > 100) msA = ((msA / 1000).toFixed(2)) * 100
  else if (msA === 100) msA = 00

  var ms  = `${(msA < 10) ? '0' : ''}${Math.round(msA)}`
  var sec = `${(Math.floor(nb/1000%60) < 10) ? '0' : ''}${Math.floor(nb/1000%60)}`
  var min = `${(Math.floor(nb/1000/60) < 10) ? '0' : ''}${Math.floor(nb/1000/60)}`
  return min + ':' + sec + ':' + ms
}