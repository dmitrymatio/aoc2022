const fs = require("fs");
const { parse } = require("csv-parse");

/* 
[N] [G]                     [Q]    
[H] [B]         [B] [R]     [H]    
[S] [N]     [Q] [M] [T]     [Z]    
[J] [T]     [R] [V] [H]     [R] [S]
[F] [Q]     [W] [T] [V] [J] [V] [M]
[W] [P] [V] [S] [F] [B] [Q] [J] [H]
[T] [R] [Q] [B] [D] [D] [B] [N] [N]
[D] [H] [L] [N] [N] [M] [D] [D] [B]
 1   2   3   4   5   6   7   8   9 
*/
/* testing
    [D]    
[N] [C]    
[Z] [M] "[P]"
 1   2   3 
*/
/* let crates = [["[N]",
    "[Z]",], ["[D]",
    "[C]",
    "[M]",], ["[P]"]];
 */let crates = [[
    "[N]",
    "[H]",
    "[S]",
    "[J]",
    "[F]",
    "[W]",
    "[T]",
    "[D]",
], [
    "[G]",
    "[B]",
    "[N]",
    "[T]",
    "[Q]",
    "[P]",
    "[R]",
    "[H]",
], [
    "[V]",
    "[Q]",
    "[L]",
], [
    "[Q]",
    "[R]",
    "[W]",
    "[S]",
    "[B]",
    "[N]",
], [
    "[B]",
    "[M]",
    "[V]",
    "[T]",
    "[F]",
    "[D]",
    "[N]",
], [
    "[R]",
    "[T]",
    "[H]",
    "[V]",
    "[B]",
    "[D]",
    "[M]",
], [
    "[J]",
    "[Q]",
    "[B]",
    "[D]",
], [
    "[Q]",
    "[H]",
    "[Z]",
    "[R]",
    "[V]",
    "[J]",
    "[N]",
    "[D]",
], [
    "[S]",
    "[M]",
    "[H]",
    "[N]",
    "[B]",]];


    // crates.forEach(crate => console.log(crate.length))

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        const breakdown = row[0].split(" ");
        const cratesFromTop = Number(breakdown[1]);
        const fromStack = Number(breakdown[3]) - 1;
        const toStack = Number(breakdown[5]) - 1;
        console.log(cratesFromTop, fromStack, toStack);
        const subCrates = crates[fromStack].splice(0, cratesFromTop)/* .reverse() */;
        console.log(subCrates);
        crates[toStack].unshift(...subCrates);
        console.log(crates);
        // console.log(crates[fromStack], crates[toStack]);
        // sleep(1000);
    })
    .on("end", function () {
        // console.log(crates);
        let finalString="";
        crates.forEach(crate => finalString = finalString.concat(crate[0][1]));
        console.log(finalString);
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });

