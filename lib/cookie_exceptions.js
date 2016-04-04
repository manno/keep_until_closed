"use strict";

// Shortcuts:
// Cc = Components.classes
// Ci = Components.interfaces
// Cu = Components.utils
// CC = Components.Constructor
var {Cc, Ci} = require("chrome");
//var cookieManager = Cc["@mozilla.org/cookiemanager;1"].getService(Ci.nsICookieManager2);
var permissionManager = Cc["@mozilla.org/permissionmanager;1"].getService(Ci.nsIPermissionManager);
var ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
var ACCESS_ALLOW = Ci.nsICookiePermission.ACCESS_ALLOW;
var ACCESS_ALLOW_FIRST_PARTY_ONLY = Ci.nsICookiePermission.ACCESS_ALLOW_FIRST_PARTY_ONLY;

exports.CookieExceptions = function CookieExceptions() {
};

exports.CookieExceptions.prototype.allowSite = function(url) {
  var uri = ioService.newURI(url, null, null);
  permissionManager.add(uri, "cookie", ACCESS_ALLOW);
};

// TODO handle https/http and use domain instead of url
exports.CookieExceptions.prototype.removeSite = function(url) {
  var uri = ioService.newURI(url, null, null);
  permissionManager.remove(uri, "cookie");
};

exports.CookieExceptions.prototype.hasSite = function(url) {
  try {
    var uri = ioService.newURI(url, null, null);
    var perm = permissionManager.testPermission(uri, "cookie");
    return (perm == ACCESS_ALLOW || perm == ACCESS_ALLOW_FIRST_PARTY_ONLY);
  } catch (e) {
    return false;
  }
};
