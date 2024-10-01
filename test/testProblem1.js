const path = require("path");
const {
  makeDirectory,
  createJsonFiles,
  deleteFiles,
} = require("../problem1.js");

const directory = path.join(__dirname, "jsonFiles");
let numberOfFiles = 2;

//calling the functions
makeDirectory(directory, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Directory created successfully");
    createJsonFiles(directory, numberOfFiles, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("All the files are created successfully");
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
