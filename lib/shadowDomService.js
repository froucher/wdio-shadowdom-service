const commands = require('./commands');

class ShadowDomService {
  onPrepare(config, caps) {
    config.overwrite = config.shadowDom && config.shadowDom.overwrite;
  }

  before(caps) {
    commands.init(browser, this.overwrite);
  }
}

module.exports = ShadowDomService;