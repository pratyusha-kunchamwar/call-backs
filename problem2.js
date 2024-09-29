/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

//content data to UpperCase
function contentToUpperCase(data) {
  return new Promise((resolve, reject) => {
    let upperCaseData = data.toUpperCase();
    let upperCaseDataFile = "upperCaseData.txt";
    let mainFile = "FileNames.txt";
    let mainFilePath = path.join(__dirname, mainFile);

    createNewFile(upperCaseDataFile, upperCaseData)
      .then(() => appendToFile(mainFilePath, upperCaseDataFile + "\n"))
      .then(() => resolve({ upperCaseDataFile, mainFilePath }))
      .catch((err) => reject("Error in content to upperCase"));
  });
}

//converting data to lowerCase
function contentToLowerCase(upperCaseDataFile, mainFilePath) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, upperCaseDataFile);

    readFile(filePath)
      .then((data) => {
        let lowerCaseData = data.toLowerCase();
        let sentences = lowerCaseData.split(".").filter(Boolean).join(".");
        let lowerCaseDataFile = "lowerCaseData.txt";

        createNewFile(lowerCaseDataFile, sentences) //create files
          .then(() => appendToFile(mainFilePath, lowerCaseDataFile + "\n"))
          .then(() => resolve({ lowerCaseDataFile, mainFilePath }))
          .catch(() => reject("Error from create file in lowerCase"));
      })
      .catch(() => {
        reject("Error From readfile in LowerCase");
      });
  });
}

//sorting the data
function sortTheContent(lowerCaseDataFile, mainFilePath) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, lowerCaseDataFile);

    readFile(filePath)
      .then((data) => {
        let sortedData = data.split(".").sort().filter(Boolean).join(".");
        let sortedDataFile = "sortedData.txt";
        createNewFile(sortedDataFile, sortedData)
          .then(() => appendToFile(mainFilePath, sortedDataFile + "\n"))
          .then(() => resolve(mainFilePath))
          .catch(() => reject("Error in create file in sortContent"));
      })
      .catch(() => reject("Error in read file sortContent"));
  });
}

//for deleting the files
function deleteFiles(mainFilePath) {
  return new Promise((resolve, reject) => {
    readFile(mainFilePath)
      .then((data) => {
        const fileNames = data.split("\n").filter(Boolean);

        const deletionFiles = fileNames.map((file) => {
          const filePath = path.join(__dirname, file);
          let task = new Promise((deleteResolve, deleteReject) => {
            fs.unlink(filePath, (error) => {
              if (error) {
                deleteReject(error);
              } else {
                deleteResolve();
              }
            });
          });
          return task;
        });
        Promise.all(deletionFiles)
          .then(() => resolve("All files deleted successfully"))
          .catch(reject);
      })
      .catch(() => reject("error in reading the files in delete function "));
  });
}

//creating the files
function createNewFile(file, content) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, file);
    fs.writeFile(filePath, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve("Successfully File Created");
      }
    });
  });
}

//append the fileNames
function appendToFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
//exporting the functions
export {
  readFile,
  contentToUpperCase,
  contentToLowerCase,
  sortTheContent,
  deleteFiles,
};
