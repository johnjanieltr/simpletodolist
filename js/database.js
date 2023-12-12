import { printCategoriesInMenu } from "./Components/Menu.js";
import { searchCategory } from "./categories.js";

export const firstTime = () => {
  let verification = getTodoDataBase();
  verification = Object.keys(verification);

  if (verification.length < 1) {
    let todoDataBase = [
      {
        id: 1,
        ["category-name"]: "sin categoria",
        tasks: [],
      },
      {
        id: 2,
        ["category-name"]: "personal",
        tasks: [],
      },
      {
        id: 3,
        ["category-name"]: "trabajo",
        tasks: [],
      },
      {
        id: 4,
        ["category-name"]: "casa",
        tasks: [],
      },
    ];
    updateTodoDataBase(todoDataBase);
  } else {
    return;
  }
};

// set category id
export const setCategoryId = () => {
  let id = getTodoDataBase().length + 1;
  return id;
};

// set task id
export const setTaskId = (idCategory) => {
  idCategory = +idCategory;
  let id = searchCategory(idCategory).tasks.length + 1;
  return id;
};

// fetch the dates from local storage
export const getTodoDataBase = () => {
  let todoDataBase = localStorage.getItem("todoDataBase");
  todoDataBase = JSON.parse(todoDataBase);
  if (!todoDataBase) todoDataBase = [];
  return todoDataBase;
};

// add a new category to TDB
export const setNewCategoryToTDB = (el) => {
  let todoDataBase = getTodoDataBase();
  todoDataBase.push(el);
  localStorage.setItem("todoDataBase", JSON.stringify(todoDataBase));
};

// update a exist category to TDB
export const updateTodoDataBase = (el) => {
  localStorage.setItem("todoDataBase", JSON.stringify(el));
  printCategoriesInMenu();
};

// esquema de TodoDTB
/*
  todoDataBase=[
      {
        id:
        name-category:
        tasks:[
          {
            id:
            task-name:
          }
        ]
      }
    ]

*/
