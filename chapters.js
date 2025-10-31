// chapters.js
import { showChapterModal } from './modal.js';

export function setupChapterInteractions() {
  const container = document.querySelector(".skill-tree-diagram");
  if (!container) return;

  // تفويض: نراقب النقر على الـ container ونفحص إذا ما النقر على عنصر .chapter-node
  container.addEventListener('click', (e) => {
    const node = e.target.closest('.chapter-node');
    if (!node) return;

    // بيانات الفصل من attribute
    const chapter = node.dataset.chapter; // e.g. "chapter1"
    // الحالة (classList) لتحديد status
    let status = 'locked';
    if (node.classList.contains('completed')) status = 'completed';
    else if (node.classList.contains('active')) status = 'active';

    if (status !== 'locked') {
      showChapterModal(chapter, status);
    } else {
      // اختيارياً تري المستخدم لماذا مقفل
      // alert("This chapter is locked.");
    }
  });

  // تغيير المؤشر عند المرور
  container.addEventListener('mouseenter', (e) => {
    const node = e.target.closest('.chapter-node');
    if (node && !node.classList.contains('locked')) {
      node.style.cursor = 'pointer';
    }
  }, true);
}
