var self = require("sdk/self");
var cookieExceptions = new (require("lib/cookie_exceptions").CookieExceptions)();
var cookiePolicy = require("lib/cookie_policy");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "keep-link",
  label: "Allow Cookies?",
  icon: "./icon-16.png",
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("https://www.mozilla.org/");
}


// warn if setting is not on keep until closed
function checkSettings() {
  cookiePolicy.keepUntilClosed() == true
}

function displaySettingsWarning() {
}

function setup() {
  checkSettings();
}

// button to toggle allow for current url
function toggleCookieAllow() {
}
// button to toggle allow for current url glob

// different icon if url is allow in exception list
function updateIcon() {
}

// var currentTab;
// var currentBookmark;

/*
 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 */
// function updateIcon() {
//   chrome.browserAction.setIcon({
//     path: currentBookmark ? {
//       19: "icons/star-filled-19.png",
//       38: "icons/star-filled-38.png"
//     } : {
//       19: "icons/star-empty-19.png",
//       38: "icons/star-empty-38.png"
//     },
//     tabId: currentTab.id
//   });
// }

/*
 * Add or remove the bookmark on the current page.
 */
// function toggleBookmark() {
//   if (currentBookmark) {
//     chrome.bookmarks.remove(currentBookmark.id);
//     currentBookmark = null;
//     updateIcon();
//   } else {
//     chrome.bookmarks.create({title: currentTab.title, url: currentTab.url}, function(bookmark) {
//       currentBookmark = bookmark;
//       updateIcon();
//     });
//   }
// }

// chrome.browserAction.onClicked.addListener(toggleBookmark);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
// function updateTab() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     if (tabs[0]) {
//       currentTab = tabs[0];

//       chrome.bookmarks.search({url: currentTab.url}, (bookmarks) => {
//         currentBookmark = bookmarks[0];
//         updateIcon();
//       });
//     }
//   });
// }

// // TODO listen for bookmarks.onCreated and bookmarks.onRemoved once Bug 1221764 lands

// // listen to tab URL changes
// chrome.tabs.onUpdated.addListener(updateTab);

// // listen to tab switching
// chrome.tabs.onActivated.addListener(updateTab);

// // update when the extension loads initially
// updateTab();
