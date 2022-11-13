document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("toggle-menu").onclick = function () {
      toggle_menu();
    };
  },
  false
);

function toggle_menu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}
