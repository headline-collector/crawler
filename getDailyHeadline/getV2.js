var axios = require('axios');
var DailyHeadline = require('../model/DailyHeadline');

/**
* sample return: [{title:.., url:..},..]
*/
function getV2(date) {
  const linkArray = [];
  axios.get("https://www.v2ex.com/?tab=hot")
    .then(res => {
      const html = res.data;
      const regExp = /item_title.*href="(.*)">(.*)<\/a>[\w\W]*?count_livid">(\d{1,6})<\/a>/ig;

      // Finding successive matches. ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      let regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: `https://www.v2ex.com${regRes[1]}`,
          title: `${regRes[2]}`,
          score: regRes[3]
        });
      }

      console.log('v2 linkArray.length', linkArray.length);
      new DailyHeadline({  
        site: 'v2ex',
        date: date,
        headlines: linkArray.slice(0, 10),
      }).save()
    })
    .catch( res => {throw res;} );
}

export default getV2;
