/**
* Seed
* Contains functionality to creating the initial database
* and seeding all data
*/


const webScraper = require('../modules/webscraper/webscraper');

const Planet = require('../modules/planets/server/models/planet.server.model');

const Doctor = require('../modules/doctors/server/models/doctor.server.model');

const db = require('../config/database');

const colors = require('colors');


/**
* @name init
* @param none
* @returns None
* @overview
* init is the main entry point for the seed data script
* a list of urls to be scraped is initialized and each url
* is then sent to be scraped
*/
const init = () => {
  const episodeGuideURLs = [
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-one',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-two/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-three/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-four/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-five/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-six/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-seven/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-eight/',
    'http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-nine/'
  ];
  beginWebScraping(episodeGuideURLs);
};

/**
* @name beginWebScraping
* @param {array} list of urls to be scraped
* @overview
* For each given url send a GET request
* and consume response as a jQuery Document object
*/
const beginWebScraping = (urls) => {
  urls.forEach((url) => {
    webScraper.getDocument(url).then(($) => {
      parseResponse($);
    }, (err) => {
      throw err;
    });
  });
};

/**
* @name parseResponse
* @param {Object} jquery Document Object
* @overview Send body respones to web scraper
*/
const parseResponse = ($) => {
  //TODO
  webScraper.getBBCData($).then((returnObj) => {

    /*
    *{ doctor: ' 9th Doctor',
      companions: ' Rose, Jack, Mickey',
      aliens: ' Daleks',
      planet: ' Satellite Five, Earth',
      episodeTitle: 'Bad Wolf/The Parting of the Ways' }
    */

    createPlanets(returnObj.planetList);

  },(err) => {
    throw err;
  });
};


const generatePlanetObjects = (listOfPlanets) => {

}

module.exports = generatePlanetObjects;
module.exports = init();
