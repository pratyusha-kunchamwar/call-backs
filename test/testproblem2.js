import path from "path";
import { fileURLToPath } from "url";

import {
  readGivenFile,
  sortTheContent,
  contentToUpperCase,
  contentToLowerCase,
  deleteFiles,
} from "../problem2.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //get current directory path
let currentPath = __dirname;
let fileName = "lipsum.txt";

async function main() {
  try {
    let fileData = await readGivenFile(fileName, currentPath);
    console.log("File Reading done successfully")
    let { upperCaseDataFile, mainFile } = await contentToUpperCase(
      fileData,
      currentPath
    );
    console.log("Data is converted to uppercase")
    let { lowerCaseDataFile } = await contentToLowerCase(
      upperCaseDataFile,
      currentPath,
      mainFile
    );
    console.log("Data is converted to lower Case");

    await sortTheContent(lowerCaseDataFile, currentPath, mainFile);
    console.log("Data is sorted")
    await deleteFiles(mainFile, currentPath);
    console.log("All the files got deleted")
  } catch (error) {
    console.error("Error while code execution", error);
  }
}
main(fileName, currentPath);
