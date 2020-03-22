/* eslint-env node */
/* eslint-disable no-unused-vars */
'use strict';
// >>>>>>>>>>>>>>>>>>>>>>>>>> главное меню <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

(function () {
  var menuButton = document.querySelector('.header__menu-btn');
  var menuItems = document.querySelector('.header__wrapper');
  var menuClose = document.querySelector('.header__close');

  var enable = function () {
    menuButton.classList.remove('header__menu-btn--hidden');
    menuItems.classList.add('header__wrapper--js');
    menuItems.classList.add('header__wrapper--hidden');
    menuClose.classList.add('header__close--js');
  };

  var onClickRemoveMenu = function () {
    menuButton.classList.remove('header__menu-btn--hidden');
    menuItems.classList.add('header__wrapper--hidden');
    menuClose.removeEventListener('click', onClickRemoveMenu);
  };

  var onClickShowMenu = function () {
    menuButton.classList.add('header__menu-btn--hidden');
    menuItems.classList.remove('header__wrapper--hidden');
    menuClose.addEventListener('click', onClickRemoveMenu);
  };

  enable();
  menuButton.addEventListener('click', onClickShowMenu);
})();

// >>>>>>>>>>>>>>>>>>>>>>>>>> переключение табов >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

(function () {
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
})();

// >>>>>>>>>>>>>>>>>>>>>>>>>> открытие и закрытие модального окна>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

(function () {
  var buyNowButtons = document.querySelectorAll('.buy-now');
  var siteBody = document.querySelector('body');
  var siteFormButton = document.querySelector('.form__button');

  var buyPopup = document.querySelector('.buy-popup');
  var form = buyPopup.querySelector('.buy-popup__form');
  var phoneInput = buyPopup.querySelector('[name=phone]');
  var emailInput = buyPopup.querySelector('[name=email]');
  var submitButton = buyPopup.querySelector('.buy-popup__button');
  var popupCloseBtn = buyPopup.querySelector('.buy-popup__close');

  var successPopup = document.querySelector('.thanks-popup');
  var successCloseBtn = successPopup.querySelector('.thanks-popup__close');

  var phoneStorage = localStorage.getItem('phone');
  var emailStorage = localStorage.getItem('email');

  var closeModal = function (modal) {
    modal.classList.add('visually-hidden');
    siteBody.classList.remove('blocked-scrolling');
    removeListeners();
  };

  var openModal = function (modal) {
    modal.classList.remove('visually-hidden');
    siteBody.classList.add('blocked-scrolling');
    addListeners();
  };

  var onEscPressRemove = function (evt) {
    if (evt.keyCode === 27) {
      closeModal(buyPopup);
      closeModal(successPopup);
      removeListeners();
    }
  };

  var onClickRemove = function (evt) {
    if (evt.target === popupCloseBtn || evt.target === buyPopup) {
      closeModal(buyPopup);
    }

    if (evt.target === successCloseBtn || evt.target === successPopup) {
      closeModal(successPopup);
    }
  };

  var addListeners = function () {
    document.addEventListener('keydown', onEscPressRemove);
    document.addEventListener('click', onClickRemove);
  };

  var removeListeners = function () {
    document.removeEventListener('keypress', onEscPressRemove);
    document.removeEventListener('click', onClickRemove);
  };

  buyNowButtons.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal(buyPopup);
      phoneInput.focus();

      if (phoneStorage) {
        phoneInput.value = phoneStorage;
        emailInput.focus();
      }

      if (emailStorage) {
        emailInput.value = emailStorage;
        submitButton.focus();
      }
    });
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    localStorage.setItem('phone', phoneInput.value);
    localStorage.setItem('email', emailInput.value);
    closeModal(buyPopup);
    openModal(successPopup);
  });

  siteFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal(successPopup);
  });
})();

// >>>>>>>>>>>>>>>>>>>>>>> плавный скролл <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

(function () {
  var SmoothScroll = require('smooth-scroll');
  var smoothScroll = new SmoothScroll('a[href*="#"]');
})();

// // >>>>>>>>>>>>>>>>>>>>>>> svg в ie 11 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

(function () {
  var svg4everybody = require('svg4everybody');
  svg4everybody();
})();
