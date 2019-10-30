const cp = require('child_process');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");11
const app = express();
const fs = require('fs');
const lvl3Routes = require('./routeLevel3/routesLvl3.js');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/", lvl3Routes);

app.get('/evalInput', function (req, res) {
		const command = 'ping ';
		const regexpFromatHTML = /\n/gi;
		const regexpNoCheat = /server/gi;
		const queryParam = req.query.userIp;

		console.log(queryParam);
		//no cheat
		if(queryParam.match(regexpNoCheat))
			res.send('You should not Cheat!');
		else
			cp.exec(command + queryParam, (_err, stdout, _stderr) => {	
				const response = stdout.replace(regexpFromatHTML, "<br>");
				res.send(response);
			});   
});

//submit flag for level 1
app.get('/flagLvl1', function (req, res) {
	console.log(req.query.flag)
	if(req.query.flag === '{desktop-e6kdc66\\nicolas/10.0.18362.418}')
		res.send('Yeahh geschafft. Du hast die erste Flagge gefunden. <br><a href=10391f993067d8ecf3c2681bcc762734e953711d4d0532c1feb9f7c0fa812e55> Hier gehts zur zweiten Aufgabe </a>"');
	else
		res.send('Sorry das war wohl nicht die richtige Flagge');
});


//submit flag for level 2
app.get('/flagLvl2', function (req, res) {
	console.log(req.query.flag)
	if(req.query.flag === '{10391f993067d8ecf3c2681bcc762734e953711d4d0532c1feb9f7c0fa812e55}')
		res.send('Yeahh geschafft. Du hast die erste Flagge gefunden. <br><a href=981a6b2fe171aa8eb53b6d76f7976063c88ef63cb588dbece8a543e1c95e2145> Hier gehts zur zweiten Aufgabe </a>"');
	else
		res.send('Sorry das war wohl nicht die richtige Flagge');
});


//submit flag for level 3
app.get('/flagLvl3', function (req, res) {
	console.log(req.query.flag)
	if(req.query.flag === '{10391f993067d8ecf3c2681bcc762734e953711d4d0532c1feb9f7c0fa812e55}')
		res.send('Yeahh geschafft. Du hast die erste Flagge gefunden. <br><a href=981a6b2fe171aa8eb53b6d76f7976063c88ef63cb588dbece8a543e1c95e2145> Hier gehts zur zweiten Aufgabe </a>"');
	else
		res.send('Sorry das war wohl nicht die richtige Flagge');
});



// goto level 2
app.get('/10391f993067d8ecf3c2681bcc762734e953711d4d0532c1feb9f7c0fa812e55', function (_req, res) {
	const fpath = path.join(__dirname, 'level2.html');
  res.sendFile(fpath)
});


// goto level 3
app.get('/981a6b2fe171aa8eb53b6d76f7976063c88ef63cb588dbece8a543e1c95e2145', function (_req, res) {
	const fpath = path.join(__dirname, 'level3.html');
  res.sendFile(fpath)
});


app.get('/', (req, res) => {
	const fpath = path.join(__dirname, 'index.html');
	res.sendFile(fpath)
});

app.get('*', (req, res) => {
	if (req.params[0] === '/style.css')  {
		
		const fpath = path.join(__dirname, req.params[0]);
		res.sendFile(fpath)
	} else {
		res.send();
	}
});


app.listen(3000, () => {
  console.log('server listening on port 3000!');
});







