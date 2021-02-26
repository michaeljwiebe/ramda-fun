var _this = this;
var R = require('ramda');
this.getGroup = function (str) {
    var _a;
    var group, nextNum;
    var nextGroup = str.slice(str.indexOf(']') + 1);
    var num = parseInt(str[str.indexOf('[') - 1]);
    if (str.indexOf(']') > -1) {
        group = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
    }
    else {
        group = str.slice(str.indexOf('[') + 1);
    }
    if (nextGroup.includes('[')) {
        _a = nextGroup.split('['), nextNum = _a[0], nextGroup = _a[1];
    }
    return { num: num, group: group, nextNum: parseInt(nextNum), nextGroup: nextGroup };
};
var builtString = '';
this.buildString = function (_a) {
    var num = _a.num, group = _a.group, nextNum = _a.nextNum, nextGroup = _a.nextGroup;
    var first, second;
    if (group.includes('[')) {
        if (group.match(/[a-z[]/gi)) {
            console.log('PROBLEM');
            var matchArr = group.match(/[a-z[]/gi);
            first = matchArr.splice(0, matchArr.indexOf('[')).join('');
            second = matchArr.splice(matchArr.indexOf('[')).join('');
        }
        else {
            first = group.match(/[a-z]/gi).join('');
        }
    }
    while (num > 0) {
        console.log('GETTING THERE');
        builtString += first;
        num--;
    }
    // if (group.match(/[0-9]/gi)) {
    //   nextNum = group.match(/[0-9]/gi);
    //   while (nextNum > 0) {
    //     builtString += second;
    //     nextNum--;
    //   }
    // }
};
this.stringBuilder = function (str) {
    var strObj = _this.getGroup(str);
    if (strObj.group.indexOf('[') > -1) {
        _this.buildString(strObj);
        console.log('builtString', builtString);
        return _this.stringBuilder(strObj.group);
    }
    else {
        _this.buildString(strObj);
    }
    console.log('match', strObj.nextGroup.match(/[a-z]/gi));
    if (strObj.nextGroup.match(/[a-z]/gi)) {
        return _this.stringBuilder(strObj.nextGroup);
    }
};
// console.log('getGroup', this.getGroup("3[a]2[bc]")); //     { num: 3, group: 'a', nextNum: 2, nextGroup: 'bc]' }
// console.log('getGroup', this.getGroup("3[a2[c]]")); //      { num: 3, group: 'a2[c', nextNum: NaN, nextGroup: ']' }
// console.log('getGroup', this.getGroup("2[abc]3[cd]ef")); // { num: 2, group: 'abc', nextNum: 3, nextGroup: 'cd]ef' }
console.log('stringBuilder', this.stringBuilder("3[a]2[bc.]")); // "aaabcbc"
// console.log('stringBuilder', this.stringBuilder("3[a2[c]]")); // "accaccacc"
// console.log('stringBuilder', this.stringBuilder("2[abc]3[cd]ef")); // "abcabccdcdcdef"
