/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/


import fs from "fs/promises";
import path from "path";
function makeDirectory(directoryPath, numberOfFiles) {
  fs.mkdir(directoryPath, { recursive: true })
    .then(() => {
      console.log("Directory created");
      createJsonFiles(directoryPath, numberOfFiles);
    })
    .catch((error) => console.error("Error while creating dir", error));
}

//for create json files
function createJsonFiles(directoryPath, numberOfFiles) {
  let promisesOfCreatedFiles = [];
  for (let count = 0; count < numberOfFiles; count++) {
    let filePath = path.join(directoryPath, `file${count}.json`);
    promisesOfCreatedFiles.push(
      fs.writeFile(filePath, "These are json files")
        .then(() => {
          console.log(`file${count} created`);
        })
        .catch((error) => console.error("error while creating the file", error))
    );
  }
//api to check all the promises resolve
  Promise.all(promisesOfCreatedFiles)
    .then(() => deleteFiles(directoryPath))
    .catch((error) =>
      console.error("some of the file creation is unsuccessful", error)
    );
}

//for deleting the Files
function deleteFiles(directoryPath) {
  fs.readdir(directoryPath)
    .then((files) => {
      let deletedFiles = files.map((file) => {
        let filePath = path.join(directoryPath, file);
       return fs.unlink(filePath)
          .then(() => console.log("file deleted"))
          .catch((error) => console.error("Error in deleting the file", error));
      });
//api to check all promises resolve
      Promise.all(deletedFiles)
        .then(() => console.log("All files deleted"))
        .catch((error) => console.log("Error while deleting the files", error));
    })
    .catch((error) => console.error("Error while reading the files", error));
}


export default makeDirectory;


