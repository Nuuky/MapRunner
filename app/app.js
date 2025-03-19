const path = require('path')
const express = require('express')
const app = express()
// const assets = require('./assets')
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const fs = require("fs");


// mongoose.connect(process.env.DB, { useNewUrlParser: true, 'useCreateIndex': true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('>> Connected to database')
// });

// const MapSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true,
//   },
//   cols: Number,
//   rows: Number,
//   time: Number,
//   data: {
//     type: String,
//     trim: true,
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   }

// });

// var Map = mongoose.model('Map', MapSchema);


app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(expressSanitizer());

// app.use('/img', assets)
app.use('/asset', express.static('asset'))
app.use(express.static(path.join(__dirname)));
app.use(express.static('public'))

app.set('view engine', 'ejs')



app.get('/', async (req, res) => {
	console.log("[JOIN] New player")

	res.render('index.ejs')

	// Map.find({}, (err, maps) => {    
	//   if (err) return console.error(err);
	//   res.render('index.ejs', {maps: maps})
	// });
})

app.post('/getMaps', (req, res) => {
	const mapFiles = fs.readFileSync('./maps.json', 'utf8')
	const maps = JSON.parse(mapFiles);
	res.send(JSON.stringify(Object.values(maps)))
})

app.post('/callMap', (req, res) => {
	console.log("CALLING MAP...")
	
	const mapFiles = fs.readFileSync('./maps.json', 'utf8')
	const maps = JSON.parse(mapFiles);
	var name = req.sanitize(req.body.name);

	if (!(name in maps)) {
		console.error("Map doesn't exist:", name)
	}
	res.send(JSON.stringify(maps[name]))
	console.log(`[PLAY] ${name} has been called !`)

	// Map.findOne({ name: name }, (err, map) => {    
	//   if (err) return console.error(err);
	//   console.log(`[PLAY] ${map.name} has been called !`)
	//   res.send(JSON.stringify(map))
	// });
})



app.post('/saveMap', (req, res) => {
	console.log("SAVING MAP...")
	if (!req.body.name) return
	else if (req.body.name > 10) return

	var name = req.sanitize(req.body.name);
	var cols = (req.body.cols >= 10 && req.body.cols <= 1000) ? true : false
	var rows = (req.body.rows >= 10 && req.body.rows <= 500) ? true : false
	var data = /((#|[0-9]|[a-z]){4}-?,?)*/gi.test(req.body.data)
	if (!cols || !rows || !data) return console.error(`[SAVE] Something wrong with data set:\nName: ${req.body.name}\nSize: ${req.body.cols}(${cols})x${req.body.rows}(${rows})\nData: ${data}`)

	const newMap = {
		name: name,
		cols: req.body.cols,
		rows: req.body.rows,
		time: null,
		created: Date.now(),
		data: req.body.data,
	}

	const maps = fs.readFileSync('./maps.json', 'utf8')
	const obj = JSON.parse(maps);
	obj[name] = newMap
	json = JSON.stringify(obj, null, 4);
	fs.writeFileSync('./maps.json', json, 'utf8');
	console.log(`[SAVE] New map: ${name} - ${newMap.cols}x${newMap.rows}`)



	// Map.findOne({ name: name }, (err, map) => {
	// 	if (err) return console.error(err);
	// 	if (map) return console.log('[SAVE] Map already exist !')

	// 	console.log(`[SAVE] New map: ${name} - ${req.body.cols}x${req.body.rows}`)

	// 	const newMap = {
	// 		name: name,
	// 		cols: req.body.cols,
	// 		rows: req.body.rows,
	// 		time: null,
	// 		data: req.body.data
	// 	}

	// 	newMap.save(function (err, newMap) {
	// 	if (err) return console.error(err);
	// 	});
	// });
})



app.post('/scoreMap', (req, res) => {
	console.log("SCORING MAP...")
	var name = req.sanitize(req.body.name);
	var time = req.body.time
	if ((req.body.time == 0)) return console.error(`[SCORE] Something wrong with time: \n${req.body.time}`)

	// Map.where({ name: name }).updateOne({ $set: { time: req.body.time }}).exec()
	
	const maps = fs.readFileSync('./maps.json', 'utf8')
	const obj = JSON.parse(maps);
	obj[name]["time"] = time
	json = JSON.stringify(obj, null, 4);
	fs.writeFileSync('./maps.json', json, 'utf8');
	console.log(`[SCORE] New score for ${name}: ${getTime(req.body.time)}`)
})

app.listen(3000, () => {
	console.log(`>> App running`)
})


function getTime(nb) {
	nb = Number(nb)

	if (nb === 0) return '00:00:00'


	var msA = `${nb % 1000}`

	// // 1000).toFixed(2)
	if (msA > 1000) msA = ((msA / 1000).toFixed(0)) //* 10
	else if (msA > 100) msA = ((msA / 1000).toFixed(2)) * 100
	if (msA === 100) msA = '00'

	var ms = `${(msA < 10) ? '0' : ''}${msA}`
	var sec = `${(Math.floor(nb / 1000 % 60) < 10) ? '0' : ''}${Math.floor(nb / 1000 % 60)}`
	var min = `${(Math.floor(nb / 1000 / 60) < 10) ? '0' : ''}${Math.floor(nb / 1000 / 60)}`
	return min + ':' + sec + ':' + ms
}