const fs = require("fs");
const path = require("path");

//make directory
function makeDirectory(directory, callback) {
  fs.mkdir(directory, { recursive: true }, (error) => {
    if (error) {
      callback("Error while Creating Directory", error.message);
    } else {
      callback(null);
    }
  });
}

//creating json files
function createJsonFiles(directory, numFiles, callback) {
  let filesCreated = 0;
  for (let file = 0; file < numFiles; file++) {
    let filePath = path.join(directory, `file${file}.json`);
    const data = {
      name: `The is ${file} file `,
    };
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        callback("Error while writing data into file", error.message);
      } else {
        filesCreated++;
        //to control on write files  because it is asynchronous in nature
        if (filesCreated === numFiles) {
          callback(null);
        }
      }
    });
  }
}

//for files deleting
function deleteFiles(directory, callback) {
  fs.readdir(directory, (error, filesList) => {
    //directory reading
    if (error) {
      callback("Error while deleting the files", error.message);
    } else {
      if (filesList.length === 0) {
        console.log("No files Exist in the directory");
        return;
      }
      let deletedFilesCount = 0;

      filesList.forEach((file) => {
        const filePath = path.join(directory, file);

        fs.unlink(filePath, (error) => {
          //for files deleting
          if (error) {
            callback(`Error while deleting the file${file}`);
            console.log(error);
          } else {
            deletedFilesCount++;
            //to control on delete files  because it is asynchronous in nature
            if (deletedFilesCount === filesList.length) {
              callback(null, "All the files are deleted");
            }
          }
        });
      });
    }
  });
}
module.exports = { makeDirectory, createJsonFiles, deleteFiles };
