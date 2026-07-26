/**
 * main.js
 * JavaScript puro para el sitio de Dsolcam.
 * Responsabilidades:
 *  - Selector de idioma (ES/EN) con persistencia en localStorage
 *  - Menú de navegación accesible en móviles
 *  - Visor modal de capturas con atrapado de foco
 *  - Marca el año actual en el pie de página
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dsolcam-lang";
  var SUPPORTED_LANGS = ["es", "en"];
  var FALLBACK_LANG = "es";

  /* ---------------------------------------------------------------
     1. Selector de idioma
     --------------------------------------------------------------- */
  function detectInitialLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (err) {
      /* localStorage puede no estar disponible; se ignora silenciosamente */
    }

    var browserLang = (navigator.language || navigator.userLanguage || FALLBACK_LANG).slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.indexOf(browserLang) !== -1 ? browserLang : FALLBACK_LANG;
  }

  function applyTranslations(lang) {
    var dict = (window.DSOLCAM_I18N && window.DSOLCAM_I18N[lang]) || {};

    document.documentElement.setAttribute("lang", lang);

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var key = el.getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var attrEl = attrNodes[j];
      /* formato: data-i18n-attr="aria-label:key1,alt:key2" */
      var pairs = attrEl.getAttribute("data-i18n-attr").split(",");
      for (var k = 0; k < pairs.length; k++) {
        var pair = pairs[k].split(":");
        var attrName = pair[0];
        var attrKey = pair[1];
        if (attrName && attrKey && Object.prototype.hasOwnProperty.call(dict, attrKey)) {
          attrEl.setAttribute(attrName, dict[attrKey]);
        }
      }
    }

    var buttons = document.querySelectorAll(".lang-switch button");
    for (var b = 0; b < buttons.length; b++) {
      var btnLang = buttons[b].getAttribute("data-lang");
      buttons[b].setAttribute("aria-pressed", btnLang === lang ? "true" : "false");
    }
  }

  function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) { return; }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* si el almacenamiento falla, el cambio de idioma sigue funcionando en esta sesión */
    }
    applyTranslations(lang);
  }

  function initLanguageSwitch() {
    var currentLang = detectInitialLang();
    applyTranslations(currentLang);

    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (event) {
        var lang = event.currentTarget.getAttribute("data-lang");
        setLanguage(lang);
      });
    }
  }

  /* ---------------------------------------------------------------
     2. Menú de navegación móvil
     --------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) { return; }

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
     3. Visor modal de galería con atrapado de foco
     --------------------------------------------------------------- */
  function initGalleryModal() {
    var modal = document.querySelector(".modal-overlay");
    if (!modal) { return; }

    var dialog = modal.querySelector(".modal-dialog");
    var modalImg = modal.querySelector("img");
    var modalCaption = modal.querySelector(".modal-caption");
    var closeBtn = modal.querySelector(".modal-close");
    var triggerButtons = document.querySelectorAll(".gallery-item");
    var lastFocusedElement = null;

    function getFocusableElements() {
      return dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    }

    function openModal(triggerBtn) {
      lastFocusedElement = triggerBtn;
      var imgSrc = triggerBtn.getAttribute("data-full") || triggerBtn.querySelector("img").getAttribute("src");
      var imgAlt = triggerBtn.querySelector("img").getAttribute("alt");
      var caption = triggerBtn.getAttribute("data-caption") || "";

      modalImg.setAttribute("src", imgSrc);
      modalImg.setAttribute("alt", imgAlt);
      modalCaption.textContent = caption;

      modal.removeAttribute("hidden");
      closeBtn.focus();
      document.addEventListener("keydown", handleModalKeydown);
    }

    function closeModal() {
      modal.setAttribute("hidden", "");
      document.removeEventListener("keydown", handleModalKeydown);
      if (lastFocusedElement) { lastFocusedElement.focus(); }
    }

    function handleModalKeydown(event) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key === "Tab") {
        var focusable = getFocusableElements();
        if (focusable.length === 0) { return; }
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    for (var i = 0; i < triggerButtons.length; i++) {
      triggerButtons[i].addEventListener("click", function (event) {
        openModal(event.currentTarget);
      });
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) { closeModal(); }
    });
  }

  /* ---------------------------------------------------------------
     4. Reemplazo visual cuando una imagen aún no existe
     --------------------------------------------------------------- */
  function initImageFallbacks() {
    var images = document.querySelectorAll("img[data-fallback-label]");
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("error", function (event) {
        var img = event.currentTarget;
        var placeholder = document.createElement("div");
        placeholder.className = "image-placeholder";
        placeholder.style.width = "100%";
        placeholder.style.height = "100%";
        placeholder.setAttribute("role", "img");
        placeholder.setAttribute("aria-label", img.getAttribute("alt") || "");
        placeholder.textContent = img.getAttribute("data-fallback-label") || "";
        img.replaceWith(placeholder);
      });
    }
  }

  /* ---------------------------------------------------------------
     5. Año actual en el pie de página
     --------------------------------------------------------------- */
  function initFooterYear() {
    var yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ---------------------------------------------------------------
     Inicialización
     --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initLanguageSwitch();
    initMobileMenu();
    initGalleryModal();
    initImageFallbacks();
    initFooterYear();
  });
})();
