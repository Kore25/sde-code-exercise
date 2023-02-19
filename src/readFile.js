const fs = require('fs');

/**
 * This function read the file from the path
 * @param {string} path
 * @returns {string} data from file
 */
const getFile = async (path) => {
    try {
        console.log('Start reading file: ', path);
        const data = await fs.readFileSync(path, 'utf8');
        console.log('End reading file: ', path);
        return data;
    } catch (err) {
        console.log('Error on readFile:', err);
    }
}

module.exports = {
    getFile,
}