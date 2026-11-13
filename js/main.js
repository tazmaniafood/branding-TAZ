// ==========================================================
// Guía de marca · interacciones
// - Mostrar/ocultar detalle de cada valor
// - Selector de tono (costeño / latino / gringo)
// - Copiar códigos de color
// - Resaltar la sección activa en el menú
// ==========================================================

(function () {
  "use strict";

  // ---------- Valores: ver más / ver menos ----------
  document.querySelectorAll(".value__toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var card = button.closest(".value");
      var isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? "Ver menos" : "Ver más";
    });
  });

  // ---------- Voz: mismo mensaje, tres tonos ----------
  var tones = {
    costeno: {
      text: "¡Eche, ya va saliendo eso rebosao! Prepárate, mi llave.",
      note: "Costeño: el acento completo, sin explicar nada."
    },
    latino: {
      text: "¡Tu pedido ya va en camino, bien rebosadito como en la Costa!",
      note: "Latino: español cercano, con el toque costeño a la vista."
    },
    gringo: {
      text: "Your order is on its way, rebosao (loaded) the costeño way. ¡Buen provecho!",
      note: "Gringo: inglés cálido, con la palabra costeña y su traducción."
    }
  };

  var toneOutput = document.getElementById("tone-output");
  var toneButtons = document.querySelectorAll("[data-tone]");

  function setTone(key) {
    var tone = tones[key];
    if (!tone || !toneOutput) return;
    toneOutput.innerHTML = "";
    toneOutput.appendChild(document.createTextNode("“" + tone.text + "”"));
    var note = document.createElement("small");
    note.textContent = tone.note;
    toneOutput.appendChild(note);
    toneButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.tone === key));
    });
  }

  toneButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      setTone(b.dataset.tone);
    });
  });
  setTone("costeno");

  // ---------- Paleta: copiar código de color ----------
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  document.querySelectorAll(".swatch").forEach(function (swatch) {
    swatch.addEventListener("click", function () {
      var hex = swatch.dataset.hex;
      var name = swatch.dataset.name;
      var done = function () { showToast("¡Copiado! " + name + " " + hex); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).then(done, function () {
          showToast(name + ": " + hex);
        });
      } else {
        showToast(name + ": " + hex);
      }
    });
  });

  // ---------- Menú: resaltar sección activa ----------
  var links = document.querySelectorAll(".nav__links a");
  var sections = Array.prototype.map.call(links, function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (section) {
      if (section) observer.observe(section);
    });
  }
})();
