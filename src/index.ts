import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const R = require('ramda');



// this.countTrue = (array: Array<Boolean>): Number => {
//   var num = R.filter(R.equals(true))(array).length;
//   return num;
// }
// console.log(this.countTrue([true, false, false, true, false]));
// console.log(this.countTrue([false, false, false, false]));
// console.log(this.countTrue([]));

// ================================ 151 is a boomerang, count number of them in an array

// this.countBoomerangs = (array: number[]): Number => {
//   let boomerangs = array.map((num, idx) => {
//     return num === array[idx + 2] && num !== array[idx + 1];
//   })
//   return R.pipe(R.filter(R.equals(true)))(boomerangs).length;
// }

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
//   const isItASet = R.equals(...values);
//   return isItASet;
// }

// const areKeysDifferent = (key, cards) => {
//   const values = getVals(key, cards);
//   const keysAreDifferent = R.uniq(values).length === values.length;
//   // console.log('values', values);
//   // console.log(`${key} is different`, keysAreDifferent);
//   return keysAreDifferent;
// }

// const getVals = (key, cards) => {
//   return R.map((cds) => R.path([key], cds), cards);
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

interface stringParts {
  num: number,
  nextGroup: string,
  restOfStr: string
}

this.getGroup = (str: string): stringParts => {
  var nextGroup; 
  var restOfStr = str.slice(str.indexOf(']') + 1);
  var num = parseInt(str[str.indexOf('[') - 1])
  if (str.indexOf(']') > -1) {
    nextGroup = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
  } else {
    nextGroup = str.slice(str.indexOf('[') + 1);
  }
  return { num, nextGroup, restOfStr };
}

this.stringBuilder = (str: string): string => {
  let { num, nextGroup, restOfStr } = this.getGroup(str);
  let builtString = '';
  while (nextGroup.indexOf('[') > -1) {
    while (num > 0) {
      
      num--
    }
    { num, nextGroup, restOfStr } = this.getGroup(nextGroup)
  }
  return builtString;
}
console.log('getGroup', this.getGroup("3[a]2[bc]"));
console.log('getGroup', this.getGroup("3[a2[c]]"));
console.log('getGroup', this.getGroup("2[abc]3[cd]ef"));
// this.stringBuilder("3[a]2[bc]"); // "aaabcbc"
// this.stringBuilder("3[a2[c]]"); // "accaccacc"
// this.stringBuilder("2[abc]3[cd]ef"); // "abcabccdcdcdef"