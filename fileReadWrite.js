// Read a large file parse through each line to extract necessary data and write to another file.

const fs = require("fs");
const readline = require("readline");
const stream = require("stream");
const { EOL } = require("os");

const instream = fs.createReadStream("./app-info.log");
const outstream = new stream();
const rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});
const writeStream = fs.createWriteStream("./processed-info.log");

// Total lines in file
let lineCount = 0;
let lineProcessed = 0;

rl.on("line", function(line) {
    lineCount++;
    let result = line.match(/.*\/.+\.(png|jpg|jpeg)/);
    if (result) {
        lineProcessed++;
        const imgData = result[0];
        console.log("image content---", imgData);
        // rl.write(imgData) // write to stdout
        writeStream.write(`${imgData}${EOL}`, (err) => {
            if (err) {
                console.log("error while writing to file: ", err.message);
            }
        })
    }
});

rl.on("close", () => {
    console.log("total lines: ", lineCount);
    console.log("processed lines: ", lineProcessed);
})

rl.on("end", () => {
    console.log("end file");
})

// Solution using pipe