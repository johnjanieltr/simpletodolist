import {
  getTodoDataBase,
  setCategoryId,
  setNewCategoryToTDB,
  updateTodoDataBase,
} from "./database.js";
import { printCategoriesInMenu } from "./Components/Menu.js";

// add new category to TDB
/*
export const addNewCategory = (nameCategory) => {
  document.getElementById("category-add").classList.add("hidden");
  nameCategory = nameCategory.trim();
  let newCategory = {
    id: setCategoryId(),
    ["name-category"]: nameCategory.toLowerCase(),
    tasks: [],
  };

  setNewCategoryToTDB(newCategory);
  printCategoriesInMenu();
};
*/

// update category to TDB
export const updateCategory = (categoryId, category) => {
  let position = categoryId - 1;
  let newTodoDataBase = [];
  newTodoDataBase = getTodoDataBase();
  newTodoDataBase.splice(position, 1, category);

  updateTodoDataBase(newTodoDataBase);
};

// search exist category in TDB
export const searchCategory = (categoryId) => {
  categoryId = +categoryId;
  let category = {};
  getTodoDataBase().forEach((el) => {
    if (categoryId === el.id) category = el;
  });
  let categoryLength = Object.keys(category).length;

  if (categoryLength < 1)
    return console.error("Internal error: Category not found");
  return category;
};
