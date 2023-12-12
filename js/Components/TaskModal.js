import { getTodoDataBase } from "../database.js";

const $modalContainer = document.getElementById("modal-container"),
  $inputText = document.getElementById("input-text"),
  $inputCategory = document.getElementById("input-category");

const $toggleMenuBtn = document.getElementById("toggle-menu-btn"),
  $openMTBtn = document.getElementById("open-mt-btn");

// open/close modal task
export const toggleTaskModal = () => {
  let isActive = $modalContainer.classList.contains(
    "modal-container--is-active"
  );

  if (!isActive) {
    insertOptionsInSelect();
    $inputText.value = "";
    $modalContainer.classList.remove("hidden");
    $toggleMenuBtn.classList.add("hidden");
    $openMTBtn.classList.add("hidden");
    setTimeout(() => {
      $modalContainer.classList.add("modal-container--is-active");
      $inputText.focus();
    }, 0);
  } else {
    $modalContainer.classList.remove("modal-container--is-active");
    $inputText.blur();
    $toggleMenuBtn.classList.remove("hidden");
    $openMTBtn.classList.remove("hidden");
    setTimeout(() => {
      $modalContainer.classList.add("hidden");
    }, 500);
  }
};

const insertOptionsInSelect = () => {
  let todoDataBase = getTodoDataBase();
  const fragment = document.createDocumentFragment();
  $inputCategory.innerHTML = "";

  todoDataBase.forEach((category) => {
    const $option = document.createElement("option");
    $option.value = category.id;
    $option.textContent = category["category-name"];
    fragment.appendChild($option);
  });
  $inputCategory.appendChild(fragment);
};
