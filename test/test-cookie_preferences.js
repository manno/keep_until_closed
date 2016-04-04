"use strict";

let { before, after } = require('sdk/test/utils');
var cookiePreferences = require("../lib/cookie_preferences");

exports["test lifetime policy"] = function(assert, done) {
  assert.ok((cookiePreferences.keepUntilClosed() === false), "Cookie Preferences is not keepUntilClosed");
  done();
};

exports["test lifetime policy set"] = function(assert, done) {
  cookiePreferences.setKeepUntilClosed();
  assert.ok((cookiePreferences.keepUntilClosed() === true), "Cookie Preferences is keepUntilClosed");
  done();
};

before(exports, function (name, assert) {
  cookiePreferences.resetLifetimePolicy();
});

require("sdk/test").run(exports);
