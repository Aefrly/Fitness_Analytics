const fs = require('fs/promises');

//Function to read JSON health file and return total entries with error 
// messages in case something goes wrong
async function readHealthFile() {
    try {
        const data = await fs.readFile('./data/health-metrics.json', 'utf8');
        const healthData = JSON.parse(data);
        return healthData;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Health data file not found.');
        } else {
            console.error('Error reading health file:', error.message);
        }
    }
}

module.exports = { readHealthFile };