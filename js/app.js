import { printMain } from "./Components/MainSection.js";
import { printCategoriesInMenu, toggleMenu } from "./Components/Menu.js";
import { toggleTaskModal } from "./Components/TaskModal.js";
import { firstTime } from "./database.js";
import { searchDataset } from "./helpers/searchDataset.js";
import { addNewTask, deleteTask } from "./tasks.js";

const $menu = document.getElementById("menu"),
  $taskModal = document.getElementById("task-modal");

let actualClientWidth = document.documentElement.clientWidth;

document.addEventListener("DOMContentLoaded", () => {
  firstTime();
  printMain("default");
  printCategoriesInMenu();

  document.addEventListener("click", (e) => {
    const etm = (selector) => e.target.matches(selector);

    // click in shadow mask (close menu/close modal task)
    if (etm("#shadow-screen")) toggleMenu();
    if (etm("#modal-container")) toggleTaskModal();
    // click in toggle menu
    if (etm("#toggle-menu-btn") || etm("#toggle-menu-btn *")) toggleMenu();
    // click in toggle menu btn
    if (etm("#menu-btn") || etm("#menu-btn *")) toggleMenu();
    // click in open modal task btn
    if (etm("#open-mt-btn") || etm("#open-mt-btn *")) toggleTaskModal();
    //  click in categegory in menu
    if (etm(".categories__item") || etm(".categories__item *")) {
      let categoryId = searchDataset(e.target).categoryId;
      printMain("category", categoryId);
      if (actualClientWidth <= 576) {
        console.log("mobile");
        toggleMenu();
      }
    }
    // click in delete btn of task list item
    if (etm(".tasks-list__icon") || etm(".tasks-list__icon *")) {
      let dataset = searchDataset(e.target);
      deleteTask(dataset);
    }
  });

  document.addEventListener("submit", (e) => {
    // submit a new task
    if (e.target.matches("#task-modal-form")) {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.target));
      addNewTask(data);
      toggleTaskModal();
      printMain("category", e.target["input-category"].value);
    }
  });

  if (window.matchMedia("(min-width: 576px)").matches) {
    $menu.classList.remove("hidden");
  }

  if (actualClientWidth <= 576) {
    $taskModal.classList.remove("task-modal--desktop");
    if (
      navigator.userAgent.match(/android/i) &&
      navigator.userAgent.match(/chrome/i)
    ) {
      $taskModal.classList.add("task-modal--mobile-chrome");
    } else {
      $taskModal.classList.add("task-modal--mobile");
    }
  } else {
    $taskModal.classList.remove("task-modal--mobile");
    $taskModal.classList.add("task-modal--desktop");
  }
});

window.addEventListener("resize", () => {
  actualClientWidth = document.documentElement.clientWidth;

  if (window.matchMedia("(min-width: 576px)").matches) {
    $menu.classList.remove("hidden");
  }

  if (actualClientWidth <= 576) {
    $taskModal.classList.remove("task-modal--desktop");
    $taskModal.classList.add("task-modal--mobile");
  } else {
    $taskModal.classList.remove("task-modal--mobile");
    $taskModal.classList.add("task-modal--desktop");
  }
});
