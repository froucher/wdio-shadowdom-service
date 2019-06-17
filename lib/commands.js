const shadowElement = require('./shadowElement').search;

function init(browser, overwrite) {
  function noSuchElement(result) {
    return {
      status: 7,
      type: 'NoSuchElement',
      message: 'An element could not be located on the page using the given search parameters.',
      state: 'failure',
      sessionId: result.sessionId,
      value: null,
      selector: result.selector
    };
  }

  function _getLastResult() {
    const lastResult = (this.lastPromise && this.lastPromise.inspect().value)
      ? this.lastPromise.inspect().value.value
      : null;
    return lastResult;
  }

  browser.addCommand('shadowElement', function(selector, multiple) {
    const baseElement = _getLastResult.apply(this);
    return this
      .execute(shadowElement, selector, multiple === true, baseElement)
      .then((result) => {
        const myResult = Object.assign({}, result, { selector: selector });
        return (myResult.value !== null) ? myResult : noSuchElement(myResult);
      });
  });

  browser.addCommand('shadow$', function(selector) {
    return this.shadowElement.apply(this, [selector, false]);
  });

  browser.addCommand('shadow$$', function(selector) {
    return this.shadowElement.apply(this, [selector, true]);
  });

  browser.addCommand('shadowWaitForValue', function(selector, ms) {
    return this
      .waitUntil(() =>
        this.shadowElement(selector)
          .then(r =>
            r.value && r.value.length !== 0
              && browser.elementIdDisplayed(r.value.ELEMENT)
          ), ms);
  });

  browser.addCommand('shadowExecute', function(arg1, arg2) {
    if (typeof arg1 === 'function') {
      const elem = _getLastResult.apply(this);
      return this.execute(arg1, elem);
    } else {
      return this.shadowElement(arg1)
        .then(r => this.execute(arg2, r.value));
    }
  });

  if (overwrite) {
    browser.addCommand('element', function(s) {
      return this.shadowElement(s);
    }, true);

    browser.addCommand('elements', function(s) {
      return this.shadowElement(s, true);
    }, true);
  }

  return browser;
}

module.exports = { init };