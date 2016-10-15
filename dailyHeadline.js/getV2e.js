var axios = require('axios');
var DailyHeadline = require('./model/DailyHeadline')

function getV2() {
  const linkArray = [];
  axios.get("https://www.v2ex.com/?tab=hot")
    .then(function(res){
      var html = res.data;
      var regExp = /item_title.*href="(.*)">(.*)<\/a>[\w\W]*?count_livid">(\d{1,6})<\/a>/ig;

      // Finding successive matches. ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      var regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: `https://www.v2ex.com${regRes[1]}`,
          title: `${regRes[2]}`,
          score: regRes[3]
        });
      }

      console.log( linkArray.slice(0, 10) )

      new DailyHeadline({  
        site: 'v2ex',
        // TODO: set the right date
        date: '2016-10-11',
        headlines: linkArray.slice(0, 10),
      }).save()
    })
    .catch( res => {throw res;} );
}

module.exports = getV2;