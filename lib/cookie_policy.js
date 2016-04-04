"use strict";

var service = require("sdk/preferences/service");
var policyKey = "network.cookie.cookieBehavior";

exports.keepUntilClosed = function() {
  return service.get(policyKey) == 3;
}

exports.setPolicy = function(value) {
  return service.set(policyKey, value);
}

exports.resetPolicy = function() {
  return service.reset(policyKey);
}
