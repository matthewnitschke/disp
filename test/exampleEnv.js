var disp = require("../src/disp.js")
var chalk = require("chalk");

var text = disp(`
asdfew 23
asdfewsadf34 3t3w4 t
a4 taw4t 234t
`).color(chalk.red);

console.log(text);
