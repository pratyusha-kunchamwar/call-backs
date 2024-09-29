import path from "path";
import { fileURLToPath } from "url";

import { makeDirectory, createJsonFiles, deleteFiles } from "../problem1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, "./random-json-files");
let numberOfFiles = 2;

//calling  functions
makeDirectory(dirPath)
  .then((dirPath) => {
    console.log("----Directory created----");
    return createJsonFiles(dirPath, numberOfFiles);
  })
  .then((directoryPath) => {
    console.log("-----All json files created----");
    return deleteFiles(directoryPath);
  })
  .catch((error) => {
    console.error("Error occur", error);
  });
