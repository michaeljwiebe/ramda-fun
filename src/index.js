var _this = this;
var R = require('ramda');
this.getGroup = function (str) {
    var num, group, nextNum, nextGroup, responseObject;
    var strObj = { num: num, group: group };
    if (str.indexOf(']') > -1) {
        group = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
        nextGroup = str.slice(str.indexOf(']') + 1);
        if (nextGroup.includes('[')) {
            _a = nextGroup.split('['), nextNum = _a[0], nextGroup = _a[1];
            nextNum = parseInt(nextNum);
            responseObject = Object.assign({ nextNum: nextNum, nextGroup: nextGroup }, strObj);
        }
    }
    else if (str.indexOf('[') > -1) {
        num = parseInt(str[str.indexOf('[') - 1]);
        group = str.slice(str.indexOf('[') + 1);
    }
    Object.assign(strObj, responseObject);
    return responseObject;
    var _a;
};
var builtString = '';
this.buildString = function (_a) {
    var num = _a.num, group = _a.group, _b = _a.nextNum, nextNum = _b === void 0 ? 0 : _b, _c = _a.nextGroup, nextGroup = _c === void 0 ? '' : _c;
    var first, second;
    if (group.includes('[')) {
        var matchArr = group.match(/[a-z[]/gi);
        first = matchArr.splice(0, matchArr.indexOf('[')).join('');
        second = matchArr.splice(matchArr.indexOf('[') + 1).join('');
    }
    else {
        first = group.match(/[a-z]/gi).join('');
    }
    console.log('first', first);
    console.log('second', second);
    while (num > 0) {
        builtString += first;
        num--;
    }
    console.log('builtString', builtString);
    // if (group.match(/[0-9]/gi)) {
    //   nextNum = group.match(/[0-9]/gi);
    //   while (nextNum > 0) {
    //     builtString += second;
    //     nextNum--;
    //   }
    // }
};
this.stringBuilder = function (str) {
    builtString = '';
    var strObj = _this.getGroup(str);
    console.log('strObj', strObj);
    if (strObj.group.indexOf('[') > -1) {
        _this.buildString(strObj);
        return _this.stringBuilder(strObj.group);
    }
    else {
        _this.buildString(strObj);
    }
    if (R.pathOr('', ['nextGroup'], strObj).match(/[a-z]/gi)) {
        console.log('strObj.nextGroup', strObj.nextGroup);
        return _this.stringBuilder(strObj.nextGroup);
    }
    return builtString;
};
// console.log('getGroup', this.getGroup("3[a]2[bc]")); //     { num: 3, group: 'a', nextNum: 2, nextGroup: 'bc]' }
// console.log('getGroup', this.getGroup("3[a2[c]]")); //      { num: 3, group: 'a2[c', nextNum: NaN, nextGroup: ']' }
// console.log('getGroup', this.getGroup("2[abc]3[cd]ef")); // { num: 2, group: 'abc', nextNum: 3, nextGroup: 'cd]ef' }
console.log('stringBuilder', this.stringBuilder("3[a]2[bc.]")); // "aaabcbc"
console.log('stringBuilder', this.stringBuilder("3[a2[c]]")); // "accaccacc"
console.log('stringBuilder', this.stringBuilder("2[abc]3[cd]ef")); // "abcabccdcdcdef"
