// ==========================================================
// Guía de marca v0.6 · interacciones
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
    if (handler) handler(target);
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

  // ---------- Índice: marcar el capítulo visible ----------
  var links = $all(".index__list a");
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (link) {
      var id = (link.getAttribute("href") || "").slice(1);
      if (id) byId[id] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.removeAttribute("aria-current"); });
        var active = byId[entry.target.id];
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-35% 0px -60% 0px" });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
