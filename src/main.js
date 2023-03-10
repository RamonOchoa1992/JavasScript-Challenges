import {
  encryption,
  caesarCipher,
  validName,
  timeToEat,
  langtons_ant,
  intToVlq,
  distanceToNearestVowel,
  numThenChar,
  ascending,
  cFuge,
  leftSlide,
  longestNonrepeatingSubstring,
  leapYear,
  isAuthenticSkewer,
} from "./expert.js";

/*Challenge 1 */
console.log(encryption("A Fool and His Money Are Soon Parted."));

/*Challenge 2 */
console.log(caesarCipher("Always-Look-on-the-Bright-Side-of-Life", 5));

/*Challenge 3 */
console.log(validName("Herb. George Wells"));

/*Challenge 4 */
console.log(timeToEat("5:50 a.m."));

/*Challenge 5 */
console.log(
  langtons_ant(
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    2,
    2,
    10,
    1
  )
);

/*Challenge 6 */
console.log(intToVlq([229, 145, 63]));

/*Challenge 7 */
console.log(distanceToNearestVowel("shopper"));

/*Challenge 8 */
console.log(
  numThenChar([
    [1, 2, 4.4, "f", "a", "b"],
    [0],
    [0.5, "d", "X", 3, "s"],
    ["f", "e", 8],
    ["p", "Y", "Z"],
    [12, 18],
  ])
);

/*Challenge 9 */
console.log(ascending("2324256"));

/*Challenge 10 */

console.log(cFuge(21, 3));

/*Challenge 11 */

console.log(leftSlide([0, 2, 2, 8, 8, 8]));

/*Challenge 12 */

console.log(longestNonrepeatingSubstring("abcabcbb"));

/*Challenge 13 */

console.log(leapYear(1800));

/*Challenge 14 */

console.log(isAuthenticSkewer("B--A--N--A--N--A--S"));
