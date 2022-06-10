// Number of ways to arrange digits where 0 is not consecutive
function countInCbns(n) {
    let prev1 = 2;
    let prev2 = 3;
    let count = 0;
    if (n == 1) {
        return prev1;
    } if (n == 2) {
        return prev2;
    }
    for (let index = 3; index <= n; index++) {
        count = prev1 + prev2;
        prev1 = prev2;
        prev2 = count;
    }
    return count;
}

// console.time('cbnsCount');
// console.log(countInCbns(40));
// console.timeEnd('cbnsCount');

// Plane landing problem
function Plane(index, fuel) {
    this.index = index;
    this.fuel = fuel;
}

function Node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
}

function landingOrder(list) {
    let size = list.length;
    let queue = [];
    let order = [];
    let fuelMap = new Map();
    let fuel = 0;
    let count = 0;
    let head = null;
    let current = null;

    for (let index = 0; index < size; index++) {
        const plane = new Plane(index, list[index]);
        if (!head) {
            head = new Node(plane);
            head.prev = current;
            current = head;
        } else {
            const temp = new Node(plane);
            current.next = temp;
            temp.prev = current;
            current = temp;
        }
        fuelMap.set(list[index], current);
    }
    while (count < size) {
        if (fuelMap.has(fuel)) {
            const node = fuelMap.get(fuel);
            order.push(node.data.index);
            // delete node
            if (node.next) {
                node.prev.next = node.next;
                node.next.prev = node.prev;
                node.next = node.prev = null;
            } else {
                node.prev.next = null;
            }
            // delete map element
            fuelMap.delete(fuel);
        } else {
            order.push(head.data.index);
            // delete map element
            fuelMap.delete(head.data.fuel);
            head = head.next;
        }
        fuel++;
        count++;
    }
    return order;
}

//console.log(landingOrder([5, 4, 6, 2, 0, 1]));

var largestDivisibleSubset = function (nums) {
    let result = [];
    nums.sort((a, b) => a - b);
    const dpCount = new Array(nums.length).fill(1);
    const prevIndex = new Array(nums.length).fill(-1);
    let maxIndex = 0;
    for (let i = 1; i < nums.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] % nums[j] == 0 && dpCount[i] < dpCount[j] + 1) {
                prevIndex[i] = j;
                dpCount[i] = dpCount[j] + 1;
                if (dpCount[i] > dpCount[maxIndex]) {
                    break;
                }
            }
        }
        if (dpCount[i] > dpCount[maxIndex]) {
            maxIndex = i;
        }
    }
    let k = maxIndex;
    while (k >= 0) {
        result.push(nums[k]);
        k = prevIndex[k];
    }
    return result;
};

const letterCombinations = (input) => {
    if (input.length === 0) {
        return [];
    }
    const numPad = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const size = input.length;
    const start = parseInt(input.charAt(0));
    const last = parseInt(input.charAt(size - 1));
    let result = [];
    for (let index = 0; index < numPad[start].length; index++) {
        result.push(numPad[start].charAt(index));
    }
    if (size === 1) {
        return result;
    } else {
        for (let i = 1; i < size; i++) {
            const index = parseInt(input.charAt(i));
            const output = [];
            for (let j = 0; j < result.length; j++) {
                for (let k = 0; k < numPad[index].length; k++) {
                    const str = result[j] + numPad[index].charAt(k);
                    output.push(str);
                }
            }
            result = output;
        }
    }
    return result;
}

//console.log(largestDivisibleSubset([4,8,10,240]));
// console.time('execution time')
// console.log(letterCombinations('27'));
// console.timeEnd('execution time')

const makeZeroes = (matrix) => {
    if (!matrix || matrix.length === 0) {
        return;
    }
    const rows = matrix.length;
    const cols = matrix[0].length;
    let isFirstRowZero = false;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === 0 && matrix[i][j] === 0) {
                isFirstRowZero = true;
                break;
            }
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0
            }
        }
    }

    // check zero rows
    for (let i = 1; i < rows; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 1; j < cols; j++) {
                matrix[i][j] = 0
            }
        }
    }

    // check zero columns
    for (let j = 0; j < cols; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 1; i < rows; i++) {
                matrix[i][j] = 0
            }
        }
    }
    if (isFirstRowZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
        }
    }
}

let matrix = [
    [1, 5, 45, 0, 81],
    [6, 7, 2, 82, 8],
    [20, 22, 49, 5, 5],
    [0, 23, 50, 4, 92],
];

makeZeroes(matrix);
// console.log(matrix)

// Find first unique character in a string
function firstUnique(str) {
    const map = new Map();
    let uniqueChar = ""
    for (let i = 0; i < str.length; i++) {
        const count = map.get(str[i]);
        if (count) {
            map.set(str[i], count + 1);
        } else {
            map.set(str[i], 1);
        }
    }

    for (const key of map.keys()) {
        if (map.get(key) === 1) {
            return key
        }
    }
    return undefined;
}

// console.log(firstUnique("test name"));

// Make centred align tower as
//   LOT
//  LOOOT
// LOOOOOT
function makeTower(h) {
    let str = "O";
    let spaces = Math.floor((3 + (h - 1) * 2) / 2);

    for (let i = 0; i < h; i++) {
        if (i > 0) {
            str += "OO";
        }
        let tempStr = `L${str}T`;

        let spaceStr = "";
        for (let j = 0; j < spaces; j++) {
            spaceStr += " ";
        }
        spaces--;
        tempStr = `${spaceStr}${tempStr}`;
        console.log(tempStr);
    }
}

// makeTower(8);

// Input: [1,1,0,1,1,1]
// Output: 3
// Input: [2,2,0,3,2,0,4,4]
// Output: 2

function findMaxInput(list, num) {
    let count = 0;
    let maxCount = 0;
    for (let i = 0; i < list.length; i++) {
        count = list[i] === num ? count + 1 : 0;
        if (maxCount < count) {
            maxCount = count
        }
    }
    return maxCount;
}

// console.log(findMaxInput([2,2,0,3,2,0,4,4], 2));

function checkPalindrome(str) {
    let low = 0;
    let high = str.length - 1;
    while (low < high) {
        if (str[low++] !== str[high--]) {
            return false;
        }
    }
    return true;
}

// console.log(checkPalindrome("abcba"));

function longestPalindromicSubstring(str) {
    const len = str.length;
    const dp = [...Array(len)].map(value => new Array(len).fill(0));
    let maxLength = 1;
    let start = 0;

    // substrings of length 1 are palindrome
    for (let i = 0; i < len; i++) {
        dp[i][i] = 1;
    }
    // check substrings of length 2
    for (let i = 0; i < len - 1; i++) {
        if (str[i] === str[i + 1]) {
            dp[i][i + 1] = 1;
            start = i;
            maxLength = 2;
        }
    }
    // check substrings of length > 2
    for (let k = 3; k <= len; k++) {
        for (let i = 0; i < len - (k - 1); i++) {
            // end index of substring starting from index i and length k
            const j = i + k - 1;
            if (str[i] === str[j] && dp[i + 1][j - 1]) {
                dp[i][j] = 1;
                start = i;
                maxLength = k;
            }
        }
    }
    return str.slice(start, start + maxLength);
}

// console.log(longestPalindromicSubstring("babae"));

function longestPalindromeSubseq(str) {
    const len = str.length;
    // Subsequence of length 1 are palindrome
    const dp = [...Array(len)].map(value => Array(len).fill(1));

    // check Subsequence of length 2
    for (let i = 0; i < len - 1; i++) {
        if (str[i] === str[i + 1]) {
            dp[i][i + 1] = 2;
        }
    }
    // check Subsequence of length > 2
    for (let k = 3; k <= len; k++) {
        for (let i = 0; i < len - k + 1; i++) {
            const j = i + k - 1;
            if (str[i] === str[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
            }
        }
    }
    console.log(dp);
    return dp[0][len - 1];
}

// console.log(longestPalindromeSubseq("abcdef"));

function sumOfPairs(arr, target) {
    let set = new Set();
    for (let i = 0; i < arr.length; i++) {
        const diff = target - arr[i];
        if (set.has(diff)) {
            console.log(diff, arr[i]);
        }
        set.add(arr[i]);
    }
}
// set [1, 4, 45, 6]
// sumOfPairs([1, 4, 45, 6, 10, 8, 15], 16);

const binarySearch = (left, right, ele, arr) => {
    if (left > right) {
        return false;
    }
    let middle = left + Math.floor((right - left) / 2);
    if (ele === arr[middle]) {
        return true;
    }
    if (ele < arr[middle]) {
        right = middle - 1;
    } else {
        left = middle + 1;
    }
    return binarySearch(left, right, ele, arr);
}

const findElement = (arr, ele) => {
    return binarySearch(0, arr.length, ele, arr);
}
// console.log(findElement([ 1, 10, 11, 98, 99, 111, 1000], 1));


function isAnagram(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    const n = str1.length - 1;
    const map = new Map();
    for (let i = 0; i <= n; i++) {
        const count1 = map.get(str1[i]) || 0;
        map.set(str1[i], count1 + 1);
        const count2 = map.get(str2[i]) || 0;
        map.set(str2[i], count2 - 1);
    }
    console.log(map);
    for ([key, value] of map) {
        if (value !== 0) {
            return false;
        }
    }
    return true;
}

// console.log(isAnagram("loop", "polo"));

// Chainable function
function calculate(a) {
    result = 0;
    return {
        add: function (b) {
            this.result = a + b;
            return this;
        },
        sub: function (c) {
            this.result = a - c;
            return this;
        }
    }
}

// console.log(calculate(10).add(5).sub(3).add(1));

//Find the second highest number in given array
const list1 = [52, 4, 9, 3, 24, 40, 24, 40];

const secondHighest = (arr) => {
    let max = arr[0];
    let secondMax = Number.MIN_SAFE_INTEGER;
    let a = b = 5;
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            secondMax = max;
            max = arr[i];
        } else if (arr[i] < max && secondMax < arr[i]) {
            secondMax = arr[i]
        }
    }
    return secondMax !== Number.MIN_SAFE_INTEGER ? secondMax : null;
}

// console.log(secondHighest(list1));

//3. Find the  vowels in given string and group by it count
let strInput = "astedfigahi";
const vowels = "aeiou";

const output1 = strInput.split("").reduce((result, ele) => {
    if (vowels.includes(ele)) {
        result[ele] = result[ele] ? result[ele] + 1 : 1;
    }
    return result;
}, {});
// console.log(output1);

// Flatten n-level nested array
const flatDeepArray = (arr) => {
    return arr.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            return acc.concat(flatDeepArray(cur));
        } else {
            return acc.concat(cur);
        }
    }, []);
}
// Time: O(n) and Space: O(n)
console.log(flatDeepArray([[[[[0]], [1]], [[[2], [3]]], [[4], [5]]]]));

// non recursive flatten deep using a stack
// note that depth control is hard/inefficient as we will need to tag EACH value with its own depth
// also possible w/o reversing on shift/unshift, but array OPs on the end tends to be faster
function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // pop value from stack
        const next = stack.pop();
        if (Array.isArray(next)) {
            // push back array items, won't modify the original input
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // reverse to restore input order
    return res.reverse();
}
const arr = [1, 2, [3, 4, [5, 6]]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5, 6]

function smallestSubstr(str1, str2) {
    if (str1.length < str2.length) {
        return "";
    }
    const map = new Map();
    for (let i = 0; i < str2.length; i++) {
        const count = map.get(str2[i]) || 0;
        map.set(str2[i], count + 1);
    }

    for (let i = 4; i < str1.length; i++) {
        for (let j = 0; j < str1.length - i + 1; j++) {
            const subStr = str1.slice(j, j + i);

            if (isValid(subStr, map)) {
                return subStr;
            }
        }
    }
    return "";
}

function isValid(str, map) {
    const strMap = new Map();
    for (let i = 0; i < str.length; i++) {
        let freq = strMap.get(str[i]) || 0;
        strMap.set(str[i], freq + 1);
    }
    for ([key, value] of map) {
        if (map.get(key) !== strMap.get(key)) {
            return false;
        }
    }
    return true;
}

const string1 = "this is a test string";
const string2 = "tist";

console.log(smallestSubstr(string1, string2));


// Max Product of elements in an array
function maxProduct(list) {
    let result = 1;
    let maxNegative = Number.MIN_SAFE_INTEGER;
    let negativeCount = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] < 0) {
            negativeCount++;
            if (list[i] > maxNegative) {
                maxNegative = list[i];
            }
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i] !== 0) {
            result *= list[i]
        }
    }
    if (negativeCount % 2 === 1) {
        result /= maxNegative;
    }
    return result;
}

console.log(maxProduct([1, 2, 5, 6, -5, -7, 3, -2]));


// dividend  46327682647823683863266387782364786378642
// divisor 364

// Perform divide action.
// Rem and Quo

function division(num, divisor) {
    let quotient = "";
    let carry = 0;
    if (divisor == 0) {
        return Infinity;
    }

    for (let i = 0; i < num.length; i++) {
        const temp = carry * 10 + parseInt(num[i]);

        if (temp >= divisor || quotient.length !== 0) {
            quotient += parseInt(temp / divisor);
        }
        carry = temp % divisor;
    }

    if (quotient.length == 0) {
        return 0;
    }
    console.log("quotient: ", quotient);
    console.log("remainder: ", carry);
}

console.log(division("1234", 12));
