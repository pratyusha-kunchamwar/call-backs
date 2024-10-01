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
    let filePath = path.join(__dirname, upperCaseDataFile);

    fs.writeFile(filePath, upperCaseData, (error) => {
      if (error) {
        reject(error);
      } else {
        fs.appendFile(mainFilePath, upperCaseDataFile + "\n", (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({ upperCaseDataFile, mainFilePath });
          }
        });
      }
    });
  });
}

//converting data to lowerCase
function contentToLowerCase(upperCaseDataFile, mainFilePath) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, upperCaseDataFile);

    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        let lowerCaseData = data.toLowerCase();
        let sentences = lowerCaseData.split(".").filter(Boolean).join(".");
        let lowerCaseDataFile = "lowerCaseData.txt";
        let filePath = path.join(__dirname, lowerCaseDataFile);

        fs.writeFile(filePath, sentences, (error) => {
          if (error) {
            reject(error);
          } else {
            fs.appendFile(mainFilePath, lowerCaseDataFile + "\n", (error) => {
              if (error) {
                reject(error);
              } else {
                resolve({ lowerCaseDataFile, mainFilePath });
              }
            });
          }
        });
      }
    });
  });
}

//sorting the data
function sortTheContent(lowerCaseDataFile, mainFilePath) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, lowerCaseDataFile);

    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        let sortedData = data.split(".").sort().filter(Boolean).join(".");
        let sortedDataFile = "sortedData.txt";
        let filePath = path.join(__dirname, sortedDataFile);

        fs.writeFile(filePath, sortedData, (error) => {
          if (error) {
            reject(error);
          } else {
            fs.appendFile(mainFilePath, sortedDataFile + "\n", (error) => {
              if (error) {
                reject(error);
              } else {
                resolve(mainFilePath);
              }
            });
          }
        });
      }
    });
  });
}
//for deleting the files
function deleteFiles(mainFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(mainFilePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
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
        return Promise.all(deletionFiles)
          .then(() => resolve("All files are deleted"))
          .catch(() => reject("Error in deleting the files"));
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
