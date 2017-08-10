var path = require("path");

var friendsArray = require("../data/friends.js");



module.exports = function(app) {

	app.get("/api/friends", function(req, res){
		res.json(friendsArray);
	});

	app.post("/api/friends", function(req, res){
		
		var newMatch = {
			name: "",
			photo: "",
			differenceLevel: 1000
		};


		var newUser = req.body;
		var userScores = newUser.scores;

		

		for(var i = 0; i < friendsArray.length; i++) {

			var totalDifference = 0;

			for (var j = 0; j < userScores.length; j++) {

				totalDifference += Math.abs(friendsArray[i].scores[j] - userScores[j]);
					
			}	
				if (totalDifference <= newMatch.differenceLevel) {

					newMatch.name = friendsArray[i].name;
					newMatch.photo = friendsArray[i].photo;
					newMatch.differenceLevel = totalDifference;
				}
				
		}
		
		friendsArray.push(newUser);

		res.json(newMatch);
	});

};