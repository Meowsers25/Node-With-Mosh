// load our module

// ./ means current folder; don't need .js
// convention is to use const when requiring a module
const log = require("./logger");
// console.log(logger);

// logger.log("Hello, Node");
// same as exporting; if only one function, no object
// same as above :
log("hello, node friend");
