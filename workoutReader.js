const fs = require('fs');
const csv = require('csv-parser');

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
async function processWorkoutData() {
    try {
        const workoutData = await readWorkoutData(); 
        let totalWorkouts = workoutData.length; 
        let totalMinutes = 0; 

        for (let i = 0; i < workoutData.length; i++) { 
            const workout = workoutData[i]; 
            totalMinutes += parseInt(workout.duration); 
        }

        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes exercised: ${totalMinutes}`);
        return { totalWorkouts, totalMinutes };
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Workout data file not found.');
        } else {
            console.error('Error reading workout file:', error.message);
        }
    }
}

(async () => {
    await processWorkoutData();
})();

module.exports = { readWorkoutData, processWorkoutData };