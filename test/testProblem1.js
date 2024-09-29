const path = require("path");
const {
  makeDirectory,
  createJsonFiles,
  deleteFiles,
} = require("../problem1.js");

const absolutePath = path.join(__dirname, "jsonFiles");
let numberOfFiles = 2;

//calling the functions
makeDirectory(absolutePath, (error, directory) => {
  if (error) {
    console.error(error);
  } else {
    console.log("directory created successfully");
    createJsonFiles(directory, numberOfFiles, (error, directory) => {
      if (error) {
        console.error(error);
      } else {
        console.log("all the files are created successfully");
        deleteFiles(directory, (error, message) => {
          if (error) {
            console.error(error);
          } else {
            console.log(message);
          }
        });
      }
    });
  }
});
