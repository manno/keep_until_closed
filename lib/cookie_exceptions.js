"use strict";

// Shortcuts:
// Cc = Components.classes
// Ci = Components.interfaces
// Cu = Components.utils
// CC = Components.Constructor
var {Cc, Ci} = require("chrome");
var permissionManager = Cc["@mozilla.org/permissionmanager;1"].getService(Ci.nsIPermissionManager);
var ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
const ACCESS_ALLOW = Ci.nsICookiePermission.ACCESS_ALLOW;
const ACCESS_ALLOW_FIRST_PARTY_ONLY = Ci.nsICookiePermission.ACCESS_ALLOW_FIRST_PARTY_ONLY;

function supportedUri(uri) {
  return (uri.scheme == 'https' || uri.scheme == 'http');
}

exports.CookieExceptions = function CookieExceptions() {
};

// add https too if http url is added
exports.CookieExceptions.prototype.allowSite = function(url) {
  var uri;
  try {
    uri = ioService.newURI(url, null, null);
  } catch(e) {
    return;
  }
  if (!supportedUri(uri)) { return; }

  permissionManager.add(uri, "cookie", ACCESS_ALLOW);

  if (uri.scheme == 'http') {
    uri.scheme = 'https';
    permissionManager.add(uri, "cookie", ACCESS_ALLOW);
  }
};

// remove http and https entry
exports.CookieExceptions.prototype.removeSite = function(url) {
  var uri = ioService.newURI(url, null, null);
  if (!supportedUri(uri)) { return; }

  uri.scheme = 'http';
  permissionManager.remove(uri, "cookie");
  uri.scheme = 'https';
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
