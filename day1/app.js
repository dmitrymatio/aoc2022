const fs = require("fs");
const { parse } = require("csv-parse");

let data = [[]];

fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        console.log(row, !row[0]);
        if (!row[0]) {
            data.push([]);
        } else {
            console.log(data);
            data[data.length - 1].push(row[0]);
        }
    })
    .on("end", function () {
        console.log("finished");
        const newData = data.map(arr => arr.reduce((a, b) => { return Number(a) + Number(b) }, 0));
        console.log(newData[0]);
        newData.sort((a, b) => b - a);
        console.log(newData[0],newData[1],newData[2]);
        console.log(newData[0]+newData[1]+newData[2]);
    })
    .on("error", function (error) {
        console.log(error.message);
    });