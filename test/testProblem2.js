const { readFile } = require("../problem2.js");

let currentPath = __dirname;
let fileName = "lipsum.txt";
readFile(fileName, currentPath);
