import path from "path";
import { fileURLToPath } from "url";
import { makeDirectory, createJsonFiles, deleteFiles } from "../problem1.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, "./randomJsonFiles");

makeDirectory(dirPath)
  .then((directoryPath) => {
    console.log("directory Created Successfully");
    return createJsonFiles(directoryPath,2);
  })
  .then((directoryPath) => {
    console.log("files are Created");
    return deleteFiles(directoryPath);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
