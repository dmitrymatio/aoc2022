const fs = require("fs");
const { parse } = require("csv-parse");

let count = 0;
//part2
let counter = 0;
let group = [];
fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        // console.log(row);
        // if (row[0].length % 2 !== 0) {
        //     console.log("here");
        // }
        // const item1 = row[0].substr(0, row[0].length / 2).split("");
        // const item2 = row[0].substr(row[0].length / 2).split("");
        // console.log(item1);
        // console.log(item2);
        // let letter;
        // item1.map((a) => {
        //     if (item2.includes(a)) {
        //         letter = a;
        //     }
        // })
        // console.log(letter);

        // const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        // const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        // const points = ['', ...alphabet, ...ALPHABET];

        // console.log(points);

        // count += points.indexOf(letter);
        // console.log(count);

        //part2

        console.log(row);
        if (row[0].length % 2 !== 0) {
            console.log("here");
        }

        if (counter === 2) {
            group.push(row[0]);

            console.log(group);
            const item1 = group[0].split("");
            const item2 = group[1].split("");
            const item3 = group[2].split("");

            let letter;
            item1.map((a) => {
                if (item2.includes(a) && item3.includes(a)) {
                    letter = a;
                }
            })
            console.log(letter);

            const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
            const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
            const points = ['', ...alphabet, ...ALPHABET];

            console.log(points);

            count += points.indexOf(letter);
            console.log(count);

            group = [];
            counter = 0;

        } else {
            group.push(row[0]);
            counter++;
        }


    })
    .on("end", function () {
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });