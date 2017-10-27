var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var friends = require("./app/data/friends.js");
require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/api/friends", function(req, res) {
  var newFriend = req.body;
  var newFriendScores = req.body["scores[]"]

  var index = 0;
  var diff = 50;
  var matchName;
  var matchPic;
  for(var i = 0; i < friends.length; i++) {
    var currentscores = friends[i]["scores[]"]
    var currdiff = 0;
    for(var j = 0; j < currentscores.length; j++) {
      var temp = parseInt(currentscores[j]) - parseInt(newFriendScores[j]);
      temp = Math.abs(temp);
      currdiff += temp;
    }
    if(currdiff <= diff) {
      index = i;
      diff = currdiff
      matchName = friends[i].name;
      matchPic = friends[i].photo
    }
  }
  res.json({ name: matchName, photo: matchPic})
  friends.push(newFriend);
})

app.listen(PORT);