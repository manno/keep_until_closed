"use strict";

var service = require("sdk/preferences/service");
var policyKey = "network.cookie.lifetimePolicy";

const UNTIL_CLOSE = 2;

exports.keepUntilClosed = function() {
  return service.get(policyKey) == UNTIL_CLOSE;
};

exports.setKeepUntilClosed = function() {
  return service.set(policyKey, UNTIL_CLOSE);
};

exports.resetLifetimePolicy = function() {
  return service.reset(policyKey);
};
