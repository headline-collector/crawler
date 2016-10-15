module.exports = [
  {
    site: v2ex,
    url: 'https://www.v2ex.com/?tab=hot',
    regExp: /item_title.*href="(.*)">(.*)<\/a>[\w\W]*?count_livid">(\d{1,6})<\/a>/
  },
  {
    site: reddit_programming,
    url: 'https://www.reddit.com/r/programming/top',
    regExp: /class="score unvoted">(\d{0,7})<\/div>.*?title\smay-blank.*?href=".*?".*?>(.*?)<\/a>.*?class="first"><a\shref="(.*?)"/
  }
]
