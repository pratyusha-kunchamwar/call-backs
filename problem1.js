/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

import fs from "fs";
import path from "path";
function makeDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(directoryPath);
      }
    });
  });
}

//to create json files
function createJsonFiles(directoryPath, numberOfFiles) {
  return new Promise((resolve, reject) => {
    let createdFiles = [];
    for (let count = 0; count < numberOfFiles; count++) {
      let filePath = path.join(directoryPath, `file${count}.json`);
      let data = "this is created json file";

      let task = new Promise((fileResolve, fileReject) => {
        fs.writeFile(filePath, data, (error) => {
          if (error) {
            fileReject(error);
          } else {
            fileResolve();
          }
        });
      });
      createdFiles.push(task);
    }
    Promise.all(createdFiles)
      .then(() => resolve(directoryPath))
      .catch((error) => reject("All the files are not created", error));
  });
}

// to delete the files
function deleteFiles(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, files) => {
      if (error) {
        reject(error);
      } else {
        const deleteFiles = files.map((file) => {
          const filePath = path.join(directoryPath, file);

          let task = new Promise((deleteResolve, deleteReject) => {
            fs.unlink(filePath, (error) => {
              if (error) {
                deleteReject(error);
              } else {
                deleteResolve("File Deleted");
              }
            });
          });
          return task;
        });
        Promise.all(deleteFiles)
          .then(() => resolve("all the files are Deleted"))
          .catch(() => reject("All the files are not deleted"));
      }
    });
  });
}

export { makeDirectory, createJsonFiles, deleteFiles };
