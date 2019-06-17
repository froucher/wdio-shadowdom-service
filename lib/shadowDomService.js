const commands = require('./commands');

class ShadowDomService {
  onPrepare(config, caps) {
    config.overwrite = config.shadowDom && config.shadowDom.overwrite;
  }
}

module.exports = ShadowDomService;