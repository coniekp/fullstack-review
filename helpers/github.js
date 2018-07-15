const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (err, results, body) => {
    if (err) callback(err, null);
    else {
      callback(null, filterResults(JSON.parse(body)));
    }
  })

}

let filterResults = (repos) => {
  var fields = ['id', 'name', 'url', 'created_at','forks'];
  var owner ={
    id: repos[0].owner.id,
    username: repos[0].owner.login
  }

  var newRepos = repos.map(repo => {
    var newRepo ={};
      fields.forEach (field => {
        newRepo[field] = repo[field];
      });
  
    return newRepo;
  });

  // return [owner, newRepos];
  owner.repos = newRepos;

  return owner;
}

module.exports.getReposByUsername = getReposByUsername;