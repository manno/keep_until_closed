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

// tabchanged? -> updateIcon
// urlchanged? -> updateIcon
tabs.on("ready", tabUpdated);

function tabUpdated(tab) {
  console.log(tab.url);
  currentUrl = tab.url;
  updateIcon();
}


function main() {
  if(!checkSettings()) {
    displaySettingsWarning();
  }
  updateIcon();
}

// warn if setting is not on keep until closed
function checkSettings() {
  return cookiePreferences.keepUntilClosed() === true;
}

// TODO print warning instead
function displaySettingsWarning() {
  console.log('Forcing cookie policy to keep until closed');
  cookiePreferences.setKeepUntilClosed();
}

// button to toggle allow for current url
function toggleCookieAllow() {
  if(cookieExceptions.hasSite(currentUrl)) {
    cookieExceptions.removeSite(currentUrl);
  } else {
    cookieExceptions.allowSite(currentUrl);
  }
  updateIcon();
}

// different icon if url is allow in exception list
function updateIcon() {
  console.log(cookieExceptions.hasSite(currentUrl));
  button.state("tab", {icon: cookieExceptions.hasSite(currentUrl) ? './icon-on-16.png' : './icon-off-16.png'});
}
