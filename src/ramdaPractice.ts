import R from 'ramda';
import { employees } from './employees';
import { cart } from './cart';
import { menu } from './menu';
import {
  median,
  curry,
  pluck,
  reverse,
  pipe,
  path,
  pathOr,
  map,
  reject,
  ifElse,
  propEq,
  propSatisfies,
  filter,
  prop,
  equals,
  where,
  when,
  multiply,
  unless,
  cond,
  always,
  reduce,
  add,
  sum,
  sort,
  head,
  sortBy,
  takeLast,
  lte,
  gte,
  descend,
  T
} from 'ramda';

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
const scores = [631,604,527,503,800,579,673,513,808,701,833,795];
const reviewCreditScores = map(score => cond([
  [equals(800), always(`800 and above is excellent!`)] // 800 is less than or equal to core
  [lte(700), always(`700 and above is good`)],
  [lte(650), always(`650 and above is fair`)],
  [always(true), always(`$649 and below is poor`)], // 649 is greater than or equal to score
]));

console.log(lte(800, 900)); // true
// console.log('scores', reviewCreditScores(scores));// not working -- ??
// ============================== median salary

const toUSD = number => number
  .toLocaleString('en-US', {
    style: 'currency', currency: 'USD'
  });

const greaterThan100k = (arr) => {
  return map(s => gte(s, 100000) ? s : false, arr);
}

const getMedianPaycheck = pipe(
  pluck('salary'),
  greaterThan100k,
  filter(s => s),
  median,
  (median) => median / 12,
  toUSD
)

// console.log(getMedianPaycheck(employees));


// ============================== menu exercises

const filterLessThanPriceImproved = (price, items) => {
  return filter(propSatisfies(lte(price), 'price'), items);
}
// console.log('filterLessThanPriceImproved', filterLessThanPriceImproved(12, menu));

const filterLessThanPrice = (price, items) => {
  return filter((a) => a.price <= price, items);
}
// console.log(curry(filterLessThanPrice)(20));

const getBottom3 = takeLast(3);
const getTop3 = (array) => [ array[0], array[1], array[2] ];
const sortByRatingDescend = sort(descend(prop('rating')));
const sortByRating = sort(prop('rating')); // doesn't actually sort items
// console.log('sortByRating', sortByRatingDescend(menu));

const getTop3MealsFor = curry(pipe(
  filterLessThanPrice,
  sortByRatingDescend,
  getTop3
))

// console.log('getTop3MealsForCALLED', getTop3(sortByRating(filterLessThanPrice(12, menu))));
// console.log('getTop3MealsFor', getTop3MealsFor(12)(menu));

// ============================== cart exercises
const sortByFirstItem = sortBy(prop(0));
const pairs = [[-1, 1], [-2, 2], [-3, 3]];
// console.log('sortByFirstItem', sortByFirstItem(pairs)); //=> [[-3, 3], [-2, 2], [-1, 1]]

const getCheapestItemNameImproved = (
  pipe(
    sortBy(prop('price')), // takes a prop only
    head,
    prop('name')
  )
)

// console.log('getCheapestItemNameImproved', getCheapestItemNameImproved(cart));

const getCheapestItemName = (
  pipe(
    sort((a,b) => a.price - b.price), // takes a function to use for sorting
    head,
    prop('name')
  )
)

// console.log('getCheapestItemName', getCheapestItemName(cart));


const getCheapestItemPrice = (
  pipe(
    pluck('price'),
    sort((a, b) => a - b),
    head
  )
);

// console.log('getCheapestItemPrice', getCheapestItemPrice(cart));

const getItemPrice = prop('price');
const getItemPrices = map(i => getItemPrice(i));
const reduceList = reduce(add, 0); // takes fn, accumulator, data
const getTotalPrice = pipe(
  getItemPrices,
  reduceList
);
const getTotalPriceImproved = pipe(
  pluck('price'),
  sum
)

// console.log(getTotalPrice(cart));
// console.log(getTotalPriceImproved(cart));

// ============================== conditionals

const findAnimal = cond([
  [equals('lion'), always('Africa and India')],
  [equals('tiger'), always('China, Russia, India, Vietnam, and many more')],
  [equals('hyena'), always('African Savannah')],
  [equals('grizzly bear'), always('North America')],
  [always(true), always('Not sure, try Googling it!')]
]);

// console.log(findAnimal('cow'));
// console.log(findAnimal('hyena'));


const hasAccess = true;

const isEven = (num) => num % 2 === 0;

const logAccess = ifElse(() => hasAccess, () => 'has access', () => 'denied')
const doubleIfEven = when(isEven, multiply(2));
const doubleIfOdd = unless(isEven, multiply(2));

// console.log('logAccess', logAccess());
// console.log('doubleIfEven', doubleIfEven(23));
// console.log('doubleIfEven', doubleIfEven(22));
// console.log('doubleIfOdd', doubleIfOdd(23));
// console.log('doubleIfOdd', doubleIfOdd(24));


// ============================== keep young adults

const defaultTo = curry((defaultVal, val) => val ? val : defaultVal);

const defaultToBobo = defaultTo('Bobo');
const bilbo = defaultTo('Bilbo');

// console.log(bilbo(null));
// console.log(bilbo('Bilbo'));
// console.log(bilbo('Frodo'));

const addFourNumbers = (a, b, c, d) => a + b + c + d;

const curriedAddFourNumbers = curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
// console.log('G', g(4)); //=> 10

// ============================== keep young adults

const between28And25 = propSatisfies(age => age >= 18 && age <= 25, 'age');
const keepYoungAdults = filter(between28And25);


// console.log('between18and25', between28And25(friends));
// console.log('keepYoungAdults', keepYoungAdults([{"age":20},{"age":16},{"age":18},{"age":26},{"age":25},{"age":19}]));

// ============================== get ages from array of people

const squid = { "name": "Squidward", "lovesTech": false, "worksHard": false, age: 222 };
const sandy = { "name": "Sandy", "lovesTech": true, "worksHard": true, age: 2 };
const sponge = { "name": "Spongebob", "lovesTech": false, "worksHard": true, age: 23 };

const friends = [squid, sandy, sponge];

const ages = map(prop('age'));

// console.log(prop('age', sandy));

// console.log('map obj', map(add(1), {x: 1, y: 2, z: 3}));
// console.log('map arr', map(add(2), [1, 2, 3]));
// console.log(ages(friends));


// ================================ loves tech and works hard?

const equals3 = equals(3);

// const lovesTech = person => propEq('person.lovesTech', true)();
const worksHard = propEq('worksHard', true);
const equalsTrue = equals(true);
// const lovesTechAndWorksHard = all(equalsTrue, [lovesTech, worksHard]);
const getName = path(['name']);

// const shouldCode = ifElse(lovesTechAndWorksHard,
//   person => `${getName} may enjoy a tech career!`,
//   person => `${getName} wouldn't enjoy a tech caree`,
// );

const shouldCode = ifElse(where({
  lovesTech: equalsTrue,
  worksHard: equalsTrue,
}),
  (p) => `${p.name} should code`,
  (p) => `${p.name} should NOT code`
)

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

const countBoomerangs = (array: number[]): Number => {
  let boomerangs = array.map((num, idx) => {
    return num === array[idx + 2] && num !== array[idx + 1];
  })
  return pipe(filter(equals(true)))(boomerangs).length;
}

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

const findIntersection = pipe(map((a) => R.sort(prepArr(a))));

const sortNums = (nums) => {
  return nums.sort((a, b) => {
    return a - b;
  })
}

const prepArr = (arr) => {
  return sortNums(arr.split(',').map(str => parseInt(str)));
}

// console.log(prepArr("1, 3, 9, 4, 7, 13"));
// console.log(sortNums(prepArr("1, 3, 9, 4, 7, 13")));


// console.log(findIntersection(["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]));

// ================================ UpperAndReverseFirstName

const getFirstName = (user) => pathOr('', ['firstName'], user);
const upperCase = (name) => name.toUpperCase();
const upperAndReverseFirstName = pipe(getFirstName, upperCase, reverse);


const bobo = {
  firstName: 'Bobo',
  lastName: 'Flakes'
};

// console.log(upperAndReverseFirstName(bobo))

const users = [{
  firstName: 'Bobo',
  lastName: 'Flakes'
}, {
  firstName: 'Lawrence',
  lastName: 'Shilling'
}, {
  firstName: 'Anon',
  lastName: 'User'
}];

const upperReversedNames = (usersArray) => usersArray.map(user => upperAndReverseFirstName(user));
const mapUpper = map(upperAndReverseFirstName);

// console.log(upperReversedNames(users));
// console.log(mapUpper(users));
