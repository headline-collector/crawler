var mongoose = require('mongoose');

mongoose.connect('mongodb://10.221.64.248/database');

var getV2 = require('./getV2');

getV2()