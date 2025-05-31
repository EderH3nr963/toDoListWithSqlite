import db from "..";

export const initializeTableTodo = async () => {
  const database = await db(); // ✅ Chama a função para obter o objeto do banco

  return await database.execAsync(`
    CREATE TABLE IF NOT EXISTS toDo (
      id INTEGER PRIMARY KEY NOT NULL,
      nameToDo TEXT NOT NULL,
      description TEXT NOT NULL,
      dateToDo TEXT NOT NULL,
      itsNotificable INTEGER NOT NULL DEFAULT 1,
      thisCompleted INTEGER DEFAULT 0
    );
  `);
};
