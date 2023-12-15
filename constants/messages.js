const { ALLOWED_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS } = require("./constants");

const UNEXPECTED_ERROR = "Unexpected error. Try again";
const AUTH_FAILED = "Authentication failed";
const NO_DATA = "There is no data to write in excel file";
const NOTHING_TO_SHOW = "Nothing to show";

// authentication messages...
const INVALID_PASSWORD = "Password not matched";
const INVALID_USERNAME = "Username not matched";
const FIELD_EMPTY = "Fill empty fields first";
const PASSWORD_CHANGED = "Password changed successfully";
const PASSWORD_NOT_CHANGED = "Password not changed. Please try again";
const NEW_AND_CONFIRM_PASSWORD_ERROR = "New and confirm password not matched";
const OLD_PASSWORD_ERROR = "Old Password is not correct";
const LOGIN_SUCCESS = "Login successfully";
const LOGOUT_SUCCESS = "Logout successfully";

// user messages...
const USER_NOT_FOUND = "User not found against given email";
const USER_ALREADY_EXIST = "User against given email already exists";
const USER_ADDED = "Sign Up successfully";
const USER_UPDATED = "User updated successfully";
const USER_DELETED = "User deleted successfully";

// team messages...
const TEAM_NOT_FOUND = "Team not found";
const TEAM_ALREADY_EXIST = "Team against given name already exists";
const TEAM_ADDED = "Team inserted successfully";
const TEAM_UPDATED = "Team updated successfully";
const TEAM_DELETED = "Team deleted successfully";
const TEAM_MEMBERS_EXCEED = "Team is full. Please try with another team";

// games messages...
const GAME_NOT_FOUND = "Game not found";
const GAME_ALREADY_EXIST = "Game against given name already exists";
const GAME_ADDED = "Game inserted successfully";
const GAME_NOT_ADDED = "Game not inserted. Please try again";
const GAME_UPDATED = "Game updated successfully";
const GAME_NOT_UPDATED = "Game not updated. Please try again";
const GAME_DELETED = "Game deleted successfully";
const GAME_NOT_DELETED = "Game not deleted. Please try again";

// forgot password and mail messages...
const MAIL_SENT = "Mail sent successfully";
const CODE_EXPIRED = "Verification code expired. Please try again";
const CODE_MATCHED = "Code matched successfully";
const CODE_NOT_MATCHED = "Code not matched. Try again";

// image error...
const IMAGE_NOT_UPLOADED = "Please upload image first";
const VIDEO_NOT_UPLOADED = "Please upload video first";
const EXTENSION_NOT_ALLOWED =
  "Only " + ALLOWED_EXTENSIONS + " extensions are allowed";
const VIDEO_EXTENSION_NOT_ALLOWED =
  "Only " +
  ALLOWED_EXTENSIONS +
  "," +
  ALLOWED_VIDEO_EXTENSIONS +
  " extensions are allowed";

// GPLeague messages...
const GPLEAGUE_NOT_FOUND = "GP League against given name not found";
const GPLEAGUE_ALREADY_EXISTS = "GP League against given name already exists";
const GPLEAGUE_NOT_ADDED = "GP League not added. Please try again";
const GPLEAGUE_ADDED = "GP League added successfully";
const GPLEAGUE_NOT_UPDATED = "GP League not updated. Please try again";
const GPLEAGUE_UPDATED = "GP League updated successfully";
const GPLEAGUE_NOT_DELETED = "GP League not deleted. Please try again";
const GPLEAGUE_DELETED = "GP League deleted successfully";

// FantasyLeague messages...
const FANTASY_LEAGUE_NOT_FOUND = "Fantasy League against given name not found";
const FANTASY_LEAGUE_ALREADY_EXISTS =
  "Fantasy League against given name already exists";
const FANTASY_LEAGUE_NOT_ADDED = "Fantasy League not added. Please try again";
const FANTASY_LEAGUE_ADDED = "Fantasy League added successfully";
const FANTASY_LEAGUE_NOT_UPDATED =
  "Fantasy League not updated. Please try again";
const FANTASY_LEAGUE_UPDATED = "Fantasy League updated successfully";
const FANTASY_LEAGUE_NOT_DELETED =
  "Fantasy League not deleted. Please try again";
const FANTASY_LEAGUE_DELETED = "Fantasy League deleted successfully";

// Grand Prix messages...
const GRAND_PRIX_NOT_FOUND = "Grand Prix against given name not found";
const GRAND_PRIX_ALREADY_EXISTS =
  "Grand Prix against given name already exists";
const GRAND_PRIX_ADDED = "Grand Prix added successfully";
const GRAND_PRIX_UPDATED = "Grand Prix updated successfully";
const GRAND_PRIX_DELETED = "Grand Prix deleted successfully";

// Tournaments messages...
const TOURNAMENT_NOT_FOUND = "Tournament against given name not found";
const TOURNAMENT_ALREADY_EXISTS =
  "Tournament against given name already exists";
const TOURNAMENT_NOT_ADDED = "Tournament not added. Please try again";
const TOURNAMENT_ADDED = "Tournament added successfully";
const TOURNAMENT_NOT_UPDATED = "Tournament not updated. Please try again";
const TOURNAMENT_UPDATED = "Tournament updated successfully";
const TOURNAMENT_NOT_DELETED = "Tournament not deleted. Please try again";
const TOURNAMENT_DELETED = "Tournament deleted successfully";

// Ladder messages...
const LADDER_NOT_FOUND = "Ladder against given name not found";
const LADDER_ALREADY_EXISTS = "Ladder against given name already exists";
const LADDER_NOT_ADDED = "Ladder not added. Please try again";
const LADDER_ADDED = "Ladder added successfully";
const LADDER_NOT_UPDATED = "Ladder not updated. Please try again";
const LADDER_UPDATED = "Ladder updated successfully";
const LADDER_NOT_DELETED = "Ladder not deleted. Please try again";
const LADDER_DELETED = "Ladder deleted successfully";

// Ladder result messages...
const LADDER_RESULT_NOT_FOUND = "Ladder result not found. Try again";
const LADDER_RESULT_ADDED = "Ladder result added successfully";
const LADDER_RESULT_UPDATED = "Ladder result updated successfully";
const LADDER_RESULT_DELETED = "Ladder result deleted successfully";

//  tournament result messages...
const TOURNAMENT_RESULT_NOT_FOUND = "Tournament result not found. Try again";
const TOURNAMENT_RESULT_ADDED = "Tournament result added successfully";
const TOURNAMENT_RESULT_UPDATED = "Tournament result updated successfully";
const TOURNAMENT_RESULT_DELETED = "Tournament result deleted successfully";

//  match messages...
const MATCH_NOT_FOUND = "Match not found. Try again";
const MATCH_ADDED = "Match added successfully";
const MATCH_UPDATED = "Match updated successfully";
const MATCH_DELETED = "Match deleted successfully";

//  match result messages...
const MATCH_RESULT_NOT_FOUND = "Match result not found. Try again";
const MATCH_RESULT_ADDED = "Match result added successfully";
const MATCH_RESULT_UPDATED = "Match result updated successfully";
const MATCH_RESULT_DELETED = "Match result deleted successfully";

// Inventory messages...
const INVENTORY_NOT_FOUND = "Inventory against given name not found";
const INVENTORY_ALREADY_EXISTS = "Inventory against given name already exists";
const INVENTORY_NOT_ADDED = "Inventory not added. Please try again";
const INVENTORY_ADDED = "Inventory added successfully";
const INVENTORY_NOT_UPDATED = "Inventory not updated. Please try again";
const INVENTORY_UPDATED = "Inventory updated successfully";
const INVENTORY_NOT_DELETED = "Inventory not deleted. Please try again";
const INVENTORY_DELETED = "Inventory deleted successfully";

module.exports = {
  UNEXPECTED_ERROR,
  INVALID_PASSWORD,
  INVALID_USERNAME,
  FIELD_EMPTY,
  LOGIN_SUCCESS,
  OLD_PASSWORD_ERROR,
  USER_NOT_FOUND,
  USER_ALREADY_EXIST,
  USER_ADDED,
  USER_UPDATED,
  USER_DELETED,
  GAME_NOT_FOUND,
  GAME_ALREADY_EXIST,
  GAME_ADDED,
  GAME_UPDATED,
  GAME_DELETED,
  MAIL_SENT,
  CODE_EXPIRED,
  CODE_MATCHED,
  CODE_NOT_MATCHED,
  GAME_NOT_ADDED,
  IMAGE_NOT_UPLOADED,
  GAME_NOT_UPDATED,
  GAME_NOT_DELETED,
  GPLEAGUE_NOT_FOUND,
  GPLEAGUE_ALREADY_EXISTS,
  GPLEAGUE_NOT_ADDED,
  GPLEAGUE_ADDED,
  GPLEAGUE_NOT_UPDATED,
  GPLEAGUE_UPDATED,
  GPLEAGUE_NOT_DELETED,
  GPLEAGUE_DELETED,
  FANTASY_LEAGUE_NOT_FOUND,
  FANTASY_LEAGUE_ALREADY_EXISTS,
  FANTASY_LEAGUE_NOT_ADDED,
  FANTASY_LEAGUE_ADDED,
  FANTASY_LEAGUE_NOT_UPDATED,
  FANTASY_LEAGUE_UPDATED,
  FANTASY_LEAGUE_NOT_DELETED,
  FANTASY_LEAGUE_DELETED,
  TOURNAMENT_NOT_FOUND,
  TOURNAMENT_ALREADY_EXISTS,
  TOURNAMENT_NOT_ADDED,
  TOURNAMENT_ADDED,
  TOURNAMENT_NOT_UPDATED,
  TOURNAMENT_UPDATED,
  TOURNAMENT_NOT_DELETED,
  TOURNAMENT_DELETED,
  LADDER_NOT_FOUND,
  LADDER_ALREADY_EXISTS,
  LADDER_NOT_ADDED,
  LADDER_ADDED,
  LADDER_NOT_UPDATED,
  LADDER_UPDATED,
  LADDER_DELETED,
  LADDER_NOT_DELETED,
  INVENTORY_NOT_FOUND,
  INVENTORY_ALREADY_EXISTS,
  INVENTORY_NOT_ADDED,
  INVENTORY_ADDED,
  INVENTORY_NOT_UPDATED,
  INVENTORY_UPDATED,
  INVENTORY_DELETED,
  INVENTORY_NOT_DELETED,
  NEW_AND_CONFIRM_PASSWORD_ERROR,
  PASSWORD_CHANGED,
  PASSWORD_NOT_CHANGED,
  EXTENSION_NOT_ALLOWED,
  LOGOUT_SUCCESS,
  TEAM_NOT_FOUND,
  TEAM_ALREADY_EXIST,
  TEAM_ADDED,
  TEAM_UPDATED,
  TEAM_DELETED,
  TEAM_MEMBERS_EXCEED,
  VIDEO_NOT_UPLOADED,
  LADDER_RESULT_NOT_FOUND,
  LADDER_RESULT_ADDED,
  LADDER_RESULT_UPDATED,
  LADDER_RESULT_DELETED,
  TOURNAMENT_RESULT_NOT_FOUND,
  TOURNAMENT_RESULT_ADDED,
  TOURNAMENT_RESULT_UPDATED,
  TOURNAMENT_RESULT_DELETED,
  MATCH_RESULT_NOT_FOUND,
  MATCH_RESULT_ADDED,
  MATCH_RESULT_UPDATED,
  MATCH_RESULT_DELETED,
  MATCH_NOT_FOUND,
  MATCH_ADDED,
  MATCH_UPDATED,
  MATCH_DELETED,
  NO_DATA,
  NOTHING_TO_SHOW,
  GRAND_PRIX_ALREADY_EXISTS,
  GRAND_PRIX_NOT_FOUND,
  GRAND_PRIX_ADDED,
  GRAND_PRIX_DELETED,
  GRAND_PRIX_UPDATED,
  AUTH_FAILED,
  VIDEO_EXTENSION_NOT_ALLOWED,
};
