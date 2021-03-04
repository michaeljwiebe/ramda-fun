"use strict";
exports.__esModule = true;
var ramda_1 = require("ramda");
var ramda_2 = require("ramda");
/*
functors
  -are objects that have a value key and a map key.
  -copy the functor by calling the map key with the value to access it.
    const result = map(val => val, functor) => will copy functor to result, can also transform here
  -map value can be overridden with 'fantasy-land/map`: () => 'overRIDDEN'
    const functor = {
      value: 10,
      'fantasy-land/map': () => 'You have been overridden!'
    };
  
lenses
  - use to view property of object or copy object and change just lensed value
    lensProp('name') - use to view property of object
    lensPath(['department', 'manager', 'firstName']) - use for nested values
    lens(prop('name'), assoc('name')); - longhand version, prop() allows getting, assoc() setting
    const bobo = { name: 'Bobo' };
    const name = lensProp('name');
    const lastName = lensProp('lastName');
    const result = view(name, bobo);
    const boboWithLast = set(lastName, 'Flex', bobo) -- can set new prop on copy of object like this
*/
// ============================== credit rating
var scores = [631, 604, 527, 503, 800, 579, 673, 513, 808, 701, 833, 795];
var reviewCreditScores = ramda_2.map(function (score) { return ramda_2.cond([
    [ramda_2.equals(800), ramda_2.always("800 and above is excellent!")] // 800 is less than or equal to core
    [ramda_2.lte(700), ramda_2.always("700 and above is good")],
    [ramda_2.lte(650), ramda_2.always("650 and above is fair")],
    [ramda_2.always(true), ramda_2.always("$649 and below is poor")],
]); });
console.log(ramda_2.lte(800, 900));
console.log('scores', reviewCreditScores(scores)); // not working -- ??
// ============================== median salary
var toUSD = function (number) { return number
    .toLocaleString('en-US', {
    style: 'currency', currency: 'USD'
}); };
var greaterThan100k = function (arr) {
    return ramda_2.map(function (s) { return ramda_2.gte(s, 100000) ? s : false; }, arr);
};
var getMedianPaycheck = ramda_2.pipe(ramda_2.pluck('salary'), greaterThan100k, ramda_2.filter(function (s) { return s; }), ramda_2.median, function (median) { return median / 12; }, toUSD);
// console.log(getMedianPaycheck(employees));
// ============================== menu exercises
var filterLessThanPriceImproved = function (price, items) {
    return ramda_2.filter(ramda_2.propSatisfies(ramda_2.lte(price), 'price'), items);
};
// console.log('filterLessThanPriceImproved', filterLessThanPriceImproved(12, menu));
var filterLessThanPrice = function (price, items) {
    return ramda_2.filter(function (a) { return a.price <= price; }, items);
};
// console.log(curry(filterLessThanPrice)(20));
var getBottom3 = ramda_2.takeLast(3);
var getTop3 = function (array) { return [array[0], array[1], array[2]]; };
var sortByRatingDescend = ramda_2.sort(ramda_2.descend(ramda_2.prop('rating')));
var sortByRating = ramda_2.sort(ramda_2.prop('rating')); // doesn't actually sort items
// console.log('sortByRating', sortByRatingDescend(menu));
var getTop3MealsFor = ramda_2.curry(ramda_2.pipe(filterLessThanPrice, sortByRatingDescend, getTop3));
// console.log('getTop3MealsForCALLED', getTop3(sortByRating(filterLessThanPrice(12, menu))));
// console.log('getTop3MealsFor', getTop3MealsFor(12)(menu));
// ============================== cart exercises
var sortByFirstItem = ramda_2.sortBy(ramda_2.prop(0));
var pairs = [[-1, 1], [-2, 2], [-3, 3]];
// console.log('sortByFirstItem', sortByFirstItem(pairs)); //=> [[-3, 3], [-2, 2], [-1, 1]]
var getCheapestItemNameImproved = (ramda_2.pipe(ramda_2.sortBy(ramda_2.prop('price')), // takes a prop only
ramda_2.head, ramda_2.prop('name')));
// console.log('getCheapestItemNameImproved', getCheapestItemNameImproved(cart));
var getCheapestItemName = (ramda_2.pipe(ramda_2.sort(function (a, b) { return a.price - b.price; }), // takes a function to use for sorting
ramda_2.head, ramda_2.prop('name')));
// console.log('getCheapestItemName', getCheapestItemName(cart));
var getCheapestItemPrice = (ramda_2.pipe(ramda_2.pluck('price'), ramda_2.sort(function (a, b) { return a - b; }), ramda_2.head));
// console.log('getCheapestItemPrice', getCheapestItemPrice(cart));
var getItemPrice = ramda_2.prop('price');
var getItemPrices = ramda_2.map(function (i) { return getItemPrice(i); });
var reduceList = ramda_2.reduce(ramda_2.add, 0); // takes fn, accumulator, data
var getTotalPrice = ramda_2.pipe(getItemPrices, reduceList);
var getTotalPriceImproved = ramda_2.pipe(ramda_2.pluck('price'), ramda_2.sum);
// console.log(getTotalPrice(cart));
// console.log(getTotalPriceImproved(cart));
// ============================== conditionals
var findAnimal = ramda_2.cond([
    [ramda_2.equals('lion'), ramda_2.always('Africa and India')],
    [ramda_2.equals('tiger'), ramda_2.always('China, Russia, India, Vietnam, and many more')],
    [ramda_2.equals('hyena'), ramda_2.always('African Savannah')],
    [ramda_2.equals('grizzly bear'), ramda_2.always('North America')],
    [ramda_2.always(true), ramda_2.always('Not sure, try Googling it!')]
]);
// console.log(findAnimal('cow'));
// console.log(findAnimal('hyena'));
var hasAccess = true;
var isEven = function (num) { return num % 2 === 0; };
var logAccess = ramda_2.ifElse(function () { return hasAccess; }, function () { return 'has access'; }, function () { return 'denied'; });
var doubleIfEven = ramda_2.when(isEven, ramda_2.multiply(2));
var doubleIfOdd = ramda_2.unless(isEven, ramda_2.multiply(2));
// console.log('logAccess', logAccess());
// console.log('doubleIfEven', doubleIfEven(23));
// console.log('doubleIfEven', doubleIfEven(22));
// console.log('doubleIfOdd', doubleIfOdd(23));
// console.log('doubleIfOdd', doubleIfOdd(24));
// ============================== keep young adults
var defaultTo = ramda_2.curry(function (defaultVal, val) { return val ? val : defaultVal; });
var defaultToBobo = defaultTo('Bobo');
var bilbo = defaultTo('Bilbo');
// console.log(bilbo(null));
// console.log(bilbo('Bilbo'));
// console.log(bilbo('Frodo'));
var addFourNumbers = function (a, b, c, d) { return a + b + c + d; };
var curriedAddFourNumbers = ramda_2.curry(addFourNumbers);
var f = curriedAddFourNumbers(1, 2);
var g = f(3);
// console.log('G', g(4)); //=> 10
// ============================== keep young adults
var between28And25 = ramda_2.propSatisfies(function (age) { return age >= 18 && age <= 25; }, 'age');
var keepYoungAdults = ramda_2.filter(between28And25);
// console.log('between18and25', between28And25(friends));
// console.log('keepYoungAdults', keepYoungAdults([{"age":20},{"age":16},{"age":18},{"age":26},{"age":25},{"age":19}]));
// ============================== get ages from array of people
var squid = { "name": "Squidward", "lovesTech": false, "worksHard": false, age: 222 };
var sandy = { "name": "Sandy", "lovesTech": true, "worksHard": true, age: 2 };
var sponge = { "name": "Spongebob", "lovesTech": false, "worksHard": true, age: 23 };
var friends = [squid, sandy, sponge];
var ages = ramda_2.map(ramda_2.prop('age'));
// console.log(prop('age', sandy));
// console.log('map obj', map(add(1), {x: 1, y: 2, z: 3}));
// console.log('map arr', map(add(2), [1, 2, 3]));
// console.log(ages(friends));
// ================================ loves tech and works hard?
var equals3 = ramda_2.equals(3);
// const lovesTech = person => propEq('person.lovesTech', true)();
var worksHard = ramda_2.propEq('worksHard', true);
var equalsTrue = ramda_2.equals(true);
// const lovesTechAndWorksHard = all(equalsTrue, [lovesTech, worksHard]);
var getName = ramda_2.path(['name']);
// const shouldCode = ifElse(lovesTechAndWorksHard,
//   person => `${getName} may enjoy a tech career!`,
//   person => `${getName} wouldn't enjoy a tech caree`,
// );
var shouldCode = ramda_2.ifElse(ramda_2.where({
    lovesTech: equalsTrue,
    worksHard: equalsTrue
}), function (p) { return p.name + " should code"; }, function (p) { return p.name + " should NOT code"; });
// console.log('equals', all(equals3)([3, 3, 3, 3]));
// console.log('worksHard', worksHard(squid));
// console.log('shouldCode', shouldCode(squid));
// console.log('shouldCode', shouldCode(sandy));
// console.log('shouldCode', shouldCode(sponge));
// ================================ countTrue
// this.countTrue = (array: Array<Boolean>): Number => {
//   var num = filter(equals(true))(array).length;
//   return num;
// }
// console.log(this.countTrue([true, false, false, true, false]));
// console.log(this.countTrue([false, false, false, false]));
// console.log(this.countTrue([]));
// ================================ 151 is a boomerang, count number of them in an array
var countBoomerangs = function (array) {
    var boomerangs = array.map(function (num, idx) {
        return num === array[idx + 2] && num !== array[idx + 1];
    });
    return ramda_2.pipe(ramda_2.filter(ramda_2.equals(true)))(boomerangs).length;
};
// console.log(this.countBoomerangs([9, 5, 9, 5, 1, 1, 1]));
// console.log(this.countBoomerangs([5, 6, 6, 7, 6, 3, 9]));
// console.log(this.countBoomerangs([4, 4, 4, 9, 9, 9, 9]));
// ================================ Add numbers, split into integers, multiply by each other, split-multiply loop until single-digit number left
// this.splitNums = (nums: number[]): string[] => {
//   var sum;
//   if (nums.length > 1) {
//     sum = nums.reduce((a, b) => a + b);
//   } else {
//     sum = nums[0];
//   }
//   return sum.toString().split('');
// }
// this.digiProd = (arrNums: string[]): number => {
//   var product = 1;
//   arrNums.forEach(num => {
//     product = parseInt(num) * product;
//   })
//   return product;
// }
// this.sumDigiProd = (...nums: number[]): number => {
//   var splitNums = this.splitNums(nums);
//   var product = this.digiProd(splitNums);
//   var splitProduct = this.splitNums([product]);
//   while (splitProduct.length > 1) {
//     product = this.digiProd(splitProduct);
//     splitProduct = this.splitNums([product]);
//   }
//   return parseInt(splitProduct[0]);
// }
// console.log(this.sumDigiProd(0));
// console.log(this.sumDigiProd(1, 2, 3, 4, 5, 6));
// console.log(this.sumDigiProd(1, 2, 3, 4, 5, 6,123,123123));
// console.log(this.sumDigiProd(1, 2, 3, 4, 5, 6,123,23));
// ================================ SET card game
// interface Card {
//   color: string,
//   number: number,
//   shade: string,
//   shape: string
// }
// const areKeysEqual = (key, cards) => {
//   const values = getVals(key, cards);
//   const isItASet = equals(...values);
//   return isItASet;
// }
// const areKeysDifferent = (key, cards) => {
//   const values = getVals(key, cards);
//   const keysAreDifferent = uniq(values).length === values.length;
//   // console.log('values', values);
//   // console.log(`${key} is different`, keysAreDifferent);
//   return keysAreDifferent;
// }
// const getVals = (key, cards) => {
//   return map((cds) => path([key], cds), cards);
// }
// const isSet = (cards: Card[]):Boolean => {
//   var colorSet = areKeysEqual('color', cards);
//   var numberSet = areKeysEqual('number', cards);
//   var shadeSet = areKeysEqual('shade', cards);
//   var shapeSet = areKeysEqual('shape', cards);
//   var colorsDifferent = areKeysDifferent('color', cards);
//   var numbersDifferent = areKeysDifferent('number', cards);
//   var shadesDifferent = areKeysDifferent('shade', cards);
//   var shapesDifferent = areKeysDifferent('shape', cards);
//   return (
//     (colorSet && numbersDifferent && shadesDifferent && shapesDifferent) || 
//     (colorSet && shadeSet && numbersDifferent && shapesDifferent) || 
//     (shadeSet && numbersDifferent && colorsDifferent && shapesDifferent) || 
//     (colorsDifferent && numbersDifferent && shadesDifferent && shapesDifferent) ||
//     (shapeSet && numbersDifferent && shadeSet && colorsDifferent) || 
//     (numberSet && shapesDifferent && colorsDifferent && shadesDifferent) ||
//     (numberSet && colorsDifferent && shapeSet && shadeSet) ||
//     (numberSet && colorSet && shapeSet && shadeSet)
//   );
// }
// console.log(isSet([
//   { color: "green", number: 1, shade: "empty", shape: "squiggle" },
//   { color: "green", number: 2, shade: "empty", shape: "diamond" },
//   { color: "green", number: 3, shade: "empty", shape: "oval" }
// ]));
// console.log(isSet([
//   { color: "purple", number: 1, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 1, shade: "full", shape: "oval" }
// ]));
// console.log(isSet([
//   { color: "purple", number: 3, shade: "full", shape: "oval" },
//   { color: "green", number: 1, shade: "full", shape: "oval" },
//   { color: "red", number: 3, shade: "full", shape: "oval" }
// ]));
// ================================ take class average by 5% by adding one value
// this.calcAvg = (strippedNums: number[], length: number): number => {
//   return this.calcTotalPoints(strippedNums) / length;
// }
// this.calcTotalPoints = (strippedNums: number[]): number => {
//   return strippedNums.reduce((a, b) => a + b);
// }
// this.takeDownAverage = (percents: string[]): string => {
//   var strippedNums = percents.map(num => parseInt(num.split('%')[0]));
//   var avg = this.calcAvg(strippedNums, percents.length);
//   var totalPointsAt5PercentLess = (avg - 5) * (percents.length + 1);
//   var scoreNeeded = Math.round(totalPointsAt5PercentLess - this.calcTotalPoints(strippedNums));
//   return `${scoreNeeded}%`;
// }
// console.log(this.takeDownAverage(["95%", "83%", "90%", "87%", "88%", "93%"])); // "54%"
// console.log(this.takeDownAverage(["10%"])); // "0%"
// console.log(this.takeDownAverage(["53%", "79%"])); // "51%"
// ================================ build string with num x [val] and return vals pushed together
// interface stringParts {
//   num: number,
//   group: string,
//   nextNum: number;
//   nextGroup: string
// }
// this.getGroup = (str: string): stringParts => {
//   var group, nextNum; 
//   var nextGroup = stslice(stindexOf(']') + 1);
//   var num = parseInt(str[stindexOf('[') - 1])
//   if (stindexOf(']') > -1) {
//     group = stslice(stindexOf('[') + 1, stindexOf(']'));
//   } else {
//     group = stslice(stindexOf('[') + 1);
//   }
//   if (nextGroup.includes('[')) {
//     [nextNum, nextGroup] = nextGroup.split('[');
//   }
//   return { num, group, nextNum: parseInt(nextNum), nextGroup };
// }
// let builtString = '';
// this.buildString = ({num, group, nextNum, nextGroup}) => {
//   let first, second;
//   if (group.includes('[')) {
//     if (group.match(/[a-z[]/gi)) {
//       console.log('PROBLEM', );
//       var matchArr = group.match(/[a-z[]/gi);
//       first = matchArsplice(0, matchArindexOf('[')).join('');
//       second = matchArsplice(matchArindexOf('[')).join('');
//     } else {
//       first = group.match(/[a-z]/gi).join('');
//     }
//   }
//   while (num > 0) {
//     console.log('GETTING THERE');
//     builtString += first;
//     num--;
//   }
// }
// this.stringBuilder = (str: string): string => {
//   var strObj = this.getGroup(str);
//   if (strObj.group.indexOf('[') > -1) {
//     this.buildString(strObj)
//     console.log('builtString', builtString);
//     return this.stringBuilder(strObj.group);
//   } else {
//     this.buildString(strObj);
//   }
//   console.log('match', strObj.nextGroup.match(/[a-z]/gi));
//   if (strObj.nextGroup.match(/[a-z]/gi)) {
//     return this.stringBuilder(strObj.nextGroup);
//   }
// }
// console.log('getGroup', this.getGroup("3[a]2[bc]")); //     { num: 3, group: 'a', nextNum: 2, nextGroup: 'bc]' }
// console.log('getGroup', this.getGroup("3[a2[c]]")); //      { num: 3, group: 'a2[c', nextNum: NaN, nextGroup: ']' }
// console.log('getGroup', this.getGroup("2[abc]3[cd]ef")); // { num: 2, group: 'abc', nextNum: 3, nextGroup: 'cd]ef' }
// console.log('stringBuilder', this.stringBuilder("3[a]2[bc.]")); // "aaabcbc"
// console.log('stringBuilder', this.stringBuilder("3[a2[c]]")); // "accaccacc"
// console.log('stringBuilder', this.stringBuilder("2[abc]3[cd]ef")); // "abcabccdcdcdef"
// ================================ find matching parts of two strings in an array that look like arrays of numbers converted to strings
// function findIntersection(strArr) { 
//   var firstArr = prepArr(strArr[0]);
//   var secondArr = prepArr(strArr[1]);
//   return intersections.length ? `"${intersections.join(',')}"` : false;
// }
var findIntersection = ramda_2.pipe(ramda_2.map(function (a) { return ramda_1["default"].sort(prepArr(a)); }));
var sortNums = function (nums) {
    return nums.sort(function (a, b) {
        return a - b;
    });
};
var prepArr = function (arr) {
    return sortNums(arr.split(',').map(function (str) { return parseInt(str); }));
};
// console.log(prepArr("1, 3, 9, 4, 7, 13"));
// console.log(sortNums(prepArr("1, 3, 9, 4, 7, 13")));
// console.log(findIntersection(["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]));
// ================================ UpperAndReverseFirstName
var getFirstName = function (user) { return ramda_2.pathOr('', ['firstName'], user); };
var upperCase = function (name) { return name.toUpperCase(); };
var upperAndReverseFirstName = ramda_2.pipe(getFirstName, upperCase, ramda_2.reverse);
var bobo = {
    firstName: 'Bobo',
    lastName: 'Flakes'
};
// console.log(upperAndReverseFirstName(bobo))
var users = [{
        firstName: 'Bobo',
        lastName: 'Flakes'
    }, {
        firstName: 'Lawrence',
        lastName: 'Shilling'
    }, {
        firstName: 'Anon',
        lastName: 'User'
    }];
var upperReversedNames = function (usersArray) { return usersArray.map(function (user) { return upperAndReverseFirstName(user); }); };
var mapUpper = ramda_2.map(upperAndReverseFirstName);
// console.log(upperReversedNames(users));
// console.log(mapUpper(users));
