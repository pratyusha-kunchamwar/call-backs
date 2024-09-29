import { error } from "console";
import {
  readGivenFile,
  contentToLowerCase,
  contentToUpperCase,
  sortedContent,
  deleteTheFile,
} from "../problem2.js";
import path from "path";
import { fileURLToPath } from "url";

//to det current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "lipsum.txt");

//calling the functions
readGivenFile(filePath)
  .then((data) => {
    return contentToUpperCase(data);
  })
  .then(({ uppercaseDataFile, mainFilePath }) => {
    console.log("----Data converted to Uppercase----");
    return contentToLowerCase(uppercaseDataFile, mainFilePath);
  })
  .then(({ lowercaseDataFile, mainFilePath }) => {
    console.log("---Data converted to LowerCase---");
    return sortedContent(lowercaseDataFile, mainFilePath);
  })
  .then((mainFilePath) => {
    console.log("---Data sorted---");
    return deleteTheFile(mainFilePath);
  })
  .catch((error) => console.error(error));
