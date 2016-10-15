var axios = require('axios');
var DailyHeadline = require('../model/DailyHeadline');

/**
* sample return: [{title:.., url:..},..]
*/
async function getReddit(date) {
  const linkArray = [];
  axios.get("https://www.reddit.com/r/programming/top")
    .then(res => {
      const html = res.data;
      const regExp = /class="score unvoted">(\d{0,7})<\/div>.*?title\smay-blank.*?href=".*?".*?>(.*?)<\/a>.*?class="first"><a\shref="(.*?)"/ig;

      // Finding successive matches. ref: htts://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      let regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: regRes[3],
          title: regRes[2],
          score: regRes[1]
        });
      }

      // find 10 links with most points
      let result = [];
      if (linkArray.length === 26) {
        console.log('Reddit linkArray.length', linkArray.length);
        result = linkArray.slice(1, 11);
      } else {
        console.log('Reddit linkArray.length', linkArray.length);
        result = linkArray.slice(0, 10);
      }

      new DailyHeadline({  
        site: 'reddit_programming',
        date: date,
        headlines: result
      }).save()
    })
    .catch( res => {throw res;} );

}

export default getReddit;
