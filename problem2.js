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
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function readGivenFile(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      console.log("File reading Done Successfully");
      contentToUpperCase(data);
    })
    .catch((error) =>
      console.error("Error while creating the directory", error)
    );
}

//uppercase content
function contentToUpperCase(data) {
  let uppercaseData = data.toUpperCase();
  let newFile = "file1.txt";
  let mainFile = "fileNames.txt";
  let mainFilePath = path.join(__dirname, mainFile);
  createNewFiles(newFile, uppercaseData)
    .then(() => appendTheFile(mainFilePath, newFile + "\n"))
    .then(() => contentToLowerCase(newFile, mainFilePath))
    .catch((error) => console.error("Error in content to uppercase", error));
}

//content to lower case
function contentToLowerCase(fileName, mainFilePath) {
  let filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, "utf-8")
    .then((data) => {
      let lowercaseData = data
        .toLowerCase()
        .split(".")
        .filter(Boolean)
        .join(".\n");
      let newFile = "file2.txt";

      createNewFiles(newFile, lowercaseData)
        .then(() => appendTheFile(mainFilePath, newFile + "\n"))
        .then(() => sortedContent(newFile, mainFilePath))
        .catch((error) =>
          console.error("Error in content to lowercase", error)
        );
    })
    .catch((error) => console.error("Error while reading the file", error));
}

//sorted content
function sortedContent(fileName, mainFilePath) {
  let filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, "utf-8")
    .then((data) => {
      let sortedData = data.split(" ").sort().filter(Boolean).join(" ");
      let newFile = "file3.txt";

      createNewFiles(newFile, sortedData)
        .then(() => appendTheFile(mainFilePath, newFile + "\n"))
        .then(() => deleteTheFile(mainFilePath))
        .catch((error) => console.error("Error in sorted Content", error));
    })
    .catch((error) => console.error("Error while Reading the file", error));
}

//delete the files
function deleteTheFile(mainFilePath) {
  fs.readFile(mainFilePath, "utf-8")
    .then((data) => {
      let fileName = data.split("\n").filter(Boolean);
      let deletedFiles = fileName.map((file) => {
        let filepath = path.join(__dirname, file);
        return fs
          .unlink(filepath)
          .then(() => console.log(`deleted${file}`))
          .catch((error) => console.error("Error deleting ${file}", error));
      });

      //to resolve all the promises at a time
      Promise.all(deletedFiles)
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
    .then(() => console.log("Data appended to the file"))
    .catch((error) => console.log("Error while appending the code", error));
}
