import { setTaskId } from "./database.js";
import { searchCategory, updateCategory } from "./categories.js";
import { printMain } from "./Components/MainSection.js";

// add new task to category
export const addNewTask = (data) => {
  data = Object.values(data);
  let [taskName, categoryId] = data;

  let category = searchCategory(categoryId);
  if (!category) return;

  let taskInfo = {
    id: setTaskId(categoryId),
    ["task-name"]: taskName,
  };

  category.tasks.push(taskInfo);
  updateCategory(categoryId, category);
};

// delete a task from a category
export const deleteTask = (dataset) => {
  let { categoryId, taskId } = dataset;
  categoryId = +categoryId;
  taskId = +taskId;
  let position = taskId - 1;
  const category = searchCategory(categoryId);
  category.tasks.splice(position, 1);

  updateCategory(categoryId, category);
  printMain("category", categoryId);
};
