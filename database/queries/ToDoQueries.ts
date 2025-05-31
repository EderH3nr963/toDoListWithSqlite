import {
  COMPLETED_TODO,
  CREATE_TODO,
  EXCLUDE_TODO,
  SELECT_ALL_TODO,
  SELECT_TODO,
  UPDATE_TODO,
} from "@/constants/Database_Queries";
import db from "..";

interface IToDo {
  id?: number;
  nameToDo: string;
  description: string;
  dateToDo: Date;
  itsNotificable: boolean;
  thisCompleted?: boolean;
}

export const CreateToDo = async (ObjectCreateTodo: IToDo) => {
  const database = await db();

  const result = await database.runAsync(CREATE_TODO, [
    ObjectCreateTodo.nameToDo,
    ObjectCreateTodo.description,
    ObjectCreateTodo.dateToDo.toString(),
    ObjectCreateTodo.itsNotificable ? 1 : 0,
  ]);

  return result;
};

export const selectAllToDo = async () => {
  const database = await db();

  const result = await database.getAllAsync(SELECT_ALL_TODO);

  return result;
};

export const completedToDo = async (id: number) => {
  const database = await db();

  const toDo = await database.getFirstAsync<IToDo>(SELECT_TODO, [id]);

  const result = await database.runAsync(COMPLETED_TODO, [
    Number(!Boolean(toDo?.thisCompleted)),
    id,
  ]);

  return result;
};

export const excludeToDo = async (id: number) => {
  const database = await db();

  const result = await database.runAsync(EXCLUDE_TODO, [id]);

  return result;
};

export const getToDo = async (id: number) => {
  const database = await db();

  const toDo = await database.getFirstAsync<IToDo>(SELECT_TODO, [id]);

  return toDo;
};

export const updateToDo = async (toDoToUpgrade: IToDo) => {
  const database = await db();

  const toDo = await database.runAsync(UPDATE_TODO, [
    toDoToUpgrade.nameToDo,
    toDoToUpgrade.description,
    toDoToUpgrade.dateToDo.toString(),
    toDoToUpgrade.itsNotificable,
    toDoToUpgrade.id || 0,
  ]);

  return toDo;
};
