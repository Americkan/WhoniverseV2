const http = require('http');
const request = require('request');
const cheerio = require('cheerio');

/**
* @name getDocument
* @param {string} a url
* @returns Promise
* @overview
* Sends a GET response for the supplied url
* Loads the response as a jQuery Document Object
*/
const getDocument = (url) => {
  return new Promise(function(resolve, reject) {
    request(url, (err, response, body) => {
      if (err) reject(err);
      if (response.statusCode == 200 && body) {
        resolve(cheerio.load(body));
      } else {
        reject(body);
      }
    });
  });
}

/*
* Each call to getBBCData
* returns data of an entire series
*/
const getBBCData = ($) => {
  return new Promise(function(resolve, reject) {

    let episodeCount = 0; //to control dom querying
    let episodeData = {}; //episode data as per the bbc site

    let episodeTitles = []; //
    let seasonData = [];
    let planetList = [];
    //Get Episode Titles
    $('h3').each(function() {
      episodeTitles.push($(this).text());
    });
    //Iterate through each box-content
    //element querying the list imtes
    let listItemIndex = 0;
    $('.box-content ul li').each(function(index) {
      switch (listItemIndex) {
        case 0:
        //number of episodes
          break;
        case 1:
        // Doctor
          episodeData['doctor'] = splitBBCListItem($(this).text());
          break;
        case 2:
        // Companions
          episodeData['companions'] = splitBBCListItem($(this).text());
          break;
        case 3:
        //Aliens
          episodeData['aliens'] = splitBBCListItem($(this).text());
          break;
        case 4:
        //Planet
          episodeData['planet'] = splitBBCListItem($(this).text());
          if (planetList.indexOf(episodeData['planet']) <= -1) {
            planetList.push(episodeData['planet']);
          }
          break;
        default:
          console.log("ERROR");
          break;
      }
      if (listItemIndex >= 4) {
        episodeData['title'] = episodeTitles.shift();
        seasonData.push(episodeData);
        listItemIndex = 0;
      } else {
        listItemIndex++;
      }
    });
    resolve({seasonData, planetList});
  });
}

const splitBBCListItem = (str) => {
  //Key: Value
  //returns the data
  return str.split(":")[1];
}

exports.getDocument = getDocument;
exports.getBBCData = getBBCData;
