# disp

A nodejs cli console logging tool library

# Usage

```javascript

var disp = require('src/disp.js');

var text = `
This is some text
This is another line of text
Yea it's another line again
`

console.log(disp(text)
  .center()
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
