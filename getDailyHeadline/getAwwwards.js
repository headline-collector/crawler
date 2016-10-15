var axios = require('axios');
var DailyHeadline = require('../model/DailyHeadline');

/**
* sample return: [{title:.., url:..},..]
*/
function getAwwwards(date) {
  const linkArray = [];
  axios.get("http://www.awwwards.com/websites/trend/")
    .then(res => {
      const html = res.data;
      const regExp = /h3\sclass="bold"><a\shref="(.*?)">(.*)<\/a>[\w\W]*?class="total">(\d{0,7})<\/span>/ig;

      // Finding successive matches. ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      var regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: `https://www.awwwards.com${regRes[1]}`,
          title: `${regRes[2]}`,
          score: regRes[3]
        });
      }

      console.log('v2 linkArray.length', linkArray);
      new DailyHeadline({
        site: 'awwwards',
        date: date,
        headlines: linkArray.slice(0, 10),
      }).save()
    })
    .catch( res => {throw res;} );
}

export default getAwwwards;
