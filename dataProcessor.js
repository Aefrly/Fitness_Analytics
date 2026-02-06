require('dotenv').config();
console.log(process.env.USER_NAME); // "Allison"
console.log(process.env.WEEKLY_GOAL); // "120"

const { readHealthFile } = require('./healthReader.js');
const { processWorkoutData } = require('./workoutReader.js');

async function processFiles() {
    const userName = process.env.USER_NAME || 'User';
    const weeklyGoal = parseInt(process.env.WEEKLY_GOAL) || 120;

    console.log(`Processing data for: ${userName}`);
    // Processing data for: Allison
    console.log('📁 Reading workout data...');
    const workoutSummary = await processWorkoutData();
    // Total workouts: 10
    // Total minutes: 330
    console.log('📁 Reading health data...');
    const healthSummary = await readHealthFile();
    // Total health entries: 8
    console.log('📁 Processing data...');
    console.log();
    console.log('=== SUMMARY ===');
    console.log(`Workouts found: ${workoutSummary.totalWorkouts}`);
    // Workouts found: 10
    console.log(`Total workout minutes: ${workoutSummary.totalMinutes}`);
   // Total workout minutes: 330
    console.log(`Health entries found: ${healthSummary.totalEntries}`);
    // Health entries found: 8
    console.log(`Weekly goal: ${weeklyGoal} minutes`);
    // Weekly goal: 150 minutes
    if (workoutSummary.totalMinutes >= weeklyGoal) {
        console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else {
        const remainingMinutes = weeklyGoal - workoutSummary.totalMinutes;
        console.log(`😞 ${userName}, you are still short by ${remainingMinutes} minutes.`);
    }
}

processFiles();
