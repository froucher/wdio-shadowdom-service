function shadowElement(shadowSelector, multiple, baseElement) {
  function _collectAllElementsDeep(selector = null) {
    const allElements = [];

    const _findAllElements = function(nodes) {
      for (let i = 0, el; el = nodes[i]; ++i) {
        allElements.push(el);

        // If the element has a shadow root, dig deeper.
        if (el.shadowRoot) {
          _findAllElements(el.shadowRoot.querySelectorAll('*'));
        }
      }
    };
    _findAllElements(document.querySelectorAll('*'));
    return selector ? allElements.filter(el => el.matches(selector)) : allElements;
  }

  function _findParentOrHost(element) {
    const parentNode = element.parentNode;
    return parentNode && (parentNode.host && parentNode.tagName !== 'A') ? parentNode.host : parentNode === document ? null : parentNode;
  }

  function _findMatchingElement(splitSelector, possibleElementsIndex) {
    return (element) => {
      let position = possibleElementsIndex;
      let parent = element;
      let foundElement = false;
      while (parent) {
        const foundMatch = parent.matches(splitSelector[position]);
        if (foundMatch && position === 0) {
          foundElement = true;
          break;
        }
        if (foundMatch) {
          position--;
        }
        parent = _findParentOrHost(parent);
      }
      return foundElement;
    };
  }

  function _querySelectorDeep(selector, findMany) {
    let lightElement = document.querySelector(selector);

    if (document.head.createShadowRoot || document.head.attachShadow) {
      // no need to do any special if selector matches something specific in light-dom
      if (!findMany && lightElement) {
        return lightElement;
      }

      // do best to support complex selectors and split the query
      const splitSelector = selector.match(/(([^\s\"']+\s*[,>+~]\s*)+|\'[^']*\'+|\"[^\"]*\"+|[^\s\"']+)+/g);

      const possibleElementsIndex = splitSelector.length - 1;
      const possibleElements = _collectAllElementsDeep(splitSelector[possibleElementsIndex]);
      const findElements = _findMatchingElement(splitSelector, possibleElementsIndex);
      if (findMany) {
        return possibleElements.filter(findElements);
      } else {
        return possibleElements.find(findElements);
      }
    } else {
      if (!findMany) {
        return lightElement;
      } else {
        return document.querySelectorAll(selector);
      }
    }
  }

  function querySelectorAllDeep(selector) {
    return _querySelectorDeep(selector, true);
  }

  function querySelectorDeep(selector) {
    return _querySelectorDeep(selector);
  }

  var result = multiple ? querySelectorAllDeep(shadowSelector)
    : shadowSelector ? querySelectorDeep(shadowSelector) : (baseElement || document.documentElement);
  return result;
}

function s$(shadowSelector) {
  return shadowElement(shadowSelector, false);
}

function s$$(shadowSelector) {
  return shadowElement(shadowSelector, true);
}

module.exports = { search: shadowElement };