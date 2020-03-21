'use strict';
// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');

// pageHeader.classList.remove('page-header--nojs');

// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });

var tabs = document.querySelectorAll('.country__tab');
var sections = document.querySelectorAll('.country__details');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function (evt) {
    evt.preventDefault();
    removeActiveTab();
    addActiveTab(tab);
  });
});

var removeActiveTab = function () {
  tabs.forEach(function (tab) {
    tab.classList.remove('country__tab--active');
  });
  sections.forEach(function (section) {
    section.classList.remove('country__details--active');
  });
};

var addActiveTab = function (tab) {
  tab.classList.add('country__tab--active');
  var href = tab.getAttribute('href');
  var matchingSection = document.querySelector(href);
  matchingSection.classList.add('country__details--active');
};
