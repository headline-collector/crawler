var axios = require('axios');
var DailyHeadline = require('../model/DailyHeadline');

/**
* sample return: [{title:.., url:..},..]
*/
function getDouban_movie(date) {
  const linkArray = [];
  axios.get("https://www.douban.com/doulist/16163/")
    .then(res => {
      const html = res.data;
      const regExp = /"title"[\w\W]*?<a\shref="(.*)"\s.*?>(.*?)<\/a>[\w\W]*?"rating_nums">(.*?)</ig;

      // Finding successive matches. ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      var regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: `${regRes[1]}`,
          title: `${regRes[2]}`,
          score: regRes[3]
        });
      }

      console.log('v2 linkArray.length', linkArray);
      new DailyHeadline({
        site: 'douban_movie',
        date: date,
        headlines: linkArray.slice(0, 10),
      }).save()
    })
    .catch( res => {throw res;} );
}

export default getDouban_movie;
