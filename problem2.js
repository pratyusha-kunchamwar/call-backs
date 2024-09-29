const fs = require("fs");
const path = require("path");

//to read file
function readFile(filePath, callBack) {
  // let filePath = path.join(currentPath, file);
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error while reading file", error);
    } else {
      callBack(data);
    }
  });
}

//creating the files
function createNewFile(file, content, callBack) {
  const filepath = path.join(__dirname, file);
  fs.writeFile(filepath, content, (error) => {
    if (error) {
      console.error("Error while creating File", error);
    } else {
      console.log(`${file} created `);
      if (callBack) {
        callBack();
      }
    }
  });
}

// content to upper case
function contentToUpperCase(data, callBack) {
  let upperCaseData = data.toUpperCase();
  let upperCaseDataFile = "upperCaseData.txt";
  let mainFile = "fileName.txt";

  createNewFile(upperCaseDataFile, upperCaseData, () => {
    createNewFile(mainFile, "", () => {
      callBack(mainFile, upperCaseDataFile);
    });
  });
}

//content to Lower case
function contentToLowerCase(mainFile, newFile, callBack) {
  let filePath = path.join(__dirname, newFile);
  readFile(filePath, (data) => {
    let lowerCaseData = data.toLowerCase();
    let sentences = lowerCaseData
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);
    let content = sentences.join(".");
    let lowerCaseDataFile = "lowerCaseData.txt";

    createNewFile(lowerCaseDataFile, content, () => {
      callBack(mainFile, lowerCaseDataFile);
    });
  });
}

//sort the content
function sortTheContent(mainFile, file, callBack) {
  let filePath = path.join(__dirname, file);
  readFile(filePath, (data) => {
    let sentences = data
      .split(".")
      .map((sentence) => sentence.trim())
      .filter(Boolean);
    let sortedContent = sentences.sort().join(".");
    let sortedDataFile = "sortedData.txt";

    createNewFile(sortedDataFile, sortedContent, () => {
      callBack(mainFile, sortedDataFile);
    });
  });
}

//to delete the files
function deleteFiles(mainFile) {
  let mainFilePath = path.join(__dirname, mainFile);
  readFile(mainFilePath, (data) => {
    let filesToDelete = data
      .split("\n")
      .map((file) => file.trim())
      .filter(Boolean);

    filesToDelete.forEach((file) => {
      let filepath = path.join(__dirname, file);
      fs.unlink(filepath, (error) => {
        if (error) {
          console.error(`Error while deleting ${file}`, error);
        } else {
          console.log(`${file} is deleted`);
        }
      });
    });
  });
}

//store data into filename .txt
function storeData(mainFile, content, callBack) {
  let mainFilePath = path.join(__dirname, mainFile);

  fs.appendFile(mainFilePath, content + "\n", (error) => {
    if (error) {
      console.error("error while appending data", error.message);
      return;
    } else {
      callBack(mainFile, content);
    }
  });
}
module.exports = {
  readFile,
  contentToLowerCase,
  contentToUpperCase,
  deleteFiles,
  sortTheContent,
  storeData,
};
