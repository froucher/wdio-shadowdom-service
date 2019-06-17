const expect = require('chai').expect;

describe('Polymer Shop with Webdriver.io v4 and async', function() {
  it('should add two items to cart', function() {
    return browser.url('https://shop.polymer-project.org')
      .setViewportSize({
        width: 800,
        height: 600,
      })
      .shadow$('div:nth-child(2) > shop-button')
      .click()
      .shadowWaitForValue('shop-list-item shop-image', 5000)
      .shadow$('shop-list-item').click()
      .shadowWaitForValue('shop-detail img', 5000)
      .shadow$('shop-detail')
      .then(r => browser.execute(elem => elem.item.title, r.value))
      .then(r => console.log(`Product Title: ${r.value}`))
      .shadow$('shop-detail shop-button')
      .click()
      .shadow$('#header > app-toolbar > div.cart-btn-container > div')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.equal('1'); return r.value; } )
      .then(t => console.log(`Cart Count: ${t}`))
      .shadow$('shop-detail shop-button')
      .click()
      .shadow$('#header > app-toolbar > div.cart-btn-container > div')
      .then(r => browser.elementIdText(r.value.ELEMENT))
      .then(r => { expect(r.value).to.equal('2'); return r.value; } )
      .then(t => console.log(`Cart Count: ${t}`))
      .catch(e => { console.log(e); throw e; } );
  });
});