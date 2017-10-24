var friends = require("../data/friends");
var surveyQs = require("../data/surveyQuestions");

var apiRouter = function (app) {
    app.get("/api/surveyquestions", function(req, res) {
        res.json(surveyQs);
    });

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var friendObj = req.body;

        //convert string of csv numbers to array of integers
        friendObj.scores = friendObj.scores.split(",").map(Number); //add .filter(Boolean) if ever the array is in danger or alpha chars entering in. No risk at this time so it is commented out

        var diffArray = [];

        for (var i=0; i < friends.length; i++) {
            var friendDiff = 0;
            for (var j=0; j < surveyQs.length; j++) {
                var userResp = friendObj.scores[j];
                var friendResp = friends[i].scores[j];

                friendDiff += Math.abs(userResp - friendResp);
            }
            diffArray.push(friendDiff);
        }

        //This gets us the index of the lowest value in diffArray 
        //  - this index is generated in the second loop which matches the index of the most compatible friend in the friend array
        var indexOfMinValue = diffArray.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0);

        //OK to add this now since we're done with the crazy loop check above and have the indexOfMinValue.
        friends.push(friendObj);

        //code to compare survey respondent and friends data here
        
        //console.log(friends[2].name);
        res.json(friends[indexOfMinValue]);
    });
}

module.exports = apiRouter;