import path from "path";
import { fileURLToPath } from "url";
import { makeDirectory, createJsonFiles, deleteTheFiles } from "../problem1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, "./randomJsonFiles");

makeDirectory(dirPath, 2)
  .then(({ directoryPath, numberOfFiles }) => {
    console.log("directory Created Successfully");
    return createJsonFiles(directoryPath, numberOfFiles);
  })
  .then((directoryPath) => {
    console.log("files are Created");
    return deleteTheFiles(directoryPath);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
