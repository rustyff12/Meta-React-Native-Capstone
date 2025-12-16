import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("little_lemon.db");

export const createTable = async () => {
  try {
    await db.execAsync(`DROP TABLE IF EXISTS menuitems;`);
  } catch (e) {
    console.log("No old table to drop or error:", e);
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    );
  `);
};

export const getMenuItems = async () => {
  return await db.getAllAsync("SELECT * FROM menuitems");
};

export const saveMenuItems = async (menuItems) => {
  if (!menuItems?.length) return;

  const placeholders = menuItems.map(() => "(?, ?, ?, ?, ?)").join(", ");
  const values = menuItems.flatMap((item) => [
    item.id,
    item.name,
    item.price.toString(),
    item.category,
    item.description || "",
  ]);

  await db.runAsync(
    `INSERT OR REPLACE INTO menuitems 
	(id, name, price, category, description) 
	VALUES ${placeholders}`,
    values
  );
};
