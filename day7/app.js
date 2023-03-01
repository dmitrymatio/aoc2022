const fs = require("fs");
const { parse } = require("csv-parse");
const dataLoad = [];
let dirMap = {};
let totalUnderK = 0;

fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", function (row) {
        // console.log(...row);
        dataLoad.push(row[0].split(" "));
    })
    .on("end", function () {
        console.log("finished");
        // console.log(dataLoad);
        let pathArr = [];
        function updatePath(original, path, value) {
            const usePath = [...path];
            const last = usePath.pop();
            usePath.reduce((acc, key) => acc[key] || {}, original)[last] = value;
            return original
        }
        function getKeyValue(original, path, key) {
            const usePath = [...path];
            const last = usePath.pop();
            const keyValue = path.reduce((acc, key) => acc[key] || {}, original)[last][key];
            return keyValue;
        }
        for (let i = 0; i < dataLoad.length; i++) {
            const arr = dataLoad[i];
            if (arr[0] === '$') {
                if (arr[1] === 'cd') {
                    if (arr[2] === '..') {
                        const tempSize = 
                        pathArr.pop();
                    } else {
                        pathArr.push(arr[2]);
                        updatePath(dirMap, pathArr, {});
                    }
                    // console.log(pathArr);
                }
            } else if (arr[0] === 'dir') {
                // const pathArrTemp = [...pathArr];
                // pathArrTemp.push(arr[1]);
                // const getSize = getPathSize(dirMap, pathArrTemp);
                // if (getSize) {
                //     updatePath
                // }
            } else {
                try {
                    const existingSize = getKeyValue(dirMap, pathArr, 'totalFileSize');
                    // updatePath(dirMap, pathArr, { 'totalFileSize': existingSize + Number(arr[0]) });

                } catch (error) {
                    updatePath(dirMap, pathArr, { 'totalFileSize': Number(arr[0]) });
                }
            }

        }
        console.log(dirMap);

    })
    .on("error", function (error) {
        console.log(error.message);
    });


