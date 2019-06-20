const EventEmitter = require("events");

let url = "http://nyLogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("message logged....", { id: 3, url: "http://blahblah" });
  }
}
module.exports = Logger;
