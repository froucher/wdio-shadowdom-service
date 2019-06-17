const commands = require('./commands');

class ShadowDomService {
  onPrepare(config, caps) {
    //console.log('onPrepare!');
    this.overwrite = config.shadowDom && config.shadowDom.overwrite;
  }

  before(caps) {
    //console.log('before!');
    commands.init(browser, this.overwrite);
  }
}

module.exports = ShadowDomService;