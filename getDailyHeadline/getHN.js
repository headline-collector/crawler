var axios = require('axios');
var DailyHeadline = require('../model/DailyHeadline');

/**
* sample return: [{title:.., url:..},..]
*/
function getHN(date) {
  const linkArray = [];
  axios.get("https://news.ycombinator.com")
    .then(res => {
      const html = res.data;
      // console.log(html)
      const regExp = /class="storylink">(.*?)<\/a>.*?\n.*?class="score".*?>(\d{1,7}).*?points<\/span>.*?class="age"><a\shref="(.*?)"/ig;

      // Finding successive matches. ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      let regRes;
      while( (regRes = regExp.exec(html)) !== null ) {
        linkArray.push({
          url: `https://news.ycombinator.com/${regRes[3]}`,
          title: `${regRes[1]}`,
          score: regRes[2],
        });
      }

      // find 10 links with most points
      const newLinkArray = linkArray
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      // console.log(newLinkArray);
      console.log('HN linkArray.length', newLinkArray.length);

      new DailyHeadline({  
        site: 'HN',
        date: date,
        headlines: newLinkArray
      }).save()

    })
    .catch( res => {throw res;} );
}

export default getHN;
