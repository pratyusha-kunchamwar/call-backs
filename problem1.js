import path from "path";
const fs = await import("fs/promises");

//for creating the new directory
async function makeDirectory(directoryName) {
  try {
    await fs.mkdir(directoryName,{recursive :true});
    console.log("Directory crated Successfully");
  } catch (error) {
    console.error("Error while creating Directory", error);
  }
}

//for creating the json files
async function createJsonFiles(directoryName, numberOfFiles) {
  for (let count = 0; count < numberOfFiles; count++) {
    let filepath = path.join(directoryName, `file${count}.json`);
    let data = {
      name: `The is file ${count} `,
    };
    try {
      await fs.writeFile(filepath, JSON.stringify(data));
      console.log(`file${count} Created successfully`);
    } catch (error) {
      console.error("Error while file Creation", error);
    }
  }
}

//for deleting the files
async function deleteFiles(directoryName) {
  try {
    let files = await fs.readdir(directoryName);
    for (let file of files) {
      let filePath = path.join(directoryName, file);
      try {
        await fs.unlink(filePath);
        console.log(`Delete file :${file}`);
      } catch (error) {
        console.error(`Error in deleting ${file}`, error);
      }
    }
    console.log("All the files are got deleted");
  } catch (error) {
    console.error("Error while reading  the file names");
  }
}

export { createJsonFiles, deleteFiles, makeDirectory };
