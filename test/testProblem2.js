const path=require('path')
const {
  readFile,
  contentToLowerCase,
  contentToUpperCase,
  deleteFiles,
  sortTheContent,
  storeData,
} = require("../problem2.js");

// let currentPath = __dirname;
let fileName = "lipsum.txt";
let filepath=path.join(__dirname,fileName)

//call backs

readFile(filepath, (data) => {
  console.log("file read successfully");
  contentToUpperCase(data, (mainFile, upperCaseDataFile) => {
    console.log("Data converted to upperCase");
    storeData(mainFile, upperCaseDataFile, (mainFile, upperCaseDataFile) => {
      console.log(`${upperCaseDataFile} name wrote in filenames.txt`);
      contentToLowerCase(
        mainFile,
        upperCaseDataFile,
        (mainFile, lowerCaseDataFile) => {
          console.log("Data converted to LowerCase");
          storeData(
            mainFile,
            lowerCaseDataFile,
            (mainFile, lowerCaseDataFile) => {
              console.log(`${lowerCaseDataFile} name wrote in filenames.txt`);
              sortTheContent(
                mainFile,
                lowerCaseDataFile,
                (mainFile, sortedDataFile) => {
                  console.log("Data is sorted");
                  storeData(
                    mainFile,
                    sortedDataFile,
                    (mainFile, sortedDataFile) => {
                      console.log(
                        `${sortedDataFile} name wrote in filenames.txt`
                      );
                      deleteFiles(mainFile)
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});
