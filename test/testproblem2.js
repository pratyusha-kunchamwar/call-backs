import path from "path";
import { fileURLToPath } from "url";
import {
  readFile,
  contentToUpperCase,
  contentToLowerCase,
  sortTheContent,
  deleteFiles,

} from "../problem2.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "lipsum.txt");

//calling the promises
readFile(filePath)
  .then((data) => {
    console.log("SuccessFully File Reading");
    return contentToUpperCase(data);
  })
  .then(({ newFile, mainFilePath }) => {
    console.log("Data converted to UpperCase");
    return contentToLowerCase(newFile, mainFilePath);
  })
  .then(({ newFile, mainFilePath }) => {
    console.log("Data converted to lowerCase");
    return sortTheContent(newFile, mainFilePath);
  })
  .then((mainFilePath) => {
    console.log("Sorted the data");
    return deleteFiles(mainFilePath);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
