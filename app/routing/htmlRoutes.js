var friends = require("../data/friends");
var path = require("path");

var htmlRouter = function (app) {
    app.get("/", function(req, res) {
        //res.redirect("home.html");
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", function(req, res) {
        //res.redirect("survey.html");
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("*", function(req, res) {
        //res.redirect(home.html);
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};

module.exports = htmlRouter;