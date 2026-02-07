const path = require('path');
const fs = require('fs');
const { processWorkoutData, readWorkoutData } = require('../workoutReader.js'); 

describe('CSV Workout Processing', () => { 
    test('reads and processes valid CSV file', async () => { 
        const result = await processWorkoutData(); 
        expect(result).not.toBeNull(); 
        expect(result).toHaveProperty('totalWorkouts');
        expect(result).toHaveProperty('totalMinutes');
        expect(result.totalWorkouts).toBeGreaterThan(0); 
        expect(result.totalMinutes).toBeGreaterThan(0); 
    }); 

    test('readWorkoutData returns correct data structure', async () => { 
        const data = await readWorkoutData(); 
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0); 
        expect(data[0]).toHaveProperty('date'); 
        expect(data[0]).toHaveProperty('exercise'); 
        expect(data[0]).toHaveProperty('duration'); 
    }); 
});