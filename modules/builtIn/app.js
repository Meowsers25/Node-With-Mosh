// path module
// const path = require("path");
// let pathObj = path.parse(__filename);
// console.log(pathObj);

// os module
// const os = require("os");
// let totalMemory = os.totalmem();
// let freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

//file system module
// const fs = require("fs");
// fs.readdir("./", function(err, files) {
//   if (err) {
//     console.log(`Error: ${err}`);
//   } else {
//     console.log(`Files: ${files}`);
//   }
// });

// -------------------------------------------
// events module
// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// register a listener
// this order is important; if it's the other way ////// nothing will register
// emitter.on("messageLogged", arg => {
// e, eventArg
// console.log("Listener called.......", arg);
// });
// raised an event
// emitter.emit("messageLogged", { id: 1, url: "http://" });

//Raise an event logging (data:message)
// emitter.on("logging", arg => {
// console.log("Data: ", arg);
// });

// emitter.emit("logging", { id: 2, url: "https://" });

// const Logger = require("./logger");
// const logger = new Logger();
// logger.log("Message Earthling....");

//---------------------------------------------

// HTTP module
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World?");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on("connection", socket => {
//   console.log("New connection.......");
// });

server.listen(3000);
console.log("Listening on port 3000....");
