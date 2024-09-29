/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

import fs from "fs/promises";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readGivenFile(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      console.log("File reading Done Successfully");
      return data;
    })
    .catch((error) =>
      console.error("Error while creating the directory", error)
    );
}

//uppercase content
function contentToUpperCase(data) {
  let uppercaseData = data.toUpperCase();
  let uppercaseDataFile = "upperCaseData.txt";
  let mainFile = "fileNames.txt";
  let mainFilePath = path.join(__dirname, mainFile);

  return createNewFiles(uppercaseDataFile, uppercaseData)
    .then(() => {
      return appendTheFile(mainFilePath, uppercaseDataFile + "\n");
    })
    .then(() => {
      return { uppercaseDataFile, mainFilePath };
    })
    .catch((error) => console.error("Error in content to uppercase", error));
}

//content to lower case
function contentToLowerCase(uppercaseDataFile, mainFilePath) {
  let filePath = path.join(__dirname, uppercaseDataFile);

  return readGivenFile(filePath)
    .then((data) => {
      let lowercaseData = data
        .toLowerCase()
        .split(".")
        .map((data) => data.trim())
        .filter(Boolean)
        .join(".");

      let lowercaseDataFile = "lowerCaseData.txt";

      return createNewFiles(lowercaseDataFile, lowercaseData)
        .then(() => {
          return appendTheFile(mainFilePath, lowercaseDataFile + "\n");
        })
        .then(() => {
          return { lowercaseDataFile, mainFilePath };
        });
    })
    .catch((error) => console.error("Error while reading the file", error));
}

//sorted content
function sortedContent(lowercaseDataFile, mainFilePath) {
  let filePath = path.join(__dirname, lowercaseDataFile);
  return readGivenFile(filePath)
    .then((data) => {
      let sortedData = data.split(".").sort().filter(Boolean).join(".");
      let sortedDataFile = "sortedData.txt";

      return createNewFiles(sortedDataFile, sortedData)
        .then(() => {
          return appendTheFile(mainFilePath, sortedDataFile + "\n");
        })
        .then(() => {
          return mainFilePath;
        })
        .catch((error) => console.error("Error in sorted Content", error));
    })
    .catch((error) => console.error("Error while Reading the file", error));
}

//delete the files
function deleteTheFile(mainFilePath) {
  return readGivenFile(mainFilePath)
    .then((data) => {
      let fileName = data.split("\n").filter(Boolean);
      let deletedFiles = fileName.map((file) => {
        let filepath = path.join(__dirname, file);
        return fs
          .unlink(filepath)
          .then(() => console.log(`deleted  ${file}`))
          .catch((error) => console.error("Error deleting ${file}", error));
      });

      // to resolve all the promises at a time
      return Promise.all(deletedFiles)
        .then(() => console.log("All the files deleted"))
        .catch((error) =>
          console.error("Error while deleting all the files", error)
        );
    })
    .catch((error) => console.error("Error in reading the file", error));
}

//to create new files
function createNewFiles(filename, content) {
  let filePath = path.join(__dirname, filename);
  return fs
    .writeFile(filePath, content)
    .then(() => console.log("Successfully created", filename))
    .catch((error) => console.error("Error while creating the files", error));
}

//to append the data to file
function appendTheFile(mainFilePath, content) {
  return fs
    .appendFile(mainFilePath, content)
    .then(() => console.log("FileName store in fileNames.txt"))
    .catch((error) => console.log("Error while appending the code", error));
}

export {
  readGivenFile,
  contentToLowerCase,
  contentToUpperCase,
  deleteTheFile,
  sortedContent,
};
