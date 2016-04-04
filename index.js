"use strict";

var self = require("sdk/self");
var cookieExceptions = new (require("lib/cookie_exceptions").CookieExceptions)();
var cookiePreferences = require("lib/cookie_preferences");

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var currentUrl = "";

var button = buttons.ActionButton({
  id: "keep-link",
  label: "Allow Cookies?",
  icon: "./icon-off-16.png",
  onClick: toggleCookieAllow
});

tabs.on("ready", tabUpdated);

function tabUpdated(tab) {
  currentUrl = tab.url;
  updateIcon();
}

function main() {
  if(!checkSettings()) {
    displaySettingsWarning();
  }
  updateIcon();
}

function checkSettings() {
  return cookiePreferences.keepUntilClosed() === true;
}

function displaySettingsWarning() {
  console.warn('This addon will not work as expected unless the cookie lifetime policy is set to "keep until closed"');
}

function toggleCookieAllow() {
  if(cookieExceptions.hasSite(currentUrl)) {
    cookieExceptions.removeSite(currentUrl);
  } else {
    cookieExceptions.allowSite(currentUrl);
  }
  updateIcon();
}

// different icon if url is in exception list
function updateIcon() {
  console.log(cookieExceptions.hasSite(currentUrl));
  button.state("tab", {icon: cookieExceptions.hasSite(currentUrl) ? './icon-on-16.png' : './icon-off-16.png'});
}
