/* Challenge 1 */

export const encryption = str => {
    const removingSp = str.split(" ").join("");
    let lengthRemovedSp = removingSp.length;

    const coordinate = length => {
        const multiple = [];
        let filteringMultiple = [];
        const sqRoot = Math.sqrt(length).toString();
        if (!sqRoot.includes(".")) {
            multiple.push(+sqRoot);
        }
        else {
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
        return (multiple.length === 1 && Math.pow(multiple[0], 2) >= length)
            ? { state: true, rxc: [...multiple, +sqRoot] }
            : (filteringMultiple.length > 0 && filteringMultiple[0] * filteringMultiple[1] >= length)
                ? { state: true, rxc: filteringMultiple }
                : { state: false }
    }

    const buildingGrid = (coord, str) => {
        const grid = [];
        let j = 0;
        for (let i = 0; i < coord[0]; i++) {
            grid.push(str.slice(j, j + coord[1]).split(""));
            j += coord[1];
        }
        return grid;
    }

    const buildingFinalResponse = grid => {
        const response = [];
        for (let i = 0; i < grid[0].length; i++) {
            for (let j = 0; j < grid.length; j++) {
                response.push(grid[j][i] || "");
            }
            response.push(" ")
        }
        return response.join("");
    }

    let objMultiply;
    let anotherState = true;
    while (anotherState) {
        objMultiply = coordinate(lengthRemovedSp);
        if (objMultiply.state) {
            anotherState = false;
        }
        lengthRemovedSp++;
    }

    const rxc = objMultiply.rxc
    const grid = buildingGrid(rxc, removingSp)
    const finalResponse = buildingFinalResponse(grid);

    return finalResponse;
}

/* Challenge 2 */

export const caesarCipher = (str, num) => {

    const alphabet = [];

    /*Building Alphabet */
    for (let i = 97; i <= 122; i++) {
        alphabet.push(String.fromCharCode(i))
    }

    const getNewLetter = letter => {
        let ind;

        const areYouUpperCase = letter => (letter === letter.toUpperCase())

        alphabet.forEach((el, index) => {
            if (el === letter.toLowerCase()) {
                ind = index;
            }
        })
        const position = (ind + num <= 25) ? (ind + num) : (ind + num) % 26;
        return areYouUpperCase(letter) ? alphabet[position].toUpperCase() : alphabet[position];
    }

    const encryptedStr = str.split("").map(el => {
        return (/[A-Za-z]/.test(el)) ? getNewLetter(el) : el;
    })

    return encryptedStr.join("");
}


/* Challenge 3 */

export const validName = str => {
    const terms = str.split(" ");
    const termsLength = terms.length;
    const regExpInitial = /^[A-Z]{1}\.$/

    const isCapitalized = term => term[0] === term[0].toUpperCase();

    const isValidInitial = term => regExpInitial.test(term);

    const isValidWord = term => (term.length >= 2 && !term.includes(".") && isCapitalized(term))


    if (termsLength > 3) return { state: false, response: "A name must be either 2 or 3 terms long." }

    if (termsLength === 1) return { state: false, response: "Single names not allowed. Must be 2 or 3 words" }

    if (termsLength === 3) {
        if (isValidInitial(terms[0]) && isValidWord(terms[1])) return { state: false, response: "You cannot keep the first name as an initial and expand the middle name only" }
    }

    if (!isValidWord(terms[termsLength - 1])) return { state: false, response: "The last name must be a word" };

    let count = 0;
    terms.forEach(el => {
        if (isValidInitial(el) || isValidWord(el)) count++;
    })

    return count === termsLength ? { state: true, response: "Correct" } : { state: false, response: "Incorrect" };
}