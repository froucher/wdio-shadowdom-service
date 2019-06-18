const expect = require('chai').expect;

describe('LWC recipes with Webdriver.io v4 and async', function() {
  it('should Hello Recipe works', function() {
    browser.url('https://recipes.lwc.dev');
    browser.setWindowSize(1200, 600);
    browser.shadow$('ui-navbar a[title*="Hello"]').click();
    browser.shadow$('recipe-hello ui-card div')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.contain('Hello, World!'); return r.value; } )
      .catch(e => { console.log(e); throw e; } );
  });
});
