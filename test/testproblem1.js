import path from "path";
import { fileURLToPath } from "url";
import { makeDirectory, createJsonFiles, deleteFiles } from "../problem1.js";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, "./randomJsonFiles");

makeDirectory(directoryPath)
  .then((directoryPath) => {
    console.log("directory Created Successfully");
    return createJsonFiles(directoryPath, 2);
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
