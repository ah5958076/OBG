const { ALLOWED_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS } = require("./constants");



// general purpose messages...
exports.UNEXPECTED_ERROR = "Unexpected error. Try again";
exports.AUTH_FAILED = "Authentication failed";
exports.NO_DATA_FOR_EXCEL = "There is no data to write in excel file";
exports.NO_DATA_FOUND = "No data found";
exports.INVALID_ID = "Invalid ID";



// empty field messages...
exports.EMAIL_EMPTY="Email is empty";
exports.OLD_PASSWORD_EMPTY="Old Password is empty";
exports.PASSWORD_EMPTY="Password is empty";
exports.USERNAME_EMPTY="Username is empty";
exports.NAME_EMPTY="Name is empty";
exports.CODE_EMPTY="Code is Empty";
exports.GRAND_PRIX_OWNER_EMPTY="Grand Prix Owner is empty";
exports.TOTAL_TEAMS_EMPTY="Total Teams is empty";
exports.OWNER_OCCUPATION_EMPTY="Owner Occupation is empty";
exports.OWNER_YEARLY_INCOME_EMPTY="Owner Yearly Income is empty";
exports.OWNER_ADDRESS_EMPTY="Owner Address is empty";
exports.GAME_NAME_EMPTY="Game name is empty";
exports.ENTRY_FEE_EMPTY="Entry fee is empty";
exports.PRIZE_EMPTY="Prize is empty";
exports.TEAM_SIZE_EMPTY="Team size is empty";
exports.STARTING_DATE_EMPTY="Starting date is empty";
exports.ENDING_DATE_EMPTY="Ending date is empty";
exports.GRAND_PRIX_NAME_EMPTY="Grand Prix League Name is empty";
exports.DRAFT_DATETIME_EMPTY="Draft Date and Time is empty";
exports.TYPE_EMPTY = "Type is empty";
exports.PLATFORM_EMPTY = "Platform is empty";
exports.CATAGORY_EMPTY = "Catagory is Empty";



// authentication messages...
exports.USERNAME_OR_PASSWORD_INCORRECT = "Either Username or Password is incorrect";
exports.LOGIN_SUCCESS = "Login successfully";
exports.LOGOUT_SUCCESS = "Logout successfully";
exports.PASSWORD_CHANGED = "Password changed successfully";
exports.PASSWORD_NOT_CHANGED = "Password not changed. Please try again";
exports.NEW_AND_CONFIRM_PASSWORD_ERROR = "New and confirm password not matched";
exports.OLD_PASSWORD_ERROR = "Old Password is not correct";



// Grand Prix messages...
exports.GRAND_PRIX_ADDED = "Grand Prix added successfully";
exports.GRAND_PRIX_UPDATED = "Grand Prix updated successfully";
exports.GRAND_PRIX_DELETED = "Grand Prix deleted successfully";



// GPLeague messages...
exports.GPLEAGUE_ADDED = "GP League added successfully";
exports.GPLEAGUE_UPDATED = "GP League updated successfully";
exports.GPLEAGUE_DELETED = "GP League deleted successfully";



// user messages...
exports.USER_NOT_FOUND = "User not found against given email";
exports.USER_ALREADY_EXIST = "User against given email already exists";
exports.INVENTORY_ALREADY_EXISTS = "Inventory already added to user";
exports.USER_ADDED = "Sign Up successfully";
exports.USER_UPDATED = "User updated successfully";
exports.USER_DELETED = "User deleted successfully";
exports.PROFILE_PHOTO_UPLOADED = "Profile photo uploaded successfully";
exports.COVER_PHOTO_UPLOADED = "Cover photo uploaded successfully";



// team messages...
exports.TEAM_NOT_FOUND = "Team not found";
exports.TEAM_ALREADY_EXIST = "Team against given name already exists";
exports.TEAM_ADDED = "Team inserted successfully";
exports.TEAM_UPDATED = "Team updated successfully";
exports.TEAM_DELETED = "Team deleted successfully";
exports.TEAM_MEMBERS_EXCEED = "Team is full. Please try with another team";



// games messages...
exports.GAME_NOT_FOUND = "Game not found";
exports.GAME_ALREADY_EXIST = "Game against given name already exists";
exports.GAME_ADDED = "Game inserted successfully";
exports.GAME_NOT_ADDED = "Game not inserted. Please try again";
exports.GAME_UPDATED = "Game updated successfully";
exports.GAME_NOT_UPDATED = "Game not updated. Please try again";
exports.GAME_DELETED = "Game deleted successfully";
exports.GAME_NOT_DELETED = "Game not deleted. Please try again";



// forgot password and mail messages...
exports.MAIL_SENT = "Mail sent successfully";
exports.CODE_EXPIRED = "Verification code expired. Please try again";
exports.CODE_MATCHED = "Code matched successfully";
exports.CODE_NOT_MATCHED = "Code not matched. Try again";



// image error...
exports.IMAGE_NOT_UPLOADED = "Please upload image first";
exports.VIDEO_NOT_UPLOADED = "Please upload video first";
exports.EXTENSION_NOT_ALLOWED =
  "Only " + ALLOWED_EXTENSIONS + " extensions are allowed";
exports.VIDEO_EXTENSION_NOT_ALLOWED =
  "Only " +
  ALLOWED_EXTENSIONS +
  "," +
  ALLOWED_VIDEO_EXTENSIONS +
  " extensions are allowed";




// FantasyLeague messages...
exports.FANTASY_LEAGUE_NOT_FOUND = "Fantasy League against given name not found";
exports.FANTASY_LEAGUE_ALREADY_EXISTS =
  "Fantasy League against given name already exists";
exports.FANTASY_LEAGUE_NOT_ADDED = "Fantasy League not added. Please try again";
exports.FANTASY_LEAGUE_ADDED = "Fantasy League added successfully";
exports.FANTASY_LEAGUE_NOT_UPDATED =
  "Fantasy League not updated. Please try again";
exports.FANTASY_LEAGUE_UPDATED = "Fantasy League updated successfully";
exports.FANTASY_LEAGUE_NOT_DELETED =
  "Fantasy League not deleted. Please try again";
exports.FANTASY_LEAGUE_DELETED = "Fantasy League deleted successfully";



// Tournaments messages...
exports.TOURNAMENT_NOT_FOUND = "Tournament against given name not found";
exports.TOURNAMENT_ALREADY_EXISTS =
  "Tournament against given name already exists";
exports.TOURNAMENT_NOT_ADDED = "Tournament not added. Please try again";
exports.TOURNAMENT_ADDED = "Tournament added successfully";
exports.TOURNAMENT_NOT_UPDATED = "Tournament not updated. Please try again";
exports.TOURNAMENT_UPDATED = "Tournament updated successfully";
exports.TOURNAMENT_NOT_DELETED = "Tournament not deleted. Please try again";
exports.TOURNAMENT_DELETED = "Tournament deleted successfully";



// Ladder messages...
exports.LADDER_NOT_FOUND = "Ladder against given name not found";
exports.LADDER_ALREADY_EXISTS = "Ladder against given name already exists";
exports.LADDER_NOT_ADDED = "Ladder not added. Please try again";
exports.LADDER_ADDED = "Ladder added successfully";
exports.LADDER_NOT_UPDATED = "Ladder not updated. Please try again";
exports.LADDER_UPDATED = "Ladder updated successfully";
exports.LADDER_NOT_DELETED = "Ladder not deleted. Please try again";
exports.LADDER_DELETED = "Ladder deleted successfully";



// Ladder result messages...
exports.LADDER_RESULT_NOT_FOUND = "Ladder result not found. Try again";
exports.LADDER_RESULT_ADDED = "Ladder result added successfully";
exports.LADDER_RESULT_UPDATED = "Ladder result updated successfully";
exports.LADDER_RESULT_DELETED = "Ladder result deleted successfully";



//  tournament result messages...
exports.TOURNAMENT_RESULT_NOT_FOUND = "Tournament result not found. Try again";
exports.TOURNAMENT_RESULT_ADDED = "Tournament result added successfully";
exports.TOURNAMENT_RESULT_UPDATED = "Tournament result updated successfully";
exports.TOURNAMENT_RESULT_DELETED = "Tournament result deleted successfully";



//  match messages...
exports.MATCH_NOT_FOUND = "Match not found. Try again";
exports.MATCH_ADDED = "Match added successfully";
exports.MATCH_UPDATED = "Match updated successfully";
exports.MATCH_DELETED = "Match deleted successfully";



//  match result messages...
exports.MATCH_RESULT_NOT_FOUND = "Match result not found. Try again";
exports.MATCH_RESULT_ADDED = "Match result added successfully";
exports.MATCH_RESULT_UPDATED = "Match result updated successfully";
exports.MATCH_RESULT_DELETED = "Match result deleted successfully";



// Inventory messages...
exports.INVENTORY_NOT_FOUND = "Inventory against given name not found";
exports.INVENTORY_ALREADY_EXISTS = "Inventory against given name already exists";
exports.INVENTORY_NOT_ADDED = "Inventory not added. Please try again";
exports.INVENTORY_ADDED = "Inventory added successfully";
exports.INVENTORY_NOT_UPDATED = "Inventory not updated. Please try again";
exports.INVENTORY_UPDATED = "Inventory updated successfully";
exports.INVENTORY_NOT_DELETED = "Inventory not deleted. Please try again";
exports.INVENTORY_DELETED = "Inventory deleted successfully";