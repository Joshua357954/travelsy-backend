const axios = require('axios');
const cron = require('node-cron');
const Photo = require('../models/photoModel');


const fetchData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        const photos = response.data;

        console.log("Added A New Batch Of Photos To DBase ")

        for (const photo of photos) {
            try {
                // Only add the photo if not already in the database, so we don't create any duplicates.
                await Photo.findOneAndUpdate({ id: photo.id }, photo, { upsert: true }); 
            } catch (err) {
                console.error(`Error inserting photo ID ${photo.id}:`, err);
            }
        }

        console.log(`Fetched and stored ${photos.length} photos.`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const startFetching = (minutes) => {
    if (isNaN(minutes) || minutes < 1) {
        console.error("Please provide a valid minute value greater than 0.");
        return;
    }
    const cronSchedule = `*/${minutes} * * * *`;

    cron.schedule(cronSchedule, fetchData);
    
    fetchData();
    console.log(`Fetching data every ${minutes} minute(s).`);
};

const NUMBER_OF_MINUTES = 1
startFetching(NUMBER_OF_MINUTES);

module.exports = { startFetching };
