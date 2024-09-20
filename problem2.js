const fs = require("fs");
const path = require("path");
let mainFile = "filenames.txt";
let namePath = path.join("/home/pratyusha/mount/call backs/test", mainFile);
//Reading The file
function readFile(file) {
  let filePath = path.join("/home/pratyusha/mount/call backs/test", file);
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error while reading file", error);
    } else {
      console.log("File content:", data);
      contentToUpperCase(data, file);
    }
  });
}
//creating the files
function createNewFile(file, content) {
  const filepath = path.join("/home/pratyusha/mount/call backs/test", file);
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
function contentToUpperCase(data, file) {
  let dataToUpperCase = data.toUpperCase();
  let newFile = "file1.txt";
  createNewFile(newFile, dataToUpperCase);
  storeData(newFile);
  contentToLowerCase(file);
}
//store data into filename .txt
function storeData(file) {
  fs.appendFile(namePath, file + "\n", (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("file name wrote in filenames.txt");
    }
  });
}

//toLower case
function contentToLowerCase(file) {
  let filePath = path.join("/home/pratyusha/mount/call backs/test", file);
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error while reading file", error);
    } else {
      let dataToLowerCase = data.toLowerCase();
      let sentences = dataToLowerCase
        .split(" ")
        .map((s) => s.trim())
        .filter(Boolean);
      let content = sentences.join(".  ");
      let newFile = "file2.txt";
      createNewFile(newFile, content);
      storeData(newFile);
      sortTheContent(newFile);
    }
  });
}

//sort the content
function sortTheContent(file) {
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
      createNewFile(newFile, sortedContent);
      storeData(newFile);
      deleteFiles(mainFile);
    }
  });
}
//to delete the files
function deleteFiles(mainFileFile) {
  fs.readFile(mainFileFile, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let filenameData = data
        .split("\n")
        .map((file) => file.trim())
        .filter(Boolean);
      filenameData.forEach((file) => {
        let filepath = path.join("/home/pratyusha/mount/call backs/test", file);
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
