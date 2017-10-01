var disp = require("../src/disp.js")

var text = `
c1 c2 column3
c1 column2 c3
column1 c2 c3
`

var res = disp(text).columns().box();

console.log(res);
