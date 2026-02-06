const path = require('path'); 
const fs = require('fs/promises'); 
const { readHealthFile } = require('../healthReader.js');

describe('readHealthFile', () => { 
    test('reads a valid JSON file', async () => { 
        const result = await readHealthFile(); 
        expect(result).not.toBeNull(); 
        expect(result.user).toBeDefined();
        expect(result.metrics).toBeDefined();
        expect(Array.isArray(result.metrics)).toBe(true);
    }); 

    test('returns object with correct structure', async () => { 
        const result = await readHealthFile(); 
        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('metrics');
        expect(result.metrics[0]).toHaveProperty('date');
        expect(result.metrics[0]).toHaveProperty('type');
    }); 
});