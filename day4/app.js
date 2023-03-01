const fs = require("fs");
const { parse } = require("csv-parse");

let counter = 0;

fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        // console.log(row);
        const splitData = row.map(item => item.split('-').map(num => Number(num)));
        if (splitData[0][0] <= splitData[1][0] && splitData[1][0] <= splitData[0][1]) {
            counter++;
            console.log(row.map(item => item.split('-')));

            // console.log(splitData[0][0], splitData[1][0], splitData[0][1]);
        } else if (splitData[0][0] <= splitData[1][1] && splitData[1][1] <= splitData[0][1]) {
            counter++;
            console.log(row.map(item => item.split('-')));

            // console.log(splitData[0][0], splitData[1][1], splitData[0][1]);
        } else if (splitData[1][0] <= splitData[0][1] && splitData[0][1] <= splitData[1][1]) {
            counter++;
            console.log(row.map(item => item.split('-')));

            console.log(splitData[1][0], splitData[0][1], splitData[1][1]);
        } else if (splitData[1][0] <= splitData[0][0] && splitData[0][0] <= splitData[1][1]) {
            counter++;
            console.log(row.map(item => item.split('-')));

            console.log(splitData[1][0], splitData[0][0], splitData[1][1]);
        }
    })
    .on("end", function () {
        console.log("finished");
        console.log(counter);
    })
    .on("error", function (error) {
        console.log(error.message);
    });