import { searchCategory } from "../categories.js";

const $headerTitle = document.getElementById("header-title"),
  $headerCount = document.getElementById("header-count");

const $taskSection = document.getElementById("tasks-section"),
  $tasksSectionImg = document.getElementById("tasks-section-img"),
  $tasksSectionInfo = document.getElementById("tasks-section-info");

const $tasksList = document.getElementById("tasks-list");

export const printMain = (info, categoryId = undefined) => {
  if (info === "default") {
    $headerTitle.textContent = "Simpletodolist";
    $headerCount.classList.add("hidden");
    $tasksList.classList.add("hidden");
    $tasksSectionImg.classList.remove("hidden");
    $tasksSectionInfo.classList.remove("hidden");
    $tasksSectionInfo.innerHTML = `
      Bienvenido a Simpletodolist <br />
      Puedes comenzar agregando tu primera tarea desde el icono "+" 
    `;
  }

  if (info === "category") {
    if (!categoryId) return console.error("CategoryId not sent");
    let category = searchCategory(categoryId);

    $headerTitle.textContent = category["category-name"];
    $headerCount.classList.remove("hidden");
    $headerCount.textContent = category.tasks.length;

    if (category.tasks.length < 1) {
      // category without tasks
      $tasksList.classList.add("hidden");
      $tasksSectionImg.classList.remove("hidden");
      $tasksSectionInfo.classList.remove("hidden");
      $tasksSectionInfo.innerHTML = `
        Categoria sin tareas... <br />
        Puedes agregar tu tareas desde el icono "+"
      `;
    } else {
      // category with tasks
      $tasksList.classList.remove("hidden");
      $tasksSectionImg.classList.add("hidden");
      $tasksSectionInfo.classList.add("hidden");
      printTasks(categoryId);
    }
  }
};

export const printTasks = (categoryId) => {
  const category = searchCategory(categoryId),
    fragment = document.createDocumentFragment();
  $tasksList.innerHTML = "";

  category.tasks.forEach((task) => {
    const $li = document.createElement("li");
    $li.classList.add("tasks-list__item");
    $li.innerHTML = `
      <span class="tasks-list__name">${task["task-name"]}</span>
      <span
        class="tasks-list__icon" 
        data-category-id="${categoryId}"
        data-tasks-id="${task.id}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
          data-category-id="${categoryId}"
          data-tasks-id="${task.id}"
          />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
          data-category-id="${categoryId}"
          data-tasks-id="${task.id}"
          />
        </svg>
      </span>
    `;
    fragment.appendChild($li);
  });
  $tasksList.appendChild(fragment);
};
