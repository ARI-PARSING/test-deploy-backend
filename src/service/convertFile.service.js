import { fileExists, readFileJson, readFileTxt, readFileXml, removeFile } from '../utils/fileHandler.util.js';
import { convertCsvToListMap, convertJsonToListMap, convertXmlToListMap } from '../utils/mappingData.util.js';

const fileConverter = async (filePath, fileType) => {
    if (!fileExists(filePath)) {
        console.error(`File not found: ${filePath}`);
        throw new Error(`File not found: ${filePath}`);
    }

    const fileExtension = filePath.split('.').pop().toLowerCase();

    let data;
    switch (fileExtension.toLowerCase()) {
        case 'json':
            data = await readFileJson(filePath);
            return convertJsonToListMap(data);
        case 'xml':
            data = await readFileXml(filePath);
            return convertXmlToListMap(data);
        case 'csv':
            data = readFileTxt(filePath);
            return convertCsvToListMap(data, ',');
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }

};

const fileLogs = async (filePath) => {
    console.log(`Processing file: ${filePath}`);
    try {
        const result = await fileConverter(filePath);
        console.log(result)
        console.log(`File processed successfully: ${filePath}`);
        return result;
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        throw error;
    } finally {
        removeFile(filePath);
        console.log(`Temporary file removed: ${filePath}`);
    }
}

export {
    fileConverter,
    fileLogs
}