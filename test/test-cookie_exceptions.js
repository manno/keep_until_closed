var main = require("../lib/cookie_exceptions").CookieExceptions;

exports["test check"] = function(assert, done) {
  var result = new main().hasSite("http://example.com");
  assert.ok((result == false), "Domain is missing from store");
  done();
};

require("sdk/test").run(exports);
