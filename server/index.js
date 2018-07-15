const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const getRepos = helper.getReposByUsername;
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  getRepos('hackreactor', (err, results) => {
  	if (err) console.log("ERRRR");
  	else {
  		console.log('posting to DB');
  		console.log(results);
  		db.save(results, (err, results) => {
  			console.log(results);
  		});
  	}
  })
  res.send('hi')
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

 // db.get('hackreactor', console.log);
  res.send('hello')
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

