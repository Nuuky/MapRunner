const path = require('path')
const express = require('express')
const app = express()
const assets = require('./assets')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



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
app.use(require('sanitize').middleware);

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

app.get('/test', (req, res) => {
  req.body.data = "#0123"
  //var data = req.bodyPattern('data', /((#|[0-9]|[a-z]){4}-?,?)*/gi)
  console.log(req.bodyPattern('data', /[0-9]/))
})

app.post('/callMap', (req, res) => {
  
  var name = req.bodyString('name')
  
  Map.findOne({ name: name }, (err, map) => {    
    if (err) return console.error(err);
    console.log(`[PLAY] ${map.name} has been called !`)
    res.send(JSON.stringify(map))
  });
})

app.post('/saveMap', (req, res) => {
  if (!req.body.name) return
  
  var name = req.bodyString('name')
  var cols = req.bodyInt('cols')
  var rows = req.bodyInt('rows')
  var data = req.bodyPattern('data', /((#|[0-9]|[a-z]){4}-?,?)*/gi)
  
  Map.findOne({ name: name }, (err, map) => {
    if (err) return console.error(err);
    if (map) return console.log('[SAVE] Map already exist !')
    
    console.log(`[SAVE] New map: ${name} - ${cols}x${rows}`)

    const newMap = new Map({
      name: name,
      cols: cols,
      rows: rows,
      time: null,
      data: data
    })

  newMap.save(function (err, newMap) {
  if (err) return console.error(err);
  });
});
})

app.post('/scoreMap', (req, res) => {
  var name = req.bodyString('name')
  var time = req.bodyInt('time')
  
  Map.where({ name: name }).updateOne({ $set: { time: time }}).exec()
  console.log(`[SCORE] New score for ${name}: ${getTime(time)}`)
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