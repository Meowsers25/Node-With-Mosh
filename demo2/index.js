// no ./, node looks in node_modules folder
let _ = require("underscore");

let result = _.contains([1, 2, 3, 4], 8);
console.log(result);
