const fs = require('fs/promises');

async function readHealthFile() {
    try {
        const data = await fs.readFile('./data/health-metrics.json', 'utf8');
        const healthData = JSON.parse(data);

        console.log(`Total health entries: ${healthData.length}`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Health data file not found.');
        } else {
            console.error('Error reading health file:', error.message);
        }
    }
}

readHealthFile();