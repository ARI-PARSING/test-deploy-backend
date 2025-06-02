import { fileExists, readFileJson, readFileTxt, readFileXml, removeFile } from '../utils/fileHandler.util.js';
import { convertCsvToListMap, convertJsonToListMap, convertXmlToListMap } from '../utils/mappingData.util.js';
import tokenStrategies from '../utils/security/jwt.security.util.js';

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

const enryptedTargets = (file, secretKey)=>{
    for(const register of file){
        for(const item of register){
            if(item.key == "tarjeta")
                item.value = tokenStrategies.JWT_TARGET_CODE.generateToken(item.value, secretKey).token;
        }
    }
    return file;
}

const fileLogs = async (filePath, secretKey) => {
    console.log(`Processing file: ${filePath}`);
    try {
        const result = await fileConverter(filePath);
        const encryptedResult = enryptedTargets(result, secretKey);
        console.log('Encrypted targets in file:', encryptedResult);
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