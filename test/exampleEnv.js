var disp = require("../src/disp.js")
var chalk = require("chalk");

var text = disp(`
c1 c2 column3
c1 column2 c3
column1 c2 c3
`).columns({
  headers: ["Column 1", "Column 2", "Column 3"]
}).headerBox()

console.log(text);
