const fs = require("fs");
const path = require("path");

//make directory
function makeDirectory(dir, numberOfFiles) {
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

//creating json files
function createJsonFiles(dir, numFiles) {
  for (let file = 0; file <= numFiles; file++) {
    let filePath = path.join(dir, `file${file}.json`);
    const data = {
      name: `The is ${file} file `,
    };
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        console.error("Error while writing data into file");
        console.log(error);
      } else {
        //to control on write files  because it is asynchronous in nature
        if (numFiles === file) {
          console.log("Data wrote into allThe files Successfully");
          deleteFiles(dir);
        }
      }
    });
  }
}

//for files deleting
function deleteFiles(dir) {
  fs.readdir(dir, (error, filesList) => {
    //directory reading
    if (error) {
      console.error("Error while deleting the files");
      console.log(error);
    } else {
      if (filesList.length === 0) {
        console.log("No files Exist in the directory");
        return;
      }
      let deletedFilesCount = 0;

      filesList.forEach((file) => {
        const filePath = path.join(dir, file);

        fs.unlink(filePath, (error) => {
          //for files deleting
          if (error) {
            console.error(`Error while deleting the file${file}`);
            console.log(error);
          } else {
            deletedFilesCount++;
            //to control on delete files  because it is asynchronous in nature
            if (deletedFilesCount === filesList.length) {
              console.log("All the files are deleted");
            }
          }
        });
      });
    }
  });
}
module.exports = makeDirectory;
