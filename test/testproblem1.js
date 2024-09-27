import makeDirectory from "../problem1.js"
import path from "path";
import {fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, "./random-json-files")
let nofFiles = 2;
makeDirectory(dirPath, nofFiles);