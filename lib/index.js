const Nightmare = require('nightmare');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require('jquery');
const util = require('util');
const debuglog = util.debuglog('nightbot');

module.exports = function() {
  return this;
};

/**
 * Executes nightbot!
 *
 * @param {Object} - params:
 *  - program {Array} - Definition of NightmareJS operation. @see https://github.com/segmentio/nightmare
 *  - selector {String} - A selector string to get elements
 *  - result {String} - [OPTIONAL] Result's type. If set "jquery", returns a result as jquery object. 
 *      Defaults to null, which returns `jsdom` object.
 *  - nightmareOptions {Object} - [OPTIONAL] Options for NightmareJS. @see https://github.com/segmentio/nightmare
 *  - newInstance {Boolean} - [OPTIONAL] Whether creates new NightmareJS instance or not. defaults to false.
 *      but even if set `false`, creates new instance on the case that it has not been created yet.
 *
 */
module.exports.execute = function({
  program = [],
  selector = "title",
  result = null,
  nightmareOptions = { show: false },
  newInstance = false,
}, cb) {
  const self = this;
  self.program = program;
  self.selector = selector;
  self.result = result;
  self.nightmareOptions = nightmareOptions;
  self.newInstance = newInstance;
  if (process.env.NODE_DEBUG == "nightbot") process.on('unhandledRejection', debuglog);
  if (!Array.isArray(self.program) || self.program.length <= 0) throw Error('`program` option as array must be set');
  if (self.newInstance === true || !self.nightmare) {
    debuglog("create new nightmare instance");
    self.nightmare = Nightmare(self.nightmareOptions);
  }

  _execute({
    program: self.program,
    nightmare: self.nightmare,
  }, (err, html) => {
    debuglog("execute result:", err, html);
    let ret = convertResult(html, self.selector, self.result);
    return cb && cb(err, ret);
  });
};

async function _execute({
  program,
  nightmare,
}, cb) {
  let p, cmd, opts, ret;
  for (let len = program.length, i = 0; i < len; i++) {
    p = program[i];
    cmd = p[0];
    opts = p.slice(1);
    debuglog("invoking:", cmd, opts);
    await nightmare[cmd].apply(nightmare, opts);
  }
  nightmare
    .evaluate(function() {
      return document.documentElement.outerHTML;
    })
    .end()
    .then((html) => {
      return cb & cb(null, html);
    })
    .catch((err) => {
      return cb & cb(err);
    });
};

function convertResult(html, selector, result) {
  let dom = new JSDOM(html);
  if (result == "jquery") { // ** converts to jquery object
    return jquery(dom.window)(selector);
  }
  return dom.window.document.querySelectorAll(selector);
}