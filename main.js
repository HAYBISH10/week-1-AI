// Sample course data
  const courses = [
    {
      id: 1,
      title: "HTML Basics",
      description: "Learn the building blocks of the web.",
      lessons: ["Introduction to HTML", "Tags & Elements", "Forms", "Tables"]
    },
    {
      id: 2,
      title: "CSS Fundamentals",
      description: "Style your web pages beautifully.",
      lessons: ["Selectors", "Box Model", "Flexbox", "Grid"]
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      description: "Make your web pages interactive.",
      lessons: ["Variables", "Functions", "DOM Manipulation", "Events"]
    }
  ];

  // Save progress in localStorage
  let progress = JSON.parse(localStorage.getItem("progress")) || {};

  const app = document.getElementById("app");

  function saveProgress() {
    localStorage.setItem("progress", JSON.stringify(progress));
  }

  // Render home page
  function renderHome() {
    app.innerHTML = `
      <h2>Available Courses</h2>
      <div class="course-list">
        ${courses.map(course => `
          <div class="card" onclick="renderCourse(${course.id})">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <progress value="${getCompletedLessons(course.id)}" max="${course.lessons.length}"></progress>
            <p>${getCompletedLessons(course.id)} / ${course.lessons.length} lessons completed</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Render course detail
  function renderCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    const completed = progress[courseId] || [];

    app.innerHTML = `
      <button class="back-btn" onclick="renderHome()">⬅ Back to Courses</button>
      <h2>${course.title}</h2>
      <p>${course.description}</p>
      <progress value="${completed.length}" max="${course.lessons.length}"></progress>
      <p>${completed.length} / ${course.lessons.length} lessons completed</p>
      <div class="lesson-list">
        ${course.lessons.map((lesson, idx) => {
          const done = completed.includes(idx);
          return `
            <div class="card">
              <h4>${lesson}</h4>
              <button class="${done ? 'completed' : ''}" 
                onclick="markCompleted(${course.id}, ${idx})" ${done ? "disabled" : ""}>
                ${done ? "Completed ✓" : "Mark as Completed"}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // Mark lesson as completed
  function markCompleted(courseId, lessonIdx) {
    if (!progress[courseId]) progress[courseId] = [];
    if (!progress[courseId].includes(lessonIdx)) {
      progress[courseId].push(lessonIdx);
      saveProgress();
    }
    renderCourse(courseId);
  }

  function getCompletedLessons(courseId) {
    return progress[courseId] ? progress[courseId].length : 0;
  }

  // Start at home
  renderHome();