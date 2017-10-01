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
# Macro Commands
You can create macro functions to chain to gether commonly used styles
```javascript
disp.boxedHeaderTable = function(text){
  return disp("text")
    .columns({
      headers: ["Header 1", "Header 2"]
     })
     .box({
      borderColor: chalk.red,
      headerBorder: true
     })
}

var someText = `
a b c
aa bb cc
aaa bbb ccc
`

console.log(disp.boxedHeaderTable(someText));
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
  yChar: "|",
  headerBorder: false
});

console.log(text);
// +------+
// | text |
// +------+
```

### color
Changes the color of the text
```javascript
disp("text").color(chalk.green, {
  selector: /([\s\S]*)/gm // selects what will be colored
});
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

### margin
adds padding to outside of text
```javascript
var text = disp(`
text
is
`).margin(5, 3) // css margin rules apply. One parameter: full border. Two parameters: (y, x). Four parameters: (top, right, bottom, left)
```
