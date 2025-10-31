// main.js
import { renderCourses, renderChapters } from './render.js';
import { setupEventListeners } from './events.js';
import { setupChapterInteractions } from './chapters.js';
import { closeModal } from './modal.js';

export function updateMainTitle(title) {
  const mainTitle = document.querySelector('.main-title-h1');
  if (mainTitle) mainTitle.textContent = title;
}

document.addEventListener('DOMContentLoaded', () => {
  // رندر القوائم
  renderCourses();

  // عرض فصول المادة الأولى افتراضياً (index 0)
  renderChapters(0);

  // بعد رسم الفصول نربط المستمعين لها
  setupChapterInteractions();

  // ربط باقي المستمعين العامين
  setupEventListeners();
});

// عندما يختار المستخدم مادة، نعيد رسم الفصول ونعيد ربط الأحداث
document.addEventListener('courseSelected', (e) => {
  const idx = e.detail?.index ?? 0;
  renderChapters(idx);

  // بعد إعادة الرسم، لا تحتاج لفعل شيء إضافي لأن setupChapterInteractions يستخدم تفويضاً
  // لكن إن أردت عمل شيء عند التبديل يمكنك إضافته هنا
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
