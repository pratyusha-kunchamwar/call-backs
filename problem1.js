const { error } = require("console");
const fs = require("fs");
const path = require("path");

function makeDir(dir, numberOfFiles) {
  fs.mkdir(dir, (error) => {
    if (error) {
      console.error("Error while Creating Directory");
      console.log(error);
    } else {
      console.log("Directory created successfully");
      createJsonFiles(dir, numberOfFiles);
    }
  });
}

//for creating json files
function createJsonFiles(dir, numFiles) {
  let nofWrittenFiles = 0;
  for (let file = 0; file < numFiles; file++) {
    let filePath = path.join(dir, `file${file}.json`);
    const data = {
      name: `The is ${file} file `,
    };
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        console.error("Error while writing data into file");
        console.log(error);
      } else {
        nofWrittenFiles++;
      } //to control on write files  because it is asynchronous in nature
      if (numFiles === nofWrittenFiles) {
        console.log("Data wrote into allThe files Successfully");
        deleteFiles(dir);
      }
    });
  }
}

//for files deleting
function deleteFiles(dir) {
  fs.readdir(dir, (error, files) => {
    if (error) {
      console.error("Error while deleting the files");
      console.log(error);
    } else {
      if (files.length === 0) {
        console.log("No files Exist in the directory");
      } else {
        let fileDeleted = 0;
        files.forEach((file) => {
          const filePath = path.join(dir, file);

          fs.unlink(filePath, (error) => {
            if (error) {
              console.error("Error while deleting the files");
              console.log(error);
            }
            else {
              fileDeleted++;
            }

            if (fileDeleted === files.length) {
              console.log("All the files are deleted");
              return;
            }
          });
        });
      }
    }
  });
}
module.exports = { createJsonFiles, deleteFiles, makeDir };
