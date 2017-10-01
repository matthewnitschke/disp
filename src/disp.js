var stripAnsi = require('strip-ansi')

'use strict';
module.exports = (() => {

    function repeatedChar(char, amount, color) {
        var ret = "";
        for(var i = 0; i < amount; i ++){
            if (color){
                ret += color(char);
            } else {
                ret += char;
            }
        }
        return ret;
    }

    function getLongestLine(lines){
        return lines.reduce((accumulator, item) => {
            return stripAnsi(item).length > accumulator ? stripAnsi(item).length : accumulator;
        }, 0);
    }

    function getLineLength(line){
        return stripAnsi(line).length;
    }

    function disp(text){
        this.text = text;
    }

    disp.prototype.box = function(options) {
        options = Object.assign({
            xPadding: 1,
            yPadding: 0,
            borderColor: a => { return a },
            cornerChar: "+",
            xChar: "-",
            yChar: "|"
        }, options);

        var cornerChar = options.borderColor(options.cornerChar);
        var xChar = options.borderColor(options.xChar);
        var yChar = options.borderColor(options.yChar);

        var lines = this.text.split('\n');
        var longestLine = getLongestLine(lines);

        console.log(lines[1]);

        var ret = `${cornerChar}${repeatedChar(xChar, longestLine + (options.xPadding * 2))}${cornerChar}\n`;

        for(var i = 0; i < options.yPadding; i ++){
            ret += `${yChar}${repeatedChar(" ", longestLine + (options.xPadding * 2))}${yChar}\n`;
        }

        // ret += `${yChar}` + repeatedChar(" ", options.xPadding) + lines.join('\n') + repeatedChar(" ", options.xPadding) + `${yChar}\n`;
        lines.forEach((line) => {
            ret += `${yChar}${repeatedChar(" ", options.xPadding)}${line}${repeatedChar(" ", options.xPadding + (longestLine - getLineLength(line)))}|\n`
        })

        for(var i = 0; i < options.yPadding; i ++){
            ret += `${yChar}${repeatedChar(" ", longestLine + (options.xPadding * 2))}${yChar}\n`;
        }

        ret += `${cornerChar}${repeatedChar(xChar, longestLine + (options.xPadding * 2))}${cornerChar}`;

        return new disp(ret);

    }

    disp.prototype.color = function(color) {
        return new disp(color(this.text));
    }

    disp.prototype.justify = function(direction, options){
        options = Object.assign({
            paddingChar: " "
        }, options);

        var lines = this.text.split('\n');
        var longestLine = getLongestLine(lines);

        lines = lines.map((line) => {
            var lineLen = getLineLength(line);

            var padding;
            if (direction == "right"){
                padding = (longestLine - lineLen);
            } else if (direction == "center") {
                padding = (longestLine - lineLen) / 2;
            }

            return repeatedChar(" ", padding) + line;
        })

        return new disp(lines.join("\n"));
    }

    disp.prototype.bracketify = function() {
        return new disp("{" + this.text + "}");
    }

    disp.prototype.prefix = function() {
        return new disp("aa: " + this.text);
    }

    disp.prototype.toString = function(){
        return this.text;
    }
    disp.prototype.inspect = function(){
        return this.text;
    }

    return (text) => {
        return new disp(text);
    }

})();
