var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailyHeadline = mongoose.model('DailyHeadline', new Schema({
  site: { type: String, required: true},
  date: { type: String, required: true},
  headlines: {type: Array, required: true}
}));

module.exports = DailyHeadline;
