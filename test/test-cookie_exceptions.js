"use strict";

let { before, after } = require('sdk/test/utils');
var cookieExceptions = new (require("../lib/cookie_exceptions").CookieExceptions)();
var domain = "http://example.com";

function checkSite() {
  return cookieExceptions.hasSite(domain);
}

exports["test check"] = function(assert, done) {
  assert.ok((checkSite() == false), "Domain in store");
  done();
};

exports["test allow"] = function(assert, done) {
  cookieExceptions.allowSite(domain);
  assert.ok((checkSite() == true), "Domain added to store");
  done();
};

exports["test remove"] = function(assert, done) {
  cookieExceptions.allowSite(domain);
  cookieExceptions.removeSite(domain);
  assert.ok((checkSite() == false), "Domain removed from store");
  done();
};

before(exports, function (name, assert) {
  cookieExceptions.removeSite(domain);
});

require("sdk/test").run(exports);
