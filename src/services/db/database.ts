import SQLite from 'react-native-sqlite-storage';
import {DatabaseInitialization} from './DatabaseInitialization';
import {DATABASE} from './constants';
import {AppState, AppStateStatus} from 'react-native';
import {
  ICurrency,
  ITransaction,
  ITransactionCategory,
  ITransactionCategoryGroup,
} from 'models';

export interface Database {
  // Create
  createCurrency(newCurrency: ICurrency): Promise<void>;
  createTransactionCategoryGroup(
    newTransactionCategoryGroup: ITransactionCategoryGroup,
  ): Promise<void>;
  createTransactionCategory(
    newTransactionCategory: ITransactionCategory,
  ): Promise<void>;
  createTransaction(newTransaction: ITransaction): Promise<void>;
  // Read
  getAllCurrencies(): Promise<ICurrency[]>;
  getAllTransactionCategoryGroups(): Promise<ITransactionCategoryGroup[]>;
  getAllTransactionCategories(): Promise<ITransactionCategory[]>;
  getAllTransactions(): Promise<ITransaction[]>;
  // Update
  updateCurrency(updatedCurrency: ICurrency): Promise<void>;
  updateTransactionCategoryGroup(
    updatedTransactionCategoryGroup: ITransactionCategoryGroup,
  ): Promise<void>;
  updateTransactionCategory(
    updatedTransactionCategory: ITransactionCategory,
  ): Promise<void>;
  updateTransaction(updatedTransaction: ITransaction): Promise<void>;
  // Delete
  deleteCurrencyByID(id: number): Promise<void>;
  deleteTransactionCategoryGroupByID(id: number): Promise<void>;
  deleteTransactionCategoryByID(id: number): Promise<void>;
  deleteTransactionByID(id: number): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

// Insert a new list into the database
async function createCurrency(newCurrency: ICurrency): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'INSERT INTO currency (name, country_code, country_name) VALUES (?, ?, ?);',
    [newCurrency.name, newCurrency.countryCode, newCurrency.countryName],
  );
}
async function createTransactionCategoryGroup(
  newTransactionCategoryGroup: ITransactionCategoryGroup,
): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'INSERT INTO transaction_category_group (name, color) VALUES (?, ?);',
    [newTransactionCategoryGroup.name, newTransactionCategoryGroup.color],
  );
}
async function createTransactionCategory(
  newTransactionCategory: ITransactionCategory,
): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'INSERT INTO transaction_category (name, icon, transaction_category_group_id) VALUES (?, ?, ?);',
    [
      newTransactionCategory.name,
      newTransactionCategory.icon,
      newTransactionCategory.transaction_category_group_id,
    ],
  );
}
async function createTransaction(newTransaction: ITransaction): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'INSERT INTO transaction (type, sum, transaction_category_id, currency_id, date, time, comment) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [
      newTransaction.type,
      newTransaction.sum,
      newTransaction.transaction_category_id,
      newTransaction.currency_id,
      newTransaction.date,
      newTransaction.time,
      newTransaction.comment,
    ],
  );
}

// Get an array of all the lists in the database
async function getAllCurrencies(): Promise<ICurrency[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM currency ORDER BY currency_id DESC;',
  );

  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const currencies: ICurrency[] = [];
  for (let i = 0; i < count; i++) {
    const row: ICurrency = results.rows.item(i);
    currencies.push(row);
  }
  return currencies;
}
async function getAllTransactionCategoryGroups(): Promise<
  ITransactionCategoryGroup[]
> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM transaction_category_group ORDER BY transaction_category_group_id DESC;',
  );
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const transactionCategoryGroups: ITransactionCategoryGroup[] = [];
  for (let i = 0; i < count; i++) {
    const row: ITransactionCategoryGroup = results.rows.item(i);
    transactionCategoryGroups.push(row);
  }
  return transactionCategoryGroups;
}
async function getAllTransactionCategories(): Promise<ITransactionCategory[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM transaction_category ORDER BY transaction_category_id DESC;',
  );
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const transactionCategories: ITransactionCategory[] = [];
  for (let i = 0; i < count; i++) {
    const row: ITransactionCategory = results.rows.item(i);
    transactionCategories.push(row);
  }
  return transactionCategories;
}
async function getAllTransactions(): Promise<ITransaction[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM transactions ORDER BY transaction_id DESC;',
  );
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const transactions: ITransaction[] = [];
  for (let i = 0; i < count; i++) {
    const row: ITransaction = results.rows.item(i);
    transactions.push(row);
  }
  return transactions;
}

async function updateCurrency(updatedCurrency: ICurrency): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE currency SET name = ?, country_code = ?, country_name = ? WHERE currency_id = ?;',
        [
          updatedCurrency.name,
          updatedCurrency.countryCode,
          updatedCurrency.countryName,
          updatedCurrency.currency_id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(`[db] Currency item with id: ${results.insertId} updated.`);
    });
}
async function updateTransactionCategoryGroup(
  updatedTransactionCategoryGroup: ITransactionCategoryGroup,
): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE transaction_category_group SET name = ?, color = ? WHERE transaction_category_group_id = ?;',
        [
          updatedTransactionCategoryGroup.name,
          updatedTransactionCategoryGroup.color,
          updatedTransactionCategoryGroup.transaction_category_group_id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] transaction_category_group item with id: ${results.insertId} updated.`,
      );
    });
}
async function updateTransactionCategory(
  updatedTransactionCategory: ITransactionCategory,
): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE transaction_category SET name = ?, icon = ?, transaction_category_group_id = ? WHERE transaction_category_id = ?;',
        [
          updatedTransactionCategory.name,
          updatedTransactionCategory.icon,
          updatedTransactionCategory.transaction_category_group_id,
          updatedTransactionCategory.transaction_category_id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] transaction_category item with id: ${results.insertId} updated.`,
      );
    });
}
async function updateTransaction(
  updatedTransaction: ITransaction,
): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE transactions SET type = ?, sum = ?, transaction_category_id = ?, currency_id = ?, date = ?, time = ?, comment = ? WHERE transaction_id = ?;',
        [
          updatedTransaction.type,
          updatedTransaction.sum,
          updatedTransaction.transaction_category_id,
          updatedTransaction.currency_id,
          updatedTransaction.date,
          updatedTransaction.time,
          updatedTransaction.comment,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] transaction item with id: ${results.insertId} updated.`,
      );
    });
}

async function deleteCurrencyByID(id: number): Promise<void> {
  if (id) {
    const db = await getDatabase();
    await db.executeSql('DELETE FROM currency WHERE currency_id = ?;', [id]);
  }
}
async function deleteTransactionCategoryGroupByID(id: number): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'DELETE FROM transaction_category_group WHERE transaction_category_group_id = ?;',
    [id],
  );
}
async function deleteTransactionCategoryByID(id: number): Promise<void> {
  return getDatabase()
    .then(db => {
      // Delete list items first, then delete the list itself
      return db
        .executeSql(
          'DELETE FROM transaction_category WHERE transaction_category_id = ?;',
          [id],
        )
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted transaction_category with id: "${id}"!`);
    });
}
async function deleteTransactionByID(id: number): Promise<void> {
  return getDatabase()
    .then(db => {
      // Delete list items first, then delete the list itself
      return db
        .executeSql('DELETE FROM transactions WHERE transaction_id = ?;', [id])
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted transactions with id: "${id}"!`);
    });
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(false);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
  });

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    return;
  }
  try {
    await databaseInstance.close();
    databaseInstance = undefined;
  } catch (e) {
    console.error('[db] closing db error', e);
    databaseInstance = undefined;
  }
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  createCurrency,
  createTransactionCategoryGroup,
  createTransactionCategory,
  createTransaction,

  getAllCurrencies,
  getAllTransactionCategoryGroups,
  getAllTransactionCategories,
  getAllTransactions,

  updateCurrency,
  updateTransactionCategoryGroup,
  updateTransactionCategory,
  updateTransaction,

  deleteCurrencyByID,
  deleteTransactionCategoryGroupByID,
  deleteTransactionCategoryByID,
  deleteTransactionByID,
};
