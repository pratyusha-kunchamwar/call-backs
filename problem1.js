/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

import fs from "fs/promises";
import path from "path";

function makeDirectory(directoryPath) {
  return fs
    .mkdir(directoryPath, { recursive: true })
    .then(() => {
      return directoryPath;
    })
    .catch((error) => console.error("Error while creating directory", error));
}

//for create json files
function createJsonFiles(directoryPath, numberOfFiles) {
  let createdFiles = new Array(numberOfFiles);

  let createdFilesData = createdFiles.map((_, count) => {
    const filePath = path.join(directoryPath, `file${count}.json`);
    return fs
      .writeFile(filePath, "These are json files")
      .then(() => {
        console.log(`file${count} created`);
      })
      .catch((error) => console.error("Error in creating the file", error));
  });

  //api to check all the promises resolve
  return Promise.all(createdFilesData)
    .then(() => {
      return directoryPath;
    })
    .catch((error) =>
      console.error("Error while creating all the files", error)
    );
}

//for deleting the Files
function deleteFiles(directoryPath) {
  return fs
    .readdir(directoryPath)
    .then((files) => {
      let deletedFiles = files.map((file) => {
        let filePath = path.join(directoryPath, file);
        return fs
          .unlink(filePath)
          .then(() => console.log(`${file} deleted`))
          .catch((error) => console.error("Error in deleting the file", error));
      });
      //api to check all promises resolve
      return Promise.all(deletedFiles);
    })
    .then(() => {
      console.log("---All the files are deleted---");
    })
    .catch((error) => console.error("Error while reading the files", error));
}

export { makeDirectory, createJsonFiles, deleteFiles };
