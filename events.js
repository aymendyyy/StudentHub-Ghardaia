import { closeModal } from "./modal.js";

export function setupEventListeners() {
  // Navigation items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-item")
        .forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Modal close on background click
  document.getElementById("chapterModal").addEventListener("click", (e) => {
    if (e.target.id === "chapterModal") {
      closeModal();
    }
  });
}
