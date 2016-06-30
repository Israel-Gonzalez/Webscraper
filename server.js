var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

// URL to scrape from
url = 'https://origin-web-scraping.herokuapp.com/';
request(url, function(error, response, body) {
    // Checking to see if any errors occurred
    if (!error) {
        // Utilizing cheerio library on returned html
        var $ = cheerio.load(body);
        // Define variables being scraped
        var name, imageUrl, author, price;
        var json = { name: "", imageUrl: "", author: "", price: "" };

        $('.panel-body').each(function(i, element) {
            var data = $(this);

            name = data.prev().text().trim();
            json.name = name;
            imageUrl = data.children().first().attr('src');
            json.imageUrl = imageUrl;
            author = data.find('p').text();
            json.author = author;
            price = data.children().last().text();
            json.price = price;

            fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err) {
                console.log('File successfully written!');
            })
        })
    }
});
exports = module.exports = app;
