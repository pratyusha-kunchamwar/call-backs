import readGivenFile from "../problem2.js";
import path from "path";
import { fileURLToPath } from "url";

//to det current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "lipsum.txt");
readGivenFile(filePath);
