var disp = require("../src/disp.js")
var chalk = require("chalk");

var text = disp(`
  a b c
  aa bb cc
  aaa bbb ccc`)
.columns()
.box({
  headerBorder: true,
  cornerChar: "% # @ !"
}).margin(2, 5);

console.log(text);
