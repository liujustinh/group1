// Has environment variables
const config = require('../config');

//Include node-fetch used to call api
const fetch = require('node-fetch');


exports.getNews = (req, res, next) => {
    const url = `${config.news_api_host}:${config.news_api_port}/api/v1/news`;
    fetch(url)
        .then(response => response.json())
        .then(results => {
            let allNews = results.newsData;
            allNews.sort((a, b) => {
                a = new Date(a.publishDate);
                b = new Date(b.publishDate);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            let top3news = allNews.splice(0,4);
            res.status(200).send({status: "success", news: top3news});
        })
        .catch(err => {
            res.status(500).send({status: "fail", message : "Server error fetching news"});
        }
    );
}