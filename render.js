// render.js
import { courseData } from "./data.js";
import { updateMainTitle } from "./main.js";

/**
 * يرسم بطاقات المواد في الشريط الجانبي
 * يقوم بإطلاق حدث مخصص "courseSelected" مع detail = index
 */
export let chapterArray = [];
export function renderCourses() {

  const courseList = document.querySelector(".course-list");
  courseList.innerHTML = courseData
    .map(
      (course, index) => `
        <div style="height:90px;" class="course-card ${course.name=='Compiler Design'?'active':""}" data-course-index="${index}">
            <h4>${course.name}</h4>
            <p>${course.progress}% Complete</p>
            <div class="progress-bar-small">
                <div class="progress-fill" style="width: ${
                  course.progress
                }%"></div>
            </div>
            <p>${Object.keys(course.chapters).length} Chapters • ${
        course.credits
      } Credits</p>
        </div>
    `
    )
    .join("");

  // نضيف مستمعين لكل بطاقة مادة -> نطلق حدث مخصص عند الاختيار
  document.querySelectorAll(".course-card").forEach((card) => {
    card.addEventListener("click", function () {
      document
        .querySelectorAll(".course-card")
        .forEach((c) => c.classList.remove("active"));
      this.classList.add("active");

      const courseIndex = Number(this.dataset.courseIndex);
      updateMainTitle(courseData[courseIndex].name);

      // نطلق حدث مخصص ليعالج رسم الفصول في مكان آخر
      const ev = new CustomEvent("courseSelected", {
        detail: { index: courseIndex },
      });
      document.dispatchEvent(ev);
    });
  });
}

/**
 * يرسم الفصول داخل عنصر .skill-tree-diagram
 * - يعطي لكل فصل العنصر: class="chapter-node <status>" و data-chapter="chapter1"
 * - يحسب الحالات (completed, active, locked) اعتماداً على نسبة التقدم
 */
export function renderChapters(courseIndex = 0) {
  const container = document.querySelector(".skill-tree-diagram");
  if (!container) return;

  const course = courseData[courseIndex];
  if (!course) {
    container.innerHTML = "<p>Course not found</p>";
    return;
  }

  const chaptersObj = course.chapters;
  const chapterKeys = Object.keys(chaptersObj); // ["chapter1","chapter2",...]
  const total = chapterKeys.length;

  // نحسب عدد الفصول المكتملة حسب النسبة (approx)
  const completedCount = Math.floor((course.progress / 100) * total);

  // نخلق HTML للفصول متشابكة مع خطوط بسيطة (يمكن تعديل CSS لاحقاً)
  let html = "";
  chapterKeys.forEach((key, idx) => {
    // status
    let status = "locked";
    if (idx < completedCount) status = "completed";
    else if (idx === completedCount) status = "active";

    const ch = chaptersObj[key];
    if (!chapterArray.some(item=>item.chName===ch.chName)) {
      chapterArray.push(ch)
    }
    const title = ch.chName || `Chapter ${idx + 1}`;
    html += `
      <div class="chapter-node ${status}"  data-chapter="${ch.chName}">
        <i class="fas ${
          status === "locked"
            ? "fa-lock"
            : status === "active"
            ? "fa-sync-alt"
            : "fa-check"
        }"></i>
        <span class="chapter-label">${title}</span>
      </div>
    `;

    // إضافة connector between nodes (نهائي لا نضيف بعد آخر عنصر)
    if (idx !== total - 1) {
      // اختيار نوع الخط بحسب التقدم
      let lineClass = "locked-line";
      if (idx < completedCount - 1) lineClass = "completed-line";
      else if (idx < completedCount) lineClass = "active-line";
      html += `<div class="connector ${lineClass}"></div>`;
    }
  });

  container.innerHTML = html;
  console.log(chapterArray);
}
