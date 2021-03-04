/*
Given an array of non-negative integers nums, you are initially positioned at the first index of the array.
Each element in the array represents your maximum jump length at that position
Your goal is to reach the last index in the minimum number of jumps.
You can assume that you can always reach the last index.

Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
*/

const vvShortArray = [1,2,3];
const veryShortArray = [2, 3, 1, 1, 4];
const shortArray = [2, 1, 3, 1, 4,2,3,4,5,6,1,2,3,1,1,3,4,1];
const longArray = [1, 3, 4, 3, 5, 6, 1, 3, 3, 6, 3, 1, 1, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 5, 4, 2, 3, 2, 6, 6, 2, 3, 2, 1, 3, 1];
const getMaxJump = nums => {
  var jumps = nums.map(num => {
    return { jump: nums.indexOf(num) + num, num, index: nums.indexOf(num) };
  })
  var maxJump = { jump: 0 };
  jumps.forEach(obj => {
    if (maxJump.jump < obj.jump) {
      maxJump = obj;
    }
  })
  return maxJump;
};
const getArrForJump = (nums, maxIndex = 0) => [...nums].splice(maxIndex ? maxIndex : 1, nums[0]);
const shortenArray = (index, nums) => {
  let shorterArray = [...nums].splice(index);
  // if (shorterArray.length === 0) {
  //   shorter
  // }
  return shorterArray;
};

const jump = nums => {
  var workingNums = [...nums];
  var counter = 0
  var arrForJump = getArrForJump(workingNums);
  while (workingNums.length > 1) {
    if (nums.length !== workingNums.length) {
      arrForJump = getArrForJump(workingNums);
    }
    var maxJump = getMaxJump(arrForJump);
    console.log('maxJump', maxJump);
    counter += 1;
    console.log('workingNums1', workingNums);
    // console.log('maxJump', maxJump);
    workingNums = shortenArray(maxJump.index, workingNums);
    console.log('workingNums2', workingNums);
  }
  return counter;
};
// console.log(jump(vvShortArray));
// jump(veryShortArray)
// jump(shortArray);
// jump(longArray);

console.log('TEST', getMaxJump(getArrForJump(vvShortArray)));
console.log(shortenArray(2, vvShortArray));
console.log(shortenArray(2, shortArray));
// console.log(getMaxJump(getArrForJump(shortArray)));
// console.log(getMaxJump(getArrForJump(longArray)));