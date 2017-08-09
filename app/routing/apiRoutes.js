var path = require("path");

var friendsArray = require("../data/friends");



module.exports = function(app) {

	app.get("/api/friends", function(req, res){
		res.json(friendsArray);
	});

	app.post("/api/friends", function(req, res){
		
		var newUser = req.body;
		var userScores = newUser.scores;

		var newMatch = {
			name: "",
			photo: "",
			differenceLevel: 0;
		};


		var totalDifference = 0;

		for(var i = 0; i < friendsArray.length; i++) {

			totalDifference = 0;

			for (var j = 0; j < friendsArray[i].score; j++) {

				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsArray[i].scores[j]));

				if (totalDifference <= newMatch.differenceLevel) {

					newMatch.name = friendsArray[i].name;
					newMatch.photo = friendsArray[i].photo;
					newMatch.differenceLevel = totalDifference;
				}
			}
		}
		
		friendsArray.push(newUser);

		res.json(newMatch);
	});

};