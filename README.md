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
disp("text").box({
  xPadding: 1,
  yPadding: 0,
  borderColor: chalk.red,
  cornerChar: "+",
  xChar: "-",
  yChar: "|"
});
```

### color
Changes the color of the text
```javascript
disp("text").color(chalk.green);
```

### justify
Aligns the text
```javascript
disp("text").justify("center"); // "center" or "right"
```

### columns
Justifies lines in columns based off of a regex expression
```javascript
disp(`
c1 c2 column3
c1 column2 c3
column1 c2 c3
`).columns()
```
