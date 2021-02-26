"use strict";
var _this = this;
exports.__esModule = true;
var R = require('ramda');
this.getGroup = function (str) {
    var nextGroup;
    var restOfStr = str.slice(str.indexOf(']') + 1);
    var num = parseInt(str[str.indexOf('[') - 1]);
    if (str.indexOf(']') > -1) {
        nextGroup = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
    }
    else {
        nextGroup = str.slice(str.indexOf('[') + 1);
    }
    return { num: num, nextGroup: nextGroup, restOfStr: restOfStr };
};
this.stringBuilder = function (str) {
    var _a = _this.getGroup(str), num = _a.num, nextGroup = _a.nextGroup, restOfStr = _a.restOfStr;
    var builtString = '';
    while (nextGroup.indexOf('[') > -1) {
        while (num > 0) {
            num--;
        }
        {
            num, nextGroup, restOfStr;
        }
        _this.getGroup(nextGroup);
    }
    return builtString;
};
console.log('getGroup', this.getGroup("3[a]2[bc]"));
console.log('getGroup', this.getGroup("3[a2[c]]"));
console.log('getGroup', this.getGroup("2[abc]3[cd]ef"));
// this.stringBuilder("3[a]2[bc]"); // "aaabcbc"
// this.stringBuilder("3[a2[c]]"); // "accaccacc"
// this.stringBuilder("2[abc]3[cd]ef"); // "abcabccdcdcdef"
