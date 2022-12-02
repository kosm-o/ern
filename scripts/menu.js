document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("toggle-menu").onclick = function () {
      toggle_menu();
    };

    document.querySelectorAll(".nav-button").forEach(function (el) {
      el.onclick = function () {
        this.parentNode.parentNode.classList.toggle("closed");
      };
    });
  },
  false
);

function toggle_menu() {
  document.getElementById("desktop-menu").classList.toggle("menu-hidden");
}
