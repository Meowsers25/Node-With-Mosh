const URL = "http://mylogger.io/log";

function log(message) {
  // HTTP request
  console.log(message);
}

// module.exports.log = log;
// when exporting a single function, you don't need //// to export the entire object. Can be written as:

module.exports = log;
