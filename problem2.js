const fs = require("fs");
const path = require("path");

//to read file
function readFile(file, currentPath) {
  let filePath = path.join(currentPath, file);
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error while reading file", error);
    } else {
      contentToUpperCase(data, currentPath);
    }
  });
}

//creating the files
function createNewFile(file, content, currentPath) {
  const filepath = path.join(currentPath, file);
  fs.writeFile(filepath, content, (error) => {
    if (error) {
      console.error("Error while creating File");
      console.error(error);
    } else {
      console.log(`${file}file created,data updated successfully`);
    }
  });
}
// content to upper case
function contentToUpperCase(data, currentPath) {
  let dataToUpperCase = data.toUpperCase();
  let newFile = "file1.txt";
  let mainFile = "fileName.txt";

  createNewFile(newFile, dataToUpperCase, currentPath);
  createNewFile(mainFile, "", currentPath); //filenames.txt file creating
  let mainFilePath = path.join(currentPath, mainFile);
  storeData(newFile, mainFilePath);
  contentToLowerCase(newFile, currentPath, mainFilePath);
}

//store data into filename .txt
function storeData(content, mainFilePath) {
  fs.appendFile(mainFilePath, content + "\n", (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("file name wrote in filenames.txt");
    }
  });
}

//content to Lower case
function contentToLowerCase(file, currentPath, mainFilePath) {
  let filePath = path.join(currentPath, file);
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error while reading file", error);
    } else {
      let dataToLowerCase = data.toLowerCase();
      let sentences = dataToLowerCase
        .split(" ")
        .map((s) => s.trim())
        .filter(Boolean);
      let content = sentences.join(".");
      let newFile = "file2.txt";

      createNewFile(newFile, content, currentPath);
      storeData(newFile, mainFilePath);
      sortTheContent(newFile, currentPath, mainFilePath);
    }
  });
}

//sort the content
function sortTheContent(file, currentPath, mainFilePath) {
  fs.readFile(file, "utf8", (error, data) => {
    if (error) {
      console.error(error);
    } else {
      let sentences = data
        .split("")
        .map((sentence) => sentence.trim())
        .filter(Boolean);
      let sortedContent = sentences.sort().join(". ");
      let newFile = "file3.txt";

      createNewFile(newFile, sortedContent, currentPath);
      storeData(newFile, mainFilePath);
      deleteFiles(mainFilePath, currentPath);
    }
  });
}

//to delete the files
function deleteFiles(mainFilePath, currentPath) {
  fs.readFile(mainFilePath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let filenameData = data
        .split("\n")
        .map((file) => file.trim())
        .filter(Boolean);

      filenameData.forEach((file) => {
        let filepath = path.join(currentPath, file);
        fs.unlink(filepath, (error) => {
          if (error) {
            console.error("Error while deleting the files");
          } else {
            console.log(`${file} is deleted`);
          }
        });
      });
      
    }
  });
}
module.exports = { readFile };
