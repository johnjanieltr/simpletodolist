import { getTodoDataBase } from "../database.js";

const $menu = document.getElementById("menu"),
  $categoriesUl = document.getElementById("categories"),
  $shadowScreen = document.getElementById("shadow-screen");

// open/close menu
export const toggleMenu = () => {
  let isActive = $menu.classList.contains("menu--is-active");

  if (!isActive) {
    $menu.classList.remove("hidden");
    setTimeout(() => {
      $shadowScreen.classList.remove("hidden");
      $menu.classList.add("menu--is-active");
    }, 0);
  } else {
    $shadowScreen.classList.add("hidden");
    $menu.classList.remove("menu--is-active");

    setTimeout(() => {
      $menu.classList.add("hidden");
    }, 500);
  }
};

// print categories in menu section
export const printCategoriesInMenu = () => {
  const todoDataBase = getTodoDataBase();
  if (!todoDataBase) return;
  if (todoDataBase.length < 1) return;

  $categoriesUl.innerHTML = "";
  let fragment = document.createDocumentFragment();

  todoDataBase.forEach((category) => {
    const $li = document.createElement("li");
    $li.classList.add("categories__item");
    $li.setAttribute("data-category-id", category.id);
    $li.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        class="categories__icon"
        data-category-id="${category.id}"
      >
        <path
          d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"
        />
        <path
          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"
        />
      </svg>
      <span class="categories__name">${category["category-name"]}</span>
      <span class="categories__count">${category.tasks.length}</span>
    `;
    fragment.appendChild($li);
  });
  $categoriesUl.appendChild(fragment);
};
