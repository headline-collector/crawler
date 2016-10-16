var mongoose = require('mongoose');
mongoose.connect('mongodb://10.221.64.248/database');

import getGithub from './getDailyHeadline/getGithub'
import getHN from './getDailyHeadline/getHN'
import getMedium from './getDailyHeadline/getMedium'
import getReddit from './getDailyHeadline/getReddit'
import getV2 from './getDailyHeadline/getV2'
import getProductHunt from './getDailyHeadline/getProductHunt';
import getAwwwards from './getDailyHeadline/getAwwwards';
import getDouban_movie from './getDailyHeadline/getDouban_movie';

const dateStr = new Date().toISOString().slice(0, 10)

getGithub(dateStr);
getHN(dateStr);
// getMedium();
getReddit(dateStr);
getV2(dateStr);
getProductHunt(dateStr);
getAwwwards(dateStr);
getDouban_movie(dateStr);

// handle unhandled promise rejection
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p) {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    // application specific logging, throwing an error, or other logic here
});
