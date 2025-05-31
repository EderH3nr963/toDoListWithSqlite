export const CREATE_TODO =
  "INSERT INTO toDo (nameToDo, description, dateTodo, itsNotificable) VALUES (?, ?, ?, ?)";
export const SELECT_ALL_TODO = "SELECT * FROM toDo";
export const SELECT_TODO = "SELECT * FROM todo WHERE id = ?";
export const COMPLETED_TODO = "UPDATE toDo SET thisCompleted = ? WHERE id = ?";
export const EXCLUDE_TODO = "DELETE FROM toDo WHERE id = ?";
export const UPDATE_TODO =
  "UPDATE toDo SET nameToDo = ?, description = ?, dateToDo = ?, itsNotificable = ? WHERE id = ?";
