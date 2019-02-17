// Dependencies
var express = require("express");
var path = require("path");

// Set up Express
var app = express();
var PORT = 3000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database for all friends
var friends = [{
    "name": "Jabba the Hut",
    "photo": "https://s.yimg.com/fz/api/res/1.2/0o_uA.krdO6Wpel6lrdMqQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTE4MDtxPTgwO3c9MjMw/https://s.yimg.com/zb/imgv1/faa423c6-927c-3877-9ced-019b0849ae82/t_500x300",
    "scores": [5, 5, 4, 5, 5, 5, 3, 5, 5, 5]
},
{
    "name": "Darth Vadar",
    "photo": "https://tse2.mm.bing.net/th?id=OIP.jw9-NibT1KUSFD5Cn5QICQHaEK&pid=15.1&P=0&w=298&h=168",
    "scores": [3, 2, 2, 3, 3, 1, 1, 3, 1, 1]
},

{
    "name": "Grumpy Cat",
    "photo": "https://tse1.mm.bing.net/th?id=OIP.wo0fMkLrg5w2ZBnIZc1jrAHaFO&pid=15.1&P=0&w=246&h=174",
    "scores": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}
   
];

//add a photo for the existing members

// Routes

// Basic route 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});




app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});




// See all friends
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});



// Create New Friends - takes in JSON input - the user inputs some personal profile info
app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var newFriendScores=newFriend.scores;
    var totalDiffernec=0;
    var allDifference=[];
    for(var i=0;i<friends.length;i++){
console.log(friends[i].name)
        for(var j=0;j<10;j++){
totalDiffernec += Math.abs(friends[i].scores[j]-newFriendScores[j])
        }
    }
    allDifference.push(totalDiffernec);
    totalDiffernec =0;
    console.log(newFriend)
    console.log(newFriend.scores)
    console.log(friends);
   //match with friend with lowest difference
   var bestMatch=friends[allDifference.indexOf(Math.min.apply(null,allDifference))]
console.log(bestMatch)
    friends.push(newFriend);

    res.json(bestMatch);

  
});

// Listener - starts the server 
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
