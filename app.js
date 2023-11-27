var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();

var authenticationRouter = require('./routes/authentication');
var userRouter = require('./routes/user');
var teamRouter = require('./routes/team');
var gameRouter = require("./routes/game");
var GPLeagueRouter = require("./routes/GPLeague");
var fantasyLeagueRouter = require("./routes/fantasyLeague");
var grandPrixRouter = require("./routes/grandPrix");
var tournamentRouter = require("./routes/tournament");
var ladderRouter = require("./routes/ladder");
var inventoryRouter = require("./routes/inventory");
var ladderResultRouter = require("./routes/ladderResult");
var tournamentResultRouter = require("./routes/tournamentResult");
var matchResultRouter = require("./routes/matchResult");
var matchRouter = require("./routes/match");


mongoose.connect(process.env.DB_URL || "mongodb:127.0.0.1:27017/obg").then((val) => {
  console.log("Database connected");
}).catch((e) => {
  console.error(e);
});


var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/api', authenticationRouter);
app.use('/api/user', userRouter);
app.use('/api/teams', teamRouter);
app.use("/api/game", gameRouter);
app.use("/api/gp-league", GPLeagueRouter);
app.use("/api/fantasy-league", fantasyLeagueRouter);
app.use("/api/grand-prix", grandPrixRouter);
app.use("/api/inventory", inventoryRouter); 
app.use("/api/tournament", tournamentRouter);
app.use("/api/tournament-result", tournamentResultRouter);
app.use("/api/ladder", ladderRouter);
app.use("/api/ladder-result", ladderResultRouter);
app.use("/api/match", matchRouter);
app.use("/api/match-result", matchResultRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log("Server Listening at port: "+PORT)});