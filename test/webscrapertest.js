const expect = require('chai').expect;

const cheerio = require('cheerio');
const webScraper = require('../modules/webscraper/webscraper');

describe('Web Scraper', () => {
  it('should return a jQuery document object from url', (done) => {
    let url = "http://google.com";
    let $ = cheerio.load(url);
    webScraper.getDocument(url).then((res) => {
      expect(res).to.not.be.null;
      done();
    }, (rej) => {
      expect(rej).to.be.null;
    });
  });
  it('should parse a BBC site', (done) => {
    let $ = cheerio.load("http://www.thedoctorwhosite.co.uk/doctorwho/episodes/series-one");
    webScraper.getBBCData($)
  })
});
