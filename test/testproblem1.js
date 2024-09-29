import { fileURLToPath } from "url";
import path from "path";

import { makeDirectory, createJsonFiles, deleteFiles } from '../problem1.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dirName = path.join(__dirname,"jsonRandomFiles");
let nofFiles = 2;

// for calling the functions
async function main(dirName,nofFiles) {
    try {
        await makeDirectory(dirName);
        await createJsonFiles(dirName, nofFiles);
        await deleteFiles(dirName);
    }
    catch (error) {
        console.error("Error while executing the code",error)
        
    }
}
 main(dirName,nofFiles);

