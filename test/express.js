const expect = require('chai').expect;
const server = require('../src/server');


describe('Initialize Express', () => {
    //Initialize Express
    it('should initialize the Express application', ()=> {
      expect(server).to.not.be.null;
    });
    it('should have a port property', ()=> {
      expect(server.get('port')).to.equal(3000);
    });
});
