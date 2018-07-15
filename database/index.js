const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// let ownerSchema = mongoose.Schema({
// 	id: {
// 		type: Number,
// 		unique: true
// 	},
// 	username: String
// });



let repoSchema = mongoose.Schema({
  id: {
  	type: Number, 
  	unique: true
  },
  name: String, 
  url: String, 
  forks: Number,
  created_at: Date,
  // owner: {
  // 	type: mongoose.Schema.Types.ObjectId,
  // 	ref: 'owner'
  // } 
});
let ownerSchema = mongoose.Schema({
	id: {
		type: Number,
		unique: true
	},
	username: String,
	repos: [repoSchema]
});

let Owner = mongoose.model('Owner', ownerSchema);
let Repo = mongoose.model('Repo', repoSchema);

let save = (owner, callback) => {
	owner.repos = owner.repos.map((repo)=> {
		return new Repo(repo);
	});
	var parent = new Owner(owner);
	parent.save((err, parent) =>{
		console.log(parent);
	})
}



// let save = ([owner, repos], callback) => {
//   var parent = new Owner(owner);
//   parent.save((err, parent) => {
//   	console.log('parent saved')
//   	if (err) callback(err, null);
//   	else {
//   		var savedRepos = repos.map (repo => {
//   			console.log('Adding child')
//   			var child = new Repo(repo);
//   			return new Promise((resolve, reject) => {
//   				child.save((err, repo) => {
//   					if( err) reject(err);
//   					else resolve(repo);
//   				})
//   			})
//   		})

//   		Promise.all(savedRepos).then(repos => console.log('all saved'));
//   		callback(null, repos);
//   	}
//   })
// }

// let getReposByUsername = (username, cb) => {
// 	return new Promise ((resolve, reject) => {
// 		getOwnerIdByUsername(username, (err, id) => {
// 			if(err) reject(err);
// 			else resolve(id);
// 		})
// 	})
// 	.then ((id) => getUserRepos(id, cb));

// }

// let getOwnerIdByUsername = (username, cb) => {
//   Owner.findOne({username: username}).select('_id').exec((err, ownerId) => {
//   	if(err) cb(err, null);
//   	else cb(null, ownerId.id);
//   });

// }


// let getUserRepos = (ownerId, cb) => {
// 	console.log(ownerId)
// 	Repo.find({owner: ownerId}).exec((err, repos) => {
// 		if (err) cb(err, null);
// 		else{ 
// 			console.log(repos.length);
// 			cb(null, repos);
// 		}
// 	})
// }

module.exports.save = save;
//module.exports.get = getReposByUsername;