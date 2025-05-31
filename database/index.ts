import * as SQLite from "expo-sqlite";

const db = async () => await SQLite.openDatabaseAsync("app.db");

export default db;
