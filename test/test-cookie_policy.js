"use strict";

let { before, after } = require('sdk/test/utils');
var cookiePolicy = require("../lib/cookie_policy");

exports["test policy"] = function(assert, done) {
  assert.ok((cookiePolicy.keepUntilClosed() === false), "Cookie Policy is not keepUntilClosed");
  done();
};

exports["test policy set"] = function(assert, done) {
  cookiePolicy.setPolicy(3);
  assert.ok((cookiePolicy.keepUntilClosed() === true), "Cookie Policy is keepUntilClosed");
  done();
};

before(exports, function (name, assert) {
  cookiePolicy.resetPolicy();
});

require("sdk/test").run(exports);
