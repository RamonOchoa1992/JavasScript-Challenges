/* Challenge 1 */

export const encryption = (str) => {
  const removingSp = str.split(" ").join("");
  let lengthRemovedSp = removingSp.length;

  const coordinate = (length) => {
    const multiple = [];
    let filteringMultiple = [];
    const sqRoot = Math.sqrt(length).toString();
    if (!sqRoot.includes(".")) {
      multiple.push(+sqRoot);
    } else {
      for (let i = 1; i <= length; i++) {
        if (length % i === 0) multiple.push(i);
      }
      for (let i = 0; i < multiple.length - 1; i++) {
        if (multiple[i + 1] - multiple[i] === 1) {
          filteringMultiple[0] = multiple[i];
          filteringMultiple[1] = multiple[i + 1];
        }
      }
    }
    return multiple.length === 1 && Math.pow(multiple[0], 2) >= length
      ? { state: true, rxc: [...multiple, +sqRoot] }
      : filteringMultiple.length > 0 &&
        filteringMultiple[0] * filteringMultiple[1] >= length
      ? { state: true, rxc: filteringMultiple }
      : { state: false };
  };

  const buildingGrid = (coord, str) => {
    const grid = [];
    let j = 0;
    for (let i = 0; i < coord[0]; i++) {
      grid.push(str.slice(j, j + coord[1]).split(""));
      j += coord[1];
    }
    return grid;
  };

  const buildingFinalResponse = (grid) => {
    const response = [];
    for (let i = 0; i < grid[0].length; i++) {
      for (let j = 0; j < grid.length; j++) {
        response.push(grid[j][i] || "");
      }
      response.push(" ");
    }
    return response.join("");
  };

  let objMultiply;
  let anotherState = true;
  while (anotherState) {
    objMultiply = coordinate(lengthRemovedSp);
    if (objMultiply.state) {
      anotherState = false;
    }
    lengthRemovedSp++;
  }

  const rxc = objMultiply.rxc;
  const grid = buildingGrid(rxc, removingSp);
  const finalResponse = buildingFinalResponse(grid);

  return finalResponse;
};

/* Challenge 2 */

export const caesarCipher = (str, num) => {
  const alphabet = [];

  /*Building Alphabet */
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  const getNewLetter = (letter) => {
    let ind;

    const areYouUpperCase = (letter) => letter === letter.toUpperCase();

    alphabet.forEach((el, index) => {
      if (el === letter.toLowerCase()) {
        ind = index;
      }
    });
    const position = ind + num <= 25 ? ind + num : (ind + num) % 26;
    return areYouUpperCase(letter)
      ? alphabet[position].toUpperCase()
      : alphabet[position];
  };

  const encryptedStr = str.split("").map((el) => {
    return /[A-Za-z]/.test(el) ? getNewLetter(el) : el;
  });

  return encryptedStr.join("");
};

/* Challenge 3 */

export const validName = (str) => {
  const terms = str.split(" ");
  const termsLength = terms.length;
  const regExpInitial = /^[A-Z]{1}\.$/;

  const isCapitalized = (term) => term[0] === term[0].toUpperCase();

  const isValidInitial = (term) => regExpInitial.test(term);

  const isValidWord = (term) =>
    term.length >= 2 && !term.includes(".") && isCapitalized(term);

  if (termsLength > 3)
    return {
      state: false,
      response: "A name must be either 2 or 3 terms long.",
    };

  if (termsLength === 1)
    return {
      state: false,
      response: "Single names not allowed. Must be 2 or 3 words",
    };

  if (termsLength === 3) {
    if (isValidInitial(terms[0]) && isValidWord(terms[1]))
      return {
        state: false,
        response:
          "You cannot keep the first name as an initial and expand the middle name only",
      };
  }

  if (!isValidWord(terms[termsLength - 1]))
    return { state: false, response: "The last name must be a word" };

  let count = 0;
  terms.forEach((el) => {
    if (isValidInitial(el) || isValidWord(el)) count++;
  });

  return count === termsLength
    ? { state: true, response: "Correct" }
    : { state: false, response: "Incorrect" };
};

/* Challenge 4 */

export const timeToEat = (str) => {
  const convertingToHour = (hourStr) => {
    const isPm = () => hourStr.includes("p.m.");
    const hour =
      isPm() && +hourStr.slice(0, hourStr.indexOf(":")) !== 12
        ? +hourStr.slice(0, hourStr.indexOf(":")) + 12
        : isPm() && +hourStr.slice(0, hourStr.indexOf(":")) === 12
        ? 12
        : !isPm() && +hourStr.slice(0, hourStr.indexOf(":")) !== 12
        ? +hourStr.slice(0, hourStr.indexOf(":"))
        : 0;
    const minute = +hourStr.slice(
      hourStr.indexOf(":") + 1,
      hourStr.indexOf(":") + 3
    );
    return { hour, minute, isPm };
  };

  const convertingToDate = ({ hour, minute }) => {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const time = new Date(year, month, date, hour, minute, 0).getTime();

    return time;
  };

  const mealHours = ["7:00 a.m.", "12:00 p.m.", "7:00 p.m."];

  const mealTimes = mealHours.map((el) =>
    convertingToDate(convertingToHour(el))
  );

  const sortedMealTimes = [...mealTimes].sort((a, b) => b - a);

  const strTime = convertingToDate(convertingToHour(str));

  const getTimes = () => {
    let element;
    let count = 0;
    sortedMealTimes.forEach((el) => {
      if (strTime <= el) {
        element = el;
        count++;
      }
    });
    return count > 0
      ? [strTime, element]
      : [
          strTime,
          convertingToDate(convertingToHour("7:00 a.m.")) + 24 * 60 * 60 * 1000,
        ];
  };

  const difference = getTimes()[1] - getTimes()[0];

  const hora = Math.floor(difference / 1000 / 60 / 60);
  const minute = (difference / 1000 / 60) % 60;

  return [hora, minute];
};

/* Challenge 5 */

export const langtons_ant = (grid, column, row, n, direction) => {
  const antState = {
    gridSt: grid,
    columnSt: column,
    rowSt: row,
    nSt: n,
    directionSt: direction,
  };

  let { gridSt, columnSt, rowSt, nSt, directionSt } = antState;

  const moveToEast = () => {
    directionSt = 1;
    if (rowSt === gridSt[columnSt].length - 1) {
      for (let i = 0; i < gridSt.length; i++) {
        gridSt[i].push(0);
      }
    }
    rowSt += 1;
  };
  const moveToSouth = () => {
    directionSt = 2;
    if (columnSt === gridSt.length - 1) {
      gridSt.push(Array(gridSt[columnSt].length).fill(0));
    }
    columnSt += 1;
  };
  const moveToWest = () => {
    directionSt = 3;
    if (rowSt === 0) {
      for (let i = 0; i < gridSt.length; i++) {
        gridSt[i].unshift(0);
      }
    } else {
      rowSt -= 1;
    }
  };
  const moveToNorth = () => {
    directionSt = 0;
    if (columnSt === 0) {
      gridSt.unshift(Array(gridSt[columnSt].length).fill(0));
    } else {
      columnSt -= 1;
    }
  };

  const moveToLeft = () => {
    if (directionSt === 0) {
      moveToWest();
    } else if (directionSt === 1) {
      moveToNorth();
    } else if (directionSt === 2) {
      moveToEast();
    } else {
      moveToSouth();
    }
  };

  const moveToRight = () => {
    if (directionSt === 0) {
      moveToEast();
    } else if (directionSt === 1) {
      moveToSouth();
    } else if (directionSt === 2) {
      moveToWest();
    } else {
      moveToNorth();
    }
  };

  while (nSt > 0) {
    if (gridSt[columnSt][rowSt] === 1) {
      gridSt[columnSt][rowSt] = 0;
      moveToRight();
    } else {
      gridSt[columnSt][rowSt] = 1;
      moveToLeft();
    }
    nSt -= 1;
  }

  return antState.gridSt;
};

/* Challenge 6 */
export const intToVlq = (value) => {
  const breakUpSevenGroups = (bytes) => {
    const binaryArray = [];
    let reversedBytes = bytes.split("").reverse();
    let count = 0;
    const iter = Math.ceil(bytes.length / 7);
    let status = false;

    for (let i = 0; i < iter; i++) {
      const rest = 7 - reversedBytes.length;
      if (rest > 0) {
        for (let j = 0; j < rest; j++) {
          reversedBytes.push("0");
          if (!reversedBytes.includes("1")) status = true;
        }
      }
      let str = reversedBytes.slice(0, 7);
      str = str.reverse();
      str.unshift(count + "");
      str = str.join("");
      reversedBytes.splice(0, 7);
      if (!status) binaryArray.push(str);
      count = 1;
    }
    const decimalArray = [...binaryArray]
      .reverse()
      .map((el) => parseInt(el, 2));
    return decimalArray;
  };

  if (typeof value === "number") {
    let binaryNum = value.toString(2);
    const mod = 8 - (binaryNum.length % 8);

    if (mod !== 8) {
      const binaryArr = binaryNum.split("");
      for (let i = 0; i < mod; i++) {
        binaryArr.unshift("0");
      }
      binaryNum = binaryArr.join("");
    }

    return value <= 127
      ? parseInt(binaryNum, 2)
      : breakUpSevenGroups(binaryNum);
  } else if (value instanceof Array) {
    const reverseArray = value.reverse();
    let num = 0;
    reverseArray.forEach((el, index) => {
      if (index === 0) {
        num += el;
      } else {
        const sum = (el - 128) * Math.pow(128, index);
        num += sum;
      }
    });
    return num;
  } else {
    return "You must enter a number or an array";
  }
};

/* Challenge 7 */

export const distanceToNearestVowel = (str) => {
  let countUpper = 0;
  let countVowels = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  const splittedStr = str.split("");

  const isVowel = (letter) => vowels.includes(letter);

  splittedStr.forEach((el) => {
    if (el === el.toUpperCase()) countUpper++;
    if (isVowel(el)) countVowels++;
  });

  if (countUpper > 0) return "Strings will be lowercased.";
  if (countVowels === 0)
    return "All input strings will contain at least one vowel.";

  const distance = (ind, array) => {
    let finalDist;
    const vowelPosition = [];
    const differencePos = [];
    if (isVowel(array[ind])) finalDist = 0;
    else {
      array.forEach((el, index) => {
        if (isVowel(el)) vowelPosition.push(index);
      });
      vowelPosition.forEach((el) => {
        differencePos.push(Math.abs(el - ind));
      });
      finalDist = [...differencePos].sort((a, b) => a - b)[0];
    }

    return finalDist;
  };

  const distanceArr = splittedStr.map((_, index) =>
    distance(index, splittedStr)
  );

  return distanceArr;
};

/* Challenge 8 */

export const numThenChar = (grid) => {
  const lengthArray = [];
  let fullStr = [];
  let finalStr = [];
  let initialPos = 0;

  const isLetter = (el) => /[A-Za-z]/.test(el);
  const isNumber = (el) => /[0-9]/.test(el);

  grid.forEach((el) => {
    fullStr = [...fullStr, ...el];
    lengthArray.push(el.length);
  });

  const strLetter = fullStr.filter((el) => isLetter(el)).sort();
  const strNum = fullStr.filter((el) => isNumber(el)).sort((a, b) => a - b);

  const sortedFullStr = [...strNum, ...strLetter];

  if (sortedFullStr.length !== fullStr.length)
    return "All the character must be numbers o letters";

  lengthArray.forEach((el) => {
    let finalPos = initialPos + el;
    finalStr = [...finalStr, [...sortedFullStr.slice(initialPos, finalPos)]];
    initialPos = finalPos;
  });

  return finalStr;
};

/* Challenge 9 */

export const ascending = (str) => {
  if (!/[0-9]/.test(str) || str.length < 2)
    return "The string must contain 2 or more numbers";

  const isConsecutive = (arr) => {
    let count = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      if (+arr[i] === +arr[i + 1] - 1) {
        count++;
      }
    }
    return count === arr.length - 1;
  };

  const multiple = (num) => {
    const mul = [];
    for (let i = 1; i < num; i++) {
      if (num % i === 0) {
        mul.push(i);
      }
    }
    return mul;
  };

  const multipleArray = (string) => {
    const mul = multiple(string.length);
    const finalArray = [];
    mul.forEach((el) => {
      let divide = [];
      for (let i = 0; i < string.length; i += el) {
        divide = [...divide, string.slice(i, i + el)];
      }
      const state = isConsecutive(divide);
      const finalObject = {
        divide,
        state,
      };
      finalArray.push(finalObject);
    });

    let countTrue = 0;
    finalArray.forEach((el) => {
      for (const key in el) {
        if (key === "state" && el[key] === true) {
          countTrue++;
        }
      }
    });
    return [countTrue > 0, finalArray];
  };

  return multipleArray(str);
};

/* Challenge 10 */

export const cFuge = (hole, tube) => {
  if (hole === 1)
    return {
      state: false,
      hole: hole,
      tube: tube,
      response: "One hole is never in balance, even empty.",
    };
  if (tube === 1)
    return {
      state: false,
      hole: hole,
      tube: tube,
      response: "One test tube is never in balance.",
    };

  const multiple = (num) => {
    const mult = [];
    for (let i = 2; i <= num; i++) {
      if (num % i === 0) mult.push(i);
    }
    return mult;
  };

  const haveCommonFactor = (h, t) => {
    const multH = multiple(h);
    const multT = multiple(t);

    let count = 0;
    multT.forEach((el) => {
      if (multH.includes(el)) {
        count++;
      }
    });
    return count > 0;
  };

  const multArray = [];
  for (let i = hole; i > 1; i--) {
    const state = haveCommonFactor(hole, i);
    if (state) multArray.push(i);
  }

  const response = haveCommonFactor(hole, tube)
    ? `The tube ${tube} is included in: '${[...multArray]
        .sort((a, b) => a - b)
        .join(", ")}'`
    : `The tube ${tube} is not included in: '${[...multArray]
        .sort((a, b) => a - b)
        .join(", ")}'`;

  return {
    state: haveCommonFactor(hole, tube),
    hole: hole,
    tube: tube,
    response: response,
  };
};

/* Challenge 11 */

let state = [];
export const leftSlide = (arr) => {
  const isPowerOfTwo = (num) => {
    while (!num.toString().includes(".")) {
      const div = num / 2;
      state.push(div === 1);
      return isPowerOfTwo(div);
    }
  };

  let count = 0;
  arr.forEach((el) => {
    if (el !== 0) {
      isPowerOfTwo(el);
      if (!state.includes(true)) {
        count++;
      }
      state = [];
    }
  });

  if (count > 0) return "You must only enter '0' and powers of '2'.";

  const arrayWithoutZero = [...arr].filter((el) => el !== 0);

  const slidingArr = [];

  for (let i = 0; i < arrayWithoutZero.length; i++) {
    if (i === arrayWithoutZero - 1) slidingArr.push(arrayWithoutZero[i]);
    else if (arrayWithoutZero[i] === arrayWithoutZero[i + 1]) {
      slidingArr.push(arrayWithoutZero[i] * 2);
      i++;
    } else {
      slidingArr.push(arrayWithoutZero[i]);
    }
  }

  const length = arr.length - slidingArr.length;

  for (let i = 0; i < length; i++) {
    slidingArr.push(0);
  }

  return slidingArr;
};

/* Challenge 12 */

export const longestNonrepeatingSubstring = (str) =>
  str
    .split("")
    .filter((el, index, string) => !string.slice(0, index).includes(el))
    .join("");

/* Challenge 13 */

/*How to determine whether a year is a leap year

To determine whether a year is a leap year, follow these steps:

   1- If the year is evenly divisible by 4, go to step 2. Otherwise, go to step 5.
   2- If the year is evenly divisible by 100, go to step 3. Otherwise, go to step 4.
   3- If the year is evenly divisible by 400, go to step 4. Otherwise, go to step 5.
   4- The year is a leap year (it has 366 days).
   5- The year is not a leap year (it has 365 days).
   
   Notes

You can't use the Date class, switch statements, if statements in general, the ternary operator, or the logical operators (&&, ||).
   */

export const leapYear = (year) => {
  const yearDivide400 = (year / 400).toFixed(2);
  const lastTwoChar = yearDivide400.slice(-2);
  const specialChar = ["25", "50", "75"];
  const yearDivide4 = year % 4 === 0;

  const yearArr = [yearDivide4, !specialChar.includes(lastTwoChar)];
  const trueArr = yearArr.filter((el) => el === true);

  return trueArr.length === 2;
};
