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