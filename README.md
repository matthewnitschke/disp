# disp

A nodejs cli console logging tool library

# Usage

```javascript

var disp = require('src/disp.js');

var text = `This is some text
This is another line of text
Yea it's another line again`

console.log(disp(text)
  .justify("center")
  .box({
    xPadding: 3,
    yPadding: 1
  }))
  
// +----------------------------------+
// |                                  |
// |         This is some text        |
// |   This is another line of text   |
// |    Yea it's another line again   |
// |                                  |
// +----------------------------------+
```

# Built in plugins

### box
Surrounds text in a box
```javascript
var text = disp("text").box({
  xPadding: 1,
  yPadding: 0,
  borderColor: chalk.red,
  cornerChar: "+",
  xChar: "-",
  yChar: "|"
});

console.log(text);
// +------+
// | text |
// +------+
```

### color
Changes the color of the text
```javascript
disp("text").color(chalk.green);
```

### justify
Aligns the text
```javascript
var text = disp(`
this is some text
text
BLERG I AM TEXT
`).justify("center"); // "center" or "right"

console.log(text)
// this is some text
//       text
//  BLERG I AM TEXT
```

### columns
Justifies lines in columns based off of a regex expression
```javascript
var text = disp(`
c1 c2 column3
c1 column2 c3
column1 c2 c3
`).columns({
  columnSeparater: /(\w)+/gm, // each capture group for each line is separated into a column
  headers: ["Column 1", "Column 2", "Column 3"]
})

console.log(text);
// Column 1     Column 2     Column 3
// c1           c2           column3
// c1           column2      c3
// column1      c2           c3
```

### headerBox
A subset of `box`. Puts a border around the header items as well
```javascript
var text = disp(`
c1 c2 column3
c1 column2 c3
column1 c2 c3
`).columns({
  headers: ["Column 1", "Column 2", "Column 3"]
}).headerBox({
  xPadding: 1,
  yPadding: 0,
  borderColor: chalk.red,
  cornerChar: "+",
  xChar: "-",
  yChar: "|"
});

console.log(text);
// +------------------------------------+
// | Column 1     Column 2     Column 3 |
// +------------------------------------+
// | c1           c2           column3  |
// | c1           column2      c3       |
// | column1      c2           c3       |
// +------------------------------------+
```
