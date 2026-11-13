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

    if (opts.scroll) {
      var menu = $(".menu");
      if (menu) {
        var top = menu.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top, behavior: "smooth" });
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

  // ----------------------------------------------------------
  // Marco de fiesta. Cada pieza está colocada a mano:
  // [tipo, x %, y %, ancho rem, giro, color, ¿se ve en celular?]
  // Tipos: e = estrella de cinco puntas, c = chispa de cuatro, sa/sb = serpentina, d = destello, b = bombillo.
  // Regla: todo en los bordes; el centro queda libre para el texto.
  // ----------------------------------------------------------
  var MARCOS = {
    cartel: [
      ["sa", 7, 9, 8, 18, "rosado", 1], ["sb", 92, 9, 7.5, -160, "verde", 1],
      ["sb", 5, 48, 6, -70, "naranja", 0], ["sa", 95, 44, 6, 110, "rosado", 0],
      ["sa", 8, 80, 7.5, -25, "verde", 0], ["sb", 92, 84, 8, 200, "amarillo", 1],
      ["sa", 30, 4, 5, 8, "amarillo", 0], ["sb", 70, 5, 5, -10, "naranja", 0],
      ["e", 15, 21, 2.99, 0, "amarillo", 1], ["e", 85, 23, 2.3, 0, "rosado", 1],
      ["c", 11, 34, 1.65, 0, "verde", 1], ["c", 90, 33, 1.8, 0, "naranja", 1],
      ["e", 14, 60, 1.84, 0, "rosado", 0], ["e", 87, 62, 2.64, 0, "naranja", 0],
      ["c", 4, 67, 1.5, 0, "amarillo", 1], ["c", 96, 70, 1.5, 0, "verde", 1],
      ["e", 22, 90, 1.84, 0, "rosado", 1], ["e", 80, 93, 2.53, 0, "amarillo", 0],
      ["c", 40, 96, 1.5, 0, "verde", 0], ["c", 60, 97, 1.65, 0, "rosado", 0],
      ["c", 4, 22, 1.8, 0, "naranja", 1], ["c", 97, 21, 1.65, 0, "amarillo", 1],
      ["d", 24, 13, 2.86, -25, "amarillo", 0], ["d", 76, 14, 2.86, 25, "verde", 0],
      ["d", 17, 72, 2.6, -115, "amarillo", 0], ["d", 83, 75, 2.6, 115, "rosado", 0],
      ["d", 9, 26, 2.08, -40, "rosado", 1], ["d", 92, 52, 2.08, 70, "amarillo", 0],
      ["b", 4, 39, 0.5, 0, "amarillo", 1], ["b", 97, 58, 0.5, 0, "verde", 1],
      ["b", 30, 92, 0.55, 0, "naranja", 0], ["b", 70, 90, 0.55, 0, "verde", 0],
      ["b", 12, 92, 0.5, 0, "amarillo", 1], ["b", 50, 3, 0.5, 0, "rosado", 0],
      ["b", 7, 58, 0.5, 0, "rosado", 1], ["b", 93, 30, 0.5, 0, "verde", 1],
      ["b", 25, 22, 0.5, 0, "verde", 0], ["b", 75, 25, 0.5, 0, "naranja", 0],
      ["c", 36, 12, 1.4, 0, "rosado", 0], ["c", 64, 10, 1.5, 0, "amarillo", 0],
      ["c", 2, 88, 1.4, 0, "rosado", 1], ["c", 98, 92, 1.4, 0, "naranja", 1],
      ["d", 10, 96, 2.34, -150, "naranja", 0], ["d", 90, 4, 2.34, 30, "amarillo", 0],
      ["sa", 3, 30, 5, 80, "amarillo", 0], ["sb", 97, 70, 5, -100, "rosado", 0]
    ],
    titulo: [
      ["sa", 6, 40, 5.5, 12, "rosado", 0], ["sb", 94, 58, 5.5, -168, "verde", 0],
      ["e", 18, 16, 1.75, 0, "amarillo", 1], ["e", 82, 18, 2.2, 0, "naranja", 1],
      ["c", 4, 80, 1.5, 0, "verde", 0], ["c", 96, 84, 1.65, 0, "rosado", 0],
      ["c", 12, 90, 1.4, 0, "naranja", 0], ["c", 88, 92, 1.5, 0, "amarillo", 0],
      ["d", 14, 50, 2.2, -35, "amarillo", 0], ["d", 86, 44, 2.2, 35, "rosado", 0],
      ["b", 13, 72, 0.45, 0, "naranja", 0], ["b", 88, 32, 0.45, 0, "amarillo", 0],
      ["b", 4, 20, 0.45, 0, "rosado", 1], ["b", 96, 18, 0.45, 0, "verde", 1],
      ["b", 26, 6, 0.45, 0, "verde", 0], ["b", 74, 6, 0.45, 0, "rosado", 0]
    ],
    poster: [
      ["sa", 16, 6, 5, 14, "rosado", 1], ["sb", 84, 7, 5, -14, "verde", 1],
      ["sa", 10, 90, 4.5, -20, "naranja", 1],
      ["e", 10, 20, 1.72, 0, "amarillo", 1], ["c", 90, 22, 1.8, 0, "rosado", 1],
      ["c", 7, 55, 1.5, 0, "verde", 1], ["c", 93, 50, 1.65, 0, "amarillo", 1],
      ["c", 30, 95, 1.5, 0, "amarillo", 1],
      ["d", 26, 16, 1.82, -25, "amarillo", 1], ["d", 74, 16, 1.82, 25, "naranja", 1],
      ["b", 6, 36, 0.4, 0, "rosado", 1], ["b", 94, 36, 0.4, 0, "verde", 1],
      ["b", 8, 72, 0.4, 0, "amarillo", 1], ["b", 50, 4, 0.4, 0, "amarillo", 1]
    ],
    demo: [
      ["sa", 12, 26, 3.4, 15, "rosado", 1], ["sb", 88, 74, 3.4, -165, "verde", 1],
      ["c", 14, 76, 1.65, 0, "amarillo", 1], ["c", 86, 24, 1.8, 0, "naranja", 1],
      ["d", 26, 52, 1.56, -60, "amarillo", 1], ["d", 74, 50, 1.56, 60, "rosado", 1],
      ["b", 5, 50, 0.35, 0, "verde", 1], ["b", 95, 50, 0.35, 0, "amarillo", 1]
    ]
  };

  var SVG_NS = "http://www.w3.org/2000/svg";
  var TIPOS = { e: "estrella", c: "chispa", sa: "serpentina", sb: "serpentina", d: "destello", b: "bombillo" };

  function crearPieza(spec, index) {
    var tipo = spec[0];
    var pieza = document.createElement("span");
    pieza.className = "pieza pieza--" + TIPOS[tipo];
    pieza.style.cssText =
      "--x:" + spec[1] + "%;--y:" + spec[2] + "%;--w:" + spec[3] + "rem;" +
      "--r:" + spec[4] + "deg;--tint:var(--" + spec[5] + ");--i:" + index;
    if (!spec[6]) pieza.setAttribute("data-movil", "no");

    if (tipo === "sa" || tipo === "sb" || tipo === "d") {
      var id = tipo === "d" ? "destello" : tipo === "sa" ? "serpentina-a" : "serpentina-b";
      var svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", tipo === "d" ? "0 0 40 40" : "0 0 120 60");
      var use = document.createElementNS(SVG_NS, "use");
      use.setAttribute("href", "#" + id);
      svg.appendChild(use);
      pieza.appendChild(svg);
    }
    return pieza;
  }

  function pintarMarco(contenedor, nombre) {
    var specs = MARCOS[nombre];
    if (!specs) return;
    var frag = document.createDocumentFragment();
    specs.forEach(function (spec, i) { frag.appendChild(crearPieza(spec, i)); });
    contenedor.appendChild(frag);
  }

  // Cada título de sección lleva su marco
  $all(".chapter__head").forEach(function (head) {
    var marco = document.createElement("div");
    marco.className = "festejo";
    marco.setAttribute("data-festejo", "titulo");
    marco.setAttribute("aria-hidden", "true");
    head.insertBefore(marco, head.firstChild);
  });

  $all("[data-festejo]").forEach(function (el) {
    pintarMarco(el, el.getAttribute("data-festejo"));
  });
  var marcoCartel = $(".festejo[data-festejo='cartel']");
  if (marcoCartel) marcoCartel.classList.add("festejo--bombillos");

  // Al cargar: abrir la sección del enlace (#valores) o la primera
  var initial = (window.location.hash || "").slice(1);
  if (!document.getElementById(initial)) initial = DEFAULT_SECTION;
  showSection(initial, { updateHash: false });

  window.addEventListener("hashchange", function () {
    var id = (window.location.hash || "").slice(1);
    if (document.getElementById(id)) showSection(id, { updateHash: false, scroll: true });
  });
})();
