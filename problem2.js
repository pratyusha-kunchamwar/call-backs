const fs = require("fs");
const path = require("path");

//to read file
function readFile(filePath, callBack) {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      callBack("Error while reading file", error);
    } else {
      callBack(null, data);
    }
  });
}

//creating the files
function createNewFile(file, content, callBack) {
  const filepath = path.join(__dirname, file);
  fs.writeFile(filepath, content, (error) => {
    if (error) {
      callBack("Error while creating File", error);
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

  createNewFile(upperCaseDataFile, upperCaseData, (error) => {
    if (error) {
      callBack(error);
    } else {
      createNewFile(mainFile, "", (error) => {
        if (error) {
          callBack(error);
        } else {
          callBack(null, mainFile, upperCaseDataFile);
        }
      });
    }
  });
}

//content to Lower case
function contentToLowerCase(mainFile, upperCaseData, callBack) {
  let filePath = path.join(__dirname, upperCaseData);
  readFile(filePath, (error, data) => {
    if (error) {
      callBack(error);
    } else {
      let lowerCaseData = data.toLowerCase();
      let sentences = lowerCaseData
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean);
      let content = sentences.join(".");
      let lowerCaseDataFile = "lowerCaseData.txt";

      createNewFile(lowerCaseDataFile, content, (error) => {
        if (error) {
          callBack(error);
        } else {
          callBack(null, mainFile, lowerCaseDataFile);
        }
      });
    }
  });
}

//sort the content
function sortTheContent(mainFile, lowerCaseData, callBack) {
  let filePath = path.join(__dirname, lowerCaseData);
  readFile(filePath, (error, data) => {
    if (error) {
      callBack(error);
    } else {
      let sentences = data
        .split(".")
        .map((sentence) => sentence.trim())
        .filter(Boolean);
      let sortedContent = sentences.sort().join(".");
      let sortedDataFile = "sortedData.txt";

      createNewFile(sortedDataFile, sortedContent, (error) => {
        if (error) {
          callBack(error);
        } else {
          callBack(null, mainFile, sortedDataFile);
        }
      });
    }
  });
}

//to delete the files
function deleteFiles(mainFile, callBack) {
  let mainFilePath = path.join(__dirname, mainFile);
  readFile(mainFilePath, (error, data) => {
    if (error) {
      callBack(error);
    } else {
      let filesToDelete = data
        .split("\n")
        .map((file) => file.trim())
        .filter(Boolean);

      filesToDelete.forEach((file) => {
        let filepath = path.join(__dirname, file);
        fs.unlink(filepath, (error) => {
          if (error) {
            callBack(`Error while deleting ${file}`, error);
          } else {
            console.log(`${file} is deleted`);
          }
        });
      });
    }
  });
}

//store data into filename .txt
function storeData(mainFile, content, callBack) {
  let mainFilePath = path.join(__dirname, mainFile);

  fs.appendFile(mainFilePath, content + "\n", (error) => {
    if (error) {
      callBack("error while appending data", error.message);
      return;
    } else {
      callBack(null, mainFile, content);
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
