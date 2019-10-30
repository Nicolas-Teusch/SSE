var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const cp = require('child_process');




  router.post("/loadFileLvl3", (req, res) => {
    const username = req.body.username;
    const filename = req.body.filename;
  
    if(!(username || filename)){
      res.send('sorry das geht so nicht. So kann ich nicht arbeiten :~(');
      return;
    }
  
    const fpath = path.join(__dirname, 'level3', username, filename);
    fs.readFile(fpath, (err, data) => {
      if(err) {
        const response = {"info": "Datei konnte nicht geladen werden!", "filename": filename, "data": null};
        res.send(JSON.stringify(response));
      } else {
        const response = {"info": 'Datei erfolgreich geladen!', "filename": filename, "data": data.toString('utf8')}
        res.send(JSON.stringify(response));
      }
      
    })
  })

  router.post('/saveFileLvl3', function (req, res) {
    const username = req.body.username;
    const filename = req.body.filename;
    const filecontent = req.body.filecontent;
    const regexpNoCheat = /server/gi;
  
    if(!username) {
      res.send("Du musst erst einen Usernamen eingeben!");
      return;
    }
  
    if(!filename) {
      res.send("Du musst einen Dateinamen eingeben!");
      return;
    }
  
    if(!filename.match(/^[\w\-. ]+$/)){
      res.send('Der Dateiname ist leider ungueltig!');
      return;
    }
  
    const fpath = path.join(__dirname, 'level3', username, filename)
  
    //no cheat
    if(filename.match(regexpNoCheat))
      res.send('You should not Cheat!');
    else {
      const command = 'echo ' + filecontent + ' > ' + fpath;
      cp.exec(command, (err, _stdout, _stderr) => {
        console.log(err);
        
        if (err) res.send('mmhh shit irgendwas ist schief gegangen');
        else res.send("Datei gespeichert");
      })
    }
      
  
      
      // fs.writeFile(fpath, filecontent, (err) => {
      // 	if (err) res.send('mmhh shit irgendwas ist schief gegangen');
      // 	else res.send("Datei gespeichert");
      // })
  });

  router.post("/loginLvl3", (req, res) => {
    const username = req.body.username;
    const fpath = path.join(__dirname, "level3", username);
    fs.exists(fpath, (exists) => {
      if(exists){
        fs.readdir(fpath, (_err, data) => {
          res.send(data);
        })
  
        return;
      }
  
      fs.mkdir(fpath, null, (err) => {
        res.send('Du hast noch keine Dateien')
      })
    })
  });

  module.exports = router;