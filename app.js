var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
let cors = require("cors");
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
const { authenticateUser } = require("./middlewares/auth");


mongoose.connect(process.env.DB_URL || "mongodb:127.0.0.1:27017").then((val) => {
  console.log("Database connected");
}).catch((e) => {
  console.error(e);
});


var app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/uploads", express.static(process.cwd()+"/uploads"));



app.use('/api', authenticationRouter);
app.use("/api/grand-prix", authenticateUser, grandPrixRouter);
app.use("/api/gp-league", authenticateUser, GPLeagueRouter);
app.use("/api/fantasy-league", authenticateUser, fantasyLeagueRouter);
app.use('/api/user', authenticateUser, userRouter);
app.use("/api/game", authenticateUser, gameRouter);
app.use("/api/tournament", authenticateUser, tournamentRouter);
app.use("/api/ladder", authenticateUser, ladderRouter);
app.use("/api/inventory", authenticateUser, inventoryRouter); 
app.use('/api/teams', authenticateUser, teamRouter);
app.use("/api/match", authenticateUser, matchRouter);
app.use("/api/tournament-result", authenticateUser, tournamentResultRouter);
app.use("/api/ladder-result", authenticateUser, ladderResultRouter);
app.use("/api/match-result", authenticateUser, matchResultRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log("Server Listening at port: "+PORT)});