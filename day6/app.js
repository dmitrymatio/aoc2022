const fs = require("fs");
const { parse } = require("csv-parse");

let position = 0;
let data = [];
let marker = "";

fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        console.log(row);
        const bitArr = row[0].split("");
        console.log(bitArr);
        bitArr.forEach(bit => {
            if (data.length === 14) {
                let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
                const duplicates = findDuplicates(data);
                const uniqDuplicates = [...new Set(duplicates)];
                if (uniqDuplicates.length === 0) {
                    marker = data.join('');
                    console.log(marker, row[0].indexOf(marker)+14);
                    // throw new Error();
                } else {
                    // console.log(data);
                    data.shift();
                }
            }
            data.push(bit);
        });
        // console.log(data);
    })
    .on("end", function () {
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });