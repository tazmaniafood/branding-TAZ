// ==========================================================
// Guía de marca v1.1 · interacciones
// Patrones: delegación de eventos con data-action, estado
// visual en data-state / aria-*, código defensivo (todo se
// verifica antes de usarse) y sin variables globales.
// ==========================================================

(function () {
  "use strict";

  // ---------- Estado (solo datos) ----------
  var TONES = {
    costeno: {
      answer: "¡Eche, ya va saliendo eso rebosao! Prepárate, mi llave.",
      note: "Con el costeño, el acento completo y sin explicar nada."
    },
    latino: {
      answer: "¡Tu pedido ya va en camino, bien rebosadito como en la Costa!",
      note: "Con el latino, español cercano y el toque costeño a la vista."
    },
    gringo: {
      answer: "Your order is on its way, rebosao (loaded) the costeño way. ¡Buen provecho!",
      note: "Con el gringo, inglés cálido con la palabra costeña y su traducción."
    }
  };

  var QUESTIONS = {
    costeno: "¿Ya va saliendo mi pedido?",
    latino: "¿Ya va saliendo mi pedido?",
    gringo: "Is my order on the way?"
  };

  // ---------- Utilidades ----------
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  // ---------- Toast (feedback inmediato) ----------
  var toastTimer = null;

  function showToast(message) {
    var toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.setAttribute("data-state", "visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.removeAttribute("data-state");
    }, 2000);
  }

  // ---------- Acciones ----------
  function toggleValue(button) {
    var item = button.closest(".value");
    var panelId = button.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;
    if (!item || !panel) return;

    var willOpen = item.getAttribute("data-state") !== "open";
    item.setAttribute("data-state", willOpen ? "open" : "closed");
    button.setAttribute("aria-expanded", String(willOpen));
    panel.hidden = !willOpen;
  }

  function setTone(button, moveFocus) {
    var key = button.getAttribute("data-tone");
    var tone = TONES[key];
    var chat = $("#chat");
    if (!tone || !chat) return;

    $all('[data-action="set-tone"]').forEach(function (tab) {
      var selected = tab === button;
      tab.setAttribute("aria-selected", String(selected));
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });

    chat.setAttribute("data-tone", key);
    chat.setAttribute("aria-labelledby", button.id);

    var question = $('[data-slot="question"]', chat);
    var answer = $('[data-slot="answer"]', chat);
    var note = $('[data-slot="note"]');

    if (question) question.textContent = QUESTIONS[key];
    if (answer) {
      answer.textContent = tone.answer;
      answer.classList.remove("is-new");
      // Forzar reflujo para reiniciar la animación de llegada
      void answer.offsetWidth;
      answer.classList.add("is-new");
    }
    if (note) note.textContent = tone.note;
    if (moveFocus) button.focus();
  }

  function copyColor(button) {
    var hex = button.getAttribute("data-hex");
    var name = button.getAttribute("data-name") || "Color";
    if (!hex) return;

    function done(copied) {
      showToast(copied ? name + " copiado: " + hex : name + ": " + hex);
      button.setAttribute("data-state", "copied");
      window.setTimeout(function () {
        button.removeAttribute("data-state");
      }, 1200);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).then(
        function () { done(true); },
        function () { done(false); }
      );
    } else {
      done(false);
    }
  }

  var ACTIONS = {
    "toggle-value": toggleValue,
    "set-tone": function (el) { setTone(el, false); },
    "copy-color": copyColor
  };

  // ---------- Delegación de eventos ----------
  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var handler = ACTIONS[target.getAttribute("data-action")];
    if (handler) handler(target, event);
  });

  // Flechas del teclado en las pestañas de tono (patrón tablist)
  document.addEventListener("keydown", function (event) {
    var tab = event.target.closest('[data-action="set-tone"]');
    if (!tab) return;
    var tabs = $all('[data-action="set-tone"]');
    var index = tabs.indexOf(tab);
    var next = null;

    if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
    if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === "Home") next = tabs[0];
    if (event.key === "End") next = tabs[tabs.length - 1];

    if (next) {
      event.preventDefault();
      setTone(next, true);
    }
  });

  // ---------- Menú de secciones: se abre una a la vez ----------
  var DEFAULT_SECTION = "alma";

  function sectionTabs() {
    return $all('.menu__tab[data-action="show-section"]');
  }

  function showSection(id, options) {
    var opts = options || {};
    var panel = id ? document.getElementById(id) : null;
    if (!panel || panel.getAttribute("role") !== "tabpanel") return;

    $all('.chapter[role="tabpanel"]').forEach(function (section) {
      var active = section === panel;
      section.hidden = !active;
      section.classList.remove("is-entering");
    });

    sectionTabs().forEach(function (tab) {
      var selected = tab.getAttribute("data-target") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.setAttribute("tabindex", selected ? "0" : "-1");
      if (selected && opts.focusTab) tab.focus();
    });

    // Reiniciar la animación de entrada
    void panel.offsetWidth;
    panel.classList.add("is-entering");

    if (opts.updateHash !== false && window.history && history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }

    // El menú vive arriba y es pegajoso: bajamos al inicio del contenido,
    // dejando espacio para la carpa y su faldón.
    if (opts.scroll) {
      var main = $("#contenido");
      var menu = $(".menu");
      if (main) {
        var offset = (menu ? menu.offsetHeight : 0) + 30;
        var top = main.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      }
    }
  }

  ACTIONS["show-section"] = function (el, event) {
    if (event) event.preventDefault();
    var fromHero = !el.classList.contains("menu__tab");
    showSection(el.getAttribute("data-target"), { scroll: true, fromHero: fromHero });
  };

  // Flechas del teclado en el menú (patrón tablist)
  document.addEventListener("keydown", function (event) {
    var tab = event.target.closest(".menu__tab");
    if (!tab) return;
    var tabs = sectionTabs();
    var index = tabs.indexOf(tab);
    var next = null;

    if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
    if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === "Home") next = tabs[0];
    if (event.key === "End") next = tabs[tabs.length - 1];

    if (next) {
      event.preventDefault();
      showSection(next.getAttribute("data-target"), { focusTab: true });
    }
  });


  // Carrusel de neones: cambia de figura cada 4 s (quieto si se pide menos movimiento)
  $all(".carrusel").forEach(function (carrusel) {
    var items = $all(".carrusel__item", carrusel);
    if (!items.length) return;
    var actual = 0;
    items[0].classList.add("is-on");
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (items.length < 2 || quieto) return;
    setInterval(function () {
      items[actual].classList.remove("is-on");
      actual = (actual + 1) % items.length;
      items[actual].classList.add("is-on");
    }, 4000);
  });

  // Al cargar: abrir la sección del enlace (#valores) o la primera
  var initial = (window.location.hash || "").slice(1);
  if (!document.getElementById(initial)) initial = DEFAULT_SECTION;
  showSection(initial, { updateHash: false });

  window.addEventListener("hashchange", function () {
    var id = (window.location.hash || "").slice(1);
    if (document.getElementById(id)) showSection(id, { updateHash: false, scroll: true });
  });
})();
