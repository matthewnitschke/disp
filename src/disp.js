var stripAnsi = require('strip-ansi')

'use strict';
module.exports = (() => {

  function repeatedChar(char, amount, color) {
    var ret = "";
    for (var i = 0; i < amount; i++) {
      if (color) {
        ret += color(char);
      } else {
        ret += char;
      }
    }
    return ret;
  }

  function getLongestLine(lines) {
    return lines.reduce((accumulator, item) => {
      return stripAnsi(item).length > accumulator ? stripAnsi(item).length : accumulator;
    }, 0);
  }

  function getLineLength(line) {
    return stripAnsi(line).length;
  }

  function disp(text) {
    this.text = text;
  }

  disp.prototype.box = function(options) {
    function generateBodyLine(line, yChar, longestLine){
      return `${yChar}${repeatedChar(" ", options.xPadding)}${line}${repeatedChar(" ", options.xPadding + (longestLine - getLineLength(line)))}${yChar}\n`
    }
    function generateSolidLine(length, cornerLeft, cornerRight, xChar){
      return `${cornerLeft}${repeatedChar(xChar, length)}${cornerRight}\n`;
    }

    options = Object.assign({
      xPadding: 1,
      yPadding: 0,
      borderColor: a => {
        return a
      },
      cornerChar: "+",
      xChar: "-",
      yChar: "|",
      headerBorder: false
    }, options);

    var cornerChar = options.cornerChar;
    var cornerParse = cornerChar.split(' ');
    var corners = {};
    if (cornerParse.length > 1){
      corners.topLeft = options.borderColor(cornerParse[0]);
      corners.topRight = options.borderColor(cornerParse[1]);
      corners.bottomRight = options.borderColor(cornerParse[2]);
      corners.bottomLeft = options.borderColor(cornerParse[3]);
    } else {
      corners.topRight = corners.topLeft = corners.bottomRight = corners.bottomLeft = cornerChar; 
    }

    var xChar = options.borderColor(options.xChar);
    var yChar = options.borderColor(options.yChar);

    var lines = this.text.split('\n');
    var longestLine = getLongestLine(lines);

    var ret = generateSolidLine(longestLine + (options.xPadding * 2), corners.topLeft, corners.topRight, xChar);

    if (options.headerBorder) {
      var headerLine = lines.shift();
      ret += generateBodyLine(headerLine, yChar, longestLine);
      ret += generateSolidLine(longestLine + (options.xPadding * 2), corners.bottomLeft, corners.bottomRight, xChar);
    }

    for (var i = 0; i < options.yPadding; i++) {
      ret += generateSolidLine(longestLine + (options.xPadding * 2), "|", "|", " ");
    }

    lines.forEach((line) => {
      ret += generateBodyLine(line, yChar, longestLine);
    })

    for (var i = 0; i < options.yPadding; i++) {
      ret += generateSolidLine(longestLine + (options.xPadding * 2), "|", "|", " ");
    }

    ret += generateSolidLine(longestLine + (options.xPadding * 2), corners.bottomLeft, corners.bottomRight, xChar).replace("\n", ""); // remove the newline from generateSolidLine() because it it last item

    return new disp(ret);

  }

  disp.prototype.color = function(color, options) {
    options = Object.assign({
      selector: /([\s\S]*)/gm
    }, options);

    var ret = this.text.replace(options.selector, (match, p1) => {
      return color(p1);
    });

    return new disp(ret);
  }

  disp.prototype.justify = function(direction, options) {
    options = Object.assign({
      paddingChar: " "
    }, options);

    var lines = this.text.split('\n');
    var longestLine = getLongestLine(lines);

    lines = lines.map((line) => {
      var lineLen = getLineLength(line);

      var padding;
      if (direction == "right") {
        padding = (longestLine - lineLen);
      } else if (direction == "center") {
        padding = (longestLine - lineLen) / 2;
      }

      return repeatedChar(" ", padding) + line;
    })

    return new disp(lines.join("\n"));
  }

  disp.prototype.columns = function(options) {
    options = Object.assign({
      columnSeparater: /(\w)+/gm,
      cellPadding: 5,
      headers: []
    }, options)

    var data = [];

    var lines = this.text.trim().split("\n");
    lines.forEach((line) => {
      var matches = line.match(options.columnSeparater);
      data.push(matches);
    });

    if (options.headers.length > 0) {
      data.unshift(options.headers);
    }

    var columnWidths = [];
    data.forEach((row) => {
      row.forEach((cell, i) => {
        var cellLen = getLineLength(cell);
        if (i >= columnWidths.length) {
          columnWidths.push(cellLen);
        } else {
          if (cellLen > columnWidths[i]) {
            columnWidths[i] = cellLen;
          }
        }
      });
    });

    data = data.map((row) => {
      return row.map((cell, i, rowArr) => {
        var cellLen = getLineLength(cell);
        var padding = columnWidths[i] - cellLen;

        if (i < rowArr.length - 1) {
          padding += options.cellPadding;
        }

        return cell + repeatedChar(" ", padding);
      }).join("");
    })

    return new disp(data.join("\n"));
  }

  disp.prototype.trim = function(options){
    return new disp(this.text.trim());
  }

  disp.prototype.margin = function(one, two, three, four){
    var options = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    if (one && !two && !three && !four){
      // full margin
      options.top = options.right = options.bottom = options.left = one;
    } else if (one && two && !three && !four){
      // y and x
      options.top = options.bottom = one;
      options.right = options.left = two;

    } else if (one && two && three && four){
      // top, right, bottom, left
      options.top = one;
      options.right = two;
      options.bottom = three;
      options.left = four;
    }

    var lines = this.text.split("\n")

    if (options.top == "auto" || options.bottom == "auto"){
      var terminalHeight = process.stdout.rows;
      var outputLines = lines.length;
      var center = (terminalHeight/2) - (outputLines/2)
      if (options.top == "auto"){
        options.top = center;
      }
      if (options.bottom == "auto"){
        options.bottom = center - 1; // account for the ending line
      }
    }

    if (options.left == "auto" || options.right == "auto"){
      var terminalWidth = process.stdout.columns;
      var longestLine = getLongestLine(lines);
      var center = (terminalWidth/2) - (longestLine/2);
      if(options.left == "auto"){
        options.left = center;
      }
      if (options.right == "auto"){
        options.right = center;
      }
    }

    var ret = "";
    for(var i = 0; i < options.top; i++){
      ret += "\n";
    }

    ret += lines.map((line) => {
      return repeatedChar(" ", options.left) + line + repeatedChar(" ", options.right);
    }).join("\n");

    for(var i = 0; i < options.bottom; i++){
      ret += "\n";
    }

    return new disp(ret);

  }

  disp.prototype.toString = function() {
    return this.text;
  }
  disp.prototype.inspect = function() {
    return this.text;
  }

  return (text) => {
    return new disp(text);
  }

})();
