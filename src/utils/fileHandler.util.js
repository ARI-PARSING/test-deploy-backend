import fs from "fs";
import XmlParser from "fast-xml-parser";

const fileExists = (file) => {
    return fs.existsSync(file);
}

const readFileTxt = (file) => {
    if (!fileExists(file))
        return null;

    return fs.readFileSync(file, "utf8");
}

const readFileJson = (file) => {
    if (!fileExists(file))
        return null;

    return JSON.parse(readFileTxt(file));
}

const readFileXml = (file) => {
    if (!fileExists(file))
        return null;

    const parser = new XmlParser();
    return parser.parse(readFileTxt(file));
}

const removeFile = (file) => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
    return true;
}

export {
    fileExists,
    readFileTxt,
    readFileJson,
    readFileXml,
    removeFile
};