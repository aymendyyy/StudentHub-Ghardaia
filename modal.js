// modal.js
import { chapterArray } from "./render.js";

export function showChapterModal(chapter, status) {
  const modal = document.getElementById("chapterModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");

  const statusText = {
    completed: "Completed ✓",
    active: "In Progress",
    locked: "Locked",
  };

  // تنظيف السابق
  body.innerHTML = "";

  // نبحث عن المادة التي تحتوي على المفتاح chapter
// نعرض فقط الشابتر الذي ضغطنا عليه
const targetChapter = chapterArray.find(ch => ch.chName === chapter);

if (!targetChapter) {
  body.innerHTML = `<p>⚠️ Chapter not found.</p>`;
  modal.classList.add("show");
  return;
}

body.innerHTML = `
  <div class="chapter-block highlight">
    <h3>${targetChapter.chName}</h3>
    <p>${targetChapter.chDescription || "No description available."}</p>
    <p><a href="${targetChapter.chDrive || "#"}" target="_blank">View Material</a></p>
  </div>
  <hr>
`;

modal.classList.add("show");
}

export function closeModal() {
  document.getElementById("chapterModal").classList.remove("show");
}
export function showLoginModal() {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.classList.add("show");
  const firstInput = modal.querySelector("input, button");
  if (firstInput) firstInput.focus();
}

export function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.classList.remove("show");
}

// Open login modal when any element with class "Login-btn" is clicked
document.addEventListener("click", (e) => {
  const loginBtn = e.target.closest(".Login-btn");
  if (loginBtn) {
    e.preventDefault();
    showLoginModal();
    return;
  }

  // Close when clicking a close button inside the modal (use class "close" or data-close)
  if (e.target.closest("#loginModal .close") || e.target.closest("#loginModal [data-close]")) {
    closeLoginModal();
    return;
  }

  // Close when clicking the modal overlay itself (click target is the modal element)
  const modal = document.getElementById("loginModal");
  if (modal && e.target === modal) {
    closeLoginModal();
  }
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLoginModal();
});

// Attach form submit handler once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  if (!loginModal) return;
  const form = loginModal.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Emit a custom event with the form data so the app can handle authentication
    loginModal.dispatchEvent(new CustomEvent("login:submit", { detail: data, bubbles: true }));
    closeLoginModal();
  });
});