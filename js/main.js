(function () {
  'use strict';

  var ESC_KEY = 27;

  function getPopupId(href) {
    var match = href.match(/#popup:(.+)/);
    return match ? 'popup:' + match[1] : null;
  }

  function openPopup(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePopup(popup) {
    popup.hidden = true;
    document.body.style.overflow = '';
  }

  function closeAllPopups() {
    document.querySelectorAll('.popup').forEach(function (p) {
      closePopup(p);
    });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#popup:"]');
    if (link) {
      e.preventDefault();
      var id = getPopupId(link.getAttribute('href'));
      if (id) openPopup(id);
      return;
    }

    if (e.target.closest('[data-popup-close]')) {
      var popup = e.target.closest('.popup');
      if (popup) closePopup(popup);
      return;
    }

    if (e.target.classList.contains('popup__overlay')) {
      closePopup(e.target.closest('.popup'));
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEY) closeAllPopups();
  });

  var burger = document.querySelector('[data-burger]');
  if (burger) {
    burger.addEventListener('click', function () {
      openPopup('popup:burger');
    });
  }

  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Спасибо за заявку!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = origText;
        btn.disabled = false;
        closeAllPopups();
      }, 3000);
    });
  });
})();
