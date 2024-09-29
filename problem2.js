/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

import path from "path";
const fs = await import("fs/promises");

async function readGivenFile(file, currentPath) {
  try {
    let filePath = path.join(currentPath, file);
    let fileData = await fs.readFile(filePath, "utf-8");
    return fileData;
  } catch (error) {
    console.error("Error While Reading the File", error);
  }
}

//content to uppercase
async function contentToUpperCase(fileData, currentPath) {
  let uppercaseData = fileData.toUpperCase();
  let upperCaseDataFile = "upperCaseData.txt";
  var mainFile = "fileNames.txt";

  await createNewFile(upperCaseDataFile, uppercaseData, currentPath);
  await createNewFile(mainFile, upperCaseDataFile+'\n', currentPath);
  return { upperCaseDataFile, mainFile };
}

//convert to lowercase
async function contentToLowerCase(upperCaseDataFile, currentPath, mainFile) {
  try {
    let fileData = await readGivenFile(upperCaseDataFile, currentPath);
    let lowerCaseData = fileData.toLowerCase().split(" ").join("\n");
    let lowerCaseDataFile = "lowerCaseData.txt";

    await createNewFile(lowerCaseDataFile, lowerCaseData, currentPath);
    await storeFileName(mainFile, currentPath, lowerCaseDataFile);

    return { lowerCaseDataFile, mainFile };
  } catch (error) {
    console.error("Error while converting to LowerCase");
  }
}

//sort the Data
async function sortTheContent(lowerCaseDataFile, currentPath, mainFile) {
  try {
    let data = await readGivenFile(lowerCaseDataFile, currentPath);
    let sortedData = data.split("").sort().filter(Boolean);
    let sortedDataFile = "sortedData.txt";

    await createNewFile(sortedDataFile, sortedData, currentPath);
    await storeFileName(mainFile, currentPath, sortedDataFile);

    return mainFile;
  } catch (error) {
    console.error("Error while sorting the content", error);
  }
}

//to delete the files there in fileName.txt
async function deleteFiles(mainFile, currentPath) {
  let filePath = path.join(currentPath, mainFile);
  try {
    let fileData = await fs.readFile(filePath, "utf-8");
    let fileNames = fileData.split("\n").filter(Boolean);
    for (let file of fileNames) {
      let filePath = path.join(currentPath, file);
      try {
        await fs.unlink(filePath);
        console.log(`Delete file :${file}`);
      } catch (error) {
        console.error(`Error in deleting ${file}`, error);
      }
    }
  } catch (error) {
    console.error("Error while Deleting the files", error);
  }
}

//to store the data  in fileNames.txt
async function storeFileName(fileName, currentPath, content) {
  let filePath = path.join(currentPath, fileName);
  try {
    await fs.appendFile(filePath, content+'\n');
  } catch (error) {
    console.error("Error while Storing File name", error);
  }
}

//creating the new file
async function createNewFile(fileName, content, currentPath) {
  let filePath = path.join(currentPath, fileName);
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    console.error(`Error while creating the ${fileName}`, error);
  }
}

//exporting the files
export {
  readGivenFile,
  contentToUpperCase,
  contentToLowerCase,
  deleteFiles,
  sortTheContent,
};
