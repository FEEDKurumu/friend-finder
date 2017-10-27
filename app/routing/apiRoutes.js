var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.send(friends);
  })

  // app.post("/api/friends", function(req, res) {
  //   console.log(req.body)
  //   var newFriend = req.body;
  //   friends.push(newFriend);
  // })
  // can only get the post to work when it's on server.js
}