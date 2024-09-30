const path = require("path");
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
let filepath = path.join(__dirname, fileName);

//call backs

readFile(filepath, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log("file read successfully");
    contentToUpperCase(data, (error, mainFile, upperCaseDataFile) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Data converted to upperCase");
        storeData(
          mainFile,
          upperCaseDataFile,
          (error, mainFile, upperCaseDataFile) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`${upperCaseDataFile} name wrote in filenames.txt`);
              contentToLowerCase(
                mainFile,
                upperCaseDataFile,
                (error, mainFile, lowerCaseDataFile) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log("Data converted to LowerCase");
                    storeData(
                      mainFile,
                      lowerCaseDataFile,
                      (error, mainFile, lowerCaseDataFile) => {
                        if (error) {
                          console.error(error);
                        } else {
                          console.log(
                            `${lowerCaseDataFile} name wrote in filenames.txt`
                          );
                          sortTheContent(
                            mainFile,
                            lowerCaseDataFile,
                            (error, mainFile, sortedDataFile) => {
                              if (error) {
                                console.error(error);
                              } else {
                                console.log("Data is sorted");
                                storeData(
                                  mainFile,
                                  sortedDataFile,
                                  (error, mainFile, sortedDataFile) => {
                                    if (error) {
                                      console.error(error);
                                    } else {
                                      console.log(
                                        `${sortedDataFile} name wrote in filenames.txt`
                                      );
                                      deleteFiles(mainFile, (error) => {
                                        if (error) {
                                          console.error(error);
                                        }
                                      });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  }
});
