const fs = require("fs");
const { parse } = require("csv-parse");
//X for Rock, Y for Paper, and Z for Scissors
//1 for Rock, 2 for Paper, and 3 for Scissors
//A for Rock, B for Paper, and C for Scissors
//0 if you lost, 3 if the round was a draw, and 6 if you won

// part 2:
//X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.


let data = 0;

fs.createReadStream("./data.csv")
    .pipe(parse({ delimiter: " " }))
    .on("data", function (row) {
        const theyPlayed = row[0] === "A" ? 1 : row[0] === "B" ? 2 : 3;
        const iPlayed = row[1] === "Y" ? theyPlayed : row[1] === "X" ? (theyPlayed === 1 ? 3 : theyPlayed - 1) : (theyPlayed === 3 ? 1 : theyPlayed + 1);
        // const iPlayed = row[1] === "X" ? 1 : row[1] === "Y" ? 2 : 3;
        const score = iPlayed === theyPlayed ? 3 : iPlayed - theyPlayed === 2 ? 0 : theyPlayed - iPlayed === 2 ? 6 : iPlayed < theyPlayed ? 0 : 6;
        console.log(row, iPlayed+score);
        data += iPlayed + score;
    })
    .on("end", function () {
        console.log("finished");
        console.log(data);
    })
    .on("error", function (error) {
        console.log(error.message);
    });