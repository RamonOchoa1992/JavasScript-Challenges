import {
  encryption,
  caesarCipher,
  validName,
  timeToEat,
  langtons_ant,
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
