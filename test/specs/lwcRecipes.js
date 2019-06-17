const expect = require('chai').expect;

describe('LWC recipes with Webdriver.io v4 and async', function() {
  it('should Hello Recipe works', function() {
    return browser.url('https://recipes.lwc.dev')
      .setViewportSize({
        width: 1200,
        height: 600,
      })
      .shadow$('ui-navbar a[title*="Hello"]')
      .click()
      .shadow$('recipe-hello ui-card div')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.contain('Hello, World!'); return r.value; } )
      .catch(e => { console.log(e); throw e; } );
  });
  it('should Calculate Monthly Payment', function() {
    return browser.url('https://recipes.lwc.dev/#misc')
      .setViewportSize({
        width: 1200,
        height: 600,
      })
      .shadow$('ui-navbar a[title*="Misc"]')
      .click()
      .shadow$('ui-input input')
      .setValue(1000000)
      .shadow$('ui-select select')
      .selectByVisibleText('30 years')
      .shadow$('ui-input:nth-of-type(2) input')
      .setValue(5)
      .shadow$('ui-button')
      .click()
      .shadow$('ui-output')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.contain('USD 5368.22'); return r.value; } )
      .catch(e => { console.log(e); throw e; } );
  });
  it('should Checkbox works', function() {
    return browser.url('https://recipes.lwc.dev/#misc')
      .setViewportSize({
        width: 1200,
        height: 600,
      })
      .shadow$('ui-navbar a[title*="Misc"]')
      .click()
      .shadow$('recipe-misc-dom-query:last-of-type recipe-view-source')
      .shadowExecute(r => r.scrollIntoView())
      .shadow$('ui-input:nth-of-type(2) span.checkbox')
      .shadowExecute(r => r.click())
      .shadow$('recipe-misc-dom-query:last-of-type p')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.contain('Checked items: Category 2'); return r.value; } )
      .catch(e => { console.log(e); throw e; } );
  });
});