/* eslint-env node */
/* eslint-disable no-unused-vars */
'use strict';
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

  var pageForm = document.querySelector('.form__card');
  var pagePhoneInput = pageForm.querySelector('[name=phone]');
  var pageEmailInput = pageForm.querySelector('[name=email]');
  var pageFormSubmit = pageForm.querySelector('[type=submit]');

  var buyPopup = document.querySelector('.buy-popup');
  var popupForm = buyPopup.querySelector('.buy-popup__form');
  var popupPhoneInput = buyPopup.querySelector('[name=phone]');
  var popupEmailInput = buyPopup.querySelector('[name=email]');
  var popupSubmitButton = popupForm.querySelector('.buy-popup__button');
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
      popupPhoneInput.focus();

      if (phoneStorage) {
        popupPhoneInput.value = phoneStorage;
        popupEmailInput.focus();
      }

      if (emailStorage) {
        popupEmailInput.value = emailStorage;
        popupSubmitButton.focus();
      }
    });
  });


  var check = function (form) {
    var inputs = form.querySelectorAll('input');
    var labels = form.querySelectorAll('label');
    var valid = true;

    labels.forEach(function (el) {
      el.classList.remove('invalid');
    });

    inputs.forEach(function (el, index) {
      if (!el.checkValidity()) {
        labels[index].classList.add('invalid');
        el.focus();
        valid = false;
      }
    });
    return valid;
  };

  popupSubmitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (check(popupForm)) {
      localStorage.setItem('phone', popupPhoneInput.value);
      localStorage.setItem('email', popupEmailInput.value);
      closeModal(buyPopup);
      openModal(successPopup);
    }
  });

  pageFormSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (check(pageForm)) {
      localStorage.setItem('phone', pagePhoneInput.value);
      localStorage.setItem('email', pageEmailInput.value);
      openModal(successPopup);
    }
  });
})();
