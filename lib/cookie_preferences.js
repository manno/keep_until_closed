"use strict";

var service = require("sdk/preferences/service");
//var behaviourKey = "network.cookie.cookieBehavior"; // 3 from visited
var policyKey = "network.cookie.lifetimePolicy"; // 2

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
