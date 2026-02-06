const fs = require('fs');
const csv = require('csv-parser');

//Converting the CSV file into JSON information for me to process
async function readWorkoutData() {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream('./data/workouts.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

//Function to read CSV workout file and return total entries and duration of 
// workout with error messages in case something goes wrong
async function processWorkoutData() {
    try {
        const workoutData = await readWorkoutData(); 
        let totalWorkouts = workoutData.length; 
        let totalMinutes = 0; 

        for (let i = 0; i < workoutData.length; i++) { 
            const workout = workoutData[i]; 
            totalMinutes += parseInt(workout.duration); 
        }

        return { totalWorkouts, totalMinutes };
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Workout data file not found.');
        } else {
            console.error('Error reading workout file:', error.message);
        }
    }
}

module.exports = { readWorkoutData, processWorkoutData };